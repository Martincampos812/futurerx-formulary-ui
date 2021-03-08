import {
  buildUrl,
  getHeaders,
  putHeaders,
  postHeaders,
  fetchRequest,
} from "../../../api/http-common-fetch";

const FORMULARY_LOBS =
  "https://api-dev-config.futurerx.com/api//1/client-lobs/1";
const ADD_ALTERNATIVE_DYNAMICALLY_API =
  "https://api-dev-config-formulary.futurerx.com/api/1/add-alternative-drug/1/";

export const getFormularyLobs = () => {
  const requestHeaders = getHeaders();
  return fetchRequest(FORMULARY_LOBS, requestHeaders);
};

export const postAlternative = (apiDetails) => {
  const requestHeaders = postHeaders(apiDetails);
  return fetchRequest(
    ADD_ALTERNATIVE_DYNAMICALLY_API + apiDetails.LOB_ID,
    requestHeaders
  );
};

export const getRequestApi = (apiDetails) => {
  const URL = buildUrl({ apiDetails });
  const requestHeaders = getHeaders();
  return fetchRequest(URL, requestHeaders);
};

export const postRequestApi = (apiDetails) => {
  const URL = buildUrl({ apiDetails });
  const requestHeaders = postHeaders(apiDetails);
  return fetchRequest(URL, requestHeaders);
};

export const putRequestApi = (apiDetails) => {
  const URL = buildUrl({ apiDetails });
  const requestHeaders = putHeaders(apiDetails);
  return fetchRequest(URL, requestHeaders);
};
