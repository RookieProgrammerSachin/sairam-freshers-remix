import { loginCookie } from "@/utils/auth";
import { redirect } from "@remix-run/react";

export async function loader() {
  return redirect("/", {
    headers: { "Set-Cookie": await loginCookie.serialize("", { maxAge: 0 }) },
  });
}
