import { useEffect, useState } from "react";
import { JoinLobbyPayload, JoinLobbyResponse } from "../types/socket";
import { socket } from "@/app/socket/socket";
import { useUserStore } from "@/app/zustand/stores/useUserStore";
import { useAuthStore } from "@/app/zustand/stores/AuthStore";

export function useHokmConnection() {
  const [loadingMessage, setLoadingMessage] = useState("Loading");
  const [loading, setLoading] = useState(true);
  const userStore = useUserStore();
  const { accessToken, setAccessToken } = useAuthStore();

  useEffect(() => {
    async function init() {
      try {
        setLoadingMessage("Getting user data...");

        const res = await fetch("/api/getUserData?access=true", {
          method: "GET",
          credentials: "include",
        });

        const { decoded, accessToken: newToken } = await res.json();
        userStore.setUser(decoded);
        setAccessToken(newToken);

        setLoadingMessage("Connecting to lobby");
        socket.auth = { accessToken: newToken || accessToken };
        socket.connect();

        socket.on("connect", () => {
          const { user } = useUserStore.getState();

          const payload: JoinLobbyPayload = {
            username: user?.username ?? "unknown",
          };
          socket.emit("join-lobby", payload, (res: JoinLobbyResponse) => {
            if (res.success) {
              console.log(`✅ ${payload.username} joined lobby`);
              setLoading(false);
            } else {
              console.warn(`❌ Join failed: ${res.reason}`);
            }
          });
        });
      } catch (error) {
        console.error("❌ Error initializing connection:", error);
      }
    }

    init();

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  return { loadingMessage, loading };
}
