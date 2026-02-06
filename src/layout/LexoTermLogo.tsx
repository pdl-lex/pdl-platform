import { Image, Text, UnstyledButton } from "@mantine/core"

export default function LexoTermLogo() {
  return (
    <UnstyledButton
      component="a"
      href="/"
      style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
    >
      <Image
        visibleFrom="sm"
        src={"/lexoterm_logo.svg"}
        alt="LexoTerm Logo"
        h="2.3em"
        w="auto"
        fit="contain"
      />
      <Text span fw={200} fz="35">
        LexoTerm
      </Text>
    </UnstyledButton>
  )
}
