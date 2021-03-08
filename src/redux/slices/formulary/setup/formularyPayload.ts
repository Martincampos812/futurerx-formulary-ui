export interface FormularyPost {
  formulary_info: {
    id_formulary_type: number;
    formulary_type_name: string;
    id_lob: number;
    code_value: string;

    formulary_name: string;
    abbreviation: string;
    formulary_description: string;
    formulary_build_method: string;
    effective_date: string;
    contract_year: number;
    id_submission_month: null;
    is_closed_formulary: true;

    id_classification_system: number;
    id_classification_system_other: any;
    id_state: null;
    resemble_formulary_id: null;

    number_of_tiers: number;
    min_tiers: number;
    max_tiers: number;

    is_standard_template: null;
    parent_formulary_id: null;

    cms_formulary_id: any;
    abridged_forumulary_creation: null;
    formulary_basis: null;
    is_carve_out: null;

    import_file_path: any;
    import_file_name: any;

    medicare_types_ref: [];
    medicare_types_ref_other: false;
  };
  classification_system_info: {
    id_classification_system: number;
    is_custom: boolean;
    classification_system: any;
  };
  carve_out_info: {
    carve_outs: any[];
    custom_carve_outs: any[];
    removed_formulary_carve_outs: any[];
  };
  asscociated_contract_pbp_info: {
    asscociated_contract_pbps: any[];
    removed_formulary_asscociated_contract_pbps: any[];
  };
  tiers: {
    id_formulary_tier: number;
    id_tier_label: number;
    id_tier: number;
  }[];

  edit_info: {
    edits: number[];
    edits_no: any[];
    custom_edits: any[];
    removed_formulary_edits: any[];
  };

  supplemental_benefit_info: {
    supplemental_benefits: any[];
    custom_supplemental_benefits: any[];
    removed_formulary_supplemental_benefits: any[];
  };
  is_validation_required: boolean;
  cms_override: boolean;
}

const POST_TEMPLATE_0 = {
  formulary_info: {
    id_formulary_type: 6,
    formulary_type_name: "Commercial",
    id_lob: 4,
    code_value: "COMM",

    formulary_name: "FRXFORM2-1164_COMM_01",
    abbreviation: "ABBR",
    formulary_description: "DESC",
    formulary_build_method: "N",
    effective_date: "2020-12-15",
    contract_year: 2021,
    id_submission_month: null,
    is_closed_formulary: true,

    id_classification_system: 10,
    id_classification_system_other: "",
    id_state: null,
    resemble_formulary_id: null,

    number_of_tiers: 2,
    min_tiers: 1,
    max_tiers: 20,

    is_standard_template: null,
    parent_formulary_id: null,

    cms_formulary_id: "",
    abridged_forumulary_creation: null,
    formulary_basis: null,
    is_carve_out: null,

    import_file_path: "",
    import_file_name: "",

    medicare_types_ref: [],
    medicare_types_ref_other: false,
  },
  classification_system_info: {
    id_classification_system: 10,
    is_custom: false,
    classification_system: "",
  },
  carve_out_info: {
    carve_outs: [],
    custom_carve_outs: [],
    removed_formulary_carve_outs: [],
  },
  asscociated_contract_pbp_info: {
    asscociated_contract_pbps: [],
    removed_formulary_asscociated_contract_pbps: [],
  },
  tiers: [
    {
      id_formulary_tier: null,
      id_tier_label: 89,
      id_tier: 1,
    },
    {
      id_formulary_tier: null,
      id_tier_label: 81,
      id_tier: 2,
    },
  ],

  edit_info: {
    edits: [58],
    edits_no: [],
    custom_edits: [],
    removed_formulary_edits: [],
  },

  supplemental_benefit_info: {
    supplemental_benefits: [],
    custom_supplemental_benefits: [],
    removed_formulary_supplemental_benefits: [],
  },
  is_validation_required: false,
  cms_override: false,
};
