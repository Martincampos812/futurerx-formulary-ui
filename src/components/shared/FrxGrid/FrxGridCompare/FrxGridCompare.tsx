import React from "react";
import { getClaimsGridData } from "../../../../mocks/grid/claims-mock";
import {
  _claimsGridColumns,
  _testClaimsGridColumns,
} from "../../../../utils/grid/columns";
import FrxDialogPopup from "../../FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../FrxGridContainer";
import "./FrxGridCompare.scss";
import { Select } from "antd";
import FrxLoader from "../../FrxLoader/FrxLoader";
// import { DialogTitle } from '@material-ui/core';
import { DialogTitle, Button, Container } from "@material-ui/core";
import ClaimsResult from "../../../ClaimsResult/ClaimsResult";
import ClaimsDialogPopup from "../../../ClaimsResult/ClaimsDailogPopup/ClaimsDailogPopup";
import { getTestClaimsSearchData } from "../../../../mocks/search/test-claims-search-mock-data";
import { getClaimsSearchData } from "../../../../mocks/search/claims-search-mock";
import NewTestClaim from "../../../member/NewTestClaimComponent";

interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
}
interface State {
  isFetchingData: boolean;
  filteredData: any[];
  filteredData2: any[];
  data: any[];
  data2: any[];
  type1: any;
  type2: any;
  claimsResult: boolean;
  firstClaim: any;
  secondClaim: any;
  newTestClaim: boolean;
  resultData: any;
  show1: boolean;
  show2: boolean;
}
const { Option } = Select;
export default class FrxGridCompare extends React.Component<Props, State> {
  state = {
    isFetchingData: false,
    filteredData: [],
    filteredData2: [],
    data: [],
    data2: [],
    type1: undefined,
    type2: undefined,
    claimsResult: false,
    firstClaim: { id: "" },
    secondClaim: {},
    newTestClaim: false,
    resultData: [],
    show1: false,
    show2: false,
  };
  componentDidMount() {
    //fetch data from API
    const data = getClaimsGridData().slice(0, 4);
    const data2 = getClaimsGridData().slice(0, 4);
    this.setState({ data, filteredData: data, data2, filteredData2: data2 });
    if (this.props.mode && this.props.mode === "single") {
      console.log(this.props.selectedItem);
      if (this.props.selectedItem) {
        this.rowSelectionChange(this.props.selectedItem);
        this.setState({
          show2: true,
        });
      }
    } else {
      this.setState({
        show1: true,
        show2: true,
      });
    }
  }
  onClose = () => {
    console.log("close");
    this.props.onClose();
  };
  rowSelectionChange = (selectedRow: any) => {
    console.log(selectedRow);
    const data = this.state.filteredData.map((d: any) => {
      if (d.id === selectedRow.id) d["isSelected"] = true;
      else d["isSelected"] = false;
      return d;
    });

    this.setState({
      firstClaim: selectedRow,
    });
    // this.setState((prevState) => ({
    //   resultData: prevState.resultData.concat(selectedRow),
    // }));
    var _temp: any = this.state.resultData;
    _temp[0] = selectedRow;
    this.setState((prevState) => ({
      resultData: _temp,
    }));
    this.setState({ filteredData: data });
  };

