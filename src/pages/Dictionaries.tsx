import { Badge, Card, Grid, Title, Flex, Stack, Center } from "@mantine/core"
import MainText from "../layout/MainText"
import { Link } from "react-router-dom"
import { IconExternalLink } from "@tabler/icons-react"
import { useCmsCollection } from "../hooks/useCms"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import CmsRichText from "../ui/CmsRichText"

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
    <MainText>
      <Center mb="xl">
        <Title>Wörterbücher im ADL</Title>
      </Center>
      <Grid>
        {data?.docs?.map((resource) => (
          <Grid.Col span={{ base: 12, xs: 6 }} key={resource.id}>
            <ResourceCard resource={resource} />
          </Grid.Col>
        ))}
      </Grid>
    </MainText>
  )
}
