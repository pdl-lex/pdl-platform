import "@mantine/core/styles.css"
import { MantineProvider, Text } from "@mantine/core"
import { theme } from "./theme"
import MainLayout from "./MainLayout"

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <MainLayout>
        <Text>This is the main section, your app content here.</Text>
        <Text>
          Layout used in most cases – Navbar and Header with fixed position
        </Text>
      </MainLayout>
    </MantineProvider> 
  )
}
