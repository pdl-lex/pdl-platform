import { CmsMedia } from "../../domain/CmsMedia"
import { BaseBlock } from "./BaseBlock"

export interface ImageBlock extends BaseBlock {
  blockType: "image"
  image: CmsMedia
  caption: string
  altText: string
}
