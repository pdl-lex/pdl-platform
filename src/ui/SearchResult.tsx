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
  Modal,
  ActionIcon,
  Affix,
  Transition,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { useSearchParams } from "react-router-dom"
import { DisplayEntry, DisplayEntryList } from "../domain/Entry"
import { ResourceKey, resources } from "../domain/Resource"
import classes from "./SearchResult.module.css"
import { IconArrowUp, IconBook } from "@tabler/icons-react"
import DisplaySense from "./DisplaySense"
import React from "react"
import { HEADER_HEIGHT } from "../layout/MainLayout"
import { useDisclosure, useWindowScroll } from "@mantine/hooks"
import SearchExamples from "./SearchExamples"

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
        <Group gap={0} align={"baseline"}>
          <Title mt={0} mb={0} order={2}>
            {entry.headword.lemma}
            {lemmaIndex !== null && <sup>{lemmaIndex}</sup>}
          </Title>
          {children}
        </Group>
      </Group>
      <DisplayGrammarInfo entry={entry} />
    </Stack>
  )
}

function ResultItem({ entry }: { entry: DisplayEntry }) {
  const [opened, { open, close }] = useDisclosure(false)
  const overlay = (
    <Modal
      opened={opened}
      transitionProps={{ transition: "fade-down", duration: 300 }}
      size={"xl"}
      padding={"lg"}
      title={
        <>
          <EntryHeader entry={entry} />
          <Text color="dimmed" pb={0} size="xs">
            <code>ID: {entry["xml:id"]}</code>
          </Text>
        </>
      }
      onClose={close}
      centered
      styles={{
        header: {
          alignItems: "flex-start",
          borderBottom: "1px solid var(--mantine-color-gray-3)",
        },
      }}
    >
      <Stack py={"md"}>
        <DisplayVariants variants={entry.variants} />
        {!!entry.sense && <DisplaySense senses={entry.sense} />}
      </Stack>
    </Modal>
  )
  return (
    <Card
      withBorder
      shadow="sm"
      padding="xl"
      className={classes["result-item"]}
      miw="100%"
    >
      {overlay}
      <EntryHeader entry={entry}>
        <Tooltip label={"Vollständigen Eintrag anzeigen"}>
          <ActionIcon variant="subtle" color="gray">
            <IconBook size={16} onClick={open} />
          </ActionIcon>
        </Tooltip>
      </EntryHeader>
      <DisplayVariants variants={entry.variants} />
      {!!entry.sense && (
        <DisplaySense senses={entry.sense} maxSensesToShow={10} />
      )}
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
  const [scroll, scrollTo] = useWindowScroll()

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
    <Affix position={{ bottom: 32, right: 32 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftSection={<IconArrowUp size={14} />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            Zum Seitenanfang
          </Button>
        )}
      </Transition>
    </Affix>
  )
  return searchParams.size > 0 ? (
    <Stack p={0}>
      <Stack
        p="xl"
        style={{ position: "sticky", top: HEADER_HEIGHT, zIndex: 1 }}
        gap={5}
        bg="white"
      >
        {!!data && <Center>{total.toLocaleString("de-DE")} Treffer</Center>}
        {pagination}
      </Stack>
      <Stack maw="800px" w="100%" mx="auto" gap="xl" p="xl">
        <ResultList data={data} isLoading={isFetching} />
        {backToTopButton}
      </Stack>
    </Stack>
  ) : (
    <Box mih={"120vh"}>
      <SearchExamples />
    </Box>
  )
}
