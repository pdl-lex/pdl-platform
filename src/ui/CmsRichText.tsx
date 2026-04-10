import {
  defaultJSXConverters,
  LinkJSXConverter,
  RichText,
  type JSXConverters,
} from "@payloadcms/richtext-lexical/react"
import toPathFromSlug from "../utils/toPathFromSlug"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

export function isSerializedEditorState(
  value: unknown,
): value is SerializedEditorState {
  return Boolean(value && typeof value === "object" && "root" in value)
}

export type CmsRichTextProps = Omit<
  React.ComponentProps<typeof RichText>,
  "converters" | "data"
> & { data?: SerializedEditorState | string | null }

const cmsRichTextConverters: JSXConverters = {
  ...defaultJSXConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const docValue = linkNode.fields?.doc?.value

      if (docValue && typeof docValue === "object" && "slug" in docValue) {
        const slug = typeof docValue.slug === "string" ? docValue.slug : ""
        if (slug.trim()) {
          return toPathFromSlug(slug)
        }
      }

      const fallbackUrl = linkNode.fields?.url
      return typeof fallbackUrl === "string" && fallbackUrl.trim()
        ? fallbackUrl
        : "#"
    },
  }),
}

export default function CmsRichText({ data, ...props }: CmsRichTextProps) {
  if (isSerializedEditorState(data))
    return (
      <RichText {...props} data={data} converters={cmsRichTextConverters} />
    )
}
