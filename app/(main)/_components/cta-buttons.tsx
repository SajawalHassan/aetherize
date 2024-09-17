import { SecondaryButton } from "@/components/secondary-button";
import { SpecialButton } from "@/components/special-button";
import React from "react";

type Props = {};

export const CTAButtons = (props: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-[16px] mt-[14px]">
      <SpecialButton text="Go to Playground" />
      <SecondaryButton text="Create an Account" />
    </div>
  );
};
