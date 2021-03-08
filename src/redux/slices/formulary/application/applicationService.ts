import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getformularyVersions(base_id: any): Promise<any> {
  let url = `${BASE_URL1}api/1/formulary-versions-list/${base_id}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getformulary Versions - Success");
    console.log(response);
    if (response?.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.log("***** getformulary Versions - Error");
    console.log(error);
    throw error;
  }
}
