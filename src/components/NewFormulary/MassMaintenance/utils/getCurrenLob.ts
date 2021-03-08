export const getCurrentLob: any = (lob: number) => {
  // debugger;
  switch (lob) {
    case 1:
      return { id: 1, text: "Medicare" };

    case 2:
      return { id: 2, text: "Medicaid" };
    case 3:
      return { id: 3, text: "Exchange" };
    case 4:
      return { id: 4, text: "Commerical" };
    default:
      return { id: 1, text: "Medicare" };
  }
};
