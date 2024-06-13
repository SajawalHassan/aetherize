import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fontTypes,
  fontWeightTypes,
  fontWeights,
  fonts,
  textUnits,
} from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useState } from "react";
import { handleStyleChange } from "@/lib/helper";
import { InputDropdown } from "@/components/ui/input-dropdown";
import { ColorPicker } from "@/components/ui/color-picker";

type Props = {};

export const TypographyAccordion = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  return (
    <AccordionItem value="typography" className="relative border-white/10">
      <TooltipProvider delayDuration={150}>
        <AccordionCustomTrigger text="Typography" />
        <AccordionContent className="mt-4 space-y-[18px]">
          <div className="space-y-2">
            <p className="text-muted-foreground">Text alignment</p>
            <Tabs
              onValueChange={(e) =>
                handleStyleChange(
                  {
                    target: {
                      id: "textAlign",
                      value: e,
                    },
                  },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
            >
              <TabsList className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] border-white/20 bg-transparent">
                <TabsTrigger
                  value="left"
                  className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                  tooltipText="Align left"
                >
                  <AlignLeftIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                  tooltipText="Align right"
                >
                  <AlignRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                  tooltipText="Align center"
                >
                  <AlignCenterIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                  tooltipText="Align justify"
                >
                  <AlignJustifyIcon size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col">
            <Label className="pl-2">Font</Label>
            <Select
              defaultValue={"Roboto" as fontTypes}
              onValueChange={(e) =>
                handleStyleChange(
                  {
                    target: {
                      id: "fontFamily",
                      value: e,
                    },
                  },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
            >
              <SelectTrigger className="border-b border-transparent border-b-white/10 bg-transparent text-[16px] font-medium hover:border-b-white/20">
                <SelectValue
                  placeholder="Select a font"
                  className="text-[16px] font-medium"
                />
              </SelectTrigger>
              <SelectContent className="max-h-[20rem] w-full overflow-y-auto border-none bg-th-btn text-white">
                {fonts.map((font) => (
                  <SelectItem
                    key={font}
                    value={font}
                    className="focus:bg-white/10 focus:text-white"
                  >
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ColorPicker
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            id="color"
            label="Text color"
          />
          <div className="flex flex-col">
            <Label className="pl-2">Font weight</Label>
            <Select
              value={
                (selectedElement?.containerStyles.fontWeight ||
                  "500") as fontWeightTypes
              }
              onValueChange={(e) =>
                handleStyleChange(
                  {
                    target: {
                      id: "fontWeight",
                      value: e,
                    },
                  },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
            >
              <SelectTrigger className="border-b border-transparent border-b-white/10 bg-transparent text-[16px] font-medium hover:border-b-white/20">
                <SelectValue
                  placeholder="Select a font weight"
                  className="text-[16px] font-medium"
                />
              </SelectTrigger>
              <SelectContent className="max-h-[20rem] w-full overflow-y-auto border-none bg-th-btn text-white">
                {fontWeights.map((fontWeight) => (
                  <SelectItem
                    key={fontWeight}
                    value={fontWeight}
                    className="focus:bg-white/10 focus:text-white"
                  >
                    {fontWeight}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <InputDropdown
            id="fontSize"
            placeholder="fontSize"
            onChange={(e) =>
              handleStyleChange(
                { target: { id: "fontSize", value: e } },
                selectedElement!,
                elements,
                dispatch,
              )
            }
            value={(selectedElement?.containerStyles.fontSize as string) || ""}
            defaultValue="px"
            dropdownList={textUnits}
            className="border-x-0 border-b border-t-0 border-b-white/10 bg-transparent"
          />
        </AccordionContent>
      </TooltipProvider>
    </AccordionItem>
  );
};
