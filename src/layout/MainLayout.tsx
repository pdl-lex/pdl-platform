import { AppShell, Box, Group, Image, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import PrimaryHeaderMenu from "./PrimaryHeaderMenu"
import { AppRoute } from "../App"
import SidebarMenu from "./SidebarMenu"
import SecondaryHeaderMenu from "./SecondaryHeaderMenu"

export const HEADER_HEIGHT = 160

export default function MainLayout({
  routes,
  children,
}: {
  routes: AppRoute[]
  children?: React.ReactNode
}) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header withBorder={false} p={0}>
        <Group gap={0} w={"100%"} justify="space-between">
          <Stack p={0} gap={0} style={{ flex: 1 }}>
            <PrimaryHeaderMenu
              routes={routes}
              opened={opened}
              toggle={toggle}
            />
            <SecondaryHeaderMenu />
          </Stack>
          <Box style={{ flexShrink: 0 }} visibleFrom="md">
            <Image src="/header_waves.svg" h={HEADER_HEIGHT} w="auto" />
          </Box>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md">
        <SidebarMenu routes={routes} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
