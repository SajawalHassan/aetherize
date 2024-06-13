import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { EditorElementTypes, tabBtns } from "@/lib/constants";
import { ContainerPlaceholder } from "../placeholders/container-placeholder";
import { AccordionCustomTrigger } from "./customization-tab";
import { MColPlaceholder } from "../placeholders/mCol-placeholder";
import { ElementPlaceholder } from "../placeholders/element-placeholder";
import {
  ContactIcon,
  ImageIcon,
  LinkIcon,
  TypeIcon,
  YoutubeIcon,
} from "lucide-react";

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
      Component: <MColPlaceholder />,
      group: "layout",
      label: "Flex box",
      id: "flexBox",
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
        <ElementPlaceholder Icon={ContactIcon} componentType={"contactForm"} />
      ),
      group: "element",
      label: "Contact Form",
      id: "contactForm",
    },
  ];

  return (
    <TabsContent value={"Components" as tabBtns}>
      <Accordion
        type="multiple"
        className="space-y-[20px] pt-4"
        defaultValue={["layout", "elements"]}
      >
        <h3 className="mb-6 text-center text-3xl font-bold">Components</h3>
        <AccordionItem value="layout" className="border-white/10">
          <AccordionCustomTrigger text="Layout" />
          <AccordionContent className="flex flex-wrap items-center gap-[10px] pt-4">
            {items
              .filter((item) => item.group === "layout")
              .map((layoutElement) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={layoutElement.id}
                >
                  <div className="h-16 w-16">{layoutElement.Component}</div>
                  <span className="text-xs text-muted-foreground">
                    {layoutElement.label}
                  </span>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="elements" className="border-white/10">
          <AccordionCustomTrigger text="Elements" />
          <AccordionContent className="flex flex-wrap items-center gap-[10px] pt-4">
            {items
              .filter((item) => item.group === "element")
              .map((element) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={element.id}
                >
                  <div className="h-16 w-16">{element.Component}</div>
                  <span className="text-xs text-muted-foreground">
                    {element.label}
                  </span>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TabsContent>
  );
};
