import ScheduleLoader from "@/components/ScheduleLoader";
import { getAllEditRequests, getAllUsers } from "@/db/queries";
import { requireAdminCookie } from "@/utils/auth";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense, useState, useTransition } from "react";
import UserTable from "@/components/UserTable";

export const meta: MetaFunction = () => {
  return [
    {
      title: "All students | Sairam Fresher's Admin",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAdminCookie(request);
  return defer({ allRequests: getAllEditRequests() });
};

function AdminUsersIndex() {
  const { allRequests } = useLoaderData<typeof loader>();
  const [userSearchKey, setUserSearchKey] = useState("");
  const [isSearching, startSearchTransition] = useTransition();

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-2xl font-semibold">Edit requests by students</h1>
      <input
        type="search"
        onChange={(event) =>
          startSearchTransition(() =>
            setUserSearchKey(event.currentTarget.value),
          )
        }
        name="college-search"
        id="search-input"
        placeholder="Search by Student name"
        className="md:focus:outline-mantine-blue mt-5 rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 placeholder:text-sm focus:outline-1 focus:outline-blue-400 md:outline-gray-200"
      />
      <div className="mt-6 flex w-full max-w-[80vw] flex-col overflow-x-auto transition-all md:overflow-x-hidden">
        <Suspense
          fallback={
            <div className="flex flex-col gap-1">
              <ScheduleLoader count={10} />
            </div>
          }
        >
          <Await resolve={allRequests}>
            {(allRequests) => (
              //@ts-expect-error JSONify edho tholla
              <UserTable allUsers={allRequests} searchKey={userSearchKey} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default AdminUsersIndex;

export { ErrorCatch as ErrorBoundary } from "@/components/ui/error-boundary";
