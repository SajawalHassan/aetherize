import { cn } from "@/lib/utils";
import React from "react";

type Variants = "primary" | "secondary";

const variants = {
  primary: "bg-th-accent2 rounded-l-none rounded-tr-none right-0 top-0",
  secondary: "bg-th-primary -left-[2.3px]",
};

type Props = {
  text: string;
  variant: Variants;
  className?: string;
};

export const Badge = (props: Props) => {
  return (
    <p
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "px-[10px] h-[20px] text-[12px] w-max font-bold rounded-[2px] absolute transition-all duration-100",
        variants[props.variant],
        props.className
      )}
      aria-label="Badge">
      {props.text}
    </p>
  );
};
