export interface VersionHistoryData {
  id_base_formulary: number;
  id: number;
  id_parent: number;
  formulary_name: string;
  formulary_type: string;
  cms_formulary_id: string;
  contract_year: number;
  number_of_tiers: number;
  id_formulary: number;
  version_number: number;
  effective_date: string;
  insert_datetime: string;
  is_setup_complete: boolean;
  lob_name: string;
  id_lob: number;
  number_of_drugs: number;
  assigned_to: string;
  status: string;
  step: string;
  due_date: string;
  is_add_new_version: boolean;
  is_editable: boolean;
}
