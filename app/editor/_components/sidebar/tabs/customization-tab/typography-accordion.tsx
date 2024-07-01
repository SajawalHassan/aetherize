import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../accordion-custom-trigger";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontWeightTypes } from "@/lib/types/font-types";
import { alignTextItems } from "@/lib/constants/cssStyle-constants";
import {
  fontWeights,
  specialTextUnits,
  textUnits,
} from "@/lib/constants/option-constants";
import { fonts } from "@/lib/constants/option-constants";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useState } from "react";
import { handleStyleChange } from "@/lib/helper";
import { InputDropdown } from "@/app/editor/_components/sidebar/tabs/ui/input-dropdown";
import { ColorPicker } from "@/components/ui/color-picker";
import { ButtonsSelect } from "../ui/buttons-select";

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
          {/* Align text */}
          <ButtonsSelect
            items={alignTextItems}
            label="Text alignment"
            property="textAlign"
          />
          <div className="flex flex-col">
            <Label className="pl-2">Font</Label>
            <Select
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
              value={selectedElement?.styles.fontWeight as fontWeightTypes}
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
            value={(selectedElement?.styles.fontSize as string) || ""}
            dropdownList={textUnits}
            specialUnits={specialTextUnits}
            className="border-x-0 border-b border-t-0 border-b-white/10 bg-transparent"
          />
        </AccordionContent>
      </TooltipProvider>
    </AccordionItem>
  );
};
