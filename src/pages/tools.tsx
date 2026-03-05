import { Grid, Loader } from "@mantine/core"
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

export default function Tools() {
  const { data, isFetching } = useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: () => fetchTools(),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })
  return isFetching ? (
    <Loader />
  ) : (
    <Grid p={"md"} pt={"md"} mx={"auto"} gutter="xs">
      {data?.map((tool) => (
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <ToolCard tool={tool} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
