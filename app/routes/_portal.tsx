import { currentYear } from "@/utils";
import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
  Transition,
} from "@headlessui/react";
import { LuUser2 } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MENU_LINKS } from "@/static/portal.home";
import { CiLogout } from "react-icons/ci";
import Nav from "@/components/Nav";
import { ErrorBoundary } from "@/root";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireAuthCookie } from "@/utils/auth";
import Spinner from "@/components/ui/spinner";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthCookie(request);
  return user;
}

function Layout() {
  const userData = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <>
      <nav className="nav border-silver z-10 grid w-full grid-rows-3 place-items-center items-center justify-center gap-4 border px-6 py-2 md:grid-cols-[0.7fr_1fr_0.5fr] md:grid-rows-none md:gap-8 md:px-12">
        {/* College logo */}
        <img
          src="/clg.png"
          alt="Sairam Freshers"
          className="h-auto w-[12rem]"
        />

        {/* Title */}
        <h1 className="w-fit text-2xl font-semibold">
          Sairam Freshers Portal ({currentYear}-{currentYear + 1})
        </h1>

        {/* Menu */}
        <div className="relative flex w-full justify-center md:w-[unset] md:max-w-72">
          <Menu>
            <MenuButton className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-base outline outline-1 outline-gray-200 transition-[outline] data-[open]:bg-white/80 data-[open]:outline-gray-400 md:w-[unset]">
              <LuUser2 />
              My account
              <MdKeyboardArrowDown />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom"
                className={
                  "z-50 mt-2 w-36 rounded-md bg-white py-1 outline outline-1 outline-gray-300"
                }
              >
                {MENU_LINKS.map((link, i) => (
                  <MenuItem key={i}>
                    <a
                      className="flex items-center justify-center gap-2 py-1 text-sm data-[focus]:bg-gray-50"
                      href={link.link}
                    >
                      <link.icon size={18} />
                      {link.label}
                    </a>
                  </MenuItem>
                ))}
                <MenuSeparator>
                  <div className="my-1 h-px bg-black/10" />
                </MenuSeparator>
                <MenuItem>
                  <a
                    className="flex items-center justify-center gap-2 py-1 text-sm data-[focus]:bg-gray-50"
                    href="/logout"
                  >
                    <CiLogout />
                    Logout
                  </a>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </nav>
      <div className="main-container grid w-full gap-8 self-center p-4 md:flex md:grid-rows-[0.7fr_2fr] md:px-12 md:py-10">
        <Nav />

        {/* Page Content */}
        <div className="flex max-h-fit flex-col rounded-md border bg-card px-4 py-8 md:w-full md:max-w-[80vw] md:px-8 md:py-12">
          <h1 className="text-2xl font-semibold">Hi, {userData.name}!</h1>
          <p className="mb-6">Use the menu on the left to view updates</p>
          {navigation.location ? (
            <Spinner className="border-blue-500" />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
}

export default Layout;

export { ErrorBoundary };
