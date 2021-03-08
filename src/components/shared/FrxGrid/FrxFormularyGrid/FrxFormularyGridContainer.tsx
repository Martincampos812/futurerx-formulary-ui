/**
 * Container component for grid and search
 *
 * REFER - CLAIMSGRID.tsx for usage
 */

import * as React from "react";
import { Component } from "react";
import FrxLoader from "../../FrxLoader/FrxLoader";

import FrxFormularyGrid from "./FrxFormularyGrid";
import "./FrxFormularyGridContainer.scss";
import { Column, PagintionPosition, Grid } from "../../../../models/grid.model";

import ClaimsSearch from "../../../ClaimsSearch/ClaimsSearch";
import AuthsAndOverridesSearch from "../../../AuthsAndOverridesSearch/AuthsAndOverridesSearch";
import CallsSearch from "../../../communication/Search/CallsSearch/CallsSearch";
import DocumentsSearch from "../../../communication/Search/DocumentsSearch/DocumentsSearch";
import OtherSearch from "../../../communication/Search/OtherSearch/OtherSearch";
import ClaimsHistorySearch from "../../../ClaimsGridModel/Components/ClaimsHistory/ClaimsHistorySearch";
import PaDashboardSearch from "../../../PA-Dashboard/Components/PaDashboardGrid/PaDashboardSearch";
import GrievancesDashboardSearch from "../../../GrivencesDashboard/Components/GrivencesDashboardGrid/GrivencesDashboardSearch";
import FrxGenericSearch from "../../FrxGenericSearch/FrxGenericSearch";
import { getPaCasesSearchData } from "../../../../mocks/search/pa-cases-search-mock";
import PrescriberProfileSearch from "../../../prescriber/ClaimGridComponent/ProfileClaimGridSearch";

interface FrxGridContainerProps<T> extends Grid<T> {
  // data: any[];
  // columns: Column<any>[];
  //
  // name: string;
  // enableColumnDrag?: boolean;
  //
  // pagintionPosition: PagintionPosition;
  // fixedColumnKeys: string[];
  // onSettingsClick?: "grid-menu";
  // summary?: (data: any[]) => React.ReactNode;
  enableSearch: boolean;
  isFetchingData: boolean;
  onSearch: (searchObject: any) => void;
  searchOptions?: any;
}
class FrxFormularyGridContainer extends Component<FrxGridContainerProps<any>> {
  /**
   * @function getSearchComponent
   * to render appropriate search component
   */
  //getSearchComponent = () => {
  // const componentType = this.props.gridName;
  // switch (componentType) {
  //   case "FORMULARY":
  //     return <ClaimsSearch onSearch={this.handleSearch} />;
  //   case "CLAIMS":
  //     return <ClaimsSearch onSearch={this.handleSearch} />;
  //   case "AuthsAndOverrides":
  //     return <AuthsAndOverridesSearch onSearch={this.handleSearch} />;
  //   case "CALLS":
  //     return <CallsSearch onSearch={this.handleSearch} />;
  //   case "DOCUMENTS":
  //     return <DocumentsSearch onSearch={this.handleSearch} />;
  //   case "OTHER":
  //     return <OtherSearch onSearch={this.handleSearch} />;
  //   case "CLAIMSHISTORY":
  //     return <ClaimsHistorySearch onSearch={this.handleSearch} />;
  //   case "GENERIC":
  //     return (
  //       <FrxGenericSearch
  //         searchOptions={
  //           this.props.searchOptions ? this.props.searchOptions : []
  //         }
  //         onSearch={this.handleSearch}
  //       />
  //     );
  //   case "PA":
  //     return (
  //       <FrxGenericSearch
  //         searchOptions={getPaCasesSearchData()}
  //         onSearch={this.handleSearch}
  //       />
  //     );
  //   case "GRIEVANCES":
  //     return <GrievancesDashboardSearch onSearch={this.handleSearch} />;
  //   case "PROFILE CLAIM":
  //     return <PrescriberProfileSearch onSearch={this.handleSearch} />;
  //   default:
  //     console.log("No matching component");
  // }
  //   };
  /**
   * @function handleSearch
   * to handle the search from FrxSearch and pass it to parent to handle data fetching
   *
   * TODO: fix a type for the searchObject
   * @author Deepak_T
   */
  handleSearch = (searchObject) => {
    this.props.onSearch(searchObject);
  };

  render() {
    return (
      <div className="frx-grid-container">
        {/* {this.props.enableSearch ? this.getSearchComponent() : null} */}
        <FrxFormularyGrid
          bordered={this.props.bordered}
          columns={this.props.columns}
          gridName={this.props.gridName}
          fixedColumnKeys={this.props.fixedColumnKeys}
          showSettingsMenu
          hideClearFilter={this.props.hideClearFilter}
          hideItemsPerPage={this.props.hideItemsPerPage}
          enableColumnDrag={this.props.enableColumnDrag}
          loading={{
            spinning: this.props.isFetchingData,
            indicator: <FrxLoader />,
          }}
          hideMultiSort={this.props.hideMultiSort}
          hidePagination={this.props.hidePagination}
          hidePageJumper={this.props.hidePageJumper}
          hideResults={this.props.hideResults}
          pagintionPosition={this.props.pagintionPosition}
          data={this.props.data}
          scroll={this.props.scroll ? this.props.scroll : { x: 400, y: 420 }}
          enableSettings={this.props.enableSettings}
          onSettingsClick={this.props.onSettingsClick}
          settingsTriDotMenuClick={this.props.settingsTriDotMenuClick}
          settingsTriDotClick={this.props.settingsTriDotClick}
          enableResizingOfColumns
          onColumnCellClick={this.props.onColumnCellClick}
          summary={this.props.summary ? this.props.summary : undefined}
          isRowSelectionEnabled={this.props.isRowSelectionEnabled}
          rowSelectionChange={this.props.rowSelectionChange}
          settingsWidth={
            this.props.settingsWidth ? this.props.settingsWidth : undefined
          }
          isRowSelectorCheckbox={this.props.isRowSelectorCheckbox}
          isPinningEnabled={this.props.isPinningEnabled}
          rowSelection={this.props.rowSelection}
          expandable={{
            isExpandable: this.props.expandable
              ? this.props.expandable.isExpandable
              : undefined,
            expandIconColumnIndex: this.props.expandable
              ? this.props.expandable.expandIconColumnIndex
              : undefined,
            expandedRowRender:
              this.props.expandable && this.props.expandable.expandedRowRender
                ? this.props.expandable.expandedRowRender
                : undefined,
            expandOpenIcon:
              this.props.expandable && this.props.expandable.expandOpenIcon
                ? this.props.expandable.expandOpenIcon
                : undefined,
            expandCloseIcon:
              this.props.expandable && this.props.expandable.expandCloseIcon
                ? this.props.expandable.expandCloseIcon
                : undefined,
            expandedRowClassName:
              this.props.expandable &&
              this.props.expandable.expandedRowClassName
                ? this.props.expandable.expandedRowClassName
                : undefined,
          }}
        />
      </div>
    );
  }
}

export default FrxFormularyGridContainer;
