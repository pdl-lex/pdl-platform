import { Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Entry, Sense } from "../domain/Entry"
import { JSX } from "react"
import _ from "lodash"

const searchLemma = async (query: string): Promise<any> => {
  const response = await fetch(`/api/lemma/${query}`)
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }
  return response.json()
}

function DisplaySense({ sense }: { sense?: Sense[] }): JSX.Element {
  return sense ? (
    <ul>
      {sense.map((s, index) => (
        <li key={index}>
          <span>
            {s.n && <strong>{s.n}.</strong>} {s.def}
          </span>
          {_.isArray(s.sense) && <DisplaySense sense={s.sense} />}
        </li>
      ))}
    </ul>
  ) : (
    <></>
  )
}

function DisplayEntry({ entry }: { entry: Entry }): JSX.Element {
  return (
    <>
      <p>
        {entry.form?.orth}, {entry.gramGrp?.gram.pos} (
        {entry.gramGrp?.gram.gender}).
      </p>
      <DisplaySense sense={entry.sense} />
    </>
  )
}

export default function SearchDisplay() {
  const query = "beißen1"
  const { data, isLoading, error } = useQuery<Entry>({
    queryKey: ["search", query],
    queryFn: () => searchLemma(query),
    enabled: !!query,
  })
  return (
    <>
      <h1>Search Page</h1>
      <section>
        {isLoading ? <Loader /> : <>{data && <DisplayEntry entry={data} />} </>}
      </section>
    </>
  )
}
