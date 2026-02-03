import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import PrimaryHeaderMenu from "./PrimaryHeaderMenu"
import { AppRoute } from "../App"
import SidebarMenu from "./SidebarMenu"
import SecondaryHeaderMenu from "./SecondaryHeaderMenu"

export const HEADER_HEIGHT = 150

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
        <PrimaryHeaderMenu routes={routes} opened={opened} toggle={toggle} />
        <SecondaryHeaderMenu />
      </AppShell.Header>

      <AppShell.Navbar py="md">
        <SidebarMenu routes={routes} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
