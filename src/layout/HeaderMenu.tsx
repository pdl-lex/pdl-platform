import {
  ActionIcon,
  Burger,
  Drawer,
  Group,
  Indicator,
  Text,
  UnstyledButton,
} from "@mantine/core"
import { NavLink, useSearchParams } from "react-router-dom"
import classes from "./MainLayout.module.css"
import { AppRoute } from "../App"
import AdlLogo from "./AdlLogo"
import classNames from "classnames"
import { IconFilter2Search } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import ComplexSearchForm from "../ui/ComplexSearchForm"

export function HeaderMenu({
  routes,
  opened,
  toggle,
}: {
  routes: AppRoute[]
  opened: boolean
  toggle: () => void
}) {
  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false)

  const [searchParams] = useSearchParams()

  return (
    <Group h="100%" px="md">
      <Group
        justify="space-between"
        style={{ display: "flex", "flex-wrap": "nowrap", "flex-grow": "1" }}
      >
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
        <AdlLogo />
        <Group ml="xl" gap={0} visibleFrom="sm">
          {routes.map(({ path, title }) => (
            <UnstyledButton
              key={path}
              renderRoot={(props) => (
                <NavLink
                  {...props}
                  to={path}
                  className={({ isActive }) =>
                    classNames(
                      {
                        [classes.active]: isActive,
                      },
                      classes.control,
                      props.className
                    )
                  }
                />
              )}
            >
              {title}
            </UnstyledButton>
          ))}
        </Group>
        <ActionIcon
          style={{ color: "inherit" }}
          hiddenFrom="sm"
          size="lg"
          variant="subtle"
          aria-label="Settings"
          onClick={openFilters}
        >
          <Indicator offset={5} disabled={searchParams.size === 0} size={6}>
            <IconFilter2Search stroke={1.5} />
          </Indicator>
        </ActionIcon>
        <Drawer
          offset={8}
          title={
            <Text size="xl" fw="bold">
              Suchfilter
            </Text>
          }
          radius="md"
          size="lg"
          padding="lg"
          opened={filtersOpened}
          position={"top"}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          onClose={closeFilters}
        >
          <ComplexSearchForm onSubmit={closeFilters} />
        </Drawer>
      </Group>
    </Group>
  )
}
