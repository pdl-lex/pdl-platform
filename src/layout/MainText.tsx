import { Box, Typography } from "@mantine/core"

export default function MainText({ children }: { children: React.ReactNode }) {
  return (
    <Box maw="800px" mx="auto" p="xl">
      <Typography>{children}</Typography>
    </Box>
  )
}
