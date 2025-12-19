export default class Entry {
  xmlId: string
  form?: Form[]
  gramGrp?: GrammarGroup[]
  sense?: Sense[]

  constructor(data: any) {
    this.xmlId = data["xml:id"] || ""
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

export interface Sense {
  id: string
  n: string
  gloss: string
  def: string
  sense?: Sense[]
}
