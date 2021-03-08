/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import {
  _claimsGridColumns,
  _testClaimsGridColumns,
} from "../../utils/grid/columns";
// import { getClaimsGridData } from "../../mocks/grid/testClaims-mock";
import { getClaimsGridData } from "../../mocks/grid/Claims-mockdata";
import "./TestClaimsGrid.scss";
import MemberCostshare from "../MemberCostshare/MemberCostshare";
import { GridMenu } from "../../models/grid.model";
import FrxGridCompare from "../shared/FrxGrid/FrxGridCompare/FrxGridCompare";
import FrxLoader from "../shared/FrxLoader/FrxLoader";
import AuthGridModel from "../AuthsAndOverrides/AuthsAndOverridesEditMode/AuthGridModel";

export interface TestClaimsGridProps {
  columns: any;
  data: any;
  type: string;
  header: any;
  hideSettings?: boolean;
  searchOptions?: any;
  settingsTriDotMenuClick?: any;
  onColumnCellClick: any;
  searchType?: any;
  settingsWidth: any;
}

export interface TestClaimsGridState {
  isFetchingData: boolean;
  data: any;
  filteredData: any;
  isCompareOpen: boolean;
  searchOptions: any;
  width: number;
  selectedItem: any;
  openPopup: boolean;
}

class TestClaimsGrid extends React.Component<
  TestClaimsGridProps,
  TestClaimsGridState
> {
  state = {
    isFetchingData: true,
    data: [] as any[],
    filteredData: [] as any[],
    isCompareOpen: false,
    searchOptions: undefined,
    width: 0,
    selectedItem: undefined,
    openPopup: false,
  };

  componentDidMount() {
    //fetch data from API
    const data = this.props.data();

    this.setState({
      data,
      filteredData: data,
      searchOptions: this.props.searchOptions()
        ? this.props.searchOptions()
        : [],
    });
    this.calculateTableWidth(this.props.columns);
    setTimeout(() => {
      this.setState({ isFetchingData: false });
    }, 1000);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.type !== this.props.type) {
      const data = newProps.data();

      this.setState({
        data,
        isFetchingData: true,
        filteredData: data,
        searchOptions: newProps.searchOptions() ? newProps.searchOptions() : [],
      });
      setTimeout(() => {
        this.setState({ isFetchingData: false });
      }, 1000);
    }
  }
  /**
   * @function handleSearch
   * to handle the search from FrxSearch and update data set passed to FrxGrid
   *
   * TODO: fix a type for the searchObject
   * @author virinchi
   */
  handleSearch = (searchObject) => {
    console.log(searchObject);

    this.setState({ isFetchingData: true });
    if (searchObject) {
      var searchData: any = [].concat.apply(
        [],
        this.state.data.map((item: any) =>
          searchObject
            .map((_item: any) => {
              return item[_item.key]
                ? item[_item.key]
                    .toLocaleLowerCase()
                    .includes(_item.value.toLocaleLowerCase())
                  ? item
                  : undefined
                : undefined;
            })
            .filter((item: any) => item !== undefined)
        )
      );
      console.log(searchData);
      this.setState({
        isFetchingData: true,
        filteredData: searchData.reduce(
          (unique: any, item: any) =>
            unique.includes(item) ? unique : [...unique, item],
          []
        ),
      });
      setTimeout(() => {
        this.setState({
          isFetchingData: false,
        });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  /**
   * @function calculateTableWidth
   * to handle the search from FrxSearch and update data set passed to FrxGrid
   *
   * TODO: fix a type for the searchObject
   * @author virinchi
   */
  calculateTableWidth = (columns: any) => {
    this.setState({
      width: columns().reduce((_item: any, item: any) => {
        return { pixelWidth: item.pixelWidth + _item.pixelWidth };
      }).pixelWidth,
    });
  };
  /**
   * @function settingsTriDotMenuClick
   * to handle the click on menu item that opens on tridot in settigns column in grid
   *
   * NOTE: Added for reference when required
   * @author virinchi
   */
  settingsTriDotMenuClick = (menuItem: GridMenu) => {
    if (menuItem.title === "Modify Auth or Override") {
      this.setState({
        openPopup: true,
      });
    }
    if (this.props.settingsTriDotMenuClick) {
      console.log("tridot menu clicked", menuItem);

      this.props.settingsTriDotMenuClick(() => {
        this.setState({ isCompareOpen: true });
      }, menuItem);
    }
  };

  /**
   * @function settingsTriDotClick
   * to handle the click on tridot in settigns column in grid
   *
   * NOTE: Added for reference when required
   * @author virinchi
   */
  settingsTriDotClick = (data: any) => {
    console.log("tri dot clicked ", data);
    this.setState({
      selectedItem: data,
    });
  };

  render() {
    const { openPopup, selectedItem } = this.state;
    const columns = this.props.columns
      ? typeof this.props.columns === "function"
        ? this.props.columns()
        : this.props.columns
      : [];
    return this.state.isFetchingData ? (
      <FrxLoader />
    ) : (
      <>
        {this.props.header(() => {
          this.setState({ isCompareOpen: true });
        })}
        <div className="grid">
          <div
            className={
              this.props.searchType === "communicationscall" ||
              this.props.searchType === "communicationsother"
                ? "advanced-search-calls-grid"
                : "test-claims-grid-root"
            }
          >
            <FrxGridContainer
              enableSearch
              enableColumnDrag
              onSearch={this.handleSearch}
              fixedColumnKeys={["claimId"]}
              pagintionPosition="topRight"
              gridName={"GENERIC"}
              isFetchingData={this.state.isFetchingData}
              columns={columns}
              enableSettings={!this.props.hideSettings}
              enableResizingOfColumns
              data={this.state.filteredData}
              onSettingsClick="grid-menu"
              settingsWidth={28}
              scroll={{ x: this.state.width, y: 400 }}
              settingsTriDotClick={this.settingsTriDotClick}
              settingsTriDotMenuClick={this.settingsTriDotMenuClick}
              searchOptions={
                this.state.searchOptions ? this.state.searchOptions : []
              }
              onColumnCellClick={this.props.onColumnCellClick}
            />
          </div>
        </div>
        {/* {this.state.isCompareOpen && (
          <FrxGridCompare
            onClose={() => {
              this.setState({
                isCompareOpen: !this.state.isCompareOpen,
                selectedItem: undefined,
              });
            }}
            type={
              this.props.type === "CLAIMSHISTORY" ? "testClaimId" : "claimId"
            }
            openPopup={this.state.isCompareOpen}
            mode={this.state.selectedItem ? "single" : "multi"}
            selectedItem={this.state.selectedItem}
          />
        )}
        {this.state.openPopup && (
          <AuthGridModel
            data={this.state.selectedItem}
            isOpen={this.state.openPopup}
            isEditCopy={false}
            onClose={() => {
              this.setState({openPopup: false, selectedItem: {}});
            }}
          />
        )} */}
      </>
    );
  }
}

export default TestClaimsGrid;
