import { useAppSelector } from "@/store/store-hooks";
import React, { useMemo } from "react";
import { RecursiveElement } from "./recursive-element";

interface Props {}

export const BodyElement = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const nestedElements = editor.elements.filter((el) => el.containerId.includes("__body"));

  return (
    <div>
      BodyElement
      <div className="pl-4">
        {nestedElements.map((el) => (
          <RecursiveElement element={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};
