export type PayloadQueryValue = string | number | boolean | null | undefined
export type PayloadQueryParams = Record<string, PayloadQueryValue>

export type FetchPayloadGlobalOptions = {
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

export default async function fetchPayloadGlobal<TResponse = unknown>(
  scope: string,
  slug: string,
  options: FetchPayloadGlobalOptions = {},
): Promise<TResponse> {
  const { signal, ...query } = options

  const base = (import.meta.env.VITE_PAYLOAD_URL as string).replace(/\/+$/, "")
  const searchParams = buildSearchParams(query as PayloadQueryParams)
  const qs = searchParams.toString()

  const url = `${base}/api/${scope}/${encodeURIComponent(slug)}${qs ? `?${qs}` : ""}`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as TResponse
}
