import { Button, Group, MultiSelect, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resources } from "../domain/Resource"
import _ from "lodash"

const resourceKeys = Object.keys(resources)
const resourceOptions = resourceKeys.map((key) => ({
  value: key,
  label: key.toUpperCase(),
}))

function setResources(queryParameters: URLSearchParams, resources: string[]) {
  const isDefaultSelection = resources.length === resourceKeys.length
  if (!isDefaultSelection) {
    resources.forEach((resourceKey: string) => {
      queryParameters.append("resources", resourceKey)
    })
  }
}

export default function FullSearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      query: currentQuery,
      resources: resourceKeys,
    },
  })

  const handleSubmit = (values: Record<string, any>) => {
    const queryParameters = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: values.query.trim(),
    })
    setResources(queryParameters, values.resources)

    navigate(`/search?${queryParameters.toString()}`)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="5">
        <TextInput
          key={form.key("query")}
          autoFocus
          flex={1}
          placeholder="Freie Suche..."
          {...form.getInputProps("query")}
        />
        <MultiSelect
          key={form.key("resources")}
          flex={1}
          label={"Wörterbücher"}
          data={resourceOptions}
          clearable
          searchable
          {...form.getInputProps("resources")}
        />
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Suchen</Button>
      </Group>
    </form>
  )
}
