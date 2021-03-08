// API: /api/v1/members/<member_id>/summary

export interface MEMBER_PROFILE_SUMMARY_RESPONSE {
  data: MEMBER_SUMMARY_DATA;
}

export interface MEMBER_SUMMARY_DEMOGRAPHICS {
    dob: string;
    language: string;
    member_id: string;
}

export interface MEMBER_SUMMARY_ELIGIBILITY {
    start_date: string;
    term_date: string;
    transition_date: string;
}

export interface MEMBER_SUMMARY_MEMBER_DETAILS {
    family_id: string;
    family_members: any[];
    first_name: string;
    gender: string;
    id_member_info: number;
    img_url: string;
    last_name: string;
    lob: string;
    member_id: string;
    middle_name: string;
    status: number;
}

export interface MEMBER_SUMMARY_PREFERENCES {
    aor_poa: string;
    pcm: string;
}

export interface MEMBER_SUMMARY_LOCATION {
    address: string;
    fax: string;
    phone: string;
}

export interface MEMBER_SUMMARY_PCP_DATA {
    in_network: string;
    locations: MEMBER_SUMMARY_LOCATION[];
    npi: string;
    physician_since: string;
}

export interface MEMBER_SUMMARY_PCP {
    data: MEMBER_SUMMARY_PCP_DATA;
    pcp: string;
}

export interface MEMBER_SUMMARY_PRIMARY_PHARMACY_DATA {
    address: string;
    fax: string;
    npi: string;
    phone: string;
}

export interface MEMBER_SUMMARY_PRIMARY_PHARMACY {
    data: MEMBER_SUMMARY_PRIMARY_PHARMACY_DATA;
    primary_pharmacy: string;
}

export interface MEMBER_SUMMARY_SECONDARY_PHARMACY_DATA {
    address: string;
    fax: string;
    npi: string;
    phone: string;
}

export interface MEMBER_SUMMARY_SECONDARY_PHARMACY {
    data: MEMBER_SUMMARY_SECONDARY_PHARMACY_DATA;
    secondary_pharmacy: string;
}

export interface MEMBER_SUMMARY_PROVIDERS {
    pcp: MEMBER_SUMMARY_PCP;
    primary_pharmacy: MEMBER_SUMMARY_PRIMARY_PHARMACY;
    secondary_pharmacy: MEMBER_SUMMARY_SECONDARY_PHARMACY;
}

export interface MEMBER_SUMMARY_DATA {
    demographics: MEMBER_SUMMARY_DEMOGRAPHICS;
    eligibility: MEMBER_SUMMARY_ELIGIBILITY;
    member_summary: MEMBER_SUMMARY_MEMBER_DETAILS;
    preferences: MEMBER_SUMMARY_PREFERENCES;
    providers: MEMBER_SUMMARY_PROVIDERS;
}

// API: /api/v1/members/<member_id>
export interface MEMBER_PROFILE_DETAILS_RESPONSE {
  data: MEMBER_DETAILS_MEMBER_DATA[];
}

export interface MEMBER_DETAILS_MEMBER_DATA {
    aor_poa: string;
    date_of_birth: string;
    email_address: string;
    first_name: string;
    gender: string;
    home_phone: number;
    id_member_info: number;
    language: string;
    last_name: string;
    mbi: string;
    member_id: string;
    mobile_phone: number;
    multi_birth: string;
    nick_name: string;
    pcm: string;
    person_code: string;
    privacy: string;
    ref_id: string;
    reference: string;
    relationship_code: string;
    reporting1: string;
    reporting2: string;
    reporting3: string;
    reporting4: string;
    reporting5: string;
    secondary_email: string;
    ssn?: any;
    upi: string;
    work_phone: string;
}

// API: /api/v1/members/<member_id>/address
export interface MEMBER_PROFILE_ADDRESS_RESPONSE {
  data: MEMBER_PROFILE_ADDRESS[];
}

export interface MEMBER_PROFILE_ADDRESS {
    address1: string;
    address2?: any;
    city: string;
    contact_type: string;
    country: string;
    county: string;
    id_member_address: number;
    id_member_info: number;
    mailing_address: string;
    state: string;
    zip: string;
}





