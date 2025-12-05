import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import { theme } from "./theme"
import MainLayout from "./layout/MainLayout"
import { Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import About from "./pages/About"
import Corpora from "./pages/Corpora"
import Dictionaries from "./pages/Dictionaries"
import Lab from "./pages/Lab"
import SearchDisplay from "./pages/SearchDisplay"
import Article from "./pages/Article"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

export type AppRoute = {
  path: string
  Component: React.ComponentType
  title: string
}

const toplevelRoutes: AppRoute[] = [
  { path: "/", Component: Home, title: "Startseite" },
  { path: "/search", Component: SearchDisplay, title: "Suche" },
  { path: "/dictionaries", Component: Dictionaries, title: "Wörterbücher" },
  { path: "/corpora", Component: Corpora, title: "Korpora" },
  { path: "/lab", Component: Lab, title: "Lab" },
  { path: "/about", Component: About, title: "Über" },
]

const subRoutes: AppRoute[] = [
  { path: "/search/lemma/:id", Component: Article, title: "Suche" },
]

const routes = [...toplevelRoutes, ...subRoutes]

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <MainLayout routes={toplevelRoutes}>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </MantineProvider>
    </QueryClientProvider>
  )
}
