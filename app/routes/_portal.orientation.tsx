import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Orientation | Sairam Freshers" }];
};

function Page() {
  return <div>Orientation</div>;
}

export default Page;
