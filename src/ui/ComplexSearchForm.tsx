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
import { Resource, ResourceKey, resources } from "../domain/Resource"
import _ from "lodash"
import { partsOfSpeech } from "../domain/PartOfSpeech"
import { IconSearch } from "@tabler/icons-react"
import { useEffect } from "react"

const resourceOptions = Object.values(resources).map(
  ({ key, displayName }) => `${key.toUpperCase()} | ${displayName}`
)

function getResourceByOption(option: string): Resource {
  const resource = _.find(resources, { displayName: option.split(" | ")[1] })
  if (!resource) {
    throw new Error(`Resource with name ${option} not found`)
  }
  return resource
}

interface SearchFormValues {
  q: string
  lemma: string
  resources: string[]
  pos: string
  npos: string
}

const defaultValues: SearchFormValues = {
  q: "",
  lemma: "",
  resources: resourceOptions,
  pos: "",
  npos: "",
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

  values.resources.map(getResourceByOption).forEach(({ key }) => {
    cleanParams.append("resources", key)
  })

  if (cleanParams.getAll("resources").length === resourceOptions.length) {
    cleanParams.delete("resources")
  }

  return cleanParams.toString()
}

function getCurrentResources(searchParams: URLSearchParams): string[] {
  const currentResources = searchParams
    .getAll("resources")
    .map((key) => resources[key as ResourceKey].displayName)

  return currentResources.length === 0 ? resourceOptions : currentResources
}

function getCurrentValues(searchParams: URLSearchParams): SearchFormValues {
  return {
    q: searchParams.get("q") || "",
    lemma: searchParams.get("lemma") || "",
    resources: getCurrentResources(searchParams),
    pos: searchParams.get("pos") || "",
    npos: searchParams.get("npos") || "",
  }
}

export default function FullSearchForm({
  onSubmit,
}: {
  onSubmit?: () => void
}) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const form = useForm<SearchFormValues>({
    mode: "uncontrolled",
    initialValues: getCurrentValues(searchParams),
    validate: {
      resources: (values) =>
        values.length < 1 ? "Mindestens ein Wörterbuch auswählen" : null,
    },
  })

  useEffect(() => {
    form.setValues(getCurrentValues(searchParams))
  }, [searchParams])

  const handleSubmit = (values: SearchFormValues) => {
    navigate(`/search?${createParams(values)}`)
    onSubmit?.()
  }

  function createClearButton(key: keyof SearchFormValues) {
    return (
      <>
        {!!form.getValues()[key] && (
          <CloseButton
            variant="transparent"
            size="sm"
            onClick={() => {
              form.setFieldValue(key, "")
            }}
          />
        )}
      </>
    )
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        <TextInput
          key={form.key("q")}
          label={"Freie Suche"}
          autoFocus
          placeholder="Lemma, Bedeutung, Beleg..."
          rightSection={createClearButton("q")}
          {...form.getInputProps("q")}
        />
        <TextInput
          key={form.key("lemma")}
          label={"Lemma"}
          placeholder={"Exaktes Lemma oder /regulärer Ausdruck/i"}
          rightSection={createClearButton("lemma")}
          {...form.getInputProps("lemma")}
        />
        <MultiSelect
          key={form.key("resources")}
          label={"Wörterbücher"}
          data={resourceOptions}
          placeholder={"Wörterbücher auswählen..."}
          searchable
          {...form.getInputProps("resources")}
        />
        <Fieldset legend="Wortart" variant="unstyled">
          <Stack gap="sm">
            <Select
              key={form.key("npos")}
              placeholder="Normalisiert"
              data={partsOfSpeech}
              searchable
              clearable
              {...form.getInputProps("npos")}
            />
            <TextInput
              key={form.key("pos")}
              placeholder="Original"
              {...form.getInputProps("pos")}
            />
          </Stack>
        </Fieldset>
        <Group justify="space-between">
          <Button onClick={() => form.setValues(defaultValues)} color="red">
            Filter zurücksetzen
          </Button>
          <Button type="submit" leftSection={<IconSearch size={16} />}>
            Suchen
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
