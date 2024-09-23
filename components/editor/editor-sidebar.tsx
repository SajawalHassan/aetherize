import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DatabaseIcon, LayersIcon, PencilIcon, PlusIcon, WorkflowIcon } from "lucide-react";
import { IconButton } from "../icon-button";
import { TooltipProvider } from "../ui/tooltip";
import { motion } from "framer-motion";
import React from "react";
import { AddElementTab } from "./tabs/add-element-tab";

interface Props {}

const tabData = [
  { id: "add", label: "Add an Element", Icon: PlusIcon },
  { id: "edit", label: "Edit Element", Icon: PencilIcon },
  { id: "layers", label: "Layers", Icon: LayersIcon },
  { id: "database", label: "Database", Icon: DatabaseIcon },
  { id: "backend", label: "Backend", Icon: WorkflowIcon },
];

export const EditorSidebar = (props: Props) => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial={{ opacity: 0, translateX: 300 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.25, delay: 0.25 }}
        className="h-full">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px] h-full flex flex-row-reverse gap-x-[8px]">
          <TabsList className="space-y-[14px] bg-transparent flex flex-col">
            {tabData.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} asChild>
                <IconButton
                  variant="primary"
                  Icon={tab.Icon}
                  size={30}
                  className="p-[9px] rounded-[10px]"
                  tooltipText={tab.label}
                  tooltipSide="left"
                  tooltipClassName="!-mt-[24px]"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          <AddElementTab />
        </Tabs>
      </motion.div>
    </TooltipProvider>
  );
};
