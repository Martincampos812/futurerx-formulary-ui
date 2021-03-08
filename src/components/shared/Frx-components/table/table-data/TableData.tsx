import React from "react";

export default function TableData(props:any) {
  return <td {...props}>{props.data}</td>;
}
