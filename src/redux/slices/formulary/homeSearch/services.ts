import { SearchResponse } from "./searchSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import axios from "axios";

const HOME_SEARCH_OPTIONS_URL = BASE_URL1 + "api/1/";
const HOME_SEARCH_OPTIONS_URL_STATES = "https://api-dev-config.futurerx.com/api//1/"

const HOME_SEARCH_FORMULARY_URL = BASE_URL1 + "api/1/formularies/1";
const HOME_SEARCH_FORMULARY_URL_STATES = "https://api-dev-config.futurerx.com/api//1/"


const headers = {
  Authorization: "Bearer ecac2d90-92ce-4c20-8f39-363e0b621d18",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function homeSearch(apiDetails: any): Promise<SearchResponse> {
    let pathParams = apiDetails.pathParams;
    let GET_URL ="";
    if (apiDetails.category=='client-states'){
      GET_URL = HOME_SEARCH_OPTIONS_URL_STATES + pathParams ;
    }else{
      GET_URL = HOME_SEARCH_OPTIONS_URL + pathParams ;
    }
    try {
      const response = await axios.get(GET_URL, {
        headers: headers,
      });
      return {
        success: response,
        result:response
      };
    } catch (error) {
      console.error(error.response)
      throw error.response;
    }
};

export async function searchFormulary(apiDetails: any): Promise<SearchResponse> {
  let pathParams = apiDetails.pathParams;
  let messageBody = apiDetails.messageBody;
  let POST_URL ="";
  // if (apiDetails.category=='client-states'){
  //   POST_URL = HOME_SEARCH_FORMULARY_URL_STATES + pathParams ;
  // }else{
  //   POST_URL = HOME_SEARCH_FORMULARY_URL + pathParams ;
  // }
  POST_URL = HOME_SEARCH_FORMULARY_URL ;
  try {
    const response = await axios.post(POST_URL,messageBody, {
      headers: headers,
    });
    return {
      success: response,
      result:response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};