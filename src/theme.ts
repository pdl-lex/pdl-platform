import { colorsTuple, createTheme, MantineTheme } from "@mantine/core"

export const theme = createTheme({
  fontFamily: "Noto Sans, sans-serif",
  components: {
    Anchor: {
      styles: (theme: MantineTheme) => ({
        root: {
          textDecoration: "none",
          color: theme.colors["lexoterm-primary"][6],
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }),
    },
    Button: {
      defaultProps: {
        size: "sm",
        p: "xs",
      },
      styles: {
        root: {
          fontWeight: 300,
          fontSize: "1em",
          textTransform: "uppercase",
        },
      },
    },
  },
  colors: {
    "lexoterm-brand": colorsTuple("#003835"),
    "lexoterm-gray": colorsTuple("#222222"),
    "lexoterm-primary": colorsTuple("#006844"),
    "lexoterm-secondary": colorsTuple("#CE601C"),
    "lexoterm-footer": colorsTuple("#cfdddc"),
  },
})
