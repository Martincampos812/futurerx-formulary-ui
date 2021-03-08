import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../api/http-common-fetch";

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

export const mapNotesToValidations = ({ id, list, notes, response }) => {
  const validations = [...list.validations];
  validations.forEach((val) => {
    if (id === val.id_formulary_validation) {
      val["notes"] = notes;
    }
  });
  return {
    id,
    validations,
    notes,
    response,
  };
};
