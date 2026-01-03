import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editor-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      editorReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
