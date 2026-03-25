import { Alert, Skeleton, Stack } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { RichText } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import MainText from "../layout/MainText"
import { useCmsGlobal } from "../hooks/useCms"

type LegalGlobal = {
  imprint: SerializedEditorState
}

export default function Imprint() {
  const { data, isLoading, error } = useCmsGlobal<LegalGlobal>("legal", {
    fetchOptions: { depth: 2, draft: false },
  })

  return (
    <MainText>
      {isLoading ? (
        <Stack gap="md">
          <Skeleton height={24} radius="md" />
          <Skeleton height={16} radius="md" />
          <Skeleton height={16} radius="md" width="70%" />
        </Stack>
      ) : error ? (
        <Alert title="Inhalt konnte nicht geladen werden" color="red" icon={<IconAlertCircle size={18} />}>
          {error.message}
        </Alert>
      ) : (
        !!data?.imprint && <RichText data={data.imprint} />
      )}
    </MainText>
  )
}
