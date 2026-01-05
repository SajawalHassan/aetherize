import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
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
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon,
  ChevronDownIcon,
  LucideIcon,
} from "lucide-react";
import React from "react";

export interface SpacingBtn {
  Icon: LucideIcon;
  tooltipContent: string;
  styles: React.CSSProperties;
}

export const spacingBtnsX: SpacingBtn[] = [
  {
    Icon: AlignLeftIcon,
    tooltipContent: "Align Left",
    styles: { justifyContent: "start" },
  },
  {
    Icon: AlignCenterHorizontalIcon,
    tooltipContent: "Align Center",
    styles: { justifyContent: "center" },
  },
  {
    Icon: AlignRightIcon,
    tooltipContent: "Align Right",
    styles: { justifyContent: "end" },
  },
  {
    Icon: AlignHorizontalSpaceBetweenIcon,
    tooltipContent: "Space Between",
    styles: { justifyContent: "space-between" },
  },
];

export const spacingBtnsY: SpacingBtn[] = [
  {
    Icon: AlignVerticalJustifyStartIcon,
    tooltipContent: "Align Left",
    styles: { alignItems: "start" },
  },
  {
    Icon: AlignVerticalJustifyCenterIcon,
    tooltipContent: "Align Center",
    styles: { alignItems: "center" },
  },
  {
    Icon: AlignVerticalJustifyEndIcon,
    tooltipContent: "Align Right",
    styles: { alignItems: "end" },
  },
];

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
        <Tabs value={display}>
          <TabsList className="bg-transparent text-white! gap-x-2 w-full justify-start! items-start! flex-col h-full rounded-none pl-4 pr-[13.5px] gap-y-4 pb-4">
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
          <TabsContent value="flex" className="mt-4 space-y-6">
            <div>
              <Label>Horizontal Spacing</Label>
              <div className="flex items-center ml-2 gap-x-4 mt-4">
                {spacingBtnsX.map((btn, idx) => (
                  <Button
                    key={idx}
                    variant={"icon"}
                    className="bg-black data-[state=active]:bg-black2 border border-border p-2! w-full"
                    tooltipContent={btn.tooltipContent}
                    onClick={(_) => handleStyleChange(btn.styles)}
                    data-state={
                      selectedElement?.styles.justifyContent ===
                      btn.styles.justifyContent
                        ? "active"
                        : "unactive"
                    }
                  >
                    <btn.Icon className="icon text-white" strokeWidth={1.5} />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Vertical Spacing</Label>
              <div className="flex items-center ml-2 gap-x-4 mt-4">
                {spacingBtnsY.map((btn, idx) => (
                  <Button
                    key={idx}
                    variant={"icon"}
                    className="bg-black data-[state=active]:bg-black2 border border-border p-2! w-full"
                    tooltipContent={btn.tooltipContent}
                    onClick={(_) => handleStyleChange(btn.styles)}
                    data-state={
                      selectedElement?.styles.alignItems ===
                      btn.styles.alignItems
                        ? "active"
                        : "unactive"
                    }
                  >
                    <btn.Icon className="icon text-white" strokeWidth={1.5} />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Gaps</Label>
              <div className="flex ml-2 gap-x-4 mt-4">
                <NumberInput
                  key={selectedElementId + 1}
                  placeholder="Gap X"
                  value={
                    selectedElement?.styles.columnGap
                      ? (selectedElement?.styles.columnGap as number)
                      : 0
                  }
                  changeValue={(newVal) =>
                    handleStyleChange({ columnGap: newVal })
                  }
                />
                <NumberInput
                  key={selectedElementId + 2}
                  placeholder="Gap Y"
                  value={
                    selectedElement?.styles.rowGap
                      ? (selectedElement?.styles.rowGap as number)
                      : 0
                  }
                  changeValue={(newVal) =>
                    handleStyleChange({ rowGap: newVal })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};
