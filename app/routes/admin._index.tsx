import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Home | Sairam Fresher's Admin",
    },
  ];
};

function ScheduleLayout() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Welcome, Admin</h1>
      <p>Use the menu to perform actions</p>
    </>
  );
}

export default ScheduleLayout;

export { ErrorCatch as ErrorBoundary } from "@/components/ui/error-boundary";
