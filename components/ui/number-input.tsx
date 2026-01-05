import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type Props = {
  placeholder: string;
  value: number;
  changeValue: (newValue: number) => void;
};

export const NumberInput = (props: Props) => {
  const [localValue, setLocalValue] = useState(props.value);

  useEffect(() => {
    console.log("asddsa");
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.valueAsNumber);
  };

  const handlePropFuncCall = (e?: FormEvent) => {
    e?.preventDefault();

    if (!localValue) {
      setLocalValue(0);
      props.changeValue(0);
      return;
    }

    props.changeValue(localValue);
  };

  return (
    <form
      className="flex items-center border border-border pl-2 max-w-30"
      onSubmit={handlePropFuncCall}
    >
      <input
        placeholder={props.placeholder}
        value={localValue.toString()}
        onChange={handleOnChange}
        onBlur={handlePropFuncCall}
        type="number"
        className="h-8 w-full focus:outline-none px-2"
      />
      <div className="flex  ml-1">
        <Button
          type="button"
          variant="icon"
          className="rounded-none"
          onClick={() => {
            setLocalValue(localValue + 1);
            props.changeValue(localValue + 1);
          }}
        >
          <ChevronUpIcon />
        </Button>
        <Button
          type="button"
          variant="icon"
          className="rounded-none"
          onClick={() => {
            setLocalValue(localValue - 1);
            props.changeValue(localValue - 1);
          }}
        >
          <ChevronDownIcon />
        </Button>
      </div>
    </form>
  );
};
