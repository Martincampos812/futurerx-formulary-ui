/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import {
  claimsGridColumnsForRejectedAndTotal,
  claimsGridColumnsForPaid
} from "../../utils/grid/columns";
import { getClaimsGridData } from "../../mocks/grid/claims-mock";
import "./ClaimsGrid.scss";
import MemberCostshare from "../MemberCostshare/MemberCostshare";
import { GridMenu } from "../../models/grid.model";

export interface ClaimsGridProps {
  isPaid: boolean;
}

export interface ClaimsGridState {}

class ClaimsGrid extends React.Component<ClaimsGridProps, ClaimsGridState> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    //fetch data from API
    const data = getClaimsGridData();
    this.setState({ data, filteredData: data });
  }

  /**
   * @function handleSearch
   * to handle the search from FrxSearch and update data set passed to FrxGrid
   *
   * TODO: fix a type for the searchObject
   * @author Deepak_T
   */
  handleSearch = searchObject => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          d => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
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
  rowSelectionChange = (selectedRow: any, isMultiple?: boolean) => {
    console.log("data row ", selectedRow);

    if (!isMultiple) {
      const data = this.state.filteredData.map((d: any) => {
        if (d.id === selectedRow.id) d["isSelected"] = true;
        else d["isSelected"] = false;
        return d;
      });

      this.setState({ filteredData: data });
    }
  };

  render() {
    const columns = !this.props.isPaid
      ? claimsGridColumnsForRejectedAndTotal()
      : claimsGridColumnsForPaid();

    return (
      <div className="claims-grid-root">
        <FrxGridContainer
          enableSearch
          enableColumnDrag
          onSearch={this.handleSearch}
          fixedColumnKeys={["claimId"]}
          pagintionPosition="topRight"
          gridName="CLAIMS"
          enableSettings
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          // expandable={{
          //   isExpandable: true,
          //   expandIconColumnIndex: 1,
          //   expandedRowRender: props => <MemberCostshare {...props} />,

          //   expandOpenIcon: <span>O</span>,
          // expandCloseIcon: <span>X</span>
          // }}
          // settingsTriDotMenuClick={this.settingsTriDotMenuClick}
          // settingsTriDotClick={this.settingsTriDotClick}
          // onColumnCellClick={this.onColumnCellClick}
          // summary={this.showSummary}
          // isRowSelectionEnabled
          // rowSelectionChange={this.rowSelectionChange}
          // isRowSelectorCheckbox

          scroll={{ x: 3800, y: 377 }}
          enableResizingOfColumns
          data={this.state.filteredData}
        />
      </div>
    );
  }
}

export default ClaimsGrid;
