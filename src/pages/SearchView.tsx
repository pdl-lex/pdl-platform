import { Box, Grid } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import ContentPanel from "../ui/ContentPanel"
import ResultSummary from "../ui/ResultSummary"
import LemmaDetail from "../ui/LemmaDetail"
import { useState } from "react"

export default function SearchView() {
  const [activeLemmaId, setActiveLemmaId] = useState<string | null>(null)

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
          <ResultSummary
            activeLemmaId={activeLemmaId}
            setActiveLemmaId={setActiveLemmaId}
          />
        </ContentPanel>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        {!!activeLemmaId && (
          <ContentPanel title="Lemma">
            <LemmaDetail activeLemmaId={activeLemmaId} />
          </ContentPanel>
        )}
      </Grid.Col>
    </Grid>
  )
}
