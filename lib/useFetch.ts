import { useQuery } from 'react-query'

type Fetcher<T> = () => Promise<T>

const fetcher = <T>(path: string, request?: RequestInit): Fetcher<T> => {
  return async () => {
    const response = await fetch(path, request)
    return (await response.json()) as T
  }
}

export const useFetch = <T>(url: string): readonly [T | null, Error | null] => {
  // 開発サーバーではサフィックスに .json を付ける
  const path = process.env.NODE_ENV === 'development' ? `${url}.json` : url
  const { data, error } = useQuery<T, Error>(url, fetcher<T>(path))

  return [data ?? null, error ?? null] as const
}
