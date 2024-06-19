import { Await, Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { CgLink } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ErrorBoundary } from "@/root";
import { requireAuthCookie } from "@/utils/auth";
import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { Suspense } from "react";
import ScheduleLoader from "@/components/ScheduleLoader";
import { getAllEvents } from "@/db/queries";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Orientation | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuthCookie(request);
  const orientationData = getAllEvents();
  return defer({ orientationData });
}

function Page() {
  const { orientationData } = useLoaderData<typeof loader>();

  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense fallback={<ScheduleLoader />}>
        <Await resolve={orientationData}>
          {(orientationData) =>
            orientationData.map((orientation) => (
              <Link
                to={orientation.eventLink ?? "#"}
                key={orientation.id}
                className="flex gap-4 rounded-md bg-white p-2 outline outline-1 outline-blue-300/60"
                target="_blank"
                rel="noreferrer"
              >
                <div className="grid aspect-square place-items-center rounded-md bg-card p-3 px-5 md:p-4 md:px-7">
                  <CgLink size={28} color="#228be6" />
                </div>
                <div className="flex flex-col gap-1">
                  {/* date */}
                  <p className="flex items-center gap-1 text-xs text-gray-600 md:text-sm">
                    <CiCalendarDate size={16} color="#228be6" />
                    {orientation.eventTiming
                      ? new Date(orientation.eventTiming).toLocaleString(
                          undefined,
                          {
                            timeZone: "Asia/Calcutta",
                          },
                        )
                      : "Yet to be published"}
                  </p>
                  {/* title */}
                  <h3 className="text-sm md:text-base">
                    {orientation.eventName} <br />
                  </h3>
                  {/* link */}
                  <Link
                    to={orientation.eventLink ? orientation.eventLink : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-400 md:text-base"
                  >
                    Open <MdOutlineArrowOutward />
                  </Link>
                </div>
              </Link>
            ))
          }
        </Await>
      </Suspense>
    </div>
  );
}

export default Page;

export { ErrorBoundary };
