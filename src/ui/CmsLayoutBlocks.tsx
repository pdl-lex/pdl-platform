import {
  alpha,
  Box,
  Button,
  SimpleGrid,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { Block } from "../cms/blocks/Block"
import CmsFaqList from "./CmsFaqList"
import CmsRichText from "./CmsRichText"
import CmsImage from "./CmsImage"

export default function CmsLayoutBlocks({ blocks }: { blocks: Block[] }) {
  const theme = useMantineTheme()
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "richText":
            return (
              <CmsRichText
                key={block.id ?? `richtext-${index}`}
                data={block.content}
              />
            )

          case "faqList":
            return (
              <CmsFaqList
                key={block.id ?? `faqList-${index}`}
                items={block.items}
              />
            )
          case "twoColumns":
            return (
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Box>
                  <CmsLayoutBlocks blocks={block.leftColumn} />
                </Box>
                <Box>
                  <CmsLayoutBlocks blocks={block.rightColumn} />
                </Box>
              </SimpleGrid>
            )
          case "image":
            return <CmsImage block={block} />
          case "button":
            const button = (
              <Button
                variant={"gradient"}
                component="a"
                href={block.link}
                {...(block.newTab
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                gradient={{
                  deg: 90,
                  from: "lexoterm-primary",
                  to: alpha(theme.colors["lexoterm-primary"][0], 0.75),
                }}
              >
                {block.label}
              </Button>
            )

            return block.tooltip ? (
              <Tooltip label={block.tooltip}>{button}</Tooltip>
            ) : (
              button
            )
          default:
            return <></>
        }
      })}
    </>
  )
}
