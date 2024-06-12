import React from "react";
import { handleDragStart } from "@/lib/helper";
import { ImageIcon } from "lucide-react";

type Props = {};

export const ImagePlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black/70 p-2 hover:bg-black/20"
    >
      <ImageIcon size={30} />
    </div>
  );
};
