import axios from "axios";
import { FormularyVersionsResult } from "./headerSlice";
import { BASE_URL1 } from "../../../../api/http-helper";

const headers = {
  Authorization: "Bearer ecac2d90-92ce-4c20-8f39-363e0b621d18",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function getformularyVersions(formularyBaseId: any): Promise<FormularyVersionsResult> {
  let url = `${BASE_URL1}api/1/formulary-versions-list/${formularyBaseId}`
  
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    // console.log("***** getformulary Versions - Success");
    // console.log(response);
    return {
      list: response.data.data,
    };
  } catch (error) {
    console.log("***** getformulary Versions - Error");
    console.log(error);
    throw error;
  }
}
