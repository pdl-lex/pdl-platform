import { Image, UnstyledButton } from "@mantine/core"

export default function BadwLogo() {
  return (
    <UnstyledButton component="a" href="/" rel="noopener noreferrer">
      <Image
        src={"/badw_logo_black.svg"}
        alt="Logo der Bayerischen Akademie der Wissenschaften"
        h="auto"
        w="100%"
      />
    </UnstyledButton>
  )
}
