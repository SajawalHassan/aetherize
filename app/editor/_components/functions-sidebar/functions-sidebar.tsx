import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { editorContainerId, functionsSidebarTabBtns } from "@/lib/constants";
import clsx from "clsx";
import React, { useState } from "react";
import { FunctionsTabTrigger } from "./functions-tab-trigger";
import { DatabaseIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { VariableInput } from "./variable-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { editorActions } from "@/slices/editor-slice";
import { v4 } from "uuid";

type Props = {};

export const FunctionsSidebar = (props: Props) => {
  const [variableInput, setVariableInput] = useState("");

  const { selectedElement, viewingMode, variables } = useAppSelector(
    (state) => state.editor,
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedElement) return;

    dispatch(
      editorActions.changeVariablesList({
        id: v4(),
        elementId: selectedElement.id,
        cssProp: "",
        cssPropValue: "",
        variableName: variableInput,
        variableValue: true,
        variableTrigger: true,
      }),
    );
    setVariableInput("");
  };

  return (
    <div
      className={clsx("w-full max-w-[300px] transition-all duration-500", {
        "!w-0 !overflow-hidden !border-none !p-0": viewingMode === "preview",
      })}
    >
      <Tabs
        className={clsx(
          "fixed left-[16px] z-50 flex h-[calc(100%-121px)] w-full max-w-[300px] overflow-y-auto rounded-md border border-th-btn p-0 transition-all duration-500",
          {
            "!-left-[200rem]": viewingMode === "preview",
          },
        )}
        defaultValue={"Variables" as functionsSidebarTabBtns}
      >
        <TooltipProvider delayDuration={0}>
          <TabsList className="flex h-full w-[80px] flex-col justify-start overflow-hidden rounded-none bg-black/30 p-2">
            <FunctionsTabTrigger value="Variables" Icon={DatabaseIcon} />
          </TabsList>
          <div className="w-full bg-black/10 px-2 py-[15px]">
            {selectedElement ? (
              <>
                <h3 className="mb-6 text-center text-2xl font-bold">
                  {selectedElement.name} variables
                </h3>
                <TabsContent value={"Variables" as functionsSidebarTabBtns}>
                  <div className="space-y-2">
                    {variables
                      .filter(
                        (variable) => variable.elementId === selectedElement.id,
                      )
                      .map((variableObj) => (
                        <VariableInput
                          key={variableObj.variableName}
                          variable={variableObj}
                        />
                      ))}
                  </div>

                  <form
                    className={clsx("mt-4 flex items-center")}
                    onSubmit={handleSubmit}
                  >
                    <Input
                      value={variableInput}
                      onChange={(e) => setVariableInput(e.target.value)}
                      placeholder="New variable"
                      className="rounded-none bg-background p-3 focus:border-white/10"
                    />
                    <Button className="rounded-none">Add</Button>
                  </form>
                </TabsContent>
              </>
            ) : (
              <h3 className="mb-6 text-center text-2xl font-bold">
                No selected element
              </h3>
            )}
          </div>
        </TooltipProvider>
      </Tabs>
    </div>
  );
};
