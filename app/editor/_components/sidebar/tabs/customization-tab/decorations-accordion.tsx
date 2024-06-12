import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useState } from "react";
import { handleStyleChange } from "@/lib/helper";
import { HexColorPicker } from "react-colorful";

type Props = {};

export const DecorationsAccordion = (props: Props) => {
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);

  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  return (
    <AccordionItem value="decorations" className="border-white/10">
      <AccordionCustomTrigger text="Decorations" />
      <AccordionContent className="flex flex-col gap-y-4 pt-4">
        <div className="flex flex-col">
          <Label className="pl-2">Background Color</Label>
          <div className="flex items-center justify-between border-b border-transparent border-b-white/10 bg-transparent pl-[10px] hover:border-b-white/20">
            <Input
              className="border-none bg-transparent p-0 text-[16px] font-medium text-white focus:border-transparent focus-visible:ring-0"
              value={selectedElement?.containerStyles.backgroundColor || "#fff"}
              onChange={(e) => {
                handleStyleChange(
                  {
                    target: {
                      id: "backgroundColor",
                      value: e.target.value.includes("#")
                        ? e.target.value
                        : `#${e.target.value}`,
                    },
                  },
                  selectedElement!,
                  elements,
                  dispatch,
                );
              }}
            />
            <div
              className="h-[40px] w-[50px] cursor-pointer"
              style={{
                backgroundColor:
                  selectedElement?.containerStyles.backgroundColor || "white",
              }}
              onClick={() => setShowBackgroundColorPicker(true)}
            />
          </div>

          {showBackgroundColorPicker && (
            <>
              <div
                className="fixed inset-0 z-0"
                onClick={() => setShowBackgroundColorPicker(false)}
              />
              <div className="absolute bottom-[6rem] right-10 bg-th-btn p-2">
                <HexColorPicker
                  color={selectedElement?.containerStyles.backgroundColor}
                  onChange={(e) => {
                    handleStyleChange(
                      {
                        target: {
                          id: "backgroundColor",
                          value: e,
                        },
                      },
                      selectedElement!,
                      elements,
                      dispatch,
                    );
                  }}
                  className="z-20"
                />
              </div>
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
