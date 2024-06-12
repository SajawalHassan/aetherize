import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useEffect, useReducer, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  id: string;
  placeholder: string;
  onChange: (e: { target: { id: string; value: string } }) => void;
  dropdownList: string[];
  defaultValue: string;
  className?: string;
};

export const InputDropdown = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState(props.defaultValue);
  const [inputValue, setInputValue] = useState(
    props.value.split(selectedItem)[0],
  );

  useEffect(() => {
    console.log("first");

    if (props.value.split(selectedItem)[0] !== inputValue)
      setInputValue(props.value.split(selectedItem)[0]);
  }, [props.value]);

  return (
    <div>
      <div
        className={cn(
          "flex items-center border border-white/10 bg-background px-3",
          props.className,
        )}
      >
        <Input
          id={props.id}
          placeholder={props.placeholder}
          onChange={(e) => {
            props.onChange({
              target: { id: props.id, value: e.target.value + selectedItem },
            });
            setInputValue(e.target.value);
          }}
          value={inputValue}
          className={cn("flex-grow border-none bg-transparent p-0")}
        />
        <Select
          onValueChange={(e) => {
            setSelectedItem(e);
            if (["max-content", "min-content", "fit-content"].includes(e)) {
              props.onChange({
                target: { id: props.id, value: e },
              });
            } else {
              props.onChange({
                target: { id: props.id, value: inputValue + e },
              });
            }
          }}
        >
          <SelectTrigger
            showTrigger={false}
            className="w-max border-none p-0 outline-none ring-0"
            defaultValue={props.defaultValue}
          >
            <SelectValue placeholder={props.defaultValue} />
          </SelectTrigger>
          <SelectContent className="overflow-y-auto border-none bg-th-btn text-white">
            {props.dropdownList.map((item) => (
              <SelectItem
                key={item}
                value={item}
                className="focus:bg-white/10 focus:text-white"
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
