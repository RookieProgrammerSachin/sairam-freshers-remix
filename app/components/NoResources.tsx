import { BiSmile } from "react-icons/bi";

function NoResources({ resourceName = "" }: { resourceName: string }) {
  return (
    <div className="grid w-full place-items-center rounded-md border-[3px] border-dashed border-red-100 bg-red-50/50 p-5">
      <BiSmile color="#ffb9b9" size={42} />
      <h1 className="text-xl text-slate-500">
        No data for {resourceName} yet!
      </h1>
    </div>
  );
}

export default NoResources;
