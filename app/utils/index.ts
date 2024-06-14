import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export const wait = async (time: number) =>
  await new Promise((res) => setTimeout(res, time));

export const currentYear = new Date().getFullYear();

export const createObjectFromFormData = (formData: FormData) => {
  return Object.fromEntries(formData);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateTo_YYYY_MM_DD = (date = new Date()) => {
  return [
    date.getFullYear(),
    date.getMonth().toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
};
