import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// initialize socket
export const connectSocket = (accessToken: string) => {
  if (!socket) {
    socket = io("http://localhost:3001", { auth: { accessToken } });
  }

  if (!socket.connected) socket.connect();

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
