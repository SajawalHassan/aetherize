import { SubText } from "@/components/sub-text";
import React from "react";
import { CTAButtons } from "./cta-buttons";

type Props = {};

export const CTASection = (props: Props) => {
  return (
    <div
      className="h-[700px] px-[16px] w-screen relative flex flex-col items-start justify-center text-center mt-[370px]"
      aria-label="Call to action button"
      aria-description="A call to action section">
      <div className="min-w-[380px] min-h-[500px] max-w-[1268px] -z-10 max-h-[953px] absolute inset-0 m-auto bg-th-accent/75 rounded-[634px/476.5px] blur-[300px]" />
      <h2 className="text-[40px] font-bold leading-[100%] mb-[8px]">Still not convincing enough?</h2>
      <SubText text="Not convinced yet? Go to our playground to explore the editor yourself, no sign-up, nothing. Play around and you decide." />
      <CTAButtons className="mx-auto" />
    </div>
  );
};
