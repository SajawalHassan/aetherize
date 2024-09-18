import { cn } from "@/lib/utils";
import React from "react";

type variantNames = "primary" | "secondary" | "secondarySpecial" | "outline" | "special";

const variants = {
  primary: "bg-th-primary rounded-full py-[13px] px-[36px] text-[20px] font-bold",
  secondary: "bg-th-accent2 rounded-full py-[13px] px-[36px] text-[20px] font-bold",
  secondarySpecial:
    "bg-gradient-to-r from-[#46F978] to-[#299347] rounded-full py-[13px] px-[36px] text-[20px] font-bold",
  outline: "rounded-full py-[9px] px-[13.5px] bg-transparent border border-white/75 text-[16px] font-bold",
  special: "rounded-full py-[9px] px-[13.5px] bg-gradient-to-r text-[16px] font-bold from-th-primary to-th-accent/90",
};

type Props = {
  text: string;
  className?: string;
  variant: variantNames;
};

export const Button = (props: Props) => {
  return (
    <button className={cn(variants[props.variant], props.className)} aria-description={props.text}>
      {props.text}
    </button>
  );
};
