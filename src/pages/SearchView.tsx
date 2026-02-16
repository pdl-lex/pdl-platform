import { Grid, Stack } from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import ContentPanel from "../ui/ContentPanel"
import ResultSummary from "../ui/ResultSummary"
import LemmaDetail from "../ui/LemmaDetail"
import { useState } from "react"
import KeywordList from "../ui/KeywordList"

export default function SearchView() {
  const [activeLemmaId, setActiveLemmaId] = useState<string | null>(null)

  return (
    <Grid p={"md"} pt={"md"} mx={"auto"} gutter="xs">
      <Grid.Col visibleFrom="sm" span={{ base: 12, sm: 4 }}>
        <Stack gap={"xs"}>
          <ContentPanel title="Suche">
            <ComplexSearchForm />
          </ContentPanel>
          <ContentPanel title="Stichwortsuche">
            <KeywordList />
          </ContentPanel>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <ResultSummary
          activeLemmaId={activeLemmaId}
          setActiveLemmaId={setActiveLemmaId}
        />
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
