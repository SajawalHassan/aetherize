import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import React from "react";
import { handleStyleChange } from "@/lib/helper";
import { ChromePicker } from "react-color";
import clsx from "clsx";

type Props = {
  showColorPicker: boolean;
  setShowColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  value?: string | number;
  onChange?: (e: string) => void;
  colorPickerClassName?: string;
};

export const ColorPicker = (props: Props) => {
  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleOnChange = (e: any) => {
    if (props.onChange) return props.onChange(e.target.value);
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
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-transparent border-b-white/10 bg-transparent pl-[10px] hover:border-b-white/20">
        <Input
          className="border-none bg-transparent p-0 text-[16px] font-medium text-white focus:border-transparent focus-visible:ring-0"
          value={
            props.value
              ? props.value
              : (selectedElement?.styles as any)[props.id!] || "---"
          }
          onChange={handleOnChange}
        />
        <div
          className="h-[40px] w-[50px] cursor-pointer border"
          style={{
            backgroundColor: props.value
              ? props.value
              : (selectedElement?.styles as any)[props.id!] || "white",
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
          <div
            className={clsx(
              "absolute bottom-[6rem] right-10 bg-th-btn p-2",
              props.colorPickerClassName,
            )}
          >
            <ChromePicker
              color={
                props.value
                  ? props.value
                  : (selectedElement?.styles as any)[props.id!] || "#fffff"
              }
              onChange={(e) => {
                handleOnChange({
                  target: {
                    id: props.id,
                    value: e.hex,
                  },
                });
              }}
              className="z-20"
            />
          </div>
        </>
      )}
    </div>
  );
};
