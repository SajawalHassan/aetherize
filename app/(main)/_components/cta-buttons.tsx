import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const CTAButtons = (props: Props) => {
  return (
    <div className={cn("flex items-center justify-center gap-x-[16px] mt-[14px]", props.className)}>
      <Button text="Go to Playground" variant="special" />
      <Button text="Create an Account" variant="outline" />
    </div>
  );
};
