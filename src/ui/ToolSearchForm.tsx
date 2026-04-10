import {
  Alert,
  alpha,
  Button,
  Group,
  MultiSelect,
  Skeleton,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import { useCmsCollection } from "../hooks/useCms"
import { Tag } from "../domain/Tool"
import { IconAlertCircle } from "@tabler/icons-react"

interface TagOption {
  label: string
  value: string
}

interface ToolSearchFormValues {
  tags: TagOption[]
  tool: string
  author: string
}

function TagSelect({
  form,
}: {
  form: UseFormReturnType<
    ToolSearchFormValues,
    (values: ToolSearchFormValues) => ToolSearchFormValues
  >
}) {
  const { data, isLoading, error } = useCmsCollection<{
    docs?: Tag[]
  }>("tags")

  const options: TagOption[] = data?.docs
    ? data.docs.map((item) => ({
        label: `${item.short} | ${item.name}`,
        value: item.short,
      }))
    : []

  return isLoading ? (
    <Skeleton width={"100%"} height={"2em"} />
  ) : error ? (
    <Alert
      title="Kategorien konnten nicht geladen werden"
      color="red"
      icon={<IconAlertCircle size={18} />}
    />
  ) : (
    <MultiSelect
      key={form.key("tags")}
      label={"Kategorien"}
      data={options}
      placeholder={"Suche"}
      searchable
      {...form.getInputProps("tags")}
    />
  )
}

export default function ToolSearchForm() {
  const theme = useMantineTheme()

  const form = useForm<ToolSearchFormValues>({
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
        <TagSelect form={form} />
        {/* <MultiSelect
          key={form.key("tags")}
          label={"Kategorien"}
          data={tagOptions}
          placeholder={"Suche"}
          searchable
          {...form.getInputProps("tags")}
        /> */}
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
