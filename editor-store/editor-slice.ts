import { BODY_TAG_ID, ELEMENT_IDX_MULTIPLIER } from "@/lib/constants";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export type ElementType = "text" | "image" | "container" | "link" | "body";

export interface ElementData {
  id: string;
  name: string;
  styles: React.CSSProperties;
  type: ElementType;
  parentId: string;
  canContain: boolean;
  relativeIdx: number; // Index inside parent
}

export interface EditorState {
  elements: ElementData[];
  selectedElementId: string;
  draggedElement?: ElementData;
  prevState?: EditorState;
  nextState?: EditorState;
}

const initialState: EditorState = {
  elements: [
    {
      id: BODY_TAG_ID,
      name: "Body",
      styles: {},
      type: "body",
      parentId: "",
      canContain: true,
      relativeIdx: 0,
    },
  ],
  selectedElementId: BODY_TAG_ID,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addElement: (
      state,
      action: PayloadAction<{
        element: ElementData;
        place?: "top" | "bottom";
        eleBefore?: ElementData;
      }>
    ) => {
      const parentElements = current(state.elements).filter(
        (e) => e.parentId === action.payload.element.parentId
      );

      const eleBefore = action.payload.eleBefore;

      // Get element index in between the other elements
      const idxInBetween =
        ((eleBefore ? eleBefore.relativeIdx : 0) +
          action.payload.element.relativeIdx) /
        2;

      const parentLength = parentElements.length * ELEMENT_IDX_MULTIPLIER;

      const idx =
        action.payload.element.relativeIdx === -1
          ? parentLength + ELEMENT_IDX_MULTIPLIER // Add ELEMENT_IDX_MULTIPLIER to start index from element index multiplier no. instead of 0
          : idxInBetween;

      return {
        ...state,
        elements: [
          ...state.elements,
          {
            ...action.payload.element,
            relativeIdx: idx,
          },
        ],
        prevState: state,
      };
    },
    changeSelectedElementId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedElementId: action.payload,
        prevState: state,
      };
    },
    changeDraggedElement: (state, action: PayloadAction<ElementData>) => {
      return {
        ...state,
        draggedElement: action.payload,
      };
    },
    editElementData: (state, action: PayloadAction<ElementData>) => {
      state.elements = state.elements.map((e) => {
        if (e.id === action.payload.id) return action.payload;
        return e;
      });
    },
    undoState: (state) => {
      if (!state.prevState) return state;

      return {
        ...state.prevState,
        nextState: state,
      };
    },
    redoState: (state) => {
      if (!state.nextState) return state;

      return {
        ...state.nextState,
        prevState: state,
      };
    },
  },
});

export const {
  addElement,
  changeSelectedElementId,
  changeDraggedElement,
  editElementData,
  redoState,
  undoState,
} = editorSlice.actions;
export default editorSlice.reducer;
