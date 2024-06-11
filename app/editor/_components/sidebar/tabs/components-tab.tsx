import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { EditorElementTypes, tabBtns } from "@/lib/constants";
import React, { useState } from "react";
import { ContainerPlaceholder } from "../placeholders/layout/container-placeholder";
import { AccordionCustomTrigger } from "./customization-tab";
import { MColPlaceholder } from "../placeholders/layout/mCol-placeholder";
import { TextPlaceholder } from "../placeholders/elements/text-placeholder";
import { LinkPlaceholder } from "../placeholders/elements/link-placeholder";
import { VideoPlaceholder } from "../placeholders/elements/video-placeholder";
import { ContactFormPlaceholder } from "../placeholders/elements/contactform-placeholder";
import { ImagePlaceholder } from "../placeholders/elements/image-placeholder";

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
      label: "Multiple columns",
      id: "mCol",
    },
    {
      Component: <TextPlaceholder />,
      group: "element",
      label: "Text",
      id: "text",
    },
    {
      Component: <LinkPlaceholder />,
      group: "element",
      label: "Link",
      id: "link",
    },
    {
      Component: <VideoPlaceholder />,
      group: "element",
      label: "Video",
      id: "video",
    },
    {
      Component: <ImagePlaceholder />,
      group: "element",
      label: "Image",
      id: "image",
    },
    {
      Component: <ContactFormPlaceholder />,
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
