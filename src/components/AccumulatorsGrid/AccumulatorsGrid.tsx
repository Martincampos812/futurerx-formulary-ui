/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import { accumulatorGridColumns } from "../../utils/grid/columns";
import { getAccumulatorGridData } from "../../mocks/grid/accumulator-mock";
import "./AccumulatorsGrid.scss";

export interface AccumulatorsGridProps {}

export interface AccumulatorsGridState {}

class AccumulatorsGrid extends React.Component<
  AccumulatorsGridProps,
  AccumulatorsGridState
> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    //fetch data from API
    const data = getAccumulatorGridData();
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

  render() {
    const columns = accumulatorGridColumns();
    return (
      <div className="accumulator-grid-root">
        <FrxGridContainer
          enableSearch
          enableColumnDrag
          onSearch={this.handleSearch}
          enableSettings
          fixedColumnKeys={["claimId"]}
          gridName="ACCUMULATORS"
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          data={this.state.filteredData}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          scroll={{ x: 1500, y: 420 }}
        />
      </div>
    );
  }
}

export default AccumulatorsGrid;
