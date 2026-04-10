import { BaseBlock } from "./BaseBlock"

export interface ButtonBlock extends BaseBlock {
  blockType: "button"
  label: string
  tooltip?: string
  link: string
  newTab?: boolean
}
