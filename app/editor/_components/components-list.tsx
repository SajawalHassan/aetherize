import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "./accordion-custom-trigger";
import { EditorElementTypes } from "@/lib/types";

type Props = {
  items: {
    Component: React.ReactNode;
    group: "element" | "layout";
    label: string;
    id: EditorElementTypes;
  }[];
};

export const ComponentsList = (props: Props) => {
  return (
    <Accordion
      type="multiple"
      className="space-y-[20px] pt-4"
      defaultValue={["layout", "elements"]}
    >
      <h3 className="mb-6 text-center text-3xl font-bold">Components</h3>
      <AccordionItem value="layout" className="border-white/10">
        <AccordionCustomTrigger text="Layout" />
        <AccordionContent className="flex flex-wrap items-center gap-[10px] pt-4">
          {props.items
            .filter((item) => item.group === "layout")
            .map((layoutElement) => (
              <div
                className="flex flex-col items-center justify-center"
                key={layoutElement.id}
              >
                <div className="h-16 w-16">{layoutElement.Component}</div>
                <span className="text-xs text-muted-foreground">
                  {layoutElement.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="elements" className="border-white/10">
        <AccordionCustomTrigger text="Elements" />
        <AccordionContent className="flex flex-wrap items-center gap-[10px] pt-4">
          {props.items
            .filter((item) => item.group === "element")
            .map((element) => (
              <div
                className="flex flex-col items-center justify-center"
                key={element.id}
              >
                <div className="h-16 w-16">{element.Component}</div>
                <span className="text-xs text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
