import React from "react";

type Props = {
  text: string;
};

export const SubText = (props: Props) => {
  return <p className="text-[15px] text-white/75">{props.text}</p>;
};
