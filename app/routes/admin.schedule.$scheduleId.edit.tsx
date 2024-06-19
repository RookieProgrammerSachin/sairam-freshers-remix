import Button from "@/components/ui/button";
import { MultiSelectCreatable } from "@/components/ui/creatable-multiselect";
import {
  EventDetails,
  createEvent,
  getEventById,
  updateEvent,
} from "@/db/queries";
import { ALL_DEPARTMENTS } from "@/static/admin.schedule";
import { createObjectFromFormData, wait } from "@/utils";
import { requireAdminCookie } from "@/utils/auth";
import { EventDetailsErrorType, validateEventData } from "@/utils/validate";
import { MultiSelect } from "@mantine/core";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { BiChevronLeft } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";

export const meta: MetaFunction = () => {
  return [{ title: "Edit event details | Sairam Freshers Admin" }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdminCookie(request);
  type ScheduleEditLoaderResponse = Partial<
    { orientationData: Awaited<ReturnType<typeof getEventById>> } & {
      error: string;
    }
  >;
  try {
    const scheduleId = parseInt(params.scheduleId!);
    if (!scheduleId) {
      return redirect("/admin/schedule");
    }
    const orientationData = await getEventById(scheduleId);
    return json({ orientationData } as ScheduleEditLoaderResponse);
  } catch (error) {
    console.log("🚀 ~ loader ~ error:", error);
    return json({
      error: "Invalid schedule ID!",
    } as ScheduleEditLoaderResponse);
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  type EventDetailsResponse = {
    error?: EventDetailsErrorType;
    message?: string;
  };
  await wait(2000);
  await requireAdminCookie(request);
  const scheduleId = parseInt(params.scheduleId!);
  if (!scheduleId) {
    return redirect("/admin/schedule");
  }
  try {
    const data = await request.formData();
    const dataObject = createObjectFromFormData(
      data,
    ) as unknown as EventDetails;
    console.log("🚀 dataObject:", dataObject);

    const validation = validateEventData(dataObject);

    if (Object.keys(validation).length > 0) {
      return json({ error: validation } as EventDetailsResponse);
    }

    const response = await updateEvent(scheduleId, dataObject);
    if (response.length !== 1) {
      throw new Error("Couldn't update in DB!");
    }

    return json({
      message: "Event updated successfully!",
    } as EventDetailsResponse);
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
    return json({ error: { general: "Server error in updating event" } });
  }
}

function ScheduleEditPage() {
  const { scheduleId } = useParams();
  const scheduleInfo = useLoaderData<typeof loader>();
  console.log("🚀 ~ ScheduleEditPage ~ orientationData:", scheduleInfo);

  const fetcher = useFetcher();
  const isDisabled = fetcher.state === "submitting";

  // @ts-expect-error type can't be created for fetcher.data
  if (fetcher.data?.message) {
    // @ts-expect-error type can't be created for fetcher.data
    toast.success(fetcher.data.message);
    // @ts-expect-error type can't be created for fetcher.data
    fetcher.data.message = undefined;
  }

  // @ts-expect-error type can't be created for fetcher.data
  if (fetcher.data && typeof fetcher.data.error !== "undefined") {
    // @ts-expect-error type can't be created for fetcher.data
    Object.keys(fetcher.data.error).forEach((err) => {
      toast.error(
        // @ts-expect-error type can't be created for fetcher.data
        fetcher.data.error[err as keyof typeof fetcher.data.error],
      );
    });
    // @ts-expect-error type can't be created for fetcher.data
    fetcher.data.error = undefined;
  }

  if (scheduleInfo.error) {
    return (
      <div className="flex w-full flex-col gap-5">
        <Link
          to={"/admin/schedule"}
          className="flex w-fit items-center text-blue-500"
        >
          <BiChevronLeft /> Back
        </Link>
        <h1 className="flex w-full items-center gap-2 rounded-sm bg-red-50 p-4 text-xl font-semibold text-red-400">
          <RiErrorWarningLine size={32} color="red" />
          This schedule ID does not exist. Please check URL or go back and
          select another schedule
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <Link
        to={"/admin/schedule"}
        className="flex w-fit items-center text-blue-500"
      >
        <BiChevronLeft /> Back
      </Link>
      <h1 className="text-2xl font-semibold">
        Edit meeting schedule (Schedule ID: {scheduleId})
      </h1>
      <fetcher.Form
        method="POST"
        className="flex flex-col gap-4 rounded-md border-[3px] border-dashed bg-primary p-4"
      >
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
              defaultValue={scheduleInfo.orientationData?.eventName ?? ""}
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
              defaultValue={scheduleInfo.orientationData?.eventTiming ?? ""}
              name="eventTiming"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="eventLink" className="text-sm font-normal">
              Event Link{" "}
            </label>
            <input
              id="eventLink"
              placeholder="Event meeting link"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="url"
              defaultValue={scheduleInfo.orientationData?.eventLink ?? ""}
              name="eventLink"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="eventFeedbackLink" className="text-sm font-normal">
              Event Feedback link{" "}
            </label>
            <input
              id="eventFeedbackLink"
              placeholder="Event meeting link"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="url"
              defaultValue={
                scheduleInfo.orientationData?.eventFeedbackLink ?? ""
              }
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
            defaultValue={scheduleInfo.orientationData?.eventDescription ?? ""}
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
              defaultValue={scheduleInfo.orientationData?.eventConductor ?? ""}
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
              defaultValue={
                scheduleInfo.orientationData?.eventConductorContact ?? ""
              }
              name="eventConductorContact"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="eventCoordinator" className="text-sm font-normal">
              Event coordinator{" "}
              {/* <span className="text-sm font-semibold text-red-500">*</span> */}
            </label>
            <input
              id="eventCoordinator"
              placeholder="Event coordinator's name"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              name="eventCoordinator"
              defaultValue={
                scheduleInfo.orientationData?.eventCoordinator ?? ""
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="eventCoordinatorContact"
              className="text-sm font-normal"
            >
              Event coordinator contact{" "}
              {/* <span className="text-sm font-semibold text-red-500">*</span> */}
            </label>
            <input
              id="eventCoordinatorContact"
              placeholder="Event coordinator's email or mobile"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              defaultValue={
                scheduleInfo.orientationData?.eventCoordinatorContact ?? ""
              }
              name="eventCoordinatorContact"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <MultiSelect
              label={<>{"Event department"}</>}
              comboboxProps={{
                shadow: "xl",
                withArrow: true,
                arrowSize: 16,
              }}
              placeholder="Choose department"
              data={ALL_DEPARTMENTS}
              defaultValue={scheduleInfo.orientationData?.eventDept?.split(",")}
              required={true}
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
            </label>
            <MultiSelectCreatable
              inputFieldName="eventGuest"
              defaultValues={
                !scheduleInfo.orientationData?.eventGuest[0]
                  ? []
                  : scheduleInfo.orientationData?.eventGuest.map(
                      (guest) => guest?.guestName ?? "",
                    )
              }
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <Button label="Submit" className="w-fit px-8" disabled={isDisabled} />
        </div>
      </fetcher.Form>
    </div>
  );
}

export default ScheduleEditPage;
