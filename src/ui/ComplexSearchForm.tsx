import {
  ActionIcon,
  Button,
  Card,
  Center,
  CloseButton,
  Collapse,
  Fieldset,
  MultiSelect,
  Select,
  Space,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getResourceByName, ResourceKey, resources } from "../domain/Resource"
import _ from "lodash"
import { partsOfSpeech } from "../domain/PartOfSpeech"
import { useDisclosure } from "@mantine/hooks"
import {
  IconAdjustments,
  IconAdjustmentsX,
  IconSearch,
} from "@tabler/icons-react"

const resourceOptions = Object.values(resources).map(
  ({ key, displayName }) => `${key.toUpperCase()} | ${displayName}`
)

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

  values.resources.map(getResourceByName).forEach(({ key }) => {
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

export default function FullSearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""

  const [opened, { toggle }] = useDisclosure(true)

  const form = useForm<SearchFormValues>({
    mode: "uncontrolled",
    initialValues: {
      q: currentQuery,
      lemma: searchParams.get("lemma") || "",
      resources: getCurrentResources(searchParams),
      pos: searchParams.get("pos") || "",
      npos: searchParams.get("npos") || "",
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

  const FilterButton = (
    <Tooltip label={opened ? "Filter verbergen" : "Filter anzeigen"}>
      <ActionIcon onClick={toggle} variant="transparent">
        {opened ? (
          <IconAdjustmentsX size={16} />
        ) : (
          <IconAdjustments size={16} />
        )}
      </ActionIcon>
    </Tooltip>
  )

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="sm">
        <TextInput
          key={form.key("q")}
          autoFocus
          flex={1}
          placeholder="Freie Suche..."
          leftSection={FilterButton}
          rightSection={ClearButton}
          {...form.getInputProps("q")}
        />
        <Collapse in={opened}>
          <Card withBorder px={"lg"}>
            <TextInput
              key={form.key("lemma")}
              label={"Lemma"}
              placeholder={"Exaktes Lemma oder /regulärer Ausdruck/i"}
              {...form.getInputProps("lemma")}
            />
            <Space h="md" />
            <MultiSelect
              key={form.key("resources")}
              label={"Wörterbücher"}
              data={resourceOptions}
              placeholder={"Wörterbücher auswählen..."}
              clearable
              searchable
              {...form.getInputProps("resources")}
            />
            <Space h="md" />
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
            <Space h="md" />
            <Button
              style={{ alignSelf: "flex-start" }}
              onClick={() => form.setValues(defaultValues)}
              color="red"
            >
              Filter löschen
            </Button>
          </Card>
        </Collapse>
      </Stack>

      <Center mt="md">
        <Button type="submit" leftSection={<IconSearch size={16} />}>
          Suchen
        </Button>
      </Center>
    </form>
  )
}
