import { MetaFunction } from "@remix-run/react";
import { ErrorBoundary } from "@/root";
import { requireAuthCookie } from "@/utils/auth";
import { LoaderFunctionArgs } from "@remix-run/node";
import NoResources from "@/components/NoResources";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Admissions | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  return user;
}

function Page() {
  return (
    <div>
      <NoResources resourceName="Admission" />
    </div>
  );
}

export default Page;

export { ErrorBoundary };
