import { EditorElementTypes } from "@/lib/constants";

export const handleDragStart = (
  e: React.DragEvent,
  type: EditorElementTypes,
) => {
  if (type === null) return;
  e.dataTransfer.setData("componentType", type);
};
