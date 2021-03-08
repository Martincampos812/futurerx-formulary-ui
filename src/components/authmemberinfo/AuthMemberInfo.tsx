/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./AuthMemberInfo.scss";
import {Button, Table, Tag, Space} from "antd";

//components
import {memberInfo1, memberInfo2} from "../../mocks/grid/AuthGridModelMockData";

export interface MemberInfoProps {
  claimData: any;
}

const rejectedCountColumn = [
  {
    title: "Reject Code",
    dataIndex: "rejectCode",
    key: "rejectCode",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Submitted Value",
    dataIndex: "submittedValue",
    key: "submittedValue",
    render: (submittedValue) => (
      <>
        {submittedValue.map((submittedValueag) => {
          return (
            <div className="submitted-value">
              <span>{submittedValueag}</span>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "Expected Value (if available)",
    dataIndex: "expectedValue",
    key: "expectedValue",
    render: (expectedValue) => (
      <>
        {expectedValue.map((expectedValuetag) => {
          return (
            <div className="expected-value">
              <span>{expectedValuetag}</span>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

class MemberInfo extends React.Component<MemberInfoProps> {
  state = {};

  render() {
    return (
      <>
        <div className="member-info-root">
          <div className="member-info-root__content">
            <div className="member-info-root__content--status__active">
              <h1>{this.props.claimData.status}</h1>
            </div>
            <div className="member-info-root__content--data">
              <div className="fields">
                {memberInfo1.map((label, i) => (
                  <div key={i + ""} className="fieldsdata">
                    <label>{label.label}</label>
                    <span
                      className={
                        label.label === "Member ID" ||
                        label.label === "Last Name"
                          ? "higlighted-value"
                          : ""
                      }
                    >
                      {label.labelValue}
                    </span>
                  </div>
                ))}
              </div>
              <div className="fields">
                {memberInfo2.map((label, i) => (
                  <div key={i + ""} className="fieldsdata">
                    <label>{label.label}</label>
                    {this.props.claimData.status === "Paid" ? (
                      <span
                        className={
                          label.label === "Member ID" ? "higlighted-value" : ""
                        }
                      >
                        {label.labelValue}
                      </span>
                    ) : (
                      <span>{label.labelValue}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MemberInfo;
