import {
  Button,
  CloseButton,
  Fieldset,
  Group,
  MultiSelect,
  Select,
  Stack,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resources } from "../domain/Resource"
import _ from "lodash"
import { partsOfSpeech } from "../domain/PartOfSpeech"

const resourceKeys = Object.keys(resources)
const resourceOptions = resourceKeys.map((key) => ({
  value: key,
  label: key.toUpperCase(),
}))

interface SearchFormValues {
  q: string
  resources: string[]
  pos: string
  npos: string
}

function createParams(values: SearchFormValues): string {
  const cleanParams = new URLSearchParams()

  _(values)
    .omit("resources")
    .forEach((value: any, key: string) => {
      if (value) {
        cleanParams.set(key, value)
      } else {
        cleanParams.delete(key)
      }
    })

  values.resources.forEach((key: string) => {
    cleanParams.append("resources", key)
  })

  if (cleanParams.getAll("resources").length === resourceKeys.length) {
    cleanParams.delete("resources")
  }

  return cleanParams.toString()
}

export default function FullSearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""

  const pos = searchParams.get("pos") || ""
  const npos = searchParams.get("npos") || ""

  const form = useForm<SearchFormValues>({
    mode: "uncontrolled",
    initialValues: {
      q: currentQuery,
      resources:
        _.find(
          [searchParams.getAll("resources"), resourceKeys],
          (list) => list.length > 0
        ) || [],
      pos: pos,
      npos: npos,
    },
    validate: {
      resources: (values) =>
        values.length < 1 ? "Mindestens ein Wörterbuch auswählen" : null,
    },
  })

  const handleSubmit = (values: SearchFormValues) => {
    navigate(`/search?${createParams(values)}`)
  }

  const ClearButton = (
    <>
      {!!form.getValues().q && (
        <CloseButton
          variant="transparent"
          size="sm"
          onClick={() => {
            form.setFieldValue("q", "")
          }}
        />
      )}
    </>
  )

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="5">
        <TextInput
          key={form.key("q")}
          autoFocus
          flex={1}
          placeholder="Freie Suche..."
          rightSection={ClearButton}
          {...form.getInputProps("q")}
        />
        <MultiSelect
          key={form.key("resources")}
          flex={1}
          label={"Wörterbücher"}
          data={resourceOptions}
          placeholder={"Wörterbücher auswählen"}
          clearable
          searchable
          {...form.getInputProps("resources")}
        />
        <Fieldset legend="Wortart">
          <Stack gap="5">
            <Select
              key={form.key("npos")}
              placeholder="Normalisiert"
              data={partsOfSpeech}
              searchable
              clearable
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
