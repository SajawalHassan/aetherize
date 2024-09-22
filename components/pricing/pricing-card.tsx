"use client";

import React, { useEffect, useRef, useState } from "react";
import { GlassBackground } from "@/components/glass-background";
import { SubText } from "../sub-text";
import { PriceTag } from "./price-tag";
import { Button } from "../button";
import { PricingFeature } from "./pricing-feature";
import { PriceTier } from "@/static-data/pricing-data";
import { motion, useAnimation, useInView } from "framer-motion";
import clsx from "clsx";

export const PricingCard = (props: PriceTier) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const animationControls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView) {
      animationControls.start({ opacity: 1, translateX: 0 });
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, translateX: 0 }}
      animate={animationControls}
      transition={{ duration: 0.5, delay: isMounted && window.innerWidth > 640 ? props.delay : 0 }}>
      <GlassBackground
        className={clsx(props.type === "normal" && "max-w-[400px]", props.type === "popular" && "max-w-[450px] z-20")}
        containerClassName={clsx(
          "pt-[33px] pb-[48px] px-[25px] rounded-[20px]",
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
          <h2
            className={clsx(
              "text-[48px] xl:text-[64px] font-bold",
              props.headingGradient === "green-to-blue" &&
                "[background:linear-gradient(-90deg,rgb(0,224.4,255)_0%,rgb(70,249,184.56)_100%)] text-transparent !bg-clip-text",
              props.headingGradient === "blue-to-green" &&
                "[background:linear-gradient(90deg,rgb(70,143,249)_27.26%,rgb(57.02,195.5,145.65)_100%)] text-transparent !bg-clip-text"
            )}>
            {props.name}
          </h2>
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
    </motion.div>
  );
};
