import React, { Component } from "react";
import { Input } from 'antd';
import "./MemberData.scss";

interface Props {
  children?: any;
  keyValue: any;
  value: any;
  classname?: string;
  isClose?: any;
  isEditable?: boolean;
}

interface State { }

class MemberData extends Component<Props, State> {
  state = {};

  render() {
    const { keyValue, value, classname, isEditable } = this.props;
    return (
      // <div className="member-data">
      //   <div className="keyValue">{keyValue}</div>
      //   <div className="value">{value}</div>
      // </div>

      <div className="member-data">
        <div className={classname == "contactInfo" ? "contactInfo" : classname == "prc-contact-text" ? "prc-contact-text" : isEditable == true ? "editKeyValue" : "keyValue"} >{keyValue}</div>
        {isEditable == true ? <Input defaultValue={value} /> : <div onClick={this.props.isClose} className={classname == "contactInfo_hyperlink" ? "contactInfo_hyperlink" : classname == "contactInfo_hyperlink_first" ? "contactInfo_hyperlink_first" : classname == "pharmacyIdText" ? "pharmacyIdText" : classname == "npiIdText" ?  "npiIdText" : "value"} >{value}</div>}
      </div>
    );
  }
}

export default MemberData;

// export default function MemberData(props: Props) {
//   const {keyValue, value} = props;
//   return (
//     <div className="member-data">
//       <div className="keyValue">{keyValue}</div>
//       <div className="value">{value}</div>
//     </div>
//   );
// }
