import { cn } from "@/utils";
import { Link } from "@remix-run/react";
import { MouseEvent, ReactNode } from "react";
import Spinner from "./spinner";
import { ButtonGroup } from "@mantine/core";

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  disabledComponent?: ReactNode;
  label: string | ReactNode;
  name?: string;
  value?: string;
  to?: string | undefined;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function Button({
  disabled = false,
  className,
  disabledComponent = <Spinner />,
  label,
  name,
  value,
  variant = "primary",
  to = undefined,
  type = "submit",
  onClick,
}: ButtonProps) {
  return to ? (
    <Link
      to={to}
      className={cn(
        `${
          disabled
            ? "pointer-events-none cursor-default bg-accent/50 opacity-60"
            : "bg-accent"
        } flex w-full items-center justify-center gap-2 rounded-full border-none px-4 py-2 text-center text-primary transition`,
        {
          "bg-white/80 px-8 text-blue-500 outline-blue-500":
            variant === "secondary",
        },
        className,
        {
          "outline outline-1": variant === "secondary",
        },
      )}
    >
      {disabled && disabledComponent}
      {label}
    </Link>
  ) : (
    <button
      type={type}
      className={cn(
        `${
          disabled
            ? "pointer-events-none cursor-default bg-accent/50 opacity-60"
            : "bg-accent"
        } flex w-full items-center justify-center gap-2 rounded-full border-none px-4 py-2 text-center text-primary transition`,
        {
          "bg-white/80 px-8 text-blue-500 outline-blue-500":
            variant === "secondary",
        },
        className,
        {
          "outline outline-1": variant === "secondary",
        },
      )}
      name={name}
      value={value}
      onClick={onClick}
    >
      {disabled && disabledComponent}
      {label}
    </button>
  );
}

export default Button;
