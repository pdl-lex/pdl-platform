import { useQuery } from "@tanstack/react-query"
import { DisplayEntry } from "../domain/Entry"
import { Skeleton } from "@mantine/core"
import { DisplayEtymology, DisplayVariants, EntryHeader } from "./SearchResult"
import DisplaySense from "./DisplaySense"

const fetchLemma = async (lemmaId: string): Promise<DisplayEntry> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/lemma-display/${lemmaId}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as DisplayEntry
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
    <>
      {isFetching ? (
        <Skeleton height={"1em"} width={"6em"} />
      ) : (
        data && <DisplayLemmaDetail entry={data} />
      )}
    </>
  )
}
