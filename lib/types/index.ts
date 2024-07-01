import { editorContainerId } from "../constants";

export type deviceTypes = "mobile" | "tablet" | "laptop";
export type viewingModes = "development" | "preview" | "live";
export type tabBtns = "Customization" | "Components";
export type functionsSidebarTabBtns = "Variables" | "Layers";
export type EditorElementTypes =
  | "container"
  | typeof editorContainerId
  | "text"
  | "link"
  | "video"
  | "contactForm"
  | "image"
  | "button"
  | null;

export type EditorElementContent = {
  text?: string;
  href?: string;
  videoSrc?: string;
  imageSrc?: string;
  onClick?: {
    methodName: "changeVar";
    methodValue: string;
  };
};
