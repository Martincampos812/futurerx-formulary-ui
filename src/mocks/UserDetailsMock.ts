import Machezie from "../assets/icons/images/Machezie.png";
import Julianne from "../assets/icons/images/Julianne.png";
import James from "../assets/icons/images/James.png";
import Ezra from "../assets/icons/images/Ezra.png";
export const getUserDetails = () => ({
  id: 1,
  avatar: Machezie,
  memberId: 1,
  name: "Machenzie, Johnson-Robertson III (Mickey)",
  gender: "M",
  status: false,
  familyMembers: [
    {
      id: 11,
      memberId: 341,
      avatar: Julianne,
      name: "Julianne, Johnson-Robertson III (Julie)",
      gender: "F",
      status: true
    },
    {
      id: 12,
      memberId: 342,
      avatar: James,
      name: "James, Johnson-Robertson III (Jim)",
      gender: "",
      status: false
    },

    {
      id: 13,
      memberId: 341,
      avatar: Ezra,
      name: "Ezra, Johnson-Robertson III (Ez)",
      gender: "M",
      status: true
    }
  ]
});
