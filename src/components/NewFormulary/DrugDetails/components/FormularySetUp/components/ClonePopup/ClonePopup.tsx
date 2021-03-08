import { Box, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { DatePicker, Dropdown } from "antd";
import React from "react";
import Button from "../../../../../../shared/Frx-components/button/Button";
import "../CommercialPopup.scss";
import { checkNameExist } from "../../../../../../../redux/slices/formulary/setup/setupService";
import { verifyFormularyName } from "../../../../../../../redux/slices/formulary/setup/setupSlice";
import { postMessage } from "../../../../../../../redux/slices/formulary/messaging/messagingSlice";
import showMessage from "../../../../../Utils/Toast";
import moment from "moment";

class ClonePopup extends React.Component<any, any> {
  state = {
    formularyName: "",
    effectiveDate: "",
    cloneDisabled: false,
  };

  validateName = async (e) => {
    if (e.target) {
      let value = e.target.value;
      // console.log(" : " + value);
      this.props.verifyFormularyName(value);
      this.state.formularyName = value;

      //     let exist: boolean = await checkNameExist(value);
      //     if (exist) {
      //         showMessage("Formulary name already exist....", 'error');
      //     }
    }
  };

  onDateChange = (date, dateString) => {
    // console.log("Date changed:" + dateString);
    this.setState({
      effectiveDate: dateString,
    });
  };

  onCloneClicked = () => {
    if (this.state.formularyName && this.state.effectiveDate) {
      if (this.props.onFormularyCloneInfo) {
        this.props.onFormularyCloneInfo(
          this.state.formularyName,
          this.state.effectiveDate
        );
      }
    } else {
      //   showMessage(
      //     "Please provide input to formuary name & effective date",
      //     "error"
      //   );
      this.props.postMessage({
        message: "Please provide input to formuary name & effective date",
        type: "warning",
      });
    }
  };

  onCancelClicked = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  disabledDate = (current) => {
    // Can not select days before today and today
    // return current && current < moment().endOf("day");
    return current.isBefore(moment(), "day");
  };

  render() {
    return (
      <div className="version-grid-container">
        <Grid container>
          <Grid item xs={12}>
            <div className="group select-formulary-name">
              <label>
                New Name <span className="astrict">*</span>
              </label>
              <input
                type="text"
                placeholder={
                  this.props?.currentFormulary?.formulary_info?.formulary_name
                    ? this.props?.currentFormulary?.formulary_info
                        ?.formulary_name
                    : ""
                }
                className="base-input"
                onChange={this.validateName}
              />
            </div>
            <div className="version-grid-date-btn-wrapper">
              <div className="version-grid-date-wrapper">
                <div className="form">
                  <label>
                    Effective Date<span>*</span>
                  </label>
                  <DatePicker
                    className="version-grid-date"
                    placeholder="Effective Date"
                    disabledDate={this.disabledDate}
                    suffixIcon={
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ant-picker-suffix"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                          fill="#C4C4C4"
                        />
                      </svg>
                    }
                    onChange={this.onDateChange}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="action-btn">
              <Button
                label="Cancel"
                htmlFor="upload-file"
                className="upload-button cancel-btn"
                onClick={this.onCancelClicked}
              />
              <Button
                label="Clone"
                htmlFor="upload-file"
                className="upload-button submit-btn"
                onClick={this.onCloneClicked}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    verifyFormularyName: (a) => dispatch(verifyFormularyName(a)),
    postMessage: (a) => dispatch(postMessage(a)),
  };
}

export default connect(null, mapDispatchToProps)(ClonePopup);
