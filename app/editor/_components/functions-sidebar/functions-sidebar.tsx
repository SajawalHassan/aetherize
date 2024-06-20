import { Tabs, TabsList } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { functionsSidebarTabBtns } from "@/lib/constants";
import { FunctionsTabTrigger } from "./functions-tab-trigger";
import { DatabaseIcon, LayersIcon } from "lucide-react";
import { useAppSelector } from "@/hooks/store-hook";
import { VariablesTab } from "./tabs/variables-tab";
import { LayersTab } from "./tabs/layers-tab";
import clsx from "clsx";

type Props = {};

export const FunctionsSidebar = (props: Props) => {
  const { viewingMode } = useAppSelector((state) => state.editor);

  return (
    <div
      className={clsx("w-full max-w-[350px] transition-all duration-500", {
        "!w-0 !overflow-hidden !border-none !p-0": viewingMode === "preview",
      })}
    >
      <Tabs
        className={clsx(
          "fixed left-[16px] z-50 flex h-[calc(100%-121px)] w-full max-w-[350px] overflow-y-auto rounded-md border border-th-btn p-0 transition-all duration-500",
          {
            "!-left-[200rem]": viewingMode === "preview",
          },
        )}
        defaultValue={"Layers" as functionsSidebarTabBtns}
      >
        <TooltipProvider delayDuration={0}>
          <TabsList className="flex h-full w-[80px] flex-col justify-start gap-y-2 overflow-hidden rounded-none bg-black/30 p-2">
            <FunctionsTabTrigger value="Layers" Icon={LayersIcon} />
            <FunctionsTabTrigger value="Variables" Icon={DatabaseIcon} />
          </TabsList>
          <div className="w-full bg-black/10 px-2 py-[15px]">
            <LayersTab />
            <VariablesTab />
          </div>
        </TooltipProvider>
      </Tabs>
    </div>
  );
};
