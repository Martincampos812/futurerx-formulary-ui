import React from "react";
import "./FormularyTable.scss";
// Material - ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// antd
import { Breadcrumb } from "antd";

// Components
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import { formularyGridColumns } from "../../../../utils/grid/columns";
import { formularyGridData } from "../../../../mocks/grid/formulary-table";
import { GridMenu, Column } from "../../../../models/grid.model";
import FormularyDetailedTable from "./FormularyDetailedTable";

export interface FormularyTableProps {
  history: any;
  searchHistory: any[];
  columns: Column<any>[];
  data: any[];
  isFetchingData: boolean;
  mainTableView?: boolean;
  selectedData: any;
  handleSearch: (search: any) => void;
  onSearchHistoryCreation: (data: any) => void;
  onBreadcrumbChange: (item: any) => void;
}

class FormularyTable extends React.Component<FormularyTableProps> {
  /**
   * @function settingsTriDotMenuClick
   * to handle the click on menu item that opens on tridot in settigns column in grid
   *
   * NOTE: Added for reference when required
   * @author Deepak_T
   */
  settingsTriDotMenuClick = (menuItem: GridMenu) => {
    console.log("tridot menu clicked", menuItem);
  };

  /**
   * @function settingsTriDotClick
   * to handle the click on tridot in settigns column in grid
   *
   * NOTE: Added for reference when required
   * @author Deepak_T
   */
  settingsTriDotClick = (data: any) => {
    console.log("tri dot clicked ", data);
  };

  /**
   * @function onColumnCellClick
   * to handle the click on a particular cell
   *
   * NOTE: Added for reference when required
   * @author Deepak_T
   */
  onColumnCellClick = (data, key) => {
    console.log("cell clicked ", data, key);
    // this.props.history.push("/")
    if(key=== "labelname")this.props.onSearchHistoryCreation(data);
  };

  onBreadcrumbChange = (item: any) => {
    this.props.onBreadcrumbChange(item);
  };
  render() {
    return (
      <>
        <div className="formulary-table-root">
          <FrxGridContainer
            enableSearch
            enableColumnDrag
            // enableSettings
            onSearch={searchObject => this.props.handleSearch(searchObject)}
            fixedColumnKeys={[""]}
            pagintionPosition="topRight"
            gridName="FORMULARY TABLE"
            isFetchingData={this.props.isFetchingData}
            columns={this.props.columns}
            enableResizingOfColumns
            data={this.props.data}
            onColumnCellClick={this.onColumnCellClick}
            onSettingsClick="grid-menu"
            hideClearFilter
            hideMultiSort
            hidePageJumper
          />
        </div>
      </>
    );
  }
}

export default FormularyTable;
