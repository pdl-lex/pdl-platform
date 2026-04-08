import { Box, Title } from "@mantine/core"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import CmsRichText from "./CmsRichText"

export default function CmsFaqItem({
  question,
  answer,
}: {
  question: string
  answer?: SerializedEditorState | string | null
}) {
  return (
    <Box>
      <Title order={3}>{question}</Title>
      <CmsRichText data={answer} />
    </Box>
  )
}
