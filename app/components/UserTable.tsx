import { getAllEditRequests, getAllUsers } from "@/db/queries";
import { PAGE_SIZE } from "@/static/admin.users";
import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function UserTable({
  allUsers,
  searchKey,
}: {
  allUsers: Awaited<ReturnType<typeof getAllUsers>>;
  searchKey: string;
}) {
  const data = allUsers.filter((user) =>
    user.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase()),
  );

  const { active, setPage } = usePagination({
    initialPage: 1,
    total: data.length,
  });

  useEffect(() => {
    setPage(1);
  }, [searchKey]); // settting setPage as a dependency will always trigger this effect on every render, hence NO!

  return (
    <div className="overflow-y-hidden">
      {data.length === 0 ? (
        <div
          className={`md:p-1/2 m-1 mx-1 flex min-h-20 min-w-fit animate-fade-in items-center justify-around overflow-hidden rounded-md bg-white p-1.5 outline outline-1 outline-gray-200 transition-all hover:bg-sky-200/70 md:min-w-[unset]`}
        >
          <h2 className="flex-1 text-sm">No records found!</h2>
        </div>
      ) : (
        <>
          <Pagination
            total={parseInt(String(data.length / PAGE_SIZE)) + 1}
            value={active}
            onChange={setPage}
            className="mb-5 mt-6 md:mr-auto"
          />
          <div className="sticky top-0 mx-1 mt-1 flex min-w-fit items-center justify-around rounded-se-lg rounded-ss-lg bg-white p-3 shadow outline outline-1 outline-gray-200 md:min-w-[unset]">
            <h2 className="min-w-12 max-w-14 flex-1 font-medium">S.No.</h2>
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
          {data
            .slice(PAGE_SIZE * active - PAGE_SIZE, PAGE_SIZE * active)
            .map((user, i) => (
              <div
                key={user.id}
                className={`md:p-1/2 mx-1 flex min-h-20 min-w-fit animate-fade-in items-center justify-around overflow-hidden p-1.5 outline transition-all last-of-type:mb-1 hover:bg-sky-200/70 md:min-w-[unset] ${i % 2 != 0 ? "bg-white" : "bg-blue-50/70"} outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md`}
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
                    to={`/admin/users/${user.applicationNo}`}
                    className="flex items-center gap-1 text-nowrap font-medium text-blue-500 underline"
                  >
                    <MdOutlineArrowOutward />
                    Click here
                  </Link>
                </h2>
              </div>
            ))}
          <Pagination
            total={parseInt(String(data.length / PAGE_SIZE)) + 1}
            value={active}
            onChange={setPage}
            className="mt-6 md:mr-auto"
          />
        </>
      )}
    </div>
  );
}

export default UserTable;
