import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select} from "antd";
import {getPaSearchMiniTabNames} from "../../../mocks/PaSearchTabMock";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import CustomDatePicker from "../../shared/Frx-components/date-picker/CustomDatePicker";

import "./PaInfoSearch.scss";
interface Props {
  onMiniTabSelect: (tabIndex: number) => void;
  activeMiniTabIndex: number;
}
interface State {}
const {Option} = Select;
class PaInfoSearch extends Component<Props, State> {
  state = {
    miniTabs: getPaSearchMiniTabNames(),
    // activeMiniTabIndex: 0,
    startDate: "",
    endDate: "",
  };

  onClickMiniTab = (e) => {
    console.log("minIndex", e);
    this.props.onMiniTabSelect(e);
  };

  handleStartDate = (date) => {
    this.setState({startDate: date});
  };

  handleeEndDate = (date) => {
    this.setState({endDate: date});
  };

  render() {
    const classificationOptions = ["Exception", "Prior Auth"];
    // const caseTypeOption = ["Medicaid PA", "Exchange PA", "Commercial PA"];
    // const reviewStage = [
    //   "Review",
    //   "Awaiting AOR",
    //   "Outreach",
    //   "Clinical Review",
    //   "Approved",
    //   "Denied",
    //   "Withdrawn",
    //   "Cancelled",
    //   "IRE auto-forward",
    // ];
    const caseTypeOption = ["Medicaid PA", "Exchange PA", "Commercial PA"];
    const caseTypeOptionAppeal = [
      "Medicaid Appeal PA",
      "Exchange Appeal PA",
      "Commercial Appeal PA",
    ];
    const reviewStage = [
      "Review",
      "Awaiting AOR",
      "Outreach",
      "Clinical Review",
      "Approved",
      "Denied",
      "Withdrawn",
      "Cancelled",
      "IRE auto-forward",
    ];
    const priorityOptions = ["Standard", "Expedited"];
    const statusOptions = ["Open", "Approved", "Denied", "Other"];
    return (
      <div className="PaInfoSearch">
        <Grid container className="pa-info-Search-container">
          <Grid item container className="member-info-container">
            <Grid item sm={4} className="member-info-heading">
              Member Information
            </Grid>
            <Grid item sm={4} className="member-info-search-field">
              <Input
                className="member-search__input"
                placeholder="Member"
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
            <Grid item container sm={3} className="member-info-buttons">
              <Grid item sm={6} className="new-pa-button">
                <Button className="new-pa">+ New PA</Button>
              </Grid>
              <Grid item sm={6} className="appeal-button">
                <Button className="appeal">+ Appeal</Button>
              </Grid>
            </Grid>
            <Grid item sm={1}></Grid>
          </Grid>

          <Grid item container className="pa-info-container">
            <Grid item sm={4} className="pa-info-heading">
              PA Information
            </Grid>
            <Grid item container sm={5} className="pa-info-search-field">
              <Grid item sm={3} className="pa-info-mintabs">
                <FrxMiniTabs
                  tabList={this.state.miniTabs}
                  activeTabIndex={this.props.activeMiniTabIndex}
                  onClickTab={this.onClickMiniTab}
                />
              </Grid>
              {this.props.activeMiniTabIndex === 0 ? (
                <Grid item className="pa-info-caseid" sm={12}>
                  <Input
                    className="member-search__input"
                    placeholder="Case Id"
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
              ) : this.props.activeMiniTabIndex === 1 ? (
                <Grid item className="pa-info-caseid" sm={12}>
                  <Input
                    className="member-search__input"
                    placeholder="Appeal Case Id"
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
              ) : null}
              <Grid
                item
                container
                className="pa-info-classification-case-type-container"
              >
                <Grid item sm={6} className="classification-field">
                  <DropDown
                    placeholder="Classification"
                    className="pa-info__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={classificationOptions}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                {this.props.activeMiniTabIndex === 0 ? (
                  <Grid item sm={6} className="case-type-field">
                    <Select
                      placeholder="Case Type"
                      // value={this.state.status}
                      // onChange={this.onSelectStatus}
                      className="pa-info__input--dropdown"
                      suffixIcon={
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
                ) : this.props.activeMiniTabIndex === 1 ? (
                  <Grid item sm={6} className="case-type-field">
                    <DropDown
                      placeholder="Case Type"
                      className="pa-info__input--dropdown"
                      // dropdownClassName="formulary-service-year-dropdown"
                      // defaultValue={this.state.medicareTyep}
                      options={caseTypeOptionAppeal}
                      // onSelect={this.onSelectforMedicare}
                    />
                  </Grid>
                ) : null}
              </Grid>
              {/* Prority and Review stage container starts */}
              <Grid item container className="priority-review-stage-container">
                {/* Prority and Review stage container starts */}
                <Grid
                  item
                  container
                  className="priority-review-stage-container"
                >
                  <Grid item sm={6} className="priority-field">
                    <DropDown
                      placeholder="Priority"
                      className="priority__input--dropdown"
                      // dropdownClassName="formulary-service-year-dropdown"
                      // defaultValue={this.state.medicareTyep}
                      options={priorityOptions}
                      // onSelect={this.onSelectforMedicare}
                    />
                  </Grid>
                  <Grid item sm={6} className="review-stage-field">
                    <DropDown
                      placeholder="Review Stage"
                      className="review-stage__input--dropdown"
                      // dropdownClassName="formulary-service-year-dropdown"
                      // defaultValue={this.state.medicareTyep}
                      options={reviewStage}
                      // onSelect={this.onSelectforMedicare}
                    />
                  </Grid>
                </Grid>

                {/* Prority and Review stage container end*/}
                {/* status contianer start*/}
                <Grid item container className="status-container">
                  <Grid item sm={6} className="status-field">
                    <DropDown
                      placeholder="Status"
                      className="status__input--dropdown"
                      // dropdownClassName="formulary-service-year-dropdown"
                      // defaultValue={this.state.medicareTyep}
                      options={statusOptions}
                      // onSelect={this.onSelectforMedicare}
                    />
                  </Grid>
                  {/* durg searcn container start */}
                  <Grid item className="drug-lable-container" sm={12}>
                    <Input
                      className="member-search__input"
                      placeholder="Drug label"
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
                  {/* durg searcn container end */}
                </Grid>
                {/* status contianer end*/}
              </Grid>
            </Grid>

            <Grid item container className="pa-info-date-container">
              <Grid item sm={4} className="date-heading">
                Dates
              </Grid>
              <Grid item container sm={5} className="date-container">
                <Grid item sm={6} className="date-start-date-contianer">
                  <CustomDatePicker
                    className="start-date-picker__input "
                    onChange={this.handleStartDate}
                    value={this.state.startDate}
                    placeholder="Start Date"
                  />
                </Grid>

                <Grid item sm={6} className="date-end-date-contianer">
                  <CustomDatePicker
                    className="end-date-picker__input"
                    onChange={this.handleeEndDate}
                    value={this.state.endDate}
                    placeholder="End Date"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PaInfoSearch;
