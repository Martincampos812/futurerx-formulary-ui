import React from 'react'
import Grid from '@material-ui/core/Grid';
import CustomSelect from "../../shared/Frx-components/dropdown/DropDown";
import { Box, Tooltip,Checkbox } from "@material-ui/core";

export class TopSection extends React.Component{
    render(){
    return(
        <Grid container className="topsection">
        <Grid item xs={12}>
          <div className="bg-white">
            <div className="member-notification-root">
              <div className="claims-search claims-history-search topsection">
                <Grid container>
                  <Box display="flex" alignItems="center">
                    <span className="frx-info-card-list-item-root__column mr-20">Test Claim Submission Type</span>
                    <div className="input">
                      <CustomSelect
                        placeholder="Select Sequence"
                        options={["D.0 Standard", "Multi-Ingredient Compound ", "Coordination of Benefits",
                        "Nx Transaction","FIR Transaction","Eligibility Transaction","Service Transaction"]}
                      />
                    </div>
                  </Box>
                  <span><button className="btn btnSave">Run Test Claim</button></span>
                </Grid>
              </div>
              <div className="claims-search claims-history-search topsection">
                <Grid container>
                  <Box display="flex" alignItems="center"></Box>
                  <span className="frx-info-card-list-item-root__column mr-8">Run Test Claim To Test DUR History
                  <Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      className="frx-info-card-list-item-root__column--checkbox"
                    />
                  </span>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    )
    }
}