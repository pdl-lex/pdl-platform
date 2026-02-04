import { Card, CardProps, Title } from "@mantine/core"

interface ContentPanelProps extends CardProps {
  title?: string
}

export default function ContentPanel({
  title,
  children,
  ...props
}: ContentPanelProps) {
  return (
    <Card {...props} withBorder>
      {title && (
        <Title
          order={2}
          fw={300}
          size="h3"
          mb="md"
          style={{ textTransform: "uppercase" }}
        >
          {title}
        </Title>
      )}
      {children}
    </Card>
  )
}
