import { MetaFunction } from "@remix-run/react";
import { ErrorBoundary } from "@/root";
import { requireAuthCookie } from "@/utils/auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Admissions | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  return user;
}

function Page() {
  return <div>Admission</div>;
}

export default Page;

export { ErrorBoundary };
