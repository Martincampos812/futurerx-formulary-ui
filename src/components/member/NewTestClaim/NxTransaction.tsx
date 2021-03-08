import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import CustomDatepicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
import "./NewTestClaim4.scss";


interface NewTestClaim4State {
  startDate?: any;
}

export default class NxTransaction extends React.Component<NewTestClaim4State>{
  state = {
    startDate: undefined
  };

  handleStartDate = date => {
    this.setState({ startDate: date });
  };

  render() {
    return (
      <React.Fragment>
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
                      value='04'
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
                      value='9'
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
                      value='1236'
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
                      value='4'
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
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className="response">
          <div className="response-container">
            <div className="response-header">
              <span>Response Fields</span>
            </div>
            <div className="response-field">
              <div className="column-1">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Submission Field</span>
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
                    <span className="">Transaction Code<span className="astrict">&#42;</span></span>
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
                    <span className="">Date of Service<span className="astrict">&#42;</span></span>
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
                    <span className="">Cardholder ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='04'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient First Name</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='04'
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-2">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Lst Name</span>
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
                    <span className="">Group Id</span>
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
                    <span className="">RX#</span>
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
                    <span className="">Quantity Dispensed</span>
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
                    <span className="">Fill Number</span>
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
                    <span className="">Days Supply</span>
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
                    <span className="">Transaction Reference Number</span>
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
                    <span className="">Other Payer BIN</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='9'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Other Payer PCN</span>
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
                    <span className="">Other Payer Cardholder ID</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='1236'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Other Payer Group ID</span>
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
                    <span className="">Patient Paid Amount Submitted</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='4'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Authorization Number</span>
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
                    <span className="">Reject Count</span>
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
                    <span className="">Reject Code</span>
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
        <Grid item xs={12} className="reject">
          <div className="reject-container">
            <div className="reject-field">
              <div className="column-1">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Reject Count</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='01'
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-2">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Reject Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='01'
                    />
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </React.Fragment>
    )
  }
}