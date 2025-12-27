import {
  changeSelectedElement,
  ElementData,
} from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { cn } from "@/lib/utils";
import { MouseEvent, MouseEventHandler } from "react";
import { Elementmanager } from "../element-manager";

type Props = {
  children: React.ReactNode;
  element: ElementData;
  className?: string;
};

export const ElementLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedElement = useAppSelector(
    (state) => state.editorReducer.selectedElement
  );
  const elements = useAppSelector((state) => state.editorReducer.elements);
  console.log(elements.filter((e) => e.parentId === props.element.id));

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(changeSelectedElement(props.element));
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "border-2 border-transparent",
        selectedElement?.id === props.element.id && "border-blue-500",
        props.className
      )}
    >
      {props.children}
      {elements
        .filter((e) => e.parentId === props.element.id)
        .map((e) => (
          <Elementmanager element={e} key={e.id} />
        ))}
    </div>
  );
};
