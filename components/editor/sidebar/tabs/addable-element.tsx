import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddableElementType } from "@/data/editor-data";
import {
  addElement,
  changeDraggedElement,
  ElementData,
} from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { BODY_TAG_ID } from "@/lib/constants";
import { DragEvent } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  addableElement: AddableElementType;
};

const getNewElement = (
  elements: ElementData[],
  selectedElementId: string,
  element: AddableElementType
) => {
  const selectedElement = elements.find((e) => e.id === selectedElementId);
  let parentId = "";

  if (selectedElement && selectedElement.canContain)
    parentId = selectedElement.id;
  else if (selectedElement && !selectedElement.canContain)
    parentId = selectedElement.parentId;
  else if (!selectedElement) parentId = BODY_TAG_ID;

  const newElement = {
    name: element.name,
    styles: {},
    type: element.type,
    id: uuidv4(),
    parentId,
    canContain: element.canContain,
  };

  return newElement;
};

export const AddableElement = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedElementId = useAppSelector(
    (state) => state.editorReducer?.selectedElementId
  );
  const elements = useAppSelector((state) => state.editorReducer?.elements);

  const handleOnClick = () => {
    const newElement = getNewElement(
      elements,
      selectedElementId,
      props.addableElement
    );
    dispatch(addElement(newElement));
  };

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("text/plain", "addable-element");
    e.dataTransfer.effectAllowed = "copy";

    const newElement = getNewElement(
      elements,
      selectedElementId,
      props.addableElement
    );
    dispatch(changeDraggedElement(newElement));
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"icon"}
          className="h-20! w-20! p-0! border border-border rounded-sm flex-col"
          onClick={handleOnClick}
        >
          <div
            className="h-full w-full flex items-center flex-col justify-center"
            draggable
            onDragStart={handleDragStart}
          >
            <props.addableElement.icon className="icon" />
            <p className="opacity-75">{props.addableElement.name}</p>
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{props.addableElement.tooltip}</TooltipContent>
    </Tooltip>
  );
};
