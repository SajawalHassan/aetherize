import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { editElementData } from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import {
  AlignCenterHorizontalIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import React from "react";

type Props = {};

export const SpacingSection = (props: Props) => {
  const selectedElementId = useAppSelector(
    (s) => s.editorReducer.selectedElementId
  );
  const selectedElement = useAppSelector((s) => s.editorReducer.elements).find(
    (e) => e.id === selectedElementId
  );

  const dispatch = useAppDispatch();

  const isFlex = selectedElement?.styles.display === "flex";
  const isGrid = selectedElement?.styles.display === "grid";
  const display = isFlex ? "flex" : isGrid ? "grid" : "none";

  const handleDisplayChange = (display: string) => {
    if (!selectedElement) return;

    dispatch(
      editElementData({
        ...selectedElement,
        styles: { ...selectedElement.styles, display },
      })
    );
  };

  const handleStyleChange = (style: React.CSSProperties) => {
    if (!selectedElement) return;

    dispatch(
      editElementData({
        ...selectedElement,
        styles: { ...selectedElement.styles, ...style },
      })
    );
  };

  return (
    <AccordionItem value="spacing">
      <AccordionTrigger className="text-[20px] flex items-center px-6 py-2 hover:bg-black2 rounded-none">
        <p className="font-medium">Layout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </AccordionTrigger>
      <AccordionContent className="mt-4 px-6">
        <Tabs defaultValue={display}>
          <TabsList className="bg-transparent text-white! gap-x-2 w-full  flex-col h-full rounded-none pl-4 pr-[13.5px] gap-y-4 pb-4">
            <div className="flex items-center gap-x-2 w-full">
              <TabsTrigger value="flex" asChild>
                <Button
                  className="bg-transparent border border-border p-2! grow text-white! data-[state=active]:bg-black3! hover:bg-black2"
                  tooltipContent="Apply flexbox to this container"
                  onClick={(_) => handleDisplayChange("flex")}
                >
                  Flexbox
                </Button>
              </TabsTrigger>
              <TabsTrigger value="grid" asChild>
                <Button
                  className="bg-transparent border border-border p-2! grow text-white! data-[state=active]:bg-black3! hover:bg-black2"
                  tooltipContent="Apply grid to this container"
                  onClick={(_) => handleDisplayChange("grid")}
                >
                  Grid
                </Button>
              </TabsTrigger>
              <TabsTrigger value="none" asChild>
                <Button
                  className="bg-transparent border border-border p-2! grow text-white! data-[state=active]:bg-black3! hover:bg-black2"
                  tooltipContent="Default layout, block positioning."
                  onClick={(_) => handleDisplayChange("block")}
                >
                  None
                </Button>
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent
            value="flex"
            className="flex items-center justify-center gap-x-4 mt-4"
          >
            <TooltipProvider>
              <Button
                variant={"icon"}
                className="bg-black3 border border-border p-2! w-full"
                tooltipContent="Align Left"
                onClick={(_) => handleStyleChange({ justifyContent: "start" })}
              >
                <AlignLeftIcon className="icon text-white" strokeWidth={1.5} />
              </Button>
              <Button
                variant={"icon"}
                className="bg-black3 border border-border p-2! w-full"
                tooltipContent="Align Right"
                onClick={(_) => handleStyleChange({ justifyContent: "end" })}
              >
                <AlignRightIcon className="icon text-white" strokeWidth={1.5} />
              </Button>
              <Button
                variant={"icon"}
                className="bg-black3 border border-border p-2! w-full"
                tooltipContent="Space Between"
                onClick={(_) =>
                  handleStyleChange({ justifyContent: "space-between" })
                }
              >
                <AlignHorizontalSpaceBetweenIcon
                  className="icon text-white"
                  strokeWidth={1.5}
                />
              </Button>
              <Button
                variant={"icon"}
                className="bg-black3 border border-border p-2! w-full"
                tooltipContent="Align Center"
                onClick={(_) => handleStyleChange({ justifyContent: "center" })}
              >
                <AlignCenterHorizontalIcon
                  className="icon text-white"
                  strokeWidth={1.5}
                />
              </Button>
            </TooltipProvider>
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};
