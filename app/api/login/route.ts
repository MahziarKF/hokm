import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import getAuthTokens from "@/lib/token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: ">:" + " کاکا با چی من شناساییت کنم اخه" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { AND: [{ username }] },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "پسورد یا نام کاربری اشتباهه داش.",
        },
        { status: 401 }
      );
    }

    const doesPasswordMatches = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatches) {
      return NextResponse.json(
        { error: "پسورد یا نام کاربری اشتباهه داش." },
        { status: 401 }
      );
    }

    const tokens = getAuthTokens({
      id: user.id,
      username: user.username,
      role: user.role,
      gamesplayed: user.gamesplayed,
    });

    const response = NextResponse.json(
      {
        success: "(;" + "جون " + user.username + " خوش آمدی",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          gamesplayed: user.gamesplayed,
        },
      },
      { status: 201 }
    );

    response.cookies.set("refresh-token", tokens.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("access-token", tokens.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
