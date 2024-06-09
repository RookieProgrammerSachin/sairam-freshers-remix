import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { wait } from "@/utils";
import { RULES } from "@/static";

export const meta: MetaFunction = () => {
  return [
    { title: "Sairam Freshers Login" },
    {
      name: "description",
      content: "Sairam Freshers — Get yourself accustomed",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  data.forEach((v, k) => console.log(k, v));
  if (data.get("register") == "123" && data.get("password") == "123") {
    await wait(2000);
    return redirect("/home");
  }
  return json({ error: "Invalid credentials" });
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
          <input
            placeholder="Register number"
            className="rounded-md bg-white px-4 py-2 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{3}"
            required
            name="register"
          />
          <input
            placeholder="Password"
            className="rounded-md bg-white px-4 py-2 outline outline-1 outline-gray-200 placeholder:text-sm focus:outline-gray-300"
            type="password"
            required
            name="password"
          />
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
            } mb-6 grid w-full place-content-center rounded-full border-none px-4 py-2 text-center text-primary ${
              submitAction?.error &&
              "bg-red-50 font-medium text-red-500 outline outline-1 outline-red-600"
            } `}
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
