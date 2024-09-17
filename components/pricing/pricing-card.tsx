import React from "react";
import { GlassBackground } from "@/components/glass-background";

type Props = {
  type: "popular" | "normal";
  name: string;
  description: string;
  price: number;
  features: string[];
};

export const PricingCard = (props: Props) => {
  return (
    <GlassBackground containerClassName="py-[52px] pl-[27px] bg-gradient-to-br from-black/25 to-th-prot rounded-[20px]" ariaLabel={`${props.name} plan`} ariaDescription={`This is the ${props.name} plan costing $${props.price} per month.`}>
      <h2>Basic</h2>
    </GlassBackground>
    // <div className="w-full h-full relative" aria-label={`${props.name} plan`} aria-description={`This is the ${props.name} plan costing $${props.price} per month.`}>
    //   <div className="py-[52px] pl-[27px] bg-gradient-to-br from-black/25 to-th-prot rounded-[20px]"></div>
    //   <div className="h-full w-full bg-th-primary/25" aria-hidden/>
    // </div>
  );
};
