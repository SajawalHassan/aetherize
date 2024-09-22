import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const CTAButtons = (props: Props) => {
  return (
    <div
      className={cn("flex items-center justify-center gap-x-[16px] mt-[14px]", props.className)}
      aria-label="Two call-to-action buttons"
      aria-description="Two CTA buttons, one to go to playground, other to create and account">
      <Button text="Go to Playground" variant="special" />
      <Button text="Create an Account" variant="outline" />
    </div>
  );
};
