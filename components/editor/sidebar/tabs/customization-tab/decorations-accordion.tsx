import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../accordion-custom-trigger";
import { useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";

type Props = {};

export const DecorationsAccordion = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <AccordionItem value="decorations" className="border-white/10">
      <AccordionCustomTrigger text="Decorations" />
      <AccordionContent className="flex flex-col gap-y-4 pt-4">
        <div>
          <Label className="pl-2">Background color</Label>
          <ColorPicker
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            id="backgroundColor"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
