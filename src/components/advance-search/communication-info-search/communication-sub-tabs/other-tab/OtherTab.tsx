import React, {Component} from "react";

import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select} from "antd";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import "./OtherTab.scss";
const {Option} = Select;

interface Props {}
interface State {}

class OtherTab extends Component<Props, State> {
  state = {};

  render() {
    const communicationType = ["E-mail", "Text"];
    const communicationFormTo = ["Member", "Prescriber", "Pharmacy", "CSR"];
    return (
      <Grid container className="OtherTab" sm={12}>
        <Grid
          item
          sm={6}
          className="call-tab-select-contianer caller-type-container"
        >
          <DropDown
            placeholder="Communication Type"
            className="call-tab__input--dropdown caller-type-dropdown"
            // dropdownClassName="formulary-service-year-dropdown"
            // defaultValue={this.state.medicareTyep}
            options={communicationType}
            // onSelect={this.onSelectforMedicare}
          />
        </Grid>

        <Grid item container sm={12} className="call-tab-drug-field-container">
          <Grid
            item
            sm={6}
            className="select-drop-container  communication-from-select"
          >
            <DropDown
              placeholder="Communication From"
              className="call-tab__input--dropdown caller-type-dropdown"
              // dropdownClassName="formulary-service-year-dropdown"
              // defaultValue={this.state.medicareTyep}
              options={communicationFormTo}
              // onSelect={this.onSelectforMedicare}
            />
          </Grid>
          <Grid
            item
            sm={6}
            className="select-drop-container communication-to-select"
          >
            <DropDown
              placeholder=" Communication To"
              className="call-tab__input--dropdown caller-type-dropdown"
              // dropdownClassName="formulary-service-year-dropdown"
              // defaultValue={this.state.medicareTyep}
              options={communicationFormTo}
              // onSelect={this.onSelectforMedicare}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default OtherTab;
