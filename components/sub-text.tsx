import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

export const SubText = (props: Props) => {
  return (
    <p
      className={cn("text-[15px] sm:text-[18px] lg:text-[20px] text-white/75 mx-auto", props.className)}
      aria-label={"A sub-text saying" + " " + props.text}>
      {props.text}
    </p>
  );
};
