import React from "react";

// constants
export const defaultStyles: React.CSSProperties = {};

export const editorContainerId = "__body";
export const fonts = [
  "Roboto",
  "Kanit",
  "sans-serif",
  "Oswald",
  "Roboto Condensed",
  "Inter",
  "Lato",
  "Poppins",
  "Open Sans",
];
export const fontWeights = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

export const textUnits = [
  "px",
  "rem",
  "em",
  "%",
  "cm",
  "mm",
  "in",
  "ex",
  "ch",
  "vw",
  "vh",
  "max-content",
  "min-content",
  "fit-content",
];

// types
export type deviceTypes = "mobile" | "tablet" | "laptop";
export type viewingModes = "development" | "preview" | "live";
export type tabBtns = "Customization" | "Components" | "Media";
export type fontWeightTypes =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type fontTypes =
  | "Roboto"
  | "Kanit"
  | "sans-serif"
  | "Oswald"
  | "Roboto Condensed"
  | "Inter"
  | "Lato"
  | "Poppins"
  | "Open Sans";

export type EditorElementTypes =
  | "container"
  | typeof editorContainerId
  | "text"
  | "link"
  | "video"
  | "mCol"
  | "contactForm"
  | "image"
  | null;
