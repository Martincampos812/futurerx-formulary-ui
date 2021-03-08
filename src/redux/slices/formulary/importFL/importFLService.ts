import axios from "axios";
import { ImportFormularyResult } from "./importFLSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function import_FL(payload: any): Promise<ImportFormularyResult> {
  let typeOfChange = payload.changesOnly.length > 0 ? 'CO' : 'FR';
  let changesParams = payload.changesOnly.join(',');
  debugger;
  let url = `${BASE_URL1}api/1/uploads/stdfa/${payload.flID}/${payload.loadKeyType}/${typeOfChange}?file_type=xlsx`;
  if(typeOfChange === 'CO'){
    url = `${BASE_URL1}api/1/uploads/stdfa/${payload.flID}/${payload.loadKeyType}/${typeOfChange}/${changesParams}?file_type=xlsx`;
  }
  try {
    const response = await axios.post(url, payload.form_data, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getformularies - Success");
    console.log(response);
    return response.data;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function importedFLFiles(payload: any): Promise<ImportFormularyResult> {
  let url = `${BASE_URL1}api/1/formulary-import-files/${payload.flID}`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getformularies - Success");
    console.log(response);
    return response.data;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
export async function importedList(payload: any): Promise<ImportFormularyResult> {
  let url = `${BASE_URL1}api/1/formulary-import-file-details/${payload.flID}/${payload.id_formulary_file}?index=0&limit=10`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getformularies - Success");
    console.log(response);
    return response.data;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
