import { Card, Grid, Group, Skeleton, Stack } from "@mantine/core"
import { Tool } from "../domain/Tool"
import { useQuery } from "@tanstack/react-query"
import { ToolCard } from "../ui/ToolCard"

const fetchTools = async (): Promise<Tool[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tools`)
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as Tool[]
}

function ToolPlaceholder() {
  return (
    <Grid.Col span={{ base: 12, sm: 4 }}>
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
  const { data, isFetching } = useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: () => fetchTools(),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })
  return (
    <Grid p={"md"} pt={"md"} mx={"auto"} gutter="xs">
      {isFetching ? (
        <>
          <ToolPlaceholder />
          <ToolPlaceholder />
          <ToolPlaceholder />
        </>
      ) : (
        data?.map((tool) => (
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <ToolCard tool={tool} />
          </Grid.Col>
        ))
      )}
    </Grid>
  )
}
