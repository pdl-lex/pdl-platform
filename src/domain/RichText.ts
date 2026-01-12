export interface RichTextSegment {
  type: "text" | "emph" | "sup" | "link" | "crossref" | "bibref"
}

export interface PlainTextSegment extends RichTextSegment {
  type: "text"
  body: string
}

export interface EmphasisSegment extends RichTextSegment {
  type: "emph"
  body: string
}

export interface SuperscriptSegment extends RichTextSegment {
  type: "sup"
  body: string
}

export interface CrossReferenceSegment extends RichTextSegment {
  type: "crossref"
  text: string
  targetId: string
}

export interface BibReferenceSegment extends RichTextSegment {
  type: "bibref"
  text: string
  details: RichText
}

export interface LinkSegment extends RichTextSegment {
  type: "link"
  url: string
  text: string
}

type AnyRichTextSegment =
  | PlainTextSegment
  | LinkSegment
  | CrossReferenceSegment
  | BibReferenceSegment
  | EmphasisSegment
  | SuperscriptSegment

export type RichText = AnyRichTextSegment[]
