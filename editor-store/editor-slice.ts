import { BODY_TAG_ID, ELEMENT_IDX_MULTIPLIER } from "@/lib/constants";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ElementType = "text" | "image" | "container" | "link" | "body";

export interface ElementData {
  id: string;
  name: string;
  styles: any;
  type: ElementType;
  parentId: string;
  canContain: boolean;
  relativeIdx: number; // Index inside parent
}

export interface CounterState {
  elements: ElementData[];
  selectedElementId: string;
  draggedElement?: ElementData;
}

const initialState: CounterState = {
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
        eleAfter?: ElementData;
      }>
    ) => {
      const parentElements = current(state.elements).filter(
        (e) => e.parentId === action.payload.element.parentId
      );

      const eleBefore = action.payload.eleBefore;
      const eleAfter = action.payload.eleAfter;

      // Get element index in between the other elements
      const idxInBetween =
        action.payload.place === "top"
          ? ((eleBefore ? eleBefore.relativeIdx : 0) +
              action.payload.element.relativeIdx) /
            2
          : ((eleAfter ? eleAfter.relativeIdx : 0) +
              action.payload.element.relativeIdx) /
            2;

      const parentLength = parentElements.length * ELEMENT_IDX_MULTIPLIER;

      const idx =
        action.payload.element.relativeIdx === -1 ? parentLength : idxInBetween;

      state.elements = [
        ...state.elements,
        {
          ...action.payload.element,
          relativeIdx: idx,
        },
      ];
    },
    changeSelectedElementId: (state, action: PayloadAction<string>) => {
      state.selectedElementId = action.payload;
    },
    changeDraggedElement: (state, action: PayloadAction<ElementData>) => {
      state.draggedElement = action.payload;
    },
    editElementData: (state, action: PayloadAction<ElementData>) => {
      state.elements = state.elements.map((e) => {
        if (e.id === action.payload.id) return action.payload;
        return e;
      });
    },
  },
});

export const {
  addElement,
  changeSelectedElementId,
  changeDraggedElement,
  editElementData,
} = editorSlice.actions;
export default editorSlice.reducer;
