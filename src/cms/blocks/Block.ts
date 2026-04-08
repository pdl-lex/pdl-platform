import { BaseBlock } from "./BaseBlock"
import { FaqList } from "./FaqList"
import { ImageBlock } from "./ImageBlock"
import { RichTextBlock } from "./RichTextBlock"

export interface TwoColumnBlock extends BaseBlock {
  blockType: "twoColumns"
  leftColumn: Block[]
  rightColumn: Block[]
}

export type Block = RichTextBlock | FaqList | TwoColumnBlock | ImageBlock
