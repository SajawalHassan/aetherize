import { TabsContent } from "@/components/ui/tabs";
import { EditorElementTypes, tabBtns } from "@/lib/constants";
import { ContainerPlaceholder } from "../../placeholders/container-placeholder";
import { ElementPlaceholder } from "../../placeholders/element-placeholder";
import {
  ContactIcon,
  ImageIcon,
  LinkIcon,
  MousePointerClickIcon,
  TypeIcon,
  YoutubeIcon,
} from "lucide-react";
import { ComponentsList } from "../../_components/components-list";

type Props = {};

export const ComponentsTab = (props: Props) => {
  const items: {
    Component: React.ReactNode;
    group: "element" | "layout";
    label: string;
    id: EditorElementTypes;
  }[] = [
    {
      Component: <ContainerPlaceholder />,
      group: "layout",
      label: "Container",
      id: "container",
    },
    {
      Component: <ElementPlaceholder Icon={TypeIcon} componentType={"text"} />,
      group: "element",
      label: "Text",
      id: "text",
    },
    {
      Component: <ElementPlaceholder Icon={LinkIcon} componentType={"link"} />,
      group: "element",
      label: "Link",
      id: "link",
    },
    {
      Component: (
        <ElementPlaceholder Icon={YoutubeIcon} componentType={"video"} />
      ),
      group: "element",
      label: "Video",
      id: "video",
    },
    {
      Component: (
        <ElementPlaceholder Icon={ImageIcon} componentType={"image"} />
      ),
      group: "element",
      label: "Image",
      id: "image",
    },
    {
      Component: (
        <ElementPlaceholder
          Icon={MousePointerClickIcon}
          componentType={"button"}
        />
      ),
      group: "element",
      label: "Button",
      id: "button",
    },
    {
      Component: (
        <ElementPlaceholder Icon={ContactIcon} componentType={"contactForm"} />
      ),
      group: "element",
      label: "Contact Form",
      id: "contactForm",
    },
  ];

  return (
    <TabsContent value={"Components" as tabBtns}>
      <ComponentsList items={items} />
    </TabsContent>
  );
};
