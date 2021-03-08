import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";
import axios from "axios";

const URL = BASE_URL1;

export async function exportReport(apiDetails: any): Promise<any> {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if (keyVals) {
        keyVals = keyVals.map(pair => pair.key + '=' + pair.value);
        POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    try {
        const response = await axios.post(POST_URL, messageBody, {
            headers: commonConstants.REQUEST_HEADER,
            responseType: 'arraybuffer',
        });
        if (response.data) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}
