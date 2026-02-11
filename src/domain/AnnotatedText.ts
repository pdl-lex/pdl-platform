export interface TextSegment {
  type: "text"
  text: string
  labels?: string[]
}
export interface CrossReferenceSegment {
  type: "crossref"
  text: string
  target: string
  variant: string
  missing: boolean
  content: AnySegment[]
}

export interface BibReferenceSegment {
  type: "bibref"
  text: string
  fullReference: AnnotatedText
  content: AnySegment[]
}

export interface LinkSegment {
  type: "link"
  target: string
  text: string
  content: AnySegment[]
}

type AnySegment =
  | TextSegment
  | CrossReferenceSegment
  | BibReferenceSegment
  | LinkSegment

export interface AnnotatedText {
  text: string
  content: readonly AnySegment[]
}
