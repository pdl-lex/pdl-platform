import {
  Card,
  Image,
  Title,
  Text,
  Group,
  Badge,
  Modal,
  Button,
  alpha,
  useMantineTheme,
  Stack,
  Tooltip,
} from "@mantine/core"
import { Tag, Tool } from "../domain/Tool"
import { useDisclosure } from "@mantine/hooks"
import CmsRichText from "./CmsRichText"
import CmsLayoutBlocks from "./CmsLayoutBlocks"

function ToolHeader({ tool }: { tool: Tool }) {
  const tags = tool.basedata.tags
  return (
    <Stack gap={0}>
      {tags && <TagBar tags={tags} />}
      <Title order={3} fw={500} pt={"sm"}>
        {tool.name}
      </Title>
      <Text c={"dimmed"}>{tool.basedata.author}</Text>
    </Stack>
  )
}

function TagBar({ tags }: { tags: Tag[] }) {
  return (
    <Group gap="xs" pt={"xs"}>
      {tags.map((tag) => (
        <Tooltip label={tag.name}>
          <Badge radius="sm" size="xs" color="#8FB257">
            {tag.short}
          </Badge>
        </Tooltip>
      ))}
    </Group>
  )
}

function ToolDetailModal({ tool }: { tool: Tool }) {
  const [opened, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()

  return (
    <>
      <Modal
        size={"xl"}
        opened={opened}
        onClose={close}
        centered
        closeButtonProps={{ style: { alignSelf: "flex-start" } }}
        title={<ToolHeader tool={tool} />}
      >
        {
          <Stack>
            <CmsLayoutBlocks blocks={tool.layout} />
            {tool.basedata.toolUrl && (
              <Group>
                <Button
                  variant="gradient"
                  component="a"
                  href={tool.basedata.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  gradient={{
                    deg: 90,
                    from: "lexoterm-primary",
                    to: alpha(theme.colors["lexoterm-primary"][0], 0.75),
                  }}
                >
                  Werkzeug starten
                </Button>
              </Group>
            )}
          </Stack>
        }
      </Modal>
      <Group>
        <Button
          variant="gradient"
          onClick={open}
          gradient={{
            deg: 90,
            from: "lexoterm-primary",
            to: alpha(theme.colors["lexoterm-primary"][0], 0.75),
          }}
        >
          Details
        </Button>
      </Group>
    </>
  )
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Card withBorder>
      <Card.Section pb="sm">
        <Image src={tool.imageUrl} />
      </Card.Section>
      <ToolHeader tool={tool} />
      <CmsRichText data={tool.teaser} />
      <ToolDetailModal tool={tool} />
    </Card>
  )
}
