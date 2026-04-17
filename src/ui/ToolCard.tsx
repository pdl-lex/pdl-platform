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
  Anchor,
} from "@mantine/core"
import { FeatureFlags, Tag, Tool } from "../domain/Tool"
import { useDisclosure } from "@mantine/hooks"
import CmsRichText from "./CmsRichText"
import CmsLayoutBlocks from "./CmsLayoutBlocks"
import {
  IconCode,
  IconDatabase,
  IconDatabaseImport,
  IconPlayerPlay,
} from "@tabler/icons-react"
import React from "react"
import _ from "lodash"

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
        <Tooltip label={tag.name} key={tag.id}>
          <Badge radius="sm" size="xs" color="#8FB257">
            {tag.short}
          </Badge>
        </Tooltip>
      ))}
    </Group>
  )
}

function FeatureIconBar({ flags }: { flags?: FeatureFlags }) {
  const hasFlags = !!flags && _.some(_.values(flags))

  if (!hasFlags) return <></>

  const iconSize = 18
  const icons: Record<
    keyof Omit<FeatureFlags, "sourceCodeUrl">,
    { component: React.ReactNode; label: string }
  > = {
    hasDatasets: {
      component: <IconDatabase size={iconSize} />,
      label: "Datensätze verfügbar",
    },
    hasUserUpload: {
      component: <IconDatabaseImport size={iconSize} />,
      label: "Datei-Upload möglich",
    },
    sourceCodeAvailable: {
      component: flags.sourceCodeUrl ? (
        <Anchor
          href={flags.sourceCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", lineHeight: 0 }}
        >
          <IconCode size={iconSize} />
        </Anchor>
      ) : (
        <IconCode size={iconSize} />
      ),
      label: "Quellcode verfügbar",
    },
    hasWebDemo: {
      component: <IconPlayerPlay size={iconSize} />,
      label: "Web-Demo verfügbar",
    },
  }

  return (
    <Group pb={"sm"}>
      {[...Object.entries(icons)]
        .filter(([key]) => flags[key as keyof FeatureFlags])
        .map(([key, { component, label }]) => {
          return (
            <Tooltip label={label} key={key}>
              {component}
            </Tooltip>
          )
        })}
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
  const payloadUrl = import.meta.env.VITE_PAYLOAD_URL

  return (
    <Card withBorder>
      <Card.Section pb="sm">
        {tool.cardImage && (
          <Image
            src={`${payloadUrl.replace(/\/+$/, "")}${tool.cardImage.url}`}
            alt={tool.cardImage.alt}
          />
        )}
      </Card.Section>
      <ToolHeader tool={tool} />
      <CmsRichText data={tool.teaser} />
      <FeatureIconBar flags={tool.flags} />
      <ToolDetailModal tool={tool} />
    </Card>
  )
}