  rowSelectionChange2 = (selectedRow: any) => {
    console.log(selectedRow);
    const data2 = this.state.filteredData2.map((d: any) => {
      if (d.id === selectedRow.id) d["isSelected"] = true;
      else d["isSelected"] = false;
      return d;
    });

    this.setState({
      secondClaim: selectedRow,
    });
    // this.setState((prevState) => ({
    //   resultData: prevState.resultData.concat(selectedRow),
    // }));
    var _temp: any = this.state.resultData;
    _temp[1] = selectedRow;
    this.setState((prevState) => ({
      resultData: _temp,
    }));
    this.setState({ filteredData2: data2 });
  };
  action = () => {
    console.log("no action");
  };
  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d: any) => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  handleSearch2 = (searchObject) => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data2.filter(
          (d: any) => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData2: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  openClaimsResult = (action: any) => {
    const { firstClaim, secondClaim } = this.state;
    if (
      Object.keys(firstClaim).length !== 0 &&
      Object.keys(secondClaim).length !== 0
    ) {
      this.setState({ claimsResult: true });
    } else {
      alert("Select both the claims");
    }
  };

  closeClaimsResult = () => {
    this.setState({ claimsResult: false });
  };

  processCloseActions = () => {
    let filteredData = this.state.filteredData.map((d: any) => {
      d["isSelected"] = false;
      return d;
    });

    let filteredData2 = this.state.filteredData2.map((d: any) => {
      d["isSelected"] = false;
      return d;
    });

    this.setState({ filteredData, filteredData2 });
    this.closeClaimsResult();
  };

  closeNewTestClaim = () => {
    this.setState({
      newTestClaim: false,
    });
  };

  openNewTestClaim = () => {
    this.closeClaimsResult();
    this.setState({
      newTestClaim: !this.state.newTestClaim,
    });
  };
  trimColumns = (columns: any): any => {
    return columns.map((item: any) => {
      delete item.className;
      delete item.componentToOpenOnClickingCell;
      delete item.toolTip;
      return item;
    });
  };
  render() {
    let { show1, show2, newTestClaim, firstClaim } = this.state;
    let { type } = this.props;
    return this.state.isFetchingData === true ? (
      <FrxLoader />
    ) : (
      <>
        <FrxDialogPopup
          positiveActionText="Compare"
          negativeActionText="Cancel"
          title={
            show2 === true && show1 === false
              ? type === "testClaimId"
                ? `Test Claim ID: ${firstClaim[type]}`
                : `Claim ID: ${firstClaim[type]}`
              : ""
          }
          handleClose={this.onClose}
          handleAction={this.action}
          open={this.props.openPopup}
          showActions={false}
          className={
            show2 && !show1
              ? this.props.className
                ? this.props.className
                : "grid-compare-popup-root"
              : this.props.className
              ? this.props.className
              : "grid-compare-popup-root hideHeading"
          }
          height="80%"
          width="90%"
        >
          {show1 === true && (
            <>
              <DialogTitle
                id="alert-dialog-title"
                className="frx-dialog-root__heading"
              >
                <Select
                  placeholder="Claim Type"
                  getPopupContainer={(trigger: any) => trigger.parentNode}
                  value={this.state.type1 !== "" ? this.state.type1 : undefined}
                  onChange={(e: string) => {
                    this.setState({
                      type1: e,
                      isFetchingData: false,
                    });
                  }}
                  dropdownClassName="grid-compare-select-drpDwn"
                  className="grid-compare-dropdowntest"
                  dropdownAlign={{ offset: [0, 0] }}
                  suffixIcon={
                    <svg
                      className="ant-select-suffix"
                      width="6"
                      height="3"
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
                  <Option value="tc">Test Claim</Option>
                  <Option value="c">Claim</Option>
                </Select>
                <span
                  className="frx-dialog-root__close-icon"
                  onClick={(e) => this.onClose()}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99418 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600272 0.000414325C0.460452 0.00581497 0.32782 0.0637771 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.3529 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99418 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                      fill="#666666"
                    />
                  </svg>
                </span>
              </DialogTitle>
              <FrxGridContainer
                enableSearch
                isRowSelectionEnabled
                enableColumnDrag
                onSearch={this.handleSearch}
                fixedColumnKeys={["claimId"]}
                pagintionPosition="topRight"
                gridName={"GENERIC"}
                isFetchingData={this.state.isFetchingData}
                columns={
                  this.state.type1 !== undefined
                    ? this.state.type1 === "tc"
                      ? this.trimColumns(_testClaimsGridColumns())
                      : this.trimColumns(_claimsGridColumns())
                    : this.trimColumns(_claimsGridColumns())
                }
                searchOptions={
                  this.state.type1 !== undefined
                    ? this.state.type1 === "tc"
                      ? getTestClaimsSearchData()
                      : getClaimsSearchData()
                    : getClaimsSearchData()
                }
                enableSettings
                enableResizingOfColumns
                data={this.state.filteredData}
                rowSelectionChange={this.rowSelectionChange}
                onSettingsClick="grid-menu"
                settingsWidth={28}
                scroll={{ x: 3800, y: 400 }}
              />
            </>
          )}
          {show2 && (
            <>
              <DialogTitle
                id="alert-dialog-title"
                className="frx-dialog-root__heading"
              >
                <Select
                  placeholder="Claim Type"
                  getPopupContainer={(trigger: any) => trigger.parentNode}
                  value={this.state.type2 !== "" ? this.state.type2 : undefined}
                  onChange={(e: string) => {
                    this.setState({
                      isFetchingData: true,
                    });
                    setTimeout(() => {
                      this.setState({
                        type2: e,
                        isFetchingData: false,
                      });
                    }, 1000);
                  }}
                  dropdownClassName="grid-compare-select-drpDwn"
                  className="grid-compare-dropdown"
                  dropdownAlign={{ offset: [0, 0] }}
                  suffixIcon={
                    <svg
                      className="ant-select-suffix"
                      width="6"
                      height="3"
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
                  <Option value="tc">Test Claim</Option>
                  <Option value="c">Claim</Option>
                </Select>
              </DialogTitle>
              <FrxGridContainer
                enableSearch
                isRowSelectionEnabled
                enableColumnDrag
                onSearch={this.handleSearch2}
                fixedColumnKeys={["claimId"]}
                pagintionPosition="topRight"
                gridName={"GENERIC"}
                isFetchingData={this.state.isFetchingData}
                columns={
                  this.state.type2 !== undefined
                    ? this.state.type2 === "tc"
                      ? this.trimColumns(_claimsGridColumns())
                      : this.trimColumns(_testClaimsGridColumns())
                    : this.trimColumns(_testClaimsGridColumns())
                }
                searchOptions={
                  this.state.type2 !== undefined
                    ? this.state.type2 === "tc"
                      ? getClaimsSearchData()
                      : getTestClaimsSearchData()
                    : getTestClaimsSearchData()
                }
                enableSettings
                enableResizingOfColumns
                data={this.state.filteredData2}
                rowSelectionChange={this.rowSelectionChange2}
                onSettingsClick="grid-menu"
                settingsWidth={28}
                scroll={{ x: 3800, y: 400 }}
              />
            </>
          )}
          <div className="flex-container">
            <Button className="custom-close-btn" onClick={this.onClose}>
              Cancel
            </Button>
            <Button
              className="custom-action-btn"
              onClick={this.openClaimsResult}
            >
              Compare
            </Button>
          </div>
        </FrxDialogPopup>
        <ClaimsDialogPopup
          className="frx-claims-result-root"
          open={this.state.claimsResult}
          positiveActionText="new claim compare"
          showCloseIcon={true}
          showActions={true}
          handleClose={() => {
            this.onClose();
          }}
          handleAction={() => {
            this.processCloseActions();
          }}
        >
          <ClaimsResult
            firstClaim={this.state.firstClaim}
            secondClaim={this.state.secondClaim}
            handleNewTestClaim={this.openNewTestClaim}
          />
        </ClaimsDialogPopup>
        {newTestClaim ? (
          <NewTestClaim
            isOpen={newTestClaim}
            onClose={this.closeNewTestClaim}
            panelName="demographics-tab"
            title="New Test Claim"
          />
        ) : null}
      </>
    );
  }
}
