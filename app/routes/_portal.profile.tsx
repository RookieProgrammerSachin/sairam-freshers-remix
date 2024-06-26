import { MetaFunction, useFetcher, useLoaderData } from "@remix-run/react";
import { ErrorBoundary } from "@/root";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { requireAuthCookie } from "@/utils/auth";
import {
  COMMUNITIES,
  DB_TO_FORM_MAP,
  INDIAN_STATES,
} from "@/static/portal.profile";
import Button from "@/components/ui/button";
import { createObjectFromFormData, dateTo_YYYY_MM_DD } from "@/utils";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  DeclarationDetails,
  getAllProfileDetails,
  insertProfileDetails,
  requestEdit,
  updateProfileDetails,
  uploadImage,
  type CurrentAddressDetails,
  type EducationDetails,
  type FamilyDetails,
  type FatherDetails,
  type MotherDetails,
  type PermanentAddressDetails,
  type PersonalDetails,
} from "@/db/queries";
import { ProfileFormErrorType, validateProfileData } from "@/utils/validate";
import { nanoid } from "nanoid";
import { LuUploadCloud } from "react-icons/lu";
import Spinner from "@/components/ui/spinner";

export type SubmitResponseType = {
  message?: string;
  error?: ProfileFormErrorType | string;
  imgURL?: {
    parentSignature?: string;
    candidateSignature?: string;
  };
};

export type ProfileFormSubmitType = {
  intent: "data";
  name: string;
  dob: string;
  motherTongue: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  community: string;
  hostelRequired: string;
  currentAddress: string;
  currentArea: string;
  currentCity: string;
  currentPincode: string;
  currentState: string;
  currentCountry: string;
  currentLandLine: string;
  currentMobile: string;
  currentEmail: string;
  permanentAddress: string;
  permanentArea: string;
  permanentCity: string;
  permanentPincode: string;
  permanentState: string;
  permanentCountry: string;
  permanentLandLine: string;
  permanentMobile: string;
  permanentEmail: string;
  appliedDegree: string;
  lastQualifying: string;
  schoolName: string;
  schoolBranch: string;
  boardName: string;
  langMedium: string;
  regNo: string;
  gradePercentage: string;
  dateOfPassing: string;
  schoolAddress: string;
  schoolCity: string;
  schoolPincode: string;
  noOfBrothers: string;
  noOfSisters: string;
  siblingStudyingCount: string;
  siblingStudyingDetails: string;
  fatherName: string;
  fatherQualification: string;
  fatherOccupation: string;
  fatherOrganization: string;
  fatherDesignation: string;
  fatherEmpId: string;
  fatherMobile: string;
  fatherEmail: string;
  fatherAnnualIncome: string;
  fatherAddress: string;
  fatherCityName: string;
  fatherState: string;
  fatherPincode: string;
  motherName: string;
  motherQualification: string;
  motherOccupation: string;
  motherOrganization: string;
  motherDesignation: string;
  motherEmpId: string;
  motherMobile: string;
  motherEmail: string;
  motherAnnualIncome: string;
  motherAddress: string;
  motherCityName: string;
  motherState: string;
  motherPincode: string;
  place: string;
  date: string;
  parentSignature: string;
  candidateSignature: string;
  parentSignatureURL: string;
  candidateSignatureURL: string;
};

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Settings | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  const profileDetails = await getAllProfileDetails(user.userId as string);
  return profileDetails;
}

export async function action({ request }: ActionFunctionArgs) {
  const INTENTS = ["data", "request", "edit"];
  const user = await requireAuthCookie(request);
  try {
    const data = await request.formData();
    console.log("🚀 ~ action ~ data:", data);
    const intent = data.get("intent");

    if (!INTENTS.includes(String(intent))) {
      return json({ error: "Invalid request method!" });
    }
    const dataObject = createObjectFromFormData(
      data,
    ) as unknown as ProfileFormSubmitType;
    console.log(dataObject);

    if (intent === "request") {
      // procedure to call edit function
      const response = await requestEdit(user.userId ?? "");
      if (!response)
        return json({
          error: "Request already processed. Please continue editing.",
        } as SubmitResponseType);
      if (response.length === 1 && response[0].hasRequested)
        return json({ message: "Request has been sent" } as SubmitResponseType);
      else
        return json({
          error: "Request was sent, but we were unable to process it",
        } as SubmitResponseType);
    }

    const parentSignatureFile = data.get("parentSignature");
    const candidateSignatureFile = data.get("candidateSignature");

    /** Huge ass checks to ensure that it either File or string and they are valid */
    if (
      !parentSignatureFile ||
      !candidateSignatureFile ||
      (parentSignatureFile instanceof Blob &&
        (parentSignatureFile.size === 0 ||
          !parentSignatureFile.type.includes("image"))) ||
      (candidateSignatureFile instanceof Blob &&
        (candidateSignatureFile.size === 0 ||
          !candidateSignatureFile.type.includes("image"))) ||
      (parentSignatureFile instanceof String &&
        !parentSignatureFile.startsWith("https://")) ||
      (candidateSignatureFile instanceof String &&
        !candidateSignatureFile.startsWith("https://"))
    ) {
      return json({ error: "Invalid images!" } as SubmitResponseType, 400);
    }

    const validation = validateProfileData(dataObject);
    if (Object.keys(validation).length > 0)
      return json({ error: validation } as SubmitResponseType, 400);

    const personalDetails: PersonalDetails = {
      bloodGroup: dataObject.bloodGroup,
      community: dataObject.community,
      dateOfBirth: new Date(dataObject.dob).toDateString(),
      hostelRequired: dataObject.hostelRequired === "yes",
      motherTongue: dataObject.motherTongue,
      name: dataObject.name,
      nationality: dataObject.nationality,
      religion: dataObject.religion,
    };
    const educationDetails: EducationDetails = {
      appliedDegree: dataObject.appliedDegree,
      lastQualifying: dataObject.lastQualifying,
      schoolBranch: dataObject.schoolBranch,
      schoolName: dataObject.schoolName,
      boardName: dataObject.boardName,
      langMedium: dataObject.langMedium,
      regNo: dataObject.regNo,
      gradePercentage: dataObject.gradePercentage,
      dateOfPassing: dataObject.dateOfPassing,
      schoolAddress: dataObject.schoolAddress,
      schoolCity: dataObject.schoolCity,
      schoolPincode: dataObject.schoolPincode,
    };

    const currentAddressDetails: CurrentAddressDetails = {
      type: "current",
      emailId: dataObject.currentEmail,
      addressLine1: dataObject.currentAddress,
      addressLine2: dataObject.currentArea,
      city: dataObject.currentCity,
      pincode: dataObject.currentPincode,
      state: parseInt(dataObject.currentState),
      country: dataObject.currentCountry,
      mobileNumber: dataObject.currentMobile,
      phoneNo: dataObject.currentLandLine ?? null,
    };

    const permanentAddressDetails: PermanentAddressDetails = {
      type: "permanent",
      emailId: dataObject.permanentEmail,
      addressLine1: dataObject.permanentAddress,
      addressLine2: dataObject.permanentArea,
      city: dataObject.permanentCity,
      pincode: dataObject.permanentPincode,
      state: parseInt(dataObject.permanentState),
      country: dataObject.permanentCountry,
      mobileNumber: dataObject.permanentMobile,
      phoneNo: dataObject.permanentLandLine ?? null,
    };

    const familyDetails: FamilyDetails = {
      noOfBrothers: parseInt(dataObject.noOfBrothers),
      noOfSisters: parseInt(dataObject.noOfSisters),
      siblingStudyingCount: parseInt(dataObject.siblingStudyingCount),
      siblingStudyingDetails: dataObject.siblingStudyingDetails,
    };

    const motherDetails: MotherDetails = {
      parentType: "mother",
      parentAddress: dataObject.motherAddress,
      parentAnnualIncome: dataObject.motherAnnualIncome,
      parentCity: dataObject.motherCityName,
      parentDesignation: dataObject.motherDesignation,
      parentEmailId: dataObject.motherEmail,
      parentEmpId: dataObject.motherEmpId,
      parentMobileNo: dataObject.motherMobile,
      parentName: dataObject.motherName,
      parentOccupation: dataObject.motherOccupation,
      parentOrganization: dataObject.motherOrganization,
      parentPhoneNo: null, // --> I am not receiving data from frontend cuz no one really uses landline anyway, so
      parentPincode: dataObject.motherPincode,
      parentQualification: dataObject.motherQualification,
      parentState: parseInt(dataObject.motherState),
    };

    const fatherDetails: FatherDetails = {
      parentType: "father",
      parentAddress: dataObject.fatherAddress,
      parentAnnualIncome: dataObject.fatherAnnualIncome,
      parentCity: dataObject.fatherCityName,
      parentDesignation: dataObject.fatherDesignation,
      parentEmailId: dataObject.fatherEmail,
      parentEmpId: dataObject.fatherEmpId,
      parentMobileNo: dataObject.fatherMobile,
      parentName: dataObject.fatherName,
      parentOccupation: dataObject.fatherOccupation,
      parentOrganization: dataObject.fatherOrganization,
      parentPhoneNo: null, // --> I am not receiving data from frontend cuz no one really uses landline anyway, so
      parentPincode: dataObject.fatherPincode,
      parentQualification: dataObject.fatherQualification,
      parentState: parseInt(dataObject.fatherState),
    };

    if (intent === "data") {
      const parentSignature =
        parentSignatureFile instanceof Blob
          ? await uploadImage(parentSignatureFile)
          : parentSignatureFile;
      const candidateSignature =
        candidateSignatureFile instanceof Blob
          ? await uploadImage(candidateSignatureFile)
          : candidateSignatureFile;

      if (!parentSignature || !candidateSignature) {
        return json({ error: "Something went wrong in uploading images!" });
      }

      const declarationDetails: DeclarationDetails = {
        candidateSignature: candidateSignature ?? "",
        parentSignature: parentSignature ?? "",
        place: dataObject.place,
        date: new Date(),
      };

      const submitProfileDetailsRequest = await insertProfileDetails(
        user.id as string,
        personalDetails,
        educationDetails,
        currentAddressDetails,
        permanentAddressDetails,
        familyDetails,
        motherDetails,
        fatherDetails,
        declarationDetails,
      );

      if (submitProfileDetailsRequest !== "data")
        return json({
          error: "Something went wrong with saving your data",
        }) as SubmitResponseType;

      return json({
        message: "Profile details have been saved successfully!",
      }) as SubmitResponseType;
    } else if (intent === "edit") {
      const parentSignature =
        parentSignatureFile instanceof Blob
          ? await uploadImage(parentSignatureFile)
          : parentSignatureFile;
      const candidateSignature =
        candidateSignatureFile instanceof Blob
          ? await uploadImage(candidateSignatureFile)
          : candidateSignatureFile;

      if (!parentSignature || !candidateSignature) {
        return json({ error: "Something went wrong in uploading images!" });
      }

      const declarationDetails: DeclarationDetails = {
        candidateSignature: candidateSignature ?? "",
        parentSignature: parentSignature ?? "",
        place: dataObject.place,
        date: new Date(),
      };

      const editProfileDetailsRequest = await updateProfileDetails(
        user.id as string,
        personalDetails,
        educationDetails,
        currentAddressDetails,
        permanentAddressDetails,
        familyDetails,
        motherDetails,
        fatherDetails,
        declarationDetails,
      );

      if (editProfileDetailsRequest !== "edit")
        return json({
          error: "Something went wrong with saving your data",
        }) as SubmitResponseType;

      return json({ message: "Okay!" }) as SubmitResponseType;
    }
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
    return json({ error: "Server error!" }) as SubmitResponseType;
  }
}

/** For now let all fields be in the same page
 * later down the line change it to span across multiple pages
 */

function Page() {
  const profileDetails = useLoaderData<typeof loader>();

  // const [fillDummy, setFillDummy] = useState(false);
  const currentAddressContainer = useRef<HTMLDivElement>(null);
  const permanentAddressContainer = useRef<HTMLDivElement>(null);
  const gradeInputRef = useRef<HTMLInputElement>(null);

  const fetcher = useFetcher<SubmitResponseType>();
  const isSubmitting = fetcher.state !== "idle";

  const [parentSignature, setParentSignature] = useState<Blob | string>();
  const [candidateSignature, setCandidateSignature] = useState<Blob | string>();

  useEffect(() => {
    const fillDetails = async () => {
      if (profileDetails) {
        Object.keys(profileDetails).forEach((data) => {
          const elem = document.querySelector<HTMLInputElement>(
            // @ts-expect-error annoying key error
            `input[name=${DB_TO_FORM_MAP[data]}]`,
          );

          if (elem) {
            elem.defaultValue = String(
              profileDetails[data as keyof typeof profileDetails],
            );
            if (!profileDetails.canEdit) {
              elem.disabled = true;
              elem.classList.add("disabled");
            }
          }
        });

        /** Disabling select dropdowns */
        const selectInputs =
          document.querySelectorAll<HTMLSelectElement>(`select`);
        selectInputs.forEach((elem) => {
          if (!profileDetails.canEdit) {
            elem.disabled = true;
            elem.classList.add("disabled");
          }
        });

        setParentSignature(profileDetails.parentSignature);
        setCandidateSignature(profileDetails.candidateSignature);
      } //else if localstorage data available use its data to autofill shit
    };

    fillDetails();
  }, [profileDetails]);

  if (fetcher.data?.message) {
    toast.success(fetcher.data.message);
    fetcher.data.message = undefined;
  }

  if (fetcher.data?.error) {
    console.log("🚀 ~ Page ~ fetcher.data?.error:", fetcher.data?.error);
    if (typeof fetcher.data.error === "string") {
      toast.error(fetcher.data.error);
    } else {
      fetcher.data?.error.motherState &&
        Object.keys(fetcher.data?.error).forEach((err) => {
          const errrs = fetcher.data?.error;
          // @ts-expect-error chi!
          toast.error(errrs[err], {
            autoClose: false,
            closeOnClick: false,
          });
        });
    }
    fetcher.data.error = undefined;
  }

  const fillPermanentAddress = (action: boolean) => {
    const currentInputFields =
      currentAddressContainer.current?.querySelectorAll("input");
    const permanentInputFields =
      permanentAddressContainer.current?.querySelectorAll("input");

    /** additionally check if i forgot to change input fields count in both of them in case fields changed as implied by 3rd or check below */
    if (
      !currentInputFields ||
      !permanentInputFields ||
      currentInputFields.length !== permanentInputFields.length
    )
      return;

    // Since current address fields and permanent address fields are in same order, imma just loop through them and fill value with index
    for (let i = 0; i < permanentInputFields.length; i++) {
      permanentInputFields[i].value = action ? currentInputFields[i].value : "";
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.currentTarget.files?.[0];
    console.log("🚀 ~ handleImageUpload ~ image:", image);
    const fieldName = e.currentTarget.name;
    if (!image || !fieldName) {
      if (profileDetails && profileDetails.parentSignature) {
        setParentSignature(profileDetails.parentSignature);
        setCandidateSignature(profileDetails.candidateSignature);
        return;
      }
      return;
    }

    const imgBlob = new Blob([await image.arrayBuffer()], { type: image.type });
    if (fieldName === "parentSignature") setParentSignature(imgBlob);
    if (fieldName === "candidateSignature") setCandidateSignature(imgBlob);
  };

  return (
    <fetcher.Form
      className="space-y-8 md:space-y-5"
      method="POST"
      encType="multipart/form-data"
    >
      {/* Personal details */}
      <h3 className="text-lg font-semibold">Personal Details</h3>
      {/* <button onClick={() => setFillDummy(!fillDummy)}>
        Fill dummy details
      </button> */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-normal">
            Name <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="name"
            placeholder="Name"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="name"
            // defaultValue={fillDummy ? "Filler name" : undefined}
            autoComplete="true"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dob" className="text-sm font-normal">
            Date of Birth{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="dob"
            placeholder="Date of Birth"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="date"
            required
            name="dob"
            // defaultValue={fillDummy ? "2006-01-01" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="motherTongue" className="text-sm font-normal">
            Mother Tongue{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="motherTongue"
            placeholder="Mother Tongue"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="motherTongue"
            // defaultValue={fillDummy ? "Some mother tongue" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="bloodGroup" className="text-sm font-normal">
            Blood Group{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="bloodGroup"
            placeholder="Blood Group"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="bloodGroup"
            // defaultValue={fillDummy ? "O+" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="nationality" className="text-sm font-normal">
            Nationality{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="nationality"
            placeholder="Nationality"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="nationality"
            // defaultValue={fillDummy ? "Indian" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="religion" className="text-sm font-normal">
            Religion{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="religion"
            placeholder="Religion"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="religion"
            // defaultValue={fillDummy ? "Modism" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="community" className="text-sm font-normal">
            Community{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <select
            id="community"
            className="rounded-md bg-white px-3 py-1.5 text-sm outline outline-1 outline-gray-200 focus:outline-gray-300"
            required
            name="community"
          >
            <option value="select">Select</option>
            {COMMUNITIES.map((community) => {
              if (community === (profileDetails && profileDetails.community)) {
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
            id="hostelRequired"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            required
            // defaultValue={profileDetails.hostelRequired ? "yes" : "no"}
            name="hostelRequired"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      {/* Current residential address */}
      <h3 className="text-lg font-semibold">Current Residential Address</h3>
      <div className="grid gap-4 md:grid-cols-2" ref={currentAddressContainer}>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentAddress" className="text-sm font-normal">
            Door No. / Plot No. / Street Name{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentAddress"
            placeholder="Door No. / Plot No. / Street Name"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="currentAddress"
            // defaultValue={fillDummy ? "123, Some Street" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentArea" className="text-sm font-normal">
            Area / Mandal{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentArea"
            placeholder="Area / Mandal"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="currentArea"
            // defaultValue={fillDummy ? "Tenyampet" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentCity" className="text-sm font-normal">
            City Name{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentCity"
            placeholder="City Name"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="currentCity"
            // defaultValue={fillDummy ? "Chennai" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentPincode" className="text-sm font-normal">
            Pincode / Zipcode{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentPincode"
            placeholder="Pincode / Zipcode"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            required
            name="currentPincode"
            // defaultValue={fillDummy ? "600123" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentState" className="text-sm font-normal">
            State <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <select
            id="currentState"
            className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
            required
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
            id="currentCountry"
            placeholder="Country"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="currentCountry"
            // defaultValue={fillDummy ? "India" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentLandLine" className="text-sm font-normal">
            Phone No. (LandLine)
          </label>
          <input
            id="currentLandLine"
            placeholder="Phone No. (LandLine)"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            name="currentLandLine"
            // defaultValue={fillDummy ? "0441234567" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentMobile" className="text-sm font-normal">
            Mobile Number{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentMobile"
            placeholder="Mobile Number"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            inputMode="numeric"
            pattern="[6-9]\d{9}"
            required
            name="currentMobile"
            // defaultValue={fillDummy ? "9123456789" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentEmail" className="text-sm font-normal">
            Email ID{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentEmail"
            placeholder="Email ID"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="email"
            required
            name="currentEmail"
            // defaultValue={fillDummy ? "example@example.com" : undefined}
          />
        </div>
      </div>

      {/* Permanent address */}
      <h3 className="flex items-center gap-4 text-lg font-semibold">
        Permanent Residential Address{" "}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="sameAddress"
            id="sameAddress"
            className="h-3 w-3 rounded-full border-gray-600 bg-gray-100 text-blue-600 ring-offset-gray-800 focus:ring-1 focus:ring-blue-500"
            onChange={(e) => fillPermanentAddress(e.currentTarget.checked)}
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
        ref={permanentAddressContainer}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentAddress" className="text-sm font-normal">
            Door No. / Plot No. / Street Name{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentAddress"
            placeholder="Door No. / Plot No. / Street Name"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="permanentAddress"
            // defaultValue={fillDummy ? "no.8, 10th street" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentArea" className="text-sm font-normal">
            Area / Mandal{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentArea"
            placeholder="Area / Mandal"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="permanentArea"
            // defaultValue={fillDummy ? "Downtown" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentCity" className="text-sm font-normal">
            City Name{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentCity"
            placeholder="City Name"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="permanentCity"
            // defaultValue={fillDummy ? "Springfield" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentPincode" className="text-sm font-normal">
            Pincode / Zipcode{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentPincode"
            placeholder="Pincode / Zipcode"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            required
            name="permanentPincode"
            // defaultValue={fillDummy ? "650156" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentState" className="text-sm font-normal">
            State <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <select
            id="permanentState"
            className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
            required
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
            id="permanentCountry"
            placeholder="Country"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="permanentCountry"
            // defaultValue={fillDummy ? "India" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentLandLine" className="text-sm font-normal">
            Phone No. (LandLine){" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentLandLine"
            placeholder="Phone No. (LandLine)"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            name="permanentLandLine"
            // defaultValue={fillDummy ? "04412345678" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentMobile" className="text-sm font-normal">
            Mobile Number{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentMobile"
            placeholder="Mobile Number"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="permanentMobile"
            // defaultValue={fillDummy ? "9876543210" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permanentEmail" className="text-sm font-normal">
            Email ID{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="permanentEmail"
            placeholder="Email ID"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="email"
            required
            name="permanentEmail"
            // defaultValue={fillDummy ? "example1@example.com" : undefined}
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
            id="appliedDegree"
            placeholder="Applied degree"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="appliedDegree"
            // defaultValue={fillDummy ? "B.Sc Computer Science" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastQualifying" className="text-sm font-normal">
            Last Qualifying{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="lastQualifying"
            placeholder="Last Qualifying"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="lastQualifying"
            // defaultValue={fillDummy ? "Higher Secondary" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="schoolName" className="text-sm font-normal">
            School Name{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="schoolName"
            placeholder="School Name"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="schoolName"
            // defaultValue={fillDummy ? "ABC High School" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="schoolBranch" className="text-sm font-normal">
            Branch <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="schoolBranch"
            placeholder="Branch"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="schoolBranch"
            // defaultValue={fillDummy ? "Science" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="boardName" className="text-sm font-normal">
            Board / University{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="boardName"
            placeholder="Board / University"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="boardName"
            // defaultValue={fillDummy ? "State Board" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="langMedium" className="text-sm font-normal">
            Language Medium{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="langMedium"
            placeholder="Language Medium"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="langMedium"
            // defaultValue={fillDummy ? "English" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="regNo" className="text-sm font-normal">
            Reg.No./Roll No.{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="regNo"
            placeholder="Reg.No./Roll No."
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="regNo"
            // defaultValue={fillDummy ? "123456789" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="gradePercentage" className="text-sm font-normal">
            Percentage Obtained{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="gradePercentage"
            placeholder="Aggregate in %"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            ref={gradeInputRef}
            onInput={(e) =>
              (e.currentTarget.value =
                e.currentTarget.value.replace("%", "") + "%")
            }
            required
            name="gradePercentage"
            // defaultValue={fillDummy ? "93.33" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dateOfPassing" className="text-sm font-normal">
            Month & Year of Passing{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="dateOfPassing"
            placeholder="Month & Year of Passing"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="date"
            required
            name="dateOfPassing"
            // defaultValue={
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
            id="schoolAddress"
            placeholder="School Address"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="schoolAddress"
            // defaultValue={fillDummy ? "123, Main Street" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="schoolCity" className="text-sm font-normal">
            City <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="schoolCity"
            placeholder="City"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="schoolCity"
            // defaultValue={fillDummy ? "Chennai" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="schoolPincode" className="text-sm font-normal">
            Pincode{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="schoolPincode"
            placeholder="Pincode"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            required
            name="schoolPincode"
            // defaultValue={fillDummy ? "600064" : undefined}
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
            id="noOfBrothers"
            placeholder="No. of brothers"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="number"
            min={0}
            max={10}
            required
            name="noOfBrothers"
            // defaultValue={fillDummy ? "2" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="noOfSisters" className="text-sm font-normal">
            No. of sisters{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="noOfSisters"
            placeholder="No. of sisters"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="number"
            min={0}
            max={10}
            required
            name="noOfSisters"
            // defaultValue={fillDummy ? "1" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="siblingStudyingCount" className="text-sm font-normal">
            No. of Brothers/Sisters studying in Sairam{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="siblingStudyingCount"
            placeholder="Brothers/Sisters studying in Sairam"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="number"
            min={0}
            max={10}
            required
            name="siblingStudyingCount"
            // defaultValue={fillDummy ? "1" : undefined}
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
            id="siblingStudyingDetails"
            placeholder="Studying details"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="siblingStudyingDetails"
            // defaultValue={
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
              Name <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherName"
              placeholder="Father's Name"
              // defaultValue={fillDummy ? "John Doe" : undefined}
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
              id="fatherQualification"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherQualification"
              placeholder="Father's Qualification"
              // defaultValue={fillDummy ? "Bachelor's Degree" : undefined}
            />
          </div>

          {/* Father Occupation */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherOccupation" className="text-sm font-normal">
              Occupation{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherOccupation"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherOccupation"
              placeholder="Father's Occupation"
              // defaultValue={fillDummy ? "Engineer" : undefined}
            />
          </div>

          {/* Father Organization */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherOrganization" className="text-sm font-normal">
              Organization{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherOrganization"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherOrganization"
              placeholder="Father's Organization"
              // defaultValue={fillDummy ? "ABC Corporation" : undefined}
            />
          </div>

          {/* Father Designation */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherDesignation" className="text-sm font-normal">
              Designation{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherDesignation"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherDesignation"
              placeholder="Father's Designation"
              // defaultValue={fillDummy ? "Senior Engineer" : undefined}
            />
          </div>

          {/* Father Emp ID */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherEmpId" className="text-sm font-normal">
              EMP.ID (If employed in SEC/SIT)
            </label>
            <input
              id="fatherEmpId"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              name="fatherEmpId"
              placeholder="Father's EMP.ID"
              // defaultValue={fillDummy ? "123456" : undefined}
            />
          </div>

          {/* Father Mobile */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherMobile" className="text-sm font-normal">
              Mobile No{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherMobile"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherMobile"
              placeholder="Father's Mobile No"
              // defaultValue={fillDummy ? "9876543210" : undefined}
            />
          </div>

          {/* Father Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherEmail" className="text-sm font-normal">
              Email ID{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherEmail"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="email"
              required
              name="fatherEmail"
              placeholder="Father's Email ID"
              // defaultValue={fillDummy ? "john.doe@example.com" : undefined}
            />
          </div>

          {/* Father Annual Income */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherAnnualIncome" className="text-sm font-normal">
              Annual Income{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherAnnualIncome"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherAnnualIncome"
              placeholder="Father's Annual Income"
              // defaultValue={fillDummy ? "800000" : undefined}
            />
          </div>

          {/* Father Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherAddress" className="text-sm font-normal">
              Address{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherAddress"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherAddress"
              placeholder="Father's Address"
              // defaultValue={fillDummy ? "123 Main Street" : undefined}
            />
          </div>

          {/* Father City Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherCityName" className="text-sm font-normal">
              City Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherCityName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherCityName"
              placeholder="Father's City Name"
              // defaultValue={fillDummy ? "New York" : undefined}
            />
          </div>

          {/* Father State */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherState" className="text-sm font-normal">
              State Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <select
              id="fatherState"
              className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
              required
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
                    <option value={String(state.id)} key={nanoid(6)} selected>
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
              id="fatherPincode"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              required
              name="fatherPincode"
              placeholder="Father's State Pincode"
              // defaultValue={fillDummy ? "600023" : undefined}
            />
          </div>
        </div>

        {/* Mother details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mother Details</h3>

          {/* Mother Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherName" className="text-sm font-normal">
              Name <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherName"
              placeholder="Mother's Name"
              // defaultValue={fillDummy ? "Jane Doe" : undefined}
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
              id="motherQualification"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherQualification"
              placeholder="Mother's Qualification"
              // defaultValue={fillDummy ? "Master's Degree" : undefined}
            />
          </div>

          {/* Mother Occupation */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherOccupation" className="text-sm font-normal">
              Occupation{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherOccupation"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherOccupation"
              placeholder="Mother's Occupation"
              // defaultValue={fillDummy ? "Doctor" : undefined}
            />
          </div>

          {/* Mother Organization */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherOrganization" className="text-sm font-normal">
              Organization{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherOrganization"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherOrganization"
              placeholder="Mother's Organization"
              // defaultValue={fillDummy ? "XYZ Hospital" : undefined}
            />
          </div>

          {/* Mother Designation */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherDesignation" className="text-sm font-normal">
              Designation{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherDesignation"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherDesignation"
              placeholder="Mother's Designation"
              // defaultValue={fillDummy ? "Chief Surgeon" : undefined}
            />
          </div>

          {/* Mother Emp ID */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherEmpId" className="text-sm font-normal">
              EMP.ID (If employed in SEC/SIT){" "}
            </label>
            <input
              id="motherEmpId"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              name="motherEmpId"
              placeholder="Mother's EMP.ID"
              // defaultValue={fillDummy ? "654321" : undefined}
            />
          </div>

          {/* Mother Mobile */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherMobile" className="text-sm font-normal">
              Mobile No{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherMobile"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherMobile"
              placeholder="Mother's Mobile No"
              // defaultValue={fillDummy ? "9876543210" : undefined}
            />
          </div>

          {/* Mother Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherEmail" className="text-sm font-normal">
              Email ID{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherEmail"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="email"
              required
              name="motherEmail"
              placeholder="Mother's Email ID"
              // defaultValue={fillDummy ? "jane.doe@example.com" : undefined}
            />
          </div>

          {/* Mother Annual Income */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherAnnualIncome" className="text-sm font-normal">
              Annual Income{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherAnnualIncome"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherAnnualIncome"
              placeholder="Mother's Annual Income"
              // defaultValue={fillDummy ? "750000" : undefined}
            />
          </div>

          {/* Mother Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherAddress" className="text-sm font-normal">
              Address{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherAddress"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherAddress"
              placeholder="Mother's Address"
              // defaultValue={fillDummy ? "456 Oak Avenue" : undefined}
            />
          </div>

          {/* Mother City Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherCityName" className="text-sm font-normal">
              City Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherCityName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherCityName"
              placeholder="Mother's City Name"
              // defaultValue={fillDummy ? "Los Angeles" : undefined}
            />
          </div>

          {/* Mother State */}
          <div className="flex flex-col gap-2">
            <label htmlFor="motherState" className="text-sm font-normal">
              State Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <select
              id="motherState"
              className="rounded-md bg-white px-3 py-1.5 text-[15px] outline outline-1 outline-gray-200 focus:outline-gray-300"
              required
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
              id="motherPincode"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              required
              name="motherPincode"
              placeholder="Mother's State Pincode"
              // defaultValue={fillDummy ? "900123" : undefined}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="place" className="text-sm font-normal">
            Place <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="place"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="place"
            // defaultValue={fillDummy ? "Chennai" : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm font-normal">
            Date <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="date"
            className="pointer-events-none rounded-md bg-white px-3 py-1.5 opacity-50 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="date"
            required
            name="date"
            disabled
            defaultValue={dateTo_YYYY_MM_DD()}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="parentSignature"
            className={`flex cursor-pointer flex-col gap-3 text-sm font-normal ${profileDetails && !profileDetails.canEdit && "disabled"}`}
            onClick={() => setParentSignature(() => new Blob([]))}
            aria-hidden={true}
          >
            Signature of the Parent
            <div className="flex items-center justify-center gap-3 rounded-md border-[3px] border-dashed bg-white p-5 placeholder:text-sm">
              {parentSignature ? (
                <>
                  <img
                    className={`h-auto ${isSubmitting ? "opacity-60" : ""} w-28`}
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
          {parentSignature instanceof Blob ? (
            <input
              id="parentSignature"
              className="hidden"
              type="file"
              accept="image/*"
              name="parentSignature"
              onChange={handleImageUpload}
            />
          ) : (
            <input
              type="hidden"
              name="parentSignature"
              value={parentSignature}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="candidateSignature"
            className={`flex cursor-pointer flex-col gap-3 text-sm font-normal ${profileDetails && !profileDetails.canEdit && "disabled"}`}
            onClick={() => setCandidateSignature(() => new Blob([]))}
            aria-hidden={true}
          >
            Signature of the Candidate
            <div className="flex items-center justify-center gap-3 rounded-md border-[3px] border-dashed bg-white p-5 placeholder:text-sm">
              {candidateSignature ? (
                <>
                  <img
                    className={`h-auto ${isSubmitting ? "opacity-60" : ""} w-28`}
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
          {candidateSignature instanceof Blob ? (
            <input
              id="candidateSignature"
              className="hidden"
              type="file"
              accept="image/*"
              name="candidateSignature"
              onInput={handleImageUpload}
            />
          ) : (
            <input
              type="hidden"
              value={candidateSignature}
              name="candidateSignature"
            />
          )}
        </div>
      </div>

      <div className="flex w-full justify-end gap-3">
        {profileDetails && (
          <Button
            variant="secondary"
            label={"Download PDF"}
            type="button"
            className={`mb-6 w-fit px-3 transition-all`}
            to={{ url: `/pdf/${profileDetails.userId}`, target: "_blank" }}
          />
        )}
        {profileDetails && !profileDetails.canEdit && (
          <>
            <Button
              disabled={
                (isSubmitting &&
                  fetcher.formData?.get("intent") === "request") ||
                profileDetails.hasRequested
              }
              disabledComponent={
                profileDetails.hasRequested ? (
                  <></>
                ) : (
                  <Spinner className="border-blue-500" />
                )
              }
              variant="secondary"
              label={
                profileDetails.hasRequested
                  ? "Edit request being processed"
                  : "Edit request"
              }
              type="button"
              className={`mb-6 w-fit px-3 transition-all`}
              onClick={() => {
                const requestForm = new FormData();
                requestForm.append("intent", "request");
                fetcher.submit(requestForm, {
                  navigate: false,
                  method: "POST",
                });
              }}
            />
          </>
        )}
        <Button
          name="intent"
          value={profileDetails && profileDetails.canEdit ? "edit" : "data"}
          disabled={
            isSubmitting &&
            ["data", "edit"].includes(String(fetcher.formData?.get("intent")))
          }
          label="Submit"
          className={`mb-6 w-fit px-8 ${profileDetails && !profileDetails.canEdit ? "disabled" : ""}`}
        />
      </div>
    </fetcher.Form>
  );
}

export default Page;

export { ErrorBoundary };
