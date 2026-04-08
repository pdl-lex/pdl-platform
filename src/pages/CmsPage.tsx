import { Alert, Skeleton, Stack, Text } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import MainText from "../layout/MainText"
import { useCmsCollection } from "../hooks/useCms"
import CmsRichText, { isSerializedEditorState } from "../ui/CmsRichText"
import CmsFaqItem from "../ui/CmsFaqItem"

type BaseBlock = {
  id?: string
  blockType: string
}

interface RichTextBlock extends BaseBlock {
  content?: SerializedEditorState | string | null
  blockType: "richText"
}

interface FaqBlock extends BaseBlock {
  question: string
  answer?: SerializedEditorState | string | null
  blockType: "faqItem"
}

type Block = RichTextBlock | FaqBlock

type CmsPageDocument = {
  slug?: string | null
  layout?: Array<Block> | null
  body?: SerializedEditorState | string | null
  content?: SerializedEditorState | string | null
}

type CmsPageCollectionResponse = {
  docs?: CmsPageDocument[]
}

type CmsPageProps = {
  slug: string
}

export default function CmsPage({ slug }: CmsPageProps) {
  const { data, isLoading, error } =
    useCmsCollection<CmsPageCollectionResponse>("pages", {
      fetchOptions: {
        limit: 1,
        depth: 2,
        draft: false,
        ["where[slug][equals]"]: slug,
      },
      enabled: !!slug,
    })

  const page = data?.docs?.[0]
  const layoutBlocks = page?.layout ?? []

  const richText = isSerializedEditorState(page?.body)
    ? page.body
    : isSerializedEditorState(page?.content)
      ? page.content
      : null

  return (
    <MainText>
      {isLoading ? (
        <Stack gap="md">
          <Skeleton height={32} radius="md" width="40%" />
          <Skeleton height={16} radius="md" />
          <Skeleton height={16} radius="md" width="70%" />
        </Stack>
      ) : error ? (
        <Alert
          title="Seite konnte nicht geladen werden"
          color="red"
          icon={<IconAlertCircle size={18} />}
        >
          {error.message}
        </Alert>
      ) : !page ? (
        <Alert
          title="Seite nicht gefunden"
          color="yellow"
          icon={<IconAlertCircle size={18} />}
        >
          Es wurde keine Seite unter "{slug}" gefunden.
        </Alert>
      ) : (
        <>
          {layoutBlocks.length > 0 ? (
            <Stack gap="md">
              {layoutBlocks.map((block, index) => {
                switch (block.blockType) {
                  case "richText":
                    return (
                      <CmsRichText
                        key={block.id ?? `${slug}-richtext-${index}`}
                        data={block.content}
                      />
                    )

                  case "faqItem":
                    return (
                      <CmsFaqItem
                        key={block.id ?? `${slug}-faq-${index}`}
                        question={block.question}
                        answer={
                          isSerializedEditorState(block.answer)
                            ? block.answer
                            : ""
                        }
                      />
                    )
                  default:
                    return <></>
                }
              })}
            </Stack>
          ) : richText ? (
            <CmsRichText data={richText} />
          ) : typeof page.body === "string" && page.body.trim() ? (
            <Text>{page.body}</Text>
          ) : typeof page.content === "string" && page.content.trim() ? (
            <Text>{page.content}</Text>
          ) : (
            <Text c="dimmed">Diese Seite hat aktuell noch keinen Inhalt.</Text>
          )}
        </>
      )}
    </MainText>
  )
}
