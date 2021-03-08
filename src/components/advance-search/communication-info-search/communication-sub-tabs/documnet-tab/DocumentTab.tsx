import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select} from "antd";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";

import "./DocumentTab.scss";

const {Option} = Select;

interface Props {}
interface State {}

class DocumentTab extends Component<Props, State> {
  state = {};

  render() {
    const documentType = ["Letters", "EOB", "Fax"];
    return (
      <Grid container className="DocumentTab" sm={12}>
        <Grid
          item
          sm={6}
          className="call-tab-select-contianer caller-type-container"
        >
          <DropDown
            placeholder="Document Type"
            className="call-tab__input--dropdown caller-type-dropdown"
            // dropdownClassName="formulary-service-year-dropdown"
            // defaultValue={this.state.medicareTyep}
            options={documentType}
            // onSelect={this.onSelectforMedicare}
          />
        </Grid>

        <Grid item sm={12} className="call-tab-drug-field-container">
          <Input
            className="member-search__input"
            placeholder="Document Name"
            type="text"
            disableUnderline={true}
            startAdornment={
              // <InputAdornment position="start">
              <svg
                className="member-search__icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                  fill="#999999"
                />
              </svg>

              // {/* </InputAdornment> */}
            }
            // variant="outlined"
            //   name="claimId"
            //   value={this.state.claimId}
            //   onChange={(e) => this.handleInputChange(e)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default DocumentTab;
