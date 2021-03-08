import * as React from "react";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import {grievancesGridColumns} from "../../../../utils/grid/columns";
import {getGrievencesDashboardGridData} from "../../../../mocks/grid/GrievenceGrid-mock";
import {GridMenu} from "../../../../models/grid.model";

export interface PaDashboardGridProps {
  isPaid: boolean;
  onColumnCellClick: any;
}

export interface PaDashboardGridState {}

class PaDashboardGrid extends React.Component<
  PaDashboardGridProps,
  PaDashboardGridState
> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
  };

  componentDidMount() {
    //fetch data from API
    const data = getGrievencesDashboardGridData();
    this.setState({data, filteredData: data});
  }

  /**
   * @function handleSearch
   * to handle the search from FrxSearch and update data set passed to FrxGrid
   *
   * TODO: fix a type for the searchObject
   * @author Deepak_T
   */
  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({isFetchingData: true});
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d) => d.status === searchObject.status
        );
        this.setState({isFetchingData: false, filteredData: newData});
      }, 2000);
    } else {
      this.setState({isFetchingData: false});
    }
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
  };

  /**
   * @function showSummary
   * to contruct the tr element to be shown at footer of grid
   * @param records is array of entire grid data on page
   * @author Deepak_T
   */
  showSummary = (record: any) => {
    console.log(record);
    return (
      <tr>
        <div>Total</div>
      </tr>
    );
  };

  /**
   * @function rowSelectionChange
   * handler for selection row checkbox
   * @param selectedRow is data row
   * @author Deepak_T
   */
  rowSelectionChange = (selectedRow: any) => {
    console.log("data row ", selectedRow);
  };

  render() {
    // const columns = !this.props.isPaid
    //   ? claimsGridColumnsForRejectedAndTotal()
    //   : claimsGridColumnsForPaid();
    const columns = grievancesGridColumns();
    return (
      <div className="claims-grid-root">
        <FrxGridContainer
          enableSearch
          enableColumnDrag
          onSearch={this.handleSearch}
          fixedColumnKeys={["grievance"]}
          pagintionPosition="topRight"
          gridName="GRIEVANCES"
          enableSettings
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          scroll={{x: 3000, y: 377}}
          enableResizingOfColumns
          data={this.state.filteredData}
          onSettingsClick="grid-menu"
          settingsWidth={30}
          onColumnCellClick={this.props.onColumnCellClick}
        />
      </div>
    );
  }
}

export default PaDashboardGrid;
