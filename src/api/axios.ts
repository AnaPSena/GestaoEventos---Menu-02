import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7260/api/",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
