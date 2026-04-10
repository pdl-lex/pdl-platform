export interface CmsMedia {
  createdAt: string
  updatedAt: string
  alt: string
  caption?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
  id: string
  thumbnailURL: string | null
}