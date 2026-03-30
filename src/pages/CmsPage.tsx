import { Title } from "@mantine/core"
import MainText from "../layout/MainText"

export default function CmsPage({ title }: { title: string }) {
  return (
    <MainText>
      <Title order={2}>{title}</Title>
    </MainText>
  )
}
