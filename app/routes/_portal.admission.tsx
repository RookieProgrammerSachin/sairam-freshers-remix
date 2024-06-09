import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Admissions | Sairam Freshers" }];
};

function Page() {
  return <div>Admission</div>;
}

export default Page;
