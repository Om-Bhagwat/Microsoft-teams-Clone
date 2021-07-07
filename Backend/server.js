//require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const cors = require('cors');
const io = socket(server);



app.use(cors());



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
        socket.emit("all users", usersInThisRoom);
    });
    

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log("joining");
        console.log(data);
        console.log("ended");
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

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));



