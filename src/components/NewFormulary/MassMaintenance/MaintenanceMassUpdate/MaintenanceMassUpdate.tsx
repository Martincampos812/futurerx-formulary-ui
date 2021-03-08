import React, { Component } from "react";
import { connect } from "react-redux";
import FrxGridContainer from "../../../shared/FrxGrid/FrxDrugGridContainer";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
//   ../../../shared/FrxGrid/FrxDrugGridContainer";
import { getDrugDetailsColumn } from "../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
// "../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getMaintenacneMassUpdateColumns } from "./components/MaintenanceMassUpdateColumn";
import { getDrugDetailData } from "../../../../mocks/DrugGridMock";
// ("../../../mocks/DrugGridMock");
import { getMaintenanceMassMedicareData,getMaintenanceMassCommercialData } from "../../../../mocks/MaintenanceMassUpdateMockData";
import {formatDate} from "../../../../utils/formatters/date-format";
import { Box } from "@material-ui/core";
import Button from "../../../shared/Frx-components/button/Button";
// "../../shared/Frx-components/button/Button";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
// ("../../shared/Frx-components/dropdown/DropDown");
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
// "../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import "./MaintenanceMassUpdate.scss";
import SearchBox from "../../../shared/Frx-components/search-box/SearchBox";
import { fetchLandingData, setSelectedRow } from "../../../../redux/slices/maintenance/maintenanceSlice";
import { gridSettingsSlice } from "../../../../redux/slices/formulary/gridHandler/gridSettingsSlice";
import { Column } from "../../../../models/grid.model";
import * as _ from "lodash";
import {
  setFormulary,
  setLocation,
  setLocationHome,
  clearApplication,
  setModeLob
} from "../../../../redux/slices/formulary/application/applicationSlice";


interface Props {
  onClickAddNew: (id:any) => any;
  lob_type:any;
}
interface State {}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  id_lob: 4,
  search_by: null,
  search_key: "",
  search_value: [],
  sort_by: ["insert_datetime"],
  sort_order: ["desc"]
};

const massMaintenanceGridActionMenu = [
  {
    id: 1,
    key: 1,
    title: "View"
  },
  {
    id: 2,
    key: 2,
    title: "Edit"
  }
];

class MaintenanceMassUpdate extends Component<any, any> {
  state = {
    isSearchOpen: false,
    columns: [] as any,
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    isFiltered: false,
    filteredInfo: null,
    selectedRow: { index: "", id: "" },
    isColumnsChanged: false,
    changedColumns: [],
    pageSize: 10,
    actionMenu: massMaintenanceGridActionMenu
  };

