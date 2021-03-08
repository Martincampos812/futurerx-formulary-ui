import React, { Component } from "react";
import "./StandardReporting.scss";

import { setupStandardReportingColumns } from "../../../utils/grid/columns";
import { SetupStandardReportingMockData } from "../../../mocks/HmpsFilesMock";

import { Card, Grid, Input } from "@material-ui/core";
import { connect } from "react-redux";

import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { setupHmpsColumns } from "../../../utils/grid/columns";
import { SetupHmpsMockData } from "../../../mocks/HmpsFilesMock";
import {
  // postHpmsFormularyFile,
  postStandardReports,
} from "../../../redux/slices/formulary/hpms/hpmsActionCreation";
import {
  exportReport,
} from "../../../redux/slices/formulary/hpms/hpmsService";
import { saveAs } from "file-saver";
import uuid from "react-uuid";
import { ToastContainer } from "react-toastify";
import showMessage from "../../../components/NewFormulary/Utils/Toast";

function mapDispatchToProps(dispatch) {
  return {
    postStandardReports: (a) => dispatch(postStandardReports(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    application: state?.application,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    hpmsReports: state?.hpmsReducers?.hpmsReports,
  };
};

class StandardReporting extends React.Component<any, any> {
  state = {
    filter: Array(),
    quickFilter: Array(),
    sort_by: Array(),
    gridData: Array(),
    gridDataCount: 0,
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[],
    index: 0,
    limit: 10,
    dataCount: 0,
    hiddenColumns: Array(),
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    searchData: Array(),
    isSelectAll: false,
    selectedFiles: Array(),
  }

  loadGridData(json: any) {

    if (json.payload != null && json.payload.code === "200") {
      this.setState({ tierGridContainer: true });
      let tmpData = json.payload.data;
      var data: any[] = [];
      let count = 1;

      let thisRef = this;
      var tmp_gridData = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        // data.push(element);
        //let gridItem = {};
        element["id"] = count;
        element["key"] = count;


        count++;
        return element;

      });
      console.log(tmp_gridData);
      this.setState({
        gridData: tmp_gridData,
        gridDataCount: json.payload.count
      })
    }

  }

  populateGridData() {
    this.state.selectedFiles = [];
    let apiDetails = {};
    apiDetails["apiPart"] = "api/1/standard-reports";
    apiDetails["pathParams"] = "/" + this.props?.formulary?.id_formulary;
    apiDetails["keyVals"] = [{ key: "index", value: this.state.index }, { key: "limit", value: this.state.limit }];


    apiDetails["messageBody"] = {
      "filter": this.state.filter,
      "search_key": this.state.searchValue,
      "sort_by": ["template_group_name"],
      "sort_order": ["asc"],
      "template_type": 1,
      "formulary_id": this.props?.formulary?.id_formulary,
      base_formulary_id: this.props?.formulary?.id_base_formulary,
    }
    this.props.postStandardReports(apiDetails).then((json) => {
      debugger;
      this.loadGridData(json);
    });
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.formulary) {
      let apiDetails = {};
      let f = nextProps.formulary;
      let id = f.id_formulary;

      apiDetails["apiPart"] = "api/1/standard-reports";
      apiDetails["pathParams"] = "/" + nextProps.formulary?.id_formulary;// this.props?.formulary_id;
      apiDetails["keyVals"] = [{ key: "index", value: 0 }, { key: "limit", value: 10 }];

      apiDetails["messageBody"] = {
        "filter": [],
        "search_key": "",
        "sort_by": ["template_group_name"],
        "sort_order": ["asc"],
        "template_type": 1,
        "formulary_id": nextProps?.formulary?.id_formulary,
        base_formulary_id: nextProps?.formulary?.id_base_formulary,
      }
      this.props.postStandardReports(apiDetails).then((json) => {

        this.loadGridData(json);
      });
    }
  }
  componentDidMount() {
    if (this.props.formulary) {


      let apiDetails = {};
      apiDetails["apiPart"] = "api/1/standard-reports";
      apiDetails["pathParams"] = "/" + this.props?.formulary?.id_formulary;// this.props?.formulary_id;
      apiDetails["keyVals"] = [{ key: "index", value: 0 }, { key: "limit", value: 10 }];

      apiDetails["messageBody"] = {
        "filter": [],
        "search_key": "",
        "sort_by": ["template_group_name"],
        "sort_order": ["asc"],
        "template_type": 1,
        "formulary_id": this.props?.formulary?.id_formulary,
        base_formulary_id: this.props?.formulary?.id_base_formulary,
      }
      this.props.postStandardReports(apiDetails).then((json) => {

        this.loadGridData(json);
      });
    }


  }
  handleExport = async (key: any) => {
    let apiDetails_1 = {};
    let files = this.state.selectedFiles;
    if (key != null) {
      files = [];
      files.push(this.state.gridData[key - 1]["id_standard_reporting"]);
    }
    if (files.length == 0) {
      showMessage("Please select at least one file to export.", "error");
      return;
    }




    let isError = false;

    for (const key of files) {
      let apiName = "";
      switch (key) {
        case 1:
          apiName = "formulary-export";
          break;


        case 3:
          apiDetails_1["apiPart"] = "api/1/frf-change-report";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id;
          break;
        case 7:
          apiDetails_1["apiPart"] = "api/1/comapre";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id;
          break;
        case 10:
          apiDetails_1["apiPart"] = "api/1/formulary-export";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id + "/false";
          break;
        case 11:
          apiDetails_1["apiPart"] = "api/1/formulary-export";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id + "/true";;
          break;
        case 12:
          apiDetails_1["apiPart"] = "api/1/pa-criteria-export";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id;
          break;
        case 13:
          apiDetails_1["apiPart"] = "api/1/st-criteria-export";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id;
          break;

        default:
          apiDetails_1["apiPart"] = "api/1/formulary-export";
          apiDetails_1["pathParams"] = "/" + this.props?.formulary?.id_formulary + "/" + this.props?.formulary_lob_id;
          break;
      }


      debugger;

      //apiDetails_1["keyVals"] = [{ key: "code_value", value: key }];


      try {
        const response = await exportReport(apiDetails_1);
        console.log(response.headers);
        let content_type = response.headers['content-type'];
        let data = response.data;
        debugger;
        if (response.data) {
          let tmp_file = this.state.gridData.filter((obj) => obj.id_standard_reporting == key);
          let fileName = tmp_file[0].standard_reporting_name.replace(' ', '_') + "_Export";
          if (content_type && content_type == "xlsx") {
            const file = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(file, fileName + ".xlsx");
          } else {
            const file = new Blob([data], { type: "text/csv" });
            saveAs(file, fileName + ".csv");
          }

          this.setState({
            isRequestFinished: true
          });
        } else {
          showMessage("Error while exporting", "error");
          this.setState({
            isRequestFinished: true
          });
          isError = true;
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while exporting", "error");
        this.setState({
          isRequestFinished: true
        });
        isError = true;
      }
    }
    if (!isError) {
      this.populateGridData();
    }
  }

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.gridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        //d["rowStyle"] = "table-row--green-font";
        if (isSelected) selectedRowKeys.push(d["key"]);
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      (k) => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ gridData: data, isSelectAll: isSelected });
  };
  // additional criteria toggle

  onApplyFilterHandler = (filters) => {
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(
            (element) => element["prop"] !== fetchedProps
          );
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
          this.state.filter.push({
            prop: fetchedProps,
            operator: fetchedOperator,
            values: fetchedValues,
          });
        }
      });
    } else {
      this.state.filter = Array();
    }
    console.log("Filters:" + JSON.stringify(this.state.filter));

    this.populateGridData();

  };

  onApplySortHandler = (key, order, sortedInfo) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === "ascend" ? "asc" : "desc";
      this.state.sort_by = this.state.sort_by.filter(
        (keyPair) => keyPair["key"] !== key
      );
      this.state.sort_by.push({ key: key, value: sortOrder });
    }

    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: [],
    });

    this.populateGridData();
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));

    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    })

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map((sortInfo) => {
        if (uniqueKeys.includes(sortInfo["columnKey"])) {
        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo["columnKey"]);
        }
      });
      filteredSorter.map((sortInfo) => {
        let sortOrder = sortInfo["order"] === "ascend" ? "asc" : "desc";
        this.state.sort_by = this.state.sort_by.filter(
          (keyPair) => keyPair["key"] !== sortInfo["columnKey"]
        );
        this.state.sort_by.push({
          key: sortInfo["columnKey"],
          value: sortOrder,
        });
      });
    }


    this.populateGridData();
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;


    this.populateGridData();
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.gridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            // d["rowStyle"] = "table-row--green-font";
          }
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ gridData: data });
      } else {
        const data = this.state.gridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = false;
            if (d["rowStyle"]) delete d["rowStyle"];
          }
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          gridData: data,
        });
      }
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    console.log("selected row ", selectedRowKeys);

    this.state.selectedFiles = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys],
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedFiles = selectedRowKeys.map((tierId) => {
        return this.state.gridData[tierId - 1]["id_standard_reporting"];
      });
    }
  };


  render() {
    return (
      <>

        <Grid item xs={12}>
          <div className="hmps-container">
            <div className="bordered">
              <div className="header space-between pr-10">
                HPMS SUBMISSION AND SUPPLEMENTAL OR ALTERNATIVE MODAL FORMULARY
                FILES
              <div className="float-right" onClick={() => this.handleExport(null)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                      fill="#C2CFE0"
                    />
                  </svg>
                </div>
              </div>
              <div className="hmps-wrapper">
                <FrxDrugGridContainer
                  isDataLoaded
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  hidePagination={true}
                  gridName=""
                  enableSettings
                  columns={setupStandardReportingColumns({ exportFile: this.handleExport })}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.gridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  settingsWidth={30}
                  pageSize={this.state.limit}
                  selectedCurrentPage={this.state.index / this.state.limit + 1}
                  totalRowsCount={this.state.dataCount}
                  //getPerPageItemSize={this.onPageSize}
                  //onGridPageChangeHandler={this.onGridPageChangeHandler}
                  //clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  applySort={this.onApplySortHandler}
                  isSingleSorted={this.state.isGridSingleSorted}
                  sortedInfo={this.state.gridSingleSortInfo}
                  applyMultiSort={this.applyMultiSortHandler}
                  isMultiSorted={this.state.isGridMultiSorted}
                  multiSortedInfo={this.state.gridMultiSortedInfo}
                  onMultiSortToggle={this.onMultiSortToggle}
                />
              </div>
            </div>
          </div>
        </Grid>
        <ToastContainer />
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StandardReporting);