import { ElementType } from "@/editor-store/editor-slice";
import {
  ContainerIcon,
  ImageIcon,
  LinkIcon,
  LucideIcon,
  TextIcon,
} from "lucide-react";

export type AddableElementType = {
  name: string;
  icon: LucideIcon;
  tooltip: string;
  type: ElementType;
};

export const AddableElements: AddableElementType[] = [
  {
    name: "Container",
    icon: ContainerIcon,
    tooltip: "A container to house other objects",
    type: "container",
  },
  {
    name: "Text",
    icon: TextIcon,
    tooltip: "Add text",
    type: "text",
  },
  {
    name: "Image",
    icon: ImageIcon,
    tooltip: "Add Image",
    type: "image",
  },
  {
    name: "Link",
    icon: LinkIcon,
    tooltip: "Add link",
    type: "link",
  },
];
