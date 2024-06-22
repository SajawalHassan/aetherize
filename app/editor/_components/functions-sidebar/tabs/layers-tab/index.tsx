import { useAppSelector } from "@/hooks/store-hook";
import React from "react";
import { functionsSidebarTabBtns } from "@/lib/constants";
import { LayerList } from "./layer-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { ComponentsList } from "../../../components-list";
import { TabsContent } from "@/components/ui/tabs";
import { EditorElementTypes } from "@/lib/constants";
import { ContainerPlaceholder } from "../../../placeholders/container-placeholder";
import { ElementPlaceholder } from "../../../placeholders/element-placeholder";
import {
  ContactIcon,
  ImageIcon,
  LinkIcon,
  MousePointerClickIcon,
  TypeIcon,
  YoutubeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

export const LayersTab = (props: Props) => {
  const items: {
    Component: React.ReactNode;
    group: "element" | "layout";
    label: string;
    id: EditorElementTypes;
  }[] = [
    {
      Component: <ContainerPlaceholder draggable={false} />,
      group: "layout",
      label: "Container",
      id: "container",
    },
    {
      Component: (
        <ElementPlaceholder
          draggable={false}
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
          draggable={false}
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
          draggable={false}
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
          draggable={false}
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
          draggable={false}
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
        <ElementPlaceholder
          draggable={false}
          Icon={ContactIcon}
          componentType={"contactForm"}
        />
      ),
      group: "element",
      label: "Contact Form",
      id: "contactForm",
    },
  ];

  const { elements } = useAppSelector((state) => state.editor);

  return (
    <TabsContent value={"Layers" as functionsSidebarTabBtns} className="p-0">
      <div className="mb-4 flex items-center justify-between pl-2">
        <h3 className="text-3xl font-semibold">Layers</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} className="h-max w-max p-2">
              <PlusIcon size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[300px] max-w-[300px] border border-th-btn bg-th-bg px-4 pb-4 text-white"
            side="bottom"
          >
            <ComponentsList items={items} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <LayerList layers={elements} />
    </TabsContent>
  );
};
