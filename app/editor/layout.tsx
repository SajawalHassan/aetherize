import EditorStoreProvider from "@/providers/editor-store-provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return <EditorStoreProvider>{props.children}</EditorStoreProvider>;
}
