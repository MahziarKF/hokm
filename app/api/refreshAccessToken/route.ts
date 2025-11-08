import { generateAccessToken, verifyRefreshToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken, username, role, gamesplayed } = body;

    if (!verifyRefreshToken(refreshToken)) {
      return NextResponse.json(
        { error: "Invalid Refresh Token." },
        { status: 401 }
      );
    }

    const newAccessToken = generateAccessToken({ username, role, gamesplayed });
    const cookieStore = await cookies();
    cookieStore.set("access-token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json(
      { success: "Access token refreshed successfully." },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(`error while trying to refresh access token -> ${error}`);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
