import { Box, Grid } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"
import { HEADER_HEIGHT } from "../layout/MainLayout"

export default function SearchView() {
  return (
    <Grid>
      <Grid.Col
        span={{ base: 12, sm: 4 }}
        mih={"100vh"}
        style={{
          borderRight: "1px solid var(--app-shell-border-color)",
        }}
      >
        <Box p={"md"} style={{ position: "sticky", top: HEADER_HEIGHT }}>
          <ComplexSearchForm />
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}>
        <SearchResult />
      </Grid.Col>
    </Grid>
  )
}
