// client.js
import { io } from "socket.io-client";

// Connect to your server
console.log("connecting...")
const socket = io("http://localhost:3001");

// Listen for connection event
socket.on("connect", () => {
  console.log("✅ Connected to server with ID:", socket.id);

  // Emit custom event
  socket.emit("joinGame", { gameType: "hokm" });
});

// Listen for server events
socket.on("someEventFromServer", (data) => {
  console.log("📩 Received:", data);
});

// Handle disconnects
socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected:", reason);
});
