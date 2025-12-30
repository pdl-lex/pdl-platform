import {
  Button,
  CloseButton,
  Fieldset,
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

function setURLParams(params: URLSearchParams, values: Record<string, any>) {
  const cleanParams = new URLSearchParams(
    _.pick(Object.fromEntries(params.entries()), ["page", "q"])
  )

  _(values)
    .omit("resources")
    .forEach((value: any, key: string) => {
      if (value) {
        cleanParams.set(key, value)
      } else {
        params.delete(key)
      }
    })

  const resources: string[] = _.uniq(values.resources) || []

  if (resources.length > 0 && resources.length < resourceKeys.length) {
    resources.forEach((key: string) => {
      cleanParams.append("resources", key)
    })
  }

  return cleanParams
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
  const pos = searchParams.get("pos") || ""
  const npos = searchParams.get("npos") || ""

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      query: currentQuery,
      resources: currentResources,
      pos: pos,
      npos: npos,
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

    const params = setURLParams(queryParameters, values)

    navigate(`/search?${params.toString()}`)
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
        <Fieldset legend="Wortart">
          <Stack gap="5">
            <TextInput
              key={form.key("npos")}
              placeholder="Normalisiert"
              flex={1}
              {...form.getInputProps("npos")}
            />
            <TextInput
              key={form.key("pos")}
              placeholder="Original"
              flex={1}
              {...form.getInputProps("pos")}
            />
          </Stack>
        </Fieldset>
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Suchen</Button>
      </Group>
    </form>
  )
}
