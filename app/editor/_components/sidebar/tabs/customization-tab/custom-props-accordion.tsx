import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../_components/accordion-custom-trigger";
import { editorActions } from "@/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type Props = {};

export const CustomPropsAccordion = (props: Props) => {
  const [selectedVar, setSelectedVar] = useState("");

  const { elements, selectedElement, variables } = useAppSelector(
    (state) => state.editor,
  );
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
          !Array.isArray(selectedElement.content) &&
          selectedElement.type === "button" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-[40px] w-full items-center justify-between bg-th-btn/30 px-3 hover:bg-th-btn/50 active:bg-th-btn/70">
                <p className="font-bold">OnClick</p>
                <p className="">{selectedVar ? "Change variable" : "-"}</p>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer py-2.5 focus:bg-black/20 data-[state=open]:bg-black/20">
                    Change variable
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="border-none bg-th-btn p-0 text-white">
                      {variables.length > 0 ? (
                        variables.map((variable) => (
                          <DropdownMenuItem
                            key={variable.id}
                            className="focus:bg-black/20 focus:text-white"
                            onClick={(e) => {
                              setSelectedVar(variable.variableName);
                              dispatch(
                                editorActions.updateElement({
                                  elementId: selectedElement!.id,
                                  elementsArray: elements,
                                  elementData: {
                                    ...selectedElement,
                                    content: {
                                      ...selectedElement.content,
                                      onClick: {
                                        methodName: "changeVar",
                                        methodValue: variable.id,
                                      },
                                    },
                                  },
                                }),
                              );
                            }}
                          >
                            {variable.variableName}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <p className="p-2">No variables</p>
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
      </AccordionContent>
    </AccordionItem>
  );
};
