import axios from "axios";

const API = axios.create({
  baseURL: "http://54.81.18.99/api/v1/",

  headers: {
    "Content-type": "application/json",
  },
});

const MAPAPI = axios.create({
  baseURL: "https://us-street.api.smartystreets.com/",

  headers: {
    "Content-type": "application/json",
    // 'Accept': 'application/json, text/plain, */*',
    // "Host": "us-street.api.smartystreets.com"
    // "Host": "localhost:3000"
    // "Access-Control-Allow-Headers" : "*",
  },
});

export { API, MAPAPI };
