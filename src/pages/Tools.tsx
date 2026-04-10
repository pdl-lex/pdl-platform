import { Card, Grid, Group, Skeleton, Stack, Alert } from "@mantine/core"
import { Tool } from "../domain/Tool"
import { useCmsCollection } from "../hooks/useCms"
import { ToolCard } from "../ui/ToolCard"
import { IconAlertCircle } from "@tabler/icons-react"
import ContentPanel from "../ui/ContentPanel"
import _ from "lodash"
import ToolSearchForm, { ToolSearchFormValues } from "../ui/ToolSearchForm"
import { useMemo, useState } from "react"

type ToolsCollectionResponse = {
  docs?: Tool[]
}

function ToolPlaceholder() {
  return (
    <Grid.Col span={{ base: 12, sm: 6 }}>
      <Card>
        <Card.Section>
          <Skeleton height={200} />
        </Card.Section>
        <Stack pt={"md"}>
          <Group gap={"xs"}>
            <Skeleton height={"1em"} w={"2em"} />
            <Skeleton height={"1em"} w={"2em"} />
            <Skeleton height={"1em"} w={"2em"} />
          </Group>
          <Skeleton height={"2em"} w={"50%"} />
          <Skeleton height={"1em"} />
          <Skeleton height={"1em"} />
          <Skeleton height={"1em"} />
          <Skeleton height={"2em"} w={"5em"} />
        </Stack>
      </Card>
    </Grid.Col>
  )
}

export default function Tools() {
  const [filters, setFilters] = useState<ToolSearchFormValues | null>(null)

  const fetchOptions = useMemo(() => {
    const params: Record<string, string> = {}

    if (!filters) return {}

    if (filters.tool.trim()) {
      params["where[name][like]"] = filters.tool.trim()
    }

    if (filters.author.trim()) {
      params["where[basedata.author][like]"] = filters.author.trim()
    }

    if (filters.tags.length > 0) {
      params["where[basedata.tags][in]"] = filters.tags.join(",")
    }

    return params
  }, [filters])

  const { data, isLoading, error } = useCmsCollection<ToolsCollectionResponse>(
    "tools",
    { fetchOptions },
  )

  const tools = data?.docs ?? []

  return (
    <Grid p={"md"} pt={"md"} mx={"auto"} gutter="xs">
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <ContentPanel title="Suche">
          <ToolSearchForm onSearch={setFilters} />
        </ContentPanel>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }}>
        <Grid>
          {isLoading ? (
            <>
              {_.times(4, (index) => (
                <ToolPlaceholder key={index} />
              ))}
            </>
          ) : error ? (
            <Grid.Col span={12}>
              <Alert
                title="Fehler beim Laden der Tools"
                color="red"
                icon={<IconAlertCircle size={18} />}
              >
                {error.message}
              </Alert>
            </Grid.Col>
          ) : tools.length === 0 ? (
            <Grid.Col span={12}>
              <Alert
                title="Keine Tools gefunden"
                color="yellow"
                icon={<IconAlertCircle size={18} />}
              />
            </Grid.Col>
          ) : (
            tools.map((tool) => (
              <Grid.Col span={{ base: 12, sm: 6 }} key={tool.id}>
                <ToolCard tool={tool} />
              </Grid.Col>
            ))
          )}
        </Grid>
      </Grid.Col>
    </Grid>
  )
}
