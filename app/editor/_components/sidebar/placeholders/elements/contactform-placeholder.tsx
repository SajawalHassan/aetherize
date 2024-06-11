import React from "react";
import { handleDragStart } from "../helpers";
import { Contact2Icon } from "lucide-react";

type Props = {};

export const ContactFormPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black/70 p-2 hover:bg-black/20"
    >
      <Contact2Icon size={30} />
    </div>
  );
};
