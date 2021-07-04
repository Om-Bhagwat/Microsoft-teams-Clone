import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import {ReactMediaRecorder} from "react-media-recorder";


import styled from "styled-components";
// import socket from "socket.io-client/lib/socket";

import "./Room.css";


import Chat from '../Chat/Chat';



const StyledVideo = styled.video`
    height: 100%;
    width: 100%;
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


// const videoConstraints = {
//     height: window.innerHeight / 2,
//     width: window.innerWidth / 2
// };


const Room = (props) => {


    const{email} = props;

    console.log(email);


    const [peers, setPeers] = useState([]);
    const [audiomute,setAudioMute] = useState(true);
    const [videomute,setVideoMute]= useState(true);
    const [toggleChat,setToggleChat] = useState(true);

    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000/");
        console.log(socketRef.current);
        navigator.mediaDevices.getUserMedia({ video: true, audio:true }).then(stream => {
            // console.log(localstream.getAudioTracks()[0]);
            userVideo.current.srcObject = stream;
            // console.log(stream.getAudioTracks()[0]);
            socketRef.current.emit("join room",roomID);
            socketRef.current.on("all users", (users) => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id,stream);


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


            console.log(peersRef);
            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                    Name:payload.Name,
                })

                // console.log(payload);
                const peerObj = {
                    peer,
                    peerID:payload.callerID,
                    Name:payload.Name,
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
    

    function createPeer(userToSignal, callerID ,stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal,email })
        })


        return peer;

    }

    console.log(peers);
    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {   
            socketRef.current.emit("returning signal", { signal, callerID,email })
        })

        peer.signal(incomingSignal);
        console.log(peersRef.current);
        return peer;
    }



    const leavecall = ()=>{

        
        window.location = "http://localhost:3000/";
    }

    const muteAudio=(e)=>{
        e.preventDefault();
        setAudioMute(!audiomute);
        // userVideo.current.srcObject.getVideoTracks()[0].contentHint("om");
        
        userVideo.current.srcObject.getAudioTracks()[0].enabled = !(userVideo.current.srcObject.getAudioTracks()[0].enabled);
    }

    const MuteVideo=(e)=>{
        e.preventDefault();
        setVideoMute(!videomute);
        userVideo.current.srcObject.getVideoTracks()[0].enabled = !(userVideo.current.srcObject.getVideoTracks()[0].enabled);
    }

    const openChat=(e)=>{
        e.preventDefault();

        setToggleChat(!toggleChat);
    }
    

    console.log(peers);
    return (
        <div className="grid-container">

            <div className={`${toggleChat?"video-screen":"video-screen-not"}`}>
                <div className="videoBox">
                    <StyledVideo  ref={userVideo} autoPlay playsInline />
                    <div className="pName">
                        You
                    </div>
                </div>
                {peers.map((peer) => {
                    console.log("joined");
                    return (
                        <div className="videoBox">
                            <Video key={peer.peerID} peer={peer.peer} />
                            <div className="pName">
                                <h4>{peer.Name}</h4>
                            </div>
                        </div>
                    );
                })}

                <div className="btn-bar">
                    <div className="sub-btn-bar">
                        <button  className={`control-btns ${videomute?"toggle-cam-select":"toggle-cam"}`} onClick={MuteVideo}>
                            {videomute?(
                                <i className="material-icons">videocam</i>
                            ):(
                                <i className="material-icons">videocam_off</i>
                            )}
                        </button>
                        <button className={`control-btns ${audiomute?"toggle-cam-select":"toggle-cam"} `} onClick={muteAudio}>
                            {audiomute?(
                                <i className="material-icons end-call">mic_none</i>
                            ):(
                                <i className="material-icons end-call">mic_off</i>
                            )}
                        </button>
                        <button className="control-btns hangup" onClick={leavecall}>
                            <i className="material-icons">call_end</i>
                        </button>
                        <button onClick={openChat} className={`control-btns ${toggleChat?"toggle-chat":"toggle-chat-not"}`} >
                            <i className="material-icons">chat</i>
                        </button>
                    </div>
                </div>

            </div>
            <Chat roomID={roomID} email={email} toggleChat={toggleChat} setToggleChat={setToggleChat} openChat={openChat} />
            {/* <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            />  */}
        </div>
    );
};

export default Room;