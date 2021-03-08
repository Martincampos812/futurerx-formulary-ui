/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./AuthCommonDateInfodata.scss";
import {Button, Table, Tag, Space} from "antd";
import {Grid} from "@material-ui/core";
//components
import {
  memberInfo1,
  memberInfo3,
  memberInfo4,
  memberInfo5,
  memberInfo6,
  coordinationOfBenefitsFieldsTable2,
  coordinationOfBenefitsFieldsTable4,
  coordinationOfBenefitsFieldsTable5,
  authadministrative,
  overrideAdministrative,
  overrideAdministrative1,
} from "../../mocks/grid/AuthGridModelMockData";

export interface AuthCommonDate {
  claimData: any;
}

class AuthCommonDateInfo extends React.Component<AuthCommonDate> {
  state = {};

  render() {
    return (
      <>
        <div className="authcommmondate-info-root">
          <div className="authcommmondate-info-root__content--data">
            <div className="datefields">
              {memberInfo3.map((label, i) => (
                <div key={i + ""} className="fieldsdata">
                  <label>{label.label}</label>
                  <span>{label.labelValue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AuthCommonDateInfo;
