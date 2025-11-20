import {
  Image,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core"

export default function AdlLogo() {
  const { colorScheme } = useMantineColorScheme()
  const src = colorScheme === "dark" ? "/logo_dark.svg" : "/logo_light.svg"
  return (
    <UnstyledButton
      component="a"
      href="/"
      style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
    >
      <Image src={src} alt="ADL Logo" h="2em" w="auto" fit="contain" />
      <Text span fw={500}>
        ADL
      </Text>
    </UnstyledButton>
  )
}
