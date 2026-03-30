import { Alert, Skeleton, Stack, Text, Title } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { RichText } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import MainText from "../layout/MainText"
import { useCmsCollection } from "../hooks/useCms"

type CmsPageDocument = {
  slug?: string | null
  title?: string | null
  body?: SerializedEditorState | string | null
  content?: SerializedEditorState | string | null
}

type CmsPageCollectionResponse = {
  docs?: CmsPageDocument[]
}

type CmsPageProps = {
  slug: string
  title: string
}

function isSerializedEditorState(
  value: unknown,
): value is SerializedEditorState {
  return Boolean(value && typeof value === "object" && "root" in value)
}

export default function CmsPage({ slug, title }: CmsPageProps) {
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
  const pageTitle = page?.title?.trim() || title
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
          <Title order={2} mb="md">
            {pageTitle}
          </Title>

          {richText ? (
            <RichText data={richText} />
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
