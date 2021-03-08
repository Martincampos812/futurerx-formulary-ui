import React from "react";

import PropTypes from "prop-types";
import FrxTabs from "../shared/FrxTabs/FrxTabs";

// material ui modules //
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import "./Static.scss";

// antd modules //
import {DatePicker, Space} from "antd";
import "antd/dist/antd.css";
import {getMainTabNames} from "../../utils/text-labels";
import {TabInfo} from "../../models/tab.model";

const {RangePicker} = DatePicker;

function createData(
  name: string,
  tier1: string,
  tier2: string,
  tier3: string,
  tier4: string,
  tier5: string
) {
  return {name, tier1, tier2, tier3, tier4, tier5};
}

const rows = [
  createData(
    "Standard Retail Rx 30 day supply",
    "$3.00",
    "$3.00",
    "$3.00",
    "$3.00",
    "$3.00"
  ),
  createData(
    "Preferred Retail (if applicable)",
    "$1.00",
    "$1.00",
    "$1.00",
    "$1.00",
    "$1.00"
  ),
  createData(
    "Standard mail order 90 day supply",
    "$9.00",
    "$9.00",
    "$9.00",
    "$9.00",
    "$9.00"
  ),
  createData(
    "Standard retail Rx 90 day supply",
    "$6.00",
    "$6.00",
    "$6.00",
    "$6.00",
    "$6.00"
  ),
];

class Assets extends React.Component {
  state = {
    tabs: getMainTabNames(),
    activeTabIndex: 0,
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    this.setState({tabs, activeTabIndex});
  };

