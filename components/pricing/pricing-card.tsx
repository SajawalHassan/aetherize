import React from "react";
import { GlassBackground } from "@/components/glass-background";
import { SubText } from "../sub-text";
import { PriceTag } from "./price-tag";
import { Button } from "../button";
import { PricingFeature } from "./pricing-feature";
import { PriceTier } from "@/static-data/pricing-data";
import clsx from "clsx";

export const PricingCard = (props: PriceTier) => {
  return (
    <GlassBackground
      className="max-w-[429px]"
      containerClassName={clsx(
        "pt-[33px] pb-[48px] pl-[27px] pr-[18px] rounded-[20px]",
        props.type === "normal" && "bg-gradient-to-b from-black to-[#1e1e1e]",
        props.type === "popular" && "bg-gradient-to-b from-[#274e85] to-[#124768]"
      )}
      backgroundClassName={clsx(
        props.type === "popular" && "bg-th-primary/50",
        props.type === "normal" && "bg-th-primary/25"
      )}
      ariaLabel={`${props.name} plan`}
      ariaDescription={`This is the ${props.name} plan costing $${props.price} per month.`}>
      <div aria-label="Price card's heading and sub-text">
        <h2 className="text-[48px] font-bold">{props.name}</h2>
        <SubText
          text="For creators craving a quick start, build your website with all the essentials—for free."
          className="text-[16px]"
        />
      </div>

      <div
        aria-label="Price tag and CTA button"
        aria-description={`Price for ${props.name} and a call-to-action (CTA) button`}>
        <PriceTag priceNum={props.price} type={props.type} />
        <Button
          text="Get Started"
          variant={props.type === "normal" ? "primary" : "secondarySpecial"}
          className="w-full py-[9px] mt-[38px]"
        />
      </div>

      <div className="mt-[30px] space-y-[20px]">
        {props.features.map((featureText) => (
          <PricingFeature featureText={featureText} type={props.type} key={featureText} />
        ))}
      </div>
    </GlassBackground>
  );
};
