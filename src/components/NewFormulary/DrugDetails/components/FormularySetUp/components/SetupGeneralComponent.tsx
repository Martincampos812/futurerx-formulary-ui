import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";

export default class SetupGeneralComponent extends React.Component<any, any> {
    render() {
        return (
            <div className="formulary-design-container">
            <h4>MEDICARE INFORMATION</h4>
            <div className="formulary-design-fields-wrapper">
            <Grid container>
            <Grid item xs={6}>

                <div className="group">
                <label>
                   MEDICARE CONTRACT TYPE <span className="astrict">*</span>
                </label>
                <ul>
                <li>
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                    <label htmlFor="N/A" className="checkbox-label"> S -PDP</label>
                </div>
                </li>
                <li>
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                    <label htmlFor="N/A" className="checkbox-label"> H - MAPD</label>
                </div>
                </li>
                <li>
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                    <label htmlFor="N/A" className="checkbox-label"> E - Employer/Union</label>
                </div>
                </li>
                <li>
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                    <label htmlFor="N/A" className="checkbox-label"> R - Regional/CCP</label>
                </div>
                </li>
                <li>
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox-btn" name="N/A" value="N/A" />
                    <label htmlFor="N/A" className="checkbox-label"> Other</label>
                    <br />
                    <input type="text" className="setup-input-fields" />
                </div>
                </li>
            </ul>
              </div>
            </Grid>
            <Grid item xs={6}>

                    <div className="group">
                        <label>
                        FORMULARY NAME <span className="astrict">*</span>
                        </label>
                        <input type="text" className="setup-input-fields" />
                        <p>NOTE: Formulary ID assigned by CMS fter initial submission in HPMS</p>
              </div>
                    <div className="group setup-panel">
                <PanelHeader
                  title="OPTIONAL ABRIDGED FORMULARY CLASSIFICATION"
                  tooltip="FORMULARY CLASSIFICATION SYSTEM"
                />
                <div className="marketing-material radio-group">
                  <RadioButton label="YES" name="YES" checked/>
                  <RadioButton label="NO" name="NO" />
                </div>
              </div>
            </Grid>
            </Grid>
            </div>
          </div>
    
        )
    }
}