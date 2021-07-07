
//module Imports

import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { v1 as uuid} from 'uuid';
import io from "socket.io-client";


//CSS imports.
import './TeamChannel.css';

let socket;
const CONNECTION_PORT = "localhost:8000/"


const TeamChannel=(props)=>{

    const teamId = props.match.params.teamname; 

    //useState Hooks Defined.

    const {email} = props;
    const [teamName,setTeamName] = useState([]);
    const [emailToAdd,setEmailToAdd] = useState('');
    const [tn,settn] = useState('');
    const [userName,setUserName] = useState('');
    const [message,setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [chat,setChat] = useState(false);
    const [prevMessages,setPrevmessages] = useState([]);


    //This  will again fetch you your username and teams you are in.

    useEffect(()=>{

        async function getE(){
            try{
                const response = await axios.post('http://localhost:5000/posts/findteams',{
                    email
                },);

                var TE = response.data.data1[0].teams;
                var TER = response.data.data1[0].username;
            }catch(error){
                console.log(error);
            }

            var Tea = "";
            for(let i =0;i<TE.length;i++){
                if(TE[i]._id===teamId){
                    Tea = TE[i].teamname;
                    break;
                }
            }
            settn(Tea);
            setUserName(TER);
        }

        getE();
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    },[])


    useEffect(() => {

        async function getT(){
            try{
                const response = await axios.post('http://localhost:5000/posts/findteams',{
                    email
                },);
            
                console.log(response);
                setTeamName(response.data.data1[0].teams);
            }catch(error){
                console.log(error);
            }
        }

        getT();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let ve = tn;

    useEffect(()=>{
        socket = io(CONNECTION_PORT);
    },[CONNECTION_PORT]);


    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setMessageList([...messageList,data]);
        })
    },)

    const sendMessage = async () => {
        var today = new Date();
        let messageContent = {
          room: tn,
          content: {
            author: userName,
            message: message,
            time:today.getHours()+':'+today.getMinutes(),
          },
        };
    
        try{
            const response = await axios.post('http://localhost:5000/posts/create',{

                username:userName,
                teamname:tn,
                message:message,
            },);

            console.log(response);
        }catch(error){
            console.log(error);
        }

        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
      };


    function create(){
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    function goBack(){
        props.history.push(`/`);
    }


    //This will add the email to the team.
    const addMembers=async(e)=>{
        e.preventDefault();
        var TEAM = "";
        try{
            for(let i =0;i<teamName.length;i++){
                if(teamName[i]._id===teamId){
                    TEAM = teamName[i].teamname;
                    break;
                }
            }
        }catch(error){
            console.log(error)
        }
        finally{
            try{
                const response = await axios.post('http://localhost:5000/posts/addTeam',{
                    email:emailToAdd,
                    teamname:TEAM
                },);
                
                console.log(response);
            }catch(error){
                console.log(error);
            }
        }
    }

    const startChat=async()=>{

        //join room on the server with teamaname.
        socket.emit("join_room",tn);
        setChat(!chat);

        //loading previous messages.
        try{
            const response = await axios.post('http://localhost:5000/posts/find',{
                teamname:tn,
            },);

            console.log(response.data.data1);
            setPrevmessages(response.data.data1);
        }catch(error){
            console.log(error);
        }

    }


    return(
        <div className="main-container1">

            <div className="team-list1">
                
                <div className="back1">
                    <button onClick={goBack}>
                        <i className="material-icons">arrow_back</i>
                        <div>All&nbsp;Teams</div>
                    </button>
                </div>

                <div className="team_name1">
                    <div className="team-icon1"></div>
                    <div className="name1">
                        {teamName.map((team)=>{
                            if(team._id===teamId){
                                return(
                                    <div style={{margin:"10px"}}>
                                        {team.teamname}
                                        <br></br>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>

                <hr></hr>

                <div className="channel-list1">
                    <div className="channel1">General</div>
                </div>

                <div className="call-team1">
                    <button onClick={create}><i className="material-icons">call</i></button>
                </div>

                <form className="add-member1">
                        <input type="text" value={emailToAdd} onChange={(e)=>setEmailToAdd(e.target.value)} placeholder="Enter Email to Add" />
                        {(emailToAdd!=='')?(
                            <button onClick={addMembers} ><i className="material-icons">person_add</i></button>
                        ):( 
                            <button ><i className="material-icons">person_add</i></button>
                        )}
                </form>
                
                </div>
                <div className="chat-section">
                    {chat?(
                        <>
                        <h3>Meeting Chat</h3>
                        <div className="chatArea">
                            {prevMessages.map((val,key)=>{
                                if(val.teamname===tn){
                                    return(
                                        <div className={`${(val.username===userName)?"chatheads2":"chatheads"}`}>
                                            <h4>{val.username}</h4>
                                            <p>{val.message}</p>
                                            {/* <p>{val.time}</p> */}
                                        </div>
                                    )
                                }
                            })}
                            {messageList.map((val,key)=>{
                                return(
                                    <div className={`${(val.author===userName)?"chatheads2":"chatheads"}`} id={val.author === email?"YOU":"Other"}>
                                        <h4>{val.author}</h4>
                                        <p>{val.message}</p>
                                        <p>{val.time}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="chat-controls">
                            <input value={message} type="text" className="sendChat" onChange={(e)=>setMessage(e.target.value)} placeholder="Write Messege To Team"/>
                            <button onClick={sendMessage}><i className="material-icons">send</i></button>
                        </div>
                        </>
                    ):(
                        <button style={{margin:"35vw"}} onClick={startChat}> Join Chat</button>
                    )}
                </div>
        </div>
    )
}

export default TeamChannel;
