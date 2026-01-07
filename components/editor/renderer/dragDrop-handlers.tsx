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

  const handleDragDrop = (e: DragEvent, idx: number) => {
    e.stopPropagation();
    e.preventDefault();

    if (!draggedElement) return;

    const relativeIdx = idx;
    const eleBefore = props.childElements[props.idx - 1];

    dispatch(
      addElement({
        eleBefore,
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

    setShow1(false);
    setShow2(false);
  };

  return (
    <div className="relative z-50 transition-all">
      <div
        className={cn(
          "h-5 w-full absolute top-0 left-0 z-50 font-bold text-xl text-center",
          show2 && "bg-black/10 static h-6"
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
        onDrop={(e) => handleDragDrop(e, props.relativeIdx)}
      ></div>

      {props.children}
    </div>
  );
};
