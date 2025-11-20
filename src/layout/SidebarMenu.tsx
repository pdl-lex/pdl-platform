import { UnstyledButton } from "@mantine/core"
import { AppRoute } from "../App"
import classes from "./MainLayout.module.css"

export default function SidebarMenu({ routes }: { routes: AppRoute[] }) {
  return (
    <>
      {routes.map(({ path, title }) => (
        <UnstyledButton
          key={path}
          className={classes.control}
          component="a"
          href={path}
        >
          {title}
        </UnstyledButton>
      ))}
    </>
  )
}
