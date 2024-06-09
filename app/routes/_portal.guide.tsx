import { ErrorBoundary } from "@/root";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Guide | Sairam Freshers" }];
};
function Page() {
  throw new Error("No!");

  return <div>Guide</div>;
}

export default Page;

export { ErrorBoundary };
