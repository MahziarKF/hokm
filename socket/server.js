import dotenv from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
dotenv.config({ path: "./../.env" });

// Create a basic HTTP server

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.IO server running without Express");
});
// Attach Socket.IO to the raw server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
io.use((socket, next) => {
  try {
    const { accessToken } = socket.handshake.auth;
    if (!token) return next(new Error("no token error."));
  } catch (error) {}
});
// Handle socket connections
io.on("connection", (socket) => {
  // after auth
  io.on("joinGame", ({ token, gameType, username }) => {});
});

// Start the server
server.listen(3001, () => console.log("Server listening on port 3000"));
