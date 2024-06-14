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
      { target: { id: props.id, value: value + selectedItem } },
      selectedElement!,
      elements,
      dispatch,
    );
  }, [selectedItem, value]);

  useEffect(() => {
    setValue(props.value.split(/(\d+)/)[1] || "");
    setSelectedItem(
      props.value.split(/(\d+)/)[2] || selectedItem ? selectedItem : "",
    );
  }, [props.value]);

  return (
    <div
      className={cn(
        "flex items-center border border-white/10 bg-background pl-3",
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
          className="h-full w-max rounded-none border-none px-4 hover:bg-th-btn"
          showTrigger={false}
        >
          <SelectValue placeholder="-" />
        </SelectTrigger>
        <SelectContent>
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
