import { EDITOR_ELEMENT_TYPE } from "@/lib/constants";

interface EditorElement {
  id: string;
  name: string;
  type: EDITOR_ELEMENT_TYPE;
  content: EditorElement[] | {};
}
