import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import DiagnosisField from './diagnosisField';
import DurppsField from './durppsField';
import "./NewTestClaim3.scss";
interface DiagnosisDURState {
  dignosisFieldsCount?: any;
  purppsField?:any
}

export default class DiagnosisDURForms extends React.Component<DiagnosisDURState> {
  state = {
    diagnosisFieldsCount: 3,
    purppsFieldCount:3
  };
  addDiagnosisFieldHandler = () => {
    let totalDiagnosis = this.state.diagnosisFieldsCount;
    totalDiagnosis += 1;
    this.setState({diagnosisFieldsCount: totalDiagnosis});
  }
  deleteDiagnosisFieldHandler = () => {
    let totalDiagnosis = this.state.diagnosisFieldsCount;
    totalDiagnosis -= 1;
    this.setState({diagnosisFieldsCount: totalDiagnosis});
  }

  addDurppsFieldHandler = () => {
    let totalDurpps = this.state.purppsFieldCount;
    totalDurpps += 1;
    this.setState({purppsFieldCount: totalDurpps});
  }
  deleteDurppsFieldHandler = () => {
    let totalDurpps = this.state.purppsFieldCount;
    totalDurpps -= 1;
    this.setState({purppsFieldCount: totalDurpps});
  }
    render(){
        return (
          <Grid container className="diagnosis-durpps">
            <Grid item xs={5}>
              <div className="bg-white">
                <div className="member-notification-root">
                  <div className="member-notification-header">
                    <label className="new-test-claim-root__header-text">Diagnosis Fields</label>
                  </div>

                  <div className="claims-search claims-history-search custom-grid-wrapper">
                    <Grid container justify="space-between" alignItems="center">
                      <div className="input">
                        Diagnosis Code Count 3
                        </div>
                    </Grid>
                  </div>
                  <div className="claims-search claims-history-search custom-grid-wrapper w-50p">
                    <div className="row-wrapper">
                      <Grid container spacing={1}>
                        <Grid item>
                          <div className="input">
                            Qualifier<span className="astrict">&#42;</span>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className="input">
                            Diagnosis Code<span className="astrict">&#42;</span>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>

                  {Array.from(Array(this.state.diagnosisFieldsCount), (e,i) => 
                      <DiagnosisField deleteField={this.deleteDiagnosisFieldHandler}/>
                    )}
                    { this.state.diagnosisFieldsCount < 9 ? (
                      <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Button className="addForm" onClick={this.addDiagnosisFieldHandler}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                              <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="add-service">Add Diagnosis <span className="limit"><span className="astrict">&#42;</span>limit 9</span></span>
                          </Button>
                        </div>
                      </Grid>
                      </div>) : null }
                </div>
              </div>
            </Grid>
            <Grid item xs={7} className="saparator">
              <div className="bg-white">
                <div className="member-notification-root">
                  <div className="member-notification-header">
                    <label className="new-test-claim-root__header-text">DUR/PPS Fields</label>
                  </div>

                  <div className="claims-search claims-history-search custom-grid-wrapper">
                    <Grid container justify="space-between" alignItems="center">
                      <div className="input">
                        DUR/PPS Code Counter 5
                        </div>
                    </Grid>
                  </div>
                  <div className="claims-search claims-history-search custom-grid-wrapper w-33p">
                    <div className="row-wrapper">
                      <Grid container spacing={1}>
                        <Grid item>
                          <div className="input">
                            Reason of Service Code<span className="astrict">&#42;</span>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className="input">
                            Professional Service Code<span className="astrict">&#42;</span>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className="input">
                            Result of Service Code<span className="astrict">&#42;</span>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
            
                  {Array.from(Array(this.state.purppsFieldCount), (e,i) => 
                      <DurppsField deleteField={this.deleteDurppsFieldHandler}/>
                    )}
                    { this.state.purppsFieldCount < 9 ? (
                  <div className="claims-search claims-history-search">
                    <Grid container justify="space-between" alignItems="center">
                      <div className="input">
                        <Button className="addForm" onClick={this.addDurppsFieldHandler}>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                            <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                          </svg>
                          <span className="add-service">Add Service Code <span className="limit"><span className="astrict">&#42;</span>limit 9</span></span>
                        </Button>
                      </div>
                    </Grid>
                    </div>) : null }
                </div>
              </div>
            </Grid>
          </Grid>
        )
  }
}