import React from "react";

// constants
export const editorContainerId = "__body";

export const defaultStyles: React.CSSProperties = {
  color: "#fff",
  minHeight: "50px",
  minWidth: "50px",
  display: "block",
  fontSize: "16px",
  fontFamily: "Roboto",
  marginTop: "0px",
  marginLeft: "0px",
  marginBottom: "0px",
  marginRight: "0px",
  paddingTop: "10px",
  paddingLeft: "10px",
  paddingBottom: "10px",
  paddingRight: "10px",
};

export const defaultBodyStyles: React.CSSProperties = {
  ...defaultStyles,
};

export const fonts = [
  "Roboto",
  "Kanit",
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

export const displayPropTypes = ["block", "flex", "grid"];
export const flexWrapTypes = ["wrap", "nowrap", "wrap-reverse"];
export const flexDirectionTypes = [
  "row",
  "column",
  "row-reverse",
  "column-reverse",
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
