import { getAllProfileDetails } from "@/db/queries";
import { requireAdminCookie } from "@/utils/auth";
import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { BiChevronLeft } from "react-icons/bi";

export const meta: MetaFunction = ({ params }) => {
  return [
    {
      title: `Student details for ${params.applicationNo} | Sairam Fresher's Admin`,
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { applicationNo } = params;
  if (!applicationNo) return redirect("/admin/users");
  await requireAdminCookie(request);
  return await getAllProfileDetails("", applicationNo);
};

function AdminUserDetails() {
  const profileDetails = useLoaderData<typeof loader>();
  const params = useParams();

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
        <h1 className="text-xl font-semibold">
          User details for {profileDetails && profileDetails.name} (
          {profileDetails.applicationNo})
        </h1>
      )}
    </div>
  );
}

export default AdminUserDetails;

export { ErrorCatch as ErrorBoundary } from "@/components/ui/error-boundary";
