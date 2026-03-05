import { Card, Image, Title, Text, Group, Badge } from "@mantine/core"
import { Tool } from "../domain/Tool"

function LabelBar({ labels }: { labels: string[] }) {
  return (
    <Group gap="xs">
      {labels.map((label) => (
        <Badge radius="sm" size="xs" color="#8FB257">
          {label}
        </Badge>
      ))}
    </Group>
  )
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Card withBorder>
      <Card.Section pb="sm">
        <Image src={tool.imageUrl} />
      </Card.Section>
      {tool.labels && <LabelBar labels={tool.labels} />}
      <Title order={2} fw={500} fz={"lg"} py={"sm"}>
        {tool.title}
      </Title>
      <Text fz={"sm"}>{tool.teaser}</Text>
    </Card>
  )
}
