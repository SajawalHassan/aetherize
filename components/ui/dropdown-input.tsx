import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "./label";

type Props = {
  values: string[];
  func: (value: string) => void;
  placeholder?: string;
  label?: string;
  default?: string;
};

export const DropdownInput = (props: Props) => {
  const [localValues, setLocalValues] = useState<string[]>(props.values);
  const [isActive, setIsActive] = useState(false);
  const [localInput, setLocalInput] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);

    if (!e.target.value) return setLocalValues(props.values);
    setLocalValues(props.values.filter((v) => v.includes(e.target.value)));
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    if (!localValues.includes(localInput)) {
      setLocalInput(props.default ? props.default : "");
      setLocalValues(props.values);
      props.func(props.default ? props.default : "");
      return;
    }

    props.func(localInput);
  };

  return (
    <div className="z-50!">
      {props.label && <Label className="text-sm mb-1">{props.label}</Label>}
      {isActive && (
        <div
          className="fixed z-50 inset-0 h-screen w-screen"
          onClick={(_) => {
            setIsActive(false);
            handleSubmit();
          }}
        />
      )}
      <form onSubmit={handleSubmit} className="relative">
        <input
          placeholder={props.placeholder}
          value={localInput}
          className={cn(
            "h-8 w-full focus:outline-none border border-border rounded-sm px-2 relative z-20",
            isActive && "border-b-transparent rounded-b-none"
          )}
          onClick={(_) => setIsActive(true)}
          onChange={handleOnChange}
        />

        {isActive && (
          <div className="absolute top-8 w-full bg-black2 border-b-sm z-50!">
            {localValues.map((val) => (
              <p
                className="p-2 hover:bg-black3 cursor-pointer "
                onClick={(_) => {
                  setLocalInput(val);
                  props.func(val);
                  setIsActive(false);
                }}
                key={val}
              >
                {val}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
