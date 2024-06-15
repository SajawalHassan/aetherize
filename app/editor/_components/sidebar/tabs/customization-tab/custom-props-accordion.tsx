import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { editorActions } from "@/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleStyleChange } from "@/lib/helper";
import {
  AlignEndHorizontalIcon,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignStartHorizontalIcon,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalSpaceBetweenIcon,
  Columns2Icon,
  ColumnsIcon,
  FlipHorizontal2Icon,
  FlipHorizontalIcon,
  PanelBottomIcon,
  Rows2Icon,
  RowsIcon,
  SpaceIcon,
  WrapTextIcon,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { ButtonsSelect } from "../ui/buttons-select";
import {
  alignContentItems,
  alignItems_Items,
  flexDirectionItems,
  flexWrapItems,
  justifyContentItems,
} from "@/lib/constants";

type Props = {};

export const CustomPropsAccordion = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

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

  return (
    <AccordionItem value="custom" className="border-white/10">
      <AccordionCustomTrigger text="Custom props" />
      <AccordionContent className="mt-4">
        {selectedElement &&
          !Array.isArray(selectedElement.content) &&
          selectedElement.type === "link" && (
            <div className="space-y-2">
              <Input
                id="href"
                placeholder="https://example.com"
                value={selectedElement.content.href}
                onChange={handleCustomChange}
              />
              <Input
                id="text"
                placeholder="your text"
                value={selectedElement.content.text}
                onChange={handleCustomChange}
              />
            </div>
          )}
        {selectedElement &&
          !Array.isArray(selectedElement.content) &&
          selectedElement.type === "text" && (
            <Input
              id="text"
              placeholder="Your text..."
              value={selectedElement.content.text}
              onChange={handleCustomChange}
            />
          )}
        {selectedElement &&
          !Array.isArray(selectedElement.content) &&
          selectedElement.type === "image" && (
            <Input
              id="imageSrc"
              placeholder="Image url"
              value={selectedElement.content.imageSrc}
              onChange={handleCustomChange}
            />
          )}
        {selectedElement &&
          !Array.isArray(selectedElement.content) &&
          selectedElement.type === "video" && (
            <Input
              id="videoSrc"
              placeholder="Video url"
              value={selectedElement.content.videoSrc}
              onChange={handleCustomChange}
            />
          )}
        {selectedElement &&
          Array.isArray(selectedElement.content) &&
          selectedElement.type === "flexBox" && (
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
            </div>
          )}
      </AccordionContent>
    </AccordionItem>
  );
};
