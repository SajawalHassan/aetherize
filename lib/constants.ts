// constants
export const editorContainerId = "__body";

// types
export type EditorElementTypes =
  | "container"
  | typeof editorContainerId
  | "text"
  | "link"
  | "video"
  | "mCol"
  | "contactForm"
  | null;

export const defaultStyles: React.CSSProperties = {};
