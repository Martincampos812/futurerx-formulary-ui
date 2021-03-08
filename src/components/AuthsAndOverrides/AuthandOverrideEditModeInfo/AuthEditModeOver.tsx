/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./Autheditmode.scss";
import {Button, Table, Tag, Space, Select, DatePicker} from "antd";
import {Input} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//components
import {Grid} from "@material-ui/core";
// import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
//components
import {
  memberInfo3,
  overrideAdministrative2,
} from "../../../mocks/grid/AuthGridModelMockData";
import {
  memberInfo1,
  rxSection1,
  restSection1,
  overSection1,
} from "../../../mocks/AuthOverrideEditModelMock";
import {over} from "lodash";

const {Option} = Select;

export interface AuthEditModeInfoProps {
  claimData: any;
  parentFn: any;
}

const rejectedCountColumn = [
  {
    title: "Reject Code",
    dataIndex: "rejectCode",
    key: "rejectCode",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Submitted Value",
    dataIndex: "submittedValue",
    key: "submittedValue",
    render: (submittedValue) => (
      <>
        {submittedValue.map((submittedValueag) => {
          return (
            <div className="submitted-value">
              <span>{submittedValueag}</span>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "Expected Value (if available)",
    dataIndex: "expectedValue",
    key: "expectedValue",
    render: (expectedValue) => (
      <>
        {expectedValue.map((expectedValuetag) => {
          return (
            <div className="expected-value">
              <span>{expectedValuetag}</span>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

class AuthEditModeBlank extends React.Component<AuthEditModeInfoProps> {
  state = {
    forms: [],
    prescriberforms: [],
    pharmacyforms: [],
    errorforms: [],
    authType: this.props.claimData.overrideType,
    copayType: "No",
    memberInfo: memberInfo1,
    rxSection: rxSection1,
    restSection: restSection1,
    overSection: overSection1,
  };

  handleRemoveError = (index: number) => {
    // if (this.state.forms.length > 0) {
    setTimeout(() => {
      this.setState({
        errorforms: this.state.errorforms.filter(
          (item: any, _index: number) => _index !== index
        ),
      });
    });
    // }
  };
  handleAddError = () => {
    if (this.state.errorforms.length <= 14) {
      var temp: any = this.state.errorforms;
      temp.push({
        index: "",
        productValue: "",
        productDescription: "",
      });
      this.setState({
        errorforms: temp,
      });
    }
  };
  getErrorField = (index: any) => {
    const {errorforms} = this.state;
    return (
      <Grid item xs={12} sm={12} className="authedit-info-errorspacegrid">
        <table className="authedit-info-root__content--data-section__table">
          <div className="tablefields">
            <span>
              <Input
                className="authedittable-info-root__input"
                placeholder="Error Code"
                defaultValue=""
                name="errorCode"
              />
            </span>
          </div>
          <div className="tablefields spacepad">
            <span>
              <Input
                className="authedittable-info-root__input"
                placeholder="Error Description"
                defaultValue=""
                name="errorDescription"
              />
            </span>
          </div>
          <div className="tablefields deliconout">
            <span
              onClick={() => {
                this.handleRemoveError(index);
              }}
            >
              <svg
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                  fill="#999999"
                />
              </svg>
            </span>
          </div>
        </table>
      </Grid>
    );
  };
  handleRemoveForm = (index: number) => {
    // if (this.state.forms.length > 0) {
    setTimeout(() => {
      this.setState({
        forms: this.state.forms.filter(
          (item: any, _index: number) => _index !== index
        ),
      });
    });
    // }
  };
  handlePreRemoveForm = (index: number) => {
    setTimeout(() => {
      this.setState({
        prescriberforms: this.state.prescriberforms.filter(
          (item: any, _index: number) => _index !== index
        ),
      });
    });
  };
  handlePharRemoveForm = (index: number) => {
    setTimeout(() => {
      this.setState({
        pharmacyforms: this.state.pharmacyforms.filter(
          (item: any, _index: number) => _index !== index
        ),
      });
    });
  };
  handleCancel = () => {
    this.props.parentFn();
  };
  handleAddProduct = () => {
    if (this.state.forms.length <= 19) {
      var temp: any = this.state.forms;
      temp.push({
        index: "",
        productValue: "",
        productDescription: "",
      });
      this.setState({
        forms: temp,
      });
      console.log(this.state.forms);
    }
  };
  handleAuthChange = (e) => {
    this.setState({
      authType: e,
    });
  };
  handleCopayChange = (e) => {
    this.setState({
      copayType: e,
    });
  };
  handleAddPrescriber = () => {
    if (this.state.prescriberforms.length <= 14) {
      var temp: any = this.state.prescriberforms;
      temp.push({
        index: "",
        productValue: "",
        productDescription: "",
      });
      this.setState({
        prescriberforms: temp,
      });
      console.log(this.state.prescriberforms);
    }
  };

  handleAddPharmacy = () => {
    if (this.state.pharmacyforms.length <= 14) {
      var temp: any = this.state.pharmacyforms;
      temp.push({
        index: "",
        productValue: "",
        productDescription: "",
      });
      this.setState({
        pharmacyforms: temp,
      });
      console.log(this.state.pharmacyforms);
    }
  };

  getProductField = (index: any) => {
    const {forms} = this.state;
    return (
      <table className="authedit-info-root__content--data-section__table prespace">
        <div className="tablefields">
          <span>
            <Input
              className="authedittable-info-root__input"
              placeholder="Product Value"
              defaultValue=""
              name="productValue"
            />
          </span>
        </div>
        <div className="tablefields spacepad">
          <span>
            <Input
              className="authedittable-info-root__input"
              placeholder="Product Description"
              defaultValue=""
              name="productDescription"
            />
          </span>
        </div>
        <div className="tablefields deliconout">
          <span
            onClick={() => {
              this.handleRemoveForm(index);
            }}
          >
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                fill="#999999"
              />
            </svg>
          </span>
        </div>
      </table>
    );
  };

  getPrescriberField = (index: any) => {
    const {prescriberforms} = this.state;
    return (
      <table className="authedit-info-root__datecontent--data__table prespace">
        <div className="tablefields">
          <span>
            <Input
              className="authtableedit-info-root__input"
              placeholder="Prescriber ID"
              defaultValue=""
              name="prescriberID"
            />
          </span>
        </div>
        <div className="tablefields spacepad">
          <span>
            <Input
              className="authtableedit-info-root__input"
              placeholder="Prescriber Name"
              defaultValue=""
              name="prescriberName"
            />
          </span>
        </div>
        <div className="tablefields deliconout">
          <span
            onClick={() => {
              this.handlePreRemoveForm(index);
            }}
          >
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                fill="#999999"
              />
            </svg>
          </span>
        </div>
      </table>
    );
  };
  getPharmacyField = (index: any) => {
    const {pharmacyforms} = this.state;
    return (
      <table className="authedit-info-root__datecontent--data__table prespace">
        <div className="tablefields">
          <span>
            <Input
              className="authtableedit-info-root__input"
              placeholder="Pharmacy ID"
              defaultValue=""
              name="pharmacyID"
            />
          </span>
        </div>
        <div className="tablefields spacepad">
          <span>
            <Input
              className="authtableedit-info-root__input"
              placeholder="Pharmacy Name"
              defaultValue=""
              name="pharmacyName"
            />
          </span>
        </div>
        <div className="tablefields deliconout">
          <span
            onClick={() => {
              this.handlePharRemoveForm(index);
            }}
          >
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                fill="#999999"
              />
            </svg>
          </span>
        </div>
      </table>
    );
  };
  render() {
    // console.log(this.props);
    const {
      forms,
      prescriberforms,
      pharmacyforms,
      errorforms,
      authType,
      copayType,
      memberInfo,
      rxSection,
      restSection,
      overSection,
    } = this.state;
    return (
      <>
        <div className="authedit-info-root">
          <form noValidate autoComplete="off">
            <div className="authedit-info-root__content">
              <div className="authedit-info-root__content--status__paid">
                <h1>Active</h1>
              </div>
              <div className="authedit-info-root__content--data">
                <div className="fields leftfields">
                  <div className="fieldsdata">
                    <label>
                      Member ID <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="Member ID"
                        defaultValue={memberInfo.memberId}
                        type="text"
                      />
                    </span>
                  </div>

                  <div className="fieldsdata">
                    <label>
                      First Name <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="First Name"
                        defaultValue={memberInfo.firstName}
                        name="firstName"
                      />
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Last Name <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="Last Name"
                        defaultValue={memberInfo.lastName}
                        name="lastName"
                      />
                    </span>
                  </div>

                  <div className="fieldsdata ">
                    <label>
                      Auth Type <span className="important">*</span>
                    </label>
                    <span>
                      <Select
                        style={{width: "100%"}}
                        // style={{width: "100%", marginRight: "10px"}}
                        placeholder={authType}
                        dropdownStyle={{zIndex: 2000}}
                        dropdownAlign={{
                          offset: [-1, -4],
                          overflow: {
                            adjustY: 0,
                          },
                        }}
                        className="category__input--dropdown"
                        dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                        onChange={this.handleAuthChange}
                        getPopupContainer={(node) => node.parentNode}
                        suffixIcon={
                          <svg
                            className="ant-select-suffix"
                            width="8"
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
                        <Option value="Restrictive">Restrictive</Option>
                        <Option value="Clinical">Clinical</Option>
                        <Option value="Administrative">Administrative</Option>
                      </Select>
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Auth Reason <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="Auth Reason"
                        defaultValue={memberInfo.authReason}
                        name="authReason"
                      />
                    </span>
                  </div>
                </div>
                <div className="fields rightfields">
                  <div className="fieldsdata">
                    <label>
                      Customer ID <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="Customer ID"
                        defaultValue={memberInfo.customerId}
                        name="customerId"
                      />
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Client ID <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="Client ID"
                        defaultValue={memberInfo.clientId}
                        name="clientId"
                      />
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Begin Date <span className="important">*</span>
                    </label>

                    <span>
                      <DatePicker
                        panelRender={(panelNode) => {
                          return (
                            <div>
                              <span className="frx-date-picker__panel">
                                Pick a date
                                <svg
                                  className="frx-date-picker__panel-close-icon"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637772 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                                    fill="#666666"
                                  />
                                </svg>
                              </span>
                              {panelNode}
                            </div>
                          );
                        }}
                        className="start-date-picker__input"
                        dropdownClassName="member-search__date-calender"
                        placeholder="Begin Date"
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
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      End Date <span className="important">*</span>
                    </label>
                    <span>
                      <DatePicker
                        panelRender={(panelNode) => {
                          return (
                            <div>
                              <span className="frx-date-picker__panel">
                                Pick a date
                                <svg
                                  className="frx-date-picker__panel-close-icon"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637772 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                                    fill="#666666"
                                  />
                                </svg>
                              </span>
                              {panelNode}
                            </div>
                          );
                        }}
                        className="end-date-picker__input"
                        // onChange={this.handleStartDate}
                        // value={this.state.startDate}
                        dropdownClassName="member-search__date-calender"
                        placeholder="End Date"
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
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Group <span className="important">*</span>
                    </label>
                    <span>
                      <Input
                        className="authedit-info-root__input"
                        placeholder="Group Name"
                        defaultValue={memberInfo.group}
                        name="group"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="authadmin-info-root__content--data">
              <div className="authadmin-info-root__content--data-section">
                <div className="fields">
                  <label>
                    RX # <span className="important">*</span>
                  </label>
                  <span>
                    <Input
                      className="authedit-info-root__input"
                      placeholder="RX #"
                      defaultValue={rxSection.rx}
                      name="rx"
                    />
                  </span>
                </div>
                {/* <div className="fieldscenter">
                  <label>
                    Refills Used <span className="important">*</span>
                  </label>
                  <span>
                    <Input
                      className="authedit-info-root__input"
                      placeholder="Refills Used"
                      defaultValue=""
                      name="refillsUsed"
                    />
                  </span>
                </div>
                <div className="endfields">
                  <label>
                    Refills Remaining <span className="important">*</span>
                  </label>
                  <span>
                    <Input
                      className="authedit-info-root__input"
                      placeholder="Refills Remaining"
                      defaultValue="2"
                      name="refillsRemaining"
                    />
                  </span>
                </div>
             */}
              </div>
              <div className="authadmin-info-root__content--data-sectionrow">
                <div className="fields">
                  <label>
                    Product Type <span className="important">*</span>
                  </label>
                  <Select
                    style={{width: "100%"}}
                    // style={{width: "100%", marginRight: "10px"}}
                    placeholder={rxSection.productType}
                    dropdownStyle={{zIndex: 2000}}
                    dropdownAlign={{
                      offset: [-1, -4],
                      overflow: {
                        adjustY: 0,
                      },
                    }}
                    className="category__input--dropdown"
                    dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                    getPopupContainer={(node) => node.parentNode}
                    suffixIcon={
                      <svg
                        className="ant-select-suffix"
                        width="8"
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
                    <Option value="DDID">DDID</Option>
                    <Option value="NDC">NDC</Option>
                    <Option value="Core-9">Core-9</Option>
                    <Option value="GPI">GPI</Option>
                    <Option value="AHFS">AHFS</Option>
                    <Option value="RxCUT">RxCUI</Option>
                    <Option value="ICD-10">ICD-10</Option>
                  </Select>
                </div>
                <div className="fieldsright">
                  {" "}
                  <label>
                    Apply to Multi-Ingredient Compound Claims
                    <span className="important">*</span>
                  </label>
                  <Select
                    style={{width: "100%"}}
                    placeholder="Yes"
                    defaultValue={rxSection.applyMutli}
                    dropdownStyle={{zIndex: 2000}}
                    dropdownAlign={{
                      offset: [-1, -4],
                      overflow: {
                        adjustY: 0,
                      },
                    }}
                    className="category__input--dropdown"
                    getPopupContainer={(node) => node.parentNode}
                    dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                    suffixIcon={
                      <svg
                        className="ant-select-suffix"
                        width="8"
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
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
              </div>
              <table className="authedit-info-root__content--data-section__table prespace">
                <div className="tablefields">
                  <header>
                    <p>
                      Product Value <span className="important">*</span>
                    </p>
                  </header>
                  <span>
                    <Input
                      className="authedittable-info-root__input"
                      placeholder="Product Value"
                      defaultValue=""
                      name="productValue"
                    />
                  </span>
                </div>
                <div className="tablefields spacepad">
                  <header>
                    <p>
                      Product description
                      <span className="important">*</span>
                    </p>
                  </header>
                  <span>
                    <Input
                      className="authedittable-info-root__input"
                      placeholder="Product Description"
                      defaultValue=""
                      name="productDescription"
                    />
                  </span>
                </div>
                <div className="tablefields delicon">
                  <span>
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 13 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                        fill="#999999"
                      />
                    </svg>
                  </span>
                </div>
              </table>
              {forms.map((item: any, index: number) =>
                this.getProductField(index)
              )}
              {forms.length < 20 ? (
                <Grid container>
                  <Grid item xs={12} sm={12} className="prespace">
                    <div className="addmoreproduct">
                      <div>
                        <Button
                          className="addMore"
                          onClick={this.handleAddProduct}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z"
                              fill="#666666"
                            />
                            <path
                              d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z"
                              fill="#666666"
                            />
                          </svg>
                          <span className="addMore--text">Add Product</span>
                        </Button>
                      </div>
                      <div className="importantdata">*Limit 20</div>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
              {authType && authType == "Administrative" ? (
                <div>
                  <table className="authedit-info-root__content--data-section__table">
                    <div className="tablefields">
                      <header>
                        <p>
                          Error Code <span className="important">*</span>
                        </p>
                      </header>
                      <span>
                        <Input
                          className="authedittable-info-root__input"
                          defaultValue="E123"
                          name="productValue"
                        />
                      </span>
                    </div>
                    <div className="tablefields spacepad">
                      <header>
                        <p>
                          Error description
                          <span className="important">*</span>
                        </p>
                      </header>
                      <span>
                        <Input
                          className="authedittable-info-root__input"
                          defaultValue="Invalid Number of Refills"
                          name="productDescription"
                        />
                      </span>
                    </div>
                    <div className="tablefields delicon">
                      <span>
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                            fill="#999999"
                          />
                        </svg>
                      </span>
                    </div>
                  </table>
                  {errorforms.map((item: any, index: number) =>
                    this.getErrorField(index)
                  )}
                  {errorforms.length < 15 ? (
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        className="authedit-info-errorspacegrid"
                      >
                        <div className="addmoreproduct">
                          <div>
                            <Button
                              className="addMore"
                              onClick={this.handleAddError}
                            >
                              <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z"
                                  fill="#666666"
                                />
                                <path
                                  d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z"
                                  fill="#666666"
                                />
                              </svg>
                              <span className="addMore--text">Add Error</span>
                            </Button>
                          </div>
                          <div className="importantdata">*Limit 15</div>
                        </div>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>

            {authType && authType == "Restrictive" ? (
              <div className="authedit-info-root__datecontent--data">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <div className="fieldspre">
                      <label>
                        Prescriber Type <span className="important">*</span>
                      </label>
                      <span>
                        <Select
                          placeholder="Prescriber Type"
                          defaultValue={restSection.prescriberType}
                          dropdownStyle={{zIndex: 2000}}
                          dropdownAlign={{
                            offset: [-1, -4],
                            overflow: {
                              adjustY: 0,
                            },
                          }}
                          className="category__input--dropdown"
                          getPopupContainer={(node) => node.parentNode}
                          dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                          suffixIcon={
                            <svg
                              className="ant-select-suffix"
                              width="8"
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
                          <Option value="01 - NPI">01 - NPI</Option>
                          <Option value="12 - DEA">12 - DEA</Option>
                        </Select>
                      </span>
                    </div>
                    <table className="authedit-info-root__datecontent--data__table">
                      <div className="tablefields">
                        <header>
                          <p>
                            Prescriber ID <span className="important">*</span>
                          </p>
                        </header>
                        <span>
                          <Input
                            className="authtableedit-info-root__input"
                            placeholder="Prescriber ID"
                            defaultValue=""
                            name="prescriberID"
                          />
                        </span>
                      </div>
                      <div className="tablefields spacepad">
                        <header>
                          <p>
                            Prescriber Name <span className="important">*</span>
                          </p>
                        </header>
                        <span>
                          <Input
                            className="authtableedit-info-root__input"
                            placeholder="Prescriber Name"
                            defaultValue=""
                            name="prescriberName"
                          />
                        </span>
                      </div>
                      <div className="tablefields delicon">
                        <span>
                          <svg
                            width="13"
                            height="15"
                            viewBox="0 0 13 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                              fill="#999999"
                            />
                          </svg>
                        </span>
                      </div>
                    </table>
                    {prescriberforms.map((item: any, index: number) =>
                      this.getPrescriberField(index)
                    )}
                    {prescriberforms.length < 15 ? (
                      <div className="addmoreproduct prespace">
                        <div>
                          <Button
                            className="addMore"
                            onClick={this.handleAddPrescriber}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z"
                                fill="#666666"
                              />
                              <path
                                d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z"
                                fill="#666666"
                              />
                            </svg>
                            <span className="addMore--text">
                              Add Prescriber
                            </span>
                          </Button>
                        </div>
                        <div className="importantdata">*Limit 15</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="fieldspre">
                      <label>
                        Pharmacy Type <span className="important">*</span>
                      </label>
                      <span>
                        <Select
                          placeholder="Pharmacy Type"
                          defaultValue={restSection.pharmacyType}
                          dropdownStyle={{zIndex: 2000}}
                          dropdownAlign={{
                            offset: [-1, -4],
                            overflow: {
                              adjustY: 0,
                            },
                          }}
                          className="category__input--dropdown"
                          getPopupContainer={(node) => node.parentNode}
                          dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                          suffixIcon={
                            <svg
                              className="ant-select-suffix"
                              width="8"
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
                          <Option value="07 - NCPDP">07 - NCPDP</Option>
                          <Option value="01 - NPI">01 - NPI</Option>
                        </Select>
                      </span>
                    </div>
                    <table className="authedit-info-root__datecontent--data__table">
                      <div className="tablefields">
                        <header>
                          <p>
                            Pharmacy ID <span className="important">*</span>
                          </p>
                        </header>
                        <span>
                          <Input
                            className="authtableedit-info-root__input"
                            placeholder="Pharmacy ID"
                            defaultValue=""
                            name="pharmacyID"
                          />
                        </span>
                      </div>
                      <div className="tablefields spacepad">
                        <header>
                          <p>
                            Pharmacy Name <span className="important">*</span>
                          </p>
                        </header>
                        <span>
                          <Input
                            className="authtableedit-info-root__input"
                            placeholder="Pharmacy Name"
                            defaultValue=""
                            name="pharmacy"
                          />
                        </span>
                      </div>
                      <div className="tablefields delicon">
                        <span>
                          <svg
                            width="13"
                            height="15"
                            viewBox="0 0 13 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                              fill="#999999"
                            />
                          </svg>
                        </span>
                      </div>
                    </table>
                    {pharmacyforms.map((item: any, index: number) =>
                      this.getPharmacyField(index)
                    )}
                    {pharmacyforms.length < 15 ? (
                      <div className="addmoreproduct prespace">
                        <div>
                          <Button
                            className="addMore"
                            onClick={this.handleAddPharmacy}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z"
                                fill="#666666"
                              />
                              <path
                                d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z"
                                fill="#666666"
                              />
                            </svg>
                            <span className="addMore--text">Add Pharmacy</span>
                          </Button>
                        </div>
                        <div className="importantdata">*Limit 15</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </div>
            ) : (
              ""
            )}
            {(authType && authType == "Clinical") ||
            authType == "Administrative" ? (
              <div className="authclinical-info-root__content--data">
                <div className="fields fieldsleft">
                  <div className="fieldsdata">
                    <label>
                      Override Plan Copay <span className="important">*</span>
                    </label>
                    <span>
                      <Select
                        style={{width: "100%"}}
                        // placeholder="Include"
                        defaultValue={copayType}
                        dropdownStyle={{zIndex: 2000}}
                        dropdownAlign={{
                          offset: [-1, -4],
                          overflow: {
                            adjustY: 0,
                          },
                        }}
                        onChange={this.handleCopayChange}
                        className="category__input--dropdown"
                        getPopupContainer={(node) => node.parentNode}
                        dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                        suffixIcon={
                          <svg
                            className="ant-select-suffix"
                            width="8"
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
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Costshare <span className="important">*</span>
                    </label>
                    <span>
                      {copayType && copayType == "Yes" ? (
                        <Input
                          className="authedit-info-root__input"
                          placeholder="Costshare"
                          defaultValue={overSection.costShare}
                          name="costShare"
                        />
                      ) : (
                        " "
                      )}
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Coinsurance <span className="important">*</span>
                    </label>
                    <span>
                      {copayType && copayType == "Yes" ? (
                        <Input
                          className="authedit-info-root__input"
                          placeholder="Coinsurance"
                          defaultValue={overSection.coinsurance}
                          name="coInsurance"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Include/Exclude from Deductible{" "}
                      <span className="important">*</span>
                    </label>
                    <Select
                      // style={{width: "100%", marginRight: "10px"}}
                      // placeholder="Include"
                      defaultValue={overSection.includeDeductible}
                      dropdownStyle={{zIndex: 2000}}
                      dropdownAlign={{
                        offset: [-1, -4],
                        overflow: {
                          adjustY: 0,
                        },
                      }}
                      className="category__input--dropdown"
                      getPopupContainer={(node) => node.parentNode}
                      dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                      suffixIcon={
                        <svg
                          className="ant-select-suffix"
                          width="8"
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
                      <Option value="Include">Include</Option>
                      <Option value="Exclude">Exclude</Option>
                    </Select>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Include/Exclude from MOP/MPP{" "}
                      <span className="important">*</span>
                    </label>
                    <Select
                      // style={{width: "100%", marginRight: "10px"}}
                      // placeholder="Include"
                      defaultValue={overSection.includeMop}
                      dropdownStyle={{zIndex: 2000}}
                      dropdownAlign={{
                        offset: [-1, -4],
                        overflow: {
                          adjustY: 0,
                        },
                      }}
                      // value={this.state.status}
                      // onChange={this.onSelectStatus}

                      className="category__input--dropdown"
                      getPopupContainer={(node) => node.parentNode}
                      dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                      suffixIcon={
                        <svg
                          className="ant-select-suffix"
                          width="8"
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
                      <Option value="Include">Include</Option>
                      <Option value="Exclude">Exclude</Option>
                    </Select>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Override Claim Pricing{" "}
                      <span className="important">*</span>
                    </label>
                    <Select
                      // style={{width: "100%", marginRight: "10px"}}

                      defaultValue={overSection.overrideClaim}
                      dropdownStyle={{zIndex: 2000}}
                      dropdownAlign={{
                        offset: [-1, -4],
                        overflow: {
                          adjustY: 0,
                        },
                      }}
                      className="category__input--dropdown"
                      getPopupContainer={(node) => node.parentNode}
                      dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                      suffixIcon={
                        <svg
                          className="ant-select-suffix"
                          width="8"
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
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </div>
                </div>
                <div className="fields fieldsright">
                  <div className="fieldsdata">
                    <label>
                      Override LICS Copay <span className="important">*</span>
                    </label>
                    <span>
                      {copayType && copayType == "Yes" ? (
                        <Input
                          className="authedit-info-root__input"
                          placeholder="Override LICS Copay"
                          defaultValue={overSection.overrideLicsCopay}
                          name="overrideLicscopay"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Override LICS Value <span className="important">*</span>
                    </label>
                    <span>
                      {copayType && copayType == "Yes" ? (
                        <Input
                          className="authedit-info-root__input"
                          placeholder="Override LICS Value"
                          defaultValue={overSection.overrideLicsValue}
                          name="overrideLicsvalue"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Max Coinsurance Amt <span className="important">*</span>
                    </label>
                    <span>
                      {copayType && copayType == "Yes" ? (
                        <Input
                          className="authedit-info-root__input"
                          placeholder="Max Coinsurance Amt"
                          defaultValue={overSection.maxCoinsurance}
                          name="maxConinsurance"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Min Coinsurance Amt <span className="important">*</span>
                    </label>
                    <span>
                      {copayType && copayType == "Yes" ? (
                        <Input
                          className="authedit-info-root__input"
                          placeholder="Min Coinsurance Amt"
                          defaultValue={overSection.minCoinurance}
                          name="minconinsurance"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Override Part D Drug Coverage Status
                      <span className="important">*</span>
                    </label>
                    <Select
                      // style={{width: "100%", marginRight: "10px"}}
                      // placeholder="B"
                      defaultValue={overSection.overridePart}
                      dropdownStyle={{zIndex: 2000}}
                      dropdownAlign={{
                        offset: [-1, -4],
                        overflow: {
                          adjustY: 0,
                        },
                      }}
                      // value={this.state.status}
                      // onChange={this.onSelectStatus}

                      className="category__input--dropdown"
                      getPopupContainer={(node) => node.parentNode}
                      dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                      suffixIcon={
                        <svg
                          className="ant-select-suffix"
                          width="8"
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
                      <Option value="C">C</Option>
                      <Option value="E">E</Option>
                      <Option value="O">O</Option>
                      <Option value="A">A</Option>
                    </Select>
                  </div>
                  <div className="fieldsdata">
                    <label>
                      Override CMS Drug Status{" "}
                      <span className="important">*</span>
                    </label>
                    <Select
                      // style={{width: "100%", marginRight: "10px"}}
                      // placeholder="C"
                      defaultValue={overSection.overrideCms}
                      dropdownStyle={{zIndex: 2000}}
                      dropdownAlign={{
                        offset: [-1, -4],
                        overflow: {
                          adjustY: 0,
                        },
                      }}
                      // value={this.state.status}
                      // onChange={this.onSelectStatus}

                      className="category__input--dropdown"
                      getPopupContainer={(node) => node.parentNode}
                      dropdownClassName="AuthEditSearch-dropdown-select_dropdown"
                      suffixIcon={
                        <svg
                          className="ant-select-suffix"
                          width="8"
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
                      <Option value="B">B</Option>
                      <Option value="D">D</Option>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="authedit-info-root__contentdatesection--data">
              <div className="datefields">
                {memberInfo3.map((label, i) => (
                  <div key={i + ""} className="fieldsdata">
                    <label>{label.label}</label>
                    <span>{label.labelValue}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="editflex-container">
              <Button className="custom-close-btn" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button className="custom-action-btn">Save</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default AuthEditModeBlank;
