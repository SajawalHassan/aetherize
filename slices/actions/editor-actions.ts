import { EditorElement } from "@/slices/editor-slice";

export const addElementAction = (
  containerId: string,
  elementsArray: EditorElement[],
  newElement: EditorElement,
) => {
  const newElementsArray: EditorElement[] = elementsArray.map((element) => {
    if (element.id === containerId && Array.isArray(element.content)) {
      console.log({
        ...element,
        content: [...element.content, newElement],
      });
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
