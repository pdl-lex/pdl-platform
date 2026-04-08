import { Title } from "@mantine/core"
import CmsRichText from "./CmsRichText"
import { FaqItem } from "../cms/blocks/FaqList"

export default function CmsFaqList({ items }: { items: FaqItem[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <Title order={3}>{item.question}</Title>
          <CmsRichText data={item.answer} />
        </li>
      ))}
    </ul>
  )
}
