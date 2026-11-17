import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WebStorageStateStore } from "oidc-client-ts";
import { AuthProvider } from "react-oidc-context";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authority={import.meta.env.VITE_OIDC_AUTHORITY}
        client_id={import.meta.env.VITE_OIDC_CLIENT_ID}
        redirect_uri={`${window.location.origin}/auth/callback`}
        post_logout_redirect_uri={`${window.location.origin}/`}
        scope="openid profile email offline_access"
        userStore={new WebStorageStateStore({ store: window.localStorage })}
      >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
