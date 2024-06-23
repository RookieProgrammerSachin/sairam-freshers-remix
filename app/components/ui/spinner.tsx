import { cn } from "@/utils";

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "h-5 w-5 animate-spin rounded-[50%] border-2 border-white",
        className,
        "border-b-transparent",
      )}
    ></span>
  );
}

export default Spinner;
