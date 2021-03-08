export default function getLobCode(lobId: any) {
  switch (lobId) {
    case 1:
      return "MCR";
    case 2:
      return "MCD";
    case 3:
      return "COMM";
    case 4:
      return "COMM";
    default:
      return "MCR";
  }
}
