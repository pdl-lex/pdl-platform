import _ from "lodash"
import { JSX } from "react"
import { DisplayEntry } from "../domain/Entry"
import { Text, Center, Title } from "@mantine/core"
import { DisplayVariants, EntryHeader } from "./SearchResult"
import DisplaySense from "./DisplaySense"
import DisplayAnnotatedText from "./DisplayAnnotatedText"

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
    <>
      <EntryHeader entry={entry} />
      <DisplayVariants variants={entry.variants} />
      {!!entry.sense && (
        <DisplaySense senses={entry.sense} showExamples={true} />
      )}
      {!!entry.etym && (
        <>
          <Title order={3} pb="md" mt="md">
            Etymologie
          </Title>
          <DisplayAnnotatedText annotatedText={entry.etym} />
        </>
      )}
    </>
  )
}
