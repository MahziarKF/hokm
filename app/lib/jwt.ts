import jwt from "jsonwebtoken";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
const REFRESH_TOEKN = process.env.REFRESH_TOEKN!;
export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });
}
export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOEKN, { expiresIn: "7d" });
}
export function verifyAccessToken(token: string): boolean {
  try {
    jwt.verify(token, ACCESS_TOKEN);
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}
export function verifyRefreshToken(token: string) {
  try {
    jwt.verify(token, REFRESH_TOEKN);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
