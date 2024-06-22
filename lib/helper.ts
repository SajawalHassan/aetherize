import { EditorElementTypes, defaultStyles } from "@/lib/constants";
import { Editor, EditorElement, editorActions } from "@/slices/editor-slice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import React from "react";

export type DispatchType = ThunkDispatch<
  {
    editor: Editor;
  },
  undefined,
  UnknownAction
> &
  Dispatch<UnknownAction>;

export const dropElement = (
  e: React.DragEvent<HTMLDivElement>,
  currentElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  e.stopPropagation();

  const componentType = e.dataTransfer.getData(
    "componentType",
  ) as EditorElementTypes;

  const elementString = e.dataTransfer.getData("element");
  if (!componentType && !elementString)
    return console.error("No component type specified when adding element");

  if (elementString) {
    dispatch(
      editorActions.swapElementIndex({
        elementOne: currentElement,
        elementTwo: JSON.parse(elementString),
      }),
    );
    return;
  }

  caseAddElement(componentType, currentElement, elements, dispatch);
};

export const caseAddElement = (
  componentType: EditorElementTypes,
  containerElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  switch (componentType) {
    case "container":
      dispatch(
        editorActions.addElement({
          containerId: containerElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Container",
            containerId: containerElement.id,
            index: (containerElement.content as Array<EditorElement>).length,
            styles: defaultStyles,
            type: componentType,
            content: [],
          },
        }),
      );
      break;
    case "text":
      dispatch(
        editorActions.addElement({
          containerId: containerElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Text field",
            containerId: containerElement.id,
            index: (containerElement.content as Array<EditorElement>).length,
            styles: defaultStyles,
            type: componentType,
            content: { text: "Text field" },
          },
        }),
      );
      break;
    case "link":
      dispatch(
        editorActions.addElement({
          containerId: containerElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Link Field",
            containerId: containerElement.id,
            index: (containerElement.content as Array<EditorElement>).length,
            styles: {
              ...defaultStyles,
              color: "lightblue",
              textDecorationLine: "underline",
            },
            type: componentType,
            content: { href: "https://aetherize.vercel.app", text: "Link" },
          },
        }),
      );
      break;
    case "image":
      dispatch(
        editorActions.addElement({
          containerId: containerElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Image",
            containerId: containerElement.id,
            index: (containerElement.content as Array<EditorElement>).length,
            styles: defaultStyles,
            type: componentType,
            content: { imageSrc: "" },
          },
        }),
      );
      break;
    case "video":
      dispatch(
        editorActions.addElement({
          containerId: containerElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Video",
            containerId: containerElement.id,
            index: (containerElement.content as Array<EditorElement>).length,
            styles: defaultStyles,
            type: componentType,
            content: { videoSrc: "" },
          },
        }),
      );
      break;
    case "button":
      dispatch(
        editorActions.addElement({
          containerId: containerElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Button",
            containerId: containerElement.id,
            index: (containerElement.content as Array<EditorElement>).length,
            styles: defaultStyles,
            type: "button",
            content: { text: "Button" },
          },
        }),
      );
      break;
  }
};

export const handleDeleteElement = (
  e: React.MouseEvent<HTMLButtonElement>,
  elementId: string,
  elementsArray: EditorElement[],
  dispatch: DispatchType,
) => {
  e.stopPropagation();
  dispatch(
    editorActions.deleteElement({
      elementId,
      elementsArray,
    }),
  );
};

export const handleSelectElement = (
  e: React.MouseEvent<HTMLDivElement>,
  selectedElement: EditorElement | null,
  currentElement: EditorElement,
  dispatch: DispatchType,
) => {
  e.stopPropagation();
  if (selectedElement?.id === currentElement.id) {
    dispatch(editorActions.selectElement(null));
  } else {
    dispatch(editorActions.selectElement(currentElement));
  }
};

export const handleDragStart = (
  e: React.DragEvent,
  type: EditorElementTypes,
) => {
  if (type === null) return;

  e.dataTransfer.setData("componentType", type);
};

export const handleStyleChange = (
  e: any,
  element: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  if (!element) return;

  const property = e.target.id;
  const propertyValue = e.target.value;

  const propertyObject = {
    [property]: propertyValue,
  };

  dispatch(
    editorActions.updateElement({
      elementId: element.id,
      elementsArray: elements,
      elementData: {
        ...element,
        styles: {
          ...element.styles,
          ...propertyObject,
        },
      },
    }),
  );
};

export let compare = (a: EditorElement, b: EditorElement) => {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
};
