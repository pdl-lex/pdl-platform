import { alpha, Button, Group, Stack, useMantineTheme } from "@mantine/core"

export default function ToolSearchForm() {
  const theme = useMantineTheme()
  return (
    <form>
      <Stack>
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
