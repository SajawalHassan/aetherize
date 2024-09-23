import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const Separator = (props: Props) => {
  return <div className={cn("border-th-secondary border-[3px] rounded-full w-full", props.className)} />;
};
