import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import React, { useEffect, useState } from "react";
import { TriggerSelect } from "../customization-tab/_components/trigger-select";

type Props = {
  dropdownList: string[];
  value: string;
  cssProp: string;
  placeholder: string;
  defaultValue: string;
};

export const EditorSelect = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [placeholder, setPlaceholder] = useState("-");

  const { elements, selectedElement } = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();

  const handleOnChange = (value: string) => {
    setSelectedValue(value);
    handleStyleChange(
      {
        target: {
          id: props.cssProp,
          value,
        },
      },
      selectedElement!,
      elements,
      dispatch,
    );
  };

  useEffect(() => {
    setSelectedValue(props.value);
  }, []);

  return (
    <div className="flex h-[40px] w-full items-center justify-between bg-th-btn/30">
      <Select
        onValueChange={(e) => handleOnChange(e || "")}
        value={selectedValue}
        defaultValue={props.defaultValue}
      >
        <SelectTrigger
          showTrigger={false}
          className="rounded-none border-none bg-transparent p-0 pl-3 pr-3 hover:bg-th-btn"
        >
          <p>Display</p>
          <SelectValue placeholder={placeholder} className="font-semibold" />
        </SelectTrigger>
        <SelectContent className="border-none bg-th-btn text-white">
          {props.dropdownList.map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <TriggerSelect
        cssProp={props.cssProp}
        stateValue={selectedValue}
        setValuePlaceholder={setPlaceholder}
      />
    </div>
  );
};
