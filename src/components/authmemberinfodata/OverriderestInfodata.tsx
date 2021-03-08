/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./AuthMemberInfodata.scss";
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
  overrideAdministrative2,
  overrideAdministrative1,
} from "../../mocks/grid/AuthGridModelMockData";

export interface OverRideRestInfoProps {
  claimData: any;
}

class OverRideRestInfo extends React.Component<OverRideRestInfoProps> {
  state = {};

  render() {
    const {claimData} = this.props;
    // console.log(claimData);
    return (
      <>
        <div className="datamember-info-root">
          <div className="datamember-info-root__content--data-section">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={4}>
                {overrideAdministrative.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                    <span>{label.labelValue}</span>
                  </div>
                ))}
              </Grid>
              <Grid item xs={8} sm={8}></Grid>
              <Grid item xs={4} sm={4}>
                {overrideAdministrative2.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                    <span>{label.labelValue}</span>
                  </div>
                ))}
              </Grid>
              <Grid item xs={8} sm={8}>
                {overrideAdministrative1.map((label, i) => (
                  <div key={i + ""} className="fieldwithblank">
                    <label>{label.label}</label>
                    <span>{label.labelValue}</span>
                  </div>
                ))}
              </Grid>

              <Grid item xs={12} sm={12}>
                <table className="datamember-info-root__content--data-section__table">
                  {coordinationOfBenefitsFieldsTable5.map((header, i) => (
                    <div key={i + ""} className="tablefields">
                      <header>
                        <p>{header.label}</p>
                      </header>
                      <span>{header.labelValue}</span>
                    </div>
                  ))}
                </table>
              </Grid>
            </Grid>
          </div>

          <div className="datamember-info-root__content--data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className="fieldspre">
                  <label>Prescriber Type</label>
                  <span>01 - NPI</span>
                </div>
                <table className="datamember-info-root__content--data__table">
                  {coordinationOfBenefitsFieldsTable2.map((header, i) => (
                    <div key={i + ""} className="tablefields">
                      <header>
                        <p>{header.label}</p>
                      </header>
                      <span>{header.labelValue}</span>
                    </div>
                  ))}
                </table>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="fieldspre">
                  <label>Pharmacy Type</label>
                  <span>01 - NPI</span>
                </div>
                <table className="datamember-info-root__content--data__table">
                  {coordinationOfBenefitsFieldsTable4.map((header, i) => (
                    <div key={i + ""} className="tablefields">
                      <header>
                        <p>{header.label}</p>
                      </header>
                      <span>{header.labelValue}</span>
                    </div>
                  ))}
                </table>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

export default OverRideRestInfo;
