import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import CustomDatepicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
import "./NewTestClaim3.scss";

interface NewTestClaim2State {
    startDate?: any;
    dignosisFieldsCount?: any;
    purppsField?:any
    multiIngredientCount?:any
    payerAmountFieldsCount?: any;
    payerRejectFieldCount?:any
    benefitStageCount?:any
}
export default class SubmissionForm extends React.Component<NewTestClaim2State> {
    state = {
        startDate: undefined,
        diagnosisFieldsCount: 3,
        purppsFieldCount:3,
        multiIngredientCount:3,
        payerAmountFieldsCount: 3,
        payerRejectFieldCount:3,
        benefitStageCount:3
    };
    handleStartDate = date => {
        this.setState({ startDate: date });
    };
    render() {
        return (
            <Grid item xs={12} className="submission">
          <div className="submission-container">
            <div className="submission-header">
              <span>Submission Fields</span>
            </div>
            <div className="submission-field">
              <div className="column-1">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">BIN#</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">PCN<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Cust<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Client<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Amount<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Member ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className="higlighted-value"
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='8133381165'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Person Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Relationship Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Zip Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='33601-1234'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient First Name<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='Machenzie'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Last Name<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className="higlighted-value"
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='Johnson-Robertson lll'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Date of Birth<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <CustomDatepicker
                      className="claims-search__input claims-search__input--date"
                      onChange={this.handleStartDate}
                      value={this.state.startDate}
                      placeholder="6/1/1984"
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Gender<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='Female'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Rx#</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Service Provider ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-2">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Service Provider ID Qualifier<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Place of Service</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Residence</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Days Supply<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Quantity Dispensed<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Product Service ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Product Service ID Qualifier<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Compound Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">DAW<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Date of Service<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <CustomDatepicker
                      className="claims-search__input claims-search__input--date"
                      onChange={this.handleStartDate}
                      value={this.state.startDate}
                      placeholder=""
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Date Rx Written<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <CustomDatepicker
                      className="claims-search__input claims-search__input--date"
                      onChange={this.handleStartDate}
                      value={this.state.startDate}
                      placeholder=""
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Fill Number<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Quantity Prescribed</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Refills Authorized<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Rx Origin Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-3">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Level of Service</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Pharmacy Service Type</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Other Coverage Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Special Packaging Indicator</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Unit of Measure</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Delay Reason Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Other Coverage Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Special Packaging Indicator</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Quantity Intended To Be Dispensed</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Days Supply Intended To Be Dispensed<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Submission Clarification Code Count</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">SCC1</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">SCC2</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">SCC3</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
        )
    }
}
        