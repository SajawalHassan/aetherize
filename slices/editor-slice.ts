import {
  EditorElementTypes,
  defaultStyles,
  deviceTypes,
  editorContainerId,
  viewingModes,
} from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addElementAction,
  updateElementAction,
} from "./actions/editor-actions";

// Editor Element
export interface EditorElement {
  id: string;
  type: EditorElementTypes;
  styles: React.CSSProperties;
  name: string;
  content:
    | EditorElement[]
    | { text?: string; href?: string; videoSrc?: string };
}

// Editor
interface Editor {
  elements: EditorElement[];
  selectedElements: EditorElement[];
  prevEditorState: Editor | null;
  nextEditorState: Editor | null;
  device: deviceTypes;
  viewingMode: viewingModes;
}

const initialEditor: Editor = {
  elements: [
    {
      id: editorContainerId,
      name: "body",
      styles: defaultStyles,
      type: editorContainerId,
      content: [],
    },
  ],
  selectedElements: [],
  nextEditorState: null,
  prevEditorState: null,
  device: "laptop",
  viewingMode: "development",
};

interface addElementPayload {
  containerId: string;
  elementsArray: EditorElement[];
  newElement: EditorElement;
}

interface updateElementPayload {
  elementId: string;
  elementsArray: EditorElement[];
  elementData: EditorElement;
}

const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditor,
  reducers: {
    changeViewingMode: (state: Editor, action: PayloadAction<viewingModes>) => {
      return {
        ...state,
        viewingMode: action.payload,
      };
    },
    changeDevice: (state: Editor, action: PayloadAction<deviceTypes>) => {
      return {
        ...state,
        device: action.payload,
      };
    },
    undoEditorState: (state: Editor, action: PayloadAction<Editor>) => {
      return {
        ...action.payload,
        nextEditorState: state,
      };
    },
    redoEditorState: (state: Editor, action: PayloadAction<Editor>) => {
      return {
        ...action.payload,
        prevEditorState: state,
      };
    },
    addElement: (state: Editor, action: PayloadAction<addElementPayload>) => {
      const newElementsArray = addElementAction(
        action.payload.containerId,
        action.payload.elementsArray,
        action.payload.newElement,
      );

      return {
        ...state,
        prevEditorState: state,
        elements: newElementsArray,
      };
    },
    updateElement: (
      state: Editor,
      action: PayloadAction<updateElementPayload>,
    ) => {
      const newElementsArray = updateElementAction(
        action.payload.elementId,
        action.payload.elementsArray,
        action.payload.elementData,
      );

      return {
        ...state,
        prevEditorState: state,
        elements: newElementsArray,
      };
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
