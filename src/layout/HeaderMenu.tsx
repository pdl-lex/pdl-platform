import { ActionIcon, Burger, Group, UnstyledButton } from "@mantine/core"
import { NavLink } from "react-router-dom"
import classes from "./MainLayout.module.css"
import { AppRoute } from "../App"
import AdlLogo from "./AdlLogo"
import classNames from "classnames"
import { IconFilter2Search } from "@tabler/icons-react"

export function HeaderMenu({
  routes,
  opened,
  toggle,
}: {
  routes: AppRoute[]
  opened: boolean
  toggle: () => void
}) {
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
        >
          <IconFilter2Search size="lg" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  )
}
