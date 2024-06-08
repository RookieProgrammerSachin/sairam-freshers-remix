import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sairam Freshers Login" },
    {
      name: "description",
      content: "Sairam Freshers — Get yourself accustomed",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Hello world!</h1>
    </div>
  );
}
