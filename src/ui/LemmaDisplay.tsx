import _ from "lodash"
import { JSX } from "react"
import { DisplayEntry } from "../domain/Entry"
import { Text, Card } from "@mantine/core"
import { useParams } from "react-router-dom"
import { DisplayVariants, EntryHeader } from "./SearchResult"
import DisplaySense from "./DisplaySense"

export function LemmaNotFound(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  return (
    <section>
      <Text>Lemma "{id}" nicht gefunden.</Text>
    </section>
  )
}

export default function DisplayLemma({
  entry,
}: {
  entry: DisplayEntry
}): JSX.Element {
  return (
    <Card shadow="md" padding="xl">
      <EntryHeader entry={entry} />
      <DisplayVariants variants={entry.variants} />
      <DisplaySense senses={entry.sense} />
    </Card>
  )
}
