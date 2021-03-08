import React from "react";

import "./RadioButton.css";
export default function RadioButton(props: any) {
  return (
    <>
      <label className="container">
        <input
          type="radio"
          defaultChecked={props.checked}
          name={props.name}
          className={props.className}
          // checked={props.checked}
          {...props}
        />
        <span className="label">{props.label}</span>
        <span className="checkmark"></span>
      </label>
    </>
  );
}
