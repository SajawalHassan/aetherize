import { EditorElementTypes } from "@/lib/constants";
import { ContainerPlaceholder } from "@/app/editor/_components/placeholders/container-placeholder";
import { ElementPlaceholder } from "@/app/editor/_components/placeholders/element-placeholder";
import {
  ContactIcon,
  ImageIcon,
  LinkIcon,
  TypeIcon,
  PointerIcon,
  YoutubeIcon,
} from "lucide-react";

export const useComponentsItems = () => {
  const items: {
    Component: React.ReactNode;
    group: "element" | "layout";
    label: string;
    id: EditorElementTypes;
  }[] = [
    {
      Component: <ContainerPlaceholder draggable={true} />,
      group: "layout",
      label: "Container",
      id: "container",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={true}
          Icon={TypeIcon}
          componentType={"text"}
        />
      ),
      group: "element",
      label: "Text",
      id: "text",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={true}
          Icon={LinkIcon}
          componentType={"link"}
        />
      ),
      group: "element",
      label: "Link",
      id: "link",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={true}
          Icon={YoutubeIcon}
          componentType={"video"}
        />
      ),
      group: "element",
      label: "Video",
      id: "video",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={true}
          Icon={ImageIcon}
          componentType={"image"}
        />
      ),
      group: "element",
      label: "Image",
      id: "image",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={true}
          Icon={PointerIcon}
          componentType={"button"}
        />
      ),
      group: "element",
      label: "Button",
      id: "button",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={true}
          Icon={ContactIcon}
          componentType={"contactForm"}
        />
      ),
      group: "element",
      label: "Contact Form",
      id: "contactForm",
    },
  ];

  return items;
};
