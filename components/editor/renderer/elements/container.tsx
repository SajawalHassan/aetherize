import {
  changeSelectedElement,
  ElementData,
} from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { cn } from "@/lib/utils";

type Props = {
  element: ElementData;
};

export const Container = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedElement = useAppSelector(
    (state) => state.editorReducer.selectedElement
  );

  const handleOnClick = (_) => {
    dispatch(changeSelectedElement(props.element));
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(selectedElement?.id === props.element.id && "bg-red-500")}
    >
      Container
    </div>
  );
};
