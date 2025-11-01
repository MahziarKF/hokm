import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";

export async function IsAccessTokenValid(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access-token")?.value;
    if (!token) {
      // TODO : Add Refresh to use refresh token to generate a new access token
    }
    return verifyAccessToken(String(token));
  } catch (error) {
    console.log(
      `error in tokenValidation.ts -> IsAccessTokenValid() -> error : ${error}`
    );
    return false;
  }
}
