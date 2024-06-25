import { getAllProfileDetails } from "@/db/queries";
import { requireAdminCookie, requireAuthCookie } from "@/utils/auth";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
  Image,
  Link,
} from "@react-pdf/renderer";
import {
  type LoaderFunctionArgs,
  type LoaderFunction,
  json,
} from "@remix-run/node";

const APP_NAME = "https://sairam-freshers-remix.vercel.app/";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
    paddingHorizontal: 40,
  },
  section: {
    padding: 15,
    // flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: 2,
    borderBottom: "1px solid #eee",
    borderRadius: 3,
  },
  text: { fontSize: 14, textDecoration: "underline" },
  textLabel: { fontSize: 9, fontWeight: "bold" },
  textValue: { fontSize: 10 },
  inputContainer: {
    flexDirection: "column",
    columnGap: 3,
    rowGap: 7,
    width: "48%",
    minWidth: "40%",
  },
});

const INDIAN_STATES = [
  { id: 1, state: "Andhra Pradesh" },
  { id: 2, state: "Arunachal Pradesh" },
  { id: 3, state: "Assam" },
  { id: 4, state: "Bihar" },
  { id: 5, state: "Chhattisgarh" },
  { id: 6, state: "Delhi" },
  { id: 7, state: "Goa" },
  { id: 8, state: "Gujarat" },
  { id: 9, state: "Haryana" },
  { id: 10, state: "Himachal Pradesh" },
  { id: 11, state: "Jammu & Kashmir" },
  { id: 12, state: "Jharkhand" },
  { id: 13, state: "Karnataka" },
  { id: 14, state: "Kerala" },
  { id: 15, state: "Maharashtra" },
  { id: 16, state: "Madhya Pradesh" },
  { id: 17, state: "Manipur" },
  { id: 18, state: "Meghalaya" },
  { id: 19, state: "Mizoram" },
  { id: 20, state: "Nagaland" },
  { id: 21, state: "Odisha" },
  { id: 22, state: "Punjab" },
  { id: 23, state: "Rajasthan" },
  { id: 24, state: "Sikkim" },
  { id: 25, state: "Tamil Nadu" },
  { id: 26, state: "Tripura" },
  { id: 27, state: "Telangana" },
  { id: 28, state: "Uttar Pradesh" },
  { id: 29, state: "Uttarakhand" },
  { id: 30, state: "West Bengal" },
  { id: 31, state: "Andaman & Nicobar (UT)" },
  { id: 32, state: "Chandigarh (UT)" },
  { id: 33, state: "Dadra & Nagar Haveli (UT)" },
  { id: 34, state: "Daman & Diu (UT)" },
  { id: 35, state: "Lakshadweep (UT)" },
  { id: 36, state: "Puducherry (UT)" },
];

