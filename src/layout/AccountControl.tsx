import { ActionIcon, Menu, UnstyledButton } from "@mantine/core"
import { IconLogout, IconUser, IconUserCheck } from "@tabler/icons-react"
import { useAuth } from "react-oidc-context"
import { useSignIn } from "../auth/useSignIn"
import classes from "./MainLayout.module.css"

function useAccountActions() {
  const auth = useAuth()
  const signIn = useSignIn()
  const signOut = () => void auth.signoutRedirect()

  const profile = auth.user?.profile
  const displayName =
    profile?.name ?? profile?.preferred_username ?? profile?.email

  return {
    isAuthenticated: auth.isAuthenticated,
    displayName,
    signIn,
    signOut,
  }
}

const headerIconProps = {
  variant: "outline",
  color: "white",
  radius: "xl",
  size: "md",
  ml: "md",
} as const

export function HeaderAccountControl() {
  const { isAuthenticated, displayName, signIn, signOut } = useAccountActions()

  if (!isAuthenticated) {
    return (
      <ActionIcon
        {...headerIconProps}
        onClick={signIn}
        aria-label="Anmelden"
        title="Anmelden"
      >
        <IconUser stroke={1.5} />
      </ActionIcon>
    )
  }

  return (
    <Menu position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon {...headerIconProps} aria-label="Konto" title={displayName}>
          <IconUserCheck stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {displayName ? <Menu.Label>{displayName}</Menu.Label> : null}
        <Menu.Item leftSection={<IconLogout size={16} />} onClick={signOut}>
          Abmelden
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export function SidebarAccountControl() {
  const { isAuthenticated, displayName, signIn, signOut } = useAccountActions()

  return isAuthenticated ? (
    <UnstyledButton className={classes.control} onClick={signOut}>
      <IconLogout size={18} /> Abmelden{displayName ? ` (${displayName})` : ""}
    </UnstyledButton>
  ) : (
    <UnstyledButton className={classes.control} onClick={signIn}>
      <IconUser size={18} /> Anmelden
    </UnstyledButton>
  )
}
