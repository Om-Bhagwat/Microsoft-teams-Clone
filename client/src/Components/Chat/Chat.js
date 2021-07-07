//Module imports

import React,{useState,useEffect} from 'react'
import io from "socket.io-client";

//Css File Imports.

import "../Room/Room.css";

let socket;
const CONNECTION_PORT = "localhost:8000/"

const Chat=(props)=>{

    //Getting This arguments from prop which is passed on by the Room.js component.
    
    const {roomID,email,toggleChat,openChat,userName} = props;

    //Defining useState hooks.
    const [connecto,setConnecto] = useState(true);
    const [message,setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    //socket login starts here.

    useEffect(()=>{
        socket = io(CONNECTION_PORT);
    },[CONNECTION_PORT]);


    useEffect(()=>{
        socket.emit("join_room",roomID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setMessageList([...messageList,data]);
        })
    },)


    //chat Logic Starts here.
    const sendMessage = async () => {
        var today = new Date();
        let messageContent = {
          room: roomID,
          content: {
            author: userName,
            message: message,
            time:today.getHours()+':'+today.getMinutes(),
          },
        };
    
        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
      };

      //Socket Logic ends here.

    return (
        <>
            {connecto?(
                <>
                    {toggleChat?(
                        <div className="chat-section" >

                            <h3>
                                Meeting Chat
                                <button onClick={openChat}>
                                    <i className="medium material-icons">close</i>
                                </button>
                            </h3>

                            <div className="chatArea">
                                {messageList.map((val,key)=>{
                                    return(
                                        <div className={`${(val.author===userName)?"chatheads":"chathead"}`} id={val.author === email?"YOU":"Other"}>
                                            <h6>{val.author}</h6>
                                            <p>{val.message}</p>
                                            <p>{val.time}</p>
                                        </div>    
                                    )
                                })}
                            </div>
        
                            <div className="chat-controls">
                                <input 
                                    type="text" 
                                    value={message} 
                                    className="sendChat" 
                                    onChange={(e)=>setMessage(e.target.value)} 
                                    placeholder="Write a Message" />
                                <button onClick={sendMessage}>
                                    <i className="material-icons">send</i>
                                </button>
                            </div>

                        </div>
                    ):(
                        <>
                            <div className="chat-section-not" >
                               
                                <h3>Meeting Chat
                                    <button onClick={openChat}>
                                        <i className="medium material-icons">close</i>
                                    </button>
                                </h3>

                                <div className="chatArea">
                                    {messageList.map((val,key)=>{
                                        return(
                                            <div className="chatheads" id={val.author === email?"YOU":"Other"}>
                                                <h4>{val.author}</h4>
                                                <p>{val.message}</p>
                                                <p>2.12 PM</p>
                                            </div>    
                                        )
                                    })}
                                </div>
            
                                <div className="chat-controls">
                                    
                                    <input 
                                        type="text" 
                                        className="sendChat" 
                                        onChange={(e)=>setMessage(e.target.value)} 
                                        placeholder="Write a Message" />
                                    <button onClick={sendMessage}>
                                        <i className="material-icons">send</i>
                                    </button>

                                </div>
                            
                            </div>
                        </>
                    )}
                </>
            ):(
                <>
                    <button>Chat</button>
                </>
            )}
        </>
    )
}

export default Chat;