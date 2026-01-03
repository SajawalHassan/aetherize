import { addElement, ElementData } from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { cn } from "@/lib/utils";
import { DragEvent, useState } from "react";

type Props = {
  relativeIdx: number;
  idx: number;
  children?: React.ReactNode;
  parentId: string;
  childElements: ElementData[];
};

export const DragDropHandlers = (props: Props) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const dispatch = useAppDispatch();
  const draggedElement = useAppSelector((s) => s.editorReducer.draggedElement);

  const handleDragDrop = (
    e: DragEvent,
    idx: number,
    place: "top" | "bottom"
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!draggedElement) return;

    const relativeIdx = idx;
    const eleBefore = props.childElements[props.idx - 1];
    const eleAfter = props.childElements[props.idx + 1];

    dispatch(
      addElement({
        place,
        eleBefore,
        eleAfter,
        element: {
          id: draggedElement.id,
          name: draggedElement.name,
          canContain: draggedElement.canContain,
          parentId: props.parentId,
          styles: {},
          type: draggedElement.type,
          relativeIdx,
        },
      })
    );
  };

  return (
    <div className="relative z-50">
      {props.relativeIdx === 0 ? (
        <div
          className={cn(
            "h-3 w-full absolute top-0 left-0 bg-red-500 z-50 font-bold text-xl text-center",
            show1 && "bg-green-500"
          )}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onDragEnter={(e) => {
            e.stopPropagation();
            setShow1(true);
          }}
          onDragLeave={(e) => {
            e.stopPropagation();
            setShow1(false);
          }}
          onDrop={(e) => handleDragDrop(e, props.relativeIdx, "top")}
        ></div>
      ) : (
        <div
          className={cn(
            "h-3 w-full absolute top-0 left-0 bg-red-500 z-50 font-bold text-xl text-center",
            show2 && "bg-green-500"
          )}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onDragEnter={(e) => {
            e.stopPropagation();
            setShow2(true);
          }}
          onDragLeave={(e) => {
            e.stopPropagation();
            setShow2(false);
          }}
          onDrop={(e) => handleDragDrop(e, props.relativeIdx, "top")}
        ></div>
      )}

      {props.children}
    </div>
  );
};
