import axios from "axios";
import { stcResult } from "./stcSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getstc(payload: any): Promise<stcResult> {
  let url = `${BASE_URL1}api/1/alternativemedication`;
  console.log("url",url)
  console.log("payload in call",payload)
  try {
    const response = await axios.put(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getformularies - Success");
     console.log(response);
    return {
      data: response.data,
  
      
      
      
    };
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function getheader(payload: any): Promise<stcResult> {
  let url = `${BASE_URL1}api/1/search-tool-content`;
  console.log("url",url)
  console.log("payload in call",payload)
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getformularies - Success");
     console.log(response);
    return {
      data: response.data,
  
      
      
      
    };
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
