import { verifyAndReturnAccessPayload } from "./jwt";

export async function User(accessToken: string) {
  try {
    const userPayload = verifyAndReturnAccessPayload(accessToken || "");
    return userPayload;
  } catch (error) {
    console.log(`error in user.ts -> User() -> ${error}`);
    return null;
  }
}
