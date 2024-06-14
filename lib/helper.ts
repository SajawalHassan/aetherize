import { EditorElementTypes, defaultStyles } from "@/lib/constants";
import { Editor, EditorElement, editorActions } from "@/slices/editor-slice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import React from "react";

type DispatchType = ThunkDispatch<
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
  if (!componentType) return console.error("No component type specified");

  switch (componentType) {
    case "container":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Container",
            containerStyles: defaultStyles,
            elementStyles: {},
            type: componentType,
            content: [],
          },
        }),
      );
      break;
    case "flexBox":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Flex box",
            containerStyles: defaultStyles,
            elementStyles: {},
            type: componentType,
            content: [],
          },
        }),
      );
      break;
    case "text":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Text field",
            containerStyles: defaultStyles,
            elementStyles: {},
            type: componentType,
            content: { text: "Text field" },
          },
        }),
      );
      break;
    case "link":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Link Field",
            elementStyles: {},
            containerStyles: {
              ...defaultStyles,
              color: "lightblue",
              textDecorationLine: "underline",
            },
            type: componentType,
            content: { href: "https://aetherize.vercel.app" },
          },
        }),
      );
      break;
    case "image":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Image",
            containerStyles: defaultStyles,
            elementStyles: {},
            type: componentType,
            content: { imageSrc: "" },
          },
        }),
      );
      break;
    case "video":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Video",
            containerStyles: defaultStyles,
            elementStyles: {},
            type: componentType,
            content: { videoSrc: "" },
          },
        }),
      );
      break;
    case "button":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Button",
            containerStyles: {
              ...defaultStyles,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "gray",
              width: "max-content",
            },
            elementStyles: {},
            type: "flexBox",
            content: [
              {
                id: v4(),
                name: "Text field",
                containerStyles: defaultStyles,
                elementStyles: {},
                type: "text",
                content: { text: "Text field" },
              },
            ],
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
  deleteOriginal?: boolean,
  originalElement?: EditorElement,
) => {
  if (type === null) return;

  e.dataTransfer.setData("componentType", type);
  e.dataTransfer.setData("deleteOriginal", deleteOriginal ? "true" : "false");
  e.dataTransfer.setData("originalElement", JSON.stringify(originalElement));
};

export const handleStyleChange = (
  e: any,
  selectedElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  if (!selectedElement) return;

  const property = e.target.id;
  const propertyValue = e.target.value;

  const propertyObject = {
    [property]: propertyValue,
  };

  dispatch(
    editorActions.updateElement({
      elementId: selectedElement.id,
      elementsArray: elements,
      elementData: {
        ...selectedElement,
        containerStyles: {
          ...selectedElement.containerStyles,
          ...propertyObject,
        },
      },
    }),
  );
};
