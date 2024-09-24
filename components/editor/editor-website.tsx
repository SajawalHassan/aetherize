import React from "react";
import { RecursiveElement } from "./elements/recursive-element";
import { useAppSelector } from "@/store/store-hooks";
import { BodyElement } from "./elements/body-element";

interface Props {}

export const EditorWebsite = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);

  return (
    <div className="h-full w-full rounded-[10px] bg-th-prot">
      <BodyElement />
    </div>
  );
};
