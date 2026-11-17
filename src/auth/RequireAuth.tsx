import { Button, Skeleton, Stack, Text, Title } from "@mantine/core"
import { IconLock } from "@tabler/icons-react"
import { hasAuthParams, useAuth } from "react-oidc-context"
import MainText from "../layout/MainText"
import { useSignIn } from "./useSignIn"

export function AuthPending() {
  return (
    <MainText>
      <Stack gap="md">
        <Skeleton height={32} radius="md" width="40%" />
        <Skeleton height={16} radius="md" />
        <Skeleton height={16} radius="md" width="70%" />
      </Stack>
    </MainText>
  )
}

function SignInPrompt() {
  const signIn = useSignIn()

  return (
    <MainText>
      <Stack align="center" gap="md" py="xl" ta="center">
        <IconLock size={48} stroke={1.5} />
        <Title order={2}>Anmeldung erforderlich</Title>
        <Text>
          Dieser Bereich steht angemeldeten Nutzerinnen und Nutzern zur
          Verfügung.
        </Text>
        <Button color="lexoterm-primary" onClick={signIn}>Anmelden</Button>
      </Stack>
    </MainText>
  )
}

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = useAuth()

  if (auth.isAuthenticated) return <>{children}</>
  if (auth.error) return <AuthError message={auth.error.message} />
  if (auth.isLoading || auth.activeNavigator || hasAuthParams())
    return <AuthPending />
  return <SignInPrompt />
}

export function AuthError({ message }: { message: string }) {
  return (
    <MainText>
      <h2>Anmeldung fehlgeschlagen</h2>
      <p>{message}</p>
    </MainText>
  )
}
