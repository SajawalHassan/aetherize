import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  Icon: LucideIcon;
  className?: string;
}

export const IconButton = (props: Props) => {
  return (
    <div
      className={cn("flex items-center justify-center p-[8px] rounded-full border border-white/50", props.className)}>
      <props.Icon className="h-[22px] w-[22px]" />
    </div>
  );
};
