import React from "react";
import TreeNodeTitle from "./components/TreeComponents/TreeNodeTitle/TreeNodeTitle";

export const getCategoryList = () => {
  const categories = [
    {
      id: 1,
      category: "GPI/Generic Name/Label Name/ RXCUI",
    },
    {
      id: 2,
      category: "Reference NDC",
    },
    {
      id: 3,
      category: "Drug Category/Class",
    },
    {
      id: 4,
      category: "File Type",
    },
    {
      id: 5,
      category: "Tier",
    },
    {
      id: 6,
      category: "UM Filter",
    },
    /*{
      id: 7,
      category: "Alternative Drugs",
    },*/
  ];
  return categories;
};

export const getAdditionalCriteriaSectionList = () => {
  return [
    {
      id: 1,
      name: "age",
      criteria: "Age",
    },
    {
      id: 2,
      name: "gender",
      criteria: "Gender",
    },
    {
      id: 3,
      name: "icd",
      criteria: "ICD",
    },
    {
      id: 4,
      name: "pharmacy_networks",
      criteria: "Pharmacy Network",
    },
    {
      id: 5,
      name: "prescriber_taxonomies",
      criteria: "Prescriber Taxonomy",
    },
    {
      id: 6,
      name: "place_of_services",
      criteria: "Place of Service",
    },
    {
      id: 7,
      name: "patient_residences",
      criteria: "Patient Residence",
    },
    {
      id: 8,
      name: "prerequisite_claims_history_lookbacks",
      criteria: "Prerequisite Claims History & Lookback",
    },
  ];
};

export const getAdditionalCriteria = () => {
  const categories: any[] = [
    {
      id: 1,
      category: "Age",
    },
    {
      id: 2,
      category: "Gender",
    },
    {
      id: 3,
      category: "ICD",
    },
    {
      id: 4,
      category: "Pharmacy Network",
    },
    {
      id: 5,
      category: "Prescriber Taxonomy",
    },
    {
      id: 6,
      category: "Place of Service",
    },
    {
      id: 7,
      category: "Patient Residence",
    },
    {
      id: 8,
      category: "Prerequisite Claims History & Lookback",
    },
  ];
  return categories;
};
