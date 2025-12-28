import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddableElementType } from "@/data/editor-data";
import { addElement } from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { BODY_TAG_ID } from "@/lib/constants";
import { v4 as uuidv4 } from "uuid";

type Props = {
  addableElement: AddableElementType;
};

export const AddableElement = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedElementId = useAppSelector(
    (state) => state.editorReducer?.selectedElementId
  );
  const elements = useAppSelector((state) => state.editorReducer?.elements);

  const handleOnClick = () => {
    const selectedElement = elements.find((e) => e.id === selectedElementId);
    let parentId = "";

    if (selectedElement && selectedElement.canContain)
      parentId = selectedElement.id;
    else if (selectedElement && !selectedElement.canContain)
      parentId = selectedElement.parentId;
    else if (!selectedElement) parentId = BODY_TAG_ID;

    dispatch(
      addElement({
        name: props.addableElement.name,
        styles: {},
        type: props.addableElement.type,
        id: uuidv4(),
        parentId,
        canContain: props.addableElement.canContain,
      })
    );
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"icon"}
          className="h-20! w-20! p-0! border border-border rounded-sm flex-col"
          onClick={handleOnClick}
        >
          <props.addableElement.icon className="icon" />
          <p className="opacity-75">{props.addableElement.name}</p>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{props.addableElement.tooltip}</TooltipContent>
    </Tooltip>
  );
};
