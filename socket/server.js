import express from "express";
import http from "http";
import { Server } from "socket.io";

// --- Initialize Express app ---
const app = express();

// Example REST route
app.get("/", (_req, res) => {
  res.send("Socket.IO + Express server running!");
});

// --- Create HTTP server from Express ---
const server = http.createServer(app);

// --- Attach Socket.IO ---
const io = new Server(server, {
  cors: {
    origin: "*", // adjust to your frontend URL
    credentials: true,
  },
});

// --- Socket event handling ---
io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("joinGame", (data) => {
    console.log("joinGame event:", data);
    // e.g. socket.join(`room:${data.gameType}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`❌ Client disconnected (${socket.id}) reason: ${reason}`);
  });
});

// --- Start the server ---
const PORT = 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
