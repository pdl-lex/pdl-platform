import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { BaseBlock } from "./BaseBlock"

export interface FaqItem extends BaseBlock {
  question: string
  answer?: SerializedEditorState | string | null
  blockType: "faqItem"
}

export interface FaqList extends BaseBlock {
  blockType: "faqList"
  items: FaqItem[]
}
