import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { editorActions } from "@/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Input } from "@/components/ui/input";

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
            <Input
              id="href"
              placeholder="https://example.com"
              value={selectedElement.content.href}
              onChange={handleCustomChange}
            />
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
      </AccordionContent>
    </AccordionItem>
  );
};
