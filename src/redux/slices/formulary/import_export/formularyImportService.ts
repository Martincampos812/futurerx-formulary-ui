import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";
import { DetailsRequest, ChangeErrorRequest } from "./formularyImportSlice";


export async function downloadReportApi(id_formulary: number): Promise<any> {

  let url = `${BASE_URL1}api/1/formulary-import-files/${id_formulary}`;
  // api/1/formulary-summary-change-error-export/513/6?file_type=xlsx
  // try {
  //   const response = await axios.get(url, {
  //     headers: REQUEST_HEADER,
  //   });
  //   console.log("***** getImportFiles - Success");
  //   console.log(response);
  //   if (response.status === 200) {
  //     return {
  //       list: response?.data?.result,
  //       count: response?.data?.count,
  //       status: response?.status,
  //     };
  //   }
  //   return null;
  // } catch (error) {
  //   console.log("***** getImportFiles - Error");
  //   const { response } = error;
  //   const { request, ...errorObject } = response; // take everything but 'request'
  //   console.log(errorObject);
  //   return {
  //     status: errorObject.status,
  //     data: errorObject.data,
  //   };
  // }
}

export async function getImportFiles(id_formulary: number): Promise<any> {
  // TODO
  let url = `${BASE_URL1}api/1/formulary-import-files/${id_formulary}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getImportFiles - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response?.data?.result,
        count: response?.data?.count,
        status: response?.status,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getImportFiles - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function getImportFileDetails(
  request: DetailsRequest
): Promise<any> {
  debugger
  // TODO
  let url = `${BASE_URL1}api/1/formulary-import-file-details/${request.id_formulary}/${request.id_formulary_file}?index=${request.index}&limit=${request.limit}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getImportFileDetails - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response?.data?.result,
        count: response?.data?.count,
        status: response?.status,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getImportFileDetails - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function getChangeReports(
  request: ChangeErrorRequest
): Promise<any> {
  console.log(" getChangeReports ", request);
  // TODO
  let url = `${BASE_URL1}api/1/formulary-change-reports/${request.id_formulary_import}?index=${request.index}&limit=${request.limit}`;
  try {
    const response = await axios.post(url, request.payload, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getChangeReports - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response?.data?.result,
        count: response?.data?.count,
        status: response?.status,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getChangeReports - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function getErrorDetails(
  request: ChangeErrorRequest
): Promise<any> {
  // TODO
  let url = `${BASE_URL1}api/1/formulary-error-details/${request.id_formulary_import}?index=${request.index}&limit=${request.limit}`;
  try {
    const response = await axios.post(url, request.payload, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getErrorDetails - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response?.data?.result,
        count: response?.data?.count,
        status: response?.status,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getErrorDetails - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}
