/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./AuthClinicaldata.scss";
import {Button, Table, Tag, Space} from "antd";
import {Grid} from "@material-ui/core";
//components
import {
  authClinicalInfo1,
  authClinicalInfo2,
} from "../../mocks/grid/AuthGridModelMockData";

export interface AuthClinicalInfoProps {
  claimData: any;
}

class AuthClinical extends React.Component<AuthClinicalInfoProps> {
  state = {};

  render() {
    return (
      <>
        <div className="authclinical-info-root">
          <div className="authclinical-info-root__content--data">
            <div className="fields">
              {authClinicalInfo1.map((label, i) => (
                <div key={i + ""} className="fieldsdata">
                  <label>{label.label}</label>
                  <span>{label.labelValue}</span>
                </div>
              ))}
            </div>
            <div className="fields">
              {authClinicalInfo2.map((label, i) => (
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

export default AuthClinical;
