import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import React, { useState } from "react";

type Props = {
  dropdownList: string[];
  value: string;
  id: string;
  placeholder: string;
  defaultValue: string;
};

export const EditorSelect = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const changeSelectedItem = (newValue: string) => {
    handleStyleChange(
      {
        target: {
          id: props.id,
          value: newValue,
        },
      },
      selectedElement!,
      elements,
      dispatch,
    );
  };

  return (
    <Select
      onValueChange={(e) => changeSelectedItem(e || "")}
      value={props.value}
      defaultValue={props.defaultValue}
    >
      <SelectTrigger
        className="flex min-h-full w-full items-center justify-between gap-x-2 rounded-none border-secondary-foreground bg-th-btn/30 hover:bg-th-btn"
        showTrigger={false}
      >
        <p>{props.placeholder}</p>
        <SelectValue placeholder="-" className="font-semibold" />
      </SelectTrigger>
      <SelectContent className="border-none bg-th-btn text-white">
        {props.dropdownList.map((item) => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
