import React from "react";

const formularyDetailsContext = React.createContext({
  showDetailHandler: () => {},
  selectedLOBType: "",
});

export default formularyDetailsContext;
