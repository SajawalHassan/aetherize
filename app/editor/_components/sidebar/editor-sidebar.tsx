import { Tabs, TabsList } from "@/components/ui/tabs";
import { EditorSidebarBtn } from "./editor-sidebar-btn";
import { BrushIcon, DatabaseIcon, PlusIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { CustomizationTab } from "./customization-tab";
import { tabBtns } from "@/lib/constants";

type Props = {};

export const EditorSidebar = (props: Props) => {
  return (
    <Tabs
      className="w-full max-w-[300px] rounded-md border border-th-btn bg-th-btn/15"
      defaultValue={"Customization" as tabBtns}
    >
      <TabsList className="flex h-[68px] items-center overflow-hidden rounded-none bg-transparent p-0">
        <TooltipProvider delayDuration={0}>
          <EditorSidebarBtn Icon={BrushIcon} value="Customization" />
          <Separator orientation="vertical" className="bg-white/20" />
          <EditorSidebarBtn Icon={PlusIcon} value="Components" />
          <Separator orientation="vertical" className="bg-white/20" />
          <EditorSidebarBtn Icon={DatabaseIcon} value="Media" />
        </TooltipProvider>
      </TabsList>
      <div className="px-[15px]">
        <CustomizationTab />
      </div>
    </Tabs>
  );
};
