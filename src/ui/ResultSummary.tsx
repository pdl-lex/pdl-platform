import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { QuerySummary, LemmaInfo } from "../domain/QuerySummary"
import InfoBox from "./InfoBox"
import { DisplayResource } from "./SearchResult"
import _ from "lodash"
import { Accordion, List, Title, Text, Stack, Skeleton } from "@mantine/core"
import { Headword } from "../domain/Entry"
import React from "react"

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

function LemmaQuicklook({ lemmaData }: { lemmaData: LemmaInfo }) {
  return (
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
  )
}

function DisplayLemmaPreview({ data }: { data: QuerySummary }) {
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
                  <LemmaQuicklook key={item["xml:id"]} lemmaData={item} />
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

export default function ResultSummary() {
  const [searchParams] = useSearchParams()

  const { data, isFetching } = useQuery<QuerySummary>({
    queryKey: ["summary", searchParams.toString()],
    queryFn: () => search(searchParams),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })

  return isFetching ? (
    <ResultMock />
  ) : (
    data && (
      <>
        <FrequencyBreakdown data={data} />
        <DisplayLemmaPreview data={data} />
      </>
    )
  )
}
