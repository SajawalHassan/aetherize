import { defaultBodyStyles, editorContainerId } from "@/lib/constants";
import {
  EditorElementContent,
  EditorElementTypes,
  VariableTypes,
  deviceTypes,
  viewingModes,
} from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addElementAction,
  deleteElementAction,
  pasteElementAction,
  updateElementAction,
} from "./actions/editor-actions";
import React from "react";

export interface EditorElement {
  id: string;
  type: EditorElementTypes;
  styles: React.CSSProperties;
  name: string;
  index: number;
  containerId: string;
  content: EditorElementContent;
  children: EditorElement[];
}

export type Trigger = {
  id: string;
  elementId: string;
  cssProp: string;
  cssPropValue: string;
  name: string;
  value: boolean;
  triggerValue: boolean;
};

export type Variable = {
  id: string;
  elementId: string;
  name: string;
  type: VariableTypes;
  cssProp: string;
  value: string;
};

export interface Editor {
  elements: EditorElement[];
  selectedElement: EditorElement | null;
  prevEditorState: Editor | null;
  nextEditorState: Editor | null;
  device: deviceTypes;
  viewingMode: viewingModes;
  triggers: Trigger[];
  variables: Variable[];
  copiedElement: EditorElement | null;
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
      content: {},
      children: [],
    },
  ],
  selectedElement: null,
  nextEditorState: null,
  prevEditorState: null,
  device: "laptop",
  viewingMode: "development",
  triggers: [],
  variables: [],
  copiedElement: null,
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
  switchWithElement: EditorElement;
  hoveredElement: EditorElement;
}

interface pasteElementPayload {
  containerId: string;
  elementsArray: EditorElement[];
  copiedElement: EditorElement;
}

const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditor,
  reducers: {
    initializeEditor: (state: Editor, action: PayloadAction<Editor>) => {
      return action.payload;
    },
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
        prevEditorState: state === state.prevEditorState ? null : state,
      };
    },
    selectElement: (
      state: Editor,
      action: PayloadAction<EditorElement | null>,
    ) => {
      return {
        ...state,
        selectedElement: action.payload,
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
      };
    },
    copyElement: (state: Editor, action: PayloadAction<EditorElement>) => {
      return {
        ...state,
        copiedElement: action.payload,
      };
    },
    pasteElement: (
      state: Editor,
      action: PayloadAction<pasteElementPayload>,
    ) => {
      let newElementsArray: EditorElement[] = addElementAction(
        action.payload.containerId,
        action.payload.elementsArray,
        action.payload.copiedElement,
      );
      newElementsArray = pasteElementAction(
        newElementsArray,
        action.payload.copiedElement,
      );

      return {
        ...state,
        elements: newElementsArray,
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
      };
    },
    swapElementIndex: (
      state: Editor,
      action: PayloadAction<swapElementIndexPayload>,
    ) => {
      // Update element one's index with element two's index
      let newElementsArray = updateElementAction(
        action.payload.switchWithElement.id,
        state.elements,
        {
          ...action.payload.switchWithElement,
          index: action.payload.hoveredElement.index,
        },
      );

      // Update element two's index with element one's index
      newElementsArray = updateElementAction(
        action.payload.hoveredElement.id,
        newElementsArray,
        {
          ...action.payload.hoveredElement,
          index: action.payload.switchWithElement.index,
        },
      );

      // Update selectedElement, if needed
      if (state.selectedElement) {
        if (action.payload.switchWithElement.id === state.selectedElement.id) {
          return {
            ...state,
            elements: newElementsArray,
            selectedElement: {
              ...state.selectedElement,
              index: action.payload.hoveredElement.index,
            },
            prevEditorState: state === state.prevEditorState ? null : state,
            nextEditorState: null,
          };
        }

        if (action.payload.hoveredElement.id === state.selectedElement.id) {
          return {
            ...state,
            elements: newElementsArray,
            selectedElement: {
              ...state.selectedElement,
              index: action.payload.switchWithElement.index,
            },
            prevEditorState: state === state.prevEditorState ? null : state,
            nextEditorState: null,
          };
        }
      }

      return {
        ...state,
        elements: newElementsArray,
        selectedElement: null,
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
      };
    },
    updateTriggers: (state: Editor, action: PayloadAction<Trigger>) => {
      let triggerFound = false;
      let newTriggerList: Trigger[] = [];

      newTriggerList = state.triggers.map((trigger) => {
        if (trigger.id === action.payload.id) {
          triggerFound = true;
          return action.payload;
        }
        return trigger;
      });
      if (!triggerFound) {
        newTriggerList = [...newTriggerList, { ...action.payload }];
      }

      return {
        ...state,
        triggers: newTriggerList,
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
      };
    },
    deleteTrigger: (state: Editor, action: PayloadAction<string>) => {
      let newTriggerList = state.triggers.filter(
        (trigger) => trigger.id !== action.payload,
      );

      return {
        ...state,
        triggers: newTriggerList,
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
      };
    },
    updateVariables: (state: Editor, action: PayloadAction<Variable>) => {
      let variableFound = false;
      let newVariableList: Variable[] = [];

      newVariableList = state.variables.map((variable) => {
        if (variable.id === action.payload.id) {
          variableFound = true;
          return action.payload;
        }
        return variable;
      });
      if (!variableFound) {
        newVariableList = [...newVariableList, { ...action.payload }];
      }

      return {
        ...state,
        variables: newVariableList,
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
      };
    },
    addElement: (state: Editor, action: PayloadAction<addElementPayload>) => {
      const newElementsArray = addElementAction(
        action.payload.containerId,
        action.payload.elementsArray,
        action.payload.newElement,
      );

      if (action.payload.containerId === state.selectedElement?.id) {
        return {
          ...state,
          prevEditorState: state === state.prevEditorState ? null : state,
          nextEditorState: null,
          elements: newElementsArray,
          selectedElement: {
            ...state.selectedElement,
            children: [
              ...state.selectedElement.children,
              action.payload.newElement,
            ],
          },
        };
      }

      return {
        ...state,
        prevEditorState: state === state.prevEditorState ? null : state,
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
          prevEditorState: state === state.prevEditorState ? null : state,
          nextEditorState: null,
          elements: newElementsArray,
          selectedElement: action.payload.elementData,
        };
      }

      return {
        ...state,
        prevEditorState: state === state.prevEditorState ? null : state,
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
        prevEditorState: state === state.prevEditorState ? null : state,
        nextEditorState: null,
        elements: updatedElementsArray,
        selectedElement: null,
      };
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
