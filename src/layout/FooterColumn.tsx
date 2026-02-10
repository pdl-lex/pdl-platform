import { Box, BoxProps, Title, TitleProps, Typography } from "@mantine/core"

interface FooterColumnProps extends BoxProps {
  children?: React.ReactNode
}

function FooterColumn({ children, ...props }: FooterColumnProps) {
  return <Box {...props}>{children}</Box>
}

function FooterColumnTitle({ children, ...props }: TitleProps) {
  return (
    <Title order={4} size="h5" pb={"md"} {...props}>
      {children}
    </Title>
  )
}

function FooterColumnContent({ children, ...props }: FooterColumnProps) {
  return (
    <Box {...props}>
      <Typography fz={"sm"} pb={"lg"} style={{ hyphens: "auto" }}>
        {children}
      </Typography>
    </Box>
  )
}

FooterColumn.Title = FooterColumnTitle
FooterColumn.Content = FooterColumnContent

export { FooterColumn }
