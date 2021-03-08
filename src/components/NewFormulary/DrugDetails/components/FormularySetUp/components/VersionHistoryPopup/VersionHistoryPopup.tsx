import * as React from "react";
import { connect } from "react-redux";
import { Column } from "../../../../../../../models/grid.model";
import { fetchFormularyVersionHistory } from "../../../../../../../redux/slices/formulary/version-history/version-history.slice";
import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { VersionHistoryData } from "./version-hisory.model";
import { versionHistoryColumns } from "./version-history-columns";
import "./VersionHistoryPopup.scss";

interface VersionHistoryPopupProps {
  isLoading?: boolean;
  id_base_formulary?: number;
  versionHistory?: VersionHistoryData[];
  formularyVersionHistory?: {
    formulary_version_history: VersionHistoryData[];
    isLoading: boolean;
    error: string | null;
  };
  baseId?: number;
  onFormularyVersionSelection: (record: VersionHistoryData) => void;
  fetchFormularyVersionHistory?: (data: {
    formularyBaseId: number;
    index: number;
    limit: number;
  }) => void;
}

interface VersionHistoryPopupState {
  columns: Column<VersionHistoryData>[];
  filteredData: VersionHistoryData[];
  data: VersionHistoryData[];
  dataCount: number;
}

const mapStateToProps = state => {
  console.log("version history: App state ", state);
  let data = {};
  // if (
  //   state &&
  //   state.application &&
  //   state.application.formulary &&
  //   state.application.formulary.id_base_formulary
  // ) {
  //   const id_base_formulary = state.application.formulary.id_base_formulary;
  //   data = { ...data, id_base_formulary };
  // }

  if (state.formularyVersionHistory) {
    data = {
      ...data,
      isLoading: state.formularyVersionHistory.isLoading,
      versionHistory: state.formularyVersionHistory.formulary_version_history
        ? state.formularyVersionHistory.formulary_version_history
        : []
    };
  }
  data = {
    ...data,

    formularyVersionHistory: state.formularyVersionHistory
  };

  return data;
};

function mapDispatchToProps(dispatch) {
  // url = https://api-dev-config-formulary.futurerx.com/api/1/formulary-versions/2581?index=0&limit=10
  return {
    fetchFormularyVersionHistory: (data: {
      formularyBaseId: number;
      index: number;
      limit: number;
    }) => dispatch(fetchFormularyVersionHistory(data))
    // fetchSelectedFormulary: a => dispatch(fetchSelectedFormulary(a))
  };
}

class ConnctedVersionHistoryPopup extends React.Component<
  VersionHistoryPopupProps,
  VersionHistoryPopupState
> {
  state = {
    columns: versionHistoryColumns(),
    // filteredData: versionHistoryMock()
    filteredData: this.props.versionHistory ? this.props.versionHistory : [],
    data: this.props.versionHistory ? this.props.versionHistory : [],
    dataCount: 0 // to store total data items if data is fetched from api for each grid action
  };

  //if data is not pre loaded and has to be fetched from server for each grid action
  // NOTE: In this component data is pre loaded
  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 1,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["id"],
    sort_order: ["desc"]
  };

  componentDidMount() {
    this.fetchFormularyVersionHistory();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.versionHistory &&
      !this.isVersionHistoryDataSame(
        this.props.versionHistory,
        previousState.filteredData
      )
    ) {
      this.setState({
        data: this.props.versionHistory,
        filteredData: this.props.versionHistory
      });
    }
  }

  /**
   * @function isVersionHistoryDataSame
   * to check if history has changed between render
   * @param oldHistory history in state
   * @param newHistory history retrieved from current props
   * @author Deepak_T
   */
  isVersionHistoryDataSame = (
    oldHistory: VersionHistoryData[],
    newHistory: VersionHistoryData[]
  ) => {
    if (oldHistory === undefined && newHistory === undefined) {
      return true;
    }
    if (oldHistory === undefined || newHistory === undefined) {
      return false;
    }
    if (oldHistory.length !== newHistory.length) {
      return false;
    }
    // for (let i = 0; i < oldHistory.length; i++) {
    //   if (
    //     oldHistory[i].hidden !== newHistory[i].hidden
    //   ) {
    //     return false;
    //   }
    // }
    return true;
  };

  /**
   * @function fetchFormularyVersionHistory
   * to fetch version history of formulary with base id in app state id_base_formulary
   * @author Deepak_t
   */
  fetchFormularyVersionHistory = () => {
    if (this.props.fetchFormularyVersionHistory && this.props.baseId) {
      const data = {
        formularyBaseId: this.props.baseId,
        // formularyBaseId: 2581, (this id has some data to display)
        index: 0,
        limit: 100
      };
      if (data.formularyBaseId) this.props.fetchFormularyVersionHistory(data);
    }
  };

  /**
   * @function onColumnCellClick
   * handler for selecting version number from grid
   * @param record the data item
   * @param key the data key
   *
   * @author Deepak_T
   */
  onColumnCellClick = (record: VersionHistoryData, key: string) => {
    if (key === "version_number") {
      this.props.onFormularyVersionSelection(record);
    }
  };

  handleSearch = () => {};

  onApplyFilterHandler = filters => {
    console.log("filter by ", filters);
    //call api to fetch data with filters
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order) => {
    console.log("sort details ", key, order);
    //call api
  };

  onPageSizeChange = pageSize => {
    console.log("Page size load", pageSize);
    //call api to fetch by new page size
  };

  onPageNumberChangeHandler = (pageNumber: number) => {
    console.log("Page change load", pageNumber);
    // call api to fetch data for selected page
  };

  onClearFilterHandler = () => {
    console.log("clear filter");
    //call api to fetch data without filters
  };

  render() {
    return (
      <div className="versionhistorypopup-root">
        {/* Version history grid
        {this.props.isLoading ? (
          <FrxLoader />
        // ) : ( */}
        <FrxDrugGridContainer
          // onColumnChange={this.onColumnChange}
          enableSearch
          enableColumnDrag
          onSearch={this.handleSearch}
          // enableSettings
          // enableColumnDrag
          isDataLoaded
          onColumnCellClick={this.onColumnCellClick}
          fixedColumnKeys={["contract_year"]}
          gridName="VERSION HISTORY"
          isFetchingData={this.props.isLoading ? this.props.isLoading : false}
          columns={this.state.columns}
          data={this.state.filteredData}
          pagintionPosition="topRight"
          onSettingsClick="grid-menu"
          scroll={{ x: 1300, y: 420 }}
          // settingsWidth={30}
          totalRowsCount={this.state.dataCount}
          getPerPageItemSize={this.onPageSizeChange}
          onGridPageChangeHandler={this.onPageNumberChangeHandler}
          clearFilterHandler={this.onClearFilterHandler}
          applyFilter={this.onApplyFilterHandler}
          applySort={this.onApplySortHandler}
          pageSize={this.listPayload.limit}
          selectedCurrentPage={
            this.listPayload.index / this.listPayload.limit + 1
          }
          isPinningEnabled
        />
        {/* // )} */}
      </div>
    );
  }
}
const VersionHistoryPopup = connect<any, any>(
  mapStateToProps,
  mapDispatchToProps
)(ConnctedVersionHistoryPopup);

export default VersionHistoryPopup;
