import React from "react";
import { handleDragStart } from "../helpers";
import { TypeIcon } from "lucide-react";

type Props = {};

export const TextPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "text")}
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black/70 p-2 hover:bg-black/20"
    >
      <TypeIcon size={30} />
    </div>
  );
};
