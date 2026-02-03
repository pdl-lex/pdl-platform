import { createTheme } from "@mantine/core"

export const theme = createTheme({
  components: {
    Anchor: {
      defaultProps: {
        c: "inherit",
      },
    },
  },
  colors: {
    "lexoterm-primary": [
      "#ebfffe",
      "#d7fdfb",
      "#aafdf8",
      "#7cfdf5",
      "#60fcf2",
      "#53fdf1",
      "#4bfdf1",
      "#3ee1d6",
      "#2ec8be",
      "#003835",
    ],
  },
})
