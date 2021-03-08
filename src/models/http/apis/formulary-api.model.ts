

// API: /api/v1/member/<member_id>/formulary

export interface FORMULARY_DETAILS_FOR_MEMBER_RESPONSE {
	member_id:string;
	formulary_id:string;
	version:number;
	effective_date:string;
  last_updated:string;
  // Get the therapeutic classes. If id present, pass that as well.
  therapeutic_class: {id?:string, title:string}[]
}

// API: /api/v1/member/<member_id>/formulary/<formulary_id>/<formulary_version>/drugSearch?query=Lipt
// All inputs in the url.
export interface FORMULARY_DRUG_SEARCH_RESPONSE {
  drug_labels: {id?: string, label: string}[]; // If id present, pass that as well.
}


// API: /api/v1/member/<member_id>/formulary/<formulary_id>/<formulary_version>/search?drug=Lipitor&therapeuticClass=Analgesics
// All inputs are in the url. 
// The therapeutic class can be optional or an id or string.

export interface FORMULRY_SEARCH_RESPONSE {
	data:FORMULARY_DATA[];
}

export interface FORMULARY_DATA {
  tier:string;
  drug_id?:string; // If id present, pass that as well.
	drug_label:string;
	is_generic:boolean;
	therapeutic_class:string;
	limits:string[];
}

// API: /api/v1/member/<member_id>/formulary/<formulary_id>/<formulary_version>/getDrugOptions/drugId=47942
export interface FORMULARY_GET_DRUG_OPTIONS_RESPONSE {
  generic_equivalents: FORMULARY_DATA[];
  alternative_drugs: FORMULARY_DATA[];
}

// API: /api/v1/member/<member_id>/formulary/<formulary_id>/<formulary_version>/getDrugDetails/drugId=47942
export interface FORMULARY_GET_DRUG_DETAILS_RESPONSE {
	drug_details: FORMULARY_DRUG_DETAILS;
}

export interface FORMULARY_DRUG_DETAILS {
  image_url: string;
  properties: { title: string; description: string; }[];
}

// API: /api/v1/member/<member_id>/formulary/<formulary_id>/<formulary_version>/getPADetails/drugId=47942
export interface FORMULARY_GET_PA_DETAILS_RESPONSE {
  details: DRUG_PA_DETAILS
}

export interface DRUG_PA_DETAILS{
	drug_label:string;
	indications:String;
	required_medical_information:string;
	coverage_duration:string;
}