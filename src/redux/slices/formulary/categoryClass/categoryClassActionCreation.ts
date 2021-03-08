import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";

const URL = BASE_URL1;

export const getClassificationSystems = createAsyncThunk(
  "categoryClass/getClassificationSystems",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getClassificationSystems action creator:: url: " + GET_URL);
    const requestHeaders = {
      /*method: 'POST',
      body: JSON.stringify(messageBody),*/
      headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getClassificationSystems: ", json);
        return json;
      });
  }
);

export const postDrugsCategory = createAsyncThunk(
  "categoryClass/postDrugsCategory",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postDrugsCategory action creator:: url: " + POST_URL);
    const requestHeaders = {
      method: 'POST',
      body: JSON.stringify(messageBody),
      headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postDrugsCategory: ", json);
        return json;
      });
  }
);

export const postDrugsClassCategoryOverride = createAsyncThunk(
  "categoryClass/postDrugsClassCategoryOverride",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postDrugsClassCategoryOverride action creator:: url: " + POST_URL);
    const requestHeaders = {
      method: 'POST',
      body: JSON.stringify(messageBody),
      headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postDrugsClassCategoryOverride: ", json);
        return json;
      });
  }
);

export const getIntelliscenseSearch = createAsyncThunk(
  "categoryClass/getIntelliscenseSearch",
  async (apiDetailsArray: any) => {
    let fetchPromises = Array();
    let fetchKeys = Array();
    apiDetailsArray.map(apiItem => {
      let key = apiItem.key;
      let apiDetails = apiItem.apiDetails;
      let apiPart = apiDetails.apiPart;
      let pathParams = apiDetails.pathParams;
      let keyVals = apiDetails.keyVals;
      let GET_URL = URL + apiPart + pathParams;
      if (keyVals) {
        keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
        GET_URL = GET_URL + "?" + keyVals.join('&');
      }
      console.log("getIntelliscenseSearch action creator:: url: " + GET_URL);
      const requestHeaders = {
        /*method: 'POST',
        body: JSON.stringify(messageBody),*/
        headers: commonConstants.REQUEST_HEADER
      }
      let fetchObject = fetch(GET_URL, requestHeaders);
      fetchPromises.push(fetchObject);
      fetchKeys.push(key);
    });
    return Promise.all(fetchPromises)
      .then(values => Promise.all(values.map(value => value.json())))
      .then(finalVals => {
        if (finalVals && Array.isArray(finalVals) && finalVals.length > 0) {
          let result = { code: '200', status: 'ok', data: Array() };
          for (let index = 0; index < finalVals.length; index++) {
            let keyData = finalVals[index];
            if (keyData.data && Array.isArray(keyData.data) && keyData.data.length > 0) {
              for (let dataIndex = 0; dataIndex < keyData.data.length; dataIndex++) {
                result.data.push({ key: fetchKeys[index], value: keyData.data[dataIndex].value});
              }
            }
          }
          return result;
        } else {
          return finalVals;
        }
      });
  }
);

export const getCategoryClasses = createAsyncThunk(
  "categoryClass/getCategoryClasses",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if (keyVals) {
      keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getCategoryClasses action creator:: url: " + GET_URL);
    const requestHeaders = {
      /*method: 'POST',
      body: JSON.stringify(messageBody),*/
      headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getCategoryClasses: ", json);
        return json;
      });
  }
);

