import React from "react";

type Props = {
  text: string;
};

export const SecondaryButton = (props: Props) => {
  return <button className="rounded-full py-[9px] px-[13.5px] bg-transparent border border-white/75 text-[16px] font-bold">{props.text}</button>;
};
