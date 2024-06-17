import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { handleStyleChange } from "@/lib/helper";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";

type Props = {
  value: string;
  placeholder: string;
  dropdownList: string[];
  className?: string;
  specialUnits: string[];
  id: string;
};

export const InputDropdown = (props: Props) => {
  const [value, setValue] = useState(props.value.split(/(\d+)/)[1] || "");
  const [selectedItem, setSelectedItem] = useState(
    props.value.split(/(\d+)/)[2] || "",
  );

  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleStyleChange(
      {
        target: {
          id: props.id,
          value: props.specialUnits.includes(selectedItem)
            ? selectedItem
            : value + selectedItem,
        },
      },
      selectedElement!,
      elements,
      dispatch,
    );
  }, [selectedItem, value]);

  useEffect(() => {
    setSelectedItem(
      props.value.split(/(\d+)/)[2] || selectedItem
        ? selectedItem
        : props.specialUnits.includes(props.value)
          ? props.value
          : "",
    );
    setValue(props.value.split(/(\d+)/)[1] || "");
  }, [props.value]);

  return (
    <div
      className={cn(
        "flex items-center border border-white/10 bg-background pl-3 pt-0",
        props.className,
      )}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value.split(/(\d+)/)[1] || "")}
        placeholder={props.placeholder}
        className="border-none bg-transparent p-0"
      />
      <Select
        onValueChange={(e) => setSelectedItem(e || "")}
        value={selectedItem}
      >
        <SelectTrigger
          className="flex min-h-full w-[60px] items-center justify-center rounded-none border-none p-0 hover:bg-th-btn"
          showTrigger={false}
        >
          <SelectValue placeholder="-" />
        </SelectTrigger>
        <SelectContent className="border-none bg-th-btn text-white">
          {props.dropdownList.map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
