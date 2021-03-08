/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import { callsGridColumns } from "../../../../utils/grid/columns";
import { getCallsGridData } from "../../../../mocks/grid/calls-mock";
import CallsListDetails from "../../CallListDetails";
import "./CallsGrid.scss";
import { getCommunicationSearchMock_calls } from "../../../../mocks/search/communication-search-mock";

export interface AuthsAndOverridesGridProps {}

export interface AuthsAndOverridesGridState {}

class AuthsAndOverridesGrid extends React.Component<
  AuthsAndOverridesGridProps,
  AuthsAndOverridesGridState
> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    //fetch data from API
    const data = getCallsGridData();
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
    const columns = callsGridColumns();
    return (
      <div className="calls-grid-root">
        <FrxGridContainer
          enableSearch
          enableSettings
          onSearch={this.handleSearch}
          fixedColumnKeys={["auth-overrideid"]}
          gridName="GENERIC"
          searchOptions={getCommunicationSearchMock_calls()}
          isFetchingData={this.state.isFetchingData}
          columns={columns}
          data={this.state.filteredData}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          settingsWidth={40}
          scroll={{ x: 1900, y: 420 }}
          expandable={{
            isExpandable: true,
            // 11 => length of columns - 1 if enableSettings is not there or length of columns
            expandIconColumnIndex: 11,
            expandedRowRender: props => <CallsListDetails />,
            expandCloseIcon: (
              <span>
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.223752 4.78771C0.531543 5.0938 0.960049 5.11782 1.33632 4.78771L4.09514 2.21612L6.85395 4.78771C7.23022 5.11782 7.65943 5.0938 7.96511 4.78771C8.2729 4.4823 8.25313 3.9662 7.96511 3.67932C7.67849 3.39245 4.65071 0.589584 4.65071 0.589584C4.57861 0.516936 4.49219 0.459156 4.39662 0.419692C4.30104 0.380228 4.19827 0.359889 4.09443 0.359889C3.99059 0.359889 3.88782 0.380228 3.79224 0.419692C3.69667 0.459156 3.61025 0.516936 3.53815 0.589584C3.53815 0.589584 0.511776 3.39245 0.223752 3.67932C-0.0649777 3.9662 -0.0840382 4.4823 0.223752 4.78771Z"
                    fill="#666666"
                  />
                </svg>
              </span>
            ),
            expandOpenIcon: (
              <span>
                <svg
                  width="9"
                  height="5"
                  viewBox="0 0 9 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.248943 0.24549C0.556459 -0.0693596 0.984583 -0.0940676 1.36051 0.24549L4.11687 2.89065L6.87323 0.24549C7.24916 -0.0940678 7.67799 -0.0693599 7.98339 0.24549C8.29091 0.559634 8.27116 1.0905 7.98339 1.38559C7.69703 1.68067 4.67195 4.56373 4.67195 4.56373C4.59992 4.63846 4.51358 4.69789 4.41809 4.73849C4.3226 4.77908 4.21991 4.8 4.11617 4.8C4.01242 4.8 3.90974 4.77908 3.81425 4.73849C3.71876 4.69789 3.63242 4.63846 3.56038 4.56373C3.56038 4.56373 0.53671 1.68067 0.248943 1.38559C-0.0395291 1.0905 -0.0585726 0.559634 0.248943 0.24549Z"
                    fill="#666666"
                  />
                </svg>
              </span>
            )
          }}
        />
      </div>
    );
  }
}

export default AuthsAndOverridesGrid;
