import React from "react";
import { handleDragStart } from "../helpers";
import { LinkIcon } from "lucide-react";

type Props = {};

export const LinkPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "link")}
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black/70 p-2 hover:bg-black/20"
    >
      <LinkIcon size={30} />
    </div>
  );
};
