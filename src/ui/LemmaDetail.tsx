import _ from "lodash"
import { useQuery } from "@tanstack/react-query"
import Entry, { Citation, Headword, Sense } from "../domain/Entry"
import {
  Divider,
  Skeleton,
  Title,
  Text,
  Table,
  Anchor,
  Stack,
  Space,
  List,
  Card,
  TextProps,
} from "@mantine/core"
import DisplaySense from "./DisplaySense"
import DisplayAnnotatedText from "./DisplayAnnotatedText"
import React from "react"
import "./LemmaDetail.sass"
import { ResourceKey, resources } from "../domain/Resource"
import { IconExternalLink } from "@tabler/icons-react"
import AnnotatedTextData from "../domain/AnnotatedTextData"
import ResourceCredits from "./ResourceCredits"

const fetchLemma = async (lemmaId: string): Promise<Entry> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/lemma/${encodeURIComponent(lemmaId)}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as Entry
}

function LemmaHeader({ headword }: { headword: Headword }) {
  return (
    <Title mt={0} mb={"xl"} order={2} c={"lexoterm-brand"}>
      {headword.lemma}
      {!!headword.index && <sup>{headword.index}</sup>}
    </Title>
  )
}

function LemmaDetailSection({
  title,
  children,
  ...props
}: {
  title: string
  children?: React.ReactNode
} & TextProps) {
  return (
    <Text component="section" pb={"xl"} {...props}>
      <Title order={3} size="sm" mb={5}>
        {title}
      </Title>
      <Divider size="sm" mb={"xs"} c={"lexoterm-primary"} />
      {children}
    </Text>
  )
}

function MetaDataRow({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <Table.Tr>
      <Table.Td>{title}</Table.Td>
      <Table.Td>{children}</Table.Td>
    </Table.Tr>
  )
}

function Dictionary({ resourceKey }: { resourceKey: ResourceKey }) {
  const resource = resources[resourceKey]
  return (
    <MetaDataRow title={"Wörterbuch"}>
      <Anchor href={resource.url} target="_blank" fz={"sm"}>
        {resource.displayName} <IconExternalLink size={"1em"} />
      </Anchor>
    </MetaDataRow>
  )
}

function Variants({ variants }: { variants: string[] }) {
  return (
    variants.length > 0 && (
      <MetaDataRow title={"Varianten"}>
        {variants.map((variant, index) => (
          <React.Fragment key={index}>
            <Text span fz={"sm"} fs={"italic"}>
              {variant}
            </Text>
            {index < variants.length - 1 ? ", " : ""}
          </React.Fragment>
        ))}
      </MetaDataRow>
    )
  )
}

function Grammar({ entry }: { entry: Entry }) {
  const features = _.compact([entry.nPos, entry.gender, entry.number])
  return (
    features.length > 0 && (
      <MetaDataRow title={"Grammatik"}>
        {features.map((value, index) => (
          <React.Fragment key={index}>
            {index > 0 && ", "}
            {value}
          </React.Fragment>
        ))}
      </MetaDataRow>
    )
  )
}

function MetaDataSection({ entry }: { entry: Entry }) {
  return (
    <LemmaDetailSection title={"Stammdaten"}>
      <Table withRowBorders={false} verticalSpacing={0}>
        <Table.Tbody>
          <Variants variants={entry.variants} />
          <Grammar entry={entry} />
          <Dictionary resourceKey={entry.source} />
        </Table.Tbody>
      </Table>
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

function EtymologySection({
  etymology,
}: {
  etymology?: AnnotatedTextData | null
}) {
  return (
    !!etymology && (
      <LemmaDetailSection title={"Etymologie"}>
        <DisplayAnnotatedText data={etymology} />
      </LemmaDetailSection>
    )
  )
}

function CompoundSection({ compounds }: { compounds: AnnotatedTextData[] }) {
  return (
    <LemmaDetailSection title={"Komposita"}>
      <Text span className="compounds">
        {compounds.map((compound, index) => (
          <React.Fragment key={index}>
            {index > 0 && ", "}
            <DisplayAnnotatedText data={compound} />
          </React.Fragment>
        ))}
      </Text>
    </LemmaDetailSection>
  )
}

function CorpusExampleSection({ examples }: { examples: Citation[] }) {
  return (
    <LemmaDetailSection title={"Korpusbelege (maschinell erstellt)"}>
      <List listStyleType="none" size={"sm"}>
        {examples.map((example, index) => (
          <List.Item key={index} pb={"sm"}>
            <DisplayAnnotatedText data={example} />
          </List.Item>
        ))}
      </List>
    </LemmaDetailSection>
  )
}

function CreditSection({ resource }: { resource: ResourceKey }) {
  return (
    <Card radius={"md"} bg="#edf1ef" p={"xs"}>
      <LemmaDetailSection title={"Impressum"} pb={0}>
        <ResourceCredits resource={resource} />
      </LemmaDetailSection>
    </Card>
  )
}

function DisplayLemmaDetail({ entry }: { entry: Entry }) {
  const corpusExamples =
    entry.cit?.filter((c) => c.type === "corpus_example") || []
  return (
    <>
      <LemmaHeader headword={entry.headword} />
      <MetaDataSection entry={entry} />
      <SenseSection sense={entry.sense} />
      <EtymologySection etymology={entry.etym} />
      {entry.compounds && entry.compounds.length > 0 && (
        <CompoundSection compounds={entry.compounds} />
      )}
      {corpusExamples.length > 0 && (
        <CorpusExampleSection examples={corpusExamples} />
      )}
      <CreditSection resource={entry.source} />
    </>
  )
}

function LemmaDetailSkeleton({ activeLemmaId }: { activeLemmaId: string }) {
  const estimatedLength = activeLemmaId.length - 13
  return (
    <Stack gap={"xs"}>
      <Skeleton height={"1.8em"} width={`${estimatedLength}ch`} />
      <Space h={"1.5em"} />
      <Skeleton height={"1em"} width={"6em"} />
      <Skeleton height={"4em"} />
      <Space h={"1.5em"} />
      <Skeleton height={"1em"} width={"6em"} />
      {_.times(5, (index) => (
        <Skeleton key={index} height={"4em"} />
      ))}
    </Stack>
  )
}

export default function LemmaDetail({
  activeLemmaId,
}: {
  activeLemmaId: string
}) {
  const { data, isFetching } = useQuery<Entry>({
    queryKey: ["lemma", activeLemmaId],
    queryFn: () => fetchLemma(activeLemmaId),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })
  return (
    <span className={"lemma-detail"}>
      {isFetching ? (
        <LemmaDetailSkeleton activeLemmaId={activeLemmaId} />
      ) : (
        data && <DisplayLemmaDetail entry={data} />
      )}
    </span>
  )
}
