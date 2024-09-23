import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type variantNames = "outline" | "special" | "primary";

const variants = {
  primary: "rounded-full p-[7px] bg-th-prot text-white hover:bg-black",
  outline: "rounded-full p-[7px] bg-transparent border border-white/75 hover:bg-white hover:text-black",
  special: "rounded-full p-[7px] font-bold button-special-gradient",
};

interface Props {
  className?: string;
  variant: variantNames;
  Icon: LucideIcon;
  size?: number;
  onClick?: () => void;
  ariaHidden?: boolean;
  tooltipText?: string;
  tooltipSide?: "left" | "bottom" | "top" | "right";
  tooltipClassName?: string;
}

export const IconButton = (props: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn("transition-all duration-100", variants[props.variant], props.className)}
          onClick={props.onClick}
          aria-hidden={props.ariaHidden}>
          <props.Icon size={props.size ? props.size : 22} />
        </button>
      </TooltipTrigger>
      {props.tooltipText && (
        <TooltipContent
          className={cn("border-none text-white bg-th-prot", props.tooltipClassName)}
          side={props.tooltipSide}>
          <p className="text-[16px]">{props.tooltipText}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
