import { EditorElement } from "../slices/editor-slice";

export type AddElementAction = {
  editorArray: EditorElement[];
  containerId: string;
  newElement: EditorElement;
};

export const addElementAction = (action: AddElementAction) => {
  const newEditorArray: any = action.editorArray.map((element) => {
    if (
      element.id === action.containerId && // Element is the element where our new element should be added
      Array.isArray(element.content) // The element is recursive
    ) {
      return {
        ...element,
        content: [...element.content, action.newElement],
      };
    } else if (element.content && Array.isArray(element.content)) {
      // If the element is not the place where the new element should be added, then
      // recursively call the 'addElement' function with that element's content as
      // the array to loop over and find the correct place for the element's additions
      return {
        ...element,
        content: addElementAction({
          editorArray: element.content,
          containerId: action.containerId,
          newElement: action.newElement,
        }),
      };
    } else {
      return element;
    }
  });

  return newEditorArray;
};

export type UpdateElementAction = {
  editorArray: EditorElement[];
  elementId: string;
  elementData: EditorElement;
};

export const updateElementAction = (action: UpdateElementAction) => {
  const newEditorArray: any = action.editorArray.map((element) => {
    if (element.id === action.elementId) {
      return action.elementData;
    } else if (element.content && Array.isArray(element.content)) {
      return {
        ...element,
        content: updateElementAction({
          editorArray: element.content,
          elementData: action.elementData,
          elementId: action.elementId,
        }),
      };
    } else {
      return element;
    }
  });

  return newEditorArray;
};

export type FindElementAction = {
  editorArray: EditorElement[];
  elementId: string;
};

export const findElementAction: any = (action: FindElementAction) => {
  let foundElement: EditorElement | null = null;

  for (const element of action.editorArray) {
    if (element.id === action.elementId) {
      foundElement = element;
      break; // Stop iterating if found
    } else if (element.content && Array.isArray(element.content)) {
      foundElement = findElementAction({
        editorArray: element.content,
        elementId: action.elementId,
      });
      if (foundElement) {
        // Check if found in nested element
        break;
      }
    }
  }

  return foundElement;
};
