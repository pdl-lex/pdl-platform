export default function toPathFromSlug(slug: string): string {
  const normalized = slug.trim().replace(/^\/+|\/+$/g, "")
  return normalized ? `/${normalized}` : "/"
}