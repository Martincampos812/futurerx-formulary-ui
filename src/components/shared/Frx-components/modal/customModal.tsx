import React, {ReactElement} from "react";

interface Props {
  children?: any;
  // hangleClocse?: any=()=>{};
  open: any;
}




export default function customModal({children, open}: Props): ReactElement {
  return <div>{children}</div>
}
