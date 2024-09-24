import React from "react";
import { IconButton } from "./icon-button";
import { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  text: string;
  onClick?: () => void;
}

export const ElementPlaceholderButton = (props: Props) => {
  return (
    <div>
      <IconButton
        variant="outline"
        Icon={props.Icon}
        size={38}
        className="rounded-none w-[58px] h-[58px]"
        onClick={props.onClick}
      />
      <p className="text-center text-[15px]">{props.text}</p>
    </div>
  );
};
