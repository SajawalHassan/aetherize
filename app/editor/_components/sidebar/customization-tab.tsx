import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/store-hook";
import { tabBtns } from "@/lib/constants";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

export const CustomizationTab = (props: Props) => {
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(
    null,
  );
  const dispatch = useDispatch();

  const { selectedElements, elements } = useAppSelector(
    (state) => state.editor,
  );

  useMemo(() => setSelectedElement(selectedElements[0]), [selectedElements]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElement) return;

    const property = e.target.id;
    const propertyValue = e.target.value;

    const propertyObject = {
      [property]: propertyValue,
    };

    dispatch(
      editorActions.updateElement({
        elementId: selectedElement.id,
        elementsArray: elements,
        elementData: {
          ...selectedElement,
          content: { ...selectedElement.content, ...propertyObject },
        },
      }),
    );
  };

  const handleStyleChange = (e: any) => {
    if (!selectedElement) return;

    const property = e.target.id;
    const propertyValue = e.target.value;

    const propertyObject = {
      [property]: propertyValue,
    };

    dispatch(
      editorActions.updateElement({
        elementId: selectedElement.id,
        elementsArray: elements,
        elementData: {
          ...selectedElement,
          styles: { ...selectedElement.styles, ...propertyObject },
        },
      }),
    );
  };

  return (
    <TabsContent value={"Customization" as tabBtns}>
      <Accordion type="multiple" className="w-full space-y-[20px] pt-4">
        <h3 className="mb-4 text-center text-3xl font-bold">
          {selectedElement ? "Customization" : "No element selected"}
        </h3>

        {selectedElement && (
          <>
            {/* Custom props */}
            <AccordionItem value="custom" className="border-white/10">
              <AccordionCustomTrigger text="Custom props" />
              <AccordionContent className="mt-4">
                {selectedElement &&
                  !Array.isArray(selectedElement.content) &&
                  selectedElement.type === "link" && (
                    <Input
                      id="href"
                      placeholder="https://example.com"
                      value={selectedElement.content.href}
                      onChange={handleCustomChange}
                    />
                  )}
              </AccordionContent>
            </AccordionItem>

            {/* Typography */}
            <AccordionItem value="typography" className="border-white/10">
              <AccordionCustomTrigger text="Typography" />
              <AccordionContent className="mt-4">asdasdasf</AccordionContent>
            </AccordionItem>

            {/* Layout */}
            <AccordionItem value="layout" className="border-white/10">
              <AccordionCustomTrigger text="Layout" />
              <AccordionContent className="mt-4">asdasdasf</AccordionContent>
            </AccordionItem>

            {/* Decorations */}
            <AccordionItem value="decorations" className="border-white/10">
              <AccordionCustomTrigger text="Decorations" />
              <AccordionContent className="mt-4">asdasdasf</AccordionContent>
            </AccordionItem>
          </>
        )}
      </Accordion>
    </TabsContent>
  );
};

const AccordionCustomTrigger = ({ text }: { text: string }) => {
  return (
    <AccordionTrigger className="flex h-[48px] w-full items-center gap-x-[10px] rounded-[5px] bg-th-btn/40 px-[10px] hover:bg-th-btn/60 active:bg-th-btn/80">
      <p className="text-[18px] font-medium">{text}</p>
    </AccordionTrigger>
  );
};
