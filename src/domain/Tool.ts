import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { CmsMedia } from "./CmsMedia"
import { Block } from "../cms/blocks/Block"

export interface Tag {
  id: string
  name: string
  short: string
  updatedAt: string
  createdAt: string
}

interface BaseData {
  author: string
  category: "external" | "lexoterm" | "partner"
  tags?: Tag[]
  toolUrl?: string
}

export interface Tool {
  id: string
  name: string
  basedata: BaseData
  teaser: SerializedEditorState | string | null
  cardImage?: CmsMedia | null
  layout: Block[]
}
