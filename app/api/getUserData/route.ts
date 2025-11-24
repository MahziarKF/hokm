import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateAccessToken, verifyAndReturnRefreshPayload } from "@/lib/jwt";
import { refreshAccessToken } from "@/lib/tokenValidation";
// types/jwt.ts

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const access = Boolean(searchParams.get("access"));

    const cookieStore = await cookies();
    const refresh = cookieStore.get("refresh-token")?.value;

    if (!refresh) {
      return NextResponse.json(
        { error: "No refresh token found" },
        { status: 401 }
      );
    }

    const decoded = verifyAndReturnRefreshPayload(refresh || "");

    const { exp, iat, nbf, jti, ...cleanPayload } = decoded || {};

    const accessToken = generateAccessToken(cleanPayload);
    refreshAccessToken(accessToken);
    return NextResponse.json(
      {
        message: "Retrieved data",
        decoded: cleanPayload, // cleaned payload
        accessToken: access ? accessToken : "",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("getUserData route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
