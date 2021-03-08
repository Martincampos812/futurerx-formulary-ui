import { AxiosResponse } from "axios";
import http from "../api/http-helper";

class MemberInfoService {
  /**
   * @function getMember
   * to get all questions in a question set
   * id : qset id
   */
  getMember(id: number) {
    return http.get(`/member/${id}`);
  }
  /**
   * @function getInfoCardsData
   * to get all questions in a question set
   * id : qset id
   */
  getInfoCardsData(id: number) {
    return http.get(`/member/${id}/summary`);
  }

  /**
   * @function getInfoCardsData
   * to get all questions in a question set
   * id : qset id
   */
  getContactInfo(id: number) {
    return http.get(`/member/${id}/address`);
  }
}

export default new MemberInfoService();
