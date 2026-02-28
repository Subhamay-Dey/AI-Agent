import express, {} from 'express';
import "dotenv/config";
import http from 'http';
import { Server } from 'socket.io';
const app = express();
const PORT = process.env.PORT || 8000;
// Create HTTP server
const httpServer = http.createServer(app);
// Initialize Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: "*", // change in production
    },
});
// Socket connection
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("message", (data) => {
        console.log("Received:", data);
        // Send back to all clients
        io.emit("message", data);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
