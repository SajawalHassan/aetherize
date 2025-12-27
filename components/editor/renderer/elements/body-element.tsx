import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { Elementmanager } from "../element-manager";
import { BODY_TAG_ID } from "@/lib/constants";
import { useEffect, useState } from "react";
import {
  changeSelectedElement,
  ElementData,
} from "@/editor-store/editor-slice";
import { cn } from "@/lib/utils";

type Props = {};

export const BodyElement = (props: Props) => {
  const [element, setElement] = useState<ElementData | null>();

  const elements = useAppSelector((state) => state.editorReducer.elements);
  const selectedElement = useAppSelector(
    (state) => state.editorReducer.selectedElement
  );

  const dispatch = useAppDispatch();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!element) return;

    e.stopPropagation();
    dispatch(changeSelectedElement(element));
  };

  useEffect(() => {
    if (element) return;
    setElement(elements.filter((e) => e.id === BODY_TAG_ID)[0]);
  }, [elements]);

  if (!element) return;

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "border-4 border-transparent min-h-[calc(100vh-88px)]",
        selectedElement?.id === element.id && "border-green-500"
      )}
    >
      {elements
        .filter((e) => e.parentId === BODY_TAG_ID)
        .map((element) => (
          <Elementmanager element={element} key={element.id} />
        ))}
    </div>
  );
};
