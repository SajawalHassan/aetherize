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

export const findElementAction: any = (
  elementsArray: EditorElement[],
  elementId: string,
) => {
  let foundElement: EditorElement | null = null;

  for (const element of elementsArray) {
    if (element.id === elementId) {
      foundElement = element;
      break; // Stop iterating if found
    } else if (element.content && Array.isArray(element.content)) {
      foundElement = findElementAction({
        editorArray: element.content,
        elementId: elementId,
      });
      if (foundElement) {
        // Check if found in nested element
        break;
      }
    }
  }

  return foundElement;
};

export const filterElementAction: any = (
  elementId: string,
  elementsArray: EditorElement[],
) => {
  const updatedElementsArray: EditorElement[] = [];

  elementsArray.map((element) => {
    if (element.id === elementId) {
      return element;
    } else if (element.content && Array.isArray(element.content)) {
      return {
        ...element,
        content: filterElementAction(elementId, element.content),
      };
    } else {
      return updatedElementsArray.push(element);
    }
  });

  console.log("updatedElementsArray", updatedElementsArray);

  return updatedElementsArray;
};
