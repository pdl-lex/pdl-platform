import { useAuth } from "react-oidc-context"
import { Navigate } from "react-router-dom"
import { AuthError, AuthPending } from "../auth/RequireAuth"
import { AuthState } from "../auth/AuthState"

export default function AuthCallback() {
  const auth = useAuth()

  if (auth.error) return <AuthError message={auth.error.message} />
  if (auth.isLoading) return <AuthPending />

  const returnTo = (auth.user?.state as AuthState | undefined)?.returnTo
  return <Navigate to={returnTo ?? "/"} replace />
}
