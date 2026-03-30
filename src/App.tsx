import "@mantine/core/styles.css"
import { Alert, MantineProvider, Skeleton, Stack } from "@mantine/core"
import { theme } from "./theme"
import MainLayout from "./layout/MainLayout"
import { Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useMemo } from "react"
import Home from "./pages/Home"
import Dictionaries from "./pages/Dictionaries"
import SearchView from "./pages/SearchView"
import NotFound from "./pages/NotFound"
import Tools from "./pages/tools"
import MainText from "./layout/MainText"
import { useCmsCollection } from "./hooks/useCms"
import { IconAlertCircle } from "@tabler/icons-react"
import CmsPage from "./pages/CmsPage"
import toPathFromSlug from "./utils/toPathFromSlug"

const queryClient = new QueryClient()

export type AppRoute = {
  path: string
  Component: React.ComponentType
  title: string
}

const toplevelRoutes: AppRoute[] = [
  { path: "/search", Component: SearchView, title: "Suche" },
  { path: "/tools", Component: Tools, title: "Werkzeuge" },
  { path: "/dictionaries", Component: Dictionaries, title: "Wörterbücher" },
]

// sub-routes do not appear in the main menu
const staticSubRoutes: AppRoute[] = [
  { path: "/", Component: Home, title: "Startseite" },
]

const staticRoutes = [...toplevelRoutes, ...staticSubRoutes]

type CmsPage = {
  slug?: string | null
  title?: string | null
}

type CmsPageCollectionResponse = {
  docs?: CmsPage[]
}

type CmsRoute = {
  slug: string
  path: string
  title: string
}

function AppContent() {
  const { data, error, isLoading } = useCmsCollection<CmsPageCollectionResponse>(
    "pages",
    {
      fetchOptions: {
        limit: 200,
        depth: 0,
        draft: false,
      },
    },
  )

  const cmsRoutes = useMemo<CmsRoute[]>(() => {
    const reservedPaths = new Set(staticRoutes.map(({ path }) => path))
    const docs = data?.docs ?? []
    const mapped = docs
      .map((page) => {
        const slug = page.slug?.trim()
        if (!slug) return null

        const path = toPathFromSlug(slug)
        if (reservedPaths.has(path)) return null

        return {
          slug,
          path,
          title: page.title?.trim() || slug,
        }
      })
      .filter((route): route is CmsRoute => route !== null)

    return Array.from(
      new Map(mapped.map((route) => [route.path, route])).values(),
    )
  }, [data])

  return (
    <MainLayout routes={toplevelRoutes}>
      {error ? (
        <MainText>
          <Alert
            title="CMS-Seiten konnten nicht geladen werden"
            color="red"
            icon={<IconAlertCircle size={18} />}
            mb="lg"
          >
            {error.message}
          </Alert>
        </MainText>
      ) : null}

      <Routes>
        {staticRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {cmsRoutes.map(({ path, slug }) => (
          <Route key={path} path={path} element={<CmsPage slug={slug} />} />
        ))}

        <Route
          path="*"
          element={
            isLoading ? (
              <MainText>
                <Stack gap="md">
                  <Skeleton height={32} radius="md" width="40%" />
                  <Skeleton height={16} radius="md" />
                  <Skeleton height={16} radius="md" width="70%" />
                </Stack>
              </MainText>
            ) : (
              <NotFound />
            )
          }
        />
      </Routes>
    </MainLayout>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <AppContent />
      </MantineProvider>
    </QueryClientProvider>
  )
}
