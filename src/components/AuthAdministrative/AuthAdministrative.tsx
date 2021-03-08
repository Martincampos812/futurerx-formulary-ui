/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./AuthAdminitrativedata.scss";
import {Button, Table, Tag, Space} from "antd";
import {Grid} from "@material-ui/core";
//components
import {authadministrative} from "../../mocks/grid/AuthGridModelMockData";

export interface AuthAdminitrativeInfoProps {
  claimData: any;
}

class AuthAdminitrative extends React.Component<AuthAdminitrativeInfoProps> {
  state = {};

  render() {
    return (
      <>
        <div className="authAdminitrative-info-root">
          <div className="authAdminitrative-info-root__content--data">
            {/* <div className="fields">
              {authadministrative.map((label, i) => (
                <div key={i + ""} className="fieldsdata">
                  <label>{label.label}</label>
                  <span>{label.labelValue}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

export default AuthAdminitrative;
