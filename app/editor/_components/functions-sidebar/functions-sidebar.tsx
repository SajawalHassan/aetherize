import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { functionsSidebarTabBtns } from "@/lib/constants";
import clsx from "clsx";
import React from "react";
import { FunctionsTabTrigger } from "./functions-tab-trigger";
import { DatabaseIcon, VariableIcon } from "lucide-react";
import { useAppSelector } from "@/hooks/store-hook";
import { VariableInput } from "./variable-input";

type Props = {};

export const FunctionsSidebar = (props: Props) => {
  const editor = useAppSelector((state) => state.editor);

  return (
    <div
      className={clsx("w-full max-w-[300px] transition-all duration-500", {
        "!w-0 !overflow-hidden !border-none !p-0":
          editor.viewingMode === "preview",
      })}
    >
      <Tabs
        className={clsx(
          "fixed left-[16px] z-50 flex h-[calc(100%-121px)] w-full max-w-[300px] overflow-y-auto rounded-md border border-th-btn p-0 transition-all duration-500",
          {
            "!-left-[200rem]": editor.viewingMode === "preview",
          },
        )}
        defaultValue={"Variables" as functionsSidebarTabBtns}
      >
        <TabsList className="flex h-full w-[80px] flex-col justify-start overflow-hidden rounded-none bg-black/30 p-2">
          <TooltipProvider delayDuration={0}>
            <FunctionsTabTrigger value="Variables" Icon={DatabaseIcon} />
          </TooltipProvider>
        </TabsList>
        <div className="w-full bg-black/10 px-2 py-[15px]">
          <h3 className="mb-6 text-center text-2xl font-bold">
            Global Variables
          </h3>
          <TabsContent value={"Variables" as functionsSidebarTabBtns}>
            {Object.keys(editor.variables).map((key) => (
              <VariableInput
                type={typeof editor.variables[key]}
                value={editor.variables[key]}
                name={key}
                key={key}
              />
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
