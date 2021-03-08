const optionsForCommAndExch = [
  { key: "", value: "All" },
  { key: "formularyName", value: "Formulary Name" },
  // { key: "associated-contracts", value: "Associated Contracts" },
  { key: "breadcrumbs", value: "Breadcrumb" },
  // { key: "formulary-types", value: "Formulary Type" },
  // { key: "medicare-contract-types", value: "Medicare Contract Type" },
  // { key: "client-states", value: "State" },
  { key: "tier-descriptions", value: "Tier Description" },
  { key: "none", value: "None" },
];

export const getSearchCategoryOptions = (lob: any) => {
  switch (lob) {
    case 3:
      return optionsForCommAndExch;
    case 4:
      return optionsForCommAndExch;
    default:
      return [
        { key: "", value: "All" },
        { key: "formularyName", value: "Formulary Name" },
        // { key: "associated-contracts", value: "Associated Contracts" },
        { key: "breadcrumbs", value: "Breadcrumb" },
        { key: "formulary-types", value: "Formulary Type" },
        { key: "medicare-contract-types", value: "Medicare Contract Type" },
        { key: "client-states", value: "State" },
        { key: "tier-descriptions", value: "Tier Description" },
        { key: "none", value: "None" },
      ];
  }
};
