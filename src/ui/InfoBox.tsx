import { Card, CardProps } from "@mantine/core"

export default function InfoBox({ children, ...props }: CardProps) {
  return (
    <Card {...props} withBorder bg={"#EEEEEE"}>
      {children}
    </Card>
  )
}
