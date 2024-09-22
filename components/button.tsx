import { cn } from "@/lib/utils";
import React from "react";

type variantNames = "primary" | "secondary" | "secondarySpecial" | "outline" | "special";

const variants = {
  primary: "bg-th-primary rounded-full py-[13px] px-[36px] text-[20px] font-bold hover:bg-[#0068FF]",
  secondary: "bg-th-accent2 rounded-full py-[13px] px-[36px] text-[20px] font-bold",
  secondarySpecial: "button-secondary-gradient rounded-full py-[13px] px-[36px] text-[20px] font-bold",
  outline:
    "rounded-full py-[9px] px-[13.5px] md:px-[20px] bg-transparent border border-white/75 text-[16px] md:text-[18px] font-bold hover:bg-white hover:text-black",
  special:
    "rounded-full py-[9px] px-[13.5px] md:px-[20px] text-[16px] md:text-[18px] font-bold button-special-gradient border border-transparent hover:border-th-primary hover:border-white",
};

interface Props {
  text: string;
  className?: string;
  variant: variantNames;
}

export const Button = (props: Props) => {
  return (
    <button
      className={cn("transition-all duration-300", variants[props.variant], props.className)}
      aria-description={props.text}>
      {props.text}
    </button>
  );
};
