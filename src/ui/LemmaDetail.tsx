import { useQuery } from "@tanstack/react-query"
import { DisplayEntry, Headword, Sense } from "../domain/Entry"
import { Divider, Grid, Skeleton, Title, Text } from "@mantine/core"
import DisplaySense from "./DisplaySense"
import { AnnotatedText } from "../domain/AnnotatedText"
import DisplayAnnotatedText from "./DisplayAnnotatedText"
import React from "react"
import "./LemmaDetail.sass"
import _ from "lodash"

const fetchLemma = async (lemmaId: string): Promise<DisplayEntry> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/lemma-display/${lemmaId}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as DisplayEntry
}

function LemmaHeader({ headword }: { headword: Headword }) {
  return (
    <Title mt={0} mb={"xl"} order={2} c={"lexoterm-brand"}>
      {headword.lemma}
      {headword.index !== null && <sup>{headword.index}</sup>}
    </Title>
  )
}

function Variants({ variants }: { variants: string[] }) {
  return (
    variants.length > 0 && (
      <>
        <Grid.Col span={4}>Varianten</Grid.Col>
        <Grid.Col span={8}>
          {variants.map((variant, index) => (
            <React.Fragment key={index}>
              <Text span fs={"italic"}>
                {variant}
              </Text>
              {index < variants.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </Grid.Col>
      </>
    )
  )
}

function Grammar({ entry }: { entry: DisplayEntry }) {
  const features = _.compact([entry.nPos, entry.gender, entry.number])
  return (
    features.length > 0 && (
      <>
        <Grid.Col span={4}>Grammatik</Grid.Col>
        <Grid.Col span={8}>
          {features.map((value, index) => (
            <>
              {index > 0 && ", "}
              <Text key={index} span>
                {value}
              </Text>
            </>
          ))}
        </Grid.Col>
      </>
    )
  )
}

function LemmaDetailSection({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <Text component="section" pb={"xl"}>
      <Title order={3} size="sm" mb={5}>
        {title}
      </Title>
      <Divider size="sm" mb={"xs"} c={"lexoterm-primary"} />
      {children}
    </Text>
  )
}

function MetaDataSection({ entry }: { entry: DisplayEntry }) {
  return (
    <LemmaDetailSection title={"Stammdaten"}>
      <Grid gutter={0}>
        <Variants variants={entry.variants} />
        <Grammar entry={entry} />
      </Grid>
    </LemmaDetailSection>
  )
}

function SenseSection({ sense }: { sense?: Sense[] }) {
  return (
    !!sense && (
      <LemmaDetailSection title={"Bedeutungen"}>
        <DisplaySense senses={sense} showExamples={false} />
      </LemmaDetailSection>
    )
  )
}

function EtymologySection({ etymology }: { etymology?: AnnotatedText | null }) {
  return (
    !!etymology && (
      <LemmaDetailSection title={"Etymologie"}>
        <DisplayAnnotatedText annotatedText={etymology} />
      </LemmaDetailSection>
    )
  )
}

function CompoundSection({ compounds }: { compounds: AnnotatedText[] }) {
  return (
    <LemmaDetailSection title={"Komposita"}>
      <Text span className="compounds">
        {compounds.map((compound, index) => (
          <React.Fragment key={index}>
            {index > 0 && ", "}
            <DisplayAnnotatedText annotatedText={compound} />
          </React.Fragment>
        ))}
      </Text>
    </LemmaDetailSection>
  )
}

function DisplayLemmaDetail({ entry }: { entry: DisplayEntry }) {
  return (
    <>
      <LemmaHeader headword={entry.headword} />
      <MetaDataSection entry={entry} />
      <SenseSection sense={entry.sense} />
      <EtymologySection etymology={entry.etym} />
      {entry.compounds && entry.compounds.length > 0 && (
        <CompoundSection compounds={entry.compounds} />
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
