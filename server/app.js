
import express from 'express';
import cors from 'cors';

import { createServer } from 'node:http';


import http from 'http';
import { Server } from 'socket.io';


const PORT =  8000;



const app = express();
//socket setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Include the port number for the Vite development server
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST']
    }
})

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: '*', // Include the port number for the Vite development server
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));




io.on("connection", (socket) => {
   // console.log("socket connected  :-",socket)
    socket.on("chat", (data) => {
        //console.log(data,"===========")
         io.emit("chat",data)
    })
   
   
    // socket.emit('welcome', `welcome to the socket server,${socket.id}`)

    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });
})

app.get('/', (req, res) => {
 
  res.send('Welcome to the Socket App!');
});

// Serve static files from the 'public' directory

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
