import React from "react";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { getAlternativesDrugListColumn } from "../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { Box } from "@material-ui/core";
import Button from "../../shared/Frx-components/button/Button";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import AdvanceSearchContainer from "../NewAdvanceSearch/AdvanceSearchContainer";
import { Column } from "../../../models/grid.model";
import _ from "lodash";

const SETTINGS_COL_WIDTH = 60;

export interface ISelectedAlternativesProps {
  drugsList: any[];
  selectedCurrentPage: number;
  pageSize: number;
  totalRows: number;
  isFetchingData: boolean;
  onApplyAlternatives: (data) => void;
  onClearFilterHandler: () => void;
  applyFilter: (filters: any) => void;
  applySortHandler: (key: string, order: string) => void;
  applyMultiSortHandler: (sorter: any) => void;
  alternativeListTriDotClick: (item: any, data: any) => void;
  onPageChangeHandler: (page: number) => void;
  onPageSize: (size: number) => void;
  isSearchOpen: boolean;
  advanceSearchClickHandler: (event) => void;
  advanceSearchClosekHandler: () => void;
}

export interface ISelectedAlternativesState {
  isSearchOpen: boolean;
  columns: Column<any>[];
  isFetchingData: boolean;

  selectedAlternatives: any[]; //subset of grid data
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
 * @class SelectedAlternatives
 * UI - DT
 * API - SJS
 * @author Deepak_T, SantoshJS
 */
class SelectedAlternatives extends React.Component<
  ISelectedAlternativesProps,
  ISelectedAlternativesState
> {
  state = {
    isSearchOpen: false,
    columns: getAlternativesDrugListColumn(),
    isFetchingData: false,
    data: [],
    filteredData: [],
    selectedAlternatives: [],
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
    props: ISelectedAlternativesProps,
    state: ISelectedAlternativesState
  ) {
    if (state.selectedAlternatives.length > 0)
      props.drugsList.forEach((d) => {
        if (state.selectedAlternatives.includes(d.rxcui)) {
          d["isChecked"] = true;
          d["rowStyle"] = "table-row--green-font";
        }
      });
    return {
      ...state,
      data: props.drugsList,
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
      return d.rxcui;
    });
    this.setState({
      data,
      isSelectAll: isSelected,
      selectedAlternatives: isSelected ? data : [],
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
          selectedAlternatives: [
            ...this.state.selectedAlternatives,
            selectedRow.rxcui,
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
        const newSelectedAlternatives = this.state.selectedAlternatives.filter(
          (item: any) => item !== selectedRow.rxcui
        );

        this.setState({
          data,
          selectedAlternatives: newSelectedAlternatives,
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
      : getAlternativesDrugListColumn();

    return (
      <div className="border br-5 mb-10">
        <div className="header space-between">
          Selected ALTERNATIVES
          <div className="right-side">
            <DropDown options={["Active", "Archive"]} />
            <Button
              label="Advance Search"
              className="Button advance-search"
              onClick={this.props.advanceSearchClickHandler}
            />
            <Button label="Save" className="Button disabled" />
            <svg
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
            </svg>
          </div>
        </div>
        {this.props.isSearchOpen && (
          <AdvanceSearchContainer
            openPopup={this.props.isSearchOpen}
            onClose={this.props.advanceSearchClosekHandler}
            isAdvanceSearch={true}
          />
        )}
        <div className="selected-alternatives selected-alternatives-root">
          <FrxDrugGridContainer
            enableSearch={false}
            enableColumnDrag
            isPinningEnabled={false}
            // isDataLoaded={false}
            onSearch={() => {}}
            fixedColumnKeys={[
              "checkbox",
              "rxcui",
              "alternatives",
              "generic_product_identifier",
            ]}
            pagintionPosition="topRight"
            gridName="ALTERNATIVE DRUG LIST"
            enableSettings={true}
            settingsWidth={SETTINGS_COL_WIDTH}
            // ** opt start
            showSettingsMenu={true}
            settingsTriDotMenuClick={(item: any, data?: any) => {
              this.props.alternativeListTriDotClick(
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
            // ** opt end
            // ** pagination start
            getPerPageItemSize={this.props.onPageSize}
            onGridPageChangeHandler={this.props.onPageChangeHandler}
            clearFilterHandler={this.clearFilterHandler}
            totalRowsCount={this.props.totalRows}
            pageSize={this.props.pageSize}
            selectedCurrentPage={this.props.selectedCurrentPage}
            // ** pagination end
            // ** filter start
            applyFilter={this.applyFilterHandler}
            // ** opt start
            isFiltered={this.state.isFiltered}
            filteredInfo={this.state.filteredInfo}
            // ** opt end
            // ** filter end
            // ** sort start
            applySort={this.applySortHandler}
            isSingleSorted={this.state.isGridSingleSorted}
            sortedInfo={this.state.gridSingleSortInfo}
            // ** sort end
            // ** multisort start
            applyMultiSort={this.applyMultiSortHandler}
            onMultiSortToggle={this.onMultiSortToggle}
            isMultiSorted={this.state.isGridMultiSorted}
            multiSortedInfo={this.state.gridMultiSortedInfo}
            // ** multisort end
            columns={columns}
            scroll={{ x: 2000, y: 420 }}
            isFetchingData={this.props.isFetchingData}
            enableResizingOfColumns
            data={this.state.data}
            // ** opt start
            onColumnChange={this.onColumnChange}
            // ** opt end
            rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
            onSelectAllRows={this.onSelectAllRows}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              className="Button mr-0"
              label="Apply"
              onClick={() =>
                this.props.onApplyAlternatives(this.state.selectedAlternatives)
              }
            />
          </Box>
        </div>
      </div>
    );
  }
}
export default SelectedAlternatives;
