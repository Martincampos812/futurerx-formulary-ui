import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getMarketingIconsList(base_formulary_id): Promise<any> {
  let url = `${BASE_URL1}api/1/marketingicons/${base_formulary_id}`;
  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFormularySelectedLimitations(base_formulary_id): Promise<any> {
  let url = `${BASE_URL1}api/1/formulary-selected-limitations/${base_formulary_id}`;
  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getMarketingLegends(base_formulary_id): Promise<any> {
  let url = `${BASE_URL1}api/1/marketinglegends/${base_formulary_id}`;
  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });
    return response.data.result;
  } catch (error) {
    throw error;
  }
}

export async function getMarketingConfigurations(base_formulary_id): Promise<any> {
  let url = `${BASE_URL1}api/1/marketingconfiguration/${base_formulary_id}`;
  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateMarketingLegends(payload: any): Promise<any> {
  let url = `${BASE_URL1}api/1/marketinglegends`;
  try {
    const response = await axios.put(url, payload, { headers: REQUEST_HEADER });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateMarketingConfigurations(payload: any): Promise<any> {
  let url = `${BASE_URL1}api/1/marketingconfiguration`;
  try {
    const response = await axios.put(url, payload, { headers: REQUEST_HEADER });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadMarketingIcon(payload: any): Promise<any> {
  let url = `${BASE_URL1}api//1/uploads?file_type=image`;
  const REQUEST_HEADER_IMG = {
    Authorization: "Bearer ecac2d90-92ce-4c20-8f39-363e0b621d18",
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=UTF-8",
  }
  try {
    const response = await axios.post(url, payload, { headers: REQUEST_HEADER_IMG });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function submitMarketingIcon(payload: any): Promise<any> {
  let url = `${BASE_URL1}api/1/marketingicons`;
  try {
    return await axios.post(url, payload, { headers: REQUEST_HEADER });
  } catch (error) {
    throw error;
  }
}