import { Outlet } from "@remix-run/react";

function LayoutUsers() {
  return <Outlet />;
}

export default LayoutUsers;

export { ErrorCatch as ErrorBoundary } from "@/components/ui/error-boundary";
