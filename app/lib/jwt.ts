import jwt from "jsonwebtoken";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
const REFRESH_TOEKN = process.env.REFRESH_TOEKN!;
export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });
}
export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOEKN, { expiresIn: "7d" });
}
export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, ACCESS_TOKEN);
  } catch (error) {
    console.log(error);
    return null;
  }
}
export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_TOEKN);
  } catch (error) {
    console.log(error);
    return null;
  }
}
