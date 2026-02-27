import axios from "axios";

// https://dummyjson.com/docs
export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});
