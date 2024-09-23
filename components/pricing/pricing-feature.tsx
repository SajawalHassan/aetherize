import { CheckIcon } from "lucide-react";
import React from "react";
import { Separator } from "../separator";
import { pricingType } from "@/static-data/pricing-data";
import clsx from "clsx";

interface Props {
  featureText: string;
  type: pricingType;
}

export const PricingFeature = (props: Props) => {
  return (
    <div>
      <div className="h-[60px] gap-x-[10px] flex items-center">
        <div
          className={clsx(
            "h-[28px] w-[28px] rounded-full flex items-center justify-center",
            props.type === "normal" && "bg-th-primary",
            props.type === "popular" && "bg-th-accent"
          )}>
          <CheckIcon size={16} strokeWidth={4} />
        </div>
        <p className="text-[18px] text-white/75">{props.featureText}</p>
      </div>
      <Separator
        className={clsx(
          "border",
          props.type === "normal" && "border-th-primary",
          props.type === "popular" && "border-th-accent"
        )}
      />
    </div>
  );
};
