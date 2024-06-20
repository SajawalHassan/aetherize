import { useAppSelector } from "@/hooks/store-hook";
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { functionsSidebarTabBtns } from "@/lib/constants";
import { LayerList } from "./layer-list";

type Props = {};

export const LayersTab = (props: Props) => {
  const { elements } = useAppSelector((state) => state.editor);

  return (
    <TabsContent value={"Layers" as functionsSidebarTabBtns} className="p-0">
      <h3 className="mb-4 pl-2 text-3xl font-semibold">Layers</h3>
      <LayerList layers={elements} />
    </TabsContent>
  );
};
