import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { createObjectFromFormData, wait } from "@/utils";
import { RULES } from "@/static";
import { LoginData, validateLogin } from "@/utils/validate";
import { checkCookieAndLogin, login, loginCookie } from "@/utils/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Sairam Freshers Login" },
    {
      name: "description",
      content: "Sairam Freshers — Get yourself accustomed",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await checkCookieAndLogin(request);
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const destructured = createObjectFromFormData(data) as unknown as LoginData;
  const validation = validateLogin(destructured);

  if (Object.keys(validation).length > 0)
    return json({ error: validation }, 400);
  const loginData = login(
    String(destructured.register),
    String(destructured.password),
  );

  await wait(1000);
  return redirect("/home", {
    headers: {
      "Set-Cookie": await loginCookie.serialize(loginData),
    },
  });
}

export default function Index() {
  const submitAction = useActionData<typeof action>();
  const navigation = useNavigation();

  const isButtonDisabled = navigation.state === "submitting";

  return (
    <main className="grid min-h-screen w-full grid-cols-[1.3fr_1.7fr] items-center justify-center">
      <div className="flex items-center justify-center">
        <Form
          method="POST"
          className="flex w-[22rem] flex-col gap-4 rounded-lg bg-card px-4 py-12 pb-4 outline outline-1 outline-gray-300"
        >
          <img
            className="mx-auto mb-8 h-auto w-[250px] md:h-auto md:w-[200px]"
            src="/clg.png"
            width={400}
            height={400}
            alt="sairam logo"
          />

          {/* Register number field */}
          <div className="flex flex-col">
            <input
              placeholder="Register number"
              className={`rounded-md bg-white px-4 py-2 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300 ${submitAction?.error?.register && !isButtonDisabled && "outline-red-400 focus:outline-red-400"}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]{3}"
              required
              name="register"
            />
            {submitAction?.error.register && !isButtonDisabled && (
              <p className="text-sm font-light text-red-500">
                {submitAction?.error.register}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="flex flex-col">
            <input
              placeholder="Password"
              className={`rounded-md bg-white px-4 py-2 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300 ${submitAction?.error?.password && !isButtonDisabled && "outline-red-400 focus:outline-red-400"}`}
              type="password"
              required
              name="password"
            />
            {submitAction?.error.password && !isButtonDisabled && (
              <p className="text-sm font-light text-red-500">
                {submitAction?.error.password}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              required
              className="h-4 w-4 rounded-md border-gray-600 bg-gray-100 text-blue-600 ring-offset-gray-800 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label
              htmlFor="agree"
              className="ms-2 text-sm font-normal text-black/90"
            >
              I&apos;ve read the terms and rules and wish to proceed
            </label>
          </div>
          <button
            type="submit"
            className={`${
              isButtonDisabled
                ? "pointer-events-none cursor-default bg-accent/50"
                : "bg-accent"
            } mb-6 grid w-full place-content-center rounded-full border-none px-4 py-2 text-center text-primary`}
          >
            {isButtonDisabled ? <span className="loader"></span> : `Sign In`}
          </button>
        </Form>
      </div>

      {/* Rules div */}
      <div className="rules min-h-screen bg-white p-4 px-8">
        <h1 className="text-xl font-medium">Terms and rules</h1>
        <ol>
          {RULES.map((rule, i) => (
            <li key={i} className="list-disc">
              {rule}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
