import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import fetchPayloadGlobal, {
  type FetchPayloadGlobalOptions,
} from "../cms/fetchPayloadGlobal"
import _ from "lodash"

export type UseCmsGlobalOptions<TResponse = unknown> = Omit<
  UseQueryOptions<TResponse, Error, TResponse>,
  "queryKey" | "queryFn"
> & {
  fetchOptions?: Omit<FetchPayloadGlobalOptions, "signal">
}

export function useCmsGlobal<TResponse = unknown>(
  slug: string,
  options: UseCmsGlobalOptions<TResponse> = {},
) {
  const { fetchOptions = {}, ...queryOptions } = options

  // Build a stable query key
  const queryParams = _(fetchOptions)
    .omitBy((value) => value == null)
    .toPairs()
    .sortBy(([key]) => key)
    .fromPairs()
    .value()

  const queryKey = ["cms", "global", slug, queryParams]

  return useQuery<TResponse, Error>({
    queryKey,
    queryFn: async ({ signal }) =>
      fetchPayloadGlobal<TResponse>(slug, {
        ...fetchOptions,
        signal,
      }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...queryOptions,
  })
}
