import { currentYear } from "@/utils";
import { Outlet } from "@remix-run/react";

function Layout() {
  return (
    <>
      <nav className='nav grid grid-rows-3 gap-4 md:gap-8 px-12 py-2 items-center w-full border justify-center border-silver z-10 md:grid-cols-[0.7fr_1fr_0.5fr] md:grid-rows-none'>
        <img src="/clg.png" alt="Sairam Freshers" className="w-[12rem]" />
        <h1 className="font-semibold text-2xl">Sairam Freshers Portal ({currentYear}-{currentYear + 1})</h1>
        <div className="flex outline h-full">
            menu comes
        </div>
      </nav>
      <div className='main-container max-w-screen-2xl grid w-full grid-rows-[0.7fr_2fr] md:grid-rows-none md:grid-cols-[0.7fr_2fr] gap-8 px-12 py-10'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
