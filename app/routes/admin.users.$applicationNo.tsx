import type { ActionFunctionArgs } from "@remix-run/node";
import { getAllProfileDetails, processRequestEdit } from "@/db/queries";
import { requireAdminCookie } from "@/utils/auth";
import {
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { LuUploadCloud } from "react-icons/lu";
import { COMMUNITIES, INDIAN_STATES } from "@/static/portal.profile";
import { nanoid } from "nanoid";
import { createObjectFromFormData, dateTo_YYYY_MM_DD } from "@/utils";
import Button from "@/components/ui/button";
import { toast } from "react-toastify";

export const meta: MetaFunction = ({ params }) => {
  return [
    {
      title: `Student details for ${params.applicationNo} | Sairam Fresher's Admin`,
    },
  ];
};

type EditRequestRequestType = {
  intent: "accept" | "deny";
  userId: string;
};

type EditRequestResponseType = {
  message?: string;
  error?: string;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { applicationNo } = params;
  if (!applicationNo) return redirect("/admin/users");
  await requireAdminCookie(request);
  return await getAllProfileDetails("", applicationNo);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { applicationNo } = params;
  if (!applicationNo) return redirect("/admin/users");
  await requireAdminCookie(request);
  const formData = await request.formData();
  console.log("🚀 ~ action ~ formData:", formData);
  try {
    const data = createObjectFromFormData(formData) as EditRequestRequestType;
    if (!data.userId)
      return json({ error: "Invalid User ID!" } as EditRequestResponseType);
    const permission = await processRequestEdit(
      data.userId,
      data.intent === "accept" ? true : false,
    );

    if (!permission)
      return json({
        message: "Request already processed!",
      } as EditRequestResponseType);

    if (permission.length === 1) {
      return permission[0].canEdit
        ? json({
            message: "Accepted request!",
          } as EditRequestResponseType)
        : json({ message: "Deined request!" } as EditRequestResponseType);
    } else {
      return json({
        error: "Something went wrong!",
      } as EditRequestResponseType);
    }
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
    return json({ error: "Server error!" } as EditRequestResponseType);
  }
};

function AdminUserDetails() {
  const profileDetails = useLoaderData<typeof loader>();
  const params = useParams();
  const [parentSignature] = useState<Blob | string | undefined>(
    typeof profileDetails === "boolean"
      ? undefined
      : profileDetails.parentSignature,
  );
  const [candidateSignature] = useState<Blob | string | undefined>(
    typeof profileDetails === "boolean"
      ? undefined
      : profileDetails.candidateSignature,
  );
  const fetcher = useFetcher<EditRequestResponseType>();

  if (fetcher.data?.error) {
    toast.error(fetcher.data.error);
    fetcher.data.error = undefined;
  }

  if (fetcher.data?.message) {
    toast.success(fetcher.data.message);
    fetcher.data.message = undefined;
  }

  return (
    <div className="flex w-full flex-col">
      <Link
        to={"/admin/users"}
        className="flex w-fit items-center text-blue-500"
      >
        <BiChevronLeft /> Back
      </Link>
      {!profileDetails && (
        <h1>{params.applicationNo} has not filled all personal details</h1>
      )}
      {profileDetails && (
        <div className="space-y-8 md:space-y-5">
          <h1 className="text-xl font-semibold">
            User details for {profileDetails && profileDetails.name} (
            {profileDetails.applicationNo})
          </h1>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-normal">
                Name{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="name"
                placeholder="Name"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="name"
                defaultValue={profileDetails.name}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="dob" className="text-sm font-normal">
                Date of Birth{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="dob"
                placeholder="Date of Birth"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="date"
                name="dob"
                defaultValue={profileDetails.dateOfBirth}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="motherTongue" className="text-sm font-normal">
                Mother Tongue{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="motherTongue"
                placeholder="Mother Tongue"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="motherTongue"
                defaultValue={profileDetails.motherTongue}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bloodGroup" className="text-sm font-normal">
                Blood Group{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="bloodGroup"
                placeholder="Blood Group"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="bloodGroup"
                defaultValue={profileDetails.bloodGroup}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="nationality" className="text-sm font-normal">
                Nationality{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="nationality"
                placeholder="Nationality"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="nationality"
                defaultValue={profileDetails.nationality}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="religion" className="text-sm font-normal">
                Religion{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="religion"
                placeholder="Religion"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="religion"
                defaultValue={profileDetails.religion}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="community" className="text-sm font-normal">
                Community{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <select
                disabled
                id="community"
                className="rounded-md bg-white px-3 py-1.5 text-sm outline outline-1 outline-gray-200 focus:outline-gray-300"
                name="community"
              >
                <option value="select">Select</option>
                {COMMUNITIES.map((community) => {
                  if (
                    community === (profileDetails && profileDetails.community)
                  ) {
                    return (
                      <option value={community} key={nanoid(6)} selected={true}>
                        {community}
                      </option>
                    );
                  } else {
                    return (
                      <option value={community} key={nanoid(6)}>
                        {community}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="hostelRequired" className="text-sm font-normal">
                Hostel Required?{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <select
                disabled
                id="hostelRequired"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                name="hostelRequired"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          {/* Current residential address */}
          <h3 className="text-lg font-semibold">Current Residential Address</h3>
          <div
            className="grid gap-4 md:grid-cols-2"
            // ref={currentAddressContainer}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="currentAddress" className="text-sm font-normal">
                Door No. / Plot No. / Street Name{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentAddress"
                placeholder="Door No. / Plot No. / Street Name"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="currentAddress"
                defaultValue={profileDetails.currentAddressLine1}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentArea" className="text-sm font-normal">
                Area / Mandal{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentArea"
                placeholder="Area / Mandal"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="currentArea"
                defaultValue={profileDetails.currentAddressLine2}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentCity" className="text-sm font-normal">
                City Name{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentCity"
                placeholder="City Name"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="currentCity"
                defaultValue={profileDetails.currentCity}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentPincode" className="text-sm font-normal">
                Pincode / Zipcode{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentPincode"
                placeholder="Pincode / Zipcode"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                name="currentPincode"
                defaultValue={profileDetails.currentPincode}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentState" className="text-sm font-normal">
                State{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <select
                disabled
                id="currentState"
                className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
                name="currentState"
              >
                <option value="select" className="text-sm">
                  Select State
                </option>
                {INDIAN_STATES.map((state) => {
                  if (
                    String(state.id) ===
                    String(profileDetails && profileDetails.currentState)
                  )
                    return (
                      <option value={state.id} key={nanoid(6)} selected>
                        {state.state}
                      </option>
                    );
                  else
                    return (
                      <option value={state.id} key={nanoid(6)}>
                        {state.state}
                      </option>
                    );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentCountry" className="text-sm font-normal">
                Country{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentCountry"
                placeholder="Country"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="currentCountry"
                defaultValue={profileDetails.currentCountry}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentLandLine" className="text-sm font-normal">
                Phone No. (LandLine)
              </label>
              <input
                disabled
                id="currentLandLine"
                placeholder="Phone No. (LandLine)"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="currentLandLine"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentMobile" className="text-sm font-normal">
                Mobile Number{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentMobile"
                placeholder="Mobile Number"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                inputMode="numeric"
                pattern="[6-9]\d{9}"
                name="currentMobile"
                defaultValue={profileDetails.currentMobileNumber}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentEmail" className="text-sm font-normal">
                Email ID{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="currentEmail"
                placeholder="Email ID"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="email"
                name="currentEmail"
                defaultValue={profileDetails.currentEmailId}
              />
            </div>
          </div>

          {/* Permanent address */}
          <h3 className="flex items-center gap-4 text-lg font-semibold">
            Permanent Residential Address{" "}
            <div className="flex items-center">
              <input
                disabled
                type="checkbox"
                name="sameAddress"
                id="sameAddress"
                className="h-3 w-3 rounded-full border-gray-600 bg-gray-100 text-blue-600 ring-offset-gray-800 focus:ring-1 focus:ring-blue-500"
                // onChange={(e) =>
                //   fillPermanentAddress(e.currentTarget.checked)
                // }
              />
              <label
                htmlFor="sameAddress"
                className="ms-2 text-sm font-normal text-black/90"
              >
                Same as current Address
              </label>
            </div>{" "}
          </h3>
          <div
            className="grid gap-4 md:grid-cols-2"
            // ref={permanentAddressContainer}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentAddress" className="text-sm font-normal">
                Door No. / Plot No. / Street Name{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentAddress"
                placeholder="Door No. / Plot No. / Street Name"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="permanentAddress"
                defaultValue={profileDetails.currentAddressLine1}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentArea" className="text-sm font-normal">
                Area / Mandal{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentArea"
                placeholder="Area / Mandal"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="permanentArea"
                defaultValue={profileDetails.currentAddressLine2}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentCity" className="text-sm font-normal">
                City Name{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentCity"
                placeholder="City Name"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="permanentCity"
                defaultValue={profileDetails.currentCity}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentPincode" className="text-sm font-normal">
                Pincode / Zipcode{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentPincode"
                placeholder="Pincode / Zipcode"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                name="permanentPincode"
                defaultValue={profileDetails.currentPincode}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentState" className="text-sm font-normal">
                State{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <select
                disabled
                id="permanentState"
                className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
                name="permanentState"
              >
                <option value="select" className="text-sm">
                  Select State
                </option>
                {INDIAN_STATES.map((state) => {
                  if (
                    String(state.id) ===
                    String(profileDetails && profileDetails.permanentState)
                  )
                    return (
                      <option value={state.id} key={nanoid(6)} selected>
                        {state.state}
                      </option>
                    );
                  else
                    return (
                      <option value={state.id} key={nanoid(6)}>
                        {state.state}
                      </option>
                    );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentCountry" className="text-sm font-normal">
                Country{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentCountry"
                placeholder="Country"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="permanentCountry"
                defaultValue={profileDetails.currentCountry}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="permanentLandLine"
                className="text-sm font-normal"
              >
                Phone No. (LandLine){" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentLandLine"
                placeholder="Phone No. (LandLine)"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="permanentLandLine"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentMobile" className="text-sm font-normal">
                Mobile Number{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentMobile"
                placeholder="Mobile Number"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="permanentMobile"
                defaultValue={profileDetails.currentMobileNumber}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="permanentEmail" className="text-sm font-normal">
                Email ID{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="permanentEmail"
                placeholder="Email ID"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="email"
                name="permanentEmail"
                defaultValue={profileDetails.currentEmailId}
              />
            </div>
          </div>

          {/* Education details */}
          <h3 className="text-lg font-semibold">Education Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="appliedDegree" className="text-sm font-normal">
                Applied degree{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="appliedDegree"
                placeholder="Applied degree"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="appliedDegree"
                defaultValue={profileDetails.appliedDegree}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastQualifying" className="text-sm font-normal">
                Last Qualifying{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="lastQualifying"
                placeholder="Last Qualifying"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="lastQualifying"
                defaultValue={profileDetails.lastQualifying}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="schoolName" className="text-sm font-normal">
                School Name{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="schoolName"
                placeholder="School Name"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="schoolName"
                defaultValue={profileDetails.schoolName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="schoolBranch" className="text-sm font-normal">
                Branch{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="schoolBranch"
                placeholder="Branch"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                defaultValue={profileDetails.schoolBranch}
                name="schoolBranch"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="boardName" className="text-sm font-normal">
                Board / University{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="boardName"
                placeholder="Board / University"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="boardName"
                defaultValue={profileDetails.boardName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="langMedium" className="text-sm font-normal">
                Language Medium{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="langMedium"
                placeholder="Language Medium"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="langMedium"
                defaultValue={profileDetails.langMedium}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="regNo" className="text-sm font-normal">
                Reg.No./Roll No.{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="regNo"
                placeholder="Reg.No./Roll No."
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="regNo"
                defaultValue={profileDetails.regNo}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="gradePercentage" className="text-sm font-normal">
                Percentage Obtained{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="gradePercentage"
                placeholder="Aggregate in %"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="gradePercentage"
                defaultValue={profileDetails.gradePercentage}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="dateOfPassing" className="text-sm font-normal">
                Month & Year of Passing{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="dateOfPassing"
                placeholder="Month & Year of Passing"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="date"
                name="dateOfPassing"
                defaultValue={profileDetails.dateOfPassing}
                //   fillDummy ? dateTo_YYYY_MM_DD(new Date("2019-05-24")) : undefined
                // }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="schoolAddress" className="text-sm font-normal">
                School Address{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="schoolAddress"
                placeholder="School Address"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="schoolAddress"
                defaultValue={profileDetails.schoolAddress}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="schoolCity" className="text-sm font-normal">
                City{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="schoolCity"
                placeholder="City"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="schoolCity"
                defaultValue={profileDetails.schoolCity}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="schoolPincode" className="text-sm font-normal">
                Pincode{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="schoolPincode"
                placeholder="Pincode"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                name="schoolPincode"
                defaultValue={profileDetails.schoolPincode}
              />
            </div>
          </div>

          {/* Family details */}
          <h3 className="text-lg font-semibold">Family Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="noOfBrothers" className="text-sm font-normal">
                No. of brothers{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="noOfBrothers"
                placeholder="No. of brothers"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="number"
                min={0}
                max={10}
                name="noOfBrothers"
                defaultValue={profileDetails.noOfBrothers}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="noOfSisters" className="text-sm font-normal">
                No. of sisters{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="noOfSisters"
                placeholder="No. of sisters"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="number"
                min={0}
                max={10}
                defaultValue={profileDetails.noOfSisters}
                name="noOfSisters"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="siblingStudyingCount"
                className="text-sm font-normal"
              >
                No. of Brothers/Sisters studying in Sairam{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="siblingStudyingCount"
                placeholder="Brothers/Sisters studying in Sairam"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="number"
                min={0}
                max={10}
                name="siblingStudyingCount"
                defaultValue={profileDetails.siblingStudyingCount}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="siblingStudyingDetails"
                className="text-sm font-normal"
              >
                Studying details{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="siblingStudyingDetails"
                placeholder="Studying details"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                name="siblingStudyingDetails"
                defaultValue={profileDetails.siblingStudyingDetails}
                //   fillDummy ? "B.Sc Computer Science, Second Year" : undefined
                // }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Father details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Father Details</h3>

              {/* Father Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherName" className="text-sm font-normal">
                  Name{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherName"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherName"
                  placeholder="Father's Name"
                  defaultValue={profileDetails.fatherParentName}
                />
              </div>

              {/* Father Qualification */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fatherQualification"
                  className="text-sm font-normal"
                >
                  Qualification{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherQualification"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherQualification"
                  placeholder="Father's Qualification"
                  defaultValue={profileDetails.fatherParentQualification}
                />
              </div>

              {/* Father Occupation */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fatherOccupation"
                  className="text-sm font-normal"
                >
                  Occupation{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherOccupation"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherOccupation"
                  placeholder="Father's Occupation"
                  defaultValue={profileDetails.fatherParentOccupation}
                />
              </div>

              {/* Father Organization */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fatherOrganization"
                  className="text-sm font-normal"
                >
                  Organization{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherOrganization"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherOrganization"
                  placeholder="Father's Organization"
                  defaultValue={profileDetails.fatherParentOrganization}
                />
              </div>

              {/* Father Designation */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fatherDesignation"
                  className="text-sm font-normal"
                >
                  Designation{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherDesignation"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherDesignation"
                  placeholder="Father's Designation"
                  defaultValue={profileDetails.fatherParentDesignation}
                />
              </div>

              {/* Father Emp ID */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherEmpId" className="text-sm font-normal">
                  EMP.ID (If employed in SEC/SIT)
                </label>
                <input
                  disabled
                  id="fatherEmpId"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherEmpId"
                  placeholder="Father's EMP.ID"
                  defaultValue={profileDetails.fatherParentEmpId}
                />
              </div>

              {/* Father Mobile */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherMobile" className="text-sm font-normal">
                  Mobile No{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherMobile"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherMobile"
                  placeholder="Father's Mobile No"
                  defaultValue={profileDetails.fatherParentMobileNo}
                />
              </div>

              {/* Father Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherEmail" className="text-sm font-normal">
                  Email ID{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherEmail"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="email"
                  name="fatherEmail"
                  placeholder="Father's Email ID"
                  defaultValue={profileDetails.fatherParentEmailId}
                />
              </div>

              {/* Father Annual Income */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fatherAnnualIncome"
                  className="text-sm font-normal"
                >
                  Annual Income{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherAnnualIncome"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherAnnualIncome"
                  placeholder="Father's Annual Income"
                  defaultValue={profileDetails.fatherParentAnnualIncome}
                />
              </div>

              {/* Father Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherAddress" className="text-sm font-normal">
                  Address{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherAddress"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherAddress"
                  placeholder="Father's Address"
                  defaultValue={profileDetails.fatherParentAddress}
                />
              </div>

              {/* Father City Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherCityName" className="text-sm font-normal">
                  City Name{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherCityName"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="fatherCityName"
                  placeholder="Father's City Name"
                  defaultValue={profileDetails.fatherParentCity}
                />
              </div>

              {/* Father State */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherState" className="text-sm font-normal">
                  State Name{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <select
                  disabled
                  id="fatherState"
                  className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
                  name="fatherState"
                >
                  <option value="select" className="text-sm">
                    Select State
                  </option>
                  {INDIAN_STATES.map((state) => {
                    if (
                      String(state.id) ===
                      String(profileDetails && profileDetails.fatherParentState)
                    )
                      return (
                        <option
                          value={String(state.id)}
                          key={nanoid(6)}
                          selected
                        >
                          {state.state}
                        </option>
                      );
                    else
                      return (
                        <option value={String(state.id)} key={nanoid(6)}>
                          {state.state}
                        </option>
                      );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fatherPincode" className="text-sm font-normal">
                  Pincode{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="fatherPincode"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  name="fatherPincode"
                  placeholder="Father's State Pincode"
                  defaultValue={profileDetails.fatherParentPincode}
                />
              </div>
            </div>

            {/* Mother details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mother Details</h3>

              {/* Mother Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherName" className="text-sm font-normal">
                  Name{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherName"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherName"
                  defaultValue={profileDetails.motherParentName}
                  placeholder="Mother's Name"
                />
              </div>

              {/* Mother Qualification */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="motherQualification"
                  className="text-sm font-normal"
                >
                  Qualification{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherQualification"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherQualification"
                  defaultValue={profileDetails.motherParentQualification}
                  placeholder="Mother's Qualification"
                />
              </div>

              {/* Mother Occupation */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="motherOccupation"
                  className="text-sm font-normal"
                >
                  Occupation{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherOccupation"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherOccupation"
                  defaultValue={profileDetails.motherParentOccupation}
                  placeholder="Mother's Occupation"
                />
              </div>

              {/* Mother Organization */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="motherOrganization"
                  className="text-sm font-normal"
                >
                  Organization{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherOrganization"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherOrganization"
                  defaultValue={profileDetails.motherParentOrganization}
                  placeholder="Mother's Organization"
                />
              </div>

              {/* Mother Designation */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="motherDesignation"
                  className="text-sm font-normal"
                >
                  Designation{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherDesignation"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherDesignation"
                  defaultValue={profileDetails.motherParentDesignation}
                  placeholder="Mother's Designation"
                />
              </div>

              {/* Mother Emp ID */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherEmpId" className="text-sm font-normal">
                  EMP.ID (If employed in SEC/SIT){" "}
                </label>
                <input
                  disabled
                  id="motherEmpId"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherEmpId"
                  defaultValue={profileDetails.motherParentEmpId}
                  placeholder="Mother's EMP.ID"
                />
              </div>

              {/* Mother Mobile */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherMobile" className="text-sm font-normal">
                  Mobile No{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherMobile"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherMobile"
                  defaultValue={profileDetails.motherParentMobileNo}
                  placeholder="Mother's Mobile No"
                />
              </div>

              {/* Mother Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherEmail" className="text-sm font-normal">
                  Email ID{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherEmail"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="email"
                  name="motherEmail"
                  defaultValue={profileDetails.motherParentEmailId}
                  placeholder="Mother's Email ID"
                />
              </div>

              {/* Mother Annual Income */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="motherAnnualIncome"
                  className="text-sm font-normal"
                >
                  Annual Income{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherAnnualIncome"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherAnnualIncome"
                  defaultValue={profileDetails.motherParentAnnualIncome}
                  placeholder="Mother's Annual Income"
                />
              </div>

              {/* Mother Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherAddress" className="text-sm font-normal">
                  Address{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherAddress"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherAddress"
                  defaultValue={profileDetails.motherParentAddress}
                  placeholder="Mother's Address"
                />
              </div>

              {/* Mother City Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherCityName" className="text-sm font-normal">
                  City Name{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherCityName"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  name="motherCityName"
                  defaultValue={profileDetails.motherParentCity}
                  placeholder="Mother's City Name"
                />
              </div>

              {/* Mother State */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherState" className="text-sm font-normal">
                  State Name{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <select
                  disabled
                  id="motherState"
                  className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
                  name="motherState"
                >
                  <option value="select" className="text-sm">
                    Select State
                  </option>
                  {INDIAN_STATES.map((state) => {
                    if (
                      String(state.id) ===
                      String(profileDetails && profileDetails.motherParentState)
                    )
                      return (
                        <option value={state.id} key={nanoid(6)} selected>
                          {state.state}
                        </option>
                      );
                    else
                      return (
                        <option value={state.id} key={nanoid(6)}>
                          {state.state}
                        </option>
                      );
                  })}
                </select>
              </div>

              {/* Mother Pincode */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motherPincode" className="text-sm font-normal">
                  Pincode{" "}
                  <span className="text-sm font-semibold text-red-500">*</span>
                </label>
                <input
                  disabled
                  id="motherPincode"
                  className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  name="motherPincode"
                  defaultValue={profileDetails.motherParentPincode}
                  placeholder="Mother's State Pincode"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="place" className="text-sm font-normal">
                Place{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="place"
                className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="text"
                defaultValue={profileDetails.place}
                name="place"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm font-normal">
                Date{" "}
                <span className="text-sm font-semibold text-red-500">*</span>
              </label>
              <input
                disabled
                id="date"
                className="pointer-events-none rounded-md bg-white px-3 py-1.5 opacity-50 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
                type="date"
                name="date"
                defaultValue={dateTo_YYYY_MM_DD(
                  new Date(profileDetails.updatedAt),
                )}
              />
            </div>
          </div>

          {/* Declaration */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="parentSignature"
                className={`pointer-events-none flex cursor-pointer flex-col gap-3 text-sm font-normal`}
              >
                Signature of the Parent
                <div className="flex items-center justify-center gap-3 rounded-md border-[3px] border-dashed bg-white p-5 placeholder:text-sm">
                  {parentSignature ? (
                    <>
                      <img
                        className={`h-auto w-28`}
                        src={
                          parentSignature instanceof Blob
                            ? URL.createObjectURL(parentSignature)
                            : parentSignature
                        }
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      <LuUploadCloud color="#8a8a8a" />
                      <p className="text-xs text-slate-500">Upload</p>
                    </>
                  )}
                </div>
              </label>
              <input
                disabled
                id="parentSignature"
                className="hidden"
                type="file"
                accept="image/*"
                name="parentSignature"
                // onChange={handleImageUpload}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="candidateSignature"
                className={`pointer-events-none flex cursor-pointer flex-col gap-3 text-sm font-normal`}
              >
                Signature of the Candidate
                <div className="flex items-center justify-center gap-3 rounded-md border-[3px] border-dashed bg-white p-5 placeholder:text-sm">
                  {candidateSignature ? (
                    <>
                      <img
                        className={`h-auto w-28`}
                        src={
                          candidateSignature instanceof Blob
                            ? URL.createObjectURL(candidateSignature)
                            : candidateSignature
                        }
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      <LuUploadCloud color="#8a8a8a" />
                      <p className="text-xs text-slate-500">Upload</p>
                    </>
                  )}
                </div>
              </label>
              <input
                disabled
                id="candidateSignature"
                className="hidden"
                type="file"
                accept="image/*"
                name="candidateSignature"
                // onChange={handleImageUpload}
              />
            </div>
          </div>

          <Button
            variant="secondary"
            label={"Download PDF"}
            type="button"
            className={`mb-6 w-fit px-3 transition-all`}
            to={{ url: `/pdf/${profileDetails.userId}`, target: "_blank" }}
          />

          {/* Buttons */}
          {profileDetails.hasRequested && (
            <fetcher.Form
              className="flex items-center justify-end gap-2"
              method="POST"
            >
              <h1>{profileDetails.name} has request to edit</h1>
              <Button
                label={"Accept"}
                name="intent"
                value="accept"
                className="max-w-fit px-6"
              />
              <Button
                label={"Deny"}
                name="intent"
                value="deny"
                variant="secondary"
                className="max-w-fit px-6 text-red-500 outline-red-400"
              />
              <input
                type="hidden"
                name="userId"
                value={profileDetails.userId}
              />
            </fetcher.Form>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminUserDetails;

export { ErrorCatch as ErrorBoundary } from "@/components/ui/error-boundary";
