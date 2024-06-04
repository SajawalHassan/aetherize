import { EditorElement } from "../slices/editor-slice";

export type AddElementAction = {
  editorArray: EditorElement[];
  containerId: string;
  newElement: EditorElement;
};
