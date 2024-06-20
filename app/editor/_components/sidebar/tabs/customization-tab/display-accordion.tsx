import { AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../_components/accordion-custom-trigger";
import { InputDropdown } from "@/app/editor/_components/sidebar/tabs/ui/input-dropdown";
import {
  alignContentItems,
  alignItems_Items,
  displayUnits,
  flexDirectionItems,
  flexWrapItems,
  justifyContentItems,
  specialTextUnits,
  textUnits,
} from "@/lib/constants";
import { useAppSelector } from "@/hooks/store-hook";
import { EditorSelect } from "../ui/editor-select";
import { ButtonsSelect } from "../ui/buttons-select";

type Props = {};

export const DisplayAccordion = (props: Props) => {
  const { selectedElement } = useAppSelector((state) => state.editor);

  //   prettier-ignore
  return (
    <AccordionItem value="display" className="border-white/10">
      <AccordionCustomTrigger text="Display" />
      <AccordionContent className="mt-4">
        <EditorSelect
          dropdownList={displayUnits}
          id="display"
          value={selectedElement!.styles.display || ""}
          placeholder="Display"
          defaultValue="block"
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
                dropdownList={textUnits}
                specialUnits={specialTextUnits}
                id="rowGap"
                placeholder="Gap row"
                value={
                  (selectedElement!.styles.rowGap as string) || ""
                }
              />

              <InputDropdown
                dropdownList={textUnits}
                specialUnits={specialTextUnits}
                id="columnGap"
                placeholder="Gap column"
                value={
                  (selectedElement!.styles.columnGap as string) || ""
                }
              />
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
