import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscBracketError } from "react-icons/vsc";

export function ErrorCatch() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="m-1 rounded-lg bg-red-100 p-4 outline outline-1 outline-red-500">
        <div className="my-6 flex w-full flex-col items-center justify-center">
          <RiErrorWarningLine size={40} color="red" />
          <h1 className="text-xl font-bold text-red-500">
            Oops! We were not able to process this request!
          </h1>
        </div>
        <p className="font-semibol text-red-400">
          {error.status} {error.statusText}
        </p>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="m-1 h-full max-w-full flex-1 rounded-lg bg-red-100 p-4 outline outline-1 outline-red-500">
        <div className="my-6 flex w-full flex-col items-center justify-center">
          <VscBracketError size={40} color="red" />
          <h1 className="text-xl font-bold text-red-500">
            Oops! We encountered an error in this application!
          </h1>
        </div>
        <p className="font-semibol text-red-400">{error.message}</p>
        <p className="font-semibold text-red-400 underline">Stack trace:</p>
        <div className="w-full overflow-auto">
          <pre className="w-fit break-all text-sm text-red-500">
            {error.stack}
          </pre>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-4 rounded-lg bg-red-100 p-4 outline outline-1 outline-red-500">
        <div className="my-6 flex w-full flex-col items-center justify-center">
          <RiErrorWarningLine size={40} color="red" />
          <h1 className="text-xl font-bold text-red-500">
            We don&apos;t know what caused this error!
          </h1>
        </div>
      </div>
    );
  }
}
