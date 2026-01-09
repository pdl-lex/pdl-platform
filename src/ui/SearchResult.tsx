import {
  Badge,
  Box,
  Card,
  Loader,
  Stack,
  Title,
  Tooltip,
  Text,
  Group,
  Center,
  Pagination,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { NavLink, useSearchParams } from "react-router-dom"
import { DisplayEntry, DisplayEntryList } from "../domain/Entry"
import { ResourceKey, resources } from "../domain/Resource"
import classes from "./SearchResult.module.css"
import { IconExternalLink } from "@tabler/icons-react"
import DisplaySense from "./DisplaySense"
import React from "react"

const search = async (query: URLSearchParams): Promise<DisplayEntryList> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/search?${query.toString()}`
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }
  const data = (await response.json()) as DisplayEntryList
  return data
}

function DisplayResource({ name }: { name: ResourceKey }) {
  const resource = resources[name]
  return (
    <Tooltip label={resource.displayName}>
      <Badge variant="outline" size="xs" color={resource.color}>
        {resource.key.toUpperCase()}
      </Badge>
    </Tooltip>
  )
}

function DisplayGrammarInfo({ entry }: { entry: DisplayEntry }) {
  return (
    <Group mb="md" gap={5}>
      {entry.nPos && (
        <Badge size="xs" variant="default" radius="xs">
          {entry.nPos}
        </Badge>
      )}
      {entry.gender && (
        <Badge size="xs" variant="default" radius="xs">
          {entry.gender}
        </Badge>
      )}
    </Group>
  )
}

export function DisplayVariants({ variants }: { variants: string[] }) {
  return (
    variants.length > 0 && (
      <Text mb="md">
        Varianten:{" "}
        {variants.map((variant, index) => (
          <React.Fragment key={index}>
            <Text className={classes.variants} span>
              {variant}
            </Text>
            {index < variants.length - 1 ? "; " : ""}
          </React.Fragment>
        ))}
      </Text>
    )
  )
}

function EntryLink({ id }: { id: string }) {
  return (
    <NavLink className={classes.lemmalink} to={"/entry/" + id}>
      <IconExternalLink />
    </NavLink>
  )
}

export function EntryHeader({
  entry,
  children,
}: {
  entry: DisplayEntry
  children?: React.ReactNode
}) {
  const lemmaIndex = entry.headword.index
  return (
    <Stack gap={0}>
      <DisplayResource name={entry.source} />
      <Group gap={5} mb="xs">
        <Title mt={0} mb={0} order={2}>
          {entry.headword.lemma}
          {lemmaIndex !== null && <sup>{lemmaIndex}</sup>}
        </Title>
        {children}
      </Group>
      <DisplayGrammarInfo entry={entry} />
    </Stack>
  )
}

function ResultItem({ entry }: { entry: DisplayEntry }) {
  return (
    <Card shadow="md" padding="xl" className={classes["result-item"]}>
      <EntryHeader entry={entry}>
        <EntryLink id={entry["xml:id"]} />
      </EntryHeader>
      <DisplayVariants variants={entry.variants} />
      <DisplaySense senses={entry.sense} showExamples={false} />
    </Card>
  )
}

function ResultList({
  data,
  isLoading,
}: {
  data: DisplayEntryList | undefined
  isLoading: boolean
}) {
  return (
    <Stack>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          {data?.items.map((entry, index) => (
            <ResultItem key={index} entry={entry} />
          ))}
        </>
      )}
    </Stack>
  )
}

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isFetching } = useQuery<DisplayEntryList>({
    queryKey: ["search", searchParams.toString()],
    queryFn: () => search(searchParams),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString())
      return prev
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const total = data?.total || 0
  const pageCount = Math.ceil(total / (data?.itemsPerPage || 1))

  const pagination = (
    <Center>
      <Box>
        <Pagination
          total={pageCount}
          value={parseInt(searchParams.get("page") || "1", 10)}
          onChange={handlePageChange}
          withEdges
          mt="sm"
          w="100%"
        />
      </Box>
    </Center>
  )

  return (
    !!searchParams && (
      <Box maw="800px" mx="auto" py="xl" px="md">
        <Stack>
          <Center>{total.toLocaleString("de-DE")} Treffer</Center>
          {pagination}
          <ResultList data={data} isLoading={isFetching} />
          {pagination}
        </Stack>
      </Box>
    )
  )
}
