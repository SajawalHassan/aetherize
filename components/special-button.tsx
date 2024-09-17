import React from "react";

type Props = {
  text: string;
};

export const SpecialButton = (props: Props) => {
  return (
    <button aria-description={props.text} className="rounded-full py-[9px] px-[13.5px] bg-gradient-to-r text-[16px] font-bold from-th-primary to-th-accent/90 ">
      {props.text}
    </button>
  );
};
