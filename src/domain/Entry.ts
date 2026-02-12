import { AnnotatedText } from "./AnnotatedText"
import { ResourceKey } from "./Resource"

export default class Entry {
  sourceId: string
  form?: Form[]
  gramGrp?: GrammarGroup[]
  sense?: Sense[]

  constructor(data: any) {
    this.sourceId = data.sourceId || ""
    this.form = data.form
    this.gramGrp = data.gramGrp
    this.sense = data.sense
  }

  getFeature(type: Feature): string | null {
    return this.gramGrp?.[0].gram?.find((g) => g.type === type)?.text || null
  }

  getVariants(): Form[] {
    return this.form?.[0].form?.filter((f) => f.type === "variant") || []
  }
}

export interface Headword {
  lemma: string
  index: number | null
}

export interface DisplayEntry {
  sourceId: string
  lexId: string
  source: ResourceKey
  headword: Headword
  variants: string[]
  sense?: Sense[]
  gender: string | null
  pos: string | null
  nPos: string | null
  number: string | null
  etym: AnnotatedText | null
  compounds?: AnnotatedText[]
}

export interface Form {
  type: string
  orth: string
  pron: string
  form?: Form[]
}

export type Feature =
  | "pos"
  | "case"
  | "gender"
  | "inflectionType"
  | "mood"
  | "number"
  | "person"
  | "tense"
  | "colloc"
  | "aspect"
  | "valency"
  | "government"
  | "degree"

export interface GrammaticalFeature {
  text: string
  type: Feature
}

export interface GrammarGroup {
  gram: GrammaticalFeature[]
}

export interface Citation {
  type: string
  quote: string
}

export interface Sense {
  id: string
  n: string
  gloss: string
  def: string
  cit?: Citation[]
  sense?: Sense[]
}

export interface DisplayEntryList {
  items: DisplayEntry[]
  total: number
  page: number
  itemsPerPage: number
}
