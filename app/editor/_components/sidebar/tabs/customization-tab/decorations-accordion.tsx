import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";

type Props = {};

export const DecorationsAccordion = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <AccordionItem value="decorations" className="border-white/10">
      <AccordionCustomTrigger text="Decorations" />
      <AccordionContent className="flex flex-col gap-y-4 pt-4">
        <ColorPicker
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
          id="backgroundColor"
          label="Background color"
        />
      </AccordionContent>
    </AccordionItem>
  );
};
