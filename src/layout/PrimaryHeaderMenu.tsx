import {
  Box,
  Burger,
  Flex,
  getGradient,
  Group,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core"
import { NavLink } from "react-router-dom"
import classes from "./MainLayout.module.css"
import { AppRoute } from "../App"
import LexoTermLogo from "./LexoTermLogo"
import classNames from "classnames"
import { HEADER_HEIGHT, MENU_BREAKPOINT } from "./MainLayout"

export default function PrimaryHeaderMenu({
  routes,
  opened,
  toggle,
}: {
  routes: AppRoute[]
  opened: boolean
  toggle: () => void
}) {
  const theme = useMantineTheme()

  return (
    <Box
      w={"100%"}
      bg={getGradient(
        { deg: 90, from: "lexoterm-brand", to: "lexoterm-gray" },
        theme,
      )}
      style={{ borderRadius: "5px" }}
    >
      <Flex
        h={HEADER_HEIGHT}
        px={"xl"}
        c="white"
        align={"center"}
        justify={"space-between"}
        wrap="nowrap"
        maw={"1440px"}
        mx="auto"
      >
        <LexoTermLogo />
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom={MENU_BREAKPOINT}
          size="md"
          color="white"
        />
        <Group ml="xl" gap={0} visibleFrom={MENU_BREAKPOINT}>
          {routes.map(({ path, title }) => (
            <UnstyledButton
              key={path}
              bg="inherit"
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
                      props.className,
                    )
                  }
                />
              )}
            >
              {title}
            </UnstyledButton>
          ))}
        </Group>
      </Flex>
    </Box>
  )
}
