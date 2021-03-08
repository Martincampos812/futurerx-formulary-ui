import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select} from "antd";
import {getCommunicationSearchMiniTabNames} from "../../../mocks/PaSearchTabMock";
import CallTab from "./communication-sub-tabs/callTab/CallTab";
import DocumentTab from "./communication-sub-tabs/documnet-tab/DocumentTab";
import OtherTab from "./communication-sub-tabs/other-tab/OtherTab";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomDatePicker from "../../shared/Frx-components/date-picker/CustomDatePicker";

import "./CommunicationInfoSearch.scss";

const {Option} = Select;

interface Props {
  onMiniTabSelect: (tabIndex: number) => void;
  activeMiniTabIndex: number;
}
interface State {}

class CommunicationsInfoSearch extends Component<Props, State> {
  state = {
    miniTabs: getCommunicationSearchMiniTabNames(),
    // activeMiniTabIndex: 0,
    startDate: "",
    endDate: "",
  };

  onClickMiniTab = (e) => {
    console.log("minIndex", e);
    // this.setState({activeMiniTabIndex: e});
    this.props.onMiniTabSelect(e);
  };

  handleStartDate = (date) => {
    this.setState({startDate: date});
  };

  handleeEndDate = (date) => {
    this.setState({endDate: date});
  };

  render() {
    return (
      <div className="CommunicationsInfoSearch">
        <Grid container className="pa-info-Search-container">
          <Grid item container className="member-info-container">
            <Grid item sm={4} className="member-info-heading">
              Member Information
            </Grid>
            <Grid item sm={5} className="member-info-search-field">
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
            {/* <Grid item container sm={1} className="member-info-buttons"></Grid>
            <Grid item sm={1}></Grid> */}
          </Grid>

          <Grid item container className="pa-info-container">
            <Grid item sm={4} className="pa-info-heading">
              Communication Type
            </Grid>
            <Grid item container sm={5} className="pa-info-search-field">
              <Grid item container className="pa-info-mintabs">
                <FrxMiniTabs
                  tabList={this.state.miniTabs}
                  activeTabIndex={this.props.activeMiniTabIndex}
                  onClickTab={this.onClickMiniTab}
                />
              </Grid>

              <Grid item container className="pa-info-caseid">
                {this.props.activeMiniTabIndex === 0 ? <CallTab /> : null}
                {this.props.activeMiniTabIndex === 1 ? <DocumentTab /> : null}
                {this.props.activeMiniTabIndex === 2 ? <OtherTab /> : null}
              </Grid>
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
      </div>
    );
  }
}

export default CommunicationsInfoSearch;
