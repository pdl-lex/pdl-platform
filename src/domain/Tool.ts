export interface ToolImage {
  url: string
  altText: string
}

export interface ToolDetails {
  title: string
  body: string
  images?: ToolImage[]
}

export interface Tool {
  title: string
  teaser: string
  imageUrl?: string
  toolUrl?: string
  details?: ToolDetails
  labels?: string[]
}
