import React from "react";
import { handleDragStart } from "@/lib/helper";
import { YoutubeIcon } from "lucide-react";

type Props = {};

export const VideoPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black/70 p-2 hover:bg-black/20"
    >
      <YoutubeIcon size={30} />
    </div>
  );
};
