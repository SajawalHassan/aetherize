import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
  iconSize?: number;
  iconClassName?: string;
};

export const Loader = (props: Props) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        props.className,
      )}
    >
      <Loader2
        className={cn("animate-spin", props.iconClassName)}
        size={props.iconSize || 40}
      />
    </div>
  );
};
