import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  containerClassName?: string;
  backgroundClassName?: string;
  children?: React.ReactNode;
}

export const GlassBackground = (props: Props) => {
  return (
    <div className={cn("relative h-full w-full", props.className)}>
      <div
        className={cn(
          "h-full w-full rounded-none blur-[300px] -z-10 text-white bg-th-primary absolute left-0",
          props.backgroundClassName
        )}
        aria-hidden
      />
      <div className={cn("rounded-[20px] bg-th-prot z-10", props.containerClassName)}>{props.children}</div>
    </div>
  );
};
