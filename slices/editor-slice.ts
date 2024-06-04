import { EDITOR_ELEMENT_TYPE } from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { AddElementAction } from "../lib/action-types";

export interface EditorElement {
  id: string;
  name: string;
  styles: React.CSSProperties;
  type: EDITOR_ELEMENT_TYPE;
  content: EditorElement[] | { innerText: string };
}

export interface Editor {
  elements: EditorElement[];
  selectedElement: EditorElement | null;
}

const initialEditor: Editor = {
  elements: [
    {
      id: "__body",
      name: "Body",
      styles: {},
      type: "container",
      content: [],
    },
  ],
  selectedElement: null,
};

const initialEditorElement: EditorElement = {
  id: "",
  name: "",
  styles: {},
  type: "container",
  content: [],
};

export const editorElementSlice = createSlice({
  name: "editorElement",
  initialState: initialEditorElement,
  reducers: {
    changeEditorElement: (
      state: EditorElement,
      action: PayloadAction<EditorElement>,
    ) => {
      state = action.payload;
    },
  },
});

export const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditor,
  reducers: {
    addElement: (state: Editor, action: PayloadAction<AddElementAction>) => {
      // Loop through all items in array
      const updatedEditorArray: any = action.payload.editorArray.map(
        (element) => {
          if (
            element.id === action.payload.containerId && // Element is the element where our new element should be added
            Array.isArray(element.content) // The element is recursive
          ) {
            console.log(action.payload.newElement);
            console.log({
              ...element,
              content: [...element.content, action.payload.newElement],
            });
            return {
              ...element,
              content: [...element.content, action.payload.newElement],
            };
          } else if (element.content && Array.isArray(element.content)) {
            // If the element is not the place where the new element should be added, then
            // recursively call the 'addElement' function with that element's content as
            // the array to loop over and find the correct place for the element's additions
            return {
              ...element,
              content: editorSlice.actions.addElement({
                editorArray: element.content,
                containerId: action.payload.containerId,
                newElement: action.payload.newElement,
              }),
            };
          }
        },
      );

      return {
        ...state,
        elements: updatedEditorArray,
      };
    },
  },
});

export const { changeEditorElement } = editorElementSlice.actions;
export const { addElement } = editorSlice.actions;
export default editorSlice.reducer;
