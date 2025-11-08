// this is a test route for multiple test before implementation logics!

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    cookieStore.delete("access-token");
    cookieStore.delete("refresh-token");
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
