
//Module imports.

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import axios from 'axios';


//CSS imports
import styled from "styled-components";
import "./Room.css";


//Component Imports.
import Chat from '../Chat/Chat';



const StyledVideo = styled.video`
    height: 100%;
    width: 100%;
`;



const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const Room = (props) => {

    //arguments from App.js as props.

    const{email} = props;

    //UseState hooks Defined.

    const [peers, setPeers] = useState([]);
    const [audiomute,setAudioMute] = useState(true);
    const [videomute,setVideoMute]= useState(true);
    const [toggleChat,setToggleChat] = useState(true);
    const [userName,setUsername] = useState('');

    //UseRef hooks Defined.

    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;


    //Video Calling Logic Starts.

    useEffect(() => {
        socketRef.current = io.connect("https://video-chat-om.herokuapp.com/");
        console.log(socketRef.current);
        navigator.mediaDevices.getUserMedia({ video: true, audio:true }).then(stream => {
            userVideo.current.srcObject = stream;
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


    //This useEffect will find the username using email from Database.

    useEffect(()=>{
        async function hanGet(){
            try{
                const response = await axios.post('http://localhost:5000/posts/findteams',{
                    email
                },);
                console.log(response.data.data1[0].username);
                setUsername(response.data.data1[0].username);
            }catch(error){
                console.log(error);
            }
        }
        hanGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function createPeer(userToSignal, callerID ,stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal,email})
        })

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
        return peer;
    }



    const leavecall = ()=>{        
        window.location = "http://localhost:3000/";
    }

    const muteAudio=(e)=>{
        e.preventDefault();
        setAudioMute(!audiomute);
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

    //Video Calling Logic Ends.

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
            
            <Chat roomID={roomID} email={email} toggleChat={toggleChat}  openChat={openChat} userName={userName} />
        
        </div>
    );
};

export default Room;