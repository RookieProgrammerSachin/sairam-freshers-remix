import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Settings | Sairam Freshers" }];
};

function Page() {
  return <div>Settings</div>;
}

export default Page;
