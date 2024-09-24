import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import React, { useMemo } from "react";
import { RecursiveElement } from "./recursive-element";
import { editorActions } from "@/store/slices/editor-slice";
import clsx from "clsx";

interface Props {}

export const BodyElement = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const nestedElements = editor.elements.filter((el) => el.containerId.includes("__body"));
  const isSelected = useMemo(() => editor.selectedElements.includes("__body"), [editor.selectedElements]);

  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(editorActions.selectElement("__body"));
  };

  return (
    <div>
      <div className={clsx("p-2 h-full border border-white", isSelected && "!border-blue-500")} onClick={handleSelect}>
        Body element
      </div>
      <div className="pl-4">
        {nestedElements.map((el) => (
          <RecursiveElement element={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};
