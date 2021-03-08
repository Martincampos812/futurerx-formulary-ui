// API: /api/v1/member/<id>/claims/search
// Get claims for a given member id. Filter based on certain properties.
// Example usage: /api/v1/member/<id>/claims/search?start_date=01-01-2019&end_date=12-31-2019&status=Paid
export interface CLAIMS_SEARCH_INPUT {
  // All props in get request
}

export interface CLAIMS_SEARCH_RESPONSE {
  claims: Array<CLAIM_DETAILS>;
}

export interface CLAIM_DETAILS {
  claim_id: string;
  claim_lob: string; // Medicare | Commercial. Not displayed in the UI directly, but required.
  date_of_service: string; // MM-DD-YYYY format
  status: string; // Paid | Rejected | Reversed
  drug_label: string; 
  qty: number;
  days_supply:number;
  rejection_code?: number; //Only for rejected claim
  rejection_description?: string; //Only for rejected claim
  prescriber: string;
  pharmacy: string;
  member_in_transition: boolean;
  transition_claim: boolean;
  scheduled_drug: number;
  rx: string;  
  drug_tier: string;
  drug_category: string;
  drug_class: string;
  mme: string;  //2oomg,3omg,N/A
  costshare: string; //$3.00
  process_type: string;

}

// API: /api/v1/member/<member_id>/claims/<claim_id>/
// Get details for a particular claim.
export interface CLAIM_DETAILS_RESPONSE {
  claim_id: string;
  status: string; // Paid | Rejected | Reversed
  lob: string; // Medicare | Commercial
  sequence: string;
  sequence_list: Array<string>; // Sequence dropdown.

  // depending on the type of the claim, one of the following will be present in response.
  medicare_paid_details?: CLAIM_MEDICARE_PAID_DETAILS;
  medicare_rejected_details?: CLAIM_MEDICARE_REJECTED_DETAILS;
  medicare_reversed_details?: CLAIM_MEDICARE_REVERSED_DETAILS;
  commercial_paid_details?: CLAIM_COMMERCIAL_PAID_DETAILS;
  commercial_rejected_details?: CLAIM_COMMERCIAL_REJECTED_DETAILS;
  commercial_reversed_details?: CLAIM_COMMERCIAL_REJECTED_DETAILS;
}

export interface CLAIM_MEDICARE_PAID_DETAILS {
  claims_details_summary: CLAIMS_DETAILS_SUMMARY;
  claim_detail: CLAIM_DETAIL;
  claim_transaction: CLAIM_TRANSACTION;
}

export interface CLAIM_MEDICARE_REJECTED_DETAILS {
  claims_details_summary: CLAIMS_DETAILS_SUMMARY;
  claim_detail: CLAIM_DETAIL;
  claim_transaction: CLAIM_TRANSACTION;
  rejected_messages: Array<CLAIM_DETAIL_REJECT_MESSAGE>;
  rejected_fields: Array<string>; // string to rejected field mapping required.
}

export interface CLAIM_COMMERCIAL_PAID_DETAILS {
  claims_details_summary: CLAIMS_DETAILS_SUMMARY;
  claim_detail: CLAIM_DETAIL;
  claim_transaction: CLAIM_TRANSACTION;
}

export interface CLAIM_COMMERCIAL_REJECTED_DETAILS {
  claims_details_summary: CLAIMS_DETAILS_SUMMARY;
  claim_detail: CLAIM_DETAIL;
  claim_transaction: CLAIM_TRANSACTION;
}

export interface CLAIM_MEDICARE_REVERSED_DETAILS {
  claims_details_summary: CLAIMS_DETAILS_SUMMARY;
  claim_detail: CLAIM_DETAIL;
  claim_transaction: CLAIM_TRANSACTION;
}

export interface CLAIM_COMMERCIAL_REVERSED_DETAILS {
  claims_details_summary: CLAIMS_DETAILS_SUMMARY;
  claim_detail: CLAIM_DETAIL;
  claim_transaction: CLAIM_TRANSACTION;
}

export interface CLAIMS_DETAILS_SUMMARY {
  bin: string;
  pcn: string;
  group: string;
  member_id: string;
  medicare_beneficiary_id: string;
  first_name: string;
  last_name:string
  dob: string;
  person_code: string;
  relationship_code: string;
  gender:string;
  lis_level: string;
  date_eof_service: string;
  rx: string;
  drug_name: string;
  ndc:string;
  days_supply: string;
  quantity: string;
  pharmacy_npi: string;
  pharmacy_ncpdp: string;
  patient_pay_amount: string;

}

