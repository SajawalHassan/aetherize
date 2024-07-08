"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/editor-store";
import { Editor, editorActions } from "@/slices/editor-slice";

type Props = {
  children: React.ReactNode;
  editor?: Editor;
};

export default function EditorStoreProvider(props: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  if (props.editor) {
    storeRef.current.dispatch(editorActions.initializeEditor(props.editor));
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
}
