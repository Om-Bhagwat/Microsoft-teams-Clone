import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            // console.log();
            ref.current.srcObject = stream;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {


    const{email} = props;

    console.log(email);


    const [peers, setPeers] = useState([]);
    const [audiomute,setAudioMute] = useState(true);
    const [videomute,setVideoMute]= useState(true);
    const [myID,setMyID] = useState('');

    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID:userID,
                        peer,
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })


                const peerObj = {
                    peer,
                    peerID:payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);

            });

            socketRef.current.on("user left",id=>{
                const peerObj = peersRef.current.find(p=>p.peerID===id);
                if(peerObj){
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p=>p.peerID!==id);
                peersRef.current=peers;
                setPeers(peers); 

            })
        

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        setMyID(userToSignal);
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })
        // console.log(peer);
        console.log(peersRef.current);
        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);
        console.log(peersRef.current);
        return peer;
    }

    console.log(peers);
    console.log(userVideo);

    const leavecall = ()=>{

        
        window.location = "http://localhost:3000/";
    }

    const muteAudio=(e)=>{
        e.preventDefault();
        console.log("Called")
        if(audiomute){
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
        }
        else{
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
        }
        setAudioMute(!audiomute);
        
    }

    // const MuteVideo=(e)=>{
    //     e.preventDefault();
    //     setVideoMute(!videomute);
    //     navigator.mediaDevices.getUserMedia({ video: variable, audio: false })
    // }


    return (
        <>
            <Container>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer) => {
                    return (
                        <>
                            <Video key={peer.peerID} peer={peer.peer} />
                        </>
                    );
                })}
            </Container>
            <button className="btn btn-danger" onClick={leavecall}>HangUp</button>
        </>
    );
};

export default Room;