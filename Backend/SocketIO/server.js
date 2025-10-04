import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://chatapp-6rpn.onrender.com",
        methods: ["GET", "POST"],
    }, transports: ["websocket"],
})

// http://localhost:3001 

// Realtime message code

export const getReceiverSocketId = (receiverId) =>{
    return users[receiverId];
}

const users = {};

// Used to listen events on server side

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId){
        users[userId] = socket.id;
        console.log("Users", users);j
    }

    // Used to send the events to all the connected users

    io.emit("getOnlineUsers", Object.keys(users));

// Used to listen client side events emitted by server side    (server & client)

socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
})

})

export {app, io, server}
