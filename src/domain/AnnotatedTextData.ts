export interface BaseSpan {
  type: string
  start: number
  end: number
  text: string
}
export interface TextFormatSpan extends BaseSpan {
  type: "text"
  labels: string[]
}

export interface LinkSpan extends BaseSpan {
  type: "link"
  target: string
}

export interface CrossRefSpan extends BaseSpan {
  type: "crossref"
  target: string
  variant: string
  missing: boolean
}

export interface BibRefSpan extends BaseSpan {
  type: "bibref"
  bibId: string
  fullReference: AnnotatedTextData
}

export type ContainerSpan = LinkSpan | CrossRefSpan | BibRefSpan
export type AnnotationSpan = TextFormatSpan | ContainerSpan

export default interface AnnotatedTextData {
  text: string
  annotations: AnnotationSpan[]
}