// Tab 1
export interface CLAIM_DETAIL {
  pricing_details: CLAIM_DETAIL_PRICING_DETAILS;
  patient_pay?: CLAIM_DETAIL_PATIENT_PAY; // Not present in rejected claims
  transaction_information: CLAIM_DETAIL_TRANSACTION_INFORMATION;
  benefit_information: CLAIM_DETAIL_BENEFIT_INFORMATION;
  pharmacy_information: CLAIM_DETAIL_PHARMACY_INFORMATION;
  prescriber_information: CLAIM_DETAIL_PRESCRIBER_INFORMATION;
  additional_information: CLAIM_DETAIL_ADDITIONAL_INFORMATION;
  coordination_of_benefit_fields: CLAIM_DETAIL_COORDINATION_OF_BENEFITS_FIELDS;
  multi_ingredient_compound_fields: CLAIM_DETAIL_MULTI_INGREDIENT_COMPOUND_FIELDS;
  prior_authorization: CLAIM_DETAIL_PRIOR_AUTHORIZATION;
  reimbursement_details: CLAIM_DETAIL_REIMBURSEMENT_DETAILS;
  view_dur_messages: CLAIM_DETAIL_VIEW_DUR_MESSAGES;
  benefit_information2?: CLAIM_DETAIL_BENEFIT_INFORMATION2; // Not present in rejected claims
  part_d_model_benefit?: CLAIM_DETAIL_PART_D_MODEL_BENEFIT; // Not present in rejected claims
  moop_accumulator?: CLAIM_DETAIL_MOOP_ACCUMULATOR; // Not present in rejected claims
  pde_status?: CLAIM_DETAIL_PDE_STATUS; // Not present in rejected claims
  pde_status_fields?: CLAIM_DETAIL_PDE_STATUS_FIELDS; // Not present in rejected claims
  benefit_phase_table?: Array<CLAIM_DETAIL_BENEFIT_PHASE_ROW>; // Not present in rejected claims

}

// Claim detail section related interfaces
export interface CLAIM_DETAIL_PRICING_DETAILS {
  u_c: CLAIM_DETAIL_PRICING
  ingredient_cost: CLAIM_DETAIL_PRICING;
  dispensing_fee: CLAIM_DETAIL_PRICING;
  flat_tax: CLAIM_DETAIL_PRICING;
  percent_tax: CLAIM_DETAIL_PRICING;
  incentive_fee: CLAIM_DETAIL_PRICING;
  professional_service_fee: CLAIM_DETAIL_PRICING;
  other: CLAIM_DETAIL_PRICING;
  gross_amount_due: CLAIM_DETAIL_PRICING;
  cob: CLAIM_DETAIL_PRICING;
  amount_due: CLAIM_DETAIL_PRICING;
  withhold: CLAIM_DETAIL_PRICING;
  pos_rebate: CLAIM_DETAIL_PRICING;
}
export interface CLAIM_DETAIL_PRICING {
  pricing: { submitted: string; plan_allowed: string; } 
  client_pricing: { client1: string; client2: string; } 
}
export interface CLAIM_DETAIL_CALCULATED_OVERRIDE {
  calculated: string;
  override: string;
}
export interface CLAIM_DETAIL_PATIENT_PAY {
  lis?: CLAIM_DETAIL_CALCULATED_OVERRIDE; // Present for Medicare type
  csr?: CLAIM_DETAIL_CALCULATED_OVERRIDE; // Present for Commercial type
  copay: CLAIM_DETAIL_CALCULATED_OVERRIDE;
  coinsurance: CLAIM_DETAIL_CALCULATED_OVERRIDE;
  deductible: CLAIM_DETAIL_CALCULATED_OVERRIDE;
  over_ben_max: CLAIM_DETAIL_CALCULATED_OVERRIDE;
  daw_psc_fee: CLAIM_DETAIL_CALCULATED_OVERRIDE;
}
export interface CLAIM_DETAIL_TRANSACTION_INFORMATION {
  claim_id: string;
  date_time_adjudication_began: string;
  date_time_adjudication_ended: string;
  date_received: string;
  date_of_service: string;
  date_rx_written: string; 
  date_adjusted: string;
  date_reversed: string;
  transaction_code: string;
  transaction_type: string;
  ncpdp_version: string;
  bin: string;
  pcn: string;
}
export interface CLAIM_DETAIL_BENEFIT_INFORMATION {
  client: string;
  Carrier: string;
  account: string;
  group: string;
  benefit: string;
}
export interface CLAIM_DETAIL_PHARMACY_INFORMATION {
  pharmacy_service_type: string;
  pharmacy_npi: string;
  pharmacy_ncpdp: string;
  pharmacy_name: string;
  pharmacy_phone: string;
  pharmacy_fax: string;
  pharmacy_network: string;
  network_name: string;
}
export interface CLAIM_DETAIL_PRESCRIBER_INFORMATION {
  prescriber_id_qualifier: string;
  prescriber_npi: string;
  prescriber_dea: string;
  prescriber_name: string;
  prescriber_phone: string;
  prescriber_fax: string;

}
export interface CLAIM_DETAIL_ADDITIONAL_INFORMATION {
  drug_name: string;
  ndc: string;
  gpi: string;
  mony: string;
  ddid: string;
  rxcui: string;
  formulary: string;
  formulary_tier: string;
  formulary_id: string;
  cms_drug_status: string;
  part_d_drug_coverage_status: string;
  scd: string;
  quantity_dispensed: string;
  days_supply: string;
  unit_of_measure: string;
  dosage_form: string;
  schedule : string;
  daw: string;
  compound_claim: string;
  vaccine: string;
  b_claim: string;  //340B Claim
  scc: string;
  dispensing_status: string;
  dcs: string;
  rx: string;
  fill_number: string;
  number_of_refills: string;
  transition_claim: string;
  patient_residence_code: string;
  pde_status: string;
  mme_per_day: string;
  apap_per_day: string;
  quantity_intended_to_be_dispensed: string;
  days_supply_intended_to_be_dispensed: string;
  cob: string;
  lis_level?: string; // Present for Medicare type
  csr_level?: string; // Present for Commercial type

}

