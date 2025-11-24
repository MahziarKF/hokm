import jwt from "jsonwebtoken";
import { PublicUser } from "../app/zustand/types/userPublic";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
// types/jwt.ts
export interface JwtPayloadBase {
  exp?: number;
  iat?: number;
  nbf?: number;
  jti?: string;
}

// Example: your user fields
export interface RefreshPayload extends JwtPayloadBase {
  userId: string;
  username: string;
}

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): boolean {
  try {
    if (!token) return false;
    jwt.verify(token, ACCESS_TOKEN);
    return true;
  } catch {
    return false;
  }
}

export function verifyRefreshToken(token: string): boolean {
  try {
    if (!token) return false;
    jwt.verify(token, REFRESH_TOKEN);
    return true;
  } catch {
    return false;
  }
}

export function verifyAndReturnAccessPayload(token: string): object | null {
  try {
    if (!token) return null;
    return jwt.verify(token, ACCESS_TOKEN) as PublicUser;
  } catch {
    return null;
  }
}

export function verifyAndReturnRefreshPayload(
  token: string
): RefreshPayload | null {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.REFRESH_TOKEN!) as RefreshPayload;
  } catch {
    return null;
  }
}
