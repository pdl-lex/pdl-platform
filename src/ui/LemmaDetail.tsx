import { useQuery } from "@tanstack/react-query"
import { DisplayEntry } from "../domain/Entry"
import { Box, Skeleton, Title } from "@mantine/core"
import { DisplayEtymology, DisplayVariants, EntryHeader } from "./SearchResult"
import DisplaySense from "./DisplaySense"
import { AnnotatedText } from "../domain/AnnotatedText"
import DisplayAnnotatedText from "./DisplayAnnotatedText"
import React from "react"
import "./LemmaDetail.sass"

const fetchLemma = async (lemmaId: string): Promise<DisplayEntry> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/lemma-display/${lemmaId}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as DisplayEntry
}

function DisplayCompounds({ compounds }: { compounds: AnnotatedText[] }) {
  return (
    <Box className="compounds">
      <Title order={3} size="h4" mt="lg" pb="xs">
        Komposita
      </Title>
      {compounds.map((compound, index) => (
        <React.Fragment key={index}>
          {index > 0 && ", "}
          <DisplayAnnotatedText annotatedText={compound} />
        </React.Fragment>
      ))}
    </Box>
  )
}

function DisplayLemmaDetail({ entry }: { entry: DisplayEntry }) {
  return (
    <>
      <EntryHeader entry={entry} />
      <DisplayVariants variants={entry.variants} />
      {!!entry.sense && (
        <DisplaySense senses={entry.sense} showExamples={false} />
      )}
      {!!entry.etym && <DisplayEtymology etym={entry.etym} />}
      {entry.compounds && entry.compounds.length > 0 && (
        <DisplayCompounds compounds={entry.compounds} />
      )}
    </>
  )
}

export default function LemmaDetail({
  activeLemmaId,
}: {
  activeLemmaId: string
}) {
  const { data, isFetching } = useQuery<DisplayEntry>({
    queryKey: ["lemma-display", activeLemmaId],
    queryFn: () => fetchLemma(activeLemmaId),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })
  return (
    <span className={"lemma-detail"}>
      {isFetching ? (
        <Skeleton height={"1em"} width={"6em"} />
      ) : (
        data && <DisplayLemmaDetail entry={data} />
      )}
    </span>
  )
}
