export const getWorkflowNotesData = () => {
  return [
    {
      id: 1,
      key: 1,
      userProfile: "James.png",
      userName: " Kristine Watson",
      description:
        "We need to figure out what’s going on with the last three iterms",
      loggedHours: "2 hours ago",
      version: "Version:2",
    },
    {
      id: 2,
      key: 2,
      userProfile: "Ellipse 6.png",
      userName: "Mister Ronaldo",
      description:
        "We need to figure out what’s going on with the last three iterms",
      loggedHours: "3 hours ago",
      version: "Version:3",
    },
    {
      id: 3,
      key: 3,
      userProfile: "Ellipse 6.png",
      userName: "James Bond",
      description:
        "We need to figure out what’s going on with the last three iterms",
      loggedHours: "1 hours ago",
      version: "Version:1",
    },
    {
      id: 4,
      key: 4,
      userProfile: "Ellipse 6.png",
      userName: "James Bond",
      description:
        "We need to figure out what’s going on with the last three iterms",
      loggedHours: "1 hours ago",
      version: "Version:1",
    },
  ];
};
export const getActiveUsersData = () => {
  return [
    {
      id: 1,
      key: 1,
      userName: "Parent task name",
      userProfile: "Ellipse 73.png",
      isParenttask: true,
      isActive: true,
    },
    {
      id: 2,
      key: 2,
      userName: "subtask name 1",
      userProfile: "Ellipse 73.png",
      isParenttask: false,
      isOnline: true,
      isActive: true,
    },
    {
      id: 3,
      key: 3,
      userName: "subtask name 2",
      userProfile: "Ellipse 4.png",
      isParenttask: false,
      isOnline: true,
      isActive: false,
    },
    {
      id: 4,
      key: 4,
      userName: "subtask name 3",
      userProfile: "Ellipse 73.png",
      isParenttask: false,
      isOnline: false,
      isActive: true,
    },
  ];
};
