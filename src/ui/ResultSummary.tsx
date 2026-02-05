import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { QuerySummary, LemmaInfo } from "../domain/QuerySummary"
import InfoBox from "./InfoBox"
import { DisplayResource } from "./SearchResult"
import _ from "lodash"
import {
  Accordion,
  List,
  Title,
  Text,
  Stack,
  Skeleton,
  UnstyledButton,
} from "@mantine/core"
import { Headword } from "../domain/Entry"
import React, { useEffect } from "react"

type LemmaDispatch = {
  setActiveLemmaId: React.Dispatch<React.SetStateAction<string | null>>
}

const search = async (query: URLSearchParams): Promise<QuerySummary> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/summary?${query.toString()}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }
  const data = (await response.json()) as QuerySummary
  return data
}

function FrequencyBreakdown({ data }: { data: QuerySummary }) {
  const resources = _.sortBy(data.countsByResource, (value) => -value.count)

  return (
    <InfoBox mb="md">
      <List listStyleType="none">
        <List.Item key={"total"}>{data.total} Treffer</List.Item>
        {resources.map(({ source, count }) => {
          return (
            <List.Item key={source}>
              <DisplayResource
                name={source}
                variant={"filled"}
                size="md"
                radius="sm"
                color="darkgreen"
                mr="md"
              />
              {count}
            </List.Item>
          )
        })}
      </List>
    </InfoBox>
  )
}

function DisplayHeadword({ headword }: { headword: Headword }) {
  return (
    <>
      {headword.lemma}
      {!!headword.index && <sup>{headword.index}</sup>}
    </>
  )
}

function LemmaPreview({
  lemmaData,
  setActiveLemmaId,
}: LemmaDispatch & { lemmaData: LemmaInfo }) {
  return (
    <UnstyledButton
      maw={"100%"}
      onClick={() => setActiveLemmaId(lemmaData["xml:id"])}
    >
      <InfoBox mb="sm">
        <Title order={4} fw={"600"} size="sm">
          <DisplayHeadword headword={lemmaData.headword} />
        </Title>
        <Text c="dimmed" size="sm">
          {lemmaData.mainSenses.map((sense, index) => (
            <React.Fragment key={index}>
              {index > 0 && "|"}
              {sense}
            </React.Fragment>
          ))}
        </Text>
      </InfoBox>
    </UnstyledButton>
  )
}

function DisplayQuerySummary({
  data,
  setActiveLemmaId,
}: LemmaDispatch & { data: QuerySummary }) {
  const lemmaGroups = data.lemmaGroups

  return (
    <>
      <Title order={3} size="sm">
        Lemmata
      </Title>
      <Accordion chevronPosition="left" defaultValue={lemmaGroups[0].lemma}>
        {lemmaGroups.map((group) => {
          const n = group.items.length

          return (
            <Accordion.Item
              key={group.lemma}
              value={group.lemma}
              style={{ borderBottom: "none" }}
            >
              <Accordion.Control>
                {group.lemma} {n > 1 && `[${n}]`}
              </Accordion.Control>
              <Accordion.Panel>
                {group.items.map((item) => (
                  <LemmaPreview
                    key={item["xml:id"]}
                    lemmaData={item}
                    setActiveLemmaId={setActiveLemmaId}
                  />
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </>
  )
}

function ResultMock() {
  return (
    <Stack gap="xs">
      <Skeleton height={150} />
      <Skeleton height={"1em"} w={"5em"} />
      <Skeleton height={"1em"} w={"10em"} />
      {_.times(3, (index) => (
        <Skeleton key={index} height={"5em"} />
      ))}
      {_.times(8, (index) => (
        <Skeleton key={index} height={"1em"} />
      ))}
    </Stack>
  )
}

export default function ResultSummary({ setActiveLemmaId }: LemmaDispatch) {
  const [searchParams] = useSearchParams()

  const { data, isFetching } = useQuery<QuerySummary>({
    queryKey: ["summary", searchParams.toString()],
    queryFn: () => search(searchParams),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    if (data && data.lemmaGroups.length > 0) {
      const firstLemma = data.lemmaGroups[0].items[0]
      setActiveLemmaId(firstLemma["xml:id"])
    } else {
      setActiveLemmaId(null)
    }
  }, [data, setActiveLemmaId])

  return isFetching ? (
    <ResultMock />
  ) : (
    data && (
      <>
        <FrequencyBreakdown data={data} />
        <DisplayQuerySummary data={data} setActiveLemmaId={setActiveLemmaId} />
      </>
    )
  )
}