export interface CLAIM_DETAIL_COORDINATION_OF_BENEFITS_FIELDS {
  cob_other_payments_count: string;
  other_payer_coverage_Type: string;
  other_payer_id_qualifier: string;
  other_payer_idr: string;
  other_payer_date: string;
  other_payer_amount_paid_count: string;
  other_payer_amount_paid_qualifier: string;
  other_payer_amount_paid: string;
  other_payer_reject_count: string;
  other_payer_reject_code: string;
  benefit_stage_count: string;
  benefit_stage_qualifier: string;
  benefit_stage_amount: string;
}

export interface CLAIM_DETAIL_MULTI_INGREDIENT_COMPOUND_FIELDS {
  route_of_admission: string;
  compound_type: string;
  compound_dosage_form: string;
  compound_dispensing_unit_indicator: string;
  ingredient_component_count: string;
  product_id_ndc_qualifier: string;
  product_id_ndc: string;
  ingredient_quantity: string;
  ingredient_drug_cost: string;
  basis_of_cost_determination: string;

}

export interface CLAIM_DETAIL_PRIOR_AUTHORIZATION {
  override_id: string;
  authorization_id: string;
  start_date: string;
  end_date: string;
  refills_allowed: string;
}

export interface CLAIM_DETAIL_REIMBURSEMENT_DETAILS {
  payment_status: string;
  check: string;
  check_date:string;
  mailing_date: string;
  
}

export interface CLAIM_DETAIL_VIEW_DUR_MESSAGES {
  messages: Array<string>;
}

export interface CLAIM_DETAIL_BENEFIT_INFORMATION2 {
  drug_coverage_status: string; // C | E | O
  brand_generic_indicator: string; // B | G
}

export interface CLAIM_DETAIL_PART_D_MODEL_BENEFIT {
  part_d_senior_savings: string;
  lis_copay_savings: string;
  vbid: string;
}

export interface CLAIM_DETAIL_MOOP_ACCUMULATOR {
  moop_amount_applied: string;
  moop_amount_remaining: string;
}

export interface CLAIM_DETAIL_PDE_STATUS {
  pde_status: Array<CLAIM_DETAIL_PDE_DETAILS>;
}
export interface CLAIM_DETAIL_PDE_DETAILS {
  status: string;
  submit_date: string; // MM-DD-YYYY format
  response_date: string; // MM-DD-YYYY format
}
export interface CLAIM_DETAIL_PDE_STATUS_FIELDS {
  fields: Array<{field_no: number; field_name: string; value: string}>; // Used in PDE status popup.
}

export interface CLAIM_DETAIL_BENEFIT_PHASE_ROW {
  benefit_phase: string;
  limit: string;
  amount_applied: string;
  amount_remaining: string;
  benefit_phase_indicator: string;
  member_pay_non_lis: string;	
  member_pay_lis: string;	
  lics: string;
  cgdp: string;
  tr00p_actual: string; //Tr00p 	
  cpp: string;
  npp: string;
  other_trOOp: string;
  gdcb: string;
  gdca: string;
  prl0: string;
}

