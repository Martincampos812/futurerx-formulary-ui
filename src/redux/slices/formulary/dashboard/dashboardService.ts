import axios from "axios";
import { DashboardResult } from "./dashboardSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getformularies(payload: any): Promise<DashboardResult> {
  let url = `${BASE_URL1}api/1/formularies/1?index=${payload.index}&limit=${payload.limit}`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getformularies - Success");
    // console.log(response);
    return {
      list: response.data.data,
      count: response.data.count,
    };
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

const test_payload = {
  "filter": [
    {
      "prop": "formulary_name",
      "operator": "is_like",
      "values": [
        "WK_08_WF"
      ]
    }
  ],
  "search_key": "",
  "sort_by": [
    "contract_year",
    "lob_name",
    "formulary_name",
    "status"
  ],
  "sort_order": [
    "asc",
    "asc",
    "asc",
    "asc"
  ],
  "id_lob": null,
  "search_by": null,
  "search_value": []
}