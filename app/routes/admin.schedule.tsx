import { Outlet } from "@remix-run/react";

function ScheduleLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default ScheduleLayout;

export { ErrorCatch as ErrorBoundary } from "@/components/ui/error-boundary";
