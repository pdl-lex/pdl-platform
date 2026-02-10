import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { QuerySummary, LemmaInfo } from "../domain/QuerySummary"
import InfoBox from "./InfoBox"
import { DisplayResource } from "./SearchResult"
import _ from "lodash"
import {
  List,
  Title,
  Text,
  Stack,
  Skeleton,
  UnstyledButton,
} from "@mantine/core"
import { Headword } from "../domain/Entry"
import React, { useEffect } from "react"
import classNames from "classnames"
import "./ResultSummary.sass"
import ContentPanel from "./ContentPanel"

type LemmaDispatch = {
  activeLemmaId: string | null
  setActiveLemmaId: React.Dispatch<React.SetStateAction<string | null>>
}

const search = async (query: URLSearchParams): Promise<QuerySummary> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/summary?${query.toString()}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }
  return (await response.json()) as QuerySummary
}

function FrequencyBreakdown({ data }: { data: QuerySummary }) {
  const resources = _.sortBy(data.countsByResource, (value) => -value.count)

  return (
    <InfoBox mb="md">
      <List listStyleType="none">
        <List.Item key={"total"}>
          {data.total.toLocaleString()} Treffer
        </List.Item>
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
              {count.toLocaleString()}
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

function LemmaListItem({
  lemma,
  activeLemmaId,
  setActiveLemmaId,
}: { lemma: LemmaInfo } & LemmaDispatch) {
  const posMapping: Map<string | null, string> = new Map([
    ["Substantiv", "Subst."],
  ])

  return (
    <List.Item
      mb={"0.5em"}
      pl={"0.2em"}
      className={classNames("lemma-list-item", {
        active: activeLemmaId === lemma.lexId,
      })}
    >
      <UnstyledButton onClick={() => setActiveLemmaId(lemma.lexId)}>
        <Text
          style={{ hyphens: "auto", textIndent: "-1em", paddingLeft: "1em" }}
          lineClamp={2}
          size="sm"
          span
        >
          <DisplayResource
            style={{ textIndent: 0, paddingLeft: "none" }}
            name={lemma.source}
            variant="default"
            radius="sm"
          />{" "}
          <Text span fw="bold">
            <DisplayHeadword headword={lemma.headword} />
          </Text>{" "}
          <Text
            c="dimmed"
            style={{ fontVariant: "small-caps", textTransform: "lowercase" }}
            span
            size="sm"
          >
            {posMapping.get(lemma.nPos) || lemma.nPos} {lemma.gender}{" "}
          </Text>
          <Text span size="sm">
            {lemma.mainSenses.length > 0 && (
              <>
                {" — "}
                {`${lemma.mainSenses.join(" | ")}`}
              </>
            )}
          </Text>
        </Text>
      </UnstyledButton>
    </List.Item>
  )
}

function DisplayResultSummary({
  data,
  activeLemmaId,
  setActiveLemmaId,
}: LemmaDispatch & { data: QuerySummary }) {
  return (
    <>
      {data.items.length > 0 && (
        <>
          <Title order={3} size="sm" mb="xs">
            Lemmata
          </Title>
          <List listStyleType="none">
            {data.items.map((lemma) => (
              <LemmaListItem
                key={lemma.lexId}
                lemma={lemma}
                activeLemmaId={activeLemmaId}
                setActiveLemmaId={setActiveLemmaId}
              />
            ))}
          </List>
        </>
      )}
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

export default function ResultSummary({
  activeLemmaId,
  setActiveLemmaId,
}: LemmaDispatch) {
  const [searchParams] = useSearchParams()

  const { data, isFetching } = useQuery<QuerySummary>({
    queryKey: ["summary", searchParams.toString()],
    queryFn: () => search(searchParams),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    enabled: searchParams.size > 0,
  })

  useEffect(() => {
    if (searchParams.size === 0) {
      setActiveLemmaId(null)
    } else if (data && data.items.length > 0) {
      const firstLemma = data.items[0]
      setActiveLemmaId(firstLemma.lexId)
    } else {
      setActiveLemmaId(null)
    }
  }, [data, setActiveLemmaId, searchParams])

  return isFetching ? (
    <ResultMock />
  ) : (
    data && (
      <ContentPanel title={"Treffer"}>
        <FrequencyBreakdown data={data} />
        <DisplayResultSummary
          data={data}
          activeLemmaId={activeLemmaId}
          setActiveLemmaId={setActiveLemmaId}
        />
      </ContentPanel>
    )
  )
}
