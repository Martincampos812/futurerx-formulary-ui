/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./MemberInfo.scss";
import { Button, Table, Tag, Space } from "antd";

// antd
import {Tooltip} from "antd";

//components
import {claimsPopupRejectedGrid, claimsPopupErrorMsgGrid} from "../../../utils/grid/columns";
import {
  memberInfo1,
  memberInfo2,
  memberInfo3,
  rejectedCountData,
  errorCountData
} from "../../../mocks/ClaimGridModelMock";

export interface MemberInfoProps{
  claimData: any;
}

class MemberInfo extends React.Component<MemberInfoProps> {
  state = {};

  render() {

    return (
      <>
      <div className="member-info-root">
        <div className="member-info-root__content">
        {this.props.claimData.status === "Rejected" ? (
          <div className="member-info-root__content--status__rejected">
            <h1>{this.props.claimData.status}</h1>
            <h1>{this.props.claimData.serviceDate}</h1>
          </div>
          ) : this.props.claimData.status === "Paid" ? (
            <div className="member-info-root__content--status__paid">
            <h1>{this.props.claimData.status}</h1>
            <h1>{this.props.claimData.serviceDate}</h1>
            </div>
          ) : this.props.claimData.status === "Reversed" ? (
            <div className="member-info-root__content--status__reversed">
            <h1>{this.props.claimData.status}</h1>
            <h1>{this.props.claimData.serviceDate}</h1>
            </div>
          ) : null}
          <div className="member-info-root__content--details">
            {memberInfo1.map((label, i) => (
              <div key={i + ""} className="fields">
                <label>{label.label}</label>
                {this.props.claimData.status === "Paid" || this.props.claimData.status === "Reversed" ? (
                  <>
                  {label.label === "BIN#" ? (
                    <Tooltip
                    placement="top"
                    arrowPointAtCenter={true} 
                    overlayClassName="member-info-root__tooltip"
                    title={
                    <>
                      {label.label === "BIN#" ? (
                        <>
                          <span>M/I Bin Number</span>
                        </> 
                      ):null}
                      </>
                    }
                    >
                  <span
                  style={{color: label.label === "BIN#" ? "#E0ED51" : "#666666"}}
                  >
                  {label.labelValue}
                  </span>
                </Tooltip>
                ):(
                  <span
                  className={
                    label.label === "Member ID" ? "higlighted-value" : ""
                  }
                >
                  {label.labelValue}
                </span>
                )}
                </>
                ) : this.props.claimData.status === "Rejected" ? (
                  <>
                  {label.label === "BIN#" || label.label === "First Name" ? (
                  <Tooltip
                  placement="top"
                  arrowPointAtCenter={true} 
                  overlayClassName="member-info-root__tooltip"
                  title={
                  <>
                    {label.label === "BIN#" ? (
                      <>
                        <span>M/I Bin Number</span>
                      </>
                    ): label.label === "First Name" ? (
                      <>
                      <span>M/I cardholder first name</span>
                      </>
                    ):null}
                    </>
                  }
                  >
                    <span
                    // className={
                    //   label.label === "Member ID" ? "higlighted-value" : ""
                    // }
                    style={{color: label.label === "BIN#" || label.label === "First Name" ? "#E76262" : "#666666"}}
                  >
                    {label.labelValue}
                  </span>
                </Tooltip>
                ) : (
                  <span
                  className={
                    label.label === "Member ID" ? "higlighted-value" : ""
                  }
                  style={{color: label.label === "BIN#" || label.label === "First Name" ? "#E76262" : "#666666"}}
                >
                  {label.labelValue}
                </span>
                )}
                </>
                ):(
                  <span
                  className={
                    label.label === "Member ID" ? "higlighted-value" : ""
                  }
                >
                  {label.labelValue}
                </span>
                )}
              </div>
            ))}
          </div>
          <div className="member-info-root__content--details">
            {memberInfo2.map((label, i) => (
              <div key={i + ""} className="fields">
                <label>{label.label}</label>
                {this.props.claimData.status === "Paid" || this.props.claimData.status === "Reversed" ? (
                  <>
                  {label.label === "RX#" ? (
                    <Tooltip
                    placement="top"
                    arrowPointAtCenter={true} 
                    overlayClassName="member-info-root__tooltip"
                    title={
                    <>
                      {label.label === "RX#" ? (
                        <>
                          <span>DAW code Value Not Supported</span>
                        </> 
                      ):null}
                      </>
                    }
                    >
                  <span
                  style={{color: label.label === "RX#" ? "#E0ED51" : "#666666"}}
                  >
                  {label.labelValue}
                  </span>
                </Tooltip>
                ):(
                  <span>
                  {label.labelValue}
                </span>
                )}
                </>
                ) : this.props.claimData.status === "Rejected" ? (
                  <>
                  {label.label === "DOB" || label.label === "RX#" ? (
                  <Tooltip
                  placement="top"
                  arrowPointAtCenter={true} 
                  overlayClassName="member-info-root__tooltip"
                  title={
                  <>
                    {label.label === "DOB" ? (
                      <span>M/ I Date Of Birth</span>
                    ): label.label === "RX#" ? (
                      <span>DAW code Value Not Supported</span>
                    ):null}
                    </>
                  }
                  >
                    <span
                    style={{color: label.label === "DOB" || label.label === "RX#" ? "#E76262" : "#666666"}}
                  >
                    {label.labelValue}
                  </span>
                </Tooltip>
                  ): (
                    <span
                    style={{color: label.label === "DOB" || label.label === "RX#" ? "#E76262" : "#666666"}}
                  >
                    {label.labelValue}
                  </span>
                  )}
                  </>
                ) : (
                  <span>
                  {label.labelValue}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="member-info-root__content--details">
            {memberInfo3.map((label, i) => (
              <div key={i + ""} className="fields">
                <label>{label.label}</label>
                {label.label === "Drug Label" ? (
                  <Tooltip
                  placement="left"
                  arrowPointAtCenter={true} 
                  overlayClassName="drug-label-tooltip"
                  title={
                  <>
                    {label.label === "Drug Label"? (
                      <span>
                       Drug Label - <b>Abilify 10 mg</b>
                      </span>
                    ):null}
                    </>
                  }
                  >
                  <span
                    className={
                      label.label === "Drug Label" ||
                      label.label === "NDC" ||
                      label.label === "Pharmacy NPI" ||
                      label.label === "Pharmacy NCPDP#"
                        ? "higlighted-value"
                        : ""
                    }
                  >
                    {label.labelValue}
                  </span>
                </Tooltip>
                ) : (
                  <span
                  className={
                    label.label === "Drug Label" ||
                    label.label === "NDC" ||
                    label.label === "Pharmacy NPI" ||
                    label.label === "Pharmacy NCPDP#"
                      ? "higlighted-value"
                      : ""
                  }
                >
                  {label.labelValue}
                </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {this.props.claimData.status === "Rejected" ? (
      <div className="member-info-root__rejected--count">
        <span className="member-info-root__rejected--count__header">Reject Messages (4)</span>
        <Table className="member-info-root__rejected--count__table" pagination={false} columns={claimsPopupRejectedGrid} dataSource={rejectedCountData} />
      </div>
      ) : this.props.claimData.status === "Paid" || this.props.claimData.status === "Reversed" ? (
        <div className="member-info-root__rejected--count">
        <span className="member-info-root__rejected--count__header">Error Messages (2)</span>
        <Table className="member-info-root__rejected--count__table" pagination={false} columns={claimsPopupErrorMsgGrid} dataSource={errorCountData} />
      </div>
      ):null}
      </>
    );
  }
}

export default MemberInfo;
