import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";

export default class FD extends React.Component<any, any> {
    render() {
        return (
            <div className="formulary-design-container">
            <h4>FORMULARY DESIGN</h4>
            <div className="formulary-design-fields-wrapper">
            <Grid container>
            <Grid item xs={6}>

                <div className="group">
                <div className="group setup-panel">
                <label>
                   WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCULDED IN THIS FORMULARY <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group">
                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> Type 1</label>

                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> Type 2</label>

                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> Type 3</label>

                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> Type 4</label>
                </div>
              </div>
              </div>

              <div className="group setup-panel">
              <label>
                   DO ANY DRUG IN THE FORMULARY HAVE QUANTITY LIMITS? <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group">
                  <RadioButton label="YES" name="YES" checked/>
                  <RadioButton label="NO" name="NO" />
                </div>
              </div>

              <div className="group setup-panel">
              <label>
                   IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group">
                  <RadioButton label="YES" name="YES" checked/>
                  <RadioButton label="NO" name="NO" />
                </div>
              </div>


              <div className="group setup-panel">
              <label>
                   SUBJECT TO EXPEDITED GERERIC SUBSTITUTION <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group">
                  <RadioButton label="YES" name="YES" checked/>
                  <RadioButton label="NO" name="NO" />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
            <div className="group setup-panel">
              <label>
                   ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group">
                  <RadioButton label="YES" name="YES" checked/>
                  <RadioButton label="NO" name="NO" />
                </div>
              </div>

              <div className="group">
                <div className="group setup-panel">
                <label>
                   WHAT STEP THERAPY TYPE(S) ARE INCULDED IN THIS FORMULARY <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group">
                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> Type 1</label>

                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> Type 2</label>

                <input type="checkbox" id="vehicle1" name="N/A" value="N/A" />
                <label htmlFor="N/A" className="checkbox-label"> N/A</label>

                </div>
              </div>
              </div>

              <div className="group setup-panel">
              <label>
              ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL? <span className="astrict">*</span>
                </label>
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