import { cookies } from "next/headers";

export type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  domain?: string;
  expires?: Date;
  maxAge?: number;
};

export async function SetCookie(
  name: string,
  value: any,
  options?: CookieOptions
) {
  if (typeof window !== "undefined") return;
  try {
    const cookieStore = await cookies();
    cookieStore.set(name, value, options);
  } catch {
    console.error(
      "SetCookie can only be used in Route Handlers or Server Actions."
    );
  }
}
