import {
  EditorElementTypes,
  defaultBodyStyles,
  deviceTypes,
  editorContainerId,
  viewingModes,
} from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addElementAction,
  deleteElementAction,
  findElementAction,
  updateElementAction,
} from "./actions/editor-actions";
import React from "react";

// Editor Element
export interface EditorElement {
  id: string;
  type: EditorElementTypes;
  styles: React.CSSProperties;
  name: string;
  index: number;
  containerId: string;
  content:
    | EditorElement[]
    | { text?: string; href?: string; videoSrc?: string; imageSrc?: string };
}

export type Variable = {
  id: string;
  elementId: string;
  cssProp: string;
  cssPropValue: string;
  variableName: string;
  variableValue: boolean;
  variableTrigger: boolean;
};

// Editor
export interface Editor {
  elements: EditorElement[];
  selectedElement: EditorElement | null;
  prevEditorState: Editor | null;
  nextEditorState: Editor | null;
  device: deviceTypes;
  viewingMode: viewingModes;
  variables: Variable[];
}

const initialEditor: Editor = {
  elements: [
    {
      id: editorContainerId,
      name: "body",
      styles: defaultBodyStyles,
      type: editorContainerId,
      containerId: "",
      index: 0,
      content: [],
    },
  ],
  selectedElement: null,
  nextEditorState: null,
  prevEditorState: null,
  device: "laptop",
  viewingMode: "development",
  variables: [],
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

interface deleteElementPayload {
  elementId: string;
  elementsArray: EditorElement[];
}

interface swapElementIndexPayload {
  elementOne: EditorElement;
  elementTwo: EditorElement;
}

const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditor,
  reducers: {
    changeViewingMode: (state: Editor, action: PayloadAction<viewingModes>) => {
      return {
        ...state,
        viewingMode: action.payload,
        nextEditorState: null,
      };
    },
    changeDevice: (state: Editor, action: PayloadAction<deviceTypes>) => {
      return {
        ...state,
        device: action.payload,
        nextEditorState: null,
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
    selectElement: (
      state: Editor,
      action: PayloadAction<EditorElement | null>,
    ) => {
      return {
        ...state,
        selectedElement: action.payload,
        prevEditorState: state,
        nextEditorState: null,
      };
    },
    swapElementIndex: (
      state: Editor,
      action: PayloadAction<swapElementIndexPayload>,
    ) => {
      if (
        action.payload.elementOne.containerId !==
        action.payload.elementTwo.containerId
      )
        return;

      let newElementsArray = updateElementAction(
        action.payload.elementOne.id,
        state.elements,
        {
          ...action.payload.elementOne,
          index: action.payload.elementTwo.index,
        },
      );

      newElementsArray = updateElementAction(
        action.payload.elementTwo.id,
        newElementsArray,
        {
          ...action.payload.elementTwo,
          index: action.payload.elementOne.index,
        },
      );

      return {
        ...state,
        elements: newElementsArray,
        selectedElement: null,
        prevEditorState: state,
        nextEditorState: null,
      };
    },
    changeVariablesList: (state: Editor, action: PayloadAction<Variable>) => {
      let newVariablesList = state.variables.filter(
        (variable) => variable.id !== action.payload.id,
      );
      newVariablesList = [...newVariablesList, { ...action.payload }];

      return {
        ...state,
        variables: newVariablesList,
        prevEditorState: state,
        nextEditorState: null,
      };
    },
    addElement: (state: Editor, action: PayloadAction<addElementPayload>) => {
      const newElementsArray = addElementAction(
        action.payload.containerId,
        action.payload.elementsArray,
        action.payload.newElement,
      );

      if (
        action.payload.containerId === state.selectedElement?.id &&
        Array.isArray(state.selectedElement.content)
      ) {
        return {
          ...state,
          prevEditorState: state,
          nextEditorState: null,
          elements: newElementsArray,
          selectedElement: {
            ...state.selectedElement,
            content: [
              ...state.selectedElement.content,
              action.payload.newElement,
            ],
          },
        };
      }

      return {
        ...state,
        prevEditorState: state,
        nextEditorState: null,
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

      if (action.payload.elementId === state.selectedElement?.id) {
        return {
          ...state,
          prevEditorState: state,
          nextEditorState: null,
          elements: newElementsArray,
          selectedElement: action.payload.elementData,
        };
      }

      return {
        ...state,
        prevEditorState: state,
        nextEditorState: null,
        elements: newElementsArray,
      };
    },
    deleteElement: (
      state: Editor,
      action: PayloadAction<deleteElementPayload>,
    ) => {
      const updatedElementsArray = deleteElementAction(
        action.payload.elementsArray,
        action.payload.elementId,
      );

      return {
        ...state,
        prevEditorState: state,
        nextEditorState: null,
        elements: updatedElementsArray,
        selectedElement: null,
      };
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
