/**
 * API: /bestprice/search
 */

// Input type
export interface BESTPRICE_SEARCH_INPUT {
  member_id: string,
  // Maximum of 3 drugs
  // consider_generic - if not provided, defaults to false
  drugs: Array<{drug_label: string, quantity: number, 
              days: number, consider_generic?: boolean}>, 
  location: {city: string, state: string, zipcode: string}
}

// Response type
export interface BESTPRICE_SEARCH_RESPONSE {
  cost_effective: Array<{
                    drug_label: string,
                    generic_drug_name?: string,
                    drugs_availability: Array<BESTPRICE_SEARCH_DRUG_AVAILIABITY_BY_DRUG>,
                    drug_image_url: string,
                    drug_description: string,
                    drug_brand: string
                  }>,
  best_pharmacy: {pharmacy: BESTPRICE_PHARMACY_DETAILS,
                  total_cost: number,
                  drugs_in_pharmacy: Array<BESTPRICE_SEARCH_DRUG_AVAILIABITY_BY_PHARMACY>,
                  other_services: Array<BESTPRICE_SEARCH_OTHER_SERVICES_BY_PHARMACY>
                }
}

export interface BESTPRICE_SEARCH_RESPONSE2 {
  drugs: Array<BESTPRICE_DRUG_DETAILS>,
  pharmacies: Array<BESTPRICE_PHARMACY_DETAILS>,
  drug_to_pharmacies: [{
    drug_id: string,
    drug_availability: Array<BESTPRICE_DRUG_AVAILABILITY_IN_PHARMACIES>,
  }],
  other_services: Array<{
    id: string,
    name: string
  }>,
  pharmacy_to_other_services: [{
    pharmacy_id: string,
    other_services: [{other_service_id: string, best_price: number, type: string}]
  }]
}

// Where is the drug available, best price, etc
export interface BESTPRICE_SEARCH_DRUG_AVAILIABITY_BY_DRUG {
  pharmacy_details: BESTPRICE_PHARMACY_DETAILS,
  is_preferred_network_pharmacy: boolean,
  brand: {
    name: string,
    best_price: number, // Prepend $ to display
    type: string,  // "Discount" | "Match" | "Copay" | "Program"
  },
  generic?: {
    name: string,
    best_price: number, // Prepend $ to display
    type: string,  // "Discount" | "Match" | "Copay" | "Program"
  } 
}

// What drugs are available in the pharma, best price, etc
export interface BESTPRICE_SEARCH_DRUG_AVAILIABITY_BY_PHARMACY {
  drug_label: string,
  brand: {
    name: string,
    best_price: number, // Prepend $ to display
    type: string,  // "Discount" | "Match" | "Copay" | "Program"
  },
  generic?: {
    name: string,
    best_price: number, // Prepend $ to display
    type: string,  // "Discount" | "Match" | "Copay" | "Program"
  } 
}

export interface BESTPRICE_SEARCH_OTHER_SERVICES_BY_PHARMACY {
  service_name: string,
  best_price: number, // Prepend $ to display
  type: string,  // "Discount" | "Match" | "Copay" | "Program"
}

export interface BESTPRICE_SEARCH_OPERATING_HOURS {
  timezone: string,
  timings: Array<{day: string, from: string, to: string, isClosed?: boolean}>
}

export interface BESTPRICE_PHARMACY_DETAILS {
  name: string,
  address: {address1: string, address2?:string,
           city: string, state: string, zipcode: string},
  phone: string,
  fax: string,
  operating_hours: BESTPRICE_SEARCH_OPERATING_HOURS
}

export interface BESTPRICE_DRUG_DETAILS {
  id: string,
  drug_brand: string,
  drug_name: string,
  drug_quantity: number,
  drug_generic_name: string,
  drug_image_url: string,
  drug_description: string
}

export interface BESTPRICE_DRUG_AVAILABILITY_IN_PHARMACIES {
  drug_id: string,
  drug_availability: [{
    pharmacy_id: string,
    brand_best_price: number,
    generic_best_price?: number, // Optional
    type: string
  }]
}

/**
 * API: /bestprice/drugsearch
 * Drug search with autocomplete
 */
// Input type
 export interface BESTPRICE_DRUG_SEARCH_INPUT {
   search_string: string
 }

 // Output type
 export interface BESTPRICE_DRUG_SEARCH_RESPONSE {
   drug_labels: Array<string>
 }


// const best_price_search_response = 
// {
//    drugs: [
//     {
//       id: "D234",
//       drug_brand: "Voltaren",
//       drug_name: "Diclofenac 75mg",
//       drug_quantity: 30,
//       drug_generic_name: "Generic Voltaren",
//       drug_image_url: "http://...",
//       drug_description: "This drug is used to...",
//     }
//   ],
//   pharmacies: [
//     {
//     id: "P123",
//     name: "Best Pharma",
//     address: {address1: "123, that apartment", address2:"this street", // address2 optional
//               city: "Tampa", state: "FL", zipcode: "33601"},
//     phone: "123-456-7890",
//     fax: "123-456-7890",
//     operating_hours: [{
//       timezone: "EST",
//       timings: [{day: "MON", from: "9 AM", to: "6 PM", isClosed: false}] // isClosed optional
//     }]
//     }
//   ],
//   drug_to_pharmacies: [{
//     drug_id: "D234",
//     drug_availability: [{
//       pharmacy_id: "P123",
//       brand_best_price: "$50",
//       generic_best_price: "$18", // Optional
//       type: "Copay"
//     }]
//   }],
//   other_services: [{
//     id: "O345",
//     name: "Flu shot"
//   }],
//   pharmacy_to_other_services: [{
//     pharmacy_id: "P123",
//     other_services: [{other_service_id: "O345", best_price: "$0", type: "Program"}]
//   }]
// }
