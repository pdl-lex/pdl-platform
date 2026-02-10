import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import PrimaryHeaderMenu from "./PrimaryHeaderMenu"
import { AppRoute } from "../App"
import SidebarMenu from "./SidebarMenu"
import Footer from "./Footer"

export const HEADER_HEIGHT = 70
const MAIN_MAX_WIDTH = "1440px"

export default function MainLayout({
  routes,
  children,
}: {
  routes: AppRoute[]
  children?: React.ReactNode
}) {
  const [opened, { toggle }] = useDisclosure()

  const outerSpacing = "md"

  return (
    <AppShell
      header={{
        height: `calc(${HEADER_HEIGHT}px + var(--mantine-spacing-${outerSpacing}))`,
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header withBorder={false} p={outerSpacing} pb={0}>
        <PrimaryHeaderMenu routes={routes} opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar py="md">
        <SidebarMenu routes={routes} />
      </AppShell.Navbar>

      <AppShell.Main maw={MAIN_MAX_WIDTH} mx={"auto"}>
        {children}
      </AppShell.Main>
      <Footer mainMaxWidth={MAIN_MAX_WIDTH} outerSpacing={outerSpacing} />
    </AppShell>
  )
}
