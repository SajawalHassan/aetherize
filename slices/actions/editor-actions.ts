import { EditorElement } from "@/slices/editor-slice";

export const addElementAction = (
  containerId: string,
  elementsArray: EditorElement[],
  newElement: EditorElement,
) => {
  const newElementsArray: EditorElement[] = elementsArray.map((element) => {
    if (element.id === containerId && Array.isArray(element.content)) {
      return {
        ...element,
        content: [...element.content, newElement],
      };
    } else if (Array.isArray(element.content)) {
      return {
        ...element,
        content: addElementAction(containerId, element.content, newElement),
      };
    } else {
      return element;
    }
  });

  return newElementsArray;
};

export const updateElementAction = (
  elementId: string,
  elementsArray: EditorElement[],
  elementData: EditorElement,
) => {
  const newEditorArray: any = elementsArray.map((element) => {
    if (element.id === elementId) {
      return elementData;
    } else if (element.content && Array.isArray(element.content)) {
      return {
        ...element,
        content: updateElementAction(elementId, element.content, elementData),
      };
    } else {
      return element;
    }
  });

  return newEditorArray;
};
