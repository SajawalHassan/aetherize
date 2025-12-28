import {
  changeSelectedElementId,
  ElementData,
} from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { cn } from "@/lib/utils";
import { MouseEvent, MouseEventHandler } from "react";
import { Elementmanager } from "../element-manager";
import { Badge } from "@/components/ui/badge";

type Props = {
  children: React.ReactNode;
  element: ElementData;
  className?: string;
};

export const ElementLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedElementId = useAppSelector(
    (state) => state.editorReducer.selectedElementId
  );
  const elements = useAppSelector((state) => state.editorReducer.elements);
  const isSelected = props.element.id === selectedElementId;

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(changeSelectedElementId(props.element.id));
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "border-2 border-transparent relative",
        selectedElementId === props.element.id && "border-blue-500",
        props.className
      )}
    >
      {isSelected && <Badge text={props.element.name} />}

      {props.children}
      {props.element.canContain &&
        elements
          .filter((e) => e.parentId === props.element.id)
          .map((e) => <Elementmanager element={e} key={e.id} />)}
    </div>
  );
};
