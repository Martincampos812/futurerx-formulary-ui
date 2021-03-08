import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

import "./ToolTips.scss";
export default function CustomToolTip(props: any) {
  return <div className="ToolTip">{props.children}</div>;
}
