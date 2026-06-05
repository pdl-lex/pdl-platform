import {
  ActionIcon,
  Affix,
  Text,
  Drawer,
  Grid,
  Stack,
  Indicator,
  alpha,
  useMantineTheme,
  Box,
} from "@mantine/core"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import ContentPanel from "../ui/ContentPanel"
import ResultSummary from "../ui/ResultSummary"
import LemmaDetail from "../ui/LemmaDetail"
import { useState } from "react"
import KeywordList from "../ui/KeywordList"
import { MENU_BREAKPOINT } from "../layout/MainLayout"
import { useDisclosure } from "@mantine/hooks"
import { IconFilter2Search } from "@tabler/icons-react"
import { useSearchParams } from "react-router-dom"

export default function SearchView() {
  const [activeLemmaId, setActiveLemmaId] = useState<string | null>(null)
  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false)
  const [searchParams] = useSearchParams()
  const theme = useMantineTheme()

  const leftColumn = (
    <>
      <ContentPanel title="Suche">
        <ComplexSearchForm />
      </ContentPanel>
      <ContentPanel title="Stichwortsuche">
        <KeywordList />
      </ContentPanel>
    </>
  )

  return (
    <Grid p={"md"} pt={"md"} mx={"auto"} gutter="xs">
      {
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Stack gap={"xs"}>
            <Box visibleFrom={MENU_BREAKPOINT}>{leftColumn}</Box>
            <Box hiddenFrom={MENU_BREAKPOINT}>
              {searchParams.size === 0 && leftColumn}
            </Box>
          </Stack>
        </Grid.Col>
      }
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <ResultSummary
          activeLemmaId={activeLemmaId}
          setActiveLemmaId={setActiveLemmaId}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        {!!activeLemmaId && (
          <ContentPanel title="Lemma">
            <LemmaDetail activeLemmaId={activeLemmaId} />
          </ContentPanel>
        )}
      </Grid.Col>
      {searchParams.size !== 0 && (
        <Affix position={{ bottom: 50, right: 50 }}>
          <ActionIcon
            hiddenFrom={MENU_BREAKPOINT}
            size="lg"
            variant={"gradient"}
            gradient={{
              deg: 90,
              from: "lexoterm-primary",
              to: alpha(theme.colors["lexoterm-primary"][0], 0.75),
            }}
            radius={"xl"}
            p={"lg"}
            aria-label="Settings"
            onClick={openFilters}
          >
            <Indicator
              offset={5}
              disabled={searchParams.size === 0}
              size={8}
              color={"lexoterm-secondary.0"}
            >
              <IconFilter2Search stroke={1.5} />
            </Indicator>
          </ActionIcon>
        </Affix>
      )}
      <Drawer
        offset={8}
        title={
          <Text size="xl" fw="bold">
            Suchfilter
          </Text>
        }
        radius="md"
        size="xl"
        padding="lg"
        opened={filtersOpened}
        position={"top"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        onClose={closeFilters}
      >
        <ComplexSearchForm onSubmit={closeFilters} />
      </Drawer>
    </Grid>
  )
}
