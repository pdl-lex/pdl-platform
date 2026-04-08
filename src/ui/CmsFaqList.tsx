import { Accordion, Title } from "@mantine/core"
import CmsRichText from "./CmsRichText"
import { FaqItem } from "../cms/blocks/FaqList"

export default function CmsFaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion variant={"default"}>
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.question}>
          <Accordion.Control>
            <Title mb={0} order={3} fw={500} fz={"h4"}>
              {item.question}
            </Title>
          </Accordion.Control>
          <Accordion.Panel pt={"md"}>
            <CmsRichText data={item.answer} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
