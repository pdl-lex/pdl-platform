import { useQuery } from "@tanstack/react-query"
import { IndexLetter, KeywordEntryList } from "../domain/Entry"
import { useState } from "react"
import { Anchor, Button, Group, List, Stack } from "@mantine/core"
import "./KeywordList.sass"
import classNames from "classnames"

const fetchKeywordList = async (
  letter: IndexLetter,
  page: number,
  itemsPerPage: number,
): Promise<KeywordEntryList> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/keywords/${encodeURIComponent(letter)}?page=${page}&results_per_page=${itemsPerPage}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as KeywordEntryList
}

function Keywords({ letter, page }: { letter: IndexLetter; page: number }) {
  const itemsPerPage = 20

  const { data, isFetching } = useQuery<KeywordEntryList>({
    queryKey: ["lemma-display", letter],
    queryFn: () => fetchKeywordList(letter, page, itemsPerPage),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })
  return isFetching ? (
    <>Loading...</>
  ) : (
    data && (
      <List listStyleType="none">
        {data.items.map(({ lemma, index }) => (
          <List.Item key={lemma}>
            <Anchor
              href={`/search?lemma=${encodeURIComponent(lemma)}`}
              className={"keyword-link"}
            >
              {lemma}
              {!!index && <sup>{index}</sup>}
            </Anchor>
          </List.Item>
        ))}
      </List>
    )
  )
}

export default function KeywordList() {
  const [activeLetter, setActiveLetter] = useState<IndexLetter>("A")
  const page = 1
  const options = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ-#") as IndexLetter[]

  return (
    <Stack>
      <Group gap={5}>
        {options.map((letter) => (
          <Button
            className={classNames("letter-button", {
              active: letter === activeLetter,
            })}
            key={letter}
            size={"xs"}
            radius={"xs"}
            value={letter}
            variant={"outline"}
            fz={"xs"}
            p={0}
            onClick={() => setActiveLetter(letter)}
          >
            {letter}
          </Button>
        ))}
      </Group>
      <Keywords letter={activeLetter} page={page} />
    </Stack>
  )
}
