import * as React from "react";
import "./ClaimsHistory.scss";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import { claimsHistoryGridColumns } from "../../../../utils/grid/columns";
import { getClaimsHistoryGridData } from "../../../../mocks/grid/claim-history-mock";
import ClaimsGrid from "../../../ClaimsGrid/ClaimsGrid";
import { GridMenu } from "../../../../models/grid.model";

export interface ClaimsHistoryProps {

}

export interface ClaimsHistoryState {}

class ClaimsHistory extends React.Component<ClaimsHistoryProps, ClaimsHistoryState> {
  state={
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  }

  componentDidMount() {
    //fetch data from API
    const data = getClaimsHistoryGridData();
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
    render() {
      const columns = claimsHistoryGridColumns();
      return (
        <div className="claims-history-root scroll-bar">
             <FrxGridContainer
              enableSearch
							enableColumnDrag
							enableSettings
              onSearch={this.handleSearch}
              fixedColumnKeys={["claimId"]}
              pagintionPosition="topRight"
              gridName="CLAIMSHISTORY"
              isFetchingData={this.state.isFetchingData}
              columns={columns}
              enableResizingOfColumns
              data={this.state.filteredData}
              onSettingsClick="grid-menu"
              settingsWidth={25}
              scroll={{ x: 3800, y: 377 }}
              />
        </div>
      ); 
    }
}
export default ClaimsHistory;