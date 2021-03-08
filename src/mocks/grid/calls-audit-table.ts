export const getCallsAuditGridData = () => {
  return [
    {
      id: 1,
      key: 1,
      callFlowOrder: 1,
      userName: "Jim",
      userGroup: "CSR Level 1",
      callHandleTime: "00:04:00",
      afterCallWorkTime: "00:05:00",
      totalCallTime: "00:05:00",
      totalHoldTime: "00:05:00",
      totalTasks: 2,
      totalSubTasks: 0,
      callStatus: "Call transferred"
    },
    {
      id: 2,
      key: 2,
      callFlowOrder: 2,
      userName: "On hold",
      userGroup: "",
      callHandleTime: "00:04:00",
      afterCallWorkTime: "00:05:00",
      totalCallTime: "00:05:00",
      totalHoldTime: "00:05:00",
      totalTasks: 2,
      totalSubTasks: 0,
      callStatus: "Call transferred"
    },
    {
      id: 3,
      key: 3,
      callFlowOrder: 3,
      userName: "Maria",
      userGroup: "Eligibility",
      callHandleTime: "00:04:00",
      afterCallWorkTime: "00:05:00",
      totalCallTime: "00:05:00",
      totalHoldTime: "00:05:00",
      totalTasks: 2,
      totalSubTasks: 0,
      callStatus: "Call transferred"
    },
  ];
};

// dummy gridTotalSummary //
export const gridTotalSummary = [
  {
    column: "userName",
    totalValue: "3 Users"
  },
  {
    column: "userGroup",
    totalValue: ""
  },
  {
    column: "callHandleTime",
    totalValue: "0:07:45"
  },
  {
    column: "afterCallWorkTime",
    totalValue: "0:07:45"
  },
  {
    column: "totalCallTime",
    totalValue: "0:07:45"
  },
  {
    column: "totalHoldTime",
    totalValue: "0:07:45"
  },
  {
    column: "totalTasks",
    totalValue: "3"
  },
  {
    column: "totalSubTasks",
    totalValue: "2"
  },
  {
    column: "callStatus",
    totalValue: ""
  },
]
