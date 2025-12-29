import { Box, Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { DisplayEntry } from "../domain/Entry"
import _ from "lodash"
import LemmaDisplay, { LemmaNotFound } from "../ui/LemmaDisplay"
import { useParams } from "react-router-dom"

const fetchLemma = async (query?: string): Promise<DisplayEntry> => {
  if (!query) {
    throw new Error(`HTTP error status: 400`)
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/lemma-display/${query}`)
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export default function Article() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<DisplayEntry>({
    queryKey: ["search", id],
    queryFn: () => fetchLemma(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  const isEmpty = _.isEmpty(data) || _.has(data, "error")

  return (
    <Box maw="800px" mx="auto" py="xl" px="md">
      {isLoading ? (
        <Loader />
      ) : (
        <>{isEmpty ? <LemmaNotFound /> : <LemmaDisplay entry={data} />} </>
      )}
    </Box>
  )
}
