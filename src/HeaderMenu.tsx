import { Burger, Group, UnstyledButton } from "@mantine/core"
import classes from "./MainLayout.module.css"

export function HeaderMenu({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) {
  return (
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Group justify="space-between" style={{ flex: 1 }}>
        Header
        <Group ml="xl" gap={0} visibleFrom="sm">
          <UnstyledButton className={classes.control}>Home</UnstyledButton>
          <UnstyledButton className={classes.control}>Blog</UnstyledButton>
          <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
          <UnstyledButton className={classes.control}>Support</UnstyledButton>
        </Group>
      </Group>
    </Group>
  )
}
