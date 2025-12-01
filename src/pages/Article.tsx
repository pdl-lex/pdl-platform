import { Box, Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Entry } from "../domain/Entry"
import _ from "lodash"
import LemmaDisplay, { LemmaNotFound } from "../ui/LemmaDisplay"
import { useParams } from "react-router-dom"

const searchLemma = async (query?: string): Promise<any> => {
  if (!query) {
    throw new Error(`HTTP error status: 400`)
  }
  const response = await fetch(`/api/lemma/${query}`)
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }
  return response.json()
}

export default function SearchDisplay() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Entry>({
    queryKey: ["search", id],
    queryFn: () => searchLemma(id),
    enabled: !!id,
  })

  return (
    <Box maw="800px" mx="auto" py="xl" px="md">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {_.isEmpty(data) ? <LemmaNotFound /> : <LemmaDisplay entry={data} />}{" "}
        </>
      )}
    </Box>
  )
}
