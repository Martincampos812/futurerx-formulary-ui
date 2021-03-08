import axios from "axios";

export default axios.create({
  baseURL: " https://api-dev-config-formulary.futurerx.com",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  },
});

export const BASE_URL = "http://52.45.123.6:9002/api/v1/";
export const BASE_URL1 = "https://api-dev-config-formulary.futurerx.com/";
