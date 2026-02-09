import { Group } from "@mantine/core"
import { HEADER_HEIGHT } from "./MainLayout"

export default function SecondaryHeaderMenu() {
  return (
    <Group
      h={HEADER_HEIGHT * 0.25}
      bg={"lexoterm-primary"}
      style={{ opacity: 0.75 }}
    ></Group>
  )
}
