import { Button } from "@/components/ui/button";
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
  const selectedElement = useAppSelector(
    (state) => state.editorReducer?.selectedElement
  );

  const handleOnClick = () => {
    dispatch(
      addElement({
        name: props.addableElement.name,
        styles: {},
        type: props.addableElement.type,
        id: uuidv4(),
        parentId: selectedElement ? selectedElement.id : BODY_TAG_ID,
      })
    );
  };

  return (
    <Button
      variant={"icon"}
      className="h-20! w-20! p-0! border border-border rounded-sm flex-col"
      onClick={handleOnClick}
    >
      <props.addableElement.icon className="icon" />
      <p className="opacity-75">{props.addableElement.name}</p>
    </Button>
  );
};
