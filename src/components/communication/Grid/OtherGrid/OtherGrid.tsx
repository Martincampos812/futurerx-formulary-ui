/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import {otherGridColumns} from "../../../../utils/grid/columns";
import {getOthersGridData} from "../../../../mocks/grid/others-mock";
import "./OtherGrid.scss";
import {getCommunicationSearchMock_other} from "../../../../mocks/search/communication-search-mock";

export interface AuthsAndOverridesGridProps {}

export interface AuthsAndOverridesGridState {}

class AuthsAndOverridesGrid extends React.Component<
  AuthsAndOverridesGridProps,
  AuthsAndOverridesGridState
> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
  };

  componentDidMount() {
    //fetch data from API
    const data = getOthersGridData();
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

  render() {
    const columns = otherGridColumns();
    return (
      <div className="other-grid-root">
        <FrxGridContainer
          enableSearch
          enableSettings
          onSearch={this.handleSearch}
          fixedColumnKeys={["auth-overrideid"]}
          gridName="GENERIC"
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          searchOptions={getCommunicationSearchMock_other()}
          data={this.state.filteredData}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          settingsWidth={45}
          scroll={{x: 1500, y: 420}}
        />
      </div>
    );
  }
}

export default AuthsAndOverridesGrid;
