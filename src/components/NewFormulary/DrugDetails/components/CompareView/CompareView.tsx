import React from "react";
import { connect } from "react-redux";
import { TabInfo } from "../../../../../models/tab.model";
import FrxTabs from "../../../../shared/FrxTabs/FrxTabs";
import CompareFormularies from "./components/CompareFormularies";
import CompareTable from "./components/CompareAndViewTable/CompareTable";
import ViewTable from "./components/CompareAndViewTable/ViewTable";
import "./CompareView.scss";
import ViewFormularies from "./components/ViewFormularies";
import showMessage from "../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import { saveAs } from "file-saver";
import { exportReport } from "../../../../../redux/slices/formulary/compareView/compareViewService";
import * as commonConstants from "../../../../../api/http-commons";
import uuid from "react-uuid";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import HpmsSummary from "./components/CompareAndViewTable/HpmsSummary"
import { ReactComponent as FileIcon } from "../../../../../assets/icons/FileIcon.svg";
import ComponentActivity from "./components/ComponentActivity/ComponentActivity";
import VersionDrugActivity from "./components/VersionDrugActivity/VersionDrugActivity";
import VersionDrugActivityGrid from "./components/VersionDrugActivity/VersionDrugActivityGrid";
const tabs = [
  { id: 1, text: "COMPARE FORMUARIES" },
  { id: 2, text: "VIEW FORMULARIES" },
  { id: 3, text: "HPMS SUMMMARY" },
  { id: 5, text: "VERSION DRUG ACTIVITY" },
];

// { id: 4, text: "COMPONENT ACTIVITY" },


interface configureState {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  isCompareClicked: boolean;
  isViewClicked: boolean;
  baseformulary: any;
  referenceformulary: any;
  isRequestFinished: any;
}
interface configureProps {}

const mapStateToProps = state => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog
  };
};
class CompareView extends React.Component<
  any,
  any
> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
    isCompareClicked: false,
    isViewClicked: false,
    baseformulary: {},
    referenceformulary: {},
    exportSections: Array(),
    isRequestFinished: true,
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.state.isCompareClicked = false;
    this.state.isViewClicked = false;
    this.state.baseformulary = {};
    this.state.referenceformulary = {};
    this.setState({ tabs, activeTabIndex });
  };

  handleCompareClear = () => {
    if (this.state.isCompareClicked) {
      this.setState({
        isCompareClicked: false,
      });
    }
  };

  handleViewClear = () => {
    if (this.state.isViewClicked) {
      this.setState({
        isViewClicked: false,
      });
    }
  };

  handleCompareBtn = (baseFormulary, referenceFromulary) => {
    if (
      baseFormulary &&
      referenceFromulary &&
      baseFormulary["id_formulary"] &&
      referenceFromulary["id_formulary"]
    ) {
      this.state.baseformulary = baseFormulary;
      this.state.referenceformulary = referenceFromulary;

      this.setState(
        {
          isCompareClicked: false,
        },
        () => {
          this.setState({
            isCompareClicked: true,
          });
        }
      );
    } else {
      showMessage("Choose formularies to compare", "error");
    }
  };

  handleViewBtn = (baseFormulary) => {
    if (baseFormulary && baseFormulary["id_formulary"]) {
      this.state.baseformulary = baseFormulary;
      this.setState(
        {
          isViewClicked: false,
        },
        () => {
          this.setState({
            isViewClicked: true,
          });
        }
      );
    } else {
      showMessage("Choose formulary to view", "error");
    }
  };
  sectionSelected = (sectionName, checked) => {
    console.log("Section selection:" + sectionName + " " + checked);
    if (checked) {
      if (!this.state.exportSections.includes(sectionName))
        this.state.exportSections.push(sectionName);
    } else {
      this.state.exportSections = this.state.exportSections.filter(
        (section) => section !== sectionName
      );
    }
  };

  handleHPMSExport = async () => {
    this.setState({
      isRequestFinished: false,
    });
    //let param = type === "summary" ? "COMPAREEXC" : "COMPAREEXCDET";
    let apiDetails = {};
    apiDetails["apiPart"] = commonConstants.HPMS_EXPORT_EXCEL;
    apiDetails["pathParams"] =
      this.props?.formulary_id +
      "/" +
      this.props?.formulary_id ;

    apiDetails["messageBody"] = {
      selected_sections: this.state.exportSections,
    };
    try {
      const data = await exportReport(apiDetails);
      if (data) {
        const file = new Blob([data], { type: "application/vnd.ms.excel" });
        saveAs(file, "User_Export_" + uuid() + ".xlsx");
        this.setState({
          isRequestFinished: true,
        });
      } else {
        showMessage("Error while exporting", "error");
        this.setState({
          isRequestFinished: true,
        });
      }
    } catch (err) {
      console.log(err);
      showMessage("Error while exporting", "error");
      this.setState({
        isRequestFinished: true,
      });
    }
  };

  handeReportDownload = async (type) => {
    this.setState({
      isRequestFinished: false,
    });
    let param = type === "summary" ? "COMPAREEXC" : "COMPAREEXCDET";
    let apiDetails = {};
    apiDetails["apiPart"] = commonConstants.COMPARE_FORMULARY_EXPORT_EXCEL;
    apiDetails["pathParams"] =
      this.state.baseformulary["id_formulary"] +
      "/" +
      this.state.referenceformulary["id_formulary"] +
      "/" +
      param;

    apiDetails["messageBody"] = {
      selected_sections: this.state.exportSections,
    };
    try {
      const data = await exportReport(apiDetails);
      if (data) {
        const file = new Blob([data], { type: "application/vnd.ms.excel" });
        saveAs(file, "User_Export_" + uuid() + ".xlsx");
        this.setState({
          isRequestFinished: true,
        });
      } else {
        showMessage("Error while exporting", "error");
        this.setState({
          isRequestFinished: true,
        });
      }
    } catch (err) {
      console.log(err);
      showMessage("Error while exporting", "error");
      this.setState({
        isRequestFinished: true,
      });
    }
  };

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <CompareFormularies
            handleCompareBtn={this.handleCompareBtn}
            handleCompareClear={this.handleCompareClear}
            baseFormulary={this.state.baseformulary}
            refFormulary={this.state.referenceformulary}
          />
        );
      case 1:
        return (
          <ViewFormularies
            handleViewBtn={this.handleViewBtn}
            handleViewClear={this.handleViewClear}
          />
        );
      /*case 2:
        return <div>HPMS SUMMARY</div>;*/
      case 3:
        return <ComponentActivity />;
      case 4:
        return <VersionDrugActivity />;
      default:
        return null;
    }
  };
  render() {
    const { activeTabIndex, isCompareClicked, isViewClicked } = this.state;
    if (!this.state.isRequestFinished) {
      return <FrxLoader />;
    }
    return (
      <>
        <div className="bordered">
          <FrxTabs
            tabList={this.state.tabs}
            activeTabIndex={activeTabIndex}
            onClickTab={this.onClickTab}
          />

          <div className="inner-container white-bg">
            {this.renderActiveTabContent()}
          </div>
        </div>
        {activeTabIndex === 0 && isCompareClicked ? (
          <div className="bordered m-t-10 compare-table-root">
            <div className="header white-bg flex-container compare-grid-header-download">
              <h4 className="formulary-assembly-components__container-header-title">
                COMPARISON OF FORMULARIES
              </h4>
              <div className="action-wrapper">
                <div className="item-download">
                  <label>Summary</label>
                  <svg
                    onClick={() => {
                      this.handeReportDownload("summary");
                    }}
                    style={{ marginLeft: 5 }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                      fill="#1D54B4"
                    />
                  </svg>
                </div>
                <div className="item-download">
                  <label style={{ marginLeft: 10 }}>Details</label>
                  <svg
                    onClick={() => {
                      this.handeReportDownload("detials");
                    }}
                    style={{ marginLeft: 5 }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                      fill="#1D54B4"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="inner-container white-bg p-10">
              <CompareTable
                baseformulary={Object.assign({}, this.state.baseformulary)}
                referenceformulary={Object.assign(
                  {},
                  this.state.referenceformulary
                )}
                sectionSelected={this.sectionSelected}
              />
            </div>
          </div>
        ) : null}
        {activeTabIndex === 1 && isViewClicked ? (
          <div className="bordered m-t-10 compare-table-root">
            <div className="header white-bg flex-container">
              <label>summary of rxcui count</label>
              
            </div>
            <div className="inner-container white-bg p-10">
              <ViewTable
                baseformulary={Object.assign({}, this.state.baseformulary)}
              />
            </div>
          </div>
        ) : null}
        {activeTabIndex === 2  ? (
          <div className="bordered m-t-10 compare-table-root">
            <div className="header white-bg flex-container">
              <label>HPMS FRF SUBMISSION FILE SUMMARY</label>
              <div className="action-wrapper">
              <div className="item-download">
                  <label>Notes</label>
                  
                  <FileIcon/>
                </div>
                <div className="item-download">
                  <label>Summary</label>
                  <svg
                    onClick={() => {
                      this.handleHPMSExport();
                    }}
                    style={{ marginLeft: 5 }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                      fill="#1D54B4"
                    />
                  </svg>
                </div>
                
              </div>
            </div>
            <div className="inner-container white-bg p-10">
              <HpmsSummary
                baseformulary={Object.assign({}, this.state.baseformulary)}
              />
            </div>
          </div>
        ) : null}
        {this.state.activeTabIndex === 4 ?<VersionDrugActivityGrid />: null}
        <ToastContainer />
      </>
    );
  }
}
export default connect(mapStateToProps, null)(CompareView);