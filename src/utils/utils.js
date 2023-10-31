import axios from "axios";

export const customFetch = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