// reject claim related props
export interface CLAIM_DETAIL_REJECT_MESSAGE {
  reject_code: string;
  description: string;
  submitted_value: string;
  expected_value?: string; // If available
  status: string;
}

// Tab 2
export interface CLAIM_TRANSACTION {
  request: CLAIM_TRANSACTION_REQUEST;
  header_response_status: string;
  transaction_response_status:string;
  response: CLAIM_TRANSACTION_RESPONSE;
}

// Claim transaction section related interfaces.
export interface CLAIM_TRANSACTION_ROW {
  segment_number: string;
  segment_name: string;
  submitted_value: string;
  required: string;
}

export interface CLAIM_TRANSACTION_REQUEST {
  transaction_header_segment: Array<CLAIM_TRANSACTION_ROW>;
  insurance_segment: Array<CLAIM_TRANSACTION_ROW>;
  patient_segment: Array<CLAIM_TRANSACTION_ROW>;
  pharmacy_provider_segment: Array<CLAIM_TRANSACTION_ROW>;
  claim_segment: Array<CLAIM_TRANSACTION_ROW>;
  prescriber_segment: Array<CLAIM_TRANSACTION_ROW>;
  coordination_of_benefits_other_payments: Array<CLAIM_TRANSACTION_ROW>;
  workers_compensation_segment: Array<CLAIM_TRANSACTION_ROW>;
  dur_pps_segment: Array<CLAIM_TRANSACTION_ROW>;
  pricing_segment: Array<CLAIM_TRANSACTION_ROW>;
  coupon_segment: Array<CLAIM_TRANSACTION_ROW>;
  compound_segment: Array<CLAIM_TRANSACTION_ROW>;
  prior_authorization_segment: Array<CLAIM_TRANSACTION_ROW>;
  clinical_segment: Array<CLAIM_TRANSACTION_ROW>;
  additional_documentation_segment: Array<CLAIM_TRANSACTION_ROW>;
  facility_segment: Array<CLAIM_TRANSACTION_ROW>;
  narrative_segment: Array<CLAIM_TRANSACTION_ROW>;
}

export interface CLAIM_TRANSACTION_RESPONSE {
  response_header_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_message_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_insurance_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_insurance_additional_information_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_patient_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_status_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_claim_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_pricing_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_dur_pps_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_prior_authorization_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_other_payers_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_intermediary_segment: Array<CLAIM_TRANSACTION_ROW>;
  response_other_related_benefit_details_segment: Array<CLAIM_TRANSACTION_ROW>;
}


// API: /api/v1/member/<member_id>/claims/<claim_id>/<sequence_id>
// Get details for a particular claim and sequence number.
// The response is the same as the API without the sequence_id.
// Response - CLAIM_DETAILS_RESPONSE

// API: /api/v1/member/<member_id>/claims/getClaimDetailsForTestClaim/<claim_id>
// All inputs are in the url.
// This API is triggered when the "Run test claim" option is used for a claim.
// This API to return certain details of the claim that is required to run a test claim.
export interface CLAIM_DETAILS_FOR_TEST_CLAIM_RESPONSE {
  test_claim_id: string;
  test_claim_submission_type?: string; // Optional when getting data to run a new test claim.
  save_test_claim_to_dur_history?: boolean; // Optional when getting data to run a new test claim.
  submission_fields: CLAIMS_TEST_CLAIM_SUBMISSION_FIELDS;

  //The following data depends on the submission type.
  cost_fields?: CLAIM_TEST_CLAIM_COST_FIELDS;
  authorization_fields?: CLAIM_TEST_CLAIM_AUTHORIZATION_FIELDS;
  prescriber_fields?: CLAIM_TEST_CLAIM_PRESCRIBER_FIELDS;
  diagnosis_code_fields?: CLAIM_TEST_CLAIM_DIAGNOSIS_CODE_FIELDS;
  dur_pps_fields?: CLAIM_TEST_CLAIM_DUR_PPS_FIELDS;
  // For multi-ingredient compound
  multi_ingredient_compound?: CLAIM_TEST_CLAIM_MULTI_INGREDIENT_COMPOUND;

  // For Co-ordination of benefits
  coordination_of_benefits?: CLAIM_TEST_CLAIM_COORDINATION_OF_BENEFITS;

  // For Nx transaction
  response_fields?: CLAIM_TEST_CLAIM_RESPONSE_FIELDS;
}

