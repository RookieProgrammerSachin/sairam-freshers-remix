import { MetaFunction } from "@remix-run/react";
import { ErrorBoundary } from "@/root";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireAuthCookie } from "@/utils/auth";
import { COMMUNITIES } from "@/static/portal.profile";

export const meta: MetaFunction = () => {
  return [{ title: "Freshers portal - Settings | Sairam Freshers" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  return user;
}

/** For now let all fields be in the same page
 * later down the line change it to span across multiple pages
 */

function Page() {
  return (
    <div className="space-y-5">
      {/* Personal details */}
      <h3 className="text-lg font-semibold">Personal Details</h3>
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="community" className="text-sm font-normal">
            Community{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <select
            defaultValue={"select"}
            id="community"
            className="rounded-md bg-white px-3 py-1.5 text-sm outline outline-1 outline-gray-200 focus:outline-gray-300"
            required
            name="community"
          >
            <option value="select">Select</option>
            {COMMUNITIES.map((community, i) => (
              <option value={community} key={i}>
                {community}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="hostelRequired" className="text-sm font-normal">
            Hostel Required?{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <select
            defaultValue={"no"}
            id="hostelRequired"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            required
            name="hostelRequired"
          >
            <option value="yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Current residential address */}
      <h3 className="text-lg font-semibold">Current Residential Address</h3>
      <div className="grid gap-4 md:grid-cols-2">
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
            required
            name="currentPincode"
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
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli">
              Dadra and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Pondicherry">Pondicherry</option>
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currentLandLine" className="text-sm font-normal">
            Phone No. (LandLine){" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="currentLandLine"
            placeholder="Phone No. (LandLine)"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="currentLandLine"
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
            required
            name="currentMobile"
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
          />
        </div>
      </div>

      {/* Permanent address */}
      <h3 className="text-lg font-semibold">Permanent Residential Address</h3>
      <div className="grid gap-4 md:grid-cols-2">
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
            required
            name="permanentPincode"
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
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli">
              Dadra and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Pondicherry">Pondicherry</option>
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
            required
            name="permanentLandLine"
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastQualifying" className="text-sm font-normal">
            Last Qualiyfing{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="lastQualifying"
            placeholder="Last Qualiyfing"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="lastQualifying"
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="classObtained" className="text-sm font-normal">
            Class Obtained{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="classObtained"
            placeholder="Class Obtained"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="classObtained"
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
            type="email"
            required
            name="dateOfPassing"
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
            type="email"
            required
            name="schoolAddress"
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
            type="email"
            required
            name="schoolCity"
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
            type="email"
            required
            name="schoolPincode"
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
            type="text"
            required
            name="noOfBrothers"
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
            type="text"
            required
            name="noOfSisters"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="siblingStudyingCount" className="text-sm font-normal">
            Brothers/Sisters studying in Sairam{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="siblingStudyingCount"
            placeholder="Brothers/Sisters studying in Sairam"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="siblingStudyingCount"
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="classObtained" className="text-sm font-normal">
            Class Obtained{" "}
            <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="classObtained"
            placeholder="Class Obtained"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="classObtained"
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
            type="email"
            required
            name="dateOfPassing"
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
            type="email"
            required
            name="schoolAddress"
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
            type="email"
            required
            name="schoolCity"
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
            type="email"
            required
            name="schoolPincode"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Father details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Father Details</h3>
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherEmpId" className="text-sm font-normal">
              EMP.ID (If employed in SEC/SIT){" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherEmpId"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherEmpId"
            />
          </div>
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherAreaName" className="text-sm font-normal">
              Area Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherAreaName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherAreaName"
            />
          </div>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherStateName" className="text-sm font-normal">
              State Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherStateName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherStateName"
            />
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
              required
              name="fatherPincode"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherPhone" className="text-sm font-normal">
              Phone No{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="fatherPhone"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="fatherPhone"
            />
          </div>
        </div>

        {/* Mother details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mother Details</h3>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="motherQualification"
              className="text-sm font-normal"
            >
              {" "}
              <span className="text-sm font-semibold text-red-500">*</span>
              Qualification
            </label>
            <input
              id="motherQualification"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherQualification"
            />
          </div>
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherEmpId" className="text-sm font-normal">
              EMP.ID (If employed in SEC/SIT){" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherEmpId"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherEmpId"
            />
          </div>
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherAreaName" className="text-sm font-normal">
              Area Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherAreaName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherAreaName"
            />
          </div>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherStateName" className="text-sm font-normal">
              State Name{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherStateName"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherStateName"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherPincode" className="text-sm font-normal">
              Pincode{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherPincode"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherPincode"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherPhone" className="text-sm font-normal">
              Phone No{" "}
              <span className="text-sm font-semibold text-red-500">*</span>
            </label>
            <input
              id="motherPhone"
              className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
              type="text"
              required
              name="motherPhone"
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm font-normal">
            Date <span className="text-sm font-semibold text-red-500">*</span>
          </label>
          <input
            id="date"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="date"
            required
            name="date"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="parentSignature" className="text-sm font-normal">
            Signature of the Parent
          </label>
          <input
            id="parentSignature"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="parentSignature"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="candidateSignature" className="text-sm font-normal">
            Signature of the Candidate
          </label>
          <input
            id="candidateSignature"
            className="rounded-md bg-white px-3 py-1.5 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            required
            name="candidateSignature"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;

export { ErrorBoundary };
