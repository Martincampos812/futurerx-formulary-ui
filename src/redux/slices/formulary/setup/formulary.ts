import { fetchSelectedFormulary } from "./setupSlice";

export interface Formulary {
  id_formulary: any;
  is_editable: boolean;
  id_base_formulary: any;
  formulary_info: {
    is_standard_template: any;
    formulary_name: any;
    contract_year: any;
    abbreviation: any;
    resemble_formulary_id: any;
    formulary_description: any;
    is_closed_formulary: any;
    id_formulary_type: any;
    cms_formulary_id: any;
    abridged_forumulary_creation: any;
    formulary_basis: any;
    is_carve_out: any;
    number_of_tiers: any;
    id_classification_system: any;
    id_state: any;
    formulary_build_method: any;
    parent_formulary_id: any;
    effective_date: any;
    id_submission_month: any;
    is_setup_complete: boolean;
    version_number: any;
  };
  formulary_type_info: {
    id_formulary_type: any;
    id_lob: any;
    formulary_type: any;
    min_tiers: any;
    max_tiers: any;
    formulary_type_code: any;
  };
  edit_info: { id_formulary_edit: any; id_edit: any }[];
  medicare_contract_types: {
    id_formulary_medicare_contract: any;
    id_medicare_contract_type: any;
  }[];
  associated_contract_pbps: {
    id_formulary_associated_contract_pbp: any;
    asscociated_contract: any;
    associated_pbp: any;
  }[];
  carve_outs: {
    id_formulary_carve_out: any;
    id_carve_out: any;
    carve_out: any;
    is_custom: any;
    code_value: any;
  }[];
  tiers: {
    id_formulary_tier: any;
    id_tier_label: any;
    id_tier: any;
    tier_name: any;
  }[];
  edits: { id_formulary_edit: any; id_edit: any }[];
  supplemental_benefits: {
    id_formulary_supplemental_benefit: any;
    id_supplemental_benefit: any;
  }[];
}

export {};
