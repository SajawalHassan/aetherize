import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import React, { useMemo } from "react";
import { RecursiveElement } from "./recursive-element";
import { editorActions } from "@/store/slices/editor-slice";
import clsx from "clsx";
import { Badge } from "@/components/badge";

interface Props {}

export const BodyElement = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const nestedElements = editor.elements.filter((el) => el.containerId.includes("__body"));
  const isSelected = useMemo(
    () =>
      (editor.selectedElements.length === 1 && editor.selectedElements.includes("__body")) ||
      editor.selectedElements.length === 0,
    [editor.selectedElements]
  );

  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(editorActions.selectElement("__body"));
  };

  return (
    <div
      className={clsx(
        "relative h-full w-full overflow-auto border border-transparent transition-all duration-100",
        isSelected && "!border-th-primary"
      )}
      onClick={handleSelect}>
      <Badge variant="secondary" text="__body" className={clsx(!isSelected && "opacity-0")} />
      {nestedElements.map((el) => (
        <RecursiveElement element={el} key={el.id} />
      ))}
    </div>
  );
};
