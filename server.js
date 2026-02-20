const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'renderer.html')));
app.get('/remote', (req, res) => res.sendFile(path.join(__dirname, 'controller.html')));

let currentState = {
    text: "Waiting for signal...",
    book: "", chapter: "", verse: "",
    size: 4, color: "#10b981", music: false,
    showText: true
};

io.on('connection', (socket) => {
    // Send current state to new connections immediately
    socket.emit('sync', currentState);

    socket.on('update', (data) => {
        currentState = { ...currentState, ...data };
        io.emit('sync', currentState);
    });

    socket.on('trigger_animation', () => {
        io.emit('trigger_animation');
    });
});

server.listen(1820, '0.0.0.0', () => {
    console.log('✅ CINEMATIC SERVER RUNNING at http://localhost:1820');
});