  getGridData(){
    // debugger;
    if(this.props.lob_type == "commercial")
    {
      return getMaintenanceMassMedicareData();
    }
    else if(this.props.lob_type == "medicare")
    {
      return getMaintenanceMassCommercialData();
    }
  }

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: this.props.lob_id,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["insert_datetime"],
    sort_order: ["desc"]
  };

  componentDidMount() {  
    // const data = this.getGridData(); 
    // const columns = getMaintenacneMassUpdateColumns(); 
    // console.log(data);
    // this.setState({
    //   columns: columns,
    //   data: data,
    //   filteredData: data,
    // });
    this.props.fetchLandingData(this.listPayload);
  }

 componentWillReceiveProps(newProps){
   console.log("newProps",newProps)
   if(newProps.lob_id !== this.props.lob_id){
    this.props.fetchLandingData(this.listPayload);
   }
 }

  // testAPI(){
  //   console.log("----------------------- testAPI- MM ");
  //   const payload = {
  //     "index": 0,
  //     "limit": 10,
  //     "filter": [],
  //     "search_key": "",
  //     "sort_by": [
  //       "insert_datetime"
  //     ],
  //     "sort_order": [
  //       "desc"
  //     ]
  //   }
  //   this.props.fetchLandingData(payload);
  // }

 

  handleSearch = (searchObject) => {
    console.log("search");
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  rowSelectionChange = (record) => {
    console.log(record);
  };

  applySortHandler = (key, order, sortedInfo) => {
    console.log("sorted info for single sorting ", sortedInfo);
    this.setState(
      {
        gridSingleSortInfo: sortedInfo,
        isGridSingleSorted: true,
        isGridMultiSorted: false,
        gridMultiSortedInfo: [],
      },
      () => {
        // this.props.applySortHandler(key, order);
        this.onApplySortHandler(key, order)
      }
    );
    // this.props.fetchFormularies(this.listPayload);
  };

  onApplySortHandler = (key, order) => {
    console.log("key and order ", key, order);
    const listPayload = { ...this.listPayload };
    listPayload.sort_by = [key];
    const sortorder = order && order === "ascend" ? "asc" : "desc";
    listPayload.sort_order = [sortorder];
    this.listPayload = listPayload;
    this.props.fetchLandingData(this.listPayload);
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    this.setState(
      {
        isGridMultiSorted: true,
        isGridSingleSorted: false,
        gridMultiSortedInfo: multiSortedInfo,
        gridSingleSortInfo: null,
      },
      () => {
        //this.props.applyMultiSortHandler(sorter);
        this.onApplyMultiSortHandler(sorter)
      }
    );
  };

  uniqByKeepLast = data => {
    const result = Array.from(new Set(data.map(s => s.columnKey))).map(
      column => {
        const getOrder =
          data.find(s => s.columnKey === column).order === "ascend"
            ? "asc"
            : "desc";
        return {
          columnKey: column,
          order: getOrder
        };
      }
    );
    return result;
  };

  onApplyMultiSortHandler = sorter => {
    console.log("multi sorted columns ", sorter);
    const listPayload = { ...this.listPayload };
    const updatedSorter = this.uniqByKeepLast(sorter);
    const sort_by = updatedSorter.map(e => e.columnKey);
    const sort_order = updatedSorter.map(e => e.order);
    listPayload.sort_by = sort_by;
    listPayload.sort_order = sort_order;
    this.listPayload = listPayload;
    this.props.fetchLandingData(this.listPayload);
    //remove duplicates from sorter
    //api integration
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.setState({
      gridSingleSortInfo: null,
      isGridSingleSorted: false,
      isGridMultiSorted: isMultiSortOn,
      gridMultiSortedInfo: [],
    });
  };

  clearFilterHandler = () => {
    this.setState(
      {
        isFiltered: false,
        filteredInfo: null,
      },
      () => {
        this.onClearFilterHandler();
      }
    );
  };

  onClearFilterHandler = () => {
    console.log("Clear Filter");
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = id_lob;
    this.props.fetchLandingData(this.listPayload);
  };


  applyFilterHandler = (filters, filteredInfo) => {
    console.log("medicare filters ", filters);
    const filterInfoKeys = Object.keys(filteredInfo);
    this.setState(
      {
        isFiltered: filterInfoKeys && filterInfoKeys.length > 0 ? true : false,
        filteredInfo: filteredInfo,
        // gridSingleSortInfo: null,
        // isGridSingleSorted: false,
        // gridMultiSortedInfo: [],
        // isGridMultiSorted: false
      },
      () => {
        // this.props.applyFilter(filters);
        this.onApplyFilterHandler(filters)
      }
    );
  };

  onApplyFilterHandler = (filters) => {
    const fetchObjectKeys = Object.keys(filters);
    if (fetchObjectKeys && fetchObjectKeys.length > 0) {
      const fetchedProps = Object.keys(filters)[0];
      const fetchedOperator =
        filters[fetchedProps][0].condition === "is like"
          ? "is_like"
          : filters[fetchedProps][0].condition === "is not"
          ? "is_not"
          : filters[fetchedProps][0].condition === "is not like"
          ? "is_not_like"
          : filters[fetchedProps][0].condition === "does not exist"
          ? "does_not_exist"
          : filters[fetchedProps][0].condition;
      const fetchedValues =
        filters[fetchedProps][0].value !== ""
          ? [filters[fetchedProps][0].value.toString()]
          : [];
      const newFilters = [
        {
          prop: fetchedProps,
          operator: fetchedOperator,
          values: fetchedValues
        }
      ];
      this.listPayload.filter = newFilters;
      this.props.fetchLandingData(this.listPayload);
    } else {
      this.listPayload.filter = [];
      this.props.fetchLandingData(this.listPayload);
    }
  }

  onColumnChange = (columns: Column<any>[]) => {
    console.log("swapped", columns);
    const cols = _.cloneDeep(columns);
    // const changedColumns = cols.filter(
    //   (c: Column<any>) => c.key !== "settings"
    // );
    const changedColumns = cols;
    this.setState({
      isColumnsChanged: true,
      changedColumns,
    });
  };

  onPageSize = pageSize => {
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    this.listPayload.id_lob = id_lob;
    this.props.fetchLandingData(this.listPayload);
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.props.fetchLandingData(this.listPayload);
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    //console.log(hiddenColumn,visibleColumn);
    this.props.setHiddenColumn(hiddenColumn);
  };

  massMaintenanceGridTriDotClick = (id_maintenance_formulary: any, item: any, data: any) => {
    console.log("propsMM", data, item)
    this.props.setSelectedRow(data)
    console.log("item", id_maintenance_formulary)
      if (id_maintenance_formulary && id_maintenance_formulary.key === 1) {
        this.props.history.push(`/formulary/maintenance/${id_maintenance_formulary.title}/${data.id_maintenance_formulary}`);
      } else if(id_maintenance_formulary && id_maintenance_formulary.key === 2){
        this.props.history.push(`/formulary/maintenance/${id_maintenance_formulary.title}/${data.id_maintenance_formulary}`);
      }
  };



  render() {
    // const { enableSettings, pinData, scroll } = this.props;
    console.log("lob_type", this.props.lob_type);
    const maintenanceGridData = [...this.props.maintenanceGrid.landing]
    console.log("landing", this.props.maintenanceGrid.landing);
    let hiddenColumns = [];
    if (this.props.maintenanceGrid.grid_settings.hiddenColumns.length > 0) {
      hiddenColumns = this.props.maintenanceGrid.grid_settings.hiddenColumns.map(
        (e) => e.key
      );
    }
    let GridElement =  this.props.maintenanceGrid.isLoading;
    const gridData = maintenanceGridData.map((item: any, index: number) => {
      return {
        ...item,
        id: index + 1,
        key: index + 1,
        createdOn: formatDate(item.insert_datetime).toString(),
        createdBy: item.insert_user,
        lob: item.lob_name,
        formularyName: item.formulary_names,
        formularyId: item.id_maintenance_formulary,
        status: item.status,
        items: this.state.actionMenu
      };
    })

    return (
    <>
    {/* {GridElement} */}
    <div className="MaintenanceMassUpdate ">
          <div className="header-container ">
            <span className="header">MAINTENANCE MASS UPDATE</span>
            <div className="dropdown-button-container ">
            <div className="field-container">
                <SearchBox iconPosition="left" placeholder="Search"/>
              </div>
              <DropDown
                options={["Active", "Archive"]}
                defaultValue="Active"
                className="dropdown-input"
              />
              {/* <Button
                label="Advance Search"
                className="Button advance-search"
                onClick={this.advanceSearchClickHandler}
              /> */}
              <Button
                label="+ Add New"
                className="addNewButton "
                onClick={this.props.onClickAddNew}
              />
              {/* <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                  fill="#1D54B4"
                />
              </svg> */}
            </div>
          </div>
          {/* {this.state.isSearchOpen ? (
            <AdvancedSearch
              category="Grievances"
              openPopup={this.state.isSearchOpen}
              onClose={this.advanceSearchClosekHandler}
            />
          ) : null} */}
          {GridElement ? <FrxLoader /> : (
          <div className="mass-maintenance-update-grid">
             <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => {}}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName="MASS MAINTENANCE"
              ////////////
              enableSettings={true}
              showSettingsMenu={true}
              settingsTriDotMenuClick={(item: any, data?: any) => {
                this.massMaintenanceGridTriDotClick(
                  item,
                  data,
                  this.state.selectedRow
                );
              }}
              settingsTriDotClick={(item: any) => {
                this.setState({
                  selectedRow: item,
                });
              }}
              onSettingsClick={"grid-menu"}
              ////////////
              // enableSettings
              // settingsTriDotClick={this.props.invokeformularyActions}
              applySort={this.applySortHandler}
              isSingleSorted={this.state.isGridSingleSorted}
              sortedInfo={this.state.gridSingleSortInfo}
              applyMultiSort={this.applyMultiSortHandler}
              isMultiSorted={this.state.isGridMultiSorted}
              multiSortedInfo={this.state.gridMultiSortedInfo}
              onMultiSortToggle={this.onMultiSortToggle}
              isFiltered={this.state.isFiltered}
              filteredInfo={this.state.filteredInfo}
              // isCustomCheckboxEnabled={false}
              // handleCustomRowSelectionChange={()=>{}}
              columns={getMaintenacneMassUpdateColumns(
                {
                  onFormularyNameClick: (id: any) =>
                    this.props.onClickAddNew(id),
                },
                hiddenColumns
              )}
               scroll={{ x: 0, y: 377 }}
              isFetchingData={false}
              enableResizingOfColumns
              getPerPageItemSize={this.onPageSize}
              onGridPageChangeHandler={this.onGridPageChangeHandler}
              clearFilterHandler={this.clearFilterHandler}
              totalRowsCount={this.props.maintenanceGrid.count}
              pageSize={this.listPayload.limit}
              selectedCurrentPage={this.listPayload.index / this.listPayload.limit + 1}
              applyFilter={this.applyFilterHandler}
              getColumnSettings={this.onSettingsIconHandler}
              data={gridData}
              onColumnChange={this.onColumnChange}
            />
          </div>
          )}
        </div>
    </>);
  }
}

// export default MaintenanceMassUpdate;

const mapStateToProps = (state) => {
  console.log("stateLOb", state)
  return {
    maintenanceGrid: {
      count: state?.maintenance?.landing?.count,
      landing: state?.maintenance?.landing?.list,
      isLoading: state?.maintenance?.isLoading,
      grid_settings: state?.gridSettings,
    },
    lob_id: state?.application?.current_lob,
    rowId: state?.maintenance?.selectedRow?.id_maintenance_formulary
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchLandingData: (a) => dispatch(fetchLandingData(a)),
    setHiddenColumn: hiddenColumns =>
      dispatch(gridSettingsSlice.actions.setHiddenColum(hiddenColumns)),
    clearHiddenColumns: () =>
      dispatch(gridSettingsSlice.actions.clearHiddenColumns(true)),
      setModeLob: a => dispatch(setModeLob(a)),
      setSelectedRow: (a) => dispatch(setSelectedRow(a))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceMassUpdate);