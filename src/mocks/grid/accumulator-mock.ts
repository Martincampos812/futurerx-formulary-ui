export const getAccumulatorGridData = () => {
  return [
    {
      id: 1,
      key: 1,
      claimId: "123344567787",
      serviceDate: "09/10/2020",
      memberid: "A09834501",
      status: "Reversed",
      drugLabel: "Abilify 10 mg",
      qty:30,
      dayssupply:30,
      membercostshare: 175,
      benefitphase: "Deductible",
      amountapplied: 175
    },
    {
      id: 2,
      key: 2,
      claimId: "123344567787",
      serviceDate: "08/22/2020",
      memberid: "A09834502",
      status: "Rejected",
      drugLabel: "Atorvastatin",
      qty:30,
      dayssupply:30,
      membercostshare: 50,
      benefitphase: "Deductible",
      amountapplied: 50
    },
    {
      id: 3,
      key: 3,
      claimId: "123344567787",
      serviceDate: "07/19/2020",
      status: "Paid",
      memberid: "A09834503",
      drugLabel: "Estrace",
      qty:30,
      dayssupply:30,
      membercostshare: 35,
      benefitphase: "Deductible",
      amountapplied: 35
    },
    {
      id: 4,
      key: 4,
      claimId: "123344567787",
      serviceDate: "05/05/2020",
      status: "Paid",
      memberid: "A09834501",
      drugLabel: "Sertraline",
      qty:30,
      dayssupply:30,
      membercostshare: 35,
      benefitphase: "Deductible",
      amountapplied: 35
    },
    {
      id: 5,
      key: 5,
      claimId: "123344567787",
      serviceDate: "04/02/2020",
      status: "Paid",
      memberid: "A09834504",
      drugLabel: "Ibuprofen",
      qty:30,
      dayssupply:30,
      membercostshare: 100,
      benefitphase: "Deductible",
      amountapplied: 100
    }
  ];
};
