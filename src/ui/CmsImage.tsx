import { Text, Image, Stack } from "@mantine/core"
import { ImageBlock } from "../cms/blocks/ImageBlock"

export default function CmsImage({ block }: { block: ImageBlock }) {
  const payloadUrl = import.meta.env.VITE_PAYLOAD_URL

  return (
    <Stack>
      <Image
        src={`${payloadUrl.replace(/\/+$/, "")}${block.image.url}`}
        alt={block.altText || block.image.alt}
      />
      <Text px={"md"} size={"sm"}>{block.caption || block.image.caption}</Text>
    </Stack>
  )
}
