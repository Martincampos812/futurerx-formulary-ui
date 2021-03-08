import { MemberInfo } from "../member-info.model";

export interface MemberInfoResponse {
  data: MemberInfo[];
  error: any;
  meta: {
    success: boolean;
    version: string;
  };
}