// Create Document Component
function generatePDF(data: Awaited<ReturnType<typeof getAllProfileDetails>>) {
  if (!data) return null;
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={APP_NAME}>
            <Image
              src={`${APP_NAME}clg.png`}
              style={{ width: 100, height: "auto" }}
            />
          </Link>
        </View>

        <View
          style={{
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>Student details for {data.name}</Text>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Personal Details</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Name</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.name}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Date of birth</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.dateOfBirth}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Mother Tongue</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherTongue}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Blood Group</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.bloodGroup}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Nationality</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.nationality}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Religion</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.religion}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Community</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.community}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Hostel Required?</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.hostelRequired ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        </View>

        {/* Current residential */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Current Residential Address</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              Door No. / Plot No. / Street Name
            </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentAddressLine1}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Area / Mandal </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentAddressLine2}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>City</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentCity}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Pincode / Zipcode</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentPincode}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>State</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {
                  INDIAN_STATES.find(
                    (state) => String(state.id) === String(data.currentState),
                  )?.state
                }
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Country</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentCountry}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Phone No. (LandLine)</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentPhoneNo ?? " "}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Mobile Number</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentMobileNumber}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Email</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.currentEmailId}</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer, opacity: 0 }}></View>
        </View>

        {/* Permanent Residential Address */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Permanent Residential Address</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              Door No. / Plot No. / Street Name
            </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentAddressLine1}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Area / Mandal </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentAddressLine2}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>City</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentCity}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Pincode / Zipcode</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentPincode}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>State</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {
                  INDIAN_STATES.find(
                    (state) => String(state.id) === String(data.permanentState),
                  )?.state
                }
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Country</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentCountry}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Phone No. (LandLine)</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.permanentPhoneNo ?? ""}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Mobile Number</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentMobileNumber}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Email</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.permanentEmailId}</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer, opacity: 0 }}></View>
        </View>
      </Page>

      <Page size={"A4"} style={{ ...styles.page, paddingVertical: 25, gap: 5 }}>
        {/* Education details */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Education details</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Applied degree</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.appliedDegree}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Last Qualifying</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.lastQualifying}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>School Name</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.schoolName}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Branch</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.schoolBranch}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Board / University</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.boardName}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Language Medium</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.langMedium}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Reg.No./Roll No.</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.regNo}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Percentage Obtained </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.gradePercentage}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Date of passing </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.dateOfPassing}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>School Address </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.schoolAddress}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>City </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.schoolCity}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Pincode </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.schoolPincode}</Text>
            </View>
          </View>
        </View>

        {/* Family Details */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Family details</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>No. of brothers</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.noOfBrothers}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>No. of Sisters</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.noOfSisters}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              No. of Brothers/Sisters studying in Sairam
            </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.siblingStudyingCount}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Studying details</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.siblingStudyingDetails}
              </Text>
            </View>
          </View>
        </View>

        {/* Father details */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Father details</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Father&apos;s name</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.fatherParentName}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Qualification </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.fatherParentQualification}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Occupation </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.fatherParentOccupation}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Organization </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.fatherParentOrganization}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Designation</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.fatherParentDesignation}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              EMP.ID (If employed in SEC/SIT)
            </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.fatherParentEmpId ?? ""}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Mobile No</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.fatherParentMobileNo}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Email ID </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.fatherParentEmailId}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Annual Income</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.fatherParentAnnualIncome}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Address </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.fatherParentAddress}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>City Name</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.fatherParentCity}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>State Name </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {
                  INDIAN_STATES.find(
                    (state) =>
                      String(state.id) === String(data.fatherParentState),
                  )?.state
                }
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Pincode</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.fatherParentPincode}</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer, opacity: 0 }}></View>
        </View>
      </Page>

      <Page
        size={"A4"}
        style={{ ...styles.page, paddingVertical: 40, gap: 20 }}
      >
        {/* Mother details */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Mother details</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Mother&apos;s name</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherParentName}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Qualification </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.motherParentQualification}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Occupation </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.motherParentOccupation}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Organization </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.motherParentOrganization}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Designation</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.motherParentDesignation}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              EMP.ID (If employed in SEC/SIT)
            </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.motherParentEmpId ?? " "}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Mobile No</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherParentMobileNo}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Email ID </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherParentEmailId}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Annual Income</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {data.motherParentAnnualIncome}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Address </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherParentAddress}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>City Name</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherParentCity}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>State Name </Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {
                  INDIAN_STATES.find(
                    (state) =>
                      String(state.id) === String(data.motherParentState),
                  )?.state
                }
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Pincode</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.motherParentPincode}</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer, opacity: 0 }}></View>
        </View>

        {/* Declaration Details */}
        <View style={styles.section}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.text}>Declaration</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Place</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>{data.place}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Date</Text>
            <View style={styles.input}>
              <Text style={styles.textValue}>
                {
                  // @ts-expect-error date illa
                  new Date(data.date).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Signature of parent</Text>
            <View style={{ ...styles.input, borderBottom: "none" }}>
              <Image
                src={data.parentSignature}
                style={{ width: "40%", height: "auto" }}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Signature of candidate</Text>
            <View style={{ ...styles.input, borderBottom: "none" }}>
              <Image
                src={data.candidateSignature}
                style={{ width: "40%", height: "auto" }}
              />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return MyDocument;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  // TODO: implement try catch for cookie requirement and catch to send valid response
  const profileDetails = await getAllProfileDetails(params.userId);

  const MyDocument = generatePDF(profileDetails);

  if (!MyDocument) return json({ error: "No details found!" }, { status: 404 });

  const stream = await renderToStream(<MyDocument />);

  // and transform it to a Buffer to send in the Response
  const body: Buffer = await new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    stream.on("data", (data) => {
      buffers.push(data);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    stream.on("error", reject);
  });

  // finally create the Response with the correct Content-Type header for
  // a PDF
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${profileDetails && profileDetails.name} - Profile Details.pdf"`,
  });
  return new Response(body, { status: 200, headers });
};
