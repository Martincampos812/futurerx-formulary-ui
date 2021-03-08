import React from "react";
import "./TextBox.css";
export default function TextBox(props:any) {
  // const {type, className, id,value,lable}
  return (
    <input
      type={props.type || "text"} 
      className={props.className || "defaultTextbox"} 
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
      onKeyDown={props.onKeyDown}
    />
  );
}
