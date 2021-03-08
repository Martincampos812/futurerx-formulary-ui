import { Box, Grid } from "@material-ui/core";
import React from "react";
import Button from "../../../../../../shared/Frx-components/button/Button";
import vector from "../../../../../../../assets/img/Vector.png";
import './VersionDrugActivity.scss';
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";


export default class VersionDrugActivity extends React.Component<any, any> {
    
render(){
    return(
    <div className="version-drug-activity-container">
        <h6>Select formularies for comparison</h6>
        <div className="formulary-form formulay-label">
          <Grid container>
            <Grid item xs={4}>
              <div className="group select-formulary-name">
                <label>
                  Base <span className="astrict">*</span>
                </label>
                <div className="input-element">
                  <div className="bordered pointer">
                  Version 4
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="compare-vector-wrapper">
                <div className="group">
                  <img src={vector} className="vector-icon" alt="vector" />
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group select-formulary-name">
                <div className="formulary-relative">
                  <label>
                    Reference <span className="astrict">*</span>
                  </label>
                </div>
                <div className="input-element">
                  <div className="bordered pointer bg-green set-top-padding">
                        <DropDown                         
                          options={["Version 1","Version 2","Version 3"]}
                          defaultValue = "Version 3"
                         
                        />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="compare-btn"
              >
                <Button
                  label="Compare"
                //   onClick={(event) =>
                //     this.props.handleCompareBtn(
                //       this.state.baseFormulary,
                //       this.state.referenceFormulary
                //     )
                 // }
                />
              </Box>
            </Grid>
          </Grid>
        </div>
    </div>
    )
}
}