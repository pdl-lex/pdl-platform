import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { BaseBlock } from "./BaseBlock"

export interface RichTextBlock extends BaseBlock {
  content?: SerializedEditorState | string | null
  blockType: "richText"
}
