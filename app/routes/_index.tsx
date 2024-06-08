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
    return json({ message: "OK" });
  }
  return json({ error: "Invalid credentials" });
}

export default function Index() {
  const submitAction = useActionData<typeof action>();
  const navigation = useNavigation();

  const isButtonDisabled = navigation.state === "submitting";

  return (
    <main className='w-full min-h-screen grid grid-cols-[1.3fr_1.7fr] items-center justify-center'>
      <div className='flex justify-center items-center'>
        <Form
          method='POST'
          className='flex w-[22rem] flex-col gap-4 outline outline-1 outline-gray-300 rounded-lg bg-card px-4 py-12 pb-4'
        >
          <img
            className='md:w-[200px] md:h-auto h-auto w-[250px] mb-8 mx-auto'
            src='/clg.png'
            width={400}
            height={400}
            alt='sairam logo'
          />
          <input
            placeholder='Register number'
            className='px-4 py-2 rounded-md bg-white placeholder:text-sm outline outline-1 outline-gray-200 focus:outline-gray-300'
            type='text'
            inputMode='numeric'
            pattern='[0-9]{3}'
            required
            name='register'
          />
          <input
            placeholder='Password'
            className='px-4 py-2 rounded-md bg-white placeholder:text-sm outline outline-1 outline-gray-200 focus:outline-gray-300'
            type='password'
            required
            name='password'
          />
          <div className='flex items-center'>
            <input
              type='checkbox'
              name='agree'
              id='agree'
              required
              className='w-4 h-4 text-blue-600 bg-gray-100 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 ring-offset-gray-800 focus:ring-1 border-gray-600'
            />
            <label
              htmlFor='agree'
              className='ms-2 text-sm font-normal text-black/90'
            >
              I&apos;ve read the terms and rules and wish to proceed
            </label>
          </div>
          <button
            type='submit'
            className={`${
              isButtonDisabled
                ? "pointer-events-none cursor-default bg-accent/50"
                : "bg-accent"
            } mb-6 outline-none border-none rounded-full w-full text-center text-primary px-4 py-2 grid place-content-center`}
          >
            {isButtonDisabled ? <span className='loader'></span> : `Sign In`}
          </button>
        </Form>
      </div>

      {/* Rules div */}
      <div className='rules bg-white min-h-screen p-4 px-8'>
        <h1 className='font-medium text-xl'>Terms and rules</h1>
        <ol>
          {RULES.map((rule, i) => (
            <li key={i} className='list-disc'>
              {rule}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
