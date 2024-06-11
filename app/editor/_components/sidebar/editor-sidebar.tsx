import { Tabs, TabsList } from "@/components/ui/tabs";
import { EditorSidebarTabTrigger } from "./editor-sidebar-tab-trigger";
import { BrushIcon, DatabaseIcon, PlusIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { CustomizationTab } from "./tabs/customization-tab";
import { tabBtns } from "@/lib/constants";
import { ComponentsTab } from "./tabs/components-tab";

type Props = {};

export const EditorSidebar = (props: Props) => {
  return (
    <Tabs
      className="w-full max-w-[300px] rounded-md border border-th-btn bg-th-btn/15"
      defaultValue={"Components" as tabBtns}
    >
      <TabsList className="flex h-[68px] items-center overflow-hidden rounded-none bg-transparent p-0">
        <TooltipProvider delayDuration={0}>
          <EditorSidebarTabTrigger Icon={PlusIcon} value="Components" />
          <Separator orientation="vertical" className="bg-white/20" />
          <EditorSidebarTabTrigger Icon={BrushIcon} value="Customization" />
          <Separator orientation="vertical" className="bg-white/20" />
          <EditorSidebarTabTrigger Icon={DatabaseIcon} value="Media" />
        </TooltipProvider>
      </TabsList>
      <div className="px-[15px]">
        <ComponentsTab />
        <CustomizationTab />
      </div>
    </Tabs>
  );
};
