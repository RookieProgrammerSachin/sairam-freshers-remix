import { IconType } from "react-icons";
import { CiSettings } from "react-icons/ci";

type MenuItem = {
  link: string;
  label: string;
  icon: IconType;
};

export const MENU_LINKS: MenuItem[] = [
  {
    link: "/profile",
    label: "Profile",
    icon: CiSettings,
  },
];
