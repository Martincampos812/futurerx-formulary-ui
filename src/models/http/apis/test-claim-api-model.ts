// API: /api/v1/member/<member_id>/testClaims/search
// Get test claims for a given member id. Filter based on certain properties.
// Example usage: /api/v1/member/<member_id>/testClaims/search?start_date=01-01-2019&end_date=12-31-2019&status=Paid
export interface TEST_CLAIMS_SEARCH_INPUT {
  // All props in get request
}

export interface TEST_CLAIMS_SEARCH_RESPONSE {
  test_claims: Array<TEST_CLAIM_DETAILS>;
}

export interface TEST_CLAIM_DETAILS {
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

// API: /api/v1/member/<member_id>/testClaims/newTestClaim
// API to return the data required for a new test claim
export interface TEST_CLAIMS_NEW_TEST_CLAIM_RESPONSE {
  test_claim_id: string;
  member_id: string;
  patient_zip_code: string;
  patient_first_name: string;
  patient_last_name: string;
  date_of_birth: string; // MM-DD-YYYY format
  patient_gender: string;
}

// API: /api/v1/member/<member_id>/testClaims/<test_claim_id>/runTestClaim
// Should be the same as /api/v1/member/<member_id>/claims/<claim_id>/runTestClaim/<test_claim_id>
// Run a test claim.
// http method: Post
// The post data contains the data in CLAIM_DETAILS_FOR_TEST_CLAIM_RESPONSE.