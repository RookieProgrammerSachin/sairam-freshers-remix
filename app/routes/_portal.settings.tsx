import { MetaFunction } from "@remix-run/react";
import { ErrorBoundary } from "@/root";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireAuthCookie } from "@/utils/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Settings | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  return user;
}

function Page() {
  return <div>Settings</div>;
}

export default Page;

export { ErrorBoundary };
