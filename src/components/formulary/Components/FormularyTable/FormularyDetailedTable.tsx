import React from "react";
// Material - ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// antd
import { Breadcrumb } from "antd";

// Components
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import {
  formularyGenericGridData,
  formularyAlternativeGridData
} from "../../../../mocks/grid/formulary-table";
import { GridMenu, Column } from "../../../../models/grid.model";
import FormularyDetailedHeader from "./FormularyDetailedHeader";
import FrxBreadCrumb from "../../../shared/FrxBreadCrumb/FrxBreadCrumb";

export interface FormularyDetailedTableProps {
  history: any;
  searchHistory: any[];
  columns: Column<any>[];
  data: any[];
  genericGridData: any[];
  alternateGridData: any[];
  isFetchingData: boolean;
  mainTableView?: boolean;
  filteredData: any[];
  selectedData: any;
  handleSearch: (search: any) => void;
  onSearchHistoryCreation: (data: any) => void;
  onBreadcrumbChange: (item: any) => void;
}

class FormularyDetailedTable extends React.Component<
  FormularyDetailedTableProps
> {
  state = {
    detailedTableView: true
  };
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
    if (key !== "labelname") return;
    this.props.onSearchHistoryCreation(data);
    this.setState({
      detailedTableView: false
    });
  };

  onBreadcrumbChange = (item: any) => {
    this.props.onBreadcrumbChange(item);
  };

  render() {
    const { genericGridData, filteredData } = this.props;
    console.log("genericGridData", genericGridData);
    return (
      <React.Fragment>
        <FrxBreadCrumb>
          <Breadcrumb
            className="formulary-table-breadcrumb"
            separator={
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.238661 0.223752C-0.0674302 0.531543 -0.0914508 0.960049 0.238661 1.33632L2.81024 4.09514L0.238662 6.85395C-0.0914508 7.23022 -0.0674301 7.65943 0.238662 7.96511C0.544067 8.2729 1.06017 8.25313 1.34704 7.96511C1.63392 7.67849 4.43678 4.65071 4.43678 4.65071C4.50943 4.57861 4.56721 4.49219 4.60668 4.39662C4.64614 4.30104 4.66648 4.19827 4.66648 4.09443C4.66648 3.99059 4.64614 3.88782 4.60668 3.79224C4.56721 3.69667 4.50943 3.61025 4.43678 3.53815C4.43678 3.53815 1.63392 0.511776 1.34704 0.223752C1.06017 -0.0649778 0.544067 -0.0840382 0.238661 0.223752Z"
                  fill="#666666"
                />
              </svg>
            }
          >
            <span className="breadcrumb-label">Search History:</span>
            {this.props.searchHistory.map((item: any, i: number) => (
              <Breadcrumb.Item
                onClick={() => this.onBreadcrumbChange(item)}
                key={i + ""}
              >
                <span className="breadcrumb-active">{item.labelname}</span>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </FrxBreadCrumb>
        <div className="formulary-detailed-table-root">
          {/* {this.state.detailedTableView && */}
          {this.props.searchHistory && this.props.searchHistory.length === 1 ? (
            <>
              <FormularyDetailedHeader rowData={this.props.selectedData} />
              <div className="formulary-detailed-table-root__searched">
                <h3 className="formulary-detailed-table-root__searched--heading">
                  Generic Equivalent
                </h3>
                <FrxGridContainer
                  enableSearch
                  enableColumnDrag
                  // enableSettings
                  onSearch={searchObject =>
                    this.props.handleSearch(searchObject)
                  }
                  fixedColumnKeys={[""]}
                  pagintionPosition="topRight"
                  gridName="FORMULARY TABLE"
                  isFetchingData={this.props.isFetchingData}
                  columns={this.props.columns}
                  enableResizingOfColumns
                  data={this.props.genericGridData}
                  onColumnCellClick={this.onColumnCellClick}
                  onSettingsClick="grid-menu"
                  hidePagination
                  scroll={{ x: 200, y: 182 }}
                />
              </div>
              <div className="formulary-detailed-table-root__searched">
                <h3 className="formulary-detailed-table-root__searched--heading">
                  Alternative Drug(s)
                </h3>
                <FrxGridContainer
                  enableSearch
                  enableColumnDrag
                  // enableSettings
                  onSearch={searchObject =>
                    this.props.handleSearch(searchObject)
                  }
                  fixedColumnKeys={[""]}
                  pagintionPosition="topRight"
                  gridName="FORMULARY TABLE"
                  isFetchingData={this.props.isFetchingData}
                  columns={this.props.columns}
                  enableResizingOfColumns
                  data={this.props.alternateGridData}
                  onColumnCellClick={this.onColumnCellClick}
                  onSettingsClick="grid-menu"
                  hidePagination
                  scroll={{ x: 200, y: 182 }}
                />
              </div>
            </>
          ) : (
            <>
              <FormularyDetailedHeader rowData={this.props.selectedData} />
              <div className="formulary-detailed-table-root__searched">
                <h3 className="formulary-detailed-table-root__searched--heading">
                  Alternative Drug(s)
                </h3>
                <FrxGridContainer
                  enableSearch
                  enableColumnDrag
                  // enableSettings
                  onSearch={searchObject =>
                    this.props.handleSearch(searchObject)
                  }
                  fixedColumnKeys={[""]}
                  pagintionPosition="topRight"
                  gridName="FORMULARY TABLE"
                  isFetchingData={this.props.isFetchingData}
                  columns={this.props.columns}
                  enableResizingOfColumns
                  data={this.props.alternateGridData}
                  onColumnCellClick={this.onColumnCellClick}
                  onSettingsClick="grid-menu"
                  hidePagination
                  scroll={{ x: 200, y: 182 }}
                />
              </div>
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default FormularyDetailedTable;
