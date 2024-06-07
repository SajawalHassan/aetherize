"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { SidebarTab } from "./sidebar/sidebar-tab";
import { DatabaseIcon, PlusIcon, Settings2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { ComponentsTab } from "./sidebar/tabs/components-tab";

type Props = {};

export const EditorSidebar = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  });

  if (!isMounted) return;

  return (
    <Tabs
      defaultValue="Components"
      className="flex max-w-[25rem] flex-grow flex-row-reverse"
    >
      <TabsList className="flex h-full w-[80px] flex-col items-center justify-start gap-4 rounded-none border-l border-zinc-700 bg-zinc-800 px-2 py-4">
        <SidebarTab
          Icon={PlusIcon}
          value="Components"
          tooltipText="Add a component"
        />
        <SidebarTab Icon={Settings2Icon} value="Settings" />
        <SidebarTab Icon={DatabaseIcon} value="Data" />
      </TabsList>
      <div className="w-full bg-zinc-800 px-2">
        <ComponentsTab />
        <TabsContent value="Settings" className="py-4">
          <h3 className="text-center text-3xl font-bold">Customize</h3>
        </TabsContent>
        <TabsContent value="Data" className="py-4">
          <h3 className="text-center text-3xl font-bold">Media</h3>
        </TabsContent>
      </div>
    </Tabs>
  );
};
