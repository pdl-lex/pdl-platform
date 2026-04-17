import { Badge, Card, Grid, Title, Flex, Stack, Skeleton, Alert } from "@mantine/core"
import { Link } from "react-router-dom"
import { IconAlertCircle, IconExternalLink } from "@tabler/icons-react"
import { useCmsCollection } from "../hooks/useCms"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import CmsRichText from "../ui/CmsRichText"
import _ from "lodash"

function ResourceCard({ resource }: { resource: CmsDictionary }) {
  return (
    <Card withBorder shadow="md" h={"100%"}>
      <Badge variant="light" size="xs">
        {resource.shortName.toUpperCase()}
      </Badge>
      <Title order={4} mt="xs">
        {resource.name}
      </Title>
      <Stack justify="space-between" h="100%">
        <CmsRichText data={resource.description} />
        {resource.url && (
          <Flex justify="flex-end">
            <Link to={resource.url} target="_blank" rel="noopener noreferrer">
              Mehr erfahren <IconExternalLink size={14} />
            </Link>
          </Flex>
        )}
      </Stack>
    </Card>
  )
}

interface CmsDictionary {
  id: string
  name: string
  shortName: string
  description: SerializedEditorState | string | null
  url?: string
  credits?: SerializedEditorState | string | null
  license?: SerializedEditorState | string | null
}

type CmsPageCollectionResponse = {
  docs?: CmsDictionary[]
}

export default function Dictionaries() {
  const { data, error, isLoading } =
    useCmsCollection<CmsPageCollectionResponse>("resources")

  return (
    <Grid p={"md"} pt={"md"} mx={"auto"} gutter="xs">
      {isLoading ? (
        <>
          {_.times(4, (index) => (
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Skeleton key={index} height={"20em"} />
            </Grid.Col>
          ))}
        </>
      ) : error ? (
        <Grid.Col span={12}>
          <Alert
            title="Fehler beim Laden der Wörterbücher"
            color="red"
            icon={<IconAlertCircle size={18} />}
          >
            {error.message}
          </Alert>
        </Grid.Col>
      ) : (
        data?.docs?.map((resource) => (
          <Grid.Col span={{ base: 12, sm: 4 }} key={resource.id}>
            <ResourceCard resource={resource} />
          </Grid.Col>
        ))
      )}
    </Grid>
  )
}
