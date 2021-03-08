import React from "react";
import { Column } from "../../../../../models/grid.model";
import { dateFilters, textFilters } from "../../../../../utils/grid/filters";
import AlternativeColumn from "./AlternativeGridUI/AlternativeColumn";

// Place of Service
// Covered Place of Service
// Not Covered Place of Service
// Tier
// Label Name
// DDID
// GPI
// Trademark
// Database Category
// Database Class
// Created By
// Created On
// Modified By
// Modified On

const POS_COL_DATA = [
  {
    key: "placeOfService",
    displayTitle: "Place of Service",
  },
  {
    key: "coveredPlaceOfService",
    displayTitle: "Covered Place of Service",
  },
  {
    key: "notCoveredPlaceOfService",
    displayTitle: "Not Covered Place of Service",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const FFF_COMM_COL_DATA = [
  {
    key: "freeFirstFill",
    displayTitle: "Free First Fill",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const PT_COL_DATA = [
  {
    key: "prescriberTaxonomy",
    displayTitle: "Prescriber Taxonomy",
  },
  {
    key: "coveredTaxonomy",
    displayTitle: "Covered Taxonomy",
  },
  {
    key: "notCoveredTaxonomy",
    displayTitle: "Not Covered Taxonomy",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const OTHER_COL_DATA = [
  {
    key: "userDefined",
    displayTitle: "User Defined",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const PR_COL_DATA = [
  {
    key: "patientResidence",
    displayTitle: "Patient Residence",
  },
  {
    key: "coveredpatientResidence",
    displayTitle: "Covered Patient Residence",
  },
  {
    key: "notCoveredpatientResidence",
    displayTitle: "Not Covered Patient Residence",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const PN_COL_DATA = [
  {
    key: "pharmacyNetwork",
    displayTitle: "Pharmacy Network",
  },
  {
    key: "coveredNetwork",
    displayTitle: "Covered Network",
  },
  {
    key: "notCoveredNetwork",
    displayTitle: "Not Covered Network",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const ICD_COL_DATA = [
  {
    key: "icdLimit",
    displayTitle: "ICD Limits",
  },
  {
    key: "coveredIcd",
    displayTitle: "Covered ICD",
  },
  {
    key: "icdLookBack",
    displayTitle: "ICD Lookback Days",
  },
  {
    key: "not_covered_icds",
    displayTitle: "Not Covered ICD",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const GL_COL_DATA = [
  {
    key: "genderLimit",
    displayTitle: "Gender Limits",
  },
  {
    key: "coveredGender",
    displayTitle: "Covered Gender",
  },
  {
    key: "noCoveredGender",
    displayTitle: "Not Covered Gender",
  },
  {
    key: "tier",
    displayTitle: "Tier",
  },
  {
    key: "labelName",
    displayTitle: "Label Name",
  },
  {
    key: "ddid",
    displayTitle: "DDID",
  },
  {
    key: "gpi",
    displayTitle: "GPI",
  },
  {
    key: "trademark",
    displayTitle: "Trademark",
  },
  {
    key: "databaseCategory",
    displayTitle: "Database Category",
  },
  {
    key: "databaseClass",
    displayTitle: "Database Class",
  },
  {
    key: "createdBy",
    displayTitle: "Created By",
  },
  {
    key: "createdOn",
    displayTitle: "Created On",
  },
  {
    key: "modifiedBy",
    displayTitle: "Modified By",
  },
  {
    key: "modifiedOn",
    displayTitle: "Modified On",
  },
];

const AL_COL_DATA = [
  {
    key: "is_al",
    displayTitle: "Age Limits",
  },
  {
    key: "covered_min_operators",
    displayTitle: "Covered Min",
  },
  {
    key: "covered_min_ages",
    displayTitle: "Covered Age Min",
  },
  {
    key: "covered_max_operators",
    displayTitle: "Coverage Max",
  },
  {
    key: "covered_max_ages",
    displayTitle: "Covered Age Max",
  },
  {
    key: "not_covered_min_operators",
    displayTitle: "Not Covered Min",
  },
  {
    key: "not_covered_min_ages",
    displayTitle: "Not Covered Age Min",
  },
  {
    key: "not_covered_max_operators",
    displayTitle: "Not Covered Max",
  },
  {
    key: "not_covered_max_ages",
    displayTitle: "Not Covered Age Max",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "drug_descriptor_identifier",
    displayTitle: "DDID",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
];

const FFF_MED_COL_DATA = [
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const IBF_COL_DATA = [
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeshCUI",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const LA_COL_DATA = [
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "drug_descriptor_identifier",
    displayTitle: "DDID",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const SSM_COL_DATA = [
  {
    key: "is_ssm",
    displayTitle: "SSM",
  },
  {
    key: "ssm_contract_id",
    displayTitle: "SSM Contract ID",
  },
  {
    key: "ssm_pbp_id",
    displayTitle: "SSM PBP ID",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const VBID_COL_DATA = [
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "vbid_contract_id",
    displayTitle: "VBID Contract ID",
  },
  {
    key: "vbid_pbp_id",
    displayTitle: "VBID PBP",
  },
  {
    key: "vbid_pbp_id",
    displayTitle: "VBID Package",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "SSM",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const MO_COL_DATA = [
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const PBST_COL_DATA = [
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const AF_COL_DATA = [
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const NM_COL_DATA = [
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const CB_COL_DATA = [
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeshCUI",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const LIS_COL_DATA = [
  {
    key: "is_lis",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeshCUI",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const SO_COL_DATA = [
  {
    key: "user_defined",
    displayTitle: "User Defined",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const HI_COL_DATA = [
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

const PGC_COL_DATA = [
  {
    key: "is_pgc",
    displayTitle: "Partial Gap Coverage",
  },
  {
    key: "tier_value",
    displayTitle: "Tier",
  },
  {
    key: "file_type",
    displayTitle: "File Type",
  },
  {
    key: "data_source",
    displayTitle: "Data Source",
  },
  {
    key: "ndc",
    displayTitle: "(NDC)",
  },
  {
    key: "rxcui",
    displayTitle: "RXCUI",
  },
  {
    key: "tty",
    displayTitle: "TTY",
  },
  {
    key: "generic_product_identifier",
    displayTitle: "GPI",
  },
  {
    key: "drug_label_name",
    displayTitle: "Label Name",
  },
  {
    key: "trademark_code",
    displayTitle: "Trademark",
  },
  {
    key: "database_category",
    displayTitle: "Database Category",
  },
  {
    key: "database_class",
    displayTitle: "Database Class",
  },
  {
    key: "created_by",
    displayTitle: "Created By",
  },
  {
    key: "created_date",
    displayTitle: "Created On",
  },
  {
    key: "modified_by",
    displayTitle: "Modified By",
  },
  {
    key: "modified_date",
    displayTitle: "Modified On",
  },
  {
    key: "pa_group_description",
    displayTitle: "PA Group Description",
  },
  {
    key: "pa_type",
    displayTitle: "PA Type",
  },
  {
    key: "st_group_description",
    displayTitle: "ST Group Description",
  },
  {
    key: "st_type",
    displayTitle: "ST Type",
  },
  {
    key: "st_value",
    displayTitle: "ST Value",
  },
  {
    key: "ql_type",
    displayTitle: "QL Type",
  },
  {
    key: "ql_quantity",
    displayTitle: "QL Amount",
  },
  {
    key: "ql_days",
    displayTitle: "QL Days",
  },
  {
    key: "is_la",
    displayTitle: "LA",
  },
  {
    key: "is_mo",
    displayTitle: "MO Indicator",
  },
  {
    key: "is_nm",
    displayTitle: "NM Indicator",
  },
  {
    key: "is_ssm",
    displayTitle: "Senior Savings Model",
  },
  {
    key: "is_ibf",
    displayTitle: "Indicated Base Formulary",
  },
  {
    key: "me_shcui",
    displayTitle: "MeSH CUI",
  },
  {
    key: "is_hi",
    displayTitle: "Home Infusion",
  },
  {
    key: "is_fff",
    displayTitle: "Free First Fill",
  },
  {
    key: "is_vbid",
    displayTitle: "VBID",
  },
  {
    key: "is_cb",
    displayTitle: "Capped Benefits",
  },
  {
    key: "cb_quanity",
    displayTitle: "Capped Benefits Qty",
  },
  {
    key: "cb_days",
    displayTitle: "Capped Benefits Days",
  },
  {
    key: "lis_red",
    displayTitle: "LIS-Cost Sharing Reduction",
  },
  {
    key: "lis_cost_sharing_amount",
    displayTitle: "LIS-Cost Sharing Amount",
  },
  {
    key: "is_pbst",
    displayTitle: "PBST",
  },
  {
    key: "is_abr_formulary",
    displayTitle: "Abr Form",
  },
  {
    key: "is_user_defined_1",
    displayTitle: "User Defined 1",
  },
  {
    key: "is_user_defined_2",
    displayTitle: "User Defined 2",
  },
  {
    key: "is_user_defined_3",
    displayTitle: "User Defined 3",
  },
  {
    key: "is_user_defined_4",
    displayTitle: "User Defined 4",
  },
  {
    key: "is_user_defined_5",
    displayTitle: "User Defined 5",
  },
];

export const buildColumnObject = (colList: any[]) => {
  return colList.map((e: any, i) => {
    let tmpObj: Column<any> = {
      position: i + 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: e?.key,
      displayTitle: e?.displayTitle,
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    };
    return tmpObj;
  });
};

export const getDrugDetailsColumnPOS: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(POS_COL_DATA),
  ];
};

export const getDrugDetailsColumnFFFCOMM: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(FFF_COMM_COL_DATA),
  ];
};

export const getDrugDetailsColumnPT: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(PT_COL_DATA),
  ];
};

export const getDrugDetailsColumnOTHER: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(OTHER_COL_DATA),
  ];
};

export const getDrugDetailsColumnPR: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(PR_COL_DATA),
  ];
};

export const getDrugDetailsColumnPN: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(PN_COL_DATA),
  ];
};

export const getDrugDetailsColumnICD: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(ICD_COL_DATA),
  ];
};

export const getDrugDetailsColumnGL: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(GL_COL_DATA),
  ];
};

export const getDrugDetailsColumnAL: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(AL_COL_DATA),
  ];
};

export const getDrugDetailsColumnLA: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(LA_COL_DATA),
  ];
};

export const getDrugDetailsColumnSSM: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(SSM_COL_DATA),
  ];
};

export const getDrugDetailsColumnVBID: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(VBID_COL_DATA),
  ];
};

export const getDrugDetailsColumnAF: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(AF_COL_DATA),
  ];
};

export const getDrugDetailsColumnPBST: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(PBST_COL_DATA),
  ];
};

