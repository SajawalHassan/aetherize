import EditorStoreProvider from "@/providers/editor-store-provider";
import { Editor } from "./_components/editor";

type Props = {};

const Page = (props: Props) => {
  return (
    <EditorStoreProvider>
      <Editor />
    </EditorStoreProvider>
  );
};

export default Page;
