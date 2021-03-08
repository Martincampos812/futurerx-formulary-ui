import axios from "axios";
import { plainLanguageDescriptorDropDownListResult,PlainLanguageDescriptorTableValuesResult,PlainLanguageDescriptorTableLayoutResult, createPlainLanguageDescriptorDropDownListResult } from "./plainLanguageDescriptorSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getLanguageDescriptorList(formulary_id: any): Promise<plainLanguageDescriptorDropDownListResult> {
  let url = `${BASE_URL1}/api/1/langdescriptor/${formulary_id}`;
  try {
    const response = await axios.get(url,{
      headers: REQUEST_HEADER,
    });

    return {
      list: response.data.result,
      active: response.data.lang_descriptor_id
    };
  } catch (error) {
    throw error;
  }
}
export async function createLanguageDescriptorList(params: any): Promise<createPlainLanguageDescriptorDropDownListResult> {
  let url = `${BASE_URL1}api/1/langdescriptor`;
  try {
    const response = await axios.post(url,params,{
      headers: REQUEST_HEADER,
    });

    return {
      code: response.data.code,
      message: response.data.message,
    };
  } catch (error) {
    throw error;
  }
}
export async function saveLanguageDescriptorTable(params: any): Promise<createPlainLanguageDescriptorDropDownListResult> {
  let url = `${BASE_URL1}api/1/langdescriptorinfo`;
  try {
    const response = await axios.put(url,params,{
      headers: REQUEST_HEADER,
    });

    return {
      code: response.data.code,
      message: response.data.message,
    };
  } catch (error) {
    throw error;
  }
}
export async function getLanguageDescriptorTable(formulary_id: PlainLanguageDescriptorTableLayoutResult): Promise<any> {
  let url = `${BASE_URL1}api/2/formularycategoryclass/${formulary_id}`;
  try {
    const response = await axios.get(url,{
      headers: REQUEST_HEADER,
    });

    return {
      table: response.data.result
    };
  } catch (error) {
    throw error;
  }
}
export async function getLanguageDescriptorTableValues(list_id: any): Promise<PlainLanguageDescriptorTableValuesResult> {
  let url = `${BASE_URL1}api/1/langdescriptorinfo/${list_id}`;
  try {
    const response = await axios.get(url,{
      headers: REQUEST_HEADER,
    });

    return {
      categories: response.data.categories,
      classes: response.data.classes,
      lang_descriptor_id: list_id
    };
  } catch (error) {
    throw error;
  }
}
