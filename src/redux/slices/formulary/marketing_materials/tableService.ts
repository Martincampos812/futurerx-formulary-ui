import axios from "axios";
import { MarketingMaterialResult } from "./tableSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getTable(payload: any): Promise<MarketingMaterialResult> {
  let queryParam = `?index=${payload.index}&limit=${payload.limit}`;
  let url = `${BASE_URL1}api/1/${payload.activeMiniTabIndex === 0 ? 'marketingtemplates' : 'uploadedfileslist'}${queryParam}`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });

    return {
      list: response.data.result,
      count: response.data.count,
    };
  } catch (error) {
    throw error;
  }
}

export async function publishTemplateSvc(payload: any): Promise<any> {
  let url = `${BASE_URL1}api/1/templatepublish`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });

    return {
      list: response.data.result,
      count: response.data.count,
    };
  } catch (error) {
    throw error;
  }
}
