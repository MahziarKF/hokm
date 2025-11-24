import { io } from "socket.io-client";

const funnyLongConnectionDOIDOIDKLMAO = false;
const funnyLongConnectionDOIDOIDKLMAOURL =
  "https://9gkwjjs5-3001.euw.devtunnels.ms/";

export const socket = io(
  funnyLongConnectionDOIDOIDKLMAO
    ? funnyLongConnectionDOIDOIDKLMAOURL
    : "http://localhost:3001",
  {
    autoConnect: false,
  }
);
