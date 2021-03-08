import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select, Tag} from "antd";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";

import "./ClaimsInfoSearch.scss";
interface Props {}
interface State {}
const {Option} = Select;
class ClaimsInfoSearch extends Component<Props, State> {
  state = {};
  tagRender = (props) => {
    const {label, value, closable, onClose} = props;
    console.log(props);
    // alert("tagRender");
    return <Tag>{label}</Tag>;
  };

  render() {
    const options = [
      {value: "Madicare"},
      {value: "Medicaid"},
      {value: "Commercial"},
      {value: "Exchange"},
    ];
    return (
      <div className="ClaimsInfoSearch">
        <Grid container className="test-claim-info-search">
          <Grid
            item
            container
            className="test-claim-info-member-info-container"
          >
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
              <Select
                placeholder="Medicare"
                // value={this.state.status}
                // onChange={this.onSelectStatus}
                mode="tags"
                showArrow
                defaultValue={[options[0].value]  }
                tagRender={this.tagRender}
                options={options}
                className="member-search__input--dropdown medicater-dropdown"
                suffixIcon={
                  <svg
                    className="ant-select-suffix"
                    width="6"
                    height="8"
                    viewBox="0 0 6 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                      fill="#999999"
                    />
                  </svg>
                }
              >
                {/* <Option value="">Status</Option> */}
                {/* <Option value="Medicare">Medicare</Option> */}
              </Select>
            </Grid>
          </Grid>

          <Grid item container className="test-claim-information-contianer">
            <Grid
              item
              container
              sm={4}
              className="test-claim-information-heading"
            >
              Claim Information
            </Grid>
            <Grid item sm={5} className="test-claim-information-search-field">
              <Input
                className="member-search__input"
                placeholder="Claim ID"
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
              <Grid
                item
                container
                className="test-claim-status-dhuHistory-container"
                // spacing={1}
              >
                <Grid item sm={6} className="test-claim-status">
                  <DropDown
                    placeholder="Status"
                    className="member-search__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["Paid", "Rejected", "B3"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Grid item sm={6} className="test-claim-duhHistory">
                  <DropDown
                    placeholder="Claim Type"
                    className="member-search__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["Part A", "Part B"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>

                <Grid
                  item
                  container
                  className="claims-grid-search-filds-container"
                >
                  <Grid item sm={12} className="claims-drug-label">
                    <Input
                      className="member-search__input"
                      placeholder="Drug Label"
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
                  <Grid item sm={6} className="claim-rx-field">
                    <Input
                      className="member-search__input"
                      placeholder="RX #"
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
                  <Grid item sm={6} className="claim-ndc">
                    <Input
                      className="member-search__input"
                      placeholder="NDC"
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
                  <Grid item sm={6} className="claim-gpi-field">
                    <Input
                      className="member-search__input"
                      placeholder="GPI"
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
                  <Grid item sm={6} className="claim-ddid">
                    <Input
                      className="member-search__input"
                      placeholder="DDID"
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
                  <Grid item sm={6} className="claim-pbp-field">
                    <Input
                      className="member-search__input"
                      placeholder="PBP"
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
                  <Grid item sm={6} className="claim-contract_id">
                    <Input
                      className="member-search__input"
                      placeholder="Contract ID"
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
                  <Grid item sm={6} className="claim-account-id-field">
                    <Input
                      className="member-search__input"
                      placeholder="Account ID"
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
                  <Grid item sm={6} className="claim-group_id">
                    <Input
                      className="member-search__input"
                      placeholder="Group ID"
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
              </Grid>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ClaimsInfoSearch;
