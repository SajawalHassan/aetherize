import { AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../accordion-custom-trigger";
import { InputDropdown } from "@/components/editor/sidebar/tabs/_components/input-dropdown";
import {
  alignContentItems,
  alignItems_Items,
  flexDirectionItems,
  flexWrapItems,
  justifyContentItems,
} from "@/lib/constants/cssStyle-constants";
import { displayUnits } from "@/lib/constants/option-constants";
import { useAppSelector } from "@/hooks/store-hook";
import { EditorSelect } from "../_components/editor-select";
import { ButtonsSelect } from "../_components/buttons-select";

type Props = {};

export const DisplayAccordion = (props: Props) => {
  const { selectedElement, variables } = useAppSelector(
    (state) => state.editor,
  );

  if (!selectedElement) return;

  return (
    <AccordionItem value="display" className="border-white/10">
      <AccordionCustomTrigger text="Display properties" />
      <AccordionContent className="mt-4">
        <EditorSelect
          dropdownList={displayUnits}
          cssProp="display"
          value={selectedElement!.styles.display || ""}
          placeholder="Display"
          defaultValue="block"
          variables={variables.filter((variable) => variable.type === "string")}
        />

        {selectedElement!.styles.display === "flex" && (
          <div className="space-y-4">
            {/* Justify content */}
            <ButtonsSelect
              items={justifyContentItems}
              label="Justify content"
              property="justifyContent"
            />

            {/* Align items */}
            <ButtonsSelect
              items={alignItems_Items}
              label="Align items"
              property="alignItems"
            />

            {/* Flex wrap */}
            <ButtonsSelect
              items={flexWrapItems}
              label="Flex wrap"
              property="flexWrap"
            />

            {/* Flex direction */}
            <ButtonsSelect
              items={flexDirectionItems}
              label="Flex direction"
              property="flexDirection"
            />

            {/* Align content */}
            <ButtonsSelect
              items={alignContentItems}
              label="Align content"
              property="alignContent"
            />
            <div className="flex items-center gap-x-2">
              <InputDropdown
                cssProp="rowGap"
                placeholder="Gap row"
                value={(selectedElement!.styles.rowGap as string) || ""}
              />

              <InputDropdown
                cssProp="columnGap"
                placeholder="Gap column"
                value={(selectedElement!.styles.columnGap as string) || ""}
              />
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
