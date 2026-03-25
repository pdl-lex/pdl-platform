export type PayloadQueryValue = string | number | boolean | null | undefined
export type PayloadQueryParams = Record<string, PayloadQueryValue>

export type FetchPayloadGlobalOptions = {
  depth?: number
  draft?: boolean
  locale?: string
  fallbackLocale?: string
  trash?: boolean
  signal?: AbortSignal
  [key: string]: PayloadQueryValue | AbortSignal | undefined
}

function buildSearchParams(params: PayloadQueryParams): URLSearchParams {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    // Prevent accidental locale=undefined in the query string.
    if (typeof value === "string" && value.trim() === "undefined") {
      continue
    }

    searchParams.set(key, String(value))
  }

  return searchParams
}

export default async function fetchPayloadGlobal<TResponse = unknown>(
  slug: string,
  options: FetchPayloadGlobalOptions = {},
): Promise<TResponse> {
  const { signal, ...query } = options

  const apiBaseUrl = import.meta.env.VITE_PAYLOAD_URL as string
  const searchParams = buildSearchParams(query as PayloadQueryParams)
  const queryString = searchParams.toString()

  const url = `${apiBaseUrl}/globals/${encodeURIComponent(slug)}${
    queryString ? `?${queryString}` : ""
  }`

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "")
    throw new Error(
      `Payload global fetch failed (${response.status} ${response.statusText}) for ${url}${
        errorText ? `: ${errorText}` : ""
      }`,
    )
  }

  return (await response.json()) as TResponse
}