import {
  ActionIcon,
  Burger,
  Drawer,
  Flex,
  getGradient,
  Group,
  Indicator,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core"
import { NavLink, useSearchParams } from "react-router-dom"
import classes from "./MainLayout.module.css"
import { AppRoute } from "../App"
import LexoTermLogo from "./LexoTermLogo"
import classNames from "classnames"
import { IconFilter2Search } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import { HEADER_HEIGHT } from "./MainLayout"

export default function PrimaryHeaderMenu({
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
  const theme = useMantineTheme()

  return (
    <Flex
      h={HEADER_HEIGHT}
      px={"xl"}
      bg={getGradient(
        { deg: 90, from: "lexoterm-primary.9", to: "#222222" },
        theme,
      )}
      style={{ borderRadius: "5px" }}
      m="md"
      c="white"
      align={"center"}
      justify={"space-between"}
      wrap="nowrap"
    >
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="md"
        color="white"
      />
      <LexoTermLogo />
      <Group ml="xl" gap={0} visibleFrom="sm">
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
    </Flex>
  )
}
