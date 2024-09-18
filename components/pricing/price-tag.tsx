import { pricingType } from "@/static-data/pricing-data";
import clsx from "clsx";
import React from "react";

type Props = {
  priceNum: number;
  type: pricingType;
};

export const PriceTag = (props: Props) => {
  return (
    <div
      className="relative w-max ml-6"
      aria-label="Price for plan"
      aria-description="Used in the pricing card to show the price of this tier">
      <p
        className={clsx(
          "absolute top-[21px] -left-6 bg-gradient-to-b bg-clip-text font-bold text-transparent text-[40px]",
          props.type === "normal" && "from-th-accent to-th-secondary",
          props.type === "popular" && "from-th-secondary to-th-accent"
        )}>
        $
      </p>
      <p className="text-[128px] font-bold max-h-[145px]">{props.priceNum}</p>
      <p className="absolute top-[22px] -right-6 text-[20px] font-bold text-white/75">
        /MO
      </p>
    </div>
  );
};
