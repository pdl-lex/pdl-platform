import { Box, Grid } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"

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
        <Box p={"md"} style={{ position: "sticky", top: "61px" }}>
          <ComplexSearchForm />
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}>
        <SearchResult />
      </Grid.Col>
    </Grid>
  )
}