export const getDrugDetailsColumnMO: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(MO_COL_DATA),
  ];
};

export const getDrugDetailsColumnNM: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(NM_COL_DATA),
  ];
};

export const getDrugDetailsColumnIBF: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(IBF_COL_DATA),
  ];
};

export const getDrugDetailsColumnCB: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(CB_COL_DATA),
  ];
};

export const getDrugDetailsColumnLIS: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(LIS_COL_DATA),
  ];
};

export const getDrugDetailsColumnSO: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(SO_COL_DATA),
  ];
};

export const getDrugDetailsColumnHI: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(HI_COL_DATA),
  ];
};

export const getDrugDetailsColumnPGC: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(PGC_COL_DATA),
  ];
};

export const getDrugDetailsColumnFFFMED: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 50,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    ...buildColumnObject(FFF_MED_COL_DATA),
  ];
};
export const getDrugDetailsColumn: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "labelName",
      displayTitle: "Label Name",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 125,
      key: "tier",
      isFilterable: true,
      showToolTip: false,
      displayTitle: "tier",
      dataType: "string",
      filters: dateFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      isFilterable: true,
      pixelWidth: 155,
      key: "fileType",
      displayTitle: "file type",
      dataType: "string",
      filters: dateFilters,
      hidden: false,
      sortDirections: [],
      showToolTip: false,
    },
    {
      position: 4,
      textCase: "upper",
      pixelWidth: 180,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "dataSource",
      displayTitle: "data source",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 5,
      textCase: "upper",
      pixelWidth: 125,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "ndc",
      displayTitle: "ndc",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 6,
      textCase: "upper",
      pixelWidth: 125,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "ddid",
      displayTitle: "ddid",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 7,
      textCase: "upper",
      pixelWidth: 135,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "rxcui",
      displayTitle: "rxcui",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 8,
      textCase: "upper",
      pixelWidth: 125,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "tty",
      displayTitle: "tty",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 9,
      textCase: "upper",
      pixelWidth: 160,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "gpi",
      displayTitle: "gpi",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 10,
      textCase: "upper",
      pixelWidth: 170,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "trademark",
      displayTitle: "trademark",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 11,
      textCase: "upper",
      pixelWidth: 220,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "databaseCategory",
      displayTitle: "database category",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 12,
      textCase: "upper",
      pixelWidth: 280,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "databaseClass",
      displayTitle: "database class",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 13,
      textCase: "upper",
      pixelWidth: 170,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "createdBy",
      displayTitle: "created by",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 14,
      textCase: "upper",
      pixelWidth: 205,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "createdOn",
      displayTitle: "created on",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 15,
      textCase: "upper",
      pixelWidth: 170,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "modifiedBy",
      displayTitle: "modified by",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 16,
      textCase: "upper",
      pixelWidth: 205,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "modifiedOn",
      displayTitle: "modified on",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 17,
      textCase: "upper",
      pixelWidth: 235,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "paGroupDescription",
      displayTitle: "pa group description",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 18,
      textCase: "upper",
      pixelWidth: 235,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "stGroupDescription",
      displayTitle: "st group description",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 19,
      textCase: "upper",
      pixelWidth: 235,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "stepTherapyType",
      displayTitle: "step therapy type",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 20,
      textCase: "upper",
      pixelWidth: 215,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "stepTherapyValue",
      displayTitle: "step therapy value",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 21,
      textCase: "upper",
      pixelWidth: 225,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "qlType",
      displayTitle: "ql type",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 22,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "qlAmount",
      displayTitle: "ql amount",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 23,
      textCase: "upper",
      pixelWidth: 170,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "qlDays",
      displayTitle: "ql days",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 24,
      textCase: "upper",
      pixelWidth: 182,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "moIndicator",
      displayTitle: "mo indicator",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 25,
      textCase: "upper",
      pixelWidth: 182,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "mnIndicator",
      displayTitle: "mn indicator",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 26,
      textCase: "upper",
      pixelWidth: 240,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "seniorSavingsModel",
      displayTitle: "senior savings model",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 27,
      textCase: "upper",
      pixelWidth: 265,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "indicatedBaseFormulary",
      displayTitle: "indicated base formulary",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 28,
      textCase: "upper",
      pixelWidth: 155,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "meshCui",
      displayTitle: "mesh cui",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 29,
      textCase: "upper",
      pixelWidth: 236,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "partialGapCoverage",
      displayTitle: "partial gap coverage",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 30,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_cb",
      displayTitle: "CB",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 31,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_fff",
      displayTitle: "fff",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 32,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_gc",
      displayTitle: "GC",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 33,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_hi",
      displayTitle: "hi",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 34,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_ibf",
      displayTitle: "ibf",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 35,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_la",
      displayTitle: "la",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 36,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_lis",
      displayTitle: "lis",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 37,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_mo",
      displayTitle: "mo",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 38,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_nm",
      displayTitle: "nm",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 39,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_pgc",
      displayTitle: "pgc",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 40,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_pbst",
      displayTitle: "pbst",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 41,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_ssm",
      displayTitle: "ssm",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
    {
      position: 42,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "is_vbid",
      displayTitle: "vbid",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: [],
    },
  ];
};
export const getAlternativesDrugListColumn: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 80,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    {
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: "rxcui",
      displayTitle: "rxcui",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 300,
      key: "alternatives",
      isFilterable: true,
      showToolTip: false,
      displayTitle: "alternative(s)",
      customContent: (data) => (
        <AlternativeColumn
          id={data.data.rxcui}
          alternative={data.data.alternatives}
        />
      ),
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      isFilterable: true,
      pixelWidth: 200,
      key: "generic_product_identifier",
      displayTitle: "gpi",
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
      showToolTip: false,
    },
    {
      position: 5,
      textCase: "upper",
      pixelWidth: 300,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "drug_label_name",
      displayTitle: "label name",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 6,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "trademark",
      displayTitle: "trademark",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 7,
      textCase: "upper",
      pixelWidth: 250,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "category",
      displayTitle: "category",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 8,
      textCase: "upper",
      pixelWidth: 250,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "class",
      displayTitle: "class",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 9,
      textCase: "upper",
      pixelWidth: 250,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "modified_by",
      displayTitle: "modified by",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};

