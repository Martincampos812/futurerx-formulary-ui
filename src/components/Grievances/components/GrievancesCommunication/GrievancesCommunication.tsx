import React from "react";
import { Grid, Button } from "@material-ui/core";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import FrxGrid from "../../../shared/FrxGrid/FrxGrid";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";

import "./GrievancesCommunication.scss";
import SimpleSearch from "../../../communication/Search/SimpleSearch/SimpleSearch";
import NotesPopup from "../../../member/MemberNotesPopup";
import ViewSelected from "./ViewSelected";

const sampleImage = require("../../../../mocks/sample.svg");

declare type tabType = "form" | "grid";

interface CommunicationProps {
  onClose?: any;
  openPopup?: any;
  title: string;
  className?: string;
  showTabs?: boolean;
  tabs?: any;
  tabTypes?: tabType[];
  formFields?: any;
  data: any;
  columns: any;
}
interface CommunicationState {
  activeMiniTabIndex: number;
  miniTabs: any;
  filteredData: any;
  isFetchingData: boolean;
  data: any;
  openPopup: boolean;
  poupType: any;
  selectedRow: any;
  isNotesOpen: boolean;
  isChecked?: any[];
  viewselecteMsgCount?: number;
}

class Communication extends React.Component<
  CommunicationProps,
  CommunicationState
