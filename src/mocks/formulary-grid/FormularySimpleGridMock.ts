export const getDrugsList = () => [
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  { drug: "Lipitor 120mg" },
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  { drug: "Lipitor 120mg" },
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  
  
];

export const getColumns = () => [
  {
    title: "FORMULARY NAME",
    dataIndex: "formulary_name",
    key: "id_formulary",
    className: "table-head-color",
  },
  {
    title: "FORMULARY ID",
    dataIndex: "id_formulary",
    key: "id_formulary",
    className: "table-head-color",
  },
  {
    title: "FORMULARY VERSION",
    dataIndex: "version_number",
    key: "version_number",
    className: "table-head-center",
  },
  {
    title: "CONTRACT YEAR",
    dataIndex: "contract_year",
    key: "contract_year",
    className: "table-head-center",
  },
  {
    title: "FORMULARY TYPE",
    dataIndex: "formulary_type",
    key: "formulary_type",
    className: "table-head-center",
  },

  {
    title: "EFFECTIVE DATE",
    dataIndex: "effective_date",
    key: "effective_date",
    className: "table-head-center",
  },
];

export const getPACommercialData = () => {
  return [
    {
      key: "1",
      formularyName: "LEGA_COMM_12",
      formularyId: "3514",
      formularyVersion: 2,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "2",
      formularyName: "Comme_Test-3",
      formularyId: "3588",      
      formularyVersion: 3,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "3",
      formularyName: "WK_49_COMM_08",
      formularyId: "3466",      
      formularyVersion: 4,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "4",
      formularyName: "Comm_Test_45",
      formularyId: "3554",      
      formularyVersion: 5,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
  ];
};

export const getData = () => {
  return [
    {
      key: "1",
      formularyName: "2021Care1234",
      formularyId: "123456789123",
      formularyVersion: 2,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "2",
      formularyName: "Medicare12",
      formularyId: "123456789124",
      formularyVersion: 3,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "3",
      formularyName: "2021Care4321",
      formularyId: "980765854321",
      formularyVersion: 4,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "4",
      formularyName: "Care987",
      formularyId: "192039483745",
      formularyVersion: 5,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
  ];
};

export const getCommercialData = () => {
  return [
    {
      key: "1",
      formularyName: "LEGA_COMM_12",
      formularyId: "3514",
      formularyVersion: 2,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "2",
      formularyName: "Comme_Test-3",
      formularyId: "3588",      
      formularyVersion: 3,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "3",
      formularyName: "WK_49_COMM_08",
      formularyId: "3466",      
      formularyVersion: 4,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "4",
      formularyName: "Comm_Test_45",
      formularyId: "3554",      
      formularyVersion: 5,
      contractYeat: "2021",
      formularyType: "Commercial",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
  ];
};
