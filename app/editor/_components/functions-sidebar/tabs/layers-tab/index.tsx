import React, { useState } from "react";
import { useAppSelector } from "@/hooks/store-hook";
import { functionsSidebarTabBtns } from "@/lib/types";
import { LayerList } from "./layer-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { ComponentsList } from "../../../components-list";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useComponentsItems } from "@/hooks/use-components-items";

type Props = {};

export const LayersTab = (props: Props) => {
  const [showComponentsList, setShowComponentsList] = useState(false);

  const items = useComponentsItems();
  const { elements } = useAppSelector((state) => state.editor);

  return (
    <TabsContent value={"Layers" as functionsSidebarTabBtns} className="p-0">
      <div className="mb-4 flex items-center justify-between pl-2">
        <h3 className="text-3xl font-semibold">Layers</h3>

        <DropdownMenu
          open={showComponentsList}
          onOpenChange={setShowComponentsList}
        >
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
