import EditorStoreProvider from "@/providers/editor-store-provider";
import { Editor } from "@/components/editor";

type Props = {};

const Page = async (props: Props) => {
  return (
    <EditorStoreProvider>
      <Editor />
    </EditorStoreProvider>
  );
};

export default Page;
