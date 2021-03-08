import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import FrxGrid from "../shared/FrxGrid/FrxGrid";
import FrxLoader from "../shared/FrxLoader/FrxLoader";

import "./MemberPopup.scss";
import SimpleSearch from "../communication/Search/SimpleSearch/SimpleSearch";
import DiagnosisSearchForm from "../shared/FrxSearchForm/FrxSearchForm";
import FrxTermRecord from "../shared/FrxTermRecord/FrxTermRecord";

const sampleImage = require("../../mocks/sample.svg");

export declare type tabType = "form" | "grid";

interface MemberPopupProps {
  onClose: any;
  openPopup: any;
  title: string;
  className?: string;
  showTabs?: boolean;
  tabs?: any;
  tabTypes?: tabType[];
  formFields?: any;
  data: any;
  columns: any;
}
interface MemberPopupState {
  activeMiniTabIndex: number;
  miniTabs: any;
  filteredData: any;
  isFetchingData: boolean;
  data: any;
  openPopup: boolean;
  poupType: any;
  selectedRow: any;
}

class MemberPopup extends Component<MemberPopupProps, MemberPopupState> {
  state = {
    activeMiniTabIndex: 0,
    filteredData: [],
    isFetchingData: false,
    data: [],
    openPopup: false,
    poupType: { title: '' },
    selectedRow: { index: '', id: '' },
    miniTabs: [
      {
        id: 1,
        text: "Update"
      },
      {
        id: 2,
        text: "View"
      }
    ]
  };
  /**
   *@function onClose
   *
   * Close the member audit popup
   * will call callback function from onclose parameter.
   * @memberof MemberPopup
   */

  onClose = () => {
    this.props.onClose();
  };

  /**
   *@function onClickMiniTab
   *
   * onClickMiniTab the member audit popup
   *
   * @memberof MemberPopup
   */

  /**
   * Action method if any action is required for dialog popup
   *
   * @memberof MemberPopup
   */
  action = () => {
    console.log("no action to perform");
  };

  processData() {
    const data = this.props.data;
    this.setState({ data, filteredData: data, isFetchingData: false });
  }
  componentDidMount() {
    this.processData();
  }
  handleSearch = (searchObject: any) => {
    this.setState({ isFetchingData: true });
    if (searchObject) {
      setTimeout(() => {
        const newData = this.state.data.filter((item: any) =>
          Object.keys(item)
            .map((_item: any) =>
              item[_item]
                .toString()
                .toLocaleLowerCase()
                .includes(searchObject.searchText.toLocaleLowerCase())
            )
            .includes(true)
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });
  };
  render() {
    const columns = this.props.columns;

    return (
      <>
        <FrxDialogPopup
          positiveActionText=""
          negativeActionText="Close"
          title={this.props.title}
          handleClose={this.onClose}
          handleAction={this.action}
          open={this.props.openPopup}
          showActions={false}
          className={
            this.props.className ? this.props.className : "member-popup-root"
          }
          height="80%"
          width="90%"
        >
          <>
            <div
              className={`frx-grid-container ${this.props.showTabs ? "borderTop" : ""
                }`}
            >
              {this.props.showTabs && (
                <FrxMiniTabs
                  tabList={
                    this.props.tabs ? this.props.tabs : this.state.miniTabs
                  }
                  activeTabIndex={this.state.activeMiniTabIndex}
                  onClickTab={this.onClickMiniTab}
                />
              )}
              {this.state.activeMiniTabIndex === 0 && (
                <>
                  {this.props.showTabs ? (
                    <SimpleSearch onSearch={this.handleSearch} />
                  ) : (
                      <div className="noSpacing">
                        <SimpleSearch onSearch={this.handleSearch} />
                      </div>
                    )}
                  <FrxGrid
                    showSettingsMenu={true}
                    enableColumnDrag={false}
                    pagintionPosition="bottomRight"
                    columns={columns}
                    data={this.state.filteredData}
                    gridName={this.props.title}
                    fixedColumnKeys={["record_type"]}
                    hideClearFilter={true}
                    hideItemsPerPage={false}
                    loading={{
                      spinning: this.state.isFetchingData,
                      indicator: <FrxLoader />
                    }}
                    hideMultiSort={true}
                    hidePageJumper={true}
                    hidePagination={false}
                    hideResults={false}
                    scroll={{ x: 860, y: 350 }}
                    enableSettings={true}
                    rowClassName={(record, index) => {
                      console.log(record, index);
                      return record.index === this.state.selectedRow.index ? 'selt' : 'not-selt';
                    }}
                    expandable={{
                      isExpandable: this.state.openPopup,
                      expandIconColumnIndex: 21,
                      expandOpenIcon: <span className="openIcon"></span>,
                      expandedRowClassName: ((record, index) => {
                        console.log(record, index);
                        return record.id === this.state.selectedRow.id ? 'expand-selected' : 'not-selected';
                      }),
                      expandCloseIcon: <div className="closeIcon" onClick={() => { this.setState({ openPopup: false, selectedRow: {} }) }}>X</div>,
                      expandedRowRender: (props: any): any => {
                        return props.data.id === this.state.selectedRow.id
                          ? <FrxTermRecord isNotesPopup={this.state.poupType.title === 'Add Note'} close={() => { this.setState({ openPopup: false, selectedRow: {} }) }} />
                          : <></>
                      }
                    }}
                    settingsTriDotMenuClick={(item: any) => {
                      if (!this.state.openPopup) {
                        if (item.title === 'Term Record') {
                          this.setState({ openPopup: true, poupType: item })
                        } else if (item.title === 'Add Note') {
                          this.setState({ openPopup: true, poupType: item })
                        }
                      }
                    }}
                    settingsTriDotClick={(item: any) => {
                      if (!this.state.openPopup) {
                        this.setState({
                          selectedRow: item
                        })
                      }
                    }}
                    onSettingsClick={this.state.openPopup ? undefined : 'grid-menu'}
                  />
                </>
              )}
              {this.state.activeMiniTabIndex === 1 && (
                <DiagnosisSearchForm
                  searchPlaceholderText={
                    this.props.title === "Clinical Diagnosis"
                      ? "Search Diagnosis Code"
                      : this.props.title === "BARRIERS"
                        ? "Search Barrier Description"
                        : "Search Diagnosis Code"
                  }
                  formList={this.props.formFields ? this.props.formFields : []}
                />
              )}
            </div>
          </>
        </FrxDialogPopup>
      </>
    );
  }
}

export default MemberPopup;
