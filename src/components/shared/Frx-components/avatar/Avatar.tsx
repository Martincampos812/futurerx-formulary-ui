import React from "react";

import "./Avatar.css";
export default function Avatar(props: any) {
  return (
    <div className="Avatar" {...props}>
      {props.name}
    </div>
  );
}
