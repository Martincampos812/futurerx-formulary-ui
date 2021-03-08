import React from "react";
import "./Table.css";
export default function Table(props:any) {
  return (
    <div className="Table">
      {props.title ? <div className="Table-Title">{props.title}</div> : null}

      <table className="customers">{props.children}</table>
    </div>
  );
}
