import React from "react";

import "./Button.css";

let Button = (props: any) => {
  const { className = "" } = props;
  
  return (
    <button {...props} className={`Button ${className}`} >
      {props.label}
      {props.icon}
    </button>
  );
};
export default Button;
