import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../accordion-custom-trigger";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { alignTextItems } from "@/lib/constants/cssStyle-constants";
import { fontWeights } from "@/lib/constants/option-constants";
import { fonts } from "@/lib/constants/option-constants";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useState } from "react";
import { InputDropdown } from "@/app/editor/_components/sidebar/tabs/ui/input-dropdown";
import { ColorPicker } from "@/components/ui/color-picker";
import { ButtonsSelect } from "../ui/buttons-select";
import { EditorSelect } from "../ui/editor-select";

type Props = {};

export const TypographyAccordion = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { selectedElement, variables } = useAppSelector(
    (state) => state.editor,
  );

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
          <EditorSelect
            cssProp="fontFamily"
            value={selectedElement!.styles.fontFamily as string}
            defaultValue=""
            dropdownList={fonts}
            placeholder="Font family"
          />
          <EditorSelect
            cssProp="fontWeight"
            value={selectedElement!.styles.fontWeight as string}
            defaultValue=""
            dropdownList={fontWeights}
            placeholder="Font weight"
          />

          <div>
            <Label className="pl-2">Text color</Label>
            <ColorPicker
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              id="color"
            />
          </div>
          <InputDropdown
            cssProp="fontSize"
            placeholder="fontSize"
            value={(selectedElement?.styles.fontSize as string) || ""}
            className="border-x-0 border-b border-t-0 border-b-white/10 bg-transparent"
          />
        </AccordionContent>
      </TooltipProvider>
    </AccordionItem>
  );
};
