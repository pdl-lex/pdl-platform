import _ from "lodash"
import { JSX } from "react"
import { DisplayEntry } from "../domain/Entry"
import { Text, Card, Center } from "@mantine/core"
import { DisplayVariants, EntryHeader } from "./SearchResult"
import DisplaySense from "./DisplaySense"

export function LemmaNotFound(): JSX.Element {
  return (
    <Center>
      <Text>Keine Treffer</Text>
    </Center>
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
