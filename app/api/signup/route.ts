import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import getAuthTokens from "@/app/lib/token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "لطفا پسورد و یوزرنیم خود را وارد کنید." },
        { status: 400 }
      );
    }

    // Check if user exists
    const doesUserExist = await prisma.user.findFirst({
      where: { username: body.username },
    });

    if (doesUserExist) {
      return NextResponse.json(
        { error: "این نام از قبل انتخاب شده است." },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        username: String(body.username),
        password: String(body.password), // you should hash this later
        role: "user",
        email: String(body.email),
      },
    });

    // Generate JWT token
    const tokens = getAuthTokens({
      username: user.username,
      role: user.role,
      gamesplayed: user.gamesplayed,
    });

    // Create response and set cookie
    const response = NextResponse.json(
      {
        success: "اکانت با موفقیت ساخته شد.",
        user: {
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
