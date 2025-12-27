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
};

export const AddableElements: AddableElementType[] = [
  {
    name: "Container",
    icon: ContainerIcon,
    tooltip: "A container to house other objects",
  },
  {
    name: "Text",
    icon: TextIcon,
    tooltip: "Add text",
  },
  {
    name: "Image",
    icon: ImageIcon,
    tooltip: "Add Image",
  },
  {
    name: "Link",
    icon: LinkIcon,
    tooltip: "Add link",
  },
];
