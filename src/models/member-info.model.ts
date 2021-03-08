export interface MemberInfo {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  country: string;
  date_of_birth: string;
  email_address: string;
  first_name: string;
  gender: string;
  home_phone: string;
  id_member_info: number;
  last_name: string;
  mbi: string;
  member_id: string;
  mobile_phone: string;
  multi_birth: string;
  person_code: string;
  relationship_code: number;
  reporting1: any;
  reporting2: any;
  reporting3: any;
  reporting4: any;
  reporting5: any;
  ssn: string;
  state: string;
  zip: string;
  zip1: string;
  zip2: number;
  zip3: number;
}

export interface MemberSummary {
  family_id: string;
  img_url: string;
  memberId: number;
  id_member_info: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  lob: string;
  gender: string;
  status: string;
  family_members: FamilyMember[];
}

export interface FamilyMember {
  family_id: string;
  img_url: string;
  memberId: number;
  id_member_info: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  lob: string;
  gender: string;
  status: string;
}
