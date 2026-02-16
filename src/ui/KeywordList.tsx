import { useQuery } from "@tanstack/react-query"
import { IndexLetter, KeywordEntryList } from "../domain/Entry"
import { useState } from "react"
import { Anchor, Button, Group, List, Pagination, Stack } from "@mantine/core"
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

function Keywords({ letter }: { letter: IndexLetter }) {
  const itemsPerPage = 20
  const [page, setPage] = useState<number>(1)

  const { data, isFetching } = useQuery<KeywordEntryList>({
    queryKey: ["lemma-display", letter, page],
    queryFn: () => fetchKeywordList(letter, page, itemsPerPage),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })

  return isFetching ? (
    <>Loading...</>
  ) : (
    data && (
      <Stack>
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
        <Pagination
          value={page}
          total={Math.ceil(data.total / itemsPerPage)}
          onChange={setPage}
          className={"result-summary-pagination"}
          size={"xs"}
          radius={"xs"}
        />
      </Stack>
    )
  )
}

export default function KeywordList() {
  const [activeLetter, setActiveLetter] = useState<IndexLetter>("A")

  const letters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ-#") as IndexLetter[]

  return (
    <Stack>
      <Group gap={5}>
        {letters.map((letter) => (
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
      <Keywords letter={activeLetter} />
    </Stack>
  )
}