> {
  state = {
    activeMiniTabIndex: 0,
    filteredData: [],
    isFetchingData: false,
    data: [],
    openPopup: false,
    poupType: { title: "" },
    selectedRow: { index: "" },
    miniTabs: this.props.tabs,
    isNotesOpen: false,
    isChecked: [] as any,
    viewselecteMsgCount: 0,
  };

  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  /**
   *@function onClose
   *
   * Close the member audit popup
   * will call callback function from onclose parameter.
   * @memberof MemberPopup
   */

  onClose = () => {
    // this.props.onClose();
    alert("Closed");
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

  handleCheck = (e) => {
    if (e.checked) {
      this.setState(
        {
          isChecked: [...this.state.isChecked, e.id],
        },
        () => {
          if (this.props.tabs.length <= 2) {
            this.props.tabs.push({ id: 3 });
          }
          this.props.tabs[2].text = `View Selected (${this.state.isChecked.length})`;
          this.setState({
            miniTabs: this.props.tabs,
            viewselecteMsgCount: this.state.isChecked.length,
          });
        }
      );
    } else {
      let remove = this.state.isChecked.indexOf(e.id);
      this.setState(
        {
          isChecked: this.state.isChecked.filter((_, i) => i !== remove),
        },
        () => {
          console.log(this.state.isChecked.length);
          if (this.state.isChecked.length === 0) {
            this.props.tabs.pop();
          } else {
            this.props.tabs[2].text = `View Selected (${this.state.isChecked.length})`;
          }
          this.setState({
            miniTabs: this.props.tabs,
            viewselecteMsgCount: this.state.isChecked.length,
          });
        }
      );
    }
  };

  processData(num: number) {
    const data = this.props.data[num];
    this.setState({ data, filteredData: data, isFetchingData: false });
  }
  componentDidMount() {
    this.processData(0);
  }
  rowSelectionChange = (dataRow: any) => {};

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
    if (num < 2 && this.props.tabs.length === 3) {
      this.props.tabs.pop();
    }
    if (num === 2) {
      this.props.tabs[2].text = "View Selected";
    }
    this.setState({
      activeMiniTabIndex: num,
      isChecked: [],
    });
    this.processData(num);
  };

  clearSelected = () => {
    this.props.tabs.pop();
    this.setState({ miniTabs: this.props.tabs });
    this.setState({
      activeMiniTabIndex: 0,
    });
    this.processData(0);
  };

  // {/* <div
  //     className={`frx-grid-container ${
  //       this.props.showTabs ? "borderTop" : ""
  //     }`}
  // > */}
  render() {
    // title=""
    // onClose={this.onButtonClick}
    // openPopup={true}
    // const data={getCommunicationsGrievancesData()}
    // const  columns={getCommunicationsGrievances()}
    // showTabs={true}
    // tabs={[{ id: 1, text: 'Inbound' }, { id: 2, text: 'Outbound' }]}
    // tabTypes={["grid", "form"]}
    const { columns } = this.props;
    return (
      <>
        <div className="communication-info">
          {this.props.showTabs && (
            <div className="com-tabs">
              <FrxMiniTabs
                tabList={
                  this.props.tabs ? this.props.tabs : this.state.miniTabs
                }
                activeTabIndex={this.state.activeMiniTabIndex}
                onClickTab={this.onClickMiniTab}
                msgCount={this.state.isChecked.length}
              />
              <div className="title">
                <label className="member-notification-root__header-text">
                  {this.state.activeMiniTabIndex != 2
                    ? this.props.tabs[this.state.activeMiniTabIndex]["text"]
                    : "View"}{" "}
                  Communications
                </label>
                {this.state.activeMiniTabIndex === 2 && (
                  <span className="advanced-grid-search__action">
                    <Button
                      className="advanced-grid-search__btn-clear"
                      onClick={this.clearSelected}
                    >
                      <svg
                        className="advanced-grid-search__btn-clear--clearicon"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z"
                          fill="#666666"
                        />
                        <path
                          d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z"
                          fill="#666666"
                        />
                      </svg>
                      <span>Clear</span>
                    </Button>
                  </span>
                )}
                {this.state.isNotesOpen ? (
                  <NotesPopup
                    category="Communications"
                    openPopup={this.state.isNotesOpen}
                    onClose={this.handleCloseNote}
                  />
                ) : (
                  ""
                )}
                <span className="member-notification-header__icon-container">
                  <svg
                    onClick={this.handleCloseNote}
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="member-notification-header--noteicon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                      fill="#2055B5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          )}
          <div className="communication-table-wrapper">
            {this.props.showTabs && this.state.activeMiniTabIndex !== 2 ? (
              <SimpleSearch onSearch={this.handleSearch} />
            ) : null}
            {this.state.activeMiniTabIndex === 0 && (
              <>
                <FrxGrid
                  showSettingsMenu={true}
                  isRowSelectionEnabled={true}
                  isRowSelectorCheckbox
                  rowSelectionChange={this.rowSelectionChange}
                  enableColumnDrag={false}
                  pagintionPosition="bottomRight"
                  columns={columns}
                  handleCheck={this.handleCheck}
                  data={this.state.filteredData}
                  gridName={this.props.title}
                  fixedColumnKeys={["record_type"]}
                  hideClearFilter={true}
                  hideItemsPerPage={false}
                  loading={{
                    spinning: this.state.isFetchingData,
                    indicator: <FrxLoader />,
                  }}
                  hideMultiSort={false}
                  hidePageJumper={true}
                  hidePagination={true}
                  hideResults={false}
                  scroll={{ x: 860, y: 350 }}
                  enableSettings={true}
                  rowClassName={(record, index) => {
                    console.log(record, index);
                    return record.index === this.state.selectedRow.index
                      ? "selt"
                      : "not-selt";
                  }}
                  settingsTriDotMenuClick={(item: any) => {
                    if (item.title === "Term Record") {
                      this.setState({ openPopup: true, poupType: item });
                    } else if (item.title === "Add Note") {
                      this.setState({ openPopup: true, poupType: item });
                    }
                  }}
                  onSettingsClick="grid-menu"
                />
              </>
            )}
            {this.state.activeMiniTabIndex === 1 && (
              <>
                <FrxGrid
                  showSettingsMenu={true}
                  isRowSelectionEnabled={true}
                  isRowSelectorCheckbox
                  enableColumnDrag={false}
                  handleCheck={this.handleCheck}
                  pagintionPosition="bottomRight"
                  columns={columns}
                  data={this.state.filteredData}
                  gridName={this.props.title}
                  fixedColumnKeys={["record_type"]}
                  hideClearFilter={true}
                  hideItemsPerPage={false}
                  loading={{
                    spinning: this.state.isFetchingData,
                    indicator: <FrxLoader />,
                  }}
                  hideMultiSort={false}
                  hidePageJumper={true}
                  hidePagination={true}
                  hideResults={false}
                  scroll={{ x: 860, y: 350 }}
                  enableSettings={true}
                  rowClassName={(record, index) => {
                    console.log(record, index);
                    return record.index === this.state.selectedRow.index
                      ? "selt"
                      : "not-selt";
                  }}
                  settingsTriDotMenuClick={(item: any) => {
                    if (item.title === "Term Record") {
                      this.setState({ openPopup: true, poupType: item });
                    } else if (item.title === "Add Note") {
                      this.setState({ openPopup: true, poupType: item });
                    }
                  }}
                  onSettingsClick="grid-menu"
                />
              </>
            )}
            {this.state.activeMiniTabIndex === 2 && (
              <ViewSelected
                viewselecteMsgCount={this.state.viewselecteMsgCount}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Communication;
