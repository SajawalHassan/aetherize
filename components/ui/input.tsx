import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "./label";

type Props = {
  label?: string;
};

export const Input = ({
  placeholder,
  value,
  onChange,
  label,
  ...props
}: Props & React.ComponentProps<"input">) => {
  return (
    <div className="w-full">
      <Label className="font-bold text-[20px] mb-2">{label}</Label>
      <input
        placeholder={placeholder}
        value={value}
        className={cn(
          "w-full focus:outline-none border border-border rounded-[3px] px-2 relative z-20 bg-black h-13.75 focus:bg-[#141414] pl-3 transition duration-75"
        )}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
