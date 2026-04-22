import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

export default interface CmsDictionary {
  id: string
  name: string
  shortName: string
  description: SerializedEditorState | string | null
  url?: string
  credits?: SerializedEditorState | string | null
  license?: SerializedEditorState | string | null
}
