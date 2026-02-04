import { Box, Grid } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"
import ContentPanel from "../ui/ContentPanel"
import ResultSummary from "../ui/ResultSummary"

export default function SearchView() {
  return (
    <Grid maw={1200} p={"xl"} mx={"auto"}>
      <Grid.Col visibleFrom="sm" span={{ base: 12, sm: 4 }}>
        <Box>
          <ContentPanel title="Suche">
            <ComplexSearchForm />
          </ContentPanel>
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <ContentPanel title="Treffer">
          <ResultSummary />
        </ContentPanel>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <SearchResult />
      </Grid.Col>
    </Grid>
  )
}
