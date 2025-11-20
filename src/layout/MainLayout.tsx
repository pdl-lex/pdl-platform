import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { HeaderMenu } from "./HeaderMenu"
import { AppRoute } from "../App"
import SidebarMenu from "./SidebarMenu"

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
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMenu routes={routes} opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <SidebarMenu routes={routes} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
