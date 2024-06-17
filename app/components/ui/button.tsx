import { cn } from "@/utils";
import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  disabledComponent?: ReactNode;
  label: string | ReactNode;
  to?: string | undefined;
};

function Button({
  disabled = false,
  className,
  disabledComponent = <span className="loader"></span>,
  label,
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
        } grid w-full place-content-center rounded-full border-none px-4 py-2 text-center text-primary`,
        className,
      )}
    >
      {disabled ? disabledComponent : label}
    </Link>
  ) : (
    <button
      type="submit"
      className={cn(
        `${
          disabled
            ? "pointer-events-none cursor-default bg-accent/50"
            : "bg-accent"
        } grid w-full place-content-center rounded-full border-none px-4 py-2 text-center text-primary`,
        className,
      )}
    >
      {disabled ? disabledComponent : label}
    </button>
  );
}

export default Button;
