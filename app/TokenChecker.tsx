"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "./zustand/stores/AuthStore";

type PropType = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export default function TokenChecker({ accessToken, refreshToken }: PropType) {
  const pathName = usePathname();
  const { accessToken: accessTokenState, refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const checkAndRefresh = async () => {
      if (!accessToken && refreshToken) {
        try {
          await refreshAccessToken(refreshToken);
          // location.reload();
        } catch (error) {
          console.log(
            `error while refreshing access token -> TokenChecker -> ${error}`
          );
        }
      }
    };

    checkAndRefresh();
  }, [pathName, accessToken, refreshToken, refreshAccessToken]);

  return null;
}
