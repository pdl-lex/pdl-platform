import { DisplayEntry } from "./Entry"
import { ResourceKey } from "./Resource"

interface ResourceCount {
  source: ResourceKey
  count: number
}

export type LemmaPreview = Pick<
  DisplayEntry,
  "xml:id" | "headword" | "source"
> & {
  mainSenses: readonly string[]
}

export interface QuerySummary {
  countsByResource: readonly ResourceCount[]
  lemmaPreviews: readonly LemmaPreview[]
  total: number
}
