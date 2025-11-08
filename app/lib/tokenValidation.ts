import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";

export async function IsAccessTokenValid(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access-token")?.value;
    if (!token) return false;
    return verifyAccessToken(String(token));
  } catch (error) {
    console.log(
      `error in tokenValidation.ts -> IsAccessTokenValid() -> ${error}`
    );
    return false;
  }
}

export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh-token")?.value || "";
    if (!refreshToken) return;

    // ✅ Use absolute URL that works both locally and in production
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";

    const fullUrl = baseUrl.startsWith("http")
      ? `${baseUrl}/api/refreshAccessToken`
      : `https://${baseUrl}/api/refreshAccessToken`;

    const res = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      console.error(
        `Failed to refresh access token -> ${res.status} ${res.statusText}`
      );
    }
  } catch (error) {
    console.log(
      `error while trying to refresh accessToken -> tokenValidation.ts -> refreshAccessToken()  -> ${error}`
    );
  }
}

export async function getToken(type: "access" | "refresh") {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get(`${type}-token`)?.value;
    if (type === "access" && (!token || !verifyAccessToken(token))) {
      await refreshAccessToken();
      token = cookieStore.get("access-token")?.value;
    }
    return token;
  } catch (error) {
    console.log(`error in tokenValidation.ts -> getToken() -> ${error}`);
    return "";
  }
}
