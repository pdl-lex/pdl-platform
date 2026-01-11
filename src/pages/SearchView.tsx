import { Box, Grid } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"
import { HEADER_HEIGHT } from "../layout/MainLayout"

export default function SearchView() {
  return (
    <Grid>
      <Grid.Col
        visibleFrom="sm"
        span={{ base: 12, sm: 4 }}
        style={{
          borderRight: "1px solid var(--app-shell-border-color)",
        }}
        p={0}
      >
        <Box p={"xl"} style={{ position: "sticky", top: HEADER_HEIGHT }}>
          <ComplexSearchForm />
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }} p={0}>
        <SearchResult />
      </Grid.Col>
    </Grid>
  )
}
