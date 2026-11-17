import { UnstyledButton } from "@mantine/core"
import { AppRoute } from "../App"
import classes from "./MainLayout.module.css"
import classNames from "classnames"
import { SidebarAccountControl } from "./AccountControl"

export default function SidebarMenu({ routes }: { routes: AppRoute[] }) {
  return (
    <>
      {routes.map(({ path, title }) => (
        <UnstyledButton
          key={path}
          className={classNames(classes.control, {
            [classes.active]: location.pathname === path,
          })}
          component="a"
          href={path}
        >
          {title}
        </UnstyledButton>
      ))}
      <SidebarAccountControl />
    </>
  )
}
