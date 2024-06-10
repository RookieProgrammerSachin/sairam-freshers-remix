import { ErrorBoundary } from "@/root";
import { requireAuthCookie } from "@/utils/auth";
import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Guide | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  return user;
}

function Page() {
  return <div>Guide</div>;
}

export default Page;

export { ErrorBoundary };
