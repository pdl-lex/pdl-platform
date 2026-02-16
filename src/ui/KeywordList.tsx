import { useQuery } from "@tanstack/react-query"
import { IndexLetter, KeywordEntryList } from "../domain/Entry"

const fetchKeywordList = async (
  letter: IndexLetter,
): Promise<KeywordEntryList> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/keywords/${letter}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return (await response.json()) as KeywordEntryList
}

export default function KeywordList() {
  const letter = "A"
  const { data, isFetching } = useQuery<KeywordEntryList>({
    queryKey: ["lemma-display", letter],
    queryFn: () => fetchKeywordList(letter),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  })
  return isFetching ? (
    <>Loading...</>
  ) : (
    data && (
      <ul>
        {data.items.map(({ lemma, index }) => (
          <li key={lemma}>
            {lemma}
            {!!index && <sup>{index}</sup>}
          </li>
        ))}
      </ul>
    )
  )
}
