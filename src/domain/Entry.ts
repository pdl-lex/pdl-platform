export interface Entry {
  id: string
  form?: Form[]
  gramGrp?: GrammarGroup
  sense?: Sense[]
}

export interface Form {
  type: string
  orth: string
  hyph: string[]
  pron: string
  form?: Form[]
}

export type GrammarType =
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

export interface GrammarGroup {
  gram: Record<GrammarType, string>
}

export interface Sense {
  id: string
  n: string
  gloss: string
  def: string
  sense?: Sense[]
}
