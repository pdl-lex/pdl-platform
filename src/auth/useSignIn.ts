import { useAuth } from "react-oidc-context"
import { useLocation } from "react-router-dom"
import { AuthState } from "./AuthState"

export function useSignIn() {
  const auth = useAuth()
  const location = useLocation()

  return () => {
    const state: AuthState = {
      returnTo: location.pathname + location.search + location.hash,
    }
    void auth.signinRedirect({ state })
  }
}
