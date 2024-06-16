import { db } from "@/db";
import { userTable } from "@/db/schema";
import { createCookie, redirect } from "@remix-run/node";
import { and, eq } from "drizzle-orm";
import crypto from "node:crypto";

/** Maybe import dotenv/config here? I am not sure.. remix dev loads env vars into loaders and such, but not really into other .js or .ts
 * files
 */
const secret = process.env.LOGIN_SECRET;

if (!secret)
  throw new Error("Invalid secret set. Cannot run application. Contact admin.");

export type ValidCookieType = {
  id?: string;
  name?: string;
  userId?: string;
  role?: string;
} | null;

/** Cookie creation function */
export const loginCookie = createCookie("__token", {
  secrets: [secret],
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 2,
  path: "/",
  sameSite: "strict",
});

/** Login function, checks DB and return CookieShape */
export const login = async (
  register: string,
  password: string,
): Promise<ValidCookieType> => {
  const userData = await db
    .select({
      name: userTable.name,
      register: userTable.applicationNo,
      password: userTable.password,
      userId: userTable.id,
      role: userTable.role,
    })
    .from(userTable)
    .where(
      and(
        eq(userTable.applicationNo, register),
        eq(
          userTable.password,
          crypto.createHash("sha256").update(password).digest("hex"),
        ),
      ),
    );

  if (userData.length !== 1) return null;

  return {
    id: register,
    name: userData[0].name,
    userId: userData[0].userId,
    role: userData[0].role,
  };
};

/** Validate cookie's shape and return cookie or false */
export const validateCookie = (
  cookie: ValidCookieType,
): false | ValidCookieType => {
  if (!cookie) return false;
  if (cookie.role === "ROLE_ADMIN") return false;
  if (cookie.id?.length === 11) return cookie; // TODO: make a better cookie validation logic
  return false;
};

/** Middleware loader function to login already logged in users */
export const checkCookieAndLogin = async (request: Request) => {
  const cookies = request.headers.get("Cookie");
  const decodedCookie = await loginCookie.parse(cookies);
  // console.log("🚀 Middleware cookie:", decodedCookie);

  const validCookie = validateCookie(decodedCookie);
  if (validCookie) throw redirect("/home");
  return validCookie;
};

/** Middleware loader function to logout users if cookie is f*cked */
export const requireAuthCookie = async (request: Request) => {
  const cookies = request.headers.get("Cookie");
  const decodedCookie = await loginCookie.parse(cookies);
  const validCookie = validateCookie(decodedCookie);
  if (!validCookie)
    throw redirect("/", {
      headers: {
        "Set-Cookie": await loginCookie.serialize("", { maxAge: 0 }),
      },
    });
  return validCookie;
};
