import { EditorElement } from "@/slices/editor-slice";

export const addElementAction = (
  containerId: string,
  elementsArray: EditorElement[],
  newElement: EditorElement,
) => {
  const newElementsArray: EditorElement[] = elementsArray.map((element) => {
    if (element.id === containerId) {
      return {
        ...element,
        children: [...element.children, newElement],
      };
    } else {
      return {
        ...element,
        children: addElementAction(containerId, element.children, newElement),
      };
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
    } else if (element.children) {
      return {
        ...element,
        children: updateElementAction(elementId, element.children, elementData),
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
  let elementFound = false;
  const newElementsArray = elementsArray
    .filter((item) => {
      if (item.id === elementId) {
        elementFound = true;
        return false;
      }
      return true;
    })
    .map((item) => {
      if (!elementFound) {
        return {
          ...item,
          children: deleteElementAction(item.children, elementId),
        };
      } else {
        return item;
      }
    });

  return newElementsArray;
};
