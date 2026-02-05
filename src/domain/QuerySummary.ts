import { DisplayEntry } from "./Entry"
import { ResourceKey } from "./Resource"

interface ResourceCount {
  source: ResourceKey
  count: number
}

export type LemmaInfo = Pick<DisplayEntry, "xml:id" | "headword" | "source"> & {
  mainSenses: readonly string[]
}
export interface LemmaGroup {
  lemma: string
  items: readonly LemmaInfo[]
}

export interface QuerySummary {
  countsByResource: readonly ResourceCount[]
  lemmaGroups: readonly LemmaGroup[]
  total: number
}
