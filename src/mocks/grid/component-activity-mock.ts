import FrxStatusField from "../../components/shared/FrxStatusField/FrxStatusField";
import { Column } from "../../models/grid.model";

export const getActivityTierMockData = (): any => {
    return [
            {
                id: 1,
                key: 1,
                name: "Standard Tier",
                description: "A brief description of this Tier Component.",
                type: "Tier",
                version_number: 2,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
            {
                id: 2,
                key: 2,
                name: "Enhanced Tier",
                description: "A brief description of this Tier Component.",
                type: "Tier",
                version_number: 1,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
            {
                id: 3,
                key: 3,
                name: "Specialty Tier",
                description: "A brief description of this Tier Component.",
                type: "Tier",
                version_number: 2,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
    ];
};

export const getActivityQLMockData = (): any => {
    return [
            {
                id: 1,
                key: 1,
                name: "QL 1",
                description: "A brief description of this QL Component.",
                type: "QL",
                version_number: 1,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
            {
                id: 2,
                key: 2,
                name: "QL 2",
                description: "A brief description of this QL Component.",
                type: "QL",
                version_number: 2,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
    ];
};

export const getActivitySTMockData = (): any => {
    return [
            {
                id: 1,
                key: 1,
                name: "ST 1",
                description: "A brief description of this ST Component.",
                type: "ST",
                version_number: 1,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
            {
                id: 2,
                key: 2,
                name: "ST 2",
                description: "A brief description of this ST Component.",
                type: "ST",
                version_number: 2,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
    ];
};

export const getActivityPAMockData = (): any => {
    return [
            {
                id: 1,
                key: 1,
                name: "PA 1",
                description: "A brief description of this PA Component.",
                type: "PA",
                version_number: 1,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
            {
                id: 2,
                key: 2,
                name: "PA 2",
                description: "A brief description of this PA Component.",
                type: "PA",
                version_number: 2,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
    ];
};

export const getActivityDrugDetailMockData = (): any => {
    return [
            {
                id: 1,
                key: 1,
                name: "Drug Detail 1",
                description: "A brief description of this Drug Detail Component.",
                type: "Drug Detail",
                version_number: 1,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
            {
                id: 2,
                key: 2,
                name: "Drug Detail 2",
                description: "A brief description of this Drug Detail Component.",
                type: "Drug Detail",
                version_number: 2,
                version_effective_date: "02/01/2021",
                isExpanded:false,
            },
    ];
};

export const getConflictActivityTierMockData = (): any => {
    return [
            {
                id: 1,
                key: 1,
                name: "Morphine Sulfate IJ SOLN 1 MG/ML",               
                type: "Tier",
                rxcui_count: 1,
                conflicts_count: 3,
                isExpanded:false,
            },
            {
                id: 2,
                key: 2,
                name: "Penicillin G Potassium in D5W IV SOLN 20000 UNIT/ML",               
                type: "Tier",
                rxcui_count: 1,
                conflicts_count: 10,
                isExpanded:false,
            },
            {
                id: 3,
                key: 3,
                name: "Amoxicillin PO SUSR 200 MG/5ML",               
                type: "Tier",
                rxcui_count: 1,
                conflicts_count: 9,
                isExpanded:false,
            },
            {
                id: 4,
                key: 4,
                name: "Cefotaxime Sodium IV SOLR 1 GM",               
                type: "Tier",
                rxcui_count: 1,
                conflicts_count: 2,
                isExpanded:false,
            },
            {
                id: 5,
                key: 5,
                name: "Amikacin Sulfate IJ SOLN 500 MG/2ML",               
                type: "Tier",
                rxcui_count: 1,
                conflicts_count: 20,
                isExpanded:false,
            },
    ];
};
export const getConflictExpandedMockData = (): any => {
    return [
      {
        id: 1,
        key: 1,
        sequence: 1,
        list_name: "List 1",
        conflict_type: {
            label:"Tier",
            type: "block",
            fill:"fill",
            variant:5
        },
        conflict_description: "",       
        index: 0,
      },
      {
        id: 2,
        key: 2,
        sequence: 2,
        list_name: "List 2",
        conflict_type: {
            label:"Tier",
            type: "block",
            fill:"fill",
            variant:5
        },
        conflict_description: "",       
        index: 0,
      },
      {
        id: 3,
        key: 3,
        sequence: 3,
        list_name: "List 3",
        conflict_type: {
            label:"Tier",
            type: "block",
            fill:"fill",
            variant:5
        },
        conflict_description: "",       
        index: 0,
      },
      {
        id: 4,
        key: 4,
        sequence: 4,
        list_name: "List 4",
        conflict_type: {
            label:"Tier",
            type: "block",
            fill:"fill",
            variant:5
        },
        conflict_description: "",     
        index: 0,
      },
    ];
  };
  