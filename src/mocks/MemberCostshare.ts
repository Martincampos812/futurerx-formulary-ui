export const getMemberCostshareTabNames = () => {
    const tabList: any[] = [
        {
            id: 1,
            text: "Deductible Stage"
        },
        {
            id: 2,
            text: "Initial Coverage Stage"
        },
        {
            id: 3,
            text: "Coverage Gap Stage"
        },
        {
            id: 4,
            text: "Catastrophic Stage"
        }
    ]
    return tabList;
}


// Mock data of member cost share tab info //

// export const getMemberCostshareTabDetails: any[] = [
//         {
//             id:0,
//             tab:"Deductible Stage",
//             aboutStage:"No Deductible",
//             aboutPaymentStage:"Because there is no deductible for the plan, this payment stage does not apply to you Deductible",
//             stageLabel: "Deductible",
//             stageInfo: "You begin in this payment stage when you fill your first prescription of the year. During this stage, you pay the full cost of your [insert if applicable: brand name OR [tier name(s)]] drugs. Your “full cost” is usually lower than the normal full price of the drug since our plan has negotiated lower costs for most drugs.The “deductible” is the amount you must pay for your Part D prescription drugs before the plan begins to pay its share. You stay in this stage until you have paid $[insert deductible amount] for your [insert if applicable: brand name OR [tier name(s)]] drugs ($[insert deductible amount] is the amount of your [insert if applicable: brand name OR [tier name(s)]] deductible)",
//         },
//         {
//             id:1,
//             tab:"Initial Coverage Stage",
//             aboutStage:"No Deductible",
//             aboutPaymentStage:"You begin this stage when you fill your first prescription of the year.",
//             stageLabel: "Deductible that applies to all drugs",
//             stageInfo: "During this stage, the plan pays its share of the cost",
//             additionalstageLabel:"Deductible that applies to some drugs",
//             additionalStageInfo:"During this stage, the plan pays its share of the cost of your [insert if applicable: generic OR [tier name(s)]] drugs and you pay your share of the cost.” After you (or others on your behalf) have met your [insert if applicable: brand name OR [tier name(s)]] deductible, the plan pays its share of the costs of your [insert if applicable: brand name OR [tier name(s)]] drugs and you pay your share. You stay in this stage until your year-to-date [insert as applicable: “total drug costs” (your payments plus any Part D plan’s payments) total $[insert initial coverage limit]. OR “out-of-pocket costs” (your payments) reach $[insert YYYY out-of-pocket threshold].] During the Initial Coverage Stage, the plan pays its share of the cost of your covered prescription drugs, and you pay your share (your [insert as applicable: copayment OR coinsurance amount OR copayment or coinsurance amount]). Your share of the cost will vary depending on the drug and where you fill your prescription. When you (or those paying on your behalf) have spent a total of $[insert YYYY out-of-pocket threshold] in out-of-pocket costs within the calendar year, you will move from the Initial Coverage Stage to the Catastrophic Coverage Stage.",
//         },
//         {
//             id:2,
//             tab:"Coverage Gap Stage",
//             aboutStage:"No additional Gap Coverage",
//             aboutPaymentStage:"During this stage, you pay 25% of the price for brand name drugs (plus a portion of the dispensing fee) and 25% of the price for generic drugs. ",
//             stageLabel: "With additional Gap Coverage only in the gap",
//             stageInfo: "For generic drugs, you pay [plans should briefly describe generic coverage. E.g., either a $10 copayment or 25% of the costs, whichever is lower]. For brand name drugs, you pay 25% of the price (plus a portion of the dispensing fee).",
//             additionalstageLabel:"Some Gap Coverage in the gap",
//             additionalStageInfo:"You stay in this stage until your year-to-date “out-of-pocket costs” (your payments) reach a total of $[insert YYYY out-of-pocket threshold.] This amount and rules for counting costs toward this amount have been set by Medicare.",
//             noGapLabel:"No Gap Coverage",
//             noGapInfo:"Because there is no coverage gap for the plan, this payment stage does not apply to you."
//         },
//         {
//             id:3,
//             tab:"Catastrophic Stage",
//             aboutStage:"",
//             aboutPaymentStage:"",
//             stageLabel: "",
//             stageInfo: "During this stage, the plan will pay most of the cost of your drugs for the rest of the calendar year (through December 31, [YYYY]). When you (or those paying on your behalf) have spent a total of $[insert 2020 out-of-pocket threshold] in out-of-pocket costs within the calendar year, you will move from the $[insert as applicable: Initial Coverage Stage OR Coverage Gap Stage] to the Catastrophic Coverage Stage. You qualify for the Catastrophic Coverage Stage when your out-of-pocket costs have reached the $[insert YYYY. out-of-pocket threshold] limit for the calendar year. Once you are in the Catastrophic Coverage Stage, you will stay in this payment stage until the end of the calendar year. During this stage, the plan will pay most of the cost for your drugs. Plans [insert appropriate option for your catastrophic cost-sharing based on Benefits]",
//             optionOne:"Option 1:",
//             stageOption1:"Your share of the cost for a covered drug will be either coinsurance or a copayment, whichever is the larger amount: – either – coinsurance of 5% of the cost of the drug – or – $[Insert YYYY catastrophic cost-sharing amount for generics/preferred multisource drugs from Benefits] for a generic drug or a drug that is treated like a generic and $[insert YYYY catastrophic cost-sharing amount for all other drugs from Benefits] for all other drugs. Our plan pays the rest of the cost.",
//             optionTwo:"Option 2:",
//             stageOption2:"[Insert appropriate tiered cost-sharing amounts from Benefits]. We will pay the rest. [If plan provides coverage for excluded drugs as a supplemental benefit, insert a description of cost-sharing in the Catastrophic Coverage Stage.]"
//         },
//     ]

// Mock data of member cost share tab info //

    // intial coverage stage table //
    export const columns = [
        {
          title: 'Network Pharmacy',
          dataIndex: 'networkPharmacy',
        },
        {
          title: 'Tier 1: Preferred Generic',
          dataIndex: 'tier1',
        },
        {
          title: 'Tier 2 : Preferred Brand',
          dataIndex: 'tier2',
        },
        {
          title: 'Tier 3 : Tier Name Here',
          dataIndex: 'tier3',
        },
        {
          title: 'Tier 4 : Tier Name Here',
          dataIndex: 'tier4',
        },
        {
          title: 'Tier 5 : Tier Name Here',
          dataIndex: 'tier5',
        },
        {
          title: 'Tier 6 : Tier Name Here',
          dataIndex: 'tier6',
        },
      ];
    export const data = [
        {
          key: '1',
          networkPharmacy: 'Standard Retail Rx 30 day supply',
          tier1: "$3.00",
          tier2: '9%',
          tier3: "$3.00",
          tier4: "$3.00",
          tier5: "$3.00",
          tier6: "$3.00",
        },
        {
          key: '2',
          networkPharmacy: 'Preferred Retail (if applicable)',
          tier1: "$1.00",
          tier2: '9%',
          tier3: "$3.00",
          tier4: "$3.00",
          tier5: "$3.00",
          tier6: "$3.00",
        },
        {
          key: '3',
          networkPharmacy: 'Standard mail order 90 day supply',
          tier1: "$9.00",
          tier2: '9%',
          tier3: "$3.00",
          tier4: "$3.00",
          tier5: "$3.00",
          tier6: "$3.00",
        },
        {
          key: '4',
          networkPharmacy: 'Standard mail order 90 day supply',
          tier1: "$32",
          tier2: '9%',
          tier3: "$3.00",
          tier4: "$3.00",
          tier5: "$3.00",
          tier6: "$3.00",
        },
        
      ];