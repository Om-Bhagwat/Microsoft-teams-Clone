//require('dotenv').config();
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
import socket from 'socket.io';
import cors from 'cors';
const io = socket(server);



app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

app.use('/posts',postRoutes);

const users = {};

const socketToRoom = {};


io.on('connection', socket => {

    socket.on("join room", (roomID) => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        //console.log("usersinroom    "+users[roomID]);
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        //socket.emit("all users", usersInThisRoom);
    });
    

    socket.on("join_room",(data)=>{
        socket.join(data);
    })

    socket.on("send_message",(data)=>{
        //console.log(data);
        socket.to(data.room).emit("recieve_message",data.content);
    })

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID,Name:payload.email});
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        // console.log(users);
        //console.log("  "+users[roomID]);
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        
        //console.log("room"+users[roomID]);
        socket.broadcast.emit('user left',socket.id);

    });

});

//server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));

const CONNECTION_URL = 'mongodb+srv://Om:WbiidEkQuX7zPc6a@teams.hchbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT =process.env.PORT || 8000;
// extra parameters so that we don't get warnings
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => server.listen(PORT,() => console.log(`Server running on port : ${PORT} and Database is connected`)))
    .catch((error) => console.log(error.message));

    //So we dont get warnings in console
mongoose.set('useFindAndModify',false);


