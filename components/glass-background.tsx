import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  ariaDescription?: string;
};

export const GlassBackground = (props: Props) => {
  return (
    <div className={cn("relative h-full w-full", props.className)} aria-label={props.ariaLabel} aria-description={props.ariaDescription}>
      <div className={cn("h-full w-full rounded-none blur-[300px] text-white bg-th-primary")} aria-hidden />
      <div className={cn("h-full w-full rounded-[20px] bg-th-prot absolute inset-0 m-auto", props.containerClassName)}>{props.children}</div>
    </div>
  );
};
