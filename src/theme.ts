import { createTheme } from "@mantine/core"

export const theme = createTheme({
  components: {
    Anchor: {
      defaultProps: {
        c: "inherit",
        underline: "always",
      },
    },
  },
})
