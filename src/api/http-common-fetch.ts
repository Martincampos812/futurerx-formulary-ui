import { BASE_URL1 } from "./http-helper";
import { REQUEST_HEADER } from "./http-commons";

const GET_METHOD = "GET";
const POST_METHOD = "POST";
const PUT_METHOD = "PUT";

export const buildUrl = ({ refUrl = BASE_URL1, apiDetails }) => {
  let apiPart = apiDetails.apiPart;
  let pathParams = apiDetails.pathParams;
  let keyVals = apiDetails.keyVals;
  let url = refUrl + apiPart;

  if (pathParams) {
    url = url + pathParams;
  }

  if (keyVals) {
    keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
    url = url + "?" + keyVals.join("&");
  }
  return url;
};

export const getHeaders = () => {
  return {
    method: GET_METHOD,
    headers: REQUEST_HEADER,
  };
};

export const putHeaders = (apiDetails) => {
  return {
    method: PUT_METHOD,
    body: JSON.stringify(apiDetails?.messageBody),
    headers: REQUEST_HEADER,
  };
};

export const postHeaders = (apiDetails) => {
  return {
    method: POST_METHOD,
    body: JSON.stringify(apiDetails?.messageBody),
    headers: REQUEST_HEADER,
  };
};

export const fetchRequest = (url, requestHeaders) => {
  return fetch(url, requestHeaders)
    .then((response) => {
      return response.json();
    })
    .catch((err) => err.response);
};

// API consts for alternatives
export const GET_FORMULARY_LOBS = "api//1/client-lobs/1";
export const GET_DRUGS_LIST = "api/1/drugs-alternatives/";
export const POST_DRUGS_LIST_UPDATE = "api/1/alternative-drugs/1/";
export const GET_ALTERNATIVES_DRUGS_LIST =
  "api/1/alternative-drugs-priority/1/";
export const PUT_ALTERNATIVES_LIST = "api/1/alternative-drugs/";
export const GET_FORMULARIES_LIST = "api/1/formularies/1";
export const SAVE_FORMULARIES_LIST = "api/1/apply-formulary-alternatives/";
export const GET_ALL_MASTER_ALTERNATIVES_LIST_ONSEARCH = "api/1/alternatives/";
export const ADD_ALTERNATIVES_AND_GET_ID = "api//1/add-alternative-drug/1/";

export const KEY_INDEX = "index";
export const KEY_LIMIT = "limit";

// API consts for validations
export const GET_VALIDATIONS = "api/1/formulary-validations/";
export const GET_VALIDATION_NOTES = "api/1/formulary-validation-notes/";
export const POST_VALIDATION_NOTE = "api/1/formulary-validation-note/";