  render() {
    return (
      <React.Fragment>
        <div className="static-root">
          {/* Section/Navigation */}
          <FrxTabs
            tabList={this.state.tabs}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          <div className="done-sections">tab active have to fix</div>
          {/* <AppBar className="container-maintab" position="static">
            <Tabs className="tabs"> */}
          {/* Dashboard */}
          {/* <Tab className="tab active" label="Dashboard" /> */}
          {/*-- Formulary --*/}
          {/* <Tab className="tab" label="Formulary" /> */}
          {/* Pharmacy */}
          {/* <Tab className="tab" label="Pharmacy" /> */}
          {/* Best Price */}
          {/* <Tab className="tab" label="Best Price" /> */}
          {/* Test Claim */}
          {/* <Tab className="tab" label="Test Claim" /> */}
          {/* Claims */}
          {/* <Tab className="tab" label="Claims" /> */}
          {/* PA Cases */}
          {/* <Tab className="tab" label="PA Cases" /> */}
          {/* Grievances */}
          {/* <Tab className="tab" label="Grievances" /> */}
          {/* Auth/Overrides */}
          {/* <Tab className="tab" label="Auth/Overrides" /> */}
          {/* Communications */}
          {/* <Tab className="tab" label="Communications" /> */}
          {/* </Tabs>
          </AppBar> */}
          <div className="assets-root">
            {/* Section/Member Summary */}
            {/* Dropdown _ Member (Default) */}
            <Grid
              direction="row"
              justify="space-between"
              className="section-summary"
              container
              xs={12}
            >
              <Grid item sm={10}>
                <FormControl className="select-formcontrol" variant="outlined">
                  {/* <div className="user-avatar"></div> */}
                  <Avatar
                    className="user-avatar"
                    alt="Mickey"
                    src="/static/images/avatar/1.jpg"
                  />
                  {/* Icon _ Member */}
                  <svg
                    width="11"
                    height="27"
                    viewBox="0 0 11 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-member"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.5 6C7.15685 6 8.5 4.65685 8.5 3C8.5 1.34315 7.15685 0 5.5 0C3.84315 0 2.5 1.34315 2.5 3C2.5 4.65685 3.84315 6 5.5 6ZM5.5 5C6.60457 5 7.5 4.10457 7.5 3C7.5 1.89543 6.60457 1 5.5 1C4.39543 1 3.5 1.89543 3.5 3C3.5 4.10457 4.39543 5 5.5 5ZM0 8C0 7.44772 0.447715 7 1 7H10C10.5523 7 11 7.44772 11 8V16.5C11 16.7761 10.7761 17 10.5 17C10.2239 17 10 16.7761 10 16.5V8.5C10 8.22386 9.77614 8 9.5 8H1.5C1.22386 8 1 8.22386 1 8.5V16.5C1 16.7761 0.776142 17 0.5 17C0.223858 17 0 16.7761 0 16.5V8ZM2 10.5C2 10.2239 2.22386 10 2.5 10C2.77614 10 3 10.2239 3 10.5V25C3 25.5523 3.44772 26 4 26C4.55228 26 5 25.5523 5 25V18.5C5 18.2239 5.22386 18 5.5 18C5.77614 18 6 18.2239 6 18.5V25C6 25.5523 6.44772 26 7 26C7.55228 26 8 25.5523 8 25V10.5C8 10.2239 8.22386 10 8.5 10C8.77614 10 9 10.2239 9 10.5V25C9 26.1046 8.10457 27 7 27C6.40265 27 5.86647 26.7381 5.5 26.3229C5.13353 26.7381 4.59735 27 4 27C2.89543 27 2 26.1046 2 25V10.5Z"
                      fill="#4FA2EF"
                    />
                  </svg>
                  {/*Dropdown*/}
                  <Select
                    IconComponent={() => (
                      <svg
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="suffix-icon"
                      >
                        <path
                          d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                          fill="#999999"
                        />
                      </svg>
                    )}
                    className="select"
                    value={0}
                  >
                    <MenuItem className="option active" value={0}>
                      Machenzie, Johnson-Robertson III (Mickey)
                    </MenuItem>
                    <MenuItem className="option" value={10}>
                      Ten
                    </MenuItem>
                    <MenuItem className="option" value={20}>
                      Twenty
                    </MenuItem>
                    <MenuItem className="option" value={30}>
                      Thirty
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="member-summary-icons" item sm={2}>
                {/* Icon _ User _ Card */}
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="user-card"
                >
                  <path
                    d="M16.5 0H1.5C0.671875 0 0 0.671875 0 1.5V12.5C0 13.3281 0.671875 14 1.5 14H16.5C17.3281 14 18 13.3281 18 12.5V1.5C18 0.671875 17.3281 0 16.5 0ZM5.5 3C6.60313 3 7.5 3.89687 7.5 5C7.5 6.10313 6.60313 7 5.5 7C4.39687 7 3.5 6.10313 3.5 5C3.5 3.89687 4.39687 3 5.5 3ZM9 10.4C9 10.7312 8.6875 11 8.3 11H2.7C2.3125 11 2 10.7312 2 10.4V9.8C2 8.80625 2.94062 8 4.1 8H4.25625C4.64062 8.15938 5.05937 8.25 5.5 8.25C5.94063 8.25 6.3625 8.15938 6.74375 8H6.9C8.05937 8 9 8.80625 9 9.8V10.4ZM16 8.75C16 8.8875 15.8875 9 15.75 9H11.25C11.1125 9 11 8.8875 11 8.75V8.25C11 8.1125 11.1125 8 11.25 8H15.75C15.8875 8 16 8.1125 16 8.25V8.75ZM16 6.75C16 6.8875 15.8875 7 15.75 7H11.25C11.1125 7 11 6.8875 11 6.75V6.25C11 6.1125 11.1125 6 11.25 6H15.75C15.8875 6 16 6.1125 16 6.25V6.75ZM16 4.75C16 4.8875 15.8875 5 15.75 5H11.25C11.1125 5 11 4.8875 11 4.75V4.25C11 4.1125 11.1125 4 11.25 4H15.75C15.8875 4 16 4.1125 16 4.25V4.75Z"
                    fill="#2055B5"
                  />
                </svg>

                {/* Icon _ Audit */}
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-audit"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 0C5.44772 0 5 0.447715 5 1V4C5 4.55228 5.44772 5 6 5H7V9H1C0.447715 9 0 9.44771 0 10V11C0 11.5523 0.447715 12 1 12H15C15.5523 12 16 11.5523 16 11V10C16 9.44772 15.5523 9 15 9H9V5H10C10.5523 5 11 4.55228 11 4V1C11 0.447715 10.5523 0 10 0H6ZM1 13.5C1 13.2239 1.22386 13 1.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H1.5C1.22386 14 1 13.7761 1 13.5Z"
                    fill="#2055B5"
                  />
                </svg>
                {/* Icon _ Alerts */}
                <svg
                  width="15"
                  height="18"
                  viewBox="0 0 15 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-alert"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 17.5543V16.9481C11.9999 16.8848 11.9877 16.8222 11.9641 16.7646C11.9405 16.7069 11.906 16.6555 11.8631 16.6137C11.4748 16.2306 11.1348 15.7913 10.8524 15.3077C10.544 14.6403 10.3592 13.9113 10.3087 13.1637V10.9618C10.3114 9.78752 9.92659 8.6526 9.22661 7.77026C8.52663 6.88792 7.55966 6.31888 6.50738 6.17007V5.59506C6.50738 5.43724 6.45074 5.28589 6.34993 5.17429C6.24911 5.06269 6.11237 5 5.9698 5C5.82722 5 5.69049 5.06269 5.58967 5.17429C5.48885 5.28589 5.43222 5.43724 5.43222 5.59506V6.17898C4.38937 6.33852 3.43408 6.911 2.7433 7.79038C2.05252 8.66976 1.67305 9.79645 1.67517 10.9618V13.1637C1.62473 13.9113 1.43991 14.6403 1.13154 15.3077C0.854047 15.7902 0.519542 16.2294 0.136913 16.6137C0.093959 16.6555 0.0595334 16.7069 0.0359265 16.7646C0.0123195 16.8222 7.24012e-05 16.8848 0 16.9481V17.5543C0 17.6725 0.0424256 17.7859 0.117944 17.8694C0.193462 17.953 0.295886 18 0.402685 18H11.5973C11.7041 18 11.8065 17.953 11.8821 17.8694C11.9576 17.7859 12 17.6725 12 17.5543Z"
                    fill="#2055B5"
                  />
                  <circle cx="12" cy="3" r="3" fill="#C90808" />
                </svg>
                {/*_icon _ Notes */}
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-notes"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                    fill="#2055B5"
                  />
                </svg>
              </Grid>
            </Grid>
            <div className="done-sections">
              member option selection have to fix
            </div>
            {/* Section/Tags */}
            <Grid xs={12} className="section-tags" container>
              <Grid className="list" item sm={8}>
                <Chip className="label active" label="Active" />
                <Chip className="label incomplete" label="Medicare" />
                <Chip className="label" label="Really long tag..." />
                <Chip className="label" label="Maricopa County" />
                <Chip className="label" label="Product ID" />
                <Chip className="label" label="Extra tag with a long  value" />
              </Grid>
              {/* Section/Dropdown _ Service Year */}
              <Grid item sm={4}>
                <div className="date-range">
                  <label>Service year</label>
                  <Space className="space" direction="horizontal" size={12}>
                    <RangePicker
                      suffixIcon={
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="daterange-suffix ant-picker-suffix"
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="#999999"
                          />
                        </svg>
                      }
                      separator="-"
                      format="DD/MM/YYYY"
                      className="date-rangepicker"
                    />
                  </Space>
                </div>
              </Grid>
            </Grid>
            <div className="done-sections"></div>
            {/* Section/Cards */}
            <Grid container className="section-infocard">
              <Grid className="infocard" item xs={3}>
                <div className="card-details">
                  <Card className="card-demographic">
                    <CardContent className="content">
                      <h5 className="hyperlink">Demographics</h5>
                      <label>
                        Member ID
                        <span className="sectionlist-label">8133381165</span>
                      </label>
                      <label>
                        DOB
                        <span className="sectionlist-label">6/1/1957 (64)</span>
                      </label>
                      <label>
                        Language
                        <span className="sectionlist-label">English</span>
                      </label>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid className="infocard" item xs={3}>
                <div className="card-details">
                  <Card className="card-eligibility">
                    <CardContent className="content">
                      <h5 className="hyperlink">Eligibility</h5>
                      <label>
                        Start Date
                        <span className="sectionlist-label">01/01/2020</span>
                      </label>
                      <label>
                        Term Date
                        <span className="sectionlist-label">12/31/2020</span>
                      </label>
                      <label>
                        Transition Date
                        <span className="sectionlist-label">01/05/2021</span>
                      </label>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid className="infocard" item xs={3}>
                <div className="card-details">
                  <Card className="card-providers">
                    <CardContent className="content">
                      <h5>Providers</h5>
                      <label>
                        PCP<span className="hyperlink">Sullivan, James MD</span>
                      </label>
                      <label>
                        Pharmacy (Primary)
                        <span className="hyperlink">CVS mail-order</span>
                      </label>
                      <label>
                        Pharmacy (Secondary)
                        <span className="hyperlink">Walgreens</span>
                      </label>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid className="infocard" item xs={3}>
                <div className="card-details">
                  <Card className="card-preferences">
                    <CardContent className="content">
                      <h5>Preferences</h5>
                      <label>
                        PCM<span className="hyperlink">Email</span>
                      </label>
                      <label>
                        AOR / POA
                        <span className="hyperlink">
                          mjohnsonrobertson_aor.doc
                        </span>
                      </label>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
            <div className="done-sections">have to fix gap between cards</div>
            {/* Section/Attributes */}
            <Grid className="section-attributes" container xs={12}>
              <Grid item sm={1}>
                <h4 className="section-heading attribute-heading">
                  Attributes
                </h4>
              </Grid>
              <Grid item sm={10}>
                <Chip className="label" label="LIS4" />
                <Chip className="label" label="Pharmacy lock-in" />
                <Chip className="label" label="ESRD" />
                <Chip className="label" label="Hospice" />
                <Chip className="label" label="Transplant" />
              </Grid>

              {/* _Icon _ Notes */}
              <Grid item sm={1}>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-notes"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                    fill="#2055B5"
                  />
                </svg>
              </Grid>
            </Grid>
            <div className="done-sections"></div>
            {/* Section/Clinical Diagnosis History and Member notifications */}
            <Grid xs={12} container className="section-diagnosis-notifications">
              <Grid item sm={7} className="section-clinicaldiagnosis">
                <Grid
                  className="diagnosisnotifications-heading"
                  xs={12}
                  container
                >
                  <Grid item sm={4}>
                    <h4 className="section-heading">
                      Clinical Diagnosis History
                    </h4>
                  </Grid>
                  <Grid className="diagnosis-header-search" item sm={8}>
                    <div className="diagnosis-search">
                      <input
                        type="text"
                        placeholder="Search Diagnosis"
                        className="search-inputfield"
                      />
                      {/* Icon _ Search */}
                      <div>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="search-icon"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 5.33778C0 8.29409 2.38147 10.6756 5.33778 10.6756C6.66768 10.6756 7.88125 10.1936 8.81403 9.39424L12.4198 13L13.0004 12.4194L9.39459 8.81363C10.1938 7.8809 10.6756 6.66749 10.6756 5.33778C10.6756 2.38147 8.29409 0 5.33778 0C2.38147 0 0 2.38147 0 5.33778ZM0.821197 5.33778C0.821197 2.83313 2.83313 0.821197 5.33778 0.821197C7.84243 0.821197 9.85437 2.83313 9.85437 5.33778C9.85437 7.84243 7.84243 9.85437 5.33778 9.85437C2.83313 9.85437 0.821197 7.84243 0.821197 5.33778Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Edit _ Icon */}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="edit-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9461 0L13 2.05393L11.4342 3.6204L9.3803 1.56647L10.9461 0ZM3.42322 9.57679H5.47715L10.4662 4.58779L8.41222 2.53386L3.42322 7.52286V9.57679ZM3.53139 11.6307H10.9543V7.06551L12.3236 5.69622V11.6307C12.3236 11.9939 12.1793 12.3422 11.9225 12.5989C11.6657 12.8557 11.3175 13 10.9543 13H1.36929C0.614125 13 0 12.3866 0 11.6307V2.0457C0 1.28985 0.614125 0.676412 1.36929 0.676412H7.42633L6.05704 2.0457H1.36929V11.6307H3.40884C3.4199 11.631 3.4308 11.6326 3.44162 11.6341C3.45358 11.6359 3.46544 11.6376 3.47731 11.6376C3.48621 11.6376 3.49528 11.6358 3.50435 11.6341C3.51342 11.6324 3.52249 11.6307 3.53139 11.6307Z"
                        fill="#2055B5"
                      />
                    </svg>
                    {/* Note _ Icon */}
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="note-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                        fill="#2055B5"
                      />
                    </svg>
                  </Grid>
                </Grid>
                <Grid className="basic-list diagnosis-history scroll-bar">
                  <div className="basic-list-item">
                    <span className="column title">F90.2</span>
                    <span className="column long">
                      Attention-deficit hyperactive disorder, combine type
                    </span>
                    <span className="column right">05/12/2020</span>
                  </div>
                  <div className="basic-list-item">
                    <span className="column title">S72.8X1A</span>
                    <span className="column long">
                      Nondisplaced segmental fracture of shaft of right femur,
                      initial encounter for closed fracture
                    </span>
                    <span className="column right">05/12/2019</span>
                  </div>
                  <div className="basic-list-item">
                    <span className="column title">M87.28</span>
                    <span className="column long">
                      Osteonecrosis due to previous trauma, other site
                    </span>
                    <span className="column right">07/09/2018</span>
                  </div>
                  <div className="basic-list-item">
                    <span className="column title">F90.2</span>
                    <span className="column long">
                      Attention-deficit hyperactive disorder, combine type
                    </span>
                    <span className="column right">05/12/2020</span>
                  </div>
                  <div className="basic-list-item">
                    <span className="column title">F90.2</span>
                    <span className="column long">
                      Attention-deficit hyperactive disorder, combine type
                    </span>
                    <span className="column right">05/12/2020</span>
                  </div>
                </Grid>
              </Grid>
              <Grid xs={12} item sm={5} className="section-membernotifications">
                <Grid
                  className="diagnosisnotifications-heading"
                  xs={12}
                  container
                >
                  <Grid item sm={10}>
                    <h4 className="section-heading">Member notifications</h4>
                  </Grid>
                  {/* Edit _ Icon */}
                  <Grid className="notifications-icons" item sm={2}>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="edit-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9461 0L13 2.05393L11.4342 3.6204L9.3803 1.56647L10.9461 0ZM3.42322 9.57679H5.47715L10.4662 4.58779L8.41222 2.53386L3.42322 7.52286V9.57679ZM3.53139 11.6307H10.9543V7.06551L12.3236 5.69622V11.6307C12.3236 11.9939 12.1793 12.3422 11.9225 12.5989C11.6657 12.8557 11.3175 13 10.9543 13H1.36929C0.614125 13 0 12.3866 0 11.6307V2.0457C0 1.28985 0.614125 0.676412 1.36929 0.676412H7.42633L6.05704 2.0457H1.36929V11.6307H3.40884C3.4199 11.631 3.4308 11.6326 3.44162 11.6341C3.45358 11.6359 3.46544 11.6376 3.47731 11.6376C3.48621 11.6376 3.49528 11.6358 3.50435 11.6341C3.51342 11.6324 3.52249 11.6307 3.53139 11.6307Z"
                        fill="#2055B5"
                      />
                    </svg>
                    {/* Note _ Icon */}
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="note-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                        fill="#2055B5"
                      />
                    </svg>
                  </Grid>
                </Grid>
                <Grid className="diagnosis-history scroll-bar">
                  <div className="notifications-history">
                    <label className="sectionlist-label">
                      Member is due for a flu shot
                    </label>
                    <label className="history-date">09/03/2020</label>
                  </div>
                  <div className="notifications-history">
                    <label className="sectionlist-label">
                      Abilify case is pending
                    </label>
                    <label className="history-date">08/24/2020</label>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <div className="done-sections">have to fix gap</div>
            {/* Section/Accumulators + BarriersFrame */}
            <Grid xs={12} container className="section-accumulators-barrier">
              <Grid item sm={8} className="section-accumulator">
                <AppBar className="folder-tab" position="static">
                  <Tabs className="tabs">
                    <Tab className="tab active" label="Accumulators – part d" />
                    <Tab className="tab" label="Accumulators – Part C Moop" />
                  </Tabs>
                  {/* Note _ Icon */}
                  <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-note"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5 0L10.5 3H7.5V0ZM6.5 0H1.5C0.947715 0 0.5 0.447715 0.5 1V11C0.5 11.5523 0.947715 12 1.5 12H9.5C10.0523 12 10.5 11.5523 10.5 11V4H7.5H6.5V0Z"
                      fill="#2055B5"
                    />
                  </svg>
                </AppBar>
                <Grid xs={12} container className="stepper-block">
                  <Grid item sm={4} className="list">
                    <AppBar className="mini-tab" position="static">
                      <Tabs className="tabs">
                        <Tab className="tab active" label="In-Network" />
                        <Tab className="tab" label="Out of Network" />
                      </Tabs>
                    </AppBar>
                  </Grid>
                  <Grid item sm={8} className="stepper-legend">
                    {/* Legend */}
                    <svg
                      width="324"
                      height="24"
                      viewBox="0 0 324 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stepper-legend"
                    >
                      <circle cx="221.5" cy="12" r="5" fill="#694298" />
                      <path
                        d="M234.85 14.8164H238.723V16H233.367V7.46875H234.85V14.8164ZM241.924 16H240.447V7.46875H241.924V16ZM246.168 7.46875L248.629 14.0078L251.084 7.46875H253V16H251.523V13.1875L251.67 9.42578L249.15 16H248.09L245.576 9.43164L245.723 13.1875V16H244.246V7.46875H246.168ZM256.822 16H255.346V7.46875H256.822V16ZM265.133 8.66406H262.473V16H261.002V8.66406H258.365V7.46875H265.133V8.66406ZM276.662 16H275.18L271.377 9.94727V16H269.895V7.46875H271.377L275.191 13.5449V7.46875H276.662V16ZM285.723 11.957C285.723 12.793 285.578 13.5273 285.289 14.1602C285 14.7891 284.586 15.2734 284.047 15.6133C283.512 15.9492 282.895 16.1172 282.195 16.1172C281.504 16.1172 280.887 15.9492 280.344 15.6133C279.805 15.2734 279.387 14.791 279.09 14.166C278.797 13.541 278.648 12.8203 278.645 12.0039V11.5234C278.645 10.6914 278.791 9.95703 279.084 9.32031C279.381 8.68359 279.797 8.19727 280.332 7.86133C280.871 7.52148 281.488 7.35156 282.184 7.35156C282.879 7.35156 283.494 7.51953 284.029 7.85547C284.568 8.1875 284.984 8.66797 285.277 9.29688C285.57 9.92188 285.719 10.6504 285.723 11.4824V11.957ZM284.24 11.5117C284.24 10.5664 284.061 9.8418 283.701 9.33789C283.346 8.83398 282.84 8.58203 282.184 8.58203C281.543 8.58203 281.041 8.83398 280.678 9.33789C280.318 9.83789 280.135 10.5469 280.127 11.4648V11.957C280.127 12.8945 280.309 13.6191 280.672 14.1309C281.039 14.6426 281.547 14.8984 282.195 14.8984C282.852 14.8984 283.355 14.6484 283.707 14.1484C284.062 13.6484 284.24 12.918 284.24 11.957V11.5117ZM293.359 8.66406H290.699V16H289.229V8.66406H286.592V7.46875H293.359V8.66406ZM300.043 7.46875L302.504 14.0078L304.959 7.46875H306.875V16H305.398V13.1875L305.545 9.42578L303.025 16H301.965L299.451 9.43164L299.598 13.1875V16H298.121V7.46875H300.043ZM314.119 12.1914H310.615V14.8164H314.711V16H309.133V7.46875H314.67V8.66406H310.615V11.0195H314.119V12.1914ZM322.699 8.66406H320.039V16H318.568V8.66406H315.932V7.46875H322.699V8.66406Z"
                        fill="#666666"
                      />
                      <circle cx="122.5" cy="12" r="5" fill="#80C483" />
                      <circle cx="5.5" cy="12" r="5" fill="#8FAADA" />
                      <path
                        d="M134.85 14.8164H138.723V16H133.367V7.46875H134.85V14.8164ZM141.924 16H140.447V7.46875H141.924V16ZM146.168 7.46875L148.629 14.0078L151.084 7.46875H153V16H151.523V13.1875L151.67 9.42578L149.15 16H148.09L145.576 9.43164L145.723 13.1875V16H144.246V7.46875H146.168ZM156.822 16H155.346V7.46875H156.822V16ZM165.133 8.66406H162.473V16H161.002V8.66406H158.365V7.46875H165.133V8.66406ZM171.816 7.46875L174.277 14.0078L176.732 7.46875H178.648V16H177.172V13.1875L177.318 9.42578L174.799 16H173.738L171.225 9.43164L171.371 13.1875V16H169.895V7.46875H171.816ZM185.893 12.1914H182.389V14.8164H186.484V16H180.906V7.46875H186.443V8.66406H182.389V11.0195H185.893V12.1914ZM194.473 8.66406H191.812V16H190.342V8.66406H187.705V7.46875H194.473V8.66406Z"
                        fill="#666666"
                      />
                      <path
                        d="M17.9316 16H16.4551V7.46875H17.9316V16ZM27.0215 16H25.5391L21.7363 9.94727V16H20.2539V7.46875H21.7363L25.5508 13.5449V7.46875H27.0215V16ZM34.2441 12.8301V16H32.7617V7.46875H36.0254C36.9785 7.46875 37.7344 7.7168 38.293 8.21289C38.8555 8.70898 39.1367 9.36523 39.1367 10.1816C39.1367 11.0176 38.8613 11.668 38.3105 12.1328C37.7637 12.5977 36.9961 12.8301 36.0078 12.8301H34.2441ZM34.2441 11.6406H36.0254C36.5527 11.6406 36.9551 11.5176 37.2324 11.2715C37.5098 11.0215 37.6484 10.6621 37.6484 10.1934C37.6484 9.73242 37.5078 9.36523 37.2266 9.0918C36.9453 8.81445 36.5586 8.67188 36.0664 8.66406H34.2441V11.6406ZM44.0723 12.7129H42.4199V16H40.9375V7.46875H43.9375C44.9219 7.46875 45.6816 7.68945 46.2168 8.13086C46.752 8.57227 47.0195 9.21094 47.0195 10.0469C47.0195 10.6172 46.8809 11.0957 46.6035 11.4824C46.3301 11.8652 45.9473 12.1602 45.4551 12.3672L47.3711 15.9238V16H45.7832L44.0723 12.7129ZM42.4199 11.5234H43.9434C44.4434 11.5234 44.834 11.3984 45.1152 11.1484C45.3965 10.8945 45.5371 10.5488 45.5371 10.1113C45.5371 9.6543 45.4062 9.30078 45.1445 9.05078C44.8867 8.80078 44.5 8.67188 43.9844 8.66406H42.4199V11.5234ZM55.7344 11.957C55.7344 12.793 55.5898 13.5273 55.3008 14.1602C55.0117 14.7891 54.5977 15.2734 54.0586 15.6133C53.5234 15.9492 52.9062 16.1172 52.207 16.1172C51.5156 16.1172 50.8984 15.9492 50.3555 15.6133C49.8164 15.2734 49.3984 14.791 49.1016 14.166C48.8086 13.541 48.6602 12.8203 48.6562 12.0039V11.5234C48.6562 10.6914 48.8027 9.95703 49.0957 9.32031C49.3926 8.68359 49.8086 8.19727 50.3438 7.86133C50.8828 7.52148 51.5 7.35156 52.1953 7.35156C52.8906 7.35156 53.5059 7.51953 54.041 7.85547C54.5801 8.1875 54.9961 8.66797 55.2891 9.29688C55.582 9.92188 55.7305 10.6504 55.7344 11.4824V11.957ZM54.252 11.5117C54.252 10.5664 54.0723 9.8418 53.7129 9.33789C53.3574 8.83398 52.8516 8.58203 52.1953 8.58203C51.5547 8.58203 51.0527 8.83398 50.6895 9.33789C50.3301 9.83789 50.1465 10.5469 50.1387 11.4648V11.957C50.1387 12.8945 50.3203 13.6191 50.6836 14.1309C51.0508 14.6426 51.5586 14.8984 52.207 14.8984C52.8633 14.8984 53.3672 14.6484 53.7188 14.1484C54.0742 13.6484 54.252 12.918 54.252 11.957V11.5117ZM64.25 14.8926C63.9414 15.2949 63.5137 15.5996 62.9668 15.8066C62.4199 16.0137 61.7988 16.1172 61.1035 16.1172C60.3887 16.1172 59.7559 15.9551 59.2051 15.6309C58.6543 15.3066 58.2285 14.8438 57.9277 14.2422C57.6309 13.6367 57.4766 12.9316 57.4648 12.127V11.459C57.4648 10.1699 57.7734 9.16406 58.3906 8.44141C59.0078 7.71484 59.8691 7.35156 60.9746 7.35156C61.9238 7.35156 62.6777 7.58594 63.2363 8.05469C63.7949 8.52344 64.1309 9.19922 64.2441 10.082H62.791C62.627 9.05469 62.0312 8.54102 61.0039 8.54102C60.3398 8.54102 59.834 8.78125 59.4863 9.26172C59.1426 9.73828 58.9648 10.4395 58.9531 11.3652V12.0215C58.9531 12.9434 59.1465 13.6602 59.5332 14.1719C59.9238 14.6797 60.4648 14.9336 61.1562 14.9336C61.9141 14.9336 62.4531 14.7617 62.7734 14.418V12.748H61.0156V11.623H64.25V14.8926ZM69.5137 12.7129H67.8613V16H66.3789V7.46875H69.3789C70.3633 7.46875 71.123 7.68945 71.6582 8.13086C72.1934 8.57227 72.4609 9.21094 72.4609 10.0469C72.4609 10.6172 72.3223 11.0957 72.0449 11.4824C71.7715 11.8652 71.3887 12.1602 70.8965 12.3672L72.8125 15.9238V16H71.2246L69.5137 12.7129ZM67.8613 11.5234H69.3848C69.8848 11.5234 70.2754 11.3984 70.5566 11.1484C70.8379 10.8945 70.9785 10.5488 70.9785 10.1113C70.9785 9.6543 70.8477 9.30078 70.5859 9.05078C70.3281 8.80078 69.9414 8.67188 69.4258 8.66406H67.8613V11.5234ZM79.3535 12.1914H75.8496V14.8164H79.9453V16H74.3672V7.46875H79.9043V8.66406H75.8496V11.0195H79.3535V12.1914ZM86.1113 13.8027C86.1113 13.4277 85.9785 13.1387 85.7129 12.9355C85.4512 12.7324 84.9766 12.5273 84.2891 12.3203C83.6016 12.1133 83.0547 11.8828 82.6484 11.6289C81.8711 11.1406 81.4824 10.5039 81.4824 9.71875C81.4824 9.03125 81.7617 8.46484 82.3203 8.01953C82.8828 7.57422 83.6113 7.35156 84.5059 7.35156C85.0996 7.35156 85.6289 7.46094 86.0938 7.67969C86.5586 7.89844 86.9238 8.21094 87.1895 8.61719C87.4551 9.01953 87.5879 9.4668 87.5879 9.95898H86.1113C86.1113 9.51367 85.9707 9.16602 85.6895 8.91602C85.4121 8.66211 85.0137 8.53516 84.4941 8.53516C84.0098 8.53516 83.6328 8.63867 83.3633 8.8457C83.0977 9.05273 82.9648 9.3418 82.9648 9.71289C82.9648 10.0254 83.1094 10.2871 83.3984 10.498C83.6875 10.7051 84.1641 10.9082 84.8281 11.1074C85.4922 11.3027 86.0254 11.5273 86.4277 11.7812C86.8301 12.0312 87.125 12.3203 87.3125 12.6484C87.5 12.9727 87.5938 13.3535 87.5938 13.791C87.5938 14.502 87.3203 15.0684 86.7734 15.4902C86.2305 15.9082 85.4922 16.1172 84.5586 16.1172C83.9414 16.1172 83.373 16.0039 82.8535 15.7773C82.3379 15.5469 81.9355 15.2305 81.6465 14.8281C81.3613 14.4258 81.2188 13.957 81.2188 13.4219H82.7012C82.7012 13.9062 82.8613 14.2812 83.1816 14.5469C83.502 14.8125 83.9609 14.9453 84.5586 14.9453C85.0742 14.9453 85.4609 14.8418 85.7188 14.6348C85.9805 14.4238 86.1113 14.1465 86.1113 13.8027ZM93.8535 13.8027C93.8535 13.4277 93.7207 13.1387 93.4551 12.9355C93.1934 12.7324 92.7188 12.5273 92.0312 12.3203C91.3438 12.1133 90.7969 11.8828 90.3906 11.6289C89.6133 11.1406 89.2246 10.5039 89.2246 9.71875C89.2246 9.03125 89.5039 8.46484 90.0625 8.01953C90.625 7.57422 91.3535 7.35156 92.248 7.35156C92.8418 7.35156 93.3711 7.46094 93.8359 7.67969C94.3008 7.89844 94.666 8.21094 94.9316 8.61719C95.1973 9.01953 95.3301 9.4668 95.3301 9.95898H93.8535C93.8535 9.51367 93.7129 9.16602 93.4316 8.91602C93.1543 8.66211 92.7559 8.53516 92.2363 8.53516C91.752 8.53516 91.375 8.63867 91.1055 8.8457C90.8398 9.05273 90.707 9.3418 90.707 9.71289C90.707 10.0254 90.8516 10.2871 91.1406 10.498C91.4297 10.7051 91.9062 10.9082 92.5703 11.1074C93.2344 11.3027 93.7676 11.5273 94.1699 11.7812C94.5723 12.0312 94.8672 12.3203 95.0547 12.6484C95.2422 12.9727 95.3359 13.3535 95.3359 13.791C95.3359 14.502 95.0625 15.0684 94.5156 15.4902C93.9727 15.9082 93.2344 16.1172 92.3008 16.1172C91.6836 16.1172 91.1152 16.0039 90.5957 15.7773C90.0801 15.5469 89.6777 15.2305 89.3887 14.8281C89.1035 14.4258 88.9609 13.957 88.9609 13.4219H90.4434C90.4434 13.9062 90.6035 14.2812 90.9238 14.5469C91.2441 14.8125 91.7031 14.9453 92.3008 14.9453C92.8164 14.9453 93.2031 14.8418 93.4609 14.6348C93.7227 14.4238 93.8535 14.1465 93.8535 13.8027Z"
                        fill="#666666"
                      />
                    </svg>
                    {/* Legend */}
                  </Grid>

                  {/* Section/Stepper */}
                  <svg
                    width="576"
                    height="104"
                    viewBox="0 0 576 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stepper"
                  >
                    <rect
                      x="12"
                      y="9"
                      width="542"
                      height="30"
                      rx="15"
                      fill="#E5E5E5"
                    />
                    <path
                      d="M434.402 25.7559C434.402 25.4355 434.312 25.1816 434.133 24.9941C433.957 24.8027 433.656 24.627 433.23 24.4668C432.805 24.3066 432.438 24.1484 432.129 23.9922C431.82 23.832 431.555 23.6504 431.332 23.4473C431.113 23.2402 430.941 22.998 430.816 22.7207C430.695 22.4434 430.635 22.1133 430.635 21.7305C430.635 21.0703 430.846 20.5293 431.268 20.1074C431.689 19.6855 432.25 19.4395 432.949 19.3691V18.1152H433.887V19.3867C434.578 19.4844 435.119 19.7734 435.51 20.2539C435.9 20.7305 436.096 21.3496 436.096 22.1113H434.402C434.402 21.6426 434.305 21.293 434.109 21.0625C433.918 20.8281 433.66 20.7109 433.336 20.7109C433.016 20.7109 432.768 20.8027 432.592 20.9863C432.416 21.166 432.328 21.416 432.328 21.7363C432.328 22.0332 432.414 22.2715 432.586 22.4512C432.758 22.6309 433.076 22.8145 433.541 23.002C434.01 23.1895 434.395 23.3672 434.695 23.5352C434.996 23.6992 435.25 23.8867 435.457 24.0977C435.664 24.3047 435.822 24.543 435.932 24.8125C436.041 25.0781 436.096 25.3887 436.096 25.7441C436.096 26.4082 435.889 26.9473 435.475 27.3613C435.061 27.7754 434.49 28.0195 433.764 28.0938V29.2598H432.832V28.0996C432.031 28.0137 431.41 27.7305 430.969 27.25C430.531 26.7656 430.312 26.123 430.312 25.3223H432.006C432.006 25.7871 432.115 26.1445 432.334 26.3945C432.557 26.6406 432.875 26.7637 433.289 26.7637C433.633 26.7637 433.904 26.6738 434.104 26.4941C434.303 26.3105 434.402 26.0645 434.402 25.7559ZM443.092 28H437.244V26.8398L440.004 23.8984C440.383 23.4844 440.662 23.123 440.842 22.8145C441.025 22.5059 441.117 22.2129 441.117 21.9355C441.117 21.5566 441.021 21.2598 440.83 21.0449C440.639 20.8262 440.365 20.7168 440.01 20.7168C439.627 20.7168 439.324 20.8496 439.102 21.1152C438.883 21.377 438.773 21.7227 438.773 22.1523H437.074C437.074 21.6328 437.197 21.1582 437.443 20.7285C437.693 20.2988 438.045 19.9629 438.498 19.7207C438.951 19.4746 439.465 19.3516 440.039 19.3516C440.918 19.3516 441.6 19.5625 442.084 19.9844C442.572 20.4062 442.816 21.002 442.816 21.7715C442.816 22.1934 442.707 22.623 442.488 23.0605C442.27 23.498 441.895 24.0078 441.363 24.5898L439.424 26.6348H443.092V28ZM449.982 28H444.135V26.8398L446.895 23.8984C447.273 23.4844 447.553 23.123 447.732 22.8145C447.916 22.5059 448.008 22.2129 448.008 21.9355C448.008 21.5566 447.912 21.2598 447.721 21.0449C447.529 20.8262 447.256 20.7168 446.9 20.7168C446.518 20.7168 446.215 20.8496 445.992 21.1152C445.773 21.377 445.664 21.7227 445.664 22.1523H443.965C443.965 21.6328 444.088 21.1582 444.334 20.7285C444.584 20.2988 444.936 19.9629 445.389 19.7207C445.842 19.4746 446.355 19.3516 446.93 19.3516C447.809 19.3516 448.49 19.5625 448.975 19.9844C449.463 20.4062 449.707 21.002 449.707 21.7715C449.707 22.1934 449.598 22.623 449.379 23.0605C449.16 23.498 448.785 24.0078 448.254 24.5898L446.314 26.6348H449.982V28ZM451.277 23.8047L451.77 19.4688H456.551V20.8809H453.158L452.947 22.7148C453.35 22.5 453.777 22.3926 454.23 22.3926C455.043 22.3926 455.68 22.6445 456.141 23.1484C456.602 23.6523 456.832 24.3574 456.832 25.2637C456.832 25.8145 456.715 26.3086 456.48 26.7461C456.25 27.1797 455.918 27.5176 455.484 27.7598C455.051 27.998 454.539 28.1172 453.949 28.1172C453.434 28.1172 452.955 28.0137 452.514 27.8066C452.072 27.5957 451.723 27.3008 451.465 26.9219C451.211 26.543 451.076 26.1113 451.061 25.627H452.736C452.771 25.9824 452.895 26.2598 453.105 26.459C453.32 26.6543 453.6 26.752 453.943 26.752C454.326 26.752 454.621 26.6152 454.828 26.3418C455.035 26.0645 455.139 25.6738 455.139 25.1699C455.139 24.6855 455.02 24.3145 454.781 24.0566C454.543 23.7988 454.205 23.6699 453.768 23.6699C453.365 23.6699 453.039 23.7754 452.789 23.9863L452.625 24.1387L451.277 23.8047ZM463.658 24.4727C463.658 25.6523 463.414 26.5547 462.926 27.1797C462.438 27.8047 461.723 28.1172 460.781 28.1172C459.852 28.1172 459.141 27.8105 458.648 27.1973C458.156 26.584 457.904 25.7051 457.893 24.5605V22.9902C457.893 21.7988 458.139 20.8945 458.631 20.2773C459.127 19.6602 459.84 19.3516 460.77 19.3516C461.699 19.3516 462.41 19.6582 462.902 20.2715C463.395 20.8809 463.646 21.7578 463.658 22.9023V24.4727ZM461.965 22.75C461.965 22.043 461.867 21.5293 461.672 21.209C461.48 20.8848 461.18 20.7227 460.77 20.7227C460.371 20.7227 460.076 20.877 459.885 21.1855C459.697 21.4902 459.598 21.9688 459.586 22.6211V24.6953C459.586 25.3906 459.68 25.9082 459.867 26.248C460.059 26.584 460.363 26.752 460.781 26.752C461.195 26.752 461.494 26.5898 461.678 26.2656C461.861 25.9414 461.957 25.4453 461.965 24.7773V22.75Z"
                      fill="#999999"
                    />
                    <path
                      d="M295.902 25.7559C295.902 25.4355 295.812 25.1816 295.633 24.9941C295.457 24.8027 295.156 24.627 294.73 24.4668C294.305 24.3066 293.938 24.1484 293.629 23.9922C293.32 23.832 293.055 23.6504 292.832 23.4473C292.613 23.2402 292.441 22.998 292.316 22.7207C292.195 22.4434 292.135 22.1133 292.135 21.7305C292.135 21.0703 292.346 20.5293 292.768 20.1074C293.189 19.6855 293.75 19.4395 294.449 19.3691V18.1152H295.387V19.3867C296.078 19.4844 296.619 19.7734 297.01 20.2539C297.4 20.7305 297.596 21.3496 297.596 22.1113H295.902C295.902 21.6426 295.805 21.293 295.609 21.0625C295.418 20.8281 295.16 20.7109 294.836 20.7109C294.516 20.7109 294.268 20.8027 294.092 20.9863C293.916 21.166 293.828 21.416 293.828 21.7363C293.828 22.0332 293.914 22.2715 294.086 22.4512C294.258 22.6309 294.576 22.8145 295.041 23.002C295.51 23.1895 295.895 23.3672 296.195 23.5352C296.496 23.6992 296.75 23.8867 296.957 24.0977C297.164 24.3047 297.322 24.543 297.432 24.8125C297.541 25.0781 297.596 25.3887 297.596 25.7441C297.596 26.4082 297.389 26.9473 296.975 27.3613C296.561 27.7754 295.99 28.0195 295.264 28.0938V29.2598H294.332V28.0996C293.531 28.0137 292.91 27.7305 292.469 27.25C292.031 26.7656 291.812 26.123 291.812 25.3223H293.506C293.506 25.7871 293.615 26.1445 293.834 26.3945C294.057 26.6406 294.375 26.7637 294.789 26.7637C295.133 26.7637 295.404 26.6738 295.604 26.4941C295.803 26.3105 295.902 26.0645 295.902 25.7559ZM304.592 28H298.744V26.8398L301.504 23.8984C301.883 23.4844 302.162 23.123 302.342 22.8145C302.525 22.5059 302.617 22.2129 302.617 21.9355C302.617 21.5566 302.521 21.2598 302.33 21.0449C302.139 20.8262 301.865 20.7168 301.51 20.7168C301.127 20.7168 300.824 20.8496 300.602 21.1152C300.383 21.377 300.273 21.7227 300.273 22.1523H298.574C298.574 21.6328 298.697 21.1582 298.943 20.7285C299.193 20.2988 299.545 19.9629 299.998 19.7207C300.451 19.4746 300.965 19.3516 301.539 19.3516C302.418 19.3516 303.1 19.5625 303.584 19.9844C304.072 20.4062 304.316 21.002 304.316 21.7715C304.316 22.1934 304.207 22.623 303.988 23.0605C303.77 23.498 303.395 24.0078 302.863 24.5898L300.924 26.6348H304.592V28ZM311.195 21.7363C311.195 22.1504 311.092 22.5176 310.885 22.8379C310.678 23.1582 310.393 23.4141 310.029 23.6055C310.443 23.8047 310.771 24.0801 311.014 24.4316C311.256 24.7793 311.377 25.1895 311.377 25.6621C311.377 26.4199 311.119 27.0195 310.604 27.4609C310.088 27.8984 309.387 28.1172 308.5 28.1172C307.613 28.1172 306.91 27.8965 306.391 27.4551C305.871 27.0137 305.611 26.416 305.611 25.6621C305.611 25.1895 305.732 24.7773 305.975 24.4258C306.217 24.0742 306.543 23.8008 306.953 23.6055C306.59 23.4141 306.305 23.1582 306.098 22.8379C305.895 22.5176 305.793 22.1504 305.793 21.7363C305.793 21.0098 306.035 20.4316 306.52 20.002C307.004 19.5684 307.662 19.3516 308.494 19.3516C309.322 19.3516 309.979 19.5664 310.463 19.9961C310.951 20.4219 311.195 21.002 311.195 21.7363ZM309.678 25.5391C309.678 25.168 309.57 24.8711 309.355 24.6484C309.141 24.4258 308.852 24.3145 308.488 24.3145C308.129 24.3145 307.842 24.4258 307.627 24.6484C307.412 24.8672 307.305 25.1641 307.305 25.5391C307.305 25.9023 307.41 26.1953 307.621 26.418C307.832 26.6406 308.125 26.752 308.5 26.752C308.867 26.752 309.154 26.6445 309.361 26.4297C309.572 26.2148 309.678 25.918 309.678 25.5391ZM309.502 21.8184C309.502 21.4863 309.414 21.2207 309.238 21.0215C309.062 20.8184 308.814 20.7168 308.494 20.7168C308.178 20.7168 307.932 20.8145 307.756 21.0098C307.58 21.2051 307.492 21.4746 307.492 21.8184C307.492 22.1582 307.58 22.4316 307.756 22.6387C307.932 22.8457 308.18 22.9492 308.5 22.9492C308.82 22.9492 309.066 22.8457 309.238 22.6387C309.414 22.4316 309.502 22.1582 309.502 21.8184ZM318.086 21.7363C318.086 22.1504 317.982 22.5176 317.775 22.8379C317.568 23.1582 317.283 23.4141 316.92 23.6055C317.334 23.8047 317.662 24.0801 317.904 24.4316C318.146 24.7793 318.268 25.1895 318.268 25.6621C318.268 26.4199 318.01 27.0195 317.494 27.4609C316.979 27.8984 316.277 28.1172 315.391 28.1172C314.504 28.1172 313.801 27.8965 313.281 27.4551C312.762 27.0137 312.502 26.416 312.502 25.6621C312.502 25.1895 312.623 24.7773 312.865 24.4258C313.107 24.0742 313.434 23.8008 313.844 23.6055C313.48 23.4141 313.195 23.1582 312.988 22.8379C312.785 22.5176 312.684 22.1504 312.684 21.7363C312.684 21.0098 312.926 20.4316 313.41 20.002C313.895 19.5684 314.553 19.3516 315.385 19.3516C316.213 19.3516 316.869 19.5664 317.354 19.9961C317.842 20.4219 318.086 21.002 318.086 21.7363ZM316.568 25.5391C316.568 25.168 316.461 24.8711 316.246 24.6484C316.031 24.4258 315.742 24.3145 315.379 24.3145C315.02 24.3145 314.732 24.4258 314.518 24.6484C314.303 24.8672 314.195 25.1641 314.195 25.5391C314.195 25.9023 314.301 26.1953 314.512 26.418C314.723 26.6406 315.016 26.752 315.391 26.752C315.758 26.752 316.045 26.6445 316.252 26.4297C316.463 26.2148 316.568 25.918 316.568 25.5391ZM316.393 21.8184C316.393 21.4863 316.305 21.2207 316.129 21.0215C315.953 20.8184 315.705 20.7168 315.385 20.7168C315.068 20.7168 314.822 20.8145 314.646 21.0098C314.471 21.2051 314.383 21.4746 314.383 21.8184C314.383 22.1582 314.471 22.4316 314.646 22.6387C314.822 22.8457 315.07 22.9492 315.391 22.9492C315.711 22.9492 315.957 22.8457 316.129 22.6387C316.305 22.4316 316.393 22.1582 316.393 21.8184ZM325.158 24.4727C325.158 25.6523 324.914 26.5547 324.426 27.1797C323.938 27.8047 323.223 28.1172 322.281 28.1172C321.352 28.1172 320.641 27.8105 320.148 27.1973C319.656 26.584 319.404 25.7051 319.393 24.5605V22.9902C319.393 21.7988 319.639 20.8945 320.131 20.2773C320.627 19.6602 321.34 19.3516 322.27 19.3516C323.199 19.3516 323.91 19.6582 324.402 20.2715C324.895 20.8809 325.146 21.7578 325.158 22.9023V24.4727ZM323.465 22.75C323.465 22.043 323.367 21.5293 323.172 21.209C322.98 20.8848 322.68 20.7227 322.27 20.7227C321.871 20.7227 321.576 20.877 321.385 21.1855C321.197 21.4902 321.098 21.9688 321.086 22.6211V24.6953C321.086 25.3906 321.18 25.9082 321.367 26.248C321.559 26.584 321.863 26.752 322.281 26.752C322.695 26.752 322.994 26.5898 323.178 26.2656C323.361 25.9414 323.457 25.4453 323.465 24.7773V22.75Z"
                      fill="#999999"
                    />
                    <rect
                      x="13"
                      y="1"
                      width="212"
                      height="48"
                      rx="24"
                      fill="#80C483"
                      stroke="white"
                      stroke-width="2"
                    />
                    <rect
                      x="177"
                      y="1"
                      width="99"
                      height="48"
                      rx="24"
                      fill="#6E90CF"
                      stroke="white"
                      stroke-width="2"
                    />
                    <path
                      d="M237.848 26.7559C237.848 26.4355 237.758 26.1816 237.578 25.9941C237.402 25.8027 237.102 25.627 236.676 25.4668C236.25 25.3066 235.883 25.1484 235.574 24.9922C235.266 24.832 235 24.6504 234.777 24.4473C234.559 24.2402 234.387 23.998 234.262 23.7207C234.141 23.4434 234.08 23.1133 234.08 22.7305C234.08 22.0703 234.291 21.5293 234.713 21.1074C235.135 20.6855 235.695 20.4395 236.395 20.3691V19.1152H237.332V20.3867C238.023 20.4844 238.564 20.7734 238.955 21.2539C239.346 21.7305 239.541 22.3496 239.541 23.1113H237.848C237.848 22.6426 237.75 22.293 237.555 22.0625C237.363 21.8281 237.105 21.7109 236.781 21.7109C236.461 21.7109 236.213 21.8027 236.037 21.9863C235.861 22.166 235.773 22.416 235.773 22.7363C235.773 23.0332 235.859 23.2715 236.031 23.4512C236.203 23.6309 236.521 23.8145 236.986 24.002C237.455 24.1895 237.84 24.3672 238.141 24.5352C238.441 24.6992 238.695 24.8867 238.902 25.0977C239.109 25.3047 239.268 25.543 239.377 25.8125C239.486 26.0781 239.541 26.3887 239.541 26.7441C239.541 27.4082 239.334 27.9473 238.92 28.3613C238.506 28.7754 237.936 29.0195 237.209 29.0938V30.2598H236.277V29.0996C235.477 29.0137 234.855 28.7305 234.414 28.25C233.977 27.7656 233.758 27.123 233.758 26.3223H235.451C235.451 26.7871 235.561 27.1445 235.779 27.3945C236.002 27.6406 236.32 27.7637 236.734 27.7637C237.078 27.7637 237.35 27.6738 237.549 27.4941C237.748 27.3105 237.848 27.0645 237.848 26.7559ZM246.25 22.7363C246.25 23.1504 246.146 23.5176 245.939 23.8379C245.732 24.1582 245.447 24.4141 245.084 24.6055C245.498 24.8047 245.826 25.0801 246.068 25.4316C246.311 25.7793 246.432 26.1895 246.432 26.6621C246.432 27.4199 246.174 28.0195 245.658 28.4609C245.143 28.8984 244.441 29.1172 243.555 29.1172C242.668 29.1172 241.965 28.8965 241.445 28.4551C240.926 28.0137 240.666 27.416 240.666 26.6621C240.666 26.1895 240.787 25.7773 241.029 25.4258C241.271 25.0742 241.598 24.8008 242.008 24.6055C241.645 24.4141 241.359 24.1582 241.152 23.8379C240.949 23.5176 240.848 23.1504 240.848 22.7363C240.848 22.0098 241.09 21.4316 241.574 21.002C242.059 20.5684 242.717 20.3516 243.549 20.3516C244.377 20.3516 245.033 20.5664 245.518 20.9961C246.006 21.4219 246.25 22.002 246.25 22.7363ZM244.732 26.5391C244.732 26.168 244.625 25.8711 244.41 25.6484C244.195 25.4258 243.906 25.3145 243.543 25.3145C243.184 25.3145 242.896 25.4258 242.682 25.6484C242.467 25.8672 242.359 26.1641 242.359 26.5391C242.359 26.9023 242.465 27.1953 242.676 27.418C242.887 27.6406 243.18 27.752 243.555 27.752C243.922 27.752 244.209 27.6445 244.416 27.4297C244.627 27.2148 244.732 26.918 244.732 26.5391ZM244.557 22.8184C244.557 22.4863 244.469 22.2207 244.293 22.0215C244.117 21.8184 243.869 21.7168 243.549 21.7168C243.232 21.7168 242.986 21.8145 242.811 22.0098C242.635 22.2051 242.547 22.4746 242.547 22.8184C242.547 23.1582 242.635 23.4316 242.811 23.6387C242.986 23.8457 243.234 23.9492 243.555 23.9492C243.875 23.9492 244.121 23.8457 244.293 23.6387C244.469 23.4316 244.557 23.1582 244.557 22.8184ZM253.322 25.4727C253.322 26.6523 253.078 27.5547 252.59 28.1797C252.102 28.8047 251.387 29.1172 250.445 29.1172C249.516 29.1172 248.805 28.8105 248.312 28.1973C247.82 27.584 247.568 26.7051 247.557 25.5605V23.9902C247.557 22.7988 247.803 21.8945 248.295 21.2773C248.791 20.6602 249.504 20.3516 250.434 20.3516C251.363 20.3516 252.074 20.6582 252.566 21.2715C253.059 21.8809 253.311 22.7578 253.322 23.9023V25.4727ZM251.629 23.75C251.629 23.043 251.531 22.5293 251.336 22.209C251.145 21.8848 250.844 21.7227 250.434 21.7227C250.035 21.7227 249.74 21.877 249.549 22.1855C249.361 22.4902 249.262 22.9688 249.25 23.6211V25.6953C249.25 26.3906 249.344 26.9082 249.531 27.248C249.723 27.584 250.027 27.752 250.445 27.752C250.859 27.752 251.158 27.5898 251.342 27.2656C251.525 26.9414 251.621 26.4453 251.629 25.7773V23.75ZM260.213 25.4727C260.213 26.6523 259.969 27.5547 259.48 28.1797C258.992 28.8047 258.277 29.1172 257.336 29.1172C256.406 29.1172 255.695 28.8105 255.203 28.1973C254.711 27.584 254.459 26.7051 254.447 25.5605V23.9902C254.447 22.7988 254.693 21.8945 255.186 21.2773C255.682 20.6602 256.395 20.3516 257.324 20.3516C258.254 20.3516 258.965 20.6582 259.457 21.2715C259.949 21.8809 260.201 22.7578 260.213 23.9023V25.4727ZM258.52 23.75C258.52 23.043 258.422 22.5293 258.227 22.209C258.035 21.8848 257.734 21.7227 257.324 21.7227C256.926 21.7227 256.631 21.877 256.439 22.1855C256.252 22.4902 256.152 22.9688 256.141 23.6211V25.6953C256.141 26.3906 256.234 26.9082 256.422 27.248C256.613 27.584 256.918 27.752 257.336 27.752C257.75 27.752 258.049 27.5898 258.232 27.2656C258.416 26.9414 258.512 26.4453 258.52 25.7773V23.75Z"
                      fill="white"
                    />
                    <path
                      d="M1.11914 74V65.4688H3.74414C4.49414 65.4688 5.16406 65.6387 5.75391 65.9785C6.34766 66.3145 6.81055 66.7949 7.14258 67.4199C7.47461 68.041 7.64062 68.748 7.64062 69.541V69.9336C7.64062 70.7266 7.47656 71.4316 7.14844 72.0488C6.82422 72.666 6.36523 73.1445 5.77148 73.4844C5.17773 73.8242 4.50781 73.9961 3.76172 74H1.11914ZM2.87695 66.8926V72.5879H3.72656C4.41406 72.5879 4.93945 72.3633 5.30273 71.9141C5.66602 71.4648 5.85156 70.8223 5.85938 69.9863V69.5352C5.85938 68.668 5.67969 68.0117 5.32031 67.5664C4.96094 67.1172 4.43555 66.8926 3.74414 66.8926H2.87695ZM14.5566 70.3027H11.1816V72.5879H15.1426V74H9.42383V65.4688H15.1309V66.8926H11.1816V68.9258H14.5566V70.3027ZM16.6738 74V65.4688H19.2988C20.0488 65.4688 20.7188 65.6387 21.3086 65.9785C21.9023 66.3145 22.3652 66.7949 22.6973 67.4199C23.0293 68.041 23.1953 68.748 23.1953 69.541V69.9336C23.1953 70.7266 23.0312 71.4316 22.7031 72.0488C22.3789 72.666 21.9199 73.1445 21.3262 73.4844C20.7324 73.8242 20.0625 73.9961 19.3164 74H16.6738ZM18.4316 66.8926V72.5879H19.2812C19.9688 72.5879 20.4941 72.3633 20.8574 71.9141C21.2207 71.4648 21.4062 70.8223 21.4141 69.9863V69.5352C21.4141 68.668 21.2344 68.0117 20.875 67.5664C20.5156 67.1172 19.9902 66.8926 19.2988 66.8926H18.4316ZM31.4355 65.4688V71.0879C31.4355 72.0215 31.1426 72.7598 30.5566 73.3027C29.9746 73.8457 29.1777 74.1172 28.166 74.1172C27.1699 74.1172 26.3789 73.8535 25.793 73.3262C25.207 72.7988 24.9082 72.0742 24.8965 71.1523V65.4688H26.6543V71.0996C26.6543 71.6582 26.7871 72.0664 27.0527 72.3242C27.3223 72.5781 27.6934 72.7051 28.166 72.7051C29.1543 72.7051 29.6562 72.1855 29.6719 71.1465V65.4688H31.4355ZM40.0742 71.1582C40.0078 72.0762 39.668 72.7988 39.0547 73.3262C38.4453 73.8535 37.6406 74.1172 36.6406 74.1172C35.5469 74.1172 34.6855 73.75 34.0566 73.0156C33.4316 72.2773 33.1191 71.2656 33.1191 69.9805V69.459C33.1191 68.6387 33.2637 67.916 33.5527 67.291C33.8418 66.666 34.2539 66.1875 34.7891 65.8555C35.3281 65.5195 35.9531 65.3516 36.6641 65.3516C37.6484 65.3516 38.4414 65.6152 39.043 66.1426C39.6445 66.6699 39.9922 67.4102 40.0859 68.3633H38.3281C38.2852 67.8125 38.1309 67.4141 37.8652 67.168C37.6035 66.918 37.2031 66.793 36.6641 66.793C36.0781 66.793 35.6387 67.0039 35.3457 67.4258C35.0566 67.8438 34.9082 68.4941 34.9004 69.377V70.0215C34.9004 70.9434 35.0391 71.6172 35.3164 72.043C35.5977 72.4688 36.0391 72.6816 36.6406 72.6816C37.1836 72.6816 37.5879 72.5586 37.8535 72.3125C38.123 72.0625 38.2773 71.6777 38.3164 71.1582H40.0742ZM47.9746 66.8926H45.3613V74H43.6035V66.8926H41.0254V65.4688H47.9746V66.8926ZM51.3516 74H49.5938V65.4688H51.3516V74ZM53.4863 74V65.4688H56.4746C57.5098 65.4688 58.2949 65.668 58.8301 66.0664C59.3652 66.4609 59.6328 67.041 59.6328 67.8066C59.6328 68.2246 59.5254 68.5938 59.3105 68.9141C59.0957 69.2305 58.7969 69.4629 58.4141 69.6113C58.8516 69.7207 59.1953 69.9414 59.4453 70.2734C59.6992 70.6055 59.8262 71.0117 59.8262 71.4922C59.8262 72.3125 59.5645 72.9336 59.041 73.3555C58.5176 73.7773 57.7715 73.9922 56.8027 74H53.4863ZM55.2441 70.2852V72.5879H56.75C57.1641 72.5879 57.4863 72.4902 57.7168 72.2949C57.9512 72.0957 58.0684 71.8223 58.0684 71.4746C58.0684 70.6934 57.6641 70.2969 56.8555 70.2852H55.2441ZM55.2441 69.043H56.5449C57.4316 69.0273 57.875 68.6738 57.875 67.9824C57.875 67.5957 57.7617 67.3184 57.5352 67.1504C57.3125 66.9785 56.959 66.8926 56.4746 66.8926H55.2441V69.043ZM63.4082 72.5879H67.1406V74H61.6504V65.4688H63.4082V72.5879ZM73.7871 70.3027H70.4121V72.5879H74.373V74H68.6543V65.4688H74.3613V66.8926H70.4121V68.9258H73.7871V70.3027Z"
                      fill="#333333"
                    />
                    <path
                      d="M0.357422 75.1719H74.6426V75.7578H0.357422V75.1719Z"
                      fill="#333333"
                    />
                    <path
                      d="M147.852 74H146.094V65.4688H147.852V74ZM156.924 74H155.166L151.744 68.3867V74H149.986V65.4688H151.744L155.172 71.0938V65.4688H156.924V74ZM160.828 74H159.07V65.4688H160.828V74ZM169.209 66.8926H166.596V74H164.838V66.8926H162.26V65.4688H169.209V66.8926ZM172.586 74H170.828V65.4688H172.586V74ZM179.643 72.2422H176.561L175.975 74H174.105L177.281 65.4688H178.91L182.104 74H180.234L179.643 72.2422ZM177.035 70.8184H179.168L178.096 67.625L177.035 70.8184ZM185.158 72.5879H188.891V74H183.4V65.4688H185.158V72.5879ZM200.59 71.1582C200.523 72.0762 200.184 72.7988 199.57 73.3262C198.961 73.8535 198.156 74.1172 197.156 74.1172C196.062 74.1172 195.201 73.75 194.572 73.0156C193.947 72.2773 193.635 71.2656 193.635 69.9805V69.459C193.635 68.6387 193.779 67.916 194.068 67.291C194.357 66.666 194.77 66.1875 195.305 65.8555C195.844 65.5195 196.469 65.3516 197.18 65.3516C198.164 65.3516 198.957 65.6152 199.559 66.1426C200.16 66.6699 200.508 67.4102 200.602 68.3633H198.844C198.801 67.8125 198.646 67.4141 198.381 67.168C198.119 66.918 197.719 66.793 197.18 66.793C196.594 66.793 196.154 67.0039 195.861 67.4258C195.572 67.8438 195.424 68.4941 195.416 69.377V70.0215C195.416 70.9434 195.555 71.6172 195.832 72.043C196.113 72.4688 196.555 72.6816 197.156 72.6816C197.699 72.6816 198.104 72.5586 198.369 72.3125C198.639 72.0625 198.793 71.6777 198.832 71.1582H200.59ZM209.252 69.9277C209.252 70.7676 209.104 71.5039 208.807 72.1367C208.51 72.7695 208.084 73.2578 207.529 73.6016C206.979 73.9453 206.346 74.1172 205.631 74.1172C204.924 74.1172 204.293 73.9473 203.738 73.6074C203.184 73.2676 202.754 72.7832 202.449 72.1543C202.145 71.5215 201.99 70.7949 201.986 69.9746V69.5527C201.986 68.7129 202.137 67.9746 202.438 67.3379C202.742 66.6973 203.17 66.207 203.721 65.8672C204.275 65.5234 204.908 65.3516 205.619 65.3516C206.33 65.3516 206.961 65.5234 207.512 65.8672C208.066 66.207 208.494 66.6973 208.795 67.3379C209.1 67.9746 209.252 68.7109 209.252 69.5469V69.9277ZM207.471 69.541C207.471 68.6465 207.311 67.9668 206.99 67.502C206.67 67.0371 206.213 66.8047 205.619 66.8047C205.029 66.8047 204.574 67.0352 204.254 67.4961C203.934 67.9531 203.771 68.625 203.768 69.5117V69.9277C203.768 70.7988 203.928 71.4746 204.248 71.9551C204.568 72.4355 205.029 72.6758 205.631 72.6758C206.221 72.6758 206.674 72.4453 206.99 71.9844C207.307 71.5195 207.467 70.8438 207.471 69.957V69.541ZM214.053 71.8848L215.986 65.4688H217.943L214.973 74H213.139L210.18 65.4688H212.131L214.053 71.8848ZM224.385 70.3027H221.01V72.5879H224.971V74H219.252V65.4688H224.959V66.8926H221.01V68.9258H224.385V70.3027ZM229.66 70.877H228.26V74H226.502V65.4688H229.672C230.68 65.4688 231.457 65.6934 232.004 66.1426C232.551 66.5918 232.824 67.2266 232.824 68.0469C232.824 68.6289 232.697 69.1152 232.443 69.5059C232.193 69.8926 231.812 70.2012 231.301 70.4316L233.146 73.918V74H231.26L229.66 70.877ZM228.26 69.4531H229.678C230.119 69.4531 230.461 69.3418 230.703 69.1191C230.945 68.8926 231.066 68.582 231.066 68.1875C231.066 67.7852 230.951 67.4688 230.721 67.2383C230.494 67.0078 230.145 66.8926 229.672 66.8926H228.26V69.4531ZM239.482 72.2422H236.4L235.814 74H233.945L237.121 65.4688H238.75L241.943 74H240.074L239.482 72.2422ZM236.875 70.8184H239.008L237.936 67.625L236.875 70.8184ZM249.861 72.9219C249.545 73.3008 249.098 73.5957 248.52 73.8066C247.941 74.0137 247.301 74.1172 246.598 74.1172C245.859 74.1172 245.211 73.957 244.652 73.6367C244.098 73.3125 243.668 72.8438 243.363 72.2305C243.062 71.6172 242.908 70.8965 242.9 70.0684V69.4883C242.9 68.6367 243.043 67.9004 243.328 67.2793C243.617 66.6543 244.031 66.1777 244.57 65.8496C245.113 65.5176 245.748 65.3516 246.475 65.3516C247.486 65.3516 248.277 65.5938 248.848 66.0781C249.418 66.5586 249.756 67.2598 249.861 68.1816H248.15C248.072 67.6934 247.898 67.3359 247.629 67.1094C247.363 66.8828 246.996 66.7695 246.527 66.7695C245.93 66.7695 245.475 66.9941 245.162 67.4434C244.85 67.8926 244.691 68.5605 244.688 69.4473V69.9922C244.688 70.8867 244.857 71.5625 245.197 72.0195C245.537 72.4766 246.035 72.7051 246.691 72.7051C247.352 72.7051 247.822 72.5645 248.104 72.2832V70.8125H246.504V69.5176H249.861V72.9219ZM256.924 70.3027H253.549V72.5879H257.51V74H251.791V65.4688H257.498V66.8926H253.549V68.9258H256.924V70.3027Z"
                      fill="#333333"
                    />
                    <path
                      d="M145.221 75.1719H257.779V75.7578H145.221V75.1719Z"
                      fill="#333333"
                    />
                    <path
                      d="M325.693 72.9219C325.377 73.3008 324.93 73.5957 324.352 73.8066C323.773 74.0137 323.133 74.1172 322.43 74.1172C321.691 74.1172 321.043 73.957 320.484 73.6367C319.93 73.3125 319.5 72.8438 319.195 72.2305C318.895 71.6172 318.74 70.8965 318.732 70.0684V69.4883C318.732 68.6367 318.875 67.9004 319.16 67.2793C319.449 66.6543 319.863 66.1777 320.402 65.8496C320.945 65.5176 321.58 65.3516 322.307 65.3516C323.318 65.3516 324.109 65.5938 324.68 66.0781C325.25 66.5586 325.588 67.2598 325.693 68.1816H323.982C323.904 67.6934 323.73 67.3359 323.461 67.1094C323.195 66.8828 322.828 66.7695 322.359 66.7695C321.762 66.7695 321.307 66.9941 320.994 67.4434C320.682 67.8926 320.523 68.5605 320.52 69.4473V69.9922C320.52 70.8867 320.689 71.5625 321.029 72.0195C321.369 72.4766 321.867 72.7051 322.523 72.7051C323.184 72.7051 323.654 72.5645 323.936 72.2832V70.8125H322.336V69.5176H325.693V72.9219ZM332.439 72.2422H329.357L328.771 74H326.902L330.078 65.4688H331.707L334.9 74H333.031L332.439 72.2422ZM329.832 70.8184H331.965L330.893 67.625L329.832 70.8184ZM337.955 70.9941V74H336.197V65.4688H339.525C340.166 65.4688 340.729 65.5859 341.213 65.8203C341.701 66.0547 342.076 66.3887 342.338 66.8223C342.6 67.252 342.73 67.7422 342.73 68.293C342.73 69.1289 342.443 69.7891 341.869 70.2734C341.299 70.7539 340.508 70.9941 339.496 70.9941H337.955ZM337.955 69.5703H339.525C339.99 69.5703 340.344 69.4609 340.586 69.2422C340.832 69.0234 340.955 68.7109 340.955 68.3047C340.955 67.8867 340.832 67.5488 340.586 67.291C340.34 67.0332 340 66.9004 339.566 66.8926H337.955V69.5703ZM354.629 71.1582C354.562 72.0762 354.223 72.7988 353.609 73.3262C353 73.8535 352.195 74.1172 351.195 74.1172C350.102 74.1172 349.24 73.75 348.611 73.0156C347.986 72.2773 347.674 71.2656 347.674 69.9805V69.459C347.674 68.6387 347.818 67.916 348.107 67.291C348.396 66.666 348.809 66.1875 349.344 65.8555C349.883 65.5195 350.508 65.3516 351.219 65.3516C352.203 65.3516 352.996 65.6152 353.598 66.1426C354.199 66.6699 354.547 67.4102 354.641 68.3633H352.883C352.84 67.8125 352.686 67.4141 352.42 67.168C352.158 66.918 351.758 66.793 351.219 66.793C350.633 66.793 350.193 67.0039 349.9 67.4258C349.611 67.8438 349.463 68.4941 349.455 69.377V70.0215C349.455 70.9434 349.594 71.6172 349.871 72.043C350.152 72.4688 350.594 72.6816 351.195 72.6816C351.738 72.6816 352.143 72.5586 352.408 72.3125C352.678 72.0625 352.832 71.6777 352.871 71.1582H354.629ZM363.291 69.9277C363.291 70.7676 363.143 71.5039 362.846 72.1367C362.549 72.7695 362.123 73.2578 361.568 73.6016C361.018 73.9453 360.385 74.1172 359.67 74.1172C358.963 74.1172 358.332 73.9473 357.777 73.6074C357.223 73.2676 356.793 72.7832 356.488 72.1543C356.184 71.5215 356.029 70.7949 356.025 69.9746V69.5527C356.025 68.7129 356.176 67.9746 356.477 67.3379C356.781 66.6973 357.209 66.207 357.76 65.8672C358.314 65.5234 358.947 65.3516 359.658 65.3516C360.369 65.3516 361 65.5234 361.551 65.8672C362.105 66.207 362.533 66.6973 362.834 67.3379C363.139 67.9746 363.291 68.7109 363.291 69.5469V69.9277ZM361.51 69.541C361.51 68.6465 361.35 67.9668 361.029 67.502C360.709 67.0371 360.252 66.8047 359.658 66.8047C359.068 66.8047 358.613 67.0352 358.293 67.4961C357.973 67.9531 357.811 68.625 357.807 69.5117V69.9277C357.807 70.7988 357.967 71.4746 358.287 71.9551C358.607 72.4355 359.068 72.6758 359.67 72.6758C360.26 72.6758 360.713 72.4453 361.029 71.9844C361.346 71.5195 361.506 70.8438 361.51 69.957V69.541ZM368.092 71.8848L370.025 65.4688H371.982L369.012 74H367.178L364.219 65.4688H366.17L368.092 71.8848ZM378.424 70.3027H375.049V72.5879H379.01V74H373.291V65.4688H378.998V66.8926H375.049V68.9258H378.424V70.3027ZM383.699 70.877H382.299V74H380.541V65.4688H383.711C384.719 65.4688 385.496 65.6934 386.043 66.1426C386.59 66.5918 386.863 67.2266 386.863 68.0469C386.863 68.6289 386.736 69.1152 386.482 69.5059C386.232 69.8926 385.852 70.2012 385.34 70.4316L387.186 73.918V74H385.299L383.699 70.877ZM382.299 69.4531H383.717C384.158 69.4531 384.5 69.3418 384.742 69.1191C384.984 68.8926 385.105 68.582 385.105 68.1875C385.105 67.7852 384.99 67.4688 384.76 67.2383C384.533 67.0078 384.184 66.8926 383.711 66.8926H382.299V69.4531ZM393.521 72.2422H390.439L389.854 74H387.984L391.16 65.4688H392.789L395.982 74H394.113L393.521 72.2422ZM390.914 70.8184H393.047L391.975 67.625L390.914 70.8184ZM403.9 72.9219C403.584 73.3008 403.137 73.5957 402.559 73.8066C401.98 74.0137 401.34 74.1172 400.637 74.1172C399.898 74.1172 399.25 73.957 398.691 73.6367C398.137 73.3125 397.707 72.8438 397.402 72.2305C397.102 71.6172 396.947 70.8965 396.939 70.0684V69.4883C396.939 68.6367 397.082 67.9004 397.367 67.2793C397.656 66.6543 398.07 66.1777 398.609 65.8496C399.152 65.5176 399.787 65.3516 400.514 65.3516C401.525 65.3516 402.316 65.5938 402.887 66.0781C403.457 66.5586 403.795 67.2598 403.9 68.1816H402.189C402.111 67.6934 401.938 67.3359 401.668 67.1094C401.402 66.8828 401.035 66.7695 400.566 66.7695C399.969 66.7695 399.514 66.9941 399.201 67.4434C398.889 67.8926 398.73 68.5605 398.727 69.4473V69.9922C398.727 70.8867 398.896 71.5625 399.236 72.0195C399.576 72.4766 400.074 72.7051 400.73 72.7051C401.391 72.7051 401.861 72.5645 402.143 72.2832V70.8125H400.543V69.5176H403.9V72.9219ZM410.963 70.3027H407.588V72.5879H411.549V74H405.83V65.4688H411.537V66.8926H407.588V68.9258H410.963V70.3027Z"
                      fill="#333333"
                    />
                    <path
                      d="M318.182 75.1719H411.818V75.7578H318.182V75.1719Z"
                      fill="#333333"
                    />
                    <path
                      d="M489.523 71.1582C489.457 72.0762 489.117 72.7988 488.504 73.3262C487.895 73.8535 487.09 74.1172 486.09 74.1172C484.996 74.1172 484.135 73.75 483.506 73.0156C482.881 72.2773 482.568 71.2656 482.568 69.9805V69.459C482.568 68.6387 482.713 67.916 483.002 67.291C483.291 66.666 483.703 66.1875 484.238 65.8555C484.777 65.5195 485.402 65.3516 486.113 65.3516C487.098 65.3516 487.891 65.6152 488.492 66.1426C489.094 66.6699 489.441 67.4102 489.535 68.3633H487.777C487.734 67.8125 487.58 67.4141 487.314 67.168C487.053 66.918 486.652 66.793 486.113 66.793C485.527 66.793 485.088 67.0039 484.795 67.4258C484.506 67.8438 484.357 68.4941 484.35 69.377V70.0215C484.35 70.9434 484.488 71.6172 484.766 72.043C485.047 72.4688 485.488 72.6816 486.09 72.6816C486.633 72.6816 487.037 72.5586 487.303 72.3125C487.572 72.0625 487.727 71.6777 487.766 71.1582H489.523ZM495.994 72.2422H492.912L492.326 74H490.457L493.633 65.4688H495.262L498.455 74H496.586L495.994 72.2422ZM493.387 70.8184H495.52L494.447 67.625L493.387 70.8184ZM505.471 66.8926H502.857V74H501.1V66.8926H498.521V65.4688H505.471V66.8926ZM511.092 72.2422H508.01L507.424 74H505.555L508.73 65.4688H510.359L513.553 74H511.684L511.092 72.2422ZM508.484 70.8184H510.617L509.545 67.625L508.484 70.8184ZM519.273 71.7617C519.273 71.4297 519.156 71.1758 518.922 71C518.688 70.8203 518.266 70.6328 517.656 70.4375C517.047 70.2383 516.564 70.043 516.209 69.8516C515.24 69.3281 514.756 68.623 514.756 67.7363C514.756 67.2754 514.885 66.8652 515.143 66.5059C515.404 66.1426 515.777 65.8594 516.262 65.6562C516.75 65.4531 517.297 65.3516 517.902 65.3516C518.512 65.3516 519.055 65.4629 519.531 65.6855C520.008 65.9043 520.377 66.2148 520.639 66.6172C520.904 67.0195 521.037 67.4766 521.037 67.9883H519.279C519.279 67.5977 519.156 67.2949 518.91 67.0801C518.664 66.8613 518.318 66.752 517.873 66.752C517.443 66.752 517.109 66.8438 516.871 67.0273C516.633 67.207 516.514 67.4453 516.514 67.7422C516.514 68.0195 516.652 68.252 516.93 68.4395C517.211 68.627 517.623 68.8027 518.166 68.9668C519.166 69.2676 519.895 69.6406 520.352 70.0859C520.809 70.5312 521.037 71.0859 521.037 71.75C521.037 72.4883 520.758 73.0684 520.199 73.4902C519.641 73.9082 518.889 74.1172 517.943 74.1172C517.287 74.1172 516.689 73.998 516.15 73.7598C515.611 73.5176 515.199 73.1875 514.914 72.7695C514.633 72.3516 514.492 71.8672 514.492 71.3164H516.256C516.256 72.2578 516.818 72.7285 517.943 72.7285C518.361 72.7285 518.688 72.6445 518.922 72.4766C519.156 72.3047 519.273 72.0664 519.273 71.7617ZM529.154 66.8926H526.541V74H524.783V66.8926H522.205V65.4688H529.154V66.8926ZM533.82 70.877H532.42V74H530.662V65.4688H533.832C534.84 65.4688 535.617 65.6934 536.164 66.1426C536.711 66.5918 536.984 67.2266 536.984 68.0469C536.984 68.6289 536.857 69.1152 536.604 69.5059C536.354 69.8926 535.973 70.2012 535.461 70.4316L537.307 73.918V74H535.42L533.82 70.877ZM532.42 69.4531H533.838C534.279 69.4531 534.621 69.3418 534.863 69.1191C535.105 68.8926 535.227 68.582 535.227 68.1875C535.227 67.7852 535.111 67.4688 534.881 67.2383C534.654 67.0078 534.305 66.8926 533.832 66.8926H532.42V69.4531ZM545.834 69.9277C545.834 70.7676 545.686 71.5039 545.389 72.1367C545.092 72.7695 544.666 73.2578 544.111 73.6016C543.561 73.9453 542.928 74.1172 542.213 74.1172C541.506 74.1172 540.875 73.9473 540.32 73.6074C539.766 73.2676 539.336 72.7832 539.031 72.1543C538.727 71.5215 538.572 70.7949 538.568 69.9746V69.5527C538.568 68.7129 538.719 67.9746 539.02 67.3379C539.324 66.6973 539.752 66.207 540.303 65.8672C540.857 65.5234 541.49 65.3516 542.201 65.3516C542.912 65.3516 543.543 65.5234 544.094 65.8672C544.648 66.207 545.076 66.6973 545.377 67.3379C545.682 67.9746 545.834 68.7109 545.834 69.5469V69.9277ZM544.053 69.541C544.053 68.6465 543.893 67.9668 543.572 67.502C543.252 67.0371 542.795 66.8047 542.201 66.8047C541.611 66.8047 541.156 67.0352 540.836 67.4961C540.516 67.9531 540.354 68.625 540.35 69.5117V69.9277C540.35 70.7988 540.51 71.4746 540.83 71.9551C541.15 72.4355 541.611 72.6758 542.213 72.6758C542.803 72.6758 543.256 72.4453 543.572 71.9844C543.889 71.5195 544.049 70.8438 544.053 69.957V69.541ZM549.369 70.9941V74H547.611V65.4688H550.939C551.58 65.4688 552.143 65.5859 552.627 65.8203C553.115 66.0547 553.49 66.3887 553.752 66.8223C554.014 67.252 554.145 67.7422 554.145 68.293C554.145 69.1289 553.857 69.7891 553.283 70.2734C552.713 70.7539 551.922 70.9941 550.91 70.9941H549.369ZM549.369 69.5703H550.939C551.404 69.5703 551.758 69.4609 552 69.2422C552.246 69.0234 552.369 68.7109 552.369 68.3047C552.369 67.8867 552.246 67.5488 552 67.291C551.754 67.0332 551.414 66.9004 550.98 66.8926H549.369V69.5703ZM562.801 74H561.043V70.3438H557.615V74H555.857V65.4688H557.615V68.9258H561.043V65.4688H562.801V74ZM566.711 74H564.953V65.4688H566.711V74ZM575.543 71.1582C575.477 72.0762 575.137 72.7988 574.523 73.3262C573.914 73.8535 573.109 74.1172 572.109 74.1172C571.016 74.1172 570.154 73.75 569.525 73.0156C568.9 72.2773 568.588 71.2656 568.588 69.9805V69.459C568.588 68.6387 568.732 67.916 569.021 67.291C569.311 66.666 569.723 66.1875 570.258 65.8555C570.797 65.5195 571.422 65.3516 572.133 65.3516C573.117 65.3516 573.91 65.6152 574.512 66.1426C575.113 66.6699 575.461 67.4102 575.555 68.3633H573.797C573.754 67.8125 573.6 67.4141 573.334 67.168C573.072 66.918 572.672 66.793 572.133 66.793C571.547 66.793 571.107 67.0039 570.814 67.4258C570.525 67.8438 570.377 68.4941 570.369 69.377V70.0215C570.369 70.9434 570.508 71.6172 570.785 72.043C571.066 72.4688 571.508 72.6816 572.109 72.6816C572.652 72.6816 573.057 72.5586 573.322 72.3125C573.592 72.0625 573.746 71.6777 573.785 71.1582H575.543Z"
                      fill="#333333"
                    />
                    <path
                      d="M482.064 75.1719H575.936V75.7578H482.064V75.1719Z"
                      fill="#333333"
                    />
                    <circle
                      cx="37"
                      cy="25"
                      r="24"
                      fill="#80C483"
                      stroke="white"
                      stroke-width="2"
                    />
                    <circle
                      cx="201"
                      cy="25"
                      r="24"
                      fill="#6E90CF"
                      stroke="white"
                      stroke-width="2"
                    />
                    <circle
                      cx="365"
                      cy="25"
                      r="24"
                      fill="#E5E5E5"
                      stroke="white"
                      stroke-width="2"
                    />
                    <circle
                      cx="529"
                      cy="25"
                      r="24"
                      fill="#E5E5E5"
                      stroke="white"
                      stroke-width="2"
                    />
                    <path
                      d="M108.848 26.7559C108.848 26.4355 108.758 26.1816 108.578 25.9941C108.402 25.8027 108.102 25.627 107.676 25.4668C107.25 25.3066 106.883 25.1484 106.574 24.9922C106.266 24.832 106 24.6504 105.777 24.4473C105.559 24.2402 105.387 23.998 105.262 23.7207C105.141 23.4434 105.08 23.1133 105.08 22.7305C105.08 22.0703 105.291 21.5293 105.713 21.1074C106.135 20.6855 106.695 20.4395 107.395 20.3691V19.1152H108.332V20.3867C109.023 20.4844 109.564 20.7734 109.955 21.2539C110.346 21.7305 110.541 22.3496 110.541 23.1113H108.848C108.848 22.6426 108.75 22.293 108.555 22.0625C108.363 21.8281 108.105 21.7109 107.781 21.7109C107.461 21.7109 107.213 21.8027 107.037 21.9863C106.861 22.166 106.773 22.416 106.773 22.7363C106.773 23.0332 106.859 23.2715 107.031 23.4512C107.203 23.6309 107.521 23.8145 107.986 24.002C108.455 24.1895 108.84 24.3672 109.141 24.5352C109.441 24.6992 109.695 24.8867 109.902 25.0977C110.109 25.3047 110.268 25.543 110.377 25.8125C110.486 26.0781 110.541 26.3887 110.541 26.7441C110.541 27.4082 110.334 27.9473 109.92 28.3613C109.506 28.7754 108.936 29.0195 108.209 29.0938V30.2598H107.277V29.0996C106.477 29.0137 105.855 28.7305 105.414 28.25C104.977 27.7656 104.758 27.123 104.758 26.3223H106.451C106.451 26.7871 106.561 27.1445 106.779 27.3945C107.002 27.6406 107.32 27.7637 107.734 27.7637C108.078 27.7637 108.35 27.6738 108.549 27.4941C108.748 27.3105 108.848 27.0645 108.848 26.7559ZM113.412 23.9844H114.314C114.744 23.9844 115.062 23.877 115.27 23.6621C115.477 23.4473 115.58 23.1621 115.58 22.8066C115.58 22.4629 115.477 22.1953 115.27 22.0039C115.066 21.8125 114.785 21.7168 114.426 21.7168C114.102 21.7168 113.83 21.8066 113.611 21.9863C113.393 22.1621 113.283 22.3926 113.283 22.6777H111.59C111.59 22.2324 111.709 21.834 111.947 21.4824C112.189 21.127 112.525 20.8496 112.955 20.6504C113.389 20.4512 113.865 20.3516 114.385 20.3516C115.287 20.3516 115.994 20.5684 116.506 21.002C117.018 21.4316 117.273 22.0254 117.273 22.7832C117.273 23.1738 117.154 23.5332 116.916 23.8613C116.678 24.1895 116.365 24.4414 115.979 24.6172C116.459 24.7891 116.816 25.0469 117.051 25.3906C117.289 25.7344 117.408 26.1406 117.408 26.6094C117.408 27.3672 117.131 27.9746 116.576 28.4316C116.025 28.8887 115.295 29.1172 114.385 29.1172C113.533 29.1172 112.836 28.8926 112.293 28.4434C111.754 27.9941 111.484 27.4004 111.484 26.6621H113.178C113.178 26.9824 113.297 27.2441 113.535 27.4473C113.777 27.6504 114.074 27.752 114.426 27.752C114.828 27.752 115.143 27.6465 115.369 27.4355C115.6 27.2207 115.715 26.9375 115.715 26.5859C115.715 25.7344 115.246 25.3086 114.309 25.3086H113.412V23.9844ZM124.428 29H118.58V27.8398L121.34 24.8984C121.719 24.4844 121.998 24.123 122.178 23.8145C122.361 23.5059 122.453 23.2129 122.453 22.9355C122.453 22.5566 122.357 22.2598 122.166 22.0449C121.975 21.8262 121.701 21.7168 121.346 21.7168C120.963 21.7168 120.66 21.8496 120.438 22.1152C120.219 22.377 120.109 22.7227 120.109 23.1523H118.41C118.41 22.6328 118.533 22.1582 118.779 21.7285C119.029 21.2988 119.381 20.9629 119.834 20.7207C120.287 20.4746 120.801 20.3516 121.375 20.3516C122.254 20.3516 122.936 20.5625 123.42 20.9844C123.908 21.4062 124.152 22.002 124.152 22.7715C124.152 23.1934 124.043 23.623 123.824 24.0605C123.605 24.498 123.23 25.0078 122.699 25.5898L120.76 27.6348H124.428V29ZM131.213 25.4727C131.213 26.6523 130.969 27.5547 130.48 28.1797C129.992 28.8047 129.277 29.1172 128.336 29.1172C127.406 29.1172 126.695 28.8105 126.203 28.1973C125.711 27.584 125.459 26.7051 125.447 25.5605V23.9902C125.447 22.7988 125.693 21.8945 126.186 21.2773C126.682 20.6602 127.395 20.3516 128.324 20.3516C129.254 20.3516 129.965 20.6582 130.457 21.2715C130.949 21.8809 131.201 22.7578 131.213 23.9023V25.4727ZM129.52 23.75C129.52 23.043 129.422 22.5293 129.227 22.209C129.035 21.8848 128.734 21.7227 128.324 21.7227C127.926 21.7227 127.631 21.877 127.439 22.1855C127.252 22.4902 127.152 22.9688 127.141 23.6211V25.6953C127.141 26.3906 127.234 26.9082 127.422 27.248C127.613 27.584 127.918 27.752 128.336 27.752C128.75 27.752 129.049 27.5898 129.232 27.2656C129.416 26.9414 129.512 26.4453 129.52 25.7773V23.75Z"
                      fill="white"
                    />
                    <line
                      x1="104"
                      y1="32.5"
                      x2="131"
                      y2="32.5"
                      stroke="white"
                      stroke-dasharray="1 1"
                    />
                    <line
                      x1="234"
                      y1="32.5"
                      x2="261"
                      y2="32.5"
                      stroke="white"
                      stroke-dasharray="1 1"
                    />
                    <path
                      d="M38.8721 31H36.332V21.209L33.2998 22.1494V20.084L38.5996 18.1855H38.8721V31Z"
                      fill="white"
                    />
                    <path
                      d="M205.474 31H196.702V29.2598L200.842 24.8477C201.41 24.2266 201.829 23.6846 202.099 23.2217C202.374 22.7588 202.512 22.3193 202.512 21.9033C202.512 21.335 202.368 20.8896 202.081 20.5674C201.794 20.2393 201.384 20.0752 200.851 20.0752C200.276 20.0752 199.822 20.2744 199.488 20.6729C199.16 21.0654 198.996 21.584 198.996 22.2285H196.447C196.447 21.4492 196.632 20.7373 197.001 20.0928C197.376 19.4482 197.903 18.9443 198.583 18.5811C199.263 18.2119 200.033 18.0273 200.895 18.0273C202.213 18.0273 203.235 18.3438 203.962 18.9766C204.694 19.6094 205.061 20.5029 205.061 21.6572C205.061 22.29 204.896 22.9346 204.568 23.5908C204.24 24.2471 203.678 25.0117 202.881 25.8848L199.972 28.9521H205.474V31Z"
                      fill="white"
                    />
                    <path
                      d="M363.286 23.4766H364.64C365.284 23.4766 365.762 23.3154 366.072 22.9932C366.383 22.6709 366.538 22.2432 366.538 21.71C366.538 21.1943 366.383 20.793 366.072 20.5059C365.768 20.2188 365.346 20.0752 364.807 20.0752C364.32 20.0752 363.913 20.21 363.585 20.4795C363.257 20.7432 363.093 21.0889 363.093 21.5166H360.553C360.553 20.8486 360.731 20.251 361.089 19.7236C361.452 19.1904 361.956 18.7744 362.601 18.4756C363.251 18.1768 363.966 18.0273 364.745 18.0273C366.099 18.0273 367.159 18.3525 367.927 19.0029C368.694 19.6475 369.078 20.5381 369.078 21.6748C369.078 22.2607 368.899 22.7998 368.542 23.292C368.185 23.7842 367.716 24.1621 367.136 24.4258C367.856 24.6836 368.393 25.0703 368.744 25.5859C369.102 26.1016 369.28 26.7109 369.28 27.4141C369.28 28.5508 368.864 29.4619 368.032 30.1475C367.206 30.833 366.11 31.1758 364.745 31.1758C363.468 31.1758 362.422 30.8389 361.607 30.165C360.799 29.4912 360.395 28.6006 360.395 27.4932H362.935C362.935 27.9736 363.113 28.3662 363.471 28.6709C363.834 28.9756 364.279 29.1279 364.807 29.1279C365.41 29.1279 365.882 28.9697 366.222 28.6533C366.567 28.3311 366.74 27.9062 366.74 27.3789C366.74 26.1016 366.037 25.4629 364.631 25.4629H363.286V23.4766Z"
                      fill="white"
                    />
                    <path
                      d="M532.217 26.1836H533.667V28.2314H532.217V31H529.677V28.2314H524.43L524.315 26.6318L529.65 18.2031H532.217V26.1836ZM526.847 26.1836H529.677V21.666L529.51 21.9561L526.847 26.1836Z"
                      fill="white"
                    />
                    <rect
                      x="174"
                      y="80"
                      width="54"
                      height="24"
                      rx="12"
                      fill="#80C483"
                    />
                    <path
                      d="M189.4 94.3818C189.4 94.0081 189.296 93.7119 189.086 93.4932C188.881 93.2699 188.53 93.0648 188.033 92.8779C187.536 92.6911 187.108 92.5065 186.748 92.3242C186.388 92.1374 186.078 91.9255 185.818 91.6885C185.563 91.4469 185.363 91.1644 185.217 90.8408C185.076 90.5173 185.005 90.1322 185.005 89.6855C185.005 88.9154 185.251 88.2842 185.743 87.792C186.235 87.2998 186.889 87.0127 187.705 86.9307V85.4678H188.799V86.9512C189.605 87.0651 190.237 87.4023 190.692 87.9629C191.148 88.5189 191.376 89.2412 191.376 90.1299H189.4C189.4 89.583 189.286 89.1751 189.059 88.9062C188.835 88.6328 188.535 88.4961 188.156 88.4961C187.783 88.4961 187.493 88.6032 187.288 88.8174C187.083 89.027 186.98 89.3187 186.98 89.6924C186.98 90.0387 187.081 90.3167 187.281 90.5264C187.482 90.736 187.853 90.9502 188.396 91.1689C188.942 91.3877 189.391 91.5951 189.742 91.791C190.093 91.9824 190.389 92.2012 190.631 92.4473C190.872 92.6888 191.057 92.9668 191.185 93.2812C191.312 93.5911 191.376 93.9535 191.376 94.3682C191.376 95.1429 191.134 95.7718 190.651 96.2549C190.168 96.738 189.503 97.0228 188.655 97.1094V98.4697H187.568V97.1162C186.634 97.016 185.91 96.6855 185.395 96.125C184.884 95.5599 184.629 94.8102 184.629 93.876H186.604C186.604 94.4183 186.732 94.8353 186.987 95.127C187.247 95.4141 187.618 95.5576 188.102 95.5576C188.503 95.5576 188.819 95.4528 189.052 95.2432C189.284 95.029 189.4 94.7419 189.4 94.3818ZM195.226 91.1484H196.278C196.78 91.1484 197.151 91.0231 197.393 90.7725C197.634 90.5218 197.755 90.1891 197.755 89.7744C197.755 89.3734 197.634 89.0612 197.393 88.8379C197.156 88.6146 196.827 88.5029 196.408 88.5029C196.03 88.5029 195.713 88.6077 195.458 88.8174C195.203 89.0225 195.075 89.2913 195.075 89.624H193.1C193.1 89.1045 193.239 88.6396 193.517 88.2295C193.799 87.8148 194.191 87.4912 194.692 87.2588C195.198 87.0264 195.754 86.9102 196.36 86.9102C197.413 86.9102 198.238 87.1631 198.835 87.6689C199.432 88.1702 199.73 88.863 199.73 89.7471C199.73 90.2028 199.591 90.6221 199.313 91.0049C199.035 91.3877 198.671 91.6816 198.22 91.8867C198.78 92.0872 199.197 92.388 199.471 92.7891C199.749 93.1901 199.888 93.6641 199.888 94.2109C199.888 95.0951 199.564 95.8037 198.917 96.3369C198.274 96.8701 197.422 97.1367 196.36 97.1367C195.367 97.1367 194.553 96.8747 193.92 96.3506C193.291 95.8265 192.977 95.1338 192.977 94.2725H194.952C194.952 94.6462 195.091 94.9515 195.369 95.1885C195.652 95.4255 195.998 95.5439 196.408 95.5439C196.878 95.5439 197.244 95.4209 197.509 95.1748C197.778 94.9242 197.912 94.5938 197.912 94.1836C197.912 93.1901 197.365 92.6934 196.271 92.6934H195.226V91.1484ZM208.577 97H201.755V95.6465L204.975 92.2148C205.417 91.7318 205.743 91.3102 205.952 90.9502C206.166 90.5902 206.273 90.2484 206.273 89.9248C206.273 89.4827 206.162 89.1364 205.938 88.8857C205.715 88.6305 205.396 88.5029 204.981 88.5029C204.535 88.5029 204.182 88.6579 203.922 88.9678C203.667 89.2731 203.539 89.6764 203.539 90.1777H201.557C201.557 89.5716 201.7 89.0179 201.987 88.5166C202.279 88.0153 202.689 87.6234 203.218 87.3408C203.746 87.0537 204.346 86.9102 205.016 86.9102C206.041 86.9102 206.836 87.1562 207.401 87.6484C207.971 88.1406 208.256 88.8356 208.256 89.7334C208.256 90.2256 208.128 90.7269 207.873 91.2373C207.618 91.7477 207.18 92.3424 206.561 93.0215L204.298 95.4072H208.577V97ZM216.993 92.8848C216.993 94.2611 216.708 95.3138 216.139 96.043C215.569 96.7721 214.735 97.1367 213.637 97.1367C212.552 97.1367 211.723 96.779 211.148 96.0635C210.574 95.348 210.28 94.3226 210.267 92.9873V91.1553C210.267 89.7653 210.554 88.7103 211.128 87.9902C211.707 87.2702 212.538 86.9102 213.623 86.9102C214.708 86.9102 215.537 87.2679 216.111 87.9834C216.686 88.6943 216.979 89.7174 216.993 91.0527V92.8848ZM215.018 90.875C215.018 90.0501 214.904 89.4508 214.676 89.0771C214.452 88.6989 214.102 88.5098 213.623 88.5098C213.158 88.5098 212.814 88.6898 212.591 89.0498C212.372 89.4053 212.256 89.9635 212.242 90.7246V93.1445C212.242 93.9557 212.352 94.5596 212.57 94.9561C212.794 95.348 213.149 95.5439 213.637 95.5439C214.12 95.5439 214.468 95.3548 214.683 94.9766C214.897 94.5983 215.008 94.0195 215.018 93.2402V90.875Z"
                      fill="white"
                    />
                    <rect
                      x="335"
                      y="80"
                      width="63"
                      height="24"
                      rx="12"
                      fill="#694298"
                    />
                    <path
                      d="M350.4 94.3818C350.4 94.0081 350.296 93.7119 350.086 93.4932C349.881 93.2699 349.53 93.0648 349.033 92.8779C348.536 92.6911 348.108 92.5065 347.748 92.3242C347.388 92.1374 347.078 91.9255 346.818 91.6885C346.563 91.4469 346.363 91.1644 346.217 90.8408C346.076 90.5173 346.005 90.1322 346.005 89.6855C346.005 88.9154 346.251 88.2842 346.743 87.792C347.235 87.2998 347.889 87.0127 348.705 86.9307V85.4678H349.799V86.9512C350.605 87.0651 351.237 87.4023 351.692 87.9629C352.148 88.5189 352.376 89.2412 352.376 90.1299H350.4C350.4 89.583 350.286 89.1751 350.059 88.9062C349.835 88.6328 349.535 88.4961 349.156 88.4961C348.783 88.4961 348.493 88.6032 348.288 88.8174C348.083 89.027 347.98 89.3187 347.98 89.6924C347.98 90.0387 348.081 90.3167 348.281 90.5264C348.482 90.736 348.853 90.9502 349.396 91.1689C349.942 91.3877 350.391 91.5951 350.742 91.791C351.093 91.9824 351.389 92.2012 351.631 92.4473C351.872 92.6888 352.057 92.9668 352.185 93.2812C352.312 93.5911 352.376 93.9535 352.376 94.3682C352.376 95.1429 352.134 95.7718 351.651 96.2549C351.168 96.738 350.503 97.0228 349.655 97.1094V98.4697H348.568V97.1162C347.634 97.016 346.91 96.6855 346.395 96.125C345.884 95.5599 345.629 94.8102 345.629 93.876H347.604C347.604 94.4183 347.732 94.8353 347.987 95.127C348.247 95.4141 348.618 95.5576 349.102 95.5576C349.503 95.5576 349.819 95.4528 350.052 95.2432C350.284 95.029 350.4 94.7419 350.4 94.3818ZM360.061 93.2539H361.188V94.8467H360.061V97H358.085V94.8467H354.004L353.915 93.6025L358.064 87.0469H360.061V93.2539ZM355.884 93.2539H358.085V89.7402L357.955 89.9658L355.884 93.2539ZM369.454 92.8848C369.454 94.2611 369.169 95.3138 368.6 96.043C368.03 96.7721 367.196 97.1367 366.098 97.1367C365.013 97.1367 364.184 96.779 363.609 96.0635C363.035 95.348 362.741 94.3226 362.728 92.9873V91.1553C362.728 89.7653 363.015 88.7103 363.589 87.9902C364.168 87.2702 364.999 86.9102 366.084 86.9102C367.169 86.9102 367.998 87.2679 368.572 87.9834C369.146 88.6943 369.44 89.7174 369.454 91.0527V92.8848ZM367.479 90.875C367.479 90.0501 367.365 89.4508 367.137 89.0771C366.913 88.6989 366.562 88.5098 366.084 88.5098C365.619 88.5098 365.275 88.6898 365.052 89.0498C364.833 89.4053 364.717 89.9635 364.703 90.7246V93.1445C364.703 93.9557 364.812 94.5596 365.031 94.9561C365.255 95.348 365.61 95.5439 366.098 95.5439C366.581 95.5439 366.929 95.3548 367.144 94.9766C367.358 94.5983 367.469 94.0195 367.479 93.2402V90.875ZM377.993 92.8848C377.993 94.2611 377.708 95.3138 377.139 96.043C376.569 96.7721 375.735 97.1367 374.637 97.1367C373.552 97.1367 372.723 96.779 372.148 96.0635C371.574 95.348 371.28 94.3226 371.267 92.9873V91.1553C371.267 89.7653 371.554 88.7103 372.128 87.9902C372.707 87.2702 373.538 86.9102 374.623 86.9102C375.708 86.9102 376.537 87.2679 377.111 87.9834C377.686 88.6943 377.979 89.7174 377.993 91.0527V92.8848ZM376.018 90.875C376.018 90.0501 375.904 89.4508 375.676 89.0771C375.452 88.6989 375.102 88.5098 374.623 88.5098C374.158 88.5098 373.814 88.6898 373.591 89.0498C373.372 89.4053 373.256 89.9635 373.242 90.7246V93.1445C373.242 93.9557 373.352 94.5596 373.57 94.9561C373.794 95.348 374.149 95.5439 374.637 95.5439C375.12 95.5439 375.468 95.3548 375.683 94.9766C375.897 94.5983 376.008 94.0195 376.018 93.2402V90.875ZM386.532 92.8848C386.532 94.2611 386.247 95.3138 385.678 96.043C385.108 96.7721 384.274 97.1367 383.176 97.1367C382.091 97.1367 381.262 96.779 380.688 96.0635C380.113 95.348 379.819 94.3226 379.806 92.9873V91.1553C379.806 89.7653 380.093 88.7103 380.667 87.9902C381.246 87.2702 382.077 86.9102 383.162 86.9102C384.247 86.9102 385.076 87.2679 385.65 87.9834C386.225 88.6943 386.519 89.7174 386.532 91.0527V92.8848ZM384.557 90.875C384.557 90.0501 384.443 89.4508 384.215 89.0771C383.992 88.6989 383.641 88.5098 383.162 88.5098C382.697 88.5098 382.353 88.6898 382.13 89.0498C381.911 89.4053 381.795 89.9635 381.781 90.7246V93.1445C381.781 93.9557 381.891 94.5596 382.109 94.9561C382.333 95.348 382.688 95.5439 383.176 95.5439C383.659 95.5439 384.007 95.3548 384.222 94.9766C384.436 94.5983 384.548 94.0195 384.557 93.2402V90.875Z"
                      fill="white"
                    />
                    <rect
                      x="499"
                      y="80"
                      width="63"
                      height="24"
                      rx="12"
                      fill="#694298"
                    />
                    <path
                      d="M514.4 94.3818C514.4 94.0081 514.296 93.7119 514.086 93.4932C513.881 93.2699 513.53 93.0648 513.033 92.8779C512.536 92.6911 512.108 92.5065 511.748 92.3242C511.388 92.1374 511.078 91.9255 510.818 91.6885C510.563 91.4469 510.363 91.1644 510.217 90.8408C510.076 90.5173 510.005 90.1322 510.005 89.6855C510.005 88.9154 510.251 88.2842 510.743 87.792C511.235 87.2998 511.889 87.0127 512.705 86.9307V85.4678H513.799V86.9512C514.605 87.0651 515.237 87.4023 515.692 87.9629C516.148 88.5189 516.376 89.2412 516.376 90.1299H514.4C514.4 89.583 514.286 89.1751 514.059 88.9062C513.835 88.6328 513.535 88.4961 513.156 88.4961C512.783 88.4961 512.493 88.6032 512.288 88.8174C512.083 89.027 511.98 89.3187 511.98 89.6924C511.98 90.0387 512.081 90.3167 512.281 90.5264C512.482 90.736 512.853 90.9502 513.396 91.1689C513.942 91.3877 514.391 91.5951 514.742 91.791C515.093 91.9824 515.389 92.2012 515.631 92.4473C515.872 92.6888 516.057 92.9668 516.185 93.2812C516.312 93.5911 516.376 93.9535 516.376 94.3682C516.376 95.1429 516.134 95.7718 515.651 96.2549C515.168 96.738 514.503 97.0228 513.655 97.1094V98.4697H512.568V97.1162C511.634 97.016 510.91 96.6855 510.395 96.125C509.884 95.5599 509.629 94.8102 509.629 93.876H511.604C511.604 94.4183 511.732 94.8353 511.987 95.127C512.247 95.4141 512.618 95.5576 513.102 95.5576C513.503 95.5576 513.819 95.4528 514.052 95.2432C514.284 95.029 514.4 94.7419 514.4 94.3818ZM523.575 86.9443V88.5713H523.384C522.491 88.585 521.771 88.8174 521.224 89.2686C520.681 89.7197 520.355 90.3464 520.246 91.1484C520.775 90.6107 521.442 90.3418 522.249 90.3418C523.115 90.3418 523.803 90.6517 524.313 91.2715C524.824 91.8913 525.079 92.707 525.079 93.7188C525.079 94.3659 524.938 94.9515 524.655 95.4756C524.377 95.9997 523.981 96.4076 523.466 96.6992C522.955 96.9909 522.377 97.1367 521.729 97.1367C520.681 97.1367 519.834 96.7721 519.187 96.043C518.544 95.3138 518.223 94.3408 518.223 93.124V92.4131C518.223 91.333 518.425 90.3805 518.831 89.5557C519.241 88.7262 519.827 88.0859 520.588 87.6348C521.354 87.179 522.24 86.9489 523.247 86.9443H523.575ZM521.647 91.9277C521.328 91.9277 521.039 92.012 520.779 92.1807C520.52 92.3447 520.328 92.5635 520.205 92.8369V93.4385C520.205 94.0993 520.335 94.6165 520.595 94.9902C520.854 95.3594 521.219 95.5439 521.688 95.5439C522.112 95.5439 522.454 95.3776 522.714 95.0449C522.978 94.7077 523.11 94.2725 523.11 93.7393C523.11 93.1969 522.978 92.7594 522.714 92.4268C522.45 92.0941 522.094 91.9277 521.647 91.9277ZM533.577 97H526.755V95.6465L529.975 92.2148C530.417 91.7318 530.743 91.3102 530.952 90.9502C531.166 90.5902 531.273 90.2484 531.273 89.9248C531.273 89.4827 531.162 89.1364 530.938 88.8857C530.715 88.6305 530.396 88.5029 529.981 88.5029C529.535 88.5029 529.182 88.6579 528.922 88.9678C528.667 89.2731 528.539 89.6764 528.539 90.1777H526.557C526.557 89.5716 526.7 89.0179 526.987 88.5166C527.279 88.0153 527.689 87.6234 528.218 87.3408C528.746 87.0537 529.346 86.9102 530.016 86.9102C531.041 86.9102 531.836 87.1562 532.401 87.6484C532.971 88.1406 533.256 88.8356 533.256 89.7334C533.256 90.2256 533.128 90.7269 532.873 91.2373C532.618 91.7477 532.18 92.3424 531.561 93.0215L529.298 95.4072H533.577V97ZM535.588 92.1055L536.162 87.0469H541.74V88.6943H537.782L537.536 90.834C538.006 90.5833 538.505 90.458 539.033 90.458C539.981 90.458 540.724 90.752 541.262 91.3398C541.799 91.9277 542.068 92.7503 542.068 93.8076C542.068 94.4502 541.932 95.0267 541.658 95.5371C541.389 96.043 541.002 96.4372 540.496 96.7197C539.99 96.9977 539.393 97.1367 538.705 97.1367C538.104 97.1367 537.545 97.016 537.03 96.7744C536.515 96.5283 536.107 96.1842 535.807 95.7422C535.51 95.3001 535.353 94.7965 535.335 94.2314H537.29C537.331 94.6462 537.475 94.9697 537.721 95.2021C537.971 95.43 538.297 95.5439 538.698 95.5439C539.145 95.5439 539.489 95.3844 539.73 95.0654C539.972 94.7419 540.093 94.2861 540.093 93.6982C540.093 93.1331 539.954 92.7002 539.676 92.3994C539.398 92.0986 539.004 91.9482 538.493 91.9482C538.024 91.9482 537.643 92.0713 537.352 92.3174L537.16 92.4951L535.588 92.1055ZM550.532 92.8848C550.532 94.2611 550.247 95.3138 549.678 96.043C549.108 96.7721 548.274 97.1367 547.176 97.1367C546.091 97.1367 545.262 96.779 544.688 96.0635C544.113 95.348 543.819 94.3226 543.806 92.9873V91.1553C543.806 89.7653 544.093 88.7103 544.667 87.9902C545.246 87.2702 546.077 86.9102 547.162 86.9102C548.247 86.9102 549.076 87.2679 549.65 87.9834C550.225 88.6943 550.519 89.7174 550.532 91.0527V92.8848ZM548.557 90.875C548.557 90.0501 548.443 89.4508 548.215 89.0771C547.992 88.6989 547.641 88.5098 547.162 88.5098C546.697 88.5098 546.353 88.6898 546.13 89.0498C545.911 89.4053 545.795 89.9635 545.781 90.7246V93.1445C545.781 93.9557 545.891 94.5596 546.109 94.9561C546.333 95.348 546.688 95.5439 547.176 95.5439C547.659 95.5439 548.007 95.3548 548.222 94.9766C548.436 94.5983 548.548 94.0195 548.557 93.2402V90.875Z"
                      fill="white"
                    />
                  </svg>
                  {/* Section/Stepper */}
                </Grid>
              </Grid>
              <Grid item sm={4} className="section-barrier">
                <Grid className="barrier-heading" container xs={12}>
                  <Grid item sm={9}>
                    <h4 className="section-heading">Barriers</h4>
                  </Grid>
                  <Grid className="notifications-icons" item sm={3}>
                    {/* Edit _ Icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="edit-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.4461 0.5L13.5 2.55393L11.9342 4.1204L9.8803 2.06647L11.4461 0.5ZM3.92322 10.0768H5.97715L10.9662 5.08779L8.91222 3.03386L3.92322 8.02286V10.0768ZM4.03139 12.1307H11.4543V7.56551L12.8236 6.19622V12.1307C12.8236 12.4939 12.6793 12.8422 12.4225 13.0989C12.1657 13.3557 11.8175 13.5 11.4543 13.5H1.86929C1.11413 13.5 0.5 12.8866 0.5 12.1307V2.5457C0.5 1.78985 1.11413 1.17641 1.86929 1.17641H7.92633L6.55704 2.5457H1.86929V12.1307H3.90884C3.9199 12.131 3.9308 12.1326 3.94162 12.1341C3.95358 12.1359 3.96544 12.1376 3.97731 12.1376C3.98621 12.1376 3.99528 12.1358 4.00435 12.1341C4.01342 12.1324 4.02249 12.1307 4.03139 12.1307Z"
                        fill="#2055B5"
                      />
                    </svg>
                    {/* Note _ Icon */}
                    <svg
                      width="11"
                      height="13"
                      viewBox="0 0 11 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="note-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 0.5L10.5 3.5H7.5V0.5ZM6.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V11.5C0.5 12.0523 0.947715 12.5 1.5 12.5H9.5C10.0523 12.5 10.5 12.0523 10.5 11.5V4.5H7.5H6.5V0.5Z"
                        fill="#2055B5"
                      />
                    </svg>
                  </Grid>
                </Grid>
                <div className="list">
                  <label className="sectionlist-label" htmlFor="">
                    No access to transportation<span>09/03/2020</span>
                  </label>
                </div>
                <div className="list">
                  <label className="sectionlist-label" htmlFor="">
                    No access to internet
                    <span className="noaccess">
                      <svg
                        width="8"
                        height="9"
                        viewBox="0 0 8 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="noaccess-icon"
                      >
                        <circle cx="4" cy="4.5" r="4" fill="#E76262" />
                      </svg>
                      10/02/2020
                    </span>
                  </label>
                </div>
                <div className="list">
                  <label className="sectionlist-label" htmlFor="">
                    No access to transportation<span>07/24/2020</span>
                  </label>
                </div>
                <div className="list">
                  <label className="sectionlist-label" htmlFor="">
                    No access to transportation<span>02/24/2020</span>
                  </label>
                </div>
              </Grid>
            </Grid>
            <div className="done-sections">gap</div>
            {/* Section/Pie-chart and bar-chart */}
            <Grid className="section-chart" xs={12}>
              <AppBar className="folder-tab" position="static">
                <Tabs className="tabs">
                  {/*-- Claims --*/}
                  <Tab className="tab active" label="Claims" />
                  {/* top 5 filled drugs */}
                  <Tab className="tab" label="top 5 filled drugs" />
                  {/* PA */}
                  <Tab className="tab" label="PA" />
                  {/* Grievances */}
                  <Tab className="tab" label="Grievances" />
                  {/* Auths & Overrides */}
                  <Tab className="tab" label="Auths & Overrides" />
                  {/* Communications */}
                  <Tab className="tab" label="Communications" />
                </Tabs>
                {/* Note _ Icon */}
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="note-icon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                    fill="#2055B5"
                  />
                </svg>
              </AppBar>
              <Grid container className="donut-bar-chart">
                <Grid className="chartmini-tab" xs={3}>
                  <AppBar className="mini-tab" position="static">
                    <Tabs className="tabs">
                      <Tab className="tab active" label="Part D" />
                      <Tab className="tab" label="Part B/C" />
                    </Tabs>
                  </AppBar>
                </Grid>
                {/* Chart */}
                <svg
                  width="890"
                  height="317"
                  viewBox="0 0 890 317"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="donut-chart"
                >
                  <path
                    d="M105 19.1146C105 17.4137 103.586 16.0474 101.89 16.1773C82.9081 17.6305 64.9879 25.8189 51.4318 39.3749C36.4289 54.3776 28.0002 74.7258 28 95.9431C27.9998 117.16 36.4281 137.509 51.4308 152.512C66.4336 167.515 86.7817 175.944 107.999 175.944C129.216 175.944 149.565 167.516 164.568 152.513C165.153 151.928 165.728 151.334 166.294 150.733C167.455 149.497 167.283 147.546 165.966 146.476L155.066 137.621C153.821 136.609 152.005 136.762 150.882 137.909C150.731 138.064 150.579 138.218 150.426 138.371C139.173 149.623 123.912 155.944 107.999 155.944C92.0863 155.944 76.8251 149.622 65.5731 138.37C54.3211 127.117 47.9999 111.856 48 95.9433C48.0001 80.0303 54.3217 64.7692 65.5739 53.5171C75.4397 43.6514 88.3874 37.5763 102.154 36.2291C103.745 36.0734 105 34.7637 105 33.1651V19.1146Z"
                    fill="#59B35E"
                    stroke="white"
                  />
                  <path
                    d="M174.076 153.109C175.361 154.153 177.255 153.961 178.257 152.641C188.149 139.622 194.403 124.186 196.349 107.915C198.414 90.651 195.543 73.1551 188.07 57.4555C180.596 41.756 168.826 28.4957 154.124 19.2117C140.268 10.4622 124.342 5.58188 108 5.0489C106.344 4.9949 105 6.34315 105 8L105 32.664C105 34.3209 106.344 35.6564 107.999 35.7374C118.543 36.2535 128.795 39.4839 137.749 45.1385C147.551 51.3278 155.398 60.1681 160.38 70.6344C165.362 81.1008 167.276 92.7647 165.899 104.274C164.642 114.789 160.685 124.782 154.437 133.29C153.456 134.626 153.645 136.511 154.931 137.556L174.076 153.109Z"
                    fill="#F65A1C"
                    stroke="white"
                  />
                  <circle
                    cx="186"
                    cy="53"
                    r="19.5"
                    fill="#F65A1C"
                    stroke="white"
                  />
                  <path
                    d="M180.085 58H173.263V56.6465L176.482 53.2148C176.924 52.7318 177.25 52.3102 177.46 51.9502C177.674 51.5902 177.781 51.2484 177.781 50.9248C177.781 50.4827 177.67 50.1364 177.446 49.8857C177.223 49.6305 176.904 49.5029 176.489 49.5029C176.043 49.5029 175.689 49.6579 175.43 49.9678C175.174 50.2731 175.047 50.6764 175.047 51.1777H173.064C173.064 50.5716 173.208 50.0179 173.495 49.5166C173.787 49.0153 174.197 48.6234 174.726 48.3408C175.254 48.0537 175.854 47.9102 176.523 47.9102C177.549 47.9102 178.344 48.1562 178.909 48.6484C179.479 49.1406 179.764 49.8356 179.764 50.7334C179.764 51.2256 179.636 51.7269 179.381 52.2373C179.126 52.7477 178.688 53.3424 178.068 54.0215L175.806 56.4072H180.085V58ZM186.661 47.9443V49.5713H186.47C185.576 49.585 184.856 49.8174 184.31 50.2686C183.767 50.7197 183.441 51.3464 183.332 52.1484C183.861 51.6107 184.528 51.3418 185.335 51.3418C186.201 51.3418 186.889 51.6517 187.399 52.2715C187.91 52.8913 188.165 53.707 188.165 54.7188C188.165 55.3659 188.024 55.9515 187.741 56.4756C187.463 56.9997 187.067 57.4076 186.552 57.6992C186.041 57.9909 185.463 58.1367 184.815 58.1367C183.767 58.1367 182.92 57.7721 182.272 57.043C181.63 56.3138 181.309 55.3408 181.309 54.124V53.4131C181.309 52.333 181.511 51.3805 181.917 50.5557C182.327 49.7262 182.913 49.0859 183.674 48.6348C184.439 48.179 185.326 47.9489 186.333 47.9443H186.661ZM184.733 52.9277C184.414 52.9277 184.125 53.012 183.865 53.1807C183.605 53.3447 183.414 53.5635 183.291 53.8369V54.4385C183.291 55.0993 183.421 55.6165 183.681 55.9902C183.94 56.3594 184.305 56.5439 184.774 56.5439C185.198 56.5439 185.54 56.3776 185.8 56.0449C186.064 55.7077 186.196 55.2725 186.196 54.7393C186.196 54.1969 186.064 53.7594 185.8 53.4268C185.535 53.0941 185.18 52.9277 184.733 52.9277ZM189.313 49.9609C189.313 49.3503 189.512 48.8558 189.908 48.4775C190.305 48.0947 190.824 47.9033 191.467 47.9033C192.118 47.9033 192.643 48.0924 193.039 48.4707C193.436 48.8444 193.634 49.3525 193.634 49.9951V50.4873C193.634 51.1025 193.436 51.597 193.039 51.9707C192.643 52.3444 192.123 52.5312 191.48 52.5312C190.833 52.5312 190.309 52.3444 189.908 51.9707C189.512 51.5924 189.313 51.0843 189.313 50.4463V49.9609ZM190.626 50.4873C190.626 50.7607 190.703 50.9818 190.858 51.1504C191.018 51.3145 191.225 51.3965 191.48 51.3965C191.736 51.3965 191.938 51.3122 192.089 51.1436C192.239 50.9749 192.314 50.7493 192.314 50.4668V49.9609C192.314 49.6875 192.239 49.4665 192.089 49.2979C191.938 49.1292 191.731 49.0449 191.467 49.0449C191.216 49.0449 191.013 49.1292 190.858 49.2979C190.703 49.4619 190.626 49.6921 190.626 49.9883V50.4873ZM194.071 55.5596C194.071 54.9443 194.272 54.4499 194.673 54.0762C195.074 53.6979 195.593 53.5088 196.231 53.5088C196.879 53.5088 197.4 53.6956 197.797 54.0693C198.198 54.4385 198.398 54.9489 198.398 55.6006V56.0928C198.398 56.7035 198.202 57.1979 197.811 57.5762C197.419 57.9499 196.897 58.1367 196.245 58.1367C195.589 58.1367 195.062 57.9476 194.666 57.5693C194.27 57.1911 194.071 56.6898 194.071 56.0654V55.5596ZM195.384 56.0928C195.384 56.3434 195.466 56.5576 195.63 56.7354C195.794 56.9131 195.999 57.002 196.245 57.002C196.801 57.002 197.079 56.6943 197.079 56.0791V55.5596C197.079 55.2861 197.002 55.0674 196.847 54.9033C196.692 54.7347 196.487 54.6504 196.231 54.6504C195.976 54.6504 195.771 54.7347 195.616 54.9033C195.461 55.0674 195.384 55.293 195.384 55.5801V56.0928ZM191.87 57.2549L190.906 56.7354L195.767 48.9561L196.73 49.4756L191.87 57.2549Z"
                    fill="white"
                  />
                  <circle
                    cx="35"
                    cy="140"
                    r="19.5"
                    fill="#59B35E"
                    stroke="white"
                  />
                  <path
                    d="M31.0303 136.154L27.1816 145H25.0967L28.9521 136.646H24.0029V135.047H31.0303V136.154ZM38.1465 141.254H39.2744V142.847H38.1465V145H36.1709V142.847H32.0898L32.001 141.603L36.1504 135.047H38.1465V141.254ZM33.9697 141.254H36.1709V137.74L36.041 137.966L33.9697 141.254ZM40.3135 136.961C40.3135 136.35 40.5117 135.856 40.9082 135.478C41.3047 135.095 41.8242 134.903 42.4668 134.903C43.1185 134.903 43.6426 135.092 44.0391 135.471C44.4355 135.844 44.6338 136.353 44.6338 136.995V137.487C44.6338 138.103 44.4355 138.597 44.0391 138.971C43.6426 139.344 43.123 139.531 42.4805 139.531C41.8333 139.531 41.3092 139.344 40.9082 138.971C40.5117 138.592 40.3135 138.084 40.3135 137.446V136.961ZM41.626 137.487C41.626 137.761 41.7035 137.982 41.8584 138.15C42.0179 138.314 42.2253 138.396 42.4805 138.396C42.7357 138.396 42.9385 138.312 43.0889 138.144C43.2393 137.975 43.3145 137.749 43.3145 137.467V136.961C43.3145 136.688 43.2393 136.466 43.0889 136.298C42.9385 136.129 42.7311 136.045 42.4668 136.045C42.2161 136.045 42.0133 136.129 41.8584 136.298C41.7035 136.462 41.626 136.692 41.626 136.988V137.487ZM45.0713 142.56C45.0713 141.944 45.2718 141.45 45.6729 141.076C46.0739 140.698 46.5934 140.509 47.2314 140.509C47.8786 140.509 48.4004 140.696 48.7969 141.069C49.1979 141.438 49.3984 141.949 49.3984 142.601V143.093C49.3984 143.703 49.2025 144.198 48.8105 144.576C48.4186 144.95 47.8968 145.137 47.2451 145.137C46.5889 145.137 46.0625 144.948 45.666 144.569C45.2695 144.191 45.0713 143.69 45.0713 143.065V142.56ZM46.3838 143.093C46.3838 143.343 46.4658 143.558 46.6299 143.735C46.7939 143.913 46.999 144.002 47.2451 144.002C47.8011 144.002 48.0791 143.694 48.0791 143.079V142.56C48.0791 142.286 48.0016 142.067 47.8467 141.903C47.6917 141.735 47.4867 141.65 47.2314 141.65C46.9762 141.65 46.7712 141.735 46.6162 141.903C46.4613 142.067 46.3838 142.293 46.3838 142.58V143.093ZM42.8701 144.255L41.9062 143.735L46.7666 135.956L47.7305 136.476L42.8701 144.255Z"
                    fill="white"
                  />
                  <rect
                    x="603.5"
                    y="30.5"
                    width="286"
                    height="90"
                    rx="4.5"
                    fill="#F9F9F9"
                    stroke="#E5E5E5"
                  />
                  <path
                    d="M611.552 12.6602H606.19L604.986 16H603.246L608.133 3.20312H609.609L614.505 16H612.773L611.552 12.6602ZM606.7 11.2715H611.051L608.871 5.28613L606.7 11.2715ZM621.738 15.0596C621.105 15.8037 620.177 16.1758 618.952 16.1758C617.938 16.1758 617.165 15.8828 616.632 15.2969C616.104 14.7051 615.838 13.832 615.832 12.6777V6.49023H617.458V12.6338C617.458 14.0752 618.044 14.7959 619.216 14.7959C620.458 14.7959 621.284 14.333 621.694 13.4072V6.49023H623.32V16H621.773L621.738 15.0596ZM625.412 11.166C625.412 9.68359 625.755 8.50586 626.44 7.63281C627.126 6.75391 628.034 6.31445 629.165 6.31445C630.325 6.31445 631.23 6.72461 631.881 7.54492L631.96 6.49023H633.445V15.7715C633.445 17.002 633.079 17.9717 632.347 18.6807C631.62 19.3896 630.642 19.7441 629.411 19.7441C628.726 19.7441 628.055 19.5977 627.398 19.3047C626.742 19.0117 626.241 18.6104 625.896 18.1006L626.739 17.125C627.437 17.9863 628.289 18.417 629.297 18.417C630.088 18.417 630.703 18.1943 631.143 17.749C631.588 17.3037 631.811 16.6768 631.811 15.8682V15.0508C631.16 15.8008 630.272 16.1758 629.147 16.1758C628.034 16.1758 627.132 15.7275 626.44 14.8311C625.755 13.9346 625.412 12.7129 625.412 11.166ZM627.047 11.3506C627.047 12.4229 627.267 13.2666 627.706 13.8818C628.146 14.4912 628.761 14.7959 629.552 14.7959C630.577 14.7959 631.33 14.3301 631.811 13.3984V9.05664C631.312 8.14844 630.565 7.69434 629.569 7.69434C628.778 7.69434 628.16 8.00195 627.715 8.61719C627.27 9.23242 627.047 10.1436 627.047 11.3506ZM641.777 15.0596C641.145 15.8037 640.216 16.1758 638.991 16.1758C637.978 16.1758 637.204 15.8828 636.671 15.2969C636.144 14.7051 635.877 13.832 635.871 12.6777V6.49023H637.497V12.6338C637.497 14.0752 638.083 14.7959 639.255 14.7959C640.497 14.7959 641.323 14.333 641.733 13.4072V6.49023H643.359V16H641.812L641.777 15.0596ZM651.375 13.4775C651.375 13.0381 651.208 12.6982 650.874 12.458C650.546 12.2119 649.969 12.001 649.143 11.8252C648.322 11.6494 647.669 11.4385 647.183 11.1924C646.702 10.9463 646.345 10.6533 646.11 10.3135C645.882 9.97363 645.768 9.56934 645.768 9.10059C645.768 8.32129 646.096 7.66211 646.752 7.12305C647.414 6.58398 648.258 6.31445 649.283 6.31445C650.361 6.31445 651.234 6.59277 651.902 7.14941C652.576 7.70605 652.913 8.41797 652.913 9.28516H651.278C651.278 8.83984 651.088 8.45605 650.707 8.13379C650.332 7.81152 649.857 7.65039 649.283 7.65039C648.691 7.65039 648.229 7.7793 647.895 8.03711C647.561 8.29492 647.394 8.63184 647.394 9.04785C647.394 9.44043 647.549 9.73633 647.859 9.93555C648.17 10.1348 648.729 10.3252 649.538 10.5068C650.353 10.6885 651.012 10.9053 651.516 11.1572C652.02 11.4092 652.392 11.7139 652.632 12.0713C652.878 12.4229 653.001 12.8535 653.001 13.3633C653.001 14.2129 652.661 14.8955 651.981 15.4111C651.302 15.9209 650.42 16.1758 649.336 16.1758C648.574 16.1758 647.9 16.041 647.314 15.7715C646.729 15.502 646.269 15.127 645.935 14.6465C645.606 14.1602 645.442 13.6357 645.442 13.0732H647.068C647.098 13.6182 647.314 14.0518 647.719 14.374C648.129 14.6904 648.668 14.8486 649.336 14.8486C649.951 14.8486 650.443 14.7256 650.812 14.4795C651.188 14.2275 651.375 13.8936 651.375 13.4775ZM657.325 4.1875V6.49023H659.101V7.74707H657.325V13.6445C657.325 14.0254 657.404 14.3125 657.562 14.5059C657.721 14.6934 657.99 14.7871 658.371 14.7871C658.559 14.7871 658.816 14.752 659.145 14.6816V16C658.717 16.1172 658.301 16.1758 657.896 16.1758C657.17 16.1758 656.622 15.9561 656.253 15.5166C655.884 15.0771 655.699 14.4531 655.699 13.6445V7.74707H653.968V6.49023H655.699V4.1875H657.325ZM673.69 16H665.306V14.8311L669.735 9.90918C670.392 9.16504 670.843 8.56152 671.089 8.09863C671.341 7.62988 671.467 7.14648 671.467 6.64844C671.467 5.98047 671.265 5.43262 670.86 5.00488C670.456 4.57715 669.917 4.36328 669.243 4.36328C668.435 4.36328 667.805 4.59473 667.354 5.05762C666.908 5.51465 666.686 6.15332 666.686 6.97363H665.06C665.06 5.7959 665.438 4.84375 666.193 4.11719C666.955 3.39062 667.972 3.02734 669.243 3.02734C670.433 3.02734 671.373 3.34082 672.064 3.96777C672.756 4.58887 673.102 5.41797 673.102 6.45508C673.102 7.71484 672.299 9.21484 670.693 10.9551L667.266 14.6729H673.69V16ZM683.438 10.542C683.438 12.4463 683.112 13.8613 682.462 14.7871C681.812 15.7129 680.795 16.1758 679.412 16.1758C678.047 16.1758 677.036 15.7246 676.38 14.8223C675.724 13.9141 675.384 12.5605 675.36 10.7617V8.59082C675.36 6.70996 675.686 5.3125 676.336 4.39844C676.986 3.48438 678.006 3.02734 679.395 3.02734C680.771 3.02734 681.785 3.46973 682.436 4.35449C683.086 5.2334 683.42 6.59277 683.438 8.43262V10.542ZM681.812 8.31836C681.812 6.94141 681.618 5.93945 681.231 5.3125C680.845 4.67969 680.232 4.36328 679.395 4.36328C678.562 4.36328 677.956 4.67676 677.575 5.30371C677.194 5.93066 676.998 6.89453 676.986 8.19531V10.7969C676.986 12.1797 677.186 13.2021 677.584 13.8643C677.988 14.5205 678.598 14.8486 679.412 14.8486C680.215 14.8486 680.81 14.5381 681.196 13.917C681.589 13.2959 681.794 12.3174 681.812 10.9814V8.31836ZM693.905 16H685.521V14.8311L689.95 9.90918C690.606 9.16504 691.058 8.56152 691.304 8.09863C691.556 7.62988 691.682 7.14648 691.682 6.64844C691.682 5.98047 691.479 5.43262 691.075 5.00488C690.671 4.57715 690.132 4.36328 689.458 4.36328C688.649 4.36328 688.02 4.59473 687.568 5.05762C687.123 5.51465 686.9 6.15332 686.9 6.97363H685.274C685.274 5.7959 685.652 4.84375 686.408 4.11719C687.17 3.39062 688.187 3.02734 689.458 3.02734C690.647 3.02734 691.588 3.34082 692.279 3.96777C692.971 4.58887 693.316 5.41797 693.316 6.45508C693.316 7.71484 692.514 9.21484 690.908 10.9551L687.48 14.6729H693.905V16ZM703.652 10.542C703.652 12.4463 703.327 13.8613 702.677 14.7871C702.026 15.7129 701.01 16.1758 699.627 16.1758C698.262 16.1758 697.251 15.7246 696.595 14.8223C695.938 13.9141 695.599 12.5605 695.575 10.7617V8.59082C695.575 6.70996 695.9 5.3125 696.551 4.39844C697.201 3.48438 698.221 3.02734 699.609 3.02734C700.986 3.02734 702 3.46973 702.65 4.35449C703.301 5.2334 703.635 6.59277 703.652 8.43262V10.542ZM702.026 8.31836C702.026 6.94141 701.833 5.93945 701.446 5.3125C701.06 4.67969 700.447 4.36328 699.609 4.36328C698.777 4.36328 698.171 4.67676 697.79 5.30371C697.409 5.93066 697.213 6.89453 697.201 8.19531V10.7969C697.201 12.1797 697.4 13.2021 697.799 13.8643C698.203 14.5205 698.812 14.8486 699.627 14.8486C700.43 14.8486 701.024 14.5381 701.411 13.917C701.804 13.2959 702.009 12.3174 702.026 10.9814V8.31836Z"
                    fill="#666666"
                  />
                  <path
                    d="M627.115 56.6602V60H625.99V51.4688H629.137C630.07 51.4688 630.801 51.707 631.328 52.1836C631.859 52.6602 632.125 53.291 632.125 54.0762C632.125 54.9043 631.865 55.543 631.346 55.9922C630.83 56.4375 630.09 56.6602 629.125 56.6602H627.115ZM627.115 55.7402H629.137C629.738 55.7402 630.199 55.5996 630.52 55.3184C630.84 55.0332 631 54.623 631 54.0879C631 53.5801 630.84 53.1738 630.52 52.8691C630.199 52.5645 629.76 52.4062 629.201 52.3945H627.115V55.7402ZM637.463 57.7734H633.889L633.086 60H631.926L635.184 51.4688H636.168L639.432 60H638.277L637.463 57.7734ZM634.229 56.8477H637.129L635.676 52.8574L634.229 56.8477ZM641.787 60H640.662V51.4688H641.787V60ZM643.85 60V51.4688H646.258C647 51.4688 647.656 51.6328 648.227 51.9609C648.797 52.2891 649.236 52.7559 649.545 53.3613C649.857 53.9668 650.016 54.6621 650.02 55.4473V55.9922C650.02 56.7969 649.863 57.502 649.551 58.1074C649.242 58.7129 648.799 59.1777 648.221 59.502C647.646 59.8262 646.977 59.9922 646.211 60H643.85ZM644.975 52.3945V59.0801H646.158C647.025 59.0801 647.699 58.8105 648.18 58.2715C648.664 57.7324 648.906 56.9648 648.906 55.9688V55.4707C648.906 54.502 648.678 53.75 648.221 53.2148C647.768 52.6758 647.123 52.4023 646.287 52.3945H644.975Z"
                    fill="#666666"
                  />
                  <path
                    d="M724.119 56.5488H722.115V60H720.984V51.4688H723.809C724.77 51.4688 725.508 51.6875 726.023 52.125C726.543 52.5625 726.803 53.1992 726.803 54.0352C726.803 54.5664 726.658 55.0293 726.369 55.4238C726.084 55.8184 725.686 56.1133 725.174 56.3086L727.178 59.9297V60H725.971L724.119 56.5488ZM722.115 55.6289H723.844C724.402 55.6289 724.846 55.4844 725.174 55.1953C725.506 54.9062 725.672 54.5195 725.672 54.0352C725.672 53.5078 725.514 53.1035 725.197 52.8223C724.885 52.541 724.432 52.3984 723.838 52.3945H722.115V55.6289ZM733.207 56.0566H729.51V59.0801H733.805V60H728.385V51.4688H733.746V52.3945H729.51V55.1367H733.207V56.0566ZM738.779 51.4688H739.91V57.5098C739.91 58.3262 739.664 58.9648 739.172 59.4258C738.684 59.8867 738.031 60.1172 737.215 60.1172C736.367 60.1172 735.707 59.9004 735.234 59.4668C734.762 59.0332 734.525 58.4258 734.525 57.6445H735.65C735.65 58.1328 735.783 58.5137 736.049 58.7871C736.318 59.0605 736.707 59.1973 737.215 59.1973C737.68 59.1973 738.055 59.0508 738.34 58.7578C738.629 58.4648 738.775 58.0547 738.779 57.5273V51.4688ZM746.648 56.0566H742.951V59.0801H747.246V60H741.826V51.4688H747.188V52.3945H742.951V55.1367H746.648V56.0566ZM754.922 57.293C754.816 58.1953 754.482 58.8926 753.92 59.3848C753.361 59.873 752.617 60.1172 751.688 60.1172C750.68 60.1172 749.871 59.7559 749.262 59.0332C748.656 58.3105 748.354 57.3438 748.354 56.1328V55.3125C748.354 54.5195 748.494 53.8223 748.775 53.2207C749.061 52.6191 749.463 52.1582 749.982 51.8379C750.502 51.5137 751.104 51.3516 751.787 51.3516C752.693 51.3516 753.42 51.6055 753.967 52.1133C754.514 52.6172 754.832 53.3164 754.922 54.2109H753.791C753.693 53.5312 753.48 53.0391 753.152 52.7344C752.828 52.4297 752.373 52.2773 751.787 52.2773C751.068 52.2773 750.504 52.543 750.094 53.0742C749.688 53.6055 749.484 54.3613 749.484 55.3418V56.168C749.484 57.0938 749.678 57.8301 750.064 58.377C750.451 58.9238 750.992 59.1973 751.688 59.1973C752.312 59.1973 752.791 59.0566 753.123 58.7754C753.459 58.4902 753.682 57.9961 753.791 57.293H754.922ZM762.182 52.3945H759.439V60H758.32V52.3945H755.584V51.4688H762.182V52.3945ZM768.27 56.0566H764.572V59.0801H768.867V60H763.447V51.4688H768.809V52.3945H764.572V55.1367H768.27V56.0566ZM770.268 60V51.4688H772.676C773.418 51.4688 774.074 51.6328 774.645 51.9609C775.215 52.2891 775.654 52.7559 775.963 53.3613C776.275 53.9668 776.434 54.6621 776.438 55.4473V55.9922C776.438 56.7969 776.281 57.502 775.969 58.1074C775.66 58.7129 775.217 59.1777 774.639 59.502C774.064 59.8262 773.395 59.9922 772.629 60H770.268ZM771.393 52.3945V59.0801H772.576C773.443 59.0801 774.117 58.8105 774.598 58.2715C775.082 57.7324 775.324 56.9648 775.324 55.9688V55.4707C775.324 54.502 775.096 53.75 774.639 53.2148C774.186 52.6758 773.541 52.4023 772.705 52.3945H771.393Z"
                    fill="#666666"
                  />
                  <path
                    d="M822.885 52.3945H820.143V60H819.023V52.3945H816.287V51.4688H822.885V52.3945ZM830.549 56.0098C830.549 56.8457 830.408 57.5762 830.127 58.2012C829.846 58.8223 829.447 59.2969 828.932 59.625C828.416 59.9531 827.814 60.1172 827.127 60.1172C826.455 60.1172 825.859 59.9531 825.34 59.625C824.82 59.293 824.416 58.8223 824.127 58.2129C823.842 57.5996 823.695 56.8906 823.688 56.0859V55.4707C823.688 54.6504 823.83 53.9258 824.115 53.2969C824.4 52.668 824.803 52.1875 825.322 51.8555C825.846 51.5195 826.443 51.3516 827.115 51.3516C827.799 51.3516 828.4 51.5176 828.92 51.8496C829.443 52.1777 829.846 52.6562 830.127 53.2852C830.408 53.9102 830.549 54.6387 830.549 55.4707V56.0098ZM829.43 55.459C829.43 54.4473 829.227 53.6719 828.82 53.1328C828.414 52.5898 827.846 52.3184 827.115 52.3184C826.404 52.3184 825.844 52.5898 825.434 53.1328C825.027 53.6719 824.818 54.4219 824.807 55.3828V56.0098C824.807 56.9902 825.012 57.7617 825.422 58.3242C825.836 58.8828 826.404 59.1621 827.127 59.1621C827.854 59.1621 828.416 58.8984 828.814 58.3711C829.213 57.8398 829.418 57.0801 829.43 56.0918V55.459ZM837.967 52.3945H835.225V60H834.105V52.3945H831.369V51.4688H837.967V52.3945ZM843.475 57.7734H839.9L839.098 60H837.938L841.195 51.4688H842.18L845.443 60H844.289L843.475 57.7734ZM840.24 56.8477H843.141L841.688 52.8574L840.24 56.8477ZM847.723 59.0801H851.766V60H846.592V51.4688H847.723V59.0801Z"
                    fill="#666666"
                  />
                  <path
                    d="M643.896 98H627.127V95.6621L635.986 85.8184C637.299 84.3301 638.201 83.123 638.693 82.1973C639.197 81.2598 639.449 80.293 639.449 79.2969C639.449 77.9609 639.045 76.8652 638.236 76.0098C637.428 75.1543 636.35 74.7266 635.002 74.7266C633.385 74.7266 632.125 75.1895 631.223 76.1152C630.332 77.0293 629.887 78.3066 629.887 79.9473H626.635C626.635 77.5918 627.391 75.6875 628.902 74.2344C630.426 72.7812 632.459 72.0547 635.002 72.0547C637.381 72.0547 639.262 72.6816 640.645 73.9355C642.027 75.1777 642.719 76.8359 642.719 78.9102C642.719 81.4297 641.113 84.4297 637.902 87.9102L631.047 95.3457H643.896V98ZM663.391 87.084C663.391 90.8926 662.74 93.7227 661.439 95.5742C660.139 97.4258 658.105 98.3516 655.34 98.3516C652.609 98.3516 650.588 97.4492 649.275 95.6445C647.963 93.8281 647.283 91.1211 647.236 87.5234V83.1816C647.236 79.4199 647.887 76.625 649.188 74.7969C650.488 72.9688 652.527 72.0547 655.305 72.0547C658.059 72.0547 660.086 72.9395 661.387 74.709C662.688 76.4668 663.355 79.1855 663.391 82.8652V87.084ZM660.139 82.6367C660.139 79.8828 659.752 77.8789 658.979 76.625C658.205 75.3594 656.98 74.7266 655.305 74.7266C653.641 74.7266 652.428 75.3535 651.666 76.6074C650.904 77.8613 650.512 79.7891 650.488 82.3906V87.5938C650.488 90.3594 650.887 92.4043 651.684 93.7285C652.492 95.041 653.711 95.6973 655.34 95.6973C656.945 95.6973 658.135 95.0762 658.908 93.834C659.693 92.5918 660.104 90.6348 660.139 87.9629V82.6367Z"
                    fill="#59B35E"
                  />
                  <path
                    d="M734.889 72.3887V75.1484H734.291C731.76 75.1953 729.744 75.9453 728.244 77.3984C726.744 78.8516 725.877 80.8965 725.643 83.5332C726.99 81.9863 728.83 81.2129 731.162 81.2129C733.389 81.2129 735.164 81.998 736.488 83.5684C737.824 85.1387 738.492 87.166 738.492 89.6504C738.492 92.2871 737.771 94.3965 736.33 95.9785C734.9 97.5605 732.979 98.3516 730.564 98.3516C728.115 98.3516 726.129 97.4141 724.605 95.5391C723.082 93.6523 722.32 91.2266 722.32 88.2617V87.0137C722.32 82.3027 723.322 78.7051 725.326 76.2207C727.342 73.7246 730.336 72.4473 734.309 72.3887H734.889ZM730.617 83.9199C729.504 83.9199 728.479 84.2539 727.541 84.9219C726.604 85.5898 725.953 86.4277 725.59 87.4355V88.6309C725.59 90.7402 726.064 92.4395 727.014 93.7285C727.963 95.0176 729.146 95.6621 730.564 95.6621C732.029 95.6621 733.178 95.123 734.01 94.0449C734.854 92.9668 735.275 91.5547 735.275 89.8086C735.275 88.0508 734.848 86.6328 733.992 85.5547C733.148 84.4648 732.023 83.9199 730.617 83.9199Z"
                    fill="#F65A1C"
                  />
                  <path
                    d="M834.896 98H818.127V95.6621L826.986 85.8184C828.299 84.3301 829.201 83.123 829.693 82.1973C830.197 81.2598 830.449 80.293 830.449 79.2969C830.449 77.9609 830.045 76.8652 829.236 76.0098C828.428 75.1543 827.35 74.7266 826.002 74.7266C824.385 74.7266 823.125 75.1895 822.223 76.1152C821.332 77.0293 820.887 78.3066 820.887 79.9473H817.635C817.635 77.5918 818.391 75.6875 819.902 74.2344C821.426 72.7812 823.459 72.0547 826.002 72.0547C828.381 72.0547 830.262 72.6816 831.645 73.9355C833.027 75.1777 833.719 76.8359 833.719 78.9102C833.719 81.4297 832.113 84.4297 828.902 87.9102L822.047 95.3457H834.896V98ZM851.104 72.3887V75.1484H850.506C847.975 75.1953 845.959 75.9453 844.459 77.3984C842.959 78.8516 842.092 80.8965 841.857 83.5332C843.205 81.9863 845.045 81.2129 847.377 81.2129C849.604 81.2129 851.379 81.998 852.703 83.5684C854.039 85.1387 854.707 87.166 854.707 89.6504C854.707 92.2871 853.986 94.3965 852.545 95.9785C851.115 97.5605 849.193 98.3516 846.779 98.3516C844.33 98.3516 842.344 97.4141 840.82 95.5391C839.297 93.6523 838.535 91.2266 838.535 88.2617V87.0137C838.535 82.3027 839.537 78.7051 841.541 76.2207C843.557 73.7246 846.551 72.4473 850.523 72.3887H851.104ZM846.832 83.9199C845.719 83.9199 844.693 84.2539 843.756 84.9219C842.818 85.5898 842.168 86.4277 841.805 87.4355V88.6309C841.805 90.7402 842.279 92.4395 843.229 93.7285C844.178 95.0176 845.361 95.6621 846.779 95.6621C848.244 95.6621 849.393 95.123 850.225 94.0449C851.068 92.9668 851.49 91.5547 851.49 89.8086C851.49 88.0508 851.062 86.6328 850.207 85.5547C849.363 84.4648 848.238 83.9199 846.832 83.9199Z"
                    fill="#2055B5"
                  />
                  <rect x="700" y="51" width="1" height="50" fill="#E5E5E5" />
                  <rect x="794" y="51" width="1" height="50" fill="#E5E5E5" />
                  <line
                    x1="817"
                    y1="101.5"
                    x2="857"
                    y2="101.5"
                    stroke="#2055B5"
                    stroke-dasharray="1 1"
                  />
                  <line
                    x1="626"
                    y1="101.5"
                    x2="666"
                    y2="101.5"
                    stroke="#59B35E"
                    stroke-dasharray="1 1"
                  />
                  <line
                    x1="721"
                    y1="101.5"
                    x2="740"
                    y2="101.5"
                    stroke="#F65A1C"
                    stroke-dasharray="1 1"
                  />
                  <rect
                    opacity="0.5"
                    x="26"
                    y="254"
                    width="5"
                    height="29"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="101"
                    y="241"
                    width="5"
                    height="42"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="176"
                    y="231"
                    width="5"
                    height="52"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="251"
                    y="254"
                    width="5"
                    height="29"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="326"
                    y="247"
                    width="5"
                    height="36"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="401"
                    y="241"
                    width="5"
                    height="42"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="477"
                    y="218"
                    width="5"
                    height="65"
                    rx="2.5"
                    fill="#008A07"
                    fill-opacity="0.25"
                  />
                  <rect
                    opacity="0.5"
                    x="559"
                    y="253"
                    width="5"
                    height="30"
                    rx="2.5"
                    fill="#008A07"
                  />
                  <rect
                    opacity="0.25"
                    x="33"
                    y="214"
                    width="5"
                    height="69"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    opacity="0.25"
                    x="108"
                    y="214"
                    width="5"
                    height="69"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    opacity="0.25"
                    x="183"
                    y="238"
                    width="5"
                    height="45"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    opacity="0.25"
                    x="258"
                    y="225"
                    width="5"
                    height="58"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    opacity="0.25"
                    x="333"
                    y="258"
                    width="5"
                    height="25"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    opacity="0.25"
                    x="408"
                    y="251"
                    width="5"
                    height="32"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    opacity="0.25"
                    x="484"
                    y="270"
                    width="5"
                    height="13"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    x="552"
                    y="193"
                    width="5"
                    height="90"
                    rx="2.5"
                    fill="#F65A1C"
                  />
                  <rect
                    x="0.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="75.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="150.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="225.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="300.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="375.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="450.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="525"
                    y="293"
                    width="65"
                    height="24"
                    rx="12"
                    fill="#2055B5"
                  />
                  <rect
                    x="600.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="675.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="750.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="825.5"
                    y="293.5"
                    width="64"
                    height="23"
                    rx="11.5"
                    stroke="#E5E5E5"
                  />
                  <path
                    d="M24.6406 300.469H26.3984V306.375C26.3984 306.918 26.2773 307.398 26.0352 307.816C25.7969 308.23 25.459 308.551 25.0215 308.777C24.584 309.004 24.0898 309.117 23.5391 309.117C22.6367 309.117 21.9336 308.889 21.4297 308.432C20.9258 307.971 20.6738 307.32 20.6738 306.48H22.4434C22.4434 306.898 22.5312 307.207 22.707 307.406C22.8828 307.605 23.1602 307.705 23.5391 307.705C23.875 307.705 24.1426 307.59 24.3418 307.359C24.541 307.129 24.6406 306.801 24.6406 306.375V300.469ZM33.0918 307.242H30.0098L29.4238 309H27.5547L30.7305 300.469H32.3594L35.5527 309H33.6836L33.0918 307.242ZM30.4844 305.818H32.6172L31.5449 302.625L30.4844 305.818ZM43.7871 309H42.0293L38.6074 303.387V309H36.8496V300.469H38.6074L42.0352 306.094V300.469H43.7871V309Z"
                    fill="#999999"
                  />
                  <path
                    d="M102.4 305.514H99.0254V309H97.2676V300.469H102.822V301.893H99.0254V304.096H102.4V305.514ZM109.475 305.303H106.1V307.588H110.061V309H104.342V300.469H110.049V301.893H106.1V303.926H109.475V305.303ZM111.592 309V300.469H114.58C115.615 300.469 116.4 300.668 116.936 301.066C117.471 301.461 117.738 302.041 117.738 302.807C117.738 303.225 117.631 303.594 117.416 303.914C117.201 304.23 116.902 304.463 116.52 304.611C116.957 304.721 117.301 304.941 117.551 305.273C117.805 305.605 117.932 306.012 117.932 306.492C117.932 307.312 117.67 307.934 117.146 308.355C116.623 308.777 115.877 308.992 114.908 309H111.592ZM113.35 305.285V307.588H114.855C115.27 307.588 115.592 307.49 115.822 307.295C116.057 307.096 116.174 306.822 116.174 306.475C116.174 305.693 115.77 305.297 114.961 305.285H113.35ZM113.35 304.043H114.65C115.537 304.027 115.98 303.674 115.98 302.982C115.98 302.596 115.867 302.318 115.641 302.15C115.418 301.979 115.064 301.893 114.58 301.893H113.35V304.043Z"
                    fill="#999999"
                  />
                  <path
                    d="M171.881 300.469L174.072 306.656L176.252 300.469H178.561V309H176.797V306.668L176.973 302.643L174.67 309H173.463L171.166 302.648L171.342 306.668V309H169.584V300.469H171.881ZM185.518 307.242H182.436L181.85 309H179.98L183.156 300.469H184.785L187.979 309H186.109L185.518 307.242ZM182.91 305.818H185.043L183.971 302.625L182.91 305.818ZM192.434 305.877H191.033V309H189.275V300.469H192.445C193.453 300.469 194.23 300.693 194.777 301.143C195.324 301.592 195.598 302.227 195.598 303.047C195.598 303.629 195.471 304.115 195.217 304.506C194.967 304.893 194.586 305.201 194.074 305.432L195.92 308.918V309H194.033L192.434 305.877ZM191.033 304.453H192.451C192.893 304.453 193.234 304.342 193.477 304.119C193.719 303.893 193.84 303.582 193.84 303.188C193.84 302.785 193.725 302.469 193.494 302.238C193.268 302.008 192.918 301.893 192.445 301.893H191.033V304.453Z"
                    fill="#999999"
                  />
                  <path
                    d="M250.836 307.242H247.754L247.168 309H245.299L248.475 300.469H250.104L253.297 309H251.428L250.836 307.242ZM248.229 305.818H250.361L249.289 302.625L248.229 305.818ZM256.352 305.994V309H254.594V300.469H257.922C258.562 300.469 259.125 300.586 259.609 300.82C260.098 301.055 260.473 301.389 260.734 301.822C260.996 302.252 261.127 302.742 261.127 303.293C261.127 304.129 260.84 304.789 260.266 305.273C259.695 305.754 258.904 305.994 257.893 305.994H256.352ZM256.352 304.57H257.922C258.387 304.57 258.74 304.461 258.982 304.242C259.229 304.023 259.352 303.711 259.352 303.305C259.352 302.887 259.229 302.549 258.982 302.291C258.736 302.033 258.396 301.9 257.963 301.893H256.352V304.57ZM265.998 305.877H264.598V309H262.84V300.469H266.01C267.018 300.469 267.795 300.693 268.342 301.143C268.889 301.592 269.162 302.227 269.162 303.047C269.162 303.629 269.035 304.115 268.781 304.506C268.531 304.893 268.15 305.201 267.639 305.432L269.484 308.918V309H267.598L265.998 305.877ZM264.598 304.453H266.016C266.457 304.453 266.799 304.342 267.041 304.119C267.283 303.893 267.404 303.582 267.404 303.188C267.404 302.785 267.289 302.469 267.059 302.238C266.832 302.008 266.482 301.893 266.01 301.893H264.598V304.453Z"
                    fill="#999999"
                  />
                  <path
                    d="M322.443 300.469L324.635 306.656L326.814 300.469H329.123V309H327.359V306.668L327.535 302.643L325.232 309H324.025L321.729 302.648L321.904 306.668V309H320.146V300.469H322.443ZM336.08 307.242H332.998L332.412 309H330.543L333.719 300.469H335.348L338.541 309H336.672L336.08 307.242ZM333.473 305.818H335.605L334.533 302.625L333.473 305.818ZM341.9 304.312L343.676 300.469H345.598L342.797 305.906V309H341.01V305.906L338.209 300.469H340.137L341.9 304.312Z"
                    fill="#999999"
                  />
                  <path
                    d="M399.664 300.469H401.422V306.375C401.422 306.918 401.301 307.398 401.059 307.816C400.82 308.23 400.482 308.551 400.045 308.777C399.607 309.004 399.113 309.117 398.562 309.117C397.66 309.117 396.957 308.889 396.453 308.432C395.949 307.971 395.697 307.32 395.697 306.48H397.467C397.467 306.898 397.555 307.207 397.73 307.406C397.906 307.605 398.184 307.705 398.562 307.705C398.898 307.705 399.166 307.59 399.365 307.359C399.564 307.129 399.664 306.801 399.664 306.375V300.469ZM409.885 300.469V306.088C409.885 307.021 409.592 307.76 409.006 308.303C408.424 308.846 407.627 309.117 406.615 309.117C405.619 309.117 404.828 308.854 404.242 308.326C403.656 307.799 403.357 307.074 403.346 306.152V300.469H405.104V306.1C405.104 306.658 405.236 307.066 405.502 307.324C405.771 307.578 406.143 307.705 406.615 307.705C407.604 307.705 408.105 307.186 408.121 306.146V300.469H409.885ZM418.764 309H417.006L413.584 303.387V309H411.826V300.469H413.584L417.012 306.094V300.469H418.764V309Z"
                    fill="#999999"
                  />
                  <path
                    d="M475.648 300.469H477.406V306.375C477.406 306.918 477.285 307.398 477.043 307.816C476.805 308.23 476.467 308.551 476.029 308.777C475.592 309.004 475.098 309.117 474.547 309.117C473.645 309.117 472.941 308.889 472.438 308.432C471.934 307.971 471.682 307.32 471.682 306.48H473.451C473.451 306.898 473.539 307.207 473.715 307.406C473.891 307.605 474.168 307.705 474.547 307.705C474.883 307.705 475.15 307.59 475.35 307.359C475.549 307.129 475.648 306.801 475.648 306.375V300.469ZM485.869 300.469V306.088C485.869 307.021 485.576 307.76 484.99 308.303C484.408 308.846 483.611 309.117 482.6 309.117C481.604 309.117 480.812 308.854 480.227 308.326C479.641 307.799 479.342 307.074 479.33 306.152V300.469H481.088V306.1C481.088 306.658 481.221 307.066 481.486 307.324C481.756 307.578 482.127 307.705 482.6 307.705C483.588 307.705 484.09 307.186 484.105 306.146V300.469H485.869ZM489.568 307.588H493.301V309H487.811V300.469H489.568V307.588Z"
                    fill="#999999"
                  />
                  <path
                    d="M550.555 307.242H547.473L546.887 309H545.018L548.193 300.469H549.822L553.016 309H551.146L550.555 307.242ZM547.947 305.818H550.08L549.008 302.625L547.947 305.818ZM560.664 300.469V306.088C560.664 307.021 560.371 307.76 559.785 308.303C559.203 308.846 558.406 309.117 557.395 309.117C556.398 309.117 555.607 308.854 555.021 308.326C554.436 307.799 554.137 307.074 554.125 306.152V300.469H555.883V306.1C555.883 306.658 556.016 307.066 556.281 307.324C556.551 307.578 556.922 307.705 557.395 307.705C558.383 307.705 558.885 307.186 558.9 306.146V300.469H560.664ZM569.355 307.922C569.039 308.301 568.592 308.596 568.014 308.807C567.436 309.014 566.795 309.117 566.092 309.117C565.354 309.117 564.705 308.957 564.146 308.637C563.592 308.312 563.162 307.844 562.857 307.23C562.557 306.617 562.402 305.896 562.395 305.068V304.488C562.395 303.637 562.537 302.9 562.822 302.279C563.111 301.654 563.525 301.178 564.064 300.85C564.607 300.518 565.242 300.352 565.969 300.352C566.98 300.352 567.771 300.594 568.342 301.078C568.912 301.559 569.25 302.26 569.355 303.182H567.645C567.566 302.693 567.393 302.336 567.123 302.109C566.857 301.883 566.49 301.77 566.021 301.77C565.424 301.77 564.969 301.994 564.656 302.443C564.344 302.893 564.186 303.561 564.182 304.447V304.992C564.182 305.887 564.352 306.562 564.691 307.02C565.031 307.477 565.529 307.705 566.186 307.705C566.846 307.705 567.316 307.564 567.598 307.283V305.812H565.998V304.518H569.355V307.922Z"
                    fill="white"
                  />
                  <path
                    d="M626.246 306.762C626.246 306.43 626.129 306.176 625.895 306C625.66 305.82 625.238 305.633 624.629 305.438C624.02 305.238 623.537 305.043 623.182 304.852C622.213 304.328 621.729 303.623 621.729 302.736C621.729 302.275 621.857 301.865 622.115 301.506C622.377 301.143 622.75 300.859 623.234 300.656C623.723 300.453 624.27 300.352 624.875 300.352C625.484 300.352 626.027 300.463 626.504 300.686C626.98 300.904 627.35 301.215 627.611 301.617C627.877 302.02 628.01 302.477 628.01 302.988H626.252C626.252 302.598 626.129 302.295 625.883 302.08C625.637 301.861 625.291 301.752 624.846 301.752C624.416 301.752 624.082 301.844 623.844 302.027C623.605 302.207 623.486 302.445 623.486 302.742C623.486 303.02 623.625 303.252 623.902 303.439C624.184 303.627 624.596 303.803 625.139 303.967C626.139 304.268 626.867 304.641 627.324 305.086C627.781 305.531 628.01 306.086 628.01 306.75C628.01 307.488 627.73 308.068 627.172 308.49C626.613 308.908 625.861 309.117 624.916 309.117C624.26 309.117 623.662 308.998 623.123 308.76C622.584 308.518 622.172 308.188 621.887 307.77C621.605 307.352 621.465 306.867 621.465 306.316H623.229C623.229 307.258 623.791 307.729 624.916 307.729C625.334 307.729 625.66 307.645 625.895 307.477C626.129 307.305 626.246 307.066 626.246 306.762ZM634.838 305.303H631.463V307.588H635.424V309H629.705V300.469H635.412V301.893H631.463V303.926H634.838V305.303ZM638.713 305.994V309H636.955V300.469H640.283C640.924 300.469 641.486 300.586 641.971 300.82C642.459 301.055 642.834 301.389 643.096 301.822C643.357 302.252 643.488 302.742 643.488 303.293C643.488 304.129 643.201 304.789 642.627 305.273C642.057 305.754 641.266 305.994 640.254 305.994H638.713ZM638.713 304.57H640.283C640.748 304.57 641.102 304.461 641.344 304.242C641.59 304.023 641.713 303.711 641.713 303.305C641.713 302.887 641.59 302.549 641.344 302.291C641.098 302.033 640.758 301.9 640.324 301.893H638.713V304.57Z"
                    fill="#999999"
                  />
                  <path
                    d="M703.074 304.928C703.074 305.768 702.926 306.504 702.629 307.137C702.332 307.77 701.906 308.258 701.352 308.602C700.801 308.945 700.168 309.117 699.453 309.117C698.746 309.117 698.115 308.947 697.561 308.607C697.006 308.268 696.576 307.783 696.271 307.154C695.967 306.521 695.812 305.795 695.809 304.975V304.553C695.809 303.713 695.959 302.975 696.26 302.338C696.564 301.697 696.992 301.207 697.543 300.867C698.098 300.523 698.73 300.352 699.441 300.352C700.152 300.352 700.783 300.523 701.334 300.867C701.889 301.207 702.316 301.697 702.617 302.338C702.922 302.975 703.074 303.711 703.074 304.547V304.928ZM701.293 304.541C701.293 303.646 701.133 302.967 700.812 302.502C700.492 302.037 700.035 301.805 699.441 301.805C698.852 301.805 698.396 302.035 698.076 302.496C697.756 302.953 697.594 303.625 697.59 304.512V304.928C697.59 305.799 697.75 306.475 698.07 306.955C698.391 307.436 698.852 307.676 699.453 307.676C700.043 307.676 700.496 307.445 700.812 306.984C701.129 306.52 701.289 305.844 701.293 304.957V304.541ZM711.549 306.158C711.482 307.076 711.143 307.799 710.529 308.326C709.92 308.854 709.115 309.117 708.115 309.117C707.021 309.117 706.16 308.75 705.531 308.016C704.906 307.277 704.594 306.266 704.594 304.98V304.459C704.594 303.639 704.738 302.916 705.027 302.291C705.316 301.666 705.729 301.188 706.264 300.855C706.803 300.52 707.428 300.352 708.139 300.352C709.123 300.352 709.916 300.615 710.518 301.143C711.119 301.67 711.467 302.41 711.561 303.363H709.803C709.76 302.812 709.605 302.414 709.34 302.168C709.078 301.918 708.678 301.793 708.139 301.793C707.553 301.793 707.113 302.004 706.82 302.426C706.531 302.844 706.383 303.494 706.375 304.377V305.021C706.375 305.943 706.514 306.617 706.791 307.043C707.072 307.469 707.514 307.682 708.115 307.682C708.658 307.682 709.062 307.559 709.328 307.312C709.598 307.062 709.752 306.678 709.791 306.158H711.549ZM719.449 301.893H716.836V309H715.078V301.893H712.5V300.469H719.449V301.893Z"
                    fill="#999999"
                  />
                  <path
                    d="M777.459 309H775.701L772.279 303.387V309H770.521V300.469H772.279L775.707 306.094V300.469H777.459V309ZM786.502 304.928C786.502 305.768 786.354 306.504 786.057 307.137C785.76 307.77 785.334 308.258 784.779 308.602C784.229 308.945 783.596 309.117 782.881 309.117C782.174 309.117 781.543 308.947 780.988 308.607C780.434 308.268 780.004 307.783 779.699 307.154C779.395 306.521 779.24 305.795 779.236 304.975V304.553C779.236 303.713 779.387 302.975 779.688 302.338C779.992 301.697 780.42 301.207 780.971 300.867C781.525 300.523 782.158 300.352 782.869 300.352C783.58 300.352 784.211 300.523 784.762 300.867C785.316 301.207 785.744 301.697 786.045 302.338C786.35 302.975 786.502 303.711 786.502 304.547V304.928ZM784.721 304.541C784.721 303.646 784.561 302.967 784.24 302.502C783.92 302.037 783.463 301.805 782.869 301.805C782.279 301.805 781.824 302.035 781.504 302.496C781.184 302.953 781.021 303.625 781.018 304.512V304.928C781.018 305.799 781.178 306.475 781.498 306.955C781.818 307.436 782.279 307.676 782.881 307.676C783.471 307.676 783.924 307.445 784.24 306.984C784.557 306.52 784.717 305.844 784.721 304.957V304.541ZM791.303 306.885L793.236 300.469H795.193L792.223 309H790.389L787.43 300.469H789.381L791.303 306.885Z"
                    fill="#999999"
                  />
                  <path
                    d="M846.559 309V300.469H849.184C849.934 300.469 850.604 300.639 851.193 300.979C851.787 301.314 852.25 301.795 852.582 302.42C852.914 303.041 853.08 303.748 853.08 304.541V304.934C853.08 305.727 852.916 306.432 852.588 307.049C852.264 307.666 851.805 308.145 851.211 308.484C850.617 308.824 849.947 308.996 849.201 309H846.559ZM848.316 301.893V307.588H849.166C849.854 307.588 850.379 307.363 850.742 306.914C851.105 306.465 851.291 305.822 851.299 304.986V304.535C851.299 303.668 851.119 303.012 850.76 302.566C850.4 302.117 849.875 301.893 849.184 301.893H848.316ZM859.996 305.303H856.621V307.588H860.582V309H854.863V300.469H860.57V301.893H856.621V303.926H859.996V305.303ZM868.811 306.158C868.744 307.076 868.404 307.799 867.791 308.326C867.182 308.854 866.377 309.117 865.377 309.117C864.283 309.117 863.422 308.75 862.793 308.016C862.168 307.277 861.855 306.266 861.855 304.98V304.459C861.855 303.639 862 302.916 862.289 302.291C862.578 301.666 862.99 301.188 863.525 300.855C864.064 300.52 864.689 300.352 865.4 300.352C866.385 300.352 867.178 300.615 867.779 301.143C868.381 301.67 868.729 302.41 868.822 303.363H867.064C867.021 302.812 866.867 302.414 866.602 302.168C866.34 301.918 865.939 301.793 865.4 301.793C864.814 301.793 864.375 302.004 864.082 302.426C863.793 302.844 863.645 303.494 863.637 304.377V305.021C863.637 305.943 863.775 306.617 864.053 307.043C864.334 307.469 864.775 307.682 865.377 307.682C865.92 307.682 866.324 307.559 866.59 307.312C866.859 307.062 867.014 306.678 867.053 306.158H868.811Z"
                    fill="#999999"
                  />
                </svg>
                {/* Chart */}
              </Grid>
              <div className="done-sections">have to bottom border for tab</div>
              {/* Section/Claim Form */}
              <Grid className="seaction-claimform" xs={12}>
                <div className="claimform-header">
                  <h4 className="section-heading">Claims</h4>
                  <Button className="newtestclaim-btn">
                    + Start New Test Claim
                  </Button>
                </div>
                <form className="claim-inputfields">
                  <div className="input-fields">
                    <div className="input-row-1">
                      <input type="text" placeholder="Claim ID" />
                      <FormControl className="claim-select" variant="outlined">
                        <Select
                          IconComponent={() => (
                            <svg
                              width="6"
                              height="3"
                              viewBox="0 0 6 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="claim-select-suffix"
                            >
                              <path
                                d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                                fill="#999999"
                              />
                            </svg>
                          )}
                          value={0}
                        >
                          <MenuItem value={0}>Select Status</MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <input type="text" placeholder="Drug Name" />
                      <input type="text" placeholder="Claim Type" />
                    </div>
                    <div className="input-row-2">
                      <input type="text" placeholder="RX #" />
                      <input type="text" placeholder="Prescriber" />
                      <input type="text" placeholder="Pharmacy" />
                      <Space
                        className="claim-datefield"
                        direction="vertical"
                        size={12}
                      >
                        <DatePicker
                          className="date-rangepicker"
                          placeholder="Start date"
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
                        />
                        <DatePicker
                          className="date-rangepicker"
                          placeholder="End date"
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
                        />
                      </Space>
                    </div>
                  </div>
                  <div className="button-field">
                    <Button className="button-search">Search</Button>
                  </div>
                </form>
                <div className="done-sections"></div>
              </Grid>
              {/* Grid table ----------------------- Grid table */}
              <Grid className="border-lined" xs={12}>
                <h5 style={{textAlign: "center"}}>Grid Table</h5>
              </Grid>
              {/* Grid table ----------------------- Grid table */}
              {/* Section/Claim Form */}
            </Grid>
            {/* Section/Pie-chart and bar-chart */}

            {/* Section/Member Cost share */}
            <Grid container className="section-membercostshare" xs={12}>
              <Grid className="membercostshare-heading" container xs={12}>
                <Grid item sm={11}>
                  <h4 className="section-heading">Member Costshare</h4>
                </Grid>
                <Grid item sm={1}>
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="note-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                      fill="#2055B5"
                    />
                  </svg>
                </Grid>
              </Grid>
              <Grid className="costshare-table">
                <Grid className="costsharemini-tab" item sm={6}>
                  <AppBar className="mini-tab" position="static">
                    <Tabs className="tabs">
                      <Tab className="tab" label="Deductible Stage" />
                      <Tab
                        className="tab active"
                        label="Initial Coverage Stage"
                      />
                      <Tab className="tab" label="Coverage Gap Stage" />
                      <Tab className="tab" label="Catastrophic Stage" />
                    </Tabs>
                  </AppBar>
                </Grid>
                <div className="costshare-status">
                  <h5>No Deductible</h5>
                  <label>
                    Because there is no deductible for the plan. this payment
                    does not apply to you.
                  </label>
                  <h5 className="stage-heading">Deductible</h5>
                  <p>
                    You begin in this payment stage when you fill your first
                    prescription of the year. During this stage, you pay the
                    full cost of your{" "}
                    <b>[insert if applicable: brand name OR [tier name(s)]]</b>{" "}
                    drugs. Your “full cost” is usually lower than the normal
                    full price of the drug since our plan has negotiated lower
                    costs for most drugs. The “deductible” is the amount you
                    must pay for your Part D prescription drugs before the plan
                    begins to pay its share. You stay in this stage until you
                    have paid $[insert deductible amount] for your{" "}
                    <b>
                      [insert if applicable: brand name OR [tier name(s)]] drugs
                      ($[insert deductible amount] is the amount of your [insert
                      if applicable: brand name OR [tier name(s)]] deductible)
                    </b>
                    .
                  </p>
                </div>
                {/* <TableContainer className="section-costshare-container">
                  <Table className="table-container" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Network Pharmacy</TableCell>
                        <TableCell align="center">
                          Tier 1: Preferred Generic
                        </TableCell>
                        <TableCell align="center">
                          Tier 2 : Preferred Brand
                        </TableCell>
                        <TableCell align="center">
                          Tier 3 : Tier Name Here
                        </TableCell>
                        <TableCell align="center">
                          Tier 4 : Tier Name Here
                        </TableCell>
                        <TableCell align="center">
                          Tier 5 : Tier Name Here
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell
                            className="columncell-one"
                            component="th"
                            scope="row"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.tier1}</TableCell>
                          <TableCell align="center">{row.tier2}</TableCell>
                          <TableCell align="center">{row.tier3}</TableCell>
                          <TableCell align="center">{row.tier4}</TableCell>
                          <TableCell align="center">{row.tier5}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}
              </Grid>
              <div className="done-sections"></div>
            </Grid>
            {/* Section/Member Cost share */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Assets;
