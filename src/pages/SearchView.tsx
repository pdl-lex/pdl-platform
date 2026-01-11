import { Box, Card, Grid, Title } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"
import { HEADER_HEIGHT } from "../layout/MainLayout"

export default function SearchView() {
  return (
    <Grid>
      <Grid.Col visibleFrom="sm" span={{ base: 12, sm: 4 }} p={0}>
        <Box p={"lg"} style={{ position: "sticky", top: HEADER_HEIGHT }}>
          <Card withBorder p={"lg"} radius="md">
            <Title order={2} size="h4" mb="md">
              Suchfilter
            </Title>
            <ComplexSearchForm />
          </Card>
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }} p={0}>
        <SearchResult />
      </Grid.Col>
    </Grid>
  )
}
