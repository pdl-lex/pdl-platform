import { Box, Card, Grid, Title } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"

export default function SearchView() {
  return (
    <Grid maw={1200} p={"xl"} mx={"auto"}>
      <Grid.Col visibleFrom="sm" span={{ base: 12, sm: 4 }}>
        <Box>
          <Card withBorder p={"lg"}>
            <Title order={2} size="h4" mb="md">
              Suchfilter
            </Title>
            <ComplexSearchForm />
          </Card>
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <SearchResult />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}></Grid.Col>
    </Grid>
  )
}
