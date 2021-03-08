import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import "./NewTestClaim3.scss";

export default class AuthPrescriberForm extends React.Component<any,any> {
    render(){
        return (
          <Grid item xs={12} className="authrization-prescriber">
            <Grid container>
              <Grid item xs={6}>
                <div className="authrization-container">
                  <div className="authrization-header">
                    <span>Authorization Fields</span>
                  </div>
                  <div className="authrization-field">
                    <div className="column-1">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="">Prior Authorization Type Code</span>
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
                          <span className="">Prior Authorization Number</span>
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
              <Grid item xs={6}>
                <div className="prescriber-container">
                  <div className="prescriber-header">
                    <span>Prescriber Fields</span>
                  </div>
                  <div className="prescriber-field">
                    <div className="column-1">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="">Prescriber ID</span>
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
                          <span className="">Prescriber ID Qualifier</span>
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
            </Grid>
          </Grid>
        )
      }
}