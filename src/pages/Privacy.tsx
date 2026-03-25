import { Skeleton, Stack } from "@mantine/core"
import { RichText } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import MainText from "../layout/MainText"
import { useCmsGlobal } from "../hooks/useCms"

type LegalGlobal = {
  privacy: SerializedEditorState
}

export default function Privacy() {
  const { data, isLoading } = useCmsGlobal<LegalGlobal>("legal", {
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
      ) : (
        !!data?.privacy && <RichText data={data.privacy} />
      )}
    </MainText>
  )
}
