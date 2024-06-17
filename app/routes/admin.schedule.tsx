import { BsPlus } from "react-icons/bs";

function SchedulePage() {
  return (
    <div className="flex w-full flex-col gap-2">
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
              id="name"
              placeholder="Event Name"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="conductor" className="text-sm font-normal">
              Event conductor{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="conductor"
              placeholder="Event conductor's name"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="conductor"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
