import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  console.log(baseURL);
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});

export type ArrayResponse<T> = {
  items: {
    $values: T[],
  },
  currentPage: number,
  pageSize: number,
  totalCount: 1
}
