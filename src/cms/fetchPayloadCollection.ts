import type { PayloadQueryParams, PayloadQueryValue } from "./fetchPayloadGlobal"

export type FetchPayloadCollectionOptions = {
  signal?: AbortSignal
  [key: string]: PayloadQueryValue | AbortSignal | undefined
}

function buildSearchParams(params: PayloadQueryParams): URLSearchParams {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue
    if (typeof value === "string" && value.trim() === "undefined") continue
    searchParams.set(key, String(value))
  }

  return searchParams
}

export default async function fetchPayloadCollection<TResponse = unknown>(
  scope: string,
  options: FetchPayloadCollectionOptions = {},
): Promise<TResponse> {
  const { signal, ...query } = options

  const payloadUrl = import.meta.env.VITE_PAYLOAD_URL as string | undefined
  if (!payloadUrl?.trim()) {
    throw new Error("Missing VITE_PAYLOAD_URL environment variable")
  }

  const base = payloadUrl.replace(/\/+$/, "")
  const searchParams = buildSearchParams(query as PayloadQueryParams)
  const qs = searchParams.toString()

  const url = `${base}/api/${encodeURIComponent(scope)}${qs ? `?${qs}` : ""}`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as TResponse
}