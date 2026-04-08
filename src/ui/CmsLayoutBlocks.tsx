import { Block } from "../cms/blocks/Block"
import CmsFaqList from "./CmsFaqList"
import CmsRichText from "./CmsRichText"

export default function CmsLayoutBlocks({ blocks }: { blocks: Block[] }) {
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
          default:
            return <></>
        }
      })}
    </>
  )
}
