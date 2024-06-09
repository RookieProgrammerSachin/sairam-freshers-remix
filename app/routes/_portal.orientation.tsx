import { ORIENTATION_DUMMY_DATA } from "@/static/portal.orientation";
import { Link, MetaFunction } from "@remix-run/react";
import { CgLink } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArrowOutward } from "react-icons/md";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Orientation | Sairam Freshers" }];
};

function Page() {
  return (
    <div className="flex w-full flex-col gap-2">
      {ORIENTATION_DUMMY_DATA.map((orientation) => (
        <Link
          to={orientation.link}
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
              {orientation.timing.toLocaleString("en-IN", {
                timeZone: "Asia/Calcutta",
              })}
            </p>
            {/* title */}
            <h3 className="text-sm md:text-base">
              {orientation.name} <br />
            </h3>
            {/* link */}
            <p className="flex items-center gap-1 text-sm text-blue-400 md:text-base">
              Open <MdOutlineArrowOutward />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Page;
