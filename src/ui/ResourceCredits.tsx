import { Center, Loader, Table } from "@mantine/core"
import { ResourceKey } from "../domain/Resource"
import { useCmsCollection } from "../hooks/useCms"
import CmsRichText from "./CmsRichText"
import CmsDictionary from "../domain/CmsDictionary"
import "./ResourceCredits.sass"

interface CreditTableData {
  title: string
  contents: React.ReactNode
}

export default function ResourceCredits({
  resource,
}: {
  resource: ResourceKey
}) {
  const { data, error, isLoading } = useCmsCollection<{
    docs?: CmsDictionary[]
  }>("resources", {
    fetchOptions: { ["where[shortName][equals]"]: resource.toUpperCase() },
  })

  const doc = data?.docs?.[0]

  const tableData: CreditTableData[] = doc
    ? [
        { title: "Titel", contents: doc.name },
        {
          title: "Herausgeber",
          contents: doc.credits && (
            <CmsRichText data={doc.credits} className={"credits-text"} />
          ),
        },
        {
          title: "Lizenz",
          contents: doc.license && (
            <CmsRichText data={doc.license} className={"credits-text"} />
          ),
        },
      ]
    : []
  return (
    <>
      {isLoading ? (
        <Center>
          <Loader size={"sm"} color={"lexoterm-primary"} />
        </Center>
      ) : error ? (
        <>error</>
      ) : (
        !!doc && (
          <Table className={"credits-table"} withRowBorders={false}>
            <Table.Tbody>
              {tableData
                .filter(({ contents }) => !!contents)
                .map(({ title, contents }, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{title}</Table.Td>
                    <Table.Td>{contents}</Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        )
      )}
    </>
  )
}
