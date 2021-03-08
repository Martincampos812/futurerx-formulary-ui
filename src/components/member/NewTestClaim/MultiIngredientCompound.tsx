import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import CustomSelect from "../../shared/Frx-components/dropdown/DropDown";
import CustomDatepicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
import DiagnosisField from './diagnosisField';
import DurppsField from './durppsField';
import MultiIngredientField from './multiIngredientField';
// import "./NewTestClaim2.scss";
// import "./NewTestClaim3.scss";


interface NewTestClaim2State {
  startDate?: any;
  dignosisFieldsCount?: any;
  purppsField?:any
  multiIngredientCount?:any
}

export default class MultiIngredientCompound extends React.Component<NewTestClaim2State> {

  state = {
    startDate: undefined,
    diagnosisFieldsCount: 3,
    purppsFieldCount:3,
    multiIngredientCount:3
  };

  handleStartDate = date => {
    this.setState({ startDate: date });
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

  addMultiIngredientFieldHandler = () => {
    let totalIngredient = this.state.multiIngredientCount;
    totalIngredient += 1;
    this.setState({multiIngredientCount: totalIngredient});
  }
  deleteMultiIngredientFieldHandler = () => {
    let totalIngredient = this.state.multiIngredientCount;
    totalIngredient -= 1;
    this.setState({multiIngredientCount: totalIngredient});
  }

  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} className="multi-ingredient-compound">
          <div className="ingredient-compound-container">
            <div className="ingredient-compound-header">
              <span>Multi-Ingredient Compound</span>
            </div>
            <div className="ingredient-compound-field">
              <Grid container>
                <Grid item xs={12} className="mb-15">
                  <Grid container spacing={2} className="mb-5">
                    <Grid item xs={3} className="label">
                      <span>Route of Administration</span>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="input">
                        <Input
                          className=""
                          placeholder=""
                          type="text"
                          name="claimId"
                          value='ABC'
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3} className="label">
                      <span>Compound Dosage Form</span>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="input">
                        <Input
                          className=""
                          placeholder=""
                          type="text"
                          name="claimId"
                          value='Tablet'
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                  <Grid container spacing={2} className="mb-5">
                    <Grid item xs={3} className="label">
                      <span>Compound Type</span>
                    </Grid>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}  className="label">
                      <span>Compound Dispensing Unit Indicator</span>
                    </Grid>
                    <Grid item xs={3} >
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
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div>
            <div className="custom-grid-wrapper">
              <Grid container>
                <Grid item xs={12} className="mb-15">
                  <Grid container className="mb-5" spacing={1}>
                      <Grid item xs={2} className="label">
                          <span>Ingredient Component Count<span className="astrict">&#42;</span></span>
                      </Grid>
                      <Grid item xs={2} className="label">
                          <span>Product ID (NDC) Qualifie<span className="astrict">&#42;</span></span>
                      </Grid>
                      <Grid item xs={2} className="label">
                          <span>Product ID(NDC)<span className="astrict">&#42;</span></span>
                      </Grid>
                      <Grid item xs={2} className="label">
                          <span>Ingredient Quantity<span className="astrict">&#42;</span></span>
                      </Grid>
                      <Grid item xs={2} className="label">
                          <span>Ingredient Drug Cost<span className="astrict">&#42;</span></span>
                      </Grid>
                      <Grid item xs={2} className="label">
                          <span>Basis of Cost Determination<span className="astrict">&#42;</span></span>
                      </Grid>
                  </Grid>
                </Grid>
                {Array.from(Array(this.state.multiIngredientCount), (e,i) => 
                  <MultiIngredientField deleteField={this.deleteMultiIngredientFieldHandler}/>
                )}
              </Grid>
              <Grid container>
                 { this.state.multiIngredientCount < 25 ? (
                <Grid item xs={12}>
                  <Button className="addForm" onClick={this.addMultiIngredientFieldHandler}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                      <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                    </svg>
                    <span className="add-diagnosis">Add COB Field <span className="limit">* limit 25</span></span>
                  </Button>
                  </Grid>) : null }
              </Grid>
            </div>
              
            </div>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}
