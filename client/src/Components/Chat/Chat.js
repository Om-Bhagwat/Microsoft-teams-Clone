import React,{useState,useEffect} from 'react'
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:8000/"

const Chat=(props)=>{

    const {roomID,email} = props;
    const [connecto,setConnecto] = useState(false);
    console.log(roomID);

    const [message,setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(()=>{
        socket = io(CONNECTION_PORT);
    },[CONNECTION_PORT]);

    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setMessageList([...messageList,data]);
        })
    },)

    const connectToRoom = () =>{
        setConnecto(true);
        socket.emit("join_room",roomID);
    }

    const sendMessage = async () => {
        let messageContent = {
          room: roomID,
          content: {
            author: email,
            message: message,
          },
        };
    
        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
      };

      console.log(messageList);

    return (
        <div>
            {connecto?(
                <>
                    <div>
                        {messageList.map((val,key)=>{
                            return(
                                <div id={val.author === email?"YOU":"Other"}>
                                    {val.author}:{val.message}
                                </div>    
                            )
                        })}
                    </div>

                    <input
                        type="text"
                        placeholder="Message..."
                        onChange={(e) => 
                            setMessage(e.target.value)
                        }
                    />
                    <button onClick={sendMessage}>Send</button>
                </>
            ):(
                <>
                    <button onClick={connectToRoom} >Chat</button>
                </>
            )}
        </div>
    )
}

export default Chat;