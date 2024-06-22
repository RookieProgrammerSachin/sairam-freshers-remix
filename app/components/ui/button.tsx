import { cn } from "@/utils";
import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  disabledComponent?: ReactNode;
  label: string | ReactNode;
  name?: string;
  value?: string;
  to?: string | undefined;
  variant?: "primary" | "secondary";
};

function Button({
  disabled = false,
  className,
  disabledComponent = <span className="loader"></span>,
  label,
  name,
  value,
  variant = "primary",
  to = undefined,
}: ButtonProps) {
  return to ? (
    <Link
      to={to}
      className={cn(
        `${
          disabled
            ? "pointer-events-none cursor-default bg-accent/50"
            : "bg-accent"
        } flex w-full items-center justify-center gap-2 rounded-full border-none px-4 py-2 text-center text-primary transition`,
        {
          "bg-white/80 px-8 text-blue-500 outline outline-1 outline-blue-500":
            variant === "secondary",
        },
        className,
      )}
    >
      {disabled && disabledComponent}
      {label}
    </Link>
  ) : (
    <button
      type="submit"
      className={cn(
        `${
          disabled
            ? "pointer-events-none cursor-default bg-accent/50"
            : "bg-accent"
        } flex w-full items-center justify-center gap-2 rounded-full border-none px-4 py-2 text-center text-primary transition`,
        className,
        {
          "bg-white/80 px-8 text-blue-500 outline outline-1 outline-blue-500":
            variant === "secondary",
        },
      )}
      name={name}
      value={value}
    >
      {disabled && disabledComponent}
      {label}
    </button>
  );
}

export default Button;
