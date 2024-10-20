import { api } from "./axios"

const fetcher = (url: string) => api.get(url).then(res => res.data)

export { fetcher }
