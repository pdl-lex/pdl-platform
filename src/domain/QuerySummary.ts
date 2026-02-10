import { DisplayEntry } from "./Entry"
import { ResourceKey } from "./Resource"

interface ResourceCount {
  source: ResourceKey
  count: number
}

export type LemmaInfo = Pick<
  DisplayEntry,
  | "lexotermId"
  | "sourceId"
  | "headword"
  | "source"
  | "gender"
  | "nPos"
  | "number"
> & {
  mainSenses: readonly string[]
}

export interface QuerySummary {
  countsByResource: readonly ResourceCount[]
  items: readonly LemmaInfo[]
  total: number
}
