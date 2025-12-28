import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { Elementmanager } from "../element-manager";
import { BODY_TAG_ID } from "@/lib/constants";
import { changeSelectedElementId } from "@/editor-store/editor-slice";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {};

export const BodyElement = () => {
  const elements = useAppSelector((state) => state.editorReducer.elements);

  const selectedElementId = useAppSelector(
    (state) => state.editorReducer.selectedElementId
  );

  const dispatch = useAppDispatch();

  const element = elements.find((e) => e.id === BODY_TAG_ID);
  if (!element) return null;

  const isSelected = selectedElementId === element.id;

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(changeSelectedElementId(element.id));
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "border-4 border-transparent min-h-[calc(100vh-88px)] relative",
        isSelected && "border-green-500"
      )}
    >
      {isSelected && <Badge text={element.name} className="bg-green-500" />}

      {elements
        .filter((e) => e.parentId === BODY_TAG_ID)
        .map((e) => (
          <Elementmanager element={e} key={e.id} />
        ))}
    </div>
  );
};
