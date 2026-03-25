import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import fetchPayloadGlobal, {
  type FetchPayloadGlobalOptions,
} from "../cms/fetchPayloadGlobal"

export type UseCmsResourceOptions<TResponse = unknown> = Omit<
  UseQueryOptions<TResponse, Error, TResponse>,
  "queryKey" | "queryFn"
> & {
  fetchOptions?: Omit<FetchPayloadGlobalOptions, "signal">
}

export function useCms<TResponse = unknown>(
  scope: string,
  slug: string,
  options: UseCmsResourceOptions<TResponse> = {},
) {
  const { fetchOptions = {}, ...queryOptions } = options

  return useQuery<TResponse, Error>({
    queryKey: ["cms", scope, slug, fetchOptions],
    queryFn: ({ signal }) =>
      fetchPayloadGlobal<TResponse>(scope, slug, {
        ...fetchOptions,
        signal,
      }),
    ...queryOptions,
  })
}

export function useCmsGlobal<TResponse = unknown>(
  slug: string,
  options: UseCmsResourceOptions<TResponse> = {},
) {
  return useCms<TResponse>("globals", slug, options)
}
