import ScheduleLoader from "@/components/ScheduleLoader";
import { getAllUsers } from "@/db/queries";
import { requireAdminCookie } from "@/utils/auth";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Await, Link, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

export const meta: MetaFunction = () => {
  return [
    {
      title: "All students | Sairam Fresher's Admin",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAdminCookie(request);
  return defer({ allUsers: getAllUsers() });
};

function AdminUsersIndex() {
  const { allUsers } = useLoaderData<typeof loader>();

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-2xl font-semibold">
        Click on each user for more details
      </h1>

      <div className="mt-6 flex w-full max-w-[80vw] flex-col overflow-x-scroll transition-all md:overflow-x-hidden">
        <Suspense
          fallback={
            <div className="flex flex-col gap-1">
              <ScheduleLoader count={10} />
            </div>
          }
        >
          <Await resolve={allUsers}>
            {(allUsers) => (
              <>
                <div className="sticky top-0 mx-1 mt-1 flex min-w-fit items-center justify-around rounded-se-lg rounded-ss-lg bg-white p-3 shadow outline outline-1 outline-gray-200 md:min-w-[unset]">
                  <h2 className="min-w-12 max-w-14 flex-1 font-medium">
                    S.No.
                  </h2>
                  <h2 className="min-w-28 max-w-32 flex-1 text-nowrap font-medium md:mx-2">
                    Application No.
                  </h2>
                  <h2 className="mx-2 min-w-44 max-w-56 flex-1 font-medium">
                    Student Name
                  </h2>
                  <h2 className="mx-2 min-w-36 max-w-40 flex-1 font-medium">
                    Department
                  </h2>
                  <h2 className="mx-2 min-w-16 max-w-28 flex-1 font-medium">
                    Action
                  </h2>
                </div>
                {allUsers.map((user, i) => (
                  <div
                    key={user.id}
                    className={`animate-fade-in md:p-1/2 mx-1 flex min-h-20 min-w-fit items-center justify-around overflow-hidden p-1.5 outline transition-all last-of-type:mb-1 hover:bg-sky-200/70 md:min-w-[unset] ${i % 2 != 0 ? "bg-white" : "bg-blue-50/70"} outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md`}
                  >
                    <h2 className="min-w-12 max-w-14 flex-1 text-sm">
                      <p className="ml-2">{i + 1}</p>
                    </h2>
                    <h2 className="min-w-28 max-w-32 flex-1 text-sm md:mx-2">
                      {user.applicationNo}
                    </h2>
                    <h2 className="mx-2 min-w-44 max-w-56 flex-1 text-sm">
                      {user.name}
                    </h2>
                    <h2 className="mx-2 min-w-36 max-w-40 flex-1 break-words text-sm">
                      {user.department}
                    </h2>
                    <h2 className="mx-2 flex min-w-16 max-w-28 flex-1 items-center gap-1 text-sm">
                      <Link
                        to={`${user.applicationNo}`}
                        className="flex items-center gap-1 text-nowrap font-medium text-blue-500 underline"
                      >
                        <MdOutlineArrowOutward />
                        Click here
                      </Link>
                    </h2>
                  </div>
                ))}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default AdminUsersIndex;
