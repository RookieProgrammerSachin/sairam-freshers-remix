import { NAV_LINKS } from "@/static";
import { NavLink } from "@remix-run/react";
import { GrHomeRounded } from "react-icons/gr";
import { RxCaretRight } from "react-icons/rx";

function Nav() {
  return (
    <div className="flex h-fit flex-col gap-4 rounded-md border bg-card px-6 py-6 md:w-full md:max-w-[20rem] md:px-8 md:py-12">
      <NavLink to="/home" className={"flex items-center gap-1"}>
        <GrHomeRounded size={20} />
        <RxCaretRight size={24} />
      </NavLink>
      {NAV_LINKS.map((link, i) => (
        <NavLink
          className={({ isActive }) =>
            `flex items-center text-gray-600 ${isActive && "text-gray-900"} transition-colors hover:text-gray-500`
          }
          to={link.link}
          key={i}
        >
          {({ isActive }) => (
            <>
              {link.label}
              {isActive && <RxCaretRight size={20} />}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default Nav;
