import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Icon: LucideIcon;
};

export const IconButton = (props: Props) => {
  return (
    <div className="flex items-center justify-center p-[8px] rounded-full border border-white/50">
      <props.Icon className="h-[22px] w-[22px]" />
    </div>
  );
};
