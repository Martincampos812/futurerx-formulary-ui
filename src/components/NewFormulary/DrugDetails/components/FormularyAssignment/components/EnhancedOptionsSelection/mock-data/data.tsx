import React from 'react';

export const getTierData = () => {
  return [
    { 
      key: 1,
      sequence: '1',
      tier: 'Tier 1',
      exception_details: "",
      remove: "",
    },
    { 
      key: 2,
      sequence: '2',
      tier: 'Tier 2',
      exception_details: "",
      remove: "",
    }
  ]
}

export const getTierExceptionDetailsData = () => {
  return [
    {
      key: 1,
      ddid: "9999",
      drug_name: "Lipitor 40mg",
      change_type: "Replace",
      tier: "PA",
    },
    {
      key: 2,
      ddid: "100000",
      drug_name: "Lipitor 20mg",
      change_type: "Add",
      tier: "PA",
    },
    {
      key: 3,
      ddid: "100001",
      drug_name: "Lipitor 30mg",
      change_type: "Replace",
      tier: "PA",
    },
    {
      key: 4,
      ddid: "100002",
      drug_name: "Lipitor 50mg",
      change_type: "Add",
      tier: "PA",
    },
  ]
}

export const getPAData = () => {
  return [
    { 
      key: 1,
      sequence: '1',
      pa: 'Lipitor PA 1',
      exception_details: "",
      remove: "",
    },
    { 
      key: 2,
      sequence: '2',
      pa: 'Lipitor PA 2',
      exception_details: "",
      remove: "",
    },
    { 
      key: 3,
      sequence: '3',
      pa: 'Lipitor PA 3',
      exception_details: "",
      remove: "",
    },
    { 
      key: 4,
      sequence: '4',
      pa: 'Lipitor PA 3',
      exception_details: "",
      remove: "",
    }
  ]
}

export const getPAExceptionDetailsData = () => {
  return [
    {
      key: 1,
      ddid: "9999",
      drug_name: "Lipitor 40mg",
      change_type: "Replace",
      pa_group_description: "PA",
      pa_type: "1"
    },
    {
      key: 2,
      ddid: "100000",
      drug_name: "Lipitor 20mg",
      change_type: "Add",
      pa_group_description: "PA",
      pa_type: "2"
    },
    {
      key: 3,
      ddid: "100001",
      drug_name: "Lipitor 30mg",
      change_type: "Replace",
      pa_group_description: "PA",
      pa_type: "1"
    },
    {
      key: 4,
      ddid: "100002",
      drug_name: "Lipitor 50mg",
      change_type: "Add",
      pa_group_description: "PA",
      pa_type: "2"
    },
  ]
}

export const getSTData = () => {
  return [
    { 
      key: 1,
      sequence: '1',
      st: 'Lipitor ST 1',
      exception_details: "",
      remove: "",
    },
    { 
      key: 2,
      sequence: '2',
      st: 'Lipitor ST 2',
      exception_details: "",
      remove: "",
    }
  ]
}

export const getSTExceptionDetailsData = () => {
  return [
    {
      key: 1,
      ddid: "9999",
      drug_name: "Lipitor 40mg",
      change_type: "Replace",
      st_group_description: "ST",
      st_type: "1"
    },
    {
      key: 2,
      ddid: "100000",
      drug_name: "Lipitor 20mg",
      change_type: "Add",
      st_group_description: "ST",
      st_type: "2"
    },
    {
      key: 3,
      ddid: "100001",
      drug_name: "Lipitor 30mg",
      change_type: "Replace",
      st_group_description: "ST",
      st_type: "1"
    },
    {
      key: 4,
      ddid: "100002",
      drug_name: "Lipitor 50mg",
      change_type: "Add",
      st_group_description: "ST",
      st_type: "2"
    },
  ]
}


export const getQLData = () => {
  return [
    { 
      key: 1,
      sequence: '1',
      ql: 'Lipitor QL 1',
      exception_details: "",
      remove: "",
    },
    { 
      key: 2,
      sequence: '2',
      ql: 'Lipitor QL 2',
      exception_details: "",
      remove: "",
    }
  ]
}

export const getOtherUMData = () => {
  return [
    { 
      key: 1,
      sequence: '1',
      other_um: 'Lipitor Other UM Edits 1',
      exception_details: "",
      remove: "",
    },
    { 
      key: 2,
      sequence: '2',
      other_um: 'Lipitor Other UM Edits 2',
      exception_details: "",
      remove: "",
    }
  ]
}

export const getFormularyBenefitData = () => {
  return [
    { 
      key: 1,
      formulary_benefits: 'Lipitor Other FB 1',
      exception_details: "",
    },
    { 
      key: 2,
      formulary_benefits: 'Lipitor Other FB 2',
      exception_details: "",
    }
  ]
}