import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import React from "react";
import { handleStyleChange } from "@/lib/helper";
import { HexColorPicker } from "react-colorful";

type Props = {
  label: string;
  id: string;
  showColorPicker: boolean;
  setShowColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ColorPicker = (props: Props) => {
  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <Label className="pl-2">{props.label}</Label>
      <div className="flex items-center justify-between border-b border-transparent border-b-white/10 bg-transparent pl-[10px] hover:border-b-white/20">
        <Input
          className="border-none bg-transparent p-0 text-[16px] font-medium text-white focus:border-transparent focus-visible:ring-0"
          value={(selectedElement?.containerStyles as any)[props.id] || "#fff"}
          onChange={(e) => {
            handleStyleChange(
              {
                target: {
                  id: props.id,
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
              (selectedElement?.containerStyles as any)[props.id] || "white",
          }}
          onClick={() => props.setShowColorPicker(true)}
        />
      </div>

      {props.showColorPicker && (
        <>
          <div
            className="fixed inset-0 z-0"
            onClick={() => props.setShowColorPicker(false)}
          />
          <div className="absolute bottom-[6rem] right-10 bg-th-btn p-2">
            <HexColorPicker
              color={(selectedElement?.containerStyles as any)[props.id]}
              onChange={(e) => {
                handleStyleChange(
                  {
                    target: {
                      id: props.id,
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
  );
};
