export interface TextSegment {
  type: "text"
  text: string
  labels?: string[]
}

interface BaseLinkSegment {
  target: string
  text: string
  content: TextSegment[]
}

export interface LinkSegment extends BaseLinkSegment {
  type: "link"
}

export interface CrossReferenceSegment extends BaseLinkSegment {
  type: "crossref"
  variant: string
  missing: boolean
}

export interface BibReferenceSegment {
  type: "bibref"
  text: string
  fullReference: DisplaySegment[]
  content: TextSegment[]
}

export type ContainerSegment =
  | CrossReferenceSegment
  | BibReferenceSegment
  | LinkSegment

export type DisplaySegment = TextSegment | ContainerSegment
