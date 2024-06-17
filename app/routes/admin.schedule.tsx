import ScheduleLoader from "@/components/ScheduleLoader";
import Button from "@/components/ui/button";
import { ALL_DEPARTMENTS } from "@/static/admin.schedule";
import { ORIENTATION_DUMMY_DATA } from "@/static/portal.orientation";
import { requireAdminCookie } from "@/utils/auth";
import { MultiSelect } from "@mantine/core";
import { MetaFunction, defer } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { CgLink } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArrowOutward } from "react-icons/md";
import { LoaderFunctionArgs } from "react-router";
import { MultiSelectCreatable } from "@/components/ui/creatable-multiselect";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Orientation | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAdminCookie(request);
  const orientationData = new Promise<typeof ORIENTATION_DUMMY_DATA>(
    (resolve) => setTimeout(() => resolve(ORIENTATION_DUMMY_DATA), 1000),
  );
  return defer({ orientationData });
}

function SchedulePage() {
  const { orientationData } = useLoaderData<typeof loader>();
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-md border-[3px] border-dashed bg-primary p-4">
        <h1 className="flex items-center text-2xl font-semibold">
          <BsPlus />
          {"  "}Add new event{" "}
        </h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-normal">
              Event name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventName"
              placeholder="Event Name"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="eventName"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="eventTiming" className="text-sm font-normal">
              Event date & time{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventTiming"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="datetime-local"
              required
              name="eventTiming"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="eventLink" className="text-sm font-normal">
              Event Link{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventLink"
              placeholder="Event meeting link"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="url"
              required
              name="eventLink"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="eventFeedbackLink" className="text-sm font-normal">
              Event Feedback link{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventFeedbackLink"
              placeholder="Event meeting link"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="url"
              required
              name="eventFeedbackLink"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="eventDescription" className="text-sm font-normal">
            Event description{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <textarea
            id="eventDescription"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            required
            name="eventDescription"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="eventConductor" className="text-sm font-normal">
              Event conductor{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventConductor"
              placeholder="Event conductor's name"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="eventConductor"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="eventConductorContact"
              className="text-sm font-normal"
            >
              Event conductor contact{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventConductorContact"
              placeholder="Event conductor's email or mobile"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="eventConductorContact"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="eventCoordinator" className="text-sm font-normal">
              Event coordinator{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventCoordinator"
              placeholder="Event coordinator's name"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="eventCoordinator"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="eventCoordinatorContact"
              className="text-sm font-normal"
            >
              Event coordinator contact{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="eventCoordinatorContact"
              placeholder="Event coordinator's email or mobile"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="eventCoordinatorContact"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <MultiSelect
              label={
                <>
                  {"Event department"}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </>
              }
              comboboxProps={{
                shadow: "xl",
                withArrow: true,
                arrowSize: 16,
              }}
              placeholder="Choose department"
              data={ALL_DEPARTMENTS}
              hidePickedOptions
              name="eventDept"
              styles={{
                label: {
                  fontWeight: "normal",
                  fontSize: 14,
                },
                pill: {
                  maxWidth: "7rem",
                },
                input: {
                  maxHeight: "6rem",
                  overflowY: "auto",
                },
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="eventGuest" className="text-sm font-normal">
              Event Guests{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            {/* <input
              id="eventGuest"
              placeholder="Event guests"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="url"
              required
              name="eventGuest"
            /> */}
            <MultiSelectCreatable />
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <Button label="Submit" className="w-fit px-8" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <h1 className="flex items-center text-2xl font-semibold">
          <CiCalendarDate />
          Scheduled events & meetings
        </h1>
        <Suspense fallback={<ScheduleLoader />}>
          <Await resolve={orientationData}>
            {(orientationData) =>
              orientationData.map((orientation) => (
                <div
                  key={orientation.id}
                  className="flex gap-4 rounded-md bg-white p-2 outline outline-1 outline-blue-300/60"
                >
                  <div className="grid aspect-square place-items-center rounded-md bg-card p-3 px-5 md:p-4 md:px-7">
                    <CgLink size={28} color="#228be6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    {/* date */}
                    <p className="flex items-center gap-1 text-xs text-gray-600 md:text-sm">
                      <CiCalendarDate size={16} color="#228be6" />
                      {new Date(orientation.timing).toLocaleString(undefined, {
                        timeZone: "Asia/Calcutta",
                      })}
                    </p>
                    {/* title */}
                    <h3 className="text-sm md:text-base">
                      {orientation.name} <br />
                    </h3>
                    {/* link */}
                    <Link
                      to={orientation.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-400 md:text-base"
                    >
                      Open <MdOutlineArrowOutward />
                    </Link>
                  </div>
                  <div className="ml-auto flex flex-col items-center gap-2">
                    <Button
                      className="flex items-center gap-1 rounded-md bg-blue-50 px-4 py-1 text-blue-500"
                      label={
                        <>
                          <BiPencil />
                          Edit
                        </>
                      }
                    ></Button>
                    <Button
                      className="flex items-center gap-1 rounded-md bg-red-50 px-4 py-1 text-red-500"
                      label={
                        <>
                          <IoMdTrash />
                          Delete
                        </>
                      }
                    ></Button>
                  </div>
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default SchedulePage;
