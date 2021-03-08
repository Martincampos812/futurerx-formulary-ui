import React from "react";
import Button from "@material-ui/core/Button";
import "./Alerts.scss";
import { Grid } from "@material-ui/core";
import { BUTTONS, DELETE_ACTION, ARCHIVE_ACTION, MONTHS } from "./Constents";
import AlertMessages from "../AlertMessages";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import showMessage from "../../../../../Utils/Toast";

interface Props {
  closePopup: () => void;
  popupType: any;
  cloneGroup: (e: any, param: any) => void;
  newVersionGroup: (e: any, param: any) => void;
  archiveGroup: (e: any, param: any) => void;
  deleteGroup: (e: any, param: any) => void;
  popuptitle: any;
  success?: any;
  error?: any;
}

function mapStateToProps(state) {
  if (state?.saveGdm?.success) {
    showMessage(state?.saveGdm?.success, "success");
  }
  if (state?.saveGdm?.error) {
    showMessage(state?.saveGdm?.error, "error");
  }
  return {
    success: state.saveGdm.success,
    error: state.saveGdm.error,
  };
}

class Alerts extends React.Component<Props, any> {
  state = {
    alertFormData: {
      effective_date: undefined,
      submission_month: null,
      st_group_description_name: null,
    },
    errors: [],
    errorClass: "",
    submitted: false,
  };

  handleChange = (event) => {
    const { alertFormData } = this.state;
    alertFormData[event.target.name] = event.target.value;
    this.setState({ alertFormData });
  };

  handleSubmit = (eventHandle) => {
    const { alertFormData } = this.state;

    console.log(alertFormData);
    if (this.props.popupType === "clone") {
      let msg: string[] = [];
      if (alertFormData.st_group_description_name === null) {
        msg.push("Formulary Name is required.");
      }
      if (msg.length > 0) {
        this.setState({ errorClass: "invalid" });
        return;
      }
    }
    // if(this.props.popupType === 'newVersion'){
    //     let msg:string[]=[];
    //     if(alertFormData.effective_date === null){
    //         msg.push("Formulary Build Method is required.");
    //     }
    //     if(alertFormData.submission_month === null){
    //         msg.push("Formulary Effective Date is required.");
    //     }
    //     if(msg.length>0){
    //         console.log(msg)
    //         this.setState({ errorClass:'invalid' });
    //         return;
    //     }
    // }

    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
      eventHandle(alertFormData);
    });
  };

  handleStartDate = (date) => {
    this.setState({
      alertFormData: { effective_date: date, ...this.state.alertFormData },
    });
  };

  render() {
    const {
      closePopup,
      popupType,
      deleteGroup,
      cloneGroup,
      archiveGroup,
      newVersionGroup,
      popuptitle,
    } = this.props;
    return (
      <div className="popup-container">
        <AlertMessages
          delay="10000"
          error={this.props.error}
          success={this.props.success}
          popupType={popupType}
        />
        <div className={`content-wrapper ${popupType}`}>
          <div className="content">
            {popupType == "clone" && (
              <React.Fragment>
                <div className="label">
                  New Name<span className="astrict">*</span>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="st_group_description_name"
                    onChange={this.handleChange}
                    className={this.state.errorClass}
                  />
                </div>
              </React.Fragment>
            )}
            {popupType == "newVersion" && (
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <div className="label">
                      Effective Date<span className="astrict">*</span>
                    </div>
                    <div className="calender">
                      <DatePicker
                        onChange={this.handleStartDate}
                        value={this.state.alertFormData.effective_date}
                        placeholder="Effective Date"
                        name="effective_date"
                        className={this.state.errorClass}
                      />
                    </div>
                  </Grid>
                  <Grid xs={6}>
                    <div className="label">
                      Submission Month<span className="astrict">*</span>
                    </div>
                    <div className="input">
                      <select
                        name="submission_month"
                        id="submission_month"
                        onChange={this.handleChange}
                        className={this.state.errorClass}
                      >
                        <option value="Month">Month</option>
                        {MONTHS.map((e) => {
                          return (
                            <option value={e.abbreviation}>
                              {e.abbreviation}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
            {popupType == "delete" && (
              <React.Fragment>
                <div className="actionlabel">
                  {DELETE_ACTION}
                  {popuptitle}?
                </div>
              </React.Fragment>
            )}
            {popupType == "archive" && (
              <React.Fragment>
                <div className="actionlabel">
                  {ARCHIVE_ACTION}
                  {popuptitle}?
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="button">
            <Button variant="contained" onClick={closePopup}>
              Cancel
            </Button>
            {BUTTONS[popupType].map((btn) => {
              const arg = btn.param;
              const eventHandle: any = {
                clone: (e) => cloneGroup(e, this.state.alertFormData),
                newVersion: (e) => newVersionGroup(e, this.state.alertFormData),
                delete: (e) => deleteGroup(e, arg),
                archive: (e) => archiveGroup(e, arg),
              }[popupType];
              return (
                <Button
                  variant="contained"
                  className="visited"
                  onClick={() => this.handleSubmit(eventHandle)}
                >
                  {btn.label}
                </Button>
              );
            })}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Alerts);
