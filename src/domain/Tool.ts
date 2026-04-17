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

export interface FeatureFlags {
  hasDatasets?: boolean | null
  hasUserUpload?: boolean | null
  sourceCodeAvailable?: boolean | null
  sourceCodeUrl?: string | null
  hasWebDemo?: boolean | null
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
  flags?: FeatureFlags
  teaser: SerializedEditorState | string | null
  cardImage?: CmsMedia | null
  layout: Block[]
}
