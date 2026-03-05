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
  SimpleGrid,
  Typography,
  Stack,
} from "@mantine/core"
import { Tool, ToolDetails, ToolImage } from "../domain/Tool"
import { useDisclosure } from "@mantine/hooks"

function LabelBar({ labels }: { labels: string[] }) {
  return (
    <Group gap="xs" pt={"xs"}>
      {labels.map((label) => (
        <Badge radius="sm" size="xs" color="#8FB257">
          {label}
        </Badge>
      ))}
    </Group>
  )
}

function hasDetails(tool: Tool): tool is Tool & { details: ToolDetails } {
  return tool.details !== undefined
}

function ImageStack({ images }: { images: ToolImage[] }) {
  return (
    <Stack>
      {images.map((image) => (
        <Image src={image.url} alt={image.altText} />
      ))}
    </Stack>
  )
}

function ToolDetailModal({ tool }: { tool: Tool & { details: ToolDetails } }) {
  const [opened, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()
  const details = tool.details

  return (
    <>
      <Modal
        size={"xl"}
        opened={opened}
        onClose={close}
        centered
        closeButtonProps={{ style: { alignSelf: "flex-start" } }}
        title={
          <Stack gap={0}>
            {tool.labels && <LabelBar labels={tool.labels} />}
            <Title order={3} fw={500} pt={"sm"}>
              {tool.details.title}
            </Title>
          </Stack>
        }
      >
        {details.body && (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Typography>
              <div dangerouslySetInnerHTML={{ __html: details.body }} />
            </Typography>
            {details.images && details.images?.length > 0 && (
              <ImageStack images={details.images} />
            )}
          </SimpleGrid>
        )}
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
      {tool.labels && <LabelBar labels={tool.labels} />}
      <Title order={2} fw={500} py={"sm"}>
        {tool.title}
      </Title>
      <Text pb={"md"}>{tool.teaser}</Text>
      {hasDetails(tool) && <ToolDetailModal tool={tool} />}
    </Card>
  )
}
