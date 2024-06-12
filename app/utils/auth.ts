import { createCookie, redirect } from "@remix-run/node";

/** Maybe import dotenv/config here? I am not sure.. remix dev loads env vars into loaders and such, but not really into other .js or .ts
 * files
 */
const secret = process.env.LOGIN_SECRET;

if (!secret)
  throw new Error("Invalid secret set. Cannot run application. Contact admin.");

export type ValidCookieType = {
  id?: string;
  name?: string;
};

/** Cookie creation function */
export const loginCookie = createCookie("__token", {
  secrets: [secret],
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 10,
  path: "/",
  sameSite: "strict",
});

/** Login function, checks DB and return CookieShape */
export const login = (register: string, password: string): ValidCookieType => {
  if (!password) "meh";

  return { id: register, name: "Dummy" };
};

/** Validate cookie's shape and return cookie or false */
export const validateCookie = (
  cookie: ValidCookieType,
): false | ValidCookieType => {
  if (!cookie) return false;
  if (cookie.id === "123") return cookie;
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
