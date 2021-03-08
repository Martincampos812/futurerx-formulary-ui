/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import { auditGridColumns } from "../../utils/grid/columns";
import { getCallsAuditGridData, gridTotalSummary } from "../../mocks/grid/calls-audit-table";
import "./AuditGrid.scss";

export interface AuditGridProps {}

export interface AuditGridProps {}

class AuditGrid extends React.Component<AuditGridProps, AuditGridProps> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    //fetch data from API
    const data = getCallsAuditGridData();
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

  showSummary = (record: any) => {
    console.log(record);
    return (
      <tr className="ant-table-row">
        <td className="ant-table-cell">Total</td>
        {gridTotalSummary.map((totalValue: any, i: number) => (
        <td className="ant-table-cell">{totalValue.totalValue}</td>
        ))}
      </tr>
    );
  };
 

  render() {
    const columns = auditGridColumns();
    return (
      <div className="audit-grid-root">
        <FrxGridContainer
					enableSearch
					// enableSettings
          onSearch={this.handleSearch}
          fixedColumnKeys={[""]}
          gridName="AUDIT"
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          data={this.state.filteredData}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          scroll={{ x: 1500, y: 420 }}
          hideClearFilter
          hideMultiSort
          summary={this.showSummary}
        />
      </div>
    );
  }
}

export default AuditGrid;
