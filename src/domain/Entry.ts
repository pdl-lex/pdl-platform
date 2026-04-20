import AnnotatedTextData from "./AnnotatedTextData"
import { ResourceKey } from "./Resource"

export type IndexLetter = Uppercase<string> | "-" | "#"

export interface Headword {
  lemma: string
  index: number
}

export default interface Entry {
  sourceId: string
  lexId: string
  source: ResourceKey
  headword: Headword
  indexLetter: IndexLetter
  variants: string[]
  sense?: Sense[]
  gender: string | null
  pos: string | null
  nPos: string | null
  number: string | null
  etym: AnnotatedTextData | null
  compounds?: AnnotatedTextData[]
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

export interface Citation extends AnnotatedTextData {
  type: string
}

export interface Sense {
  id: string
  n: string
  gloss: string
  def: string
  cit?: Citation[]
  sense?: Sense[]
}

interface PaginatedList<T> {
  items: T[]
  total: number
  page: number
  itemsPerPage: number
}

export type DisplayEntryList = PaginatedList<Entry>

export type KeywordEntryList = PaginatedList<Headword>
