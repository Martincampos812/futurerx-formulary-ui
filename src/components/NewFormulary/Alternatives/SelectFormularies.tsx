import React from "react";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { getAlternativesFormulariesListColumn } from "../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { Box } from "@material-ui/core";
import Button from "../../shared/Frx-components/button/Button";
import { Column } from "../../../models/grid.model";
import _ from "lodash";

const SETTINGS_COL_WIDTH = 60;

interface ISelectFormulariesProps {
  formulariesList: any[];
  selectedCurrentPage: number;
  pageSize: number;
  totalRows: number;
  isFetchingData: boolean;
  onCancelFormulary: () => void;
  onSaveFormulary: (data) => void;
  onClearFilterHandler: () => void;
  applyFilter: (filters: any) => void;
  applySortHandler: (key: string, order: string) => void;
  applyMultiSortHandler: (sorter: any) => void;
  formulariesListTriDotClick: (item: any, data: any) => void;
  onPageChangeHandler: (page: number) => void;
  onPageSize: (size: number) => void;
}

interface ISelectFormulariesState {
  isSearchOpen: boolean;
  columns: Column<any>[];
  isFetchingData: boolean;

  selectedFormularies: any[]; //subset of grid data
  gridSingleSortInfo: any;
  isGridSingleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  isFiltered: boolean;
  filteredInfo: any;

  isColumnsChanged: boolean;
  changedColumns: Column<any>[];
  selectedRow: any;
  fixedSelectedRows: number[];
  selectedRowKeys: number[];
  isSelectAll: boolean;
  data: any[];
}

/**
 * @class SelectFormularies
 * UI - SJS
 * API - SJS
 * @author Deepak_T, SantoshJS
 */
class SelectFormularies extends React.Component<
  ISelectFormulariesProps,
  ISelectFormulariesState
> {
  state = {
    isSearchOpen: false,
    columns: getAlternativesFormulariesListColumn(),
    isFetchingData: false,
    data: [],
    filteredData: [],
    selectedFormularies: [],
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    isFiltered: false,
    filteredInfo: null,

    isColumnsChanged: false,
    changedColumns: [],
    selectedRow: undefined,
    fixedSelectedRows: [] as number[],
    selectedRowKeys: [] as number[],
    isSelectAll: false,
  };

  static getDerivedStateFromProps(
    props: ISelectFormulariesProps,
    state: ISelectFormulariesState
  ) {
    if (state.selectedFormularies.length > 0)
      props.formulariesList.forEach((d) => {
        if (state.selectedFormularies.includes(d.id_formulary)) {
          d["isChecked"] = true;
          d["rowStyle"] = "table-row--green-font";
        }
      });
    return {
      ...state,
      data: props.formulariesList,
    };
  }

  onColumnChange = (columns: Column<any>[]) => {
    const cols = _.cloneDeep(columns);

    const changedColumns = cols;
    this.setState({
      isColumnsChanged: true,
      changedColumns,
    });
  };

  clearFilterHandler = () => {
    this.setState(
      {
        isFiltered: false,
        filteredInfo: null,
      },
      () => {
        this.props.onClearFilterHandler();
      }
    );
  };

  applyFilterHandler = (filters, filteredInfo) => {
    console.log(" filters ", filters);
    const filterInfoKeys = Object.keys(filteredInfo);
    this.setState(
      {
        isFiltered: filterInfoKeys && filterInfoKeys.length > 0 ? true : false,
        filteredInfo: filteredInfo,
        gridSingleSortInfo: null,
        isGridSingleSorted: false,
        gridMultiSortedInfo: [],
        isGridMultiSorted: false,
      },
      () => {
        this.props.applyFilter(filters);
      }
    );
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
        this.props.applySortHandler(key, order);
      }
    );
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
        this.props.applyMultiSortHandler(sorter);
      }
    );
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

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.data.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          d["rowStyle"] = "table-row--green-font";
        } else {
          if (d["rowStyle"]) delete d["rowStyle"];
        }
      }
      // else d["isSelected"] = false;
      return d.id_formulary;
    });
    this.setState({
      data,
      isSelectAll: isSelected,
      selectedFormularies: isSelected ? data : [],
    });
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.data.map((d: any) => {
          if (d["key"] === selectedRow.key) {
            d["isChecked"] = isSelected;
            d["rowStyle"] = "table-row--green-font";
          }
          return d;
        });

        this.setState({
          data,
          selectedFormularies: [
            ...this.state.selectedFormularies,
            selectedRow.id_formulary,
          ],
        });
      } else {
        const data = this.state.data.map((d: any) => {
          if (d["key"] === selectedRow.key) {
            d["isChecked"] = isSelected;
            if (d["rowStyle"]) delete d["rowStyle"];
          }
          return d;
        });
        const newSelectedFormularies = this.state.selectedFormularies.filter(
          (item: any) => item !== selectedRow.id_formulary
        );

        this.setState({
          data,
          selectedFormularies: newSelectedFormularies,
        });
      }
    }
  };

  handleSearch = (searchObject) => {
    console.log("search");
  };

  render() {
    const columns = this.state.isColumnsChanged
      ? this.state.changedColumns
      : getAlternativesFormulariesListColumn();

    return (
      <div className="border br-5 mb-10 m-t-10">
        <div className="header space-between">
          SELECT FORMULARIES TO APPLY UPDATES TO
        </div>
        <div className="selected-alternatives selected-alternatives-root">
          <FrxDrugGridContainer
            enableSearch={false}
            enableColumnDrag
            // isDataLoaded={false}
            onSearch={() => {}}
            fixedColumnKeys={["checkbox"]}
            pagintionPosition="topRight"
            gridName="ALTERNATIVE FORMULARY LIST"
            enableSettings={true}
            settingsWidth={SETTINGS_COL_WIDTH}
            showSettingsMenu={true}
            settingsTriDotMenuClick={(item: any, data?: any) => {
              this.props.formulariesListTriDotClick(
                item,
                this.state.selectedRow
              );
            }}
            settingsTriDotClick={(item: any) => {
              this.setState({
                selectedRow: item,
              });
            }}
            onSettingsClick={"grid-menu"}
            applySort={this.applySortHandler}
            isSingleSorted={this.state.isGridSingleSorted}
            sortedInfo={this.state.gridSingleSortInfo}
            applyMultiSort={this.applyMultiSortHandler}
            isMultiSorted={this.state.isGridMultiSorted}
            multiSortedInfo={this.state.gridMultiSortedInfo}
            onMultiSortToggle={this.onMultiSortToggle}
            isFiltered={this.state.isFiltered}
            filteredInfo={this.state.filteredInfo}
            columns={columns}
            scroll={{ x: 1000, y: 420 }}
            isFetchingData={this.props.isFetchingData}
            enableResizingOfColumns
            getPerPageItemSize={this.props.onPageSize}
            onGridPageChangeHandler={this.props.onPageChangeHandler}
            clearFilterHandler={this.clearFilterHandler}
            totalRowsCount={this.props.totalRows}
            pageSize={this.props.pageSize}
            selectedCurrentPage={this.props.selectedCurrentPage}
            applyFilter={this.applyFilterHandler}
            data={this.state.data}
            onColumnChange={this.onColumnChange}
            rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
            onSelectAllRows={this.onSelectAllRows}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              className="Button mr-5"
              label="Cancel"
              onClick={this.props.onCancelFormulary}
            />
            <Button
              className="Button mr-0"
              label="Save"
              onClick={() =>
                this.props.onSaveFormulary(this.state.selectedFormularies)
              }
            />
          </Box>
        </div>
      </div>
    );
  }
}
export default SelectFormularies;
