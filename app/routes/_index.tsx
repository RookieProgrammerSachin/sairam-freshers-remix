import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sairam Freshers Login" },
    {
      name: "description",
      content: "Sairam Freshers — Get yourself accustomed",
    },
  ];
};

export default function Index() {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  return (
    <main className='w-full min-h-screen flex items-center justify-center'>
      <Form className='flex w-[22rem] flex-col gap-4 outline outline-1 outline-gray-300 rounded-lg bg-card px-4 py-12 pb-4'>
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
          pattern='[0-9]{11}'
          required
        />
        <input
          placeholder='Password'
          className='px-4 py-2 rounded-md bg-white placeholder:text-sm outline outline-1 outline-gray-200 focus:outline-gray-300'
          type='password'
          required
        />
        <button
          type='submit'
          className={`${
            isButtonDisabled
              ? "pointer-events-none cursor-default bg-[#99bbdd]"
              : "bg-[#0a66c3]"
          } mb-6 outline-none border-none rounded-full w-full text-center text-primary px-4 py-2`}
        >
          {isButtonDisabled ? <span className='loader'></span> : `Sign In`}
        </button>
      </Form>
    </main>
  );
}
