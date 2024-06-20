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

export const deleteElementAction = (
  elementsArray: EditorElement[],
  elementId: string,
): EditorElement[] => {
  const newElementsArray = elementsArray
    .filter((item) => {
      return item.id !== elementId;
    })
    .map((item) => ({
      ...item,
      content: Array.isArray(item.content)
        ? deleteElementAction(item.content, elementId)
        : item.content,
    }));

  return newElementsArray;
};

export const findElementAction = (
  elementsArray: EditorElement[],
  elementId: string,
): EditorElement | null => {
  let foundElement: EditorElement | null = null;

  elementsArray.map((element) => {
    if (element.id === elementId) {
      foundElement = element;
      return element;
    } else if (Array.isArray(element.content)) {
      return {
        ...element,
        content: findElementAction(element.content, elementId),
      };
    } else {
      return element;
    }
  });

  return foundElement;
};