export interface CLAIMS_TEST_CLAIM_SUBMISSION_FIELDS {
  bin: string;
  pcn: string;
  cust: string;
  // More fields
}

export interface CLAIM_TEST_CLAIM_COST_FIELDS {
  ingredient_cost: string;
  dispense_fee: string;
  // More fields
}

export interface CLAIM_TEST_CLAIM_AUTHORIZATION_FIELDS {
  prior_authorization_type_code: string;
  prior_authorization_number: string;
}

export interface CLAIM_TEST_CLAIM_PRESCRIBER_FIELDS {
  prescriber_id: string;
  prescriber_id_qualifier: string;
}

export interface CLAIM_TEST_CLAIM_DIAGNOSIS_CODE_FIELDS {
  diagnosis_code_count: number;
  diagnosis_list?: Array<CLAIM_TEST_CLAIM_DIAGNOSIS>; // Optional when getting data to run a new test claim.
}

export interface CLAIM_TEST_CLAIM_DIAGNOSIS {
  qualifier: string;
  diagnosis_code: string;
}

export interface CLAIM_TEST_CLAIM_DUR_PPS_FIELDS {
  dur_pps_code_count: number;
  dur_pps_list?: Array<CLAIM_TEST_CLAIM_DUR_PPS>;// Optional when getting data to run a new test claim.
}
export interface CLAIM_TEST_CLAIM_DUR_PPS {
  reason_for_service_code: string;
  professional_service_code: string;
  result_of_service_code: string;
}
export interface CLAIM_TEST_CLAIM_MULTI_INGREDIENT_COMPOUND {
  route_of_administration: string;
  compound_type: string;
  compound_dosage_form: string;
  compound_dispensing_unit_indicator: string;
  details: Array<CLAIM_TEST_CLAIM_MULTI_INGREDIENT_COMPOUND_DETAILS>;
}
export interface CLAIM_TEST_CLAIM_MULTI_INGREDIENT_COMPOUND_DETAILS {
  ingredient_compound_count: number;
  product_id_qualifie: string;
  product_id: string;
  ingredient_quality: string;
  ingredient_drug_cost: string;
  basis_of_cost_determination: string;
}
export interface CLAIM_TEST_CLAIM_COORDINATION_OF_BENEFITS {
  cob_benefit_fields: Array<{cob_other_payments_count: number; 
                            other_payer_coverage_type: string;
                            other_payer_id_qualifier: string;
                            other_payer_idr: string;
                            other_payer_date: string;}>;
  other_payer_amount_paid_details: Array<{ other_payer_amount_paid_count: number;
                        other_payer_amount_paid_qualifier: string; 
                        other_payer_amount_paid;}>;
  other_payer_reject_details: Array<{other_payer_reject_count: number; other_payer_reject_code: string;}>;
  benefit_stage_details: Array<{benefit_stage_count: number; benefit_stage_qualifier: string; benefit_stage_mount: string;}>;
}

export interface CLAIM_TEST_CLAIM_RESPONSE_FIELDS {
  submission_fields: string;
  transaction_code: string;
  // More fields
}

// API: /api/v1/member/<member_id>/claims/<claim_id>/runTestClaim/<test_claim_id>
// http method: Post
// The post data contains the data in CLAIM_DETAILS_FOR_TEST_CLAIM_RESPONSE.
export interface CLAIM_RUN_TEST_CLAIM_RESPONSE {
  // TODO: The figma is not linked.
}

// API: /api/v1/member/<member_id>/claims/<claim_id>/searchTestClaims?test_claim_id=1234&status=paid
// return the test claims associated with the claim, if no filters are present
// If filters are specified, search the test claim history and return teh test claims that satisfy the filters.
// Used in the claims popup.
// All inputs in the url
export interface CLAIM_SEARCH_TEST_CLAIMS_RESPONSE {
  test_claim_id: string;
  test_claim_lob: string; // Medicare | Commercial. Not displayed in the UI directly, but required.
  date_of_service: string; // MM-DD-YYYY format
  status: string; // Paid | Rejected | Reversed
  drug_label: string; 
  qty: number;
  days_supply:number;
  rejection_code?: number; //Only for rejected claim
  rejection_description?: string; //Only for rejected claim
  prescriber: string;
  pharmacy: string;
  member_in_transition: boolean;
  transition_claim: boolean;
  scheduled_drug: number;
  rx: string;  
  drug_tier: string;
  drug_category: string;
  drug_class: string;
  mme: string;  //2oomg,3omg,N/A
  costshare: string; //$3.00
  process_type: string;
}