import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import { theme } from "./theme"
import MainLayout from "./MainLayout"

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <MainLayout />
    </MantineProvider>
  )
}