export const getAlternativesFormulariesListColumn: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 40,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    {
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 180,
      key: "version_number",
      displayTitle: "version for updates",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 180,
      key: "",
      isFilterable: true,
      showToolTip: false,
      displayTitle: "last approved version",
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      isFilterable: true,
      pixelWidth: 150,
      key: "id_formulary",
      displayTitle: "formulary id",
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
      showToolTip: false,
    },
    {
      position: 5,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "formulary_name",
      displayTitle: "formulary name",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 6,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "contract_year",
      displayTitle: "contract year",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      position: 7,
      textCase: "upper",
      pixelWidth: 150,
      sorter: {},
      isFilterable: true,
      showToolTip: false,
      key: "formulary_type",
      displayTitle: "formulary type",
      filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};

export const getStDetails: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "STGROUPDESCRIPTION",
      displayTitle: "ST GROUP DESCRIPTION",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};

export const getStDetailsCol2: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "STGROUPDESCRIPTION",
      displayTitle: "ST GROUP DESCRIPTION",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "STTHERPYTYPE",
      displayTitle: "ST THERPY TYPE",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "STTHERPYVALUE",
      displayTitle: "ST THERPY VALUE",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "LABELNAME",
      displayTitle: "LABEL",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "TIER",
      displayTitle: "TIER",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 230,
      key: "FILETYPE",
      displayTitle: "FILE TYPE",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
  ];
};

export const getMMDrugDetailsColumns: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      textCase: "upper",
      pixelWidth: 5,
      isFilterable: false,
      key: "checkbox",
      fixed: "left",
      displayTitle: "",
      headerCellSelection: true,
      hidden: false,
    },
    {
      id: 2,
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 10,
      key: "data_source",
      displayTitle: "DATA SOURCE",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 3,
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 20,
      key: "drug_label_name",
      displayTitle: "LABEL NAME",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 4,
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 5,
      key: "drug_descriptor_identifier",
      displayTitle: "DDID",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 5,
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 30,
      key: "gpi",
      displayTitle: "GPI",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 6,
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 5,
      key: "trademark_code",
      displayTitle: "TRADEMARK",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};
