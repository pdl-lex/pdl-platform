import {
  alpha,
  Button,
  Group,
  MultiSelect,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core"
import { useForm } from "@mantine/form"

const tagOptions = [
  {
    label: "VIS | Visualisierung",
    value: "VIS",
  },
  {
    label: "KLT | Korpuslinguistik und Textanalyse",
    value: "KLT",
  },
]

export default function ToolSearchForm() {
  const theme = useMantineTheme()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { tags: [], tool: "", author: "" },
  })

  return (
    <form>
      <Stack>
        <TextInput
          key={form.key("tool")}
          label={"Werkzeug"}
          autoFocus
          placeholder="Name, Beschreibung"
          {...form.getInputProps("tool")}
        />
        <TextInput
          key={form.key("author")}
          label={"Autor:innen"}
          autoFocus
          placeholder="Autor:innen, Urheber:innen, Institutionen"
          {...form.getInputProps("author")}
        />
        <MultiSelect
          key={form.key("tags")}
          label={"Kategorien"}
          data={tagOptions}
          placeholder={"Suche"}
          searchable
          {...form.getInputProps("tags")}
        />
        <Group>
          <Button
            variant="gradient"
            gradient={{
              deg: 90,
              from: "lexoterm-secondary",
              to: alpha(theme.colors["lexoterm-secondary"][0], 0.75),
            }}
          >
            Zurücksetzen
          </Button>
          <Button
            type="submit"
            variant="gradient"
            gradient={{
              deg: 90,
              from: "lexoterm-primary",
              to: alpha(theme.colors["lexoterm-primary"][0], 0.75),
            }}
          >
            Suchen
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
