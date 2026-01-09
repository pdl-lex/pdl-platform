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
  Button,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { NavLink, useSearchParams } from "react-router-dom"
import { DisplayEntry, DisplayEntryList } from "../domain/Entry"
import { ResourceKey, resources } from "../domain/Resource"
import classes from "./SearchResult.module.css"
import { IconArrowUp, IconExternalLink } from "@tabler/icons-react"
import DisplaySense from "./DisplaySense"
import React from "react"
import { HEADER_HEIGHT } from "../layout/MainLayout"

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
    <Card
      withBorder
      shadow="sm"
      padding="xl"
      className={classes["result-item"]}
      miw="100%"
    >
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
    <Stack gap={"xl"} mih={"100vh"}>
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

  const backToTopButton = (
    <Center>
      <Box>
        <Button
          variant="light"
          leftSection={<IconArrowUp size={14} />}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Zum Seitenanfang
        </Button>
      </Box>
    </Center>
  )

  return (
    !!searchParams && (
      <Stack p={0}>
        <Stack
          p="xl"
          style={{ position: "sticky", top: HEADER_HEIGHT, zIndex: 1 }}
          gap={5}
          bg="white"
        >
          <Center>{total.toLocaleString("de-DE")} Treffer</Center>
          {pagination}
        </Stack>
        <Stack maw="800px" w="100%" mx="auto" gap="xl" p="xl">
          <ResultList data={data} isLoading={isFetching} />
          {backToTopButton}
        </Stack>
      </Stack>
    )
  )
}
