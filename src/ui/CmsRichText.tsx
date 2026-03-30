import {
  defaultJSXConverters,
  LinkJSXConverter,
  RichText,
  type JSXConverters,
} from "@payloadcms/richtext-lexical/react"
import toPathFromSlug from "../utils/toPathFromSlug"

type CmsRichTextProps = Omit<React.ComponentProps<typeof RichText>, "converters">

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

export default function CmsRichText(props: CmsRichTextProps) {
  return <RichText {...props} converters={cmsRichTextConverters} />
}