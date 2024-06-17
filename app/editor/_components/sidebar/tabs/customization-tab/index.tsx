import { Accordion, AccordionTrigger } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/store-hook";
import { tabBtns } from "@/lib/constants";
import { CustomPropsAccordion } from "./custom-props-accordion";
import { TypographyAccordion } from "./typography-accordion";
import { DimensionsAccordion } from "./dimensions-accordion";
import { DecorationsAccordion } from "./decorations-accordion";
import { DisplayAccordion } from "./display-accordion";

type Props = {};

export const CustomizationTab = (props: Props) => {
  const { selectedElement } = useAppSelector((state) => state.editor);

  return (
    <TabsContent value={"Customization" as tabBtns}>
      <Accordion
        type="multiple"
        className="w-full space-y-[20px] pt-4"
        defaultValue={["custom", "display", "typography"]}
      >
        <h3 className="mb-4 text-center text-3xl font-bold">
          {selectedElement ? "Customization" : "No element selected"}
        </h3>

        {selectedElement && (
          <>
            {/* Custom properties */}
            <CustomPropsAccordion />

            {selectedElement.type === "container" && (
              <>
                {/* Display properties */}
                <DisplayAccordion />
              </>
            )}

            {selectedElement.type === "__body" && (
              <>
                {/* Display properties */}
                <DisplayAccordion />
              </>
            )}

            {/* Typography */}
            <TypographyAccordion />

            {/* Dimensions */}
            <DimensionsAccordion />

            {/* Decorations */}
            <DecorationsAccordion />
          </>
        )}
      </Accordion>
    </TabsContent>
  );
};

export const AccordionCustomTrigger = ({ text }: { text: string }) => {
  return (
    <AccordionTrigger className="flex h-[48px] w-full items-center gap-x-[10px] rounded-[5px] bg-th-btn/40 px-[10px] hover:bg-th-btn/60 active:bg-th-btn/80">
      <p className="text-[18px] font-medium">{text}</p>
    </AccordionTrigger>
  );
};
