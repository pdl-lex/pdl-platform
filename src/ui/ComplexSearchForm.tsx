import {
  Button,
  CloseButton,
  Group,
  MultiSelect,
  Stack,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resources } from "../domain/Resource"
import _ from "lodash"
import { useEffect, useMemo } from "react"

const resourceKeys = Object.keys(resources)
const resourceOptions = resourceKeys.map((key) => ({
  value: key,
  label: key.toUpperCase(),
}))

function setResources(queryParameters: URLSearchParams, resources: string[]) {
  const isDefaultSelection =
    resources.length === resourceKeys.length || resources.length === 0
  queryParameters.delete("resources")
  if (!isDefaultSelection) {
    resources.forEach((resourceKey: string) => {
      queryParameters.append("resources", resourceKey)
    })
  }
}

function getResources(queryParameters: URLSearchParams): string[] {
  const resources = queryParameters.getAll("resources")
  return resources.length > 0 ? resources : resourceKeys
}

export default function FullSearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""
  const currentResources = useMemo(
    () => getResources(searchParams),
    [searchParams]
  )

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      query: currentQuery,
      resources: currentResources,
    },
  })

  useEffect(() => {
    form.setValues({
      query: currentQuery,
      resources: currentResources,
    })
  }, [currentQuery, currentResources])

  const handleSubmit = (values: Record<string, any>) => {
    const queryParameters = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: values.query.trim(),
    })
    setResources(queryParameters, values.resources)

    navigate(`/search?${queryParameters.toString()}`)
  }

  const ClearButton = (
    <>
      {!!form.getValues().query && (
        <CloseButton
          variant="transparent"
          size="sm"
          onClick={() => {
            form.setFieldValue("query", "")
          }}
        />
      )}
    </>
  )

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="5">
        <TextInput
          key={form.key("query")}
          autoFocus
          flex={1}
          placeholder="Freie Suche..."
          rightSection={ClearButton}
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
