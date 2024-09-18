import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

export const SubText = (props: Props) => {
  return (
    <p
      className={cn("text-[15px] text-white/75", props.className)}
      aria-label={"A sub-text saying" + " " + props.text}>
      {props.text}
    </p>
  );
};
