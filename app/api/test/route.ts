// this is a test route for multiple test before implementation logics!

import { verifyAndReturnRefreshPayload } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    cookieStore.delete("access-token");
    // cookieStore.delete("refresh-token");
    const access = cookieStore.get("access-token")?.value;
    const refresh = cookieStore.get("refresh-token")?.value;
    console.log({ access, refresh });

    const decodedRefresh = await verifyAndReturnRefreshPayload(refresh || "");
    console.log(decodedRefresh);
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
