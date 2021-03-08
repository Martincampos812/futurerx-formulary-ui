import React, {ReactElement} from "react";
import MenuItem from "@material-ui/core/MenuItem";

import "./CustomMenuItem.scss";

interface Props {
  children?: any;
  label?: any;
  handleClose: () => any;
}

export default function CustomMenuItem({
  children,
  label,
  handleClose,
}: Props): ReactElement {
  return (
    <MenuItem onClick={handleClose} className="menu-item">
      {children}
      <span>{label}</span>
    </MenuItem>
  );
}
