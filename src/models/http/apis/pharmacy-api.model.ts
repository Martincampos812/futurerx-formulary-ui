// API: /api/v1/member/<member_id>/pharmacy/search?pharmacy_name=abc&pharmacy_type=def&city=<city_name>&zip=33624
// The only mandatory attribute is the member id.
// If the city/state/zip is not specified, use member's city from the primary address.

// Response type
export interface PHARMACY_SEARCH_RESPONSE {
  details: PHARMACY_DETAILS;
  demographics: PHARMACY_DEMOGRAPHICS;
  contact: PHARMACY_CONTACT;
}

export interface PHARMACY_DEMOGRAPHICS {
  primary_pharmacy: PHARMACY_DEMOGRAPHIC_DETAILS;
  secondary_pharmacy: PHARMACY_DEMOGRAPHIC_DETAILS;
}

export interface PHARMACY_CONTACT {
  location: PHARMACY_LOCATION;
  mailing: PHARMACY_LOCATION;
}

export interface PHARMACY_LOCATION {
  street1: string;
  street2: string;
  city: string;
  state: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface PHARMACY_DEMOGRAPHIC_DETAILS {
  id: string;
  name: string;
  tax_id: string;
  medicid_id: string;
  relationship_id: string;
  dea_number: string;
  status_code: string;
  renewal_date: string;
}

export interface PHARMACY_DETAILS {
  name: string;
  npi: string;
  id: string;

  address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipcode: string;
  };
  phone: string;
  fax: string;
  operating_hours: PHARMACY_OPERATING_HOURS[];
}

export interface PHARMACY_OPERATING_HOURS {
  timezone: string;
  timing: { day: string; from: string; to: string; isClosed?: boolean };
}

// API /api/v1/member/<member_id>/pharmacy/types
// return an array of pharmacy types

export interface PHARMACY_TYPES_REQUEST {
  member_id: string;
}

export interface PHARMACY_TYPES_RESPONSE {
  phrmacy_type: PHARMACY_TYPE[];
}

export interface PHARMACY_TYPE {
  id: string;
  type: string;
}
