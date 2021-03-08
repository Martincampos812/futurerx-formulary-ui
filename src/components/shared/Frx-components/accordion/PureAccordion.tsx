import React, { createRef, Component } from "react";
import DialogPopup from "../../FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../FrxGrid/FrxDrugGridContainer";
import Chevron from "./Chevron";
import { Checkbox } from "antd";
import "./PureAccordion.scss";
import showMessage from "../../../NewFormulary/Utils/Toast";
import * as commonConstants from "../../../../api/http-commons";
import * as compareConstants from "../../../../api/http-compare-view";
import { getDrugs } from "../../../../redux/slices/formulary/compareView/compareViewService";
import FrxLoader from "../../FrxLoader/FrxLoader";

interface HeaderType {
  baseFormulary: number | null;
  referenceFormulary: number | null;
  baseOnly: number | null;
  referenceOnly: number | null;
  nonMatch: number | null;
}
interface PureAccordionProps {
  tableType: "COMPARE" | "VIEW" |"HPMS" ;
  title: string;
  titleBG: string;
  content: () => JSX.Element;
  headerData: HeaderType;
  showCheckbox: boolean;
  toggleAllAccordion: boolean;
  baseformulary?: any;
  referenceformulary?: any;
  gridColumns?: any;
  formularyLobId?: any;
  fileType?: any;
  sectionSelected?: (selection, checked) => void;
  formularyId? :any;
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  sort_by: [],
  sort_order: []
};

const columnKeyMapping = {
  label: 'drug_label_name',
  fileType: 'file_type',
  dataSource: 'data_source',
  gpi: 'generic_product_identifier',
  tier: 'tier_value',
  paType: 'pa_type',
  paGroupDescription: 'pa_group_description',
  stType: 'st_type',
  stGroupDescription: 'st_group_description',
  stValue: 'st_value',
  qlType: 'ql_type',
  qlDays: 'ql_days',
  qlPeriodofTime: 'ql_period_of_time',
  qlQuantity: 'ql_quantity',
  fillsAllowed: 'fills_allowed',
  fullLimitPeriod: 'full_limit_period_of_time'
};

class PureAccordion extends Component<PureAccordionProps, any> {
  state = {
    active: "",
    height: "0px",
    rotate: "accordion__icon",
    openDrugsList: false,
    drugGridHeaderName: "",
    rejectedDrug: Array(),
    toggleAll: false,
    drugGridData: Array(),
    drugData: Array(),
    gridColumns: Array(),
    baseFormularyId: "",
    isRowSelectionEnabled: false,
    hiddenColumns: Array(),
    dataCount: 0,
    isRequestFinished: true,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    sort_by: Array(),
    isFiltered: false,
    filteredInfo: null,
    formularyId: null,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    sort_by: [],
    sort_order: []
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };
  onApplyFilterHandler = (filters, filteredInfo) => {
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys.length > 0) {
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps] && columnKeyMapping[fetchedProps]) {
          this.listPayload.filter = this.listPayload.filter.filter(element => element['prop'] !== columnKeyMapping[fetchedProps]);
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
          this.listPayload.filter.push({
            prop: columnKeyMapping[fetchedProps],
            operator: fetchedOperator,
            values: fetchedValues
          });
        }
      });
      console.log("Filters:" + JSON.stringify(this.listPayload.filter));
      this.setState({
        isFiltered: true,
        filteredInfo: filteredInfo
      }, () => {
        this.populateGridData(this.state.baseFormularyId, this.listPayload);
      });
    }else{
      this.listPayload.filter = Array();
      this.setState({
        isFiltered: false,
        filteredInfo: filteredInfo
      }, () => {
        this.populateGridData(this.state.baseFormularyId, this.listPayload);
      });
    }
  };
  onPageSize = (pageSize) => {
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    /*this.setState({
      isRequestFinished: false,
    })*/
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    /*this.setState({
      isRequestFinished: false,
    })*/
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };
  onClearFilterHandler = () => {
    this.listPayload = { ...defaultListPayload };
    this.listPayload.filter = Array();
    /*this.setState({
      isRequestFinished: false,
    })*/
    this.setState({
      isFiltered: false,
      filteredInfo: null
    }, () => {
      this.populateGridData(this.state.baseFormularyId, this.listPayload);
    });
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log('Multisort info:' + JSON.stringify(sorter));
    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    })

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map(sortInfo => {
        if (uniqueKeys.includes(sortInfo['columnKey'])) {

        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo['columnKey']);
        }
      });
      filteredSorter.map(sortInfo => {
        let sortOrder = sortInfo['order'] === 'ascend' ? 'asc' : 'desc';
        this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== columnKeyMapping[sortInfo['columnKey']]);
        this.state.sort_by.push({ key: columnKeyMapping[sortInfo['columnKey']], value: sortOrder });
      })

      let keys = Array();
      let values = Array();

      this.state.sort_by.map(keyPair => {
        keys.push(keyPair['key']);
        values.push(keyPair['value']);
      });

      this.listPayload.sort_by = keys;
      this.listPayload.sort_order = values;
    }

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.listPayload.sort_by = Array();
    this.listPayload.sort_order = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order, sortedInfo) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    this.listPayload.sort_by = Array();
    this.listPayload.sort_order = Array();
    if (order) {
      let sortOrder = order === 'ascend' ? 'asc' : 'desc';
      this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== columnKeyMapping[key]);
      this.state.sort_by.push({ key: columnKeyMapping[key], value: sortOrder });
    }
    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: []
    });

    let keys = Array();
    let values = Array();

    this.state.sort_by.map(keyPair => {
      keys.push(keyPair['key']);
      values.push(keyPair['value']);
    });

    this.listPayload.sort_by = keys;
    this.listPayload.sort_order = values;

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateGridData(this.state.baseFormularyId, this.listPayload);
  };

  private elementContent = createRef<HTMLDivElement>(); // createRef<T>(): RefObject<T>

  populateGridData = async (baseFormularyId, payload) => {
    if (this.props.formularyLobId && this.props.formularyLobId === 4) {
      let drugGridData = Array();
      let drugData = Array();
      let apiDetails = {};
      if (this.props.formularyId){
        apiDetails["apiPart"] =  "api/1/formulary-hpms-validations-drugs/";
        apiDetails["pathParams"] = this.props.formularyId;
      }else{
        apiDetails["apiPart"] = compareConstants.COMMERCIAL_FORMULARY_DRUGS;
        apiDetails["pathParams"] = baseFormularyId;
      }
      
      
      apiDetails["keyVals"] = [];
      apiDetails["keyVals"].push({
        key: commonConstants.KEY_LIMIT,
        value: payload["limit"],
      });
      apiDetails["keyVals"].push({
        key: commonConstants.KEY_INDEX,
        value: payload["index"],
      });

      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["attribute_field_data_type"] = "";
      apiDetails["messageBody"]["attribute_field_name"] = "";
      apiDetails["messageBody"]["attribute_field_value"] = "";
      apiDetails["messageBody"]["attribute_name"] = "";
      apiDetails["messageBody"]["attribute_type"] = this.props.title;
      apiDetails["messageBody"]["file_type"] = this.props.fileType;
      apiDetails["messageBody"]["filter"] = payload["filter"];
      apiDetails["messageBody"]["sort_by"] = payload["sort_by"];
      apiDetails["messageBody"]["sort_order"] = payload["sort_order"];
      apiDetails["messageBody"]["is_heading_count"] = true;

      try {
        let data: any = null;

        data = await getDrugs(apiDetails);
        if (data && data["list"] && data["list"].length > 0) {
          let idCount = 1;
          data["list"].map((dataItem) => {
            let value = Object.assign({}, dataItem);
            drugData.push(value);
            let row = {};
            row["id"] = idCount;
            row["key"] = idCount;
            row["label"] = value["drug_label_name"];
            row["fileType"] = value["file_type"];
            row["dataSource"] = value["data_source"];
            row["gpi"] = value["generic_product_identifier"];
            switch (this.props.title) {
              case "Tier":
                row["tier"] = value["tier_value"];
                break;

              case "Prior Authorization (PA)":
                row["paType"] =
                  value["pa_type"] === null ? "" : value["pa_type"];
                row["paGroupDescription"] =
                  value["pa_group_description"] === null
                    ? ""
                    : value["pa_group_description"];
                break;

              case "Step Therpay (ST)":
                row["stType"] =
                  value["st_type"] === null ? "" : value["st_type"];
                row["stGroupDescription"] =
                  value["st_group_description"] === null
                    ? ""
                    : value["st_group_description"];
                row["stValue"] =
                  value["st_value"] === null ? "" : value["st_value"];
                break;

              case "Quantity Limits (QL)":
                row["qlType"] =
                  value["ql_type"] === null ? "" : value["ql_type"];
                row["qlDays"] =
                  value["ql_days"] === null ? "" : value["ql_days"];
                row["qlPeriodofTime"] =
                  value["ql_period_of_time"] === null
                    ? ""
                    : value["ql_period_of_time"];
                row["qlQuantity"] =
                  value["ql_quantity"] === null ? "" : value["ql_quantity"];
                row["fillsAllowed"] =
                  value["fills_allowed"] === null ? "" : value["fills_allowed"];
                row["fullLimitPeriod"] =
                  value["full_limit_period_of_time"] === null
                    ? ""
                    : value["full_limit_period_of_time"];
                break;
            }
            drugGridData.push(row);
            idCount++;
          });
          this.setState({
            drugGridData: drugGridData,
            drugData: drugData,
            gridColumns: this.props.gridColumns,
            baseFormularyId: baseFormularyId,
            dataCount: data["count"],
            isRequestFinished: true,
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            drugGridData: Array(),
            drugData: Array(),
            gridColumns: Array(),
            baseFormularyId: "",
            refFormularyId: "",
            dataCount: 0,
            isRequestFinished: true,
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          drugGridData: Array(),
          drugData: Array(),
          gridColumns: Array(),
          baseFormularyId: "",
          refFormularyId: "",
          dataCount: 0,
          isRequestFinished: true,
        });
      }
    } else {
      this.setState({
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        baseFormularyId: "",
        refFormularyId: "",
        dataCount: 0,
        isRequestFinished: true,
      });
    }
  };

  toggleDrugsListGrid = (
    gridCellName: string | null = null,
    showCheckbox: any | null = null,
    isClose: boolean = false,
    baseFormularyId: any | null = null,
    count: any | null = null
  ) => {
    let { drugGridHeaderName } = this.state;
    if (gridCellName !== null) drugGridHeaderName = gridCellName;
    if (isClose) {
      this.listPayload = {
        index: 0,
        limit: 10,
        filter: [],
        sort_by: [],
        sort_order: []
      };
      this.setState({
        drugGridHeaderName,
        openDrugsList: !this.state.openDrugsList,
        drugGridData: Array(),
        drugData: Array(),
        gridColumns: Array(),
        baseFormularyId: "",
        refFormularyId: "",
        hiddenColumns: Array(),
        dataCount: 0,
        isRowSelectionEnabled: false,
        isRequestFinished: true,
        gridSingleSortInfo: null,
        gridMultiSortedInfo: [],
        isGridMultiSorted: false,
        isGridSingleSorted: false,
        isFiltered: false,
        filteredInfo: null,
      });
    } else {
      if (baseFormularyId && count > 0) {
        this.state.openDrugsList = !this.state.openDrugsList;
        this.state.drugGridHeaderName =
          gridCellName !== null ? gridCellName : "";
        this.state.isRowSelectionEnabled = showCheckbox;
        this.listPayload = { ...defaultListPayload };
        this.setState({
          isRequestFinished: false,
        })
        this.populateGridData(baseFormularyId, this.listPayload);
      }
    }
  };

  toggleAccordion = () => {
    let active = this.state.active === "" ? "active" : "";
    let rotate =
      this.state.active === "active"
        ? "accordion__icon"
        : "accordion__icon rotate";
    let height = "0px";
    if (null !== this.elementContent.current) {
      height =
        this.state.active === "active"
          ? "0px"
          : `${this.elementContent.current.scrollHeight}px`;
    }
    this.setState({
      active,
      height,
      rotate,
    });
  };

  toggleAccordionAll = (toggleAllAccordion) => {
    let active = "";
    let height = "0px";
    let rotate = "accordion__icon";
    if (toggleAllAccordion) {
      active = "active";
      rotate = "accordion__icon rotate";
      if (null !== this.elementContent.current) {
        height = `${this.elementContent.current.scrollHeight}px`;
      }
    }

    this.setState({
      active,
      height,
      rotate,
    });
  };

  rowSelectionChange = (data: any) => {
    this.setState({
      rejectedDrug: [...this.state.rejectedDrug, data],
    });
  };

  rejectDrugAction = () => {
    console.log(this.state.rejectedDrug);
  };

  componentDidMount() {
    let active = "";
    let height = "0px";
    let rotate = "accordion__icon";
    active = "active";
    rotate = "accordion__icon rotate";
    if (null !== this.elementContent.current) {
      height = `${this.elementContent.current.scrollHeight}px`;
    }
    this.setState({
      active,
      height,
      rotate,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.toggleAllAccordion !== this.props.toggleAllAccordion) {
      // debugger;
      this.toggleAccordionAll(this.props.toggleAllAccordion);
      // this.setState({
      //   toggleAll: prevProps.toggleAllAccordion,
      // });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   debugger;
  //   if (nextProps.toggleAllAccordion) this.toggleAccordionAll();
  // }

  render() {
    let gridColumns = [...this.state.gridColumns];
    if (
      this.state.gridColumns.length > 0 &&
      this.state.hiddenColumns.length > 0
    )
      gridColumns = this.state.gridColumns.filter(
        (column) => !this.state.hiddenColumns.includes(column["key"])
      );
    switch (this.props.tableType) {
      case "COMPARE":
        if (!this.state.isRequestFinished) {
          return <FrxLoader />
        }
        return (
          <div className="accordion__section">
            <div className={`accordion ${this.state.active}`}>
              <div
                style={{
                  backgroundColor: this.props.titleBG,
                }}
                className="title__header_container"
                onClick={this.toggleAccordion}
              >
                {this.props.showCheckbox ? (
                  <Checkbox
                    onChange={(e) => {
                      if (this.props.sectionSelected) {
                        this.props.sectionSelected(
                          this.props.title,
                          e.target.checked
                        );
                      }
                    }}
                    disabled={false}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                ) : null}
                <p className="accordion__title">{this.props.title}</p>
                <Chevron
                  className={`${this.state.rotate}`}
                  width={10}
                  height={10}
                  fill={"#323C47"}
                  toggleAccordion={this.toggleAccordion}
                />
              </div>
              <div
                className={
                  this.props.headerData.baseFormulary === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span
                  onClick={() => {
                    this.toggleDrugsListGrid(
                      // `${props.formularyType} - ${data.name}: Base Formulary`,
                      "Base Formulary",
                      false,
                      false,
                      this.props.baseformulary["id_formulary"],
                      this.props.headerData.baseFormulary
                    );
                  }}
                >
                  {this.props.headerData.baseFormulary}
                </span>
              </div>
              <div
                className={
                  this.props.headerData.referenceFormulary === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span
                  onClick={() => {
                    this.toggleDrugsListGrid(
                      // `${props.formularyType} - ${data.name}: Base Formulary`,
                      "Reference Formulary",
                      false,
                      false,
                      this.props.referenceformulary["id_formulary"],
                      this.props.headerData.referenceFormulary
                    );
                  }}
                >
                  {this.props.headerData.referenceFormulary}
                </span>
              </div>
              <div
                className={
                  this.props.headerData.baseOnly === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span></span>
              </div>
              <div
                className={
                  this.props.headerData.referenceOnly === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span></span>
              </div>
              <div
                className={
                  this.props.headerData.nonMatch === null
                    ? "cell-font-style no-border"
                    : "bg-white cell-font-style no-border"
                }
              >
                <span></span>
              </div>
            </div>
            <div
              ref={this.elementContent}
              style={{ maxHeight: `${this.state.height}` }}
              className="accordion__content"
            >
              <div className="accordion__text">{this.props.content()}</div>
            </div>
            {this.state.openDrugsList ? (
              <DialogPopup
                // showCloseIcon={actions}
                showCloseIcon={false}
                positiveActionText="Reject"
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => {
                  this.toggleDrugsListGrid(null, false, true, null, null);
                }}
                handleAction={this.rejectDrugAction}
                showActions={false}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
                className="dialog-popup clone-dialog-popup"
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={gridColumns}
                  scroll={{ x: 4600, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  customSettingIcon={
                    this.state.isRowSelectionEnabled ? null : "NONE"
                  }
                  isRowSelectionEnabled={this.state.isRowSelectionEnabled}
                  rowSelectionChange={this.rowSelectionChange}
                  isRowSelectorCheckbox
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  applySort={this.onApplySortHandler}
                  isSingleSorted={this.state.isGridSingleSorted}
                  sortedInfo={this.state.gridSingleSortInfo}
                  applyMultiSort={this.applyMultiSortHandler}
                  isMultiSorted={this.state.isGridMultiSorted}
                  multiSortedInfo={this.state.gridMultiSortedInfo}
                  onMultiSortToggle={this.onMultiSortToggle}
                  getColumnSettings={this.onSettingsIconHandler}
                  pageSize={this.listPayload.limit}
                  selectedCurrentPage={
                    this.listPayload.index / this.listPayload.limit + 1
                  }
                  totalRowsCount={this.state.dataCount}
                  isFiltered={this.state.isFiltered}
                  filteredInfo={this.state.filteredInfo}
                />
              </DialogPopup>
            ) : null}
          </div>
        );
      case "VIEW":
        if (!this.state.isRequestFinished) {
          return <FrxLoader />
        }
        return (
          <div className="accordion__section-view">
            <div className={`accordion ${this.state.active}`}>
              <div
                style={{
                  backgroundColor: this.props.titleBG,
                }}
                className="title__header_container"
                onClick={this.toggleAccordion}
              >
                {this.props.showCheckbox ? (
                  <Checkbox
                    onChange={() => console.log(this.props.title)}
                    disabled={false}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                ) : null}
                <p className="accordion__title">{this.props.title}</p>
                <Chevron
                  className={`${this.state.rotate}`}
                  width={10}
                  height={10}
                  fill={"#323C47"}
                  toggleAccordion={this.toggleAccordion}
                />
              </div>
              <div
                className={
                  this.props.headerData.baseFormulary === null
                    ? "cell-font-style"
                    : "bg-white cell-font-style"
                }
              >
                <span
                  onClick={() => {
                    this.toggleDrugsListGrid(
                      // `${props.formularyType} - ${data.name}: Base Formulary`,
                      "Base Formulary",
                      false,
                      false,
                      this.props.baseformulary["id_formulary"],
                      this.props.headerData.baseFormulary
                    );
                  }}
                >
                  {this.props.headerData.baseFormulary}
                </span>
              </div>
            </div>
            <div
              ref={this.elementContent}
              style={{ maxHeight: `${this.state.height}` }}
              className="accordion__content"
            >
              <div className="accordion__text">{this.props.content()}</div>
            </div>
            {this.state.openDrugsList ? (
              <DialogPopup
                showCloseIcon={false}
                positiveActionText=""
                negativeActionText=""
                title={this.state.drugGridHeaderName}
                handleClose={() => {
                  this.toggleDrugsListGrid(null, false, true, null, null);
                }}
                handleAction={this.rejectDrugAction}
                showActions={false}
                height="80%"
                width="80%"
                open={this.state.openDrugsList}
                className="dialog-popup clone-dialog-popup"
              >
                <FrxGridContainer
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="MEDICARE"
                  isFetchingData={false}
                  columns={gridColumns}
                  scroll={{ x: 4600, y: 500 }}
                  enableResizingOfColumns={false}
                  data={this.state.drugGridData}
                  // pinning columns
                  isPinningEnabled={true}
                  // setting gear 1st column
                  enableSettings={true}
                  // checkbox 2nd column
                  // isCustomCheckboxEnabled={checkbox}
                  // event reference for checkbox (mandotory if checkbox is true)
                  // handleCustomRowSelectionChange={(r) => {
                  //   console.log(r);
                  // }}
                  customSettingIcon={
                    this.state.isRowSelectionEnabled ? null : "NONE"
                  }
                  isRowSelectionEnabled={this.state.isRowSelectionEnabled}
                  isRowSelectorCheckbox
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  applySort={this.onApplySortHandler}
                  isSingleSorted={this.state.isGridSingleSorted}
                  sortedInfo={this.state.gridSingleSortInfo}
                  applyMultiSort={this.applyMultiSortHandler}
                  isMultiSorted={this.state.isGridMultiSorted}
                  multiSortedInfo={this.state.gridMultiSortedInfo}
                  onMultiSortToggle={this.onMultiSortToggle}
                  getColumnSettings={this.onSettingsIconHandler}
                  pageSize={this.listPayload.limit}
                  selectedCurrentPage={
                    this.listPayload.index / this.listPayload.limit + 1
                  }
                  totalRowsCount={this.state.dataCount}
                  isFiltered={this.state.isFiltered}
                  filteredInfo={this.state.filteredInfo}
                />
              </DialogPopup>
            ) : null}
          </div>
        );
      case "HPMS":
          if (!this.state.isRequestFinished) {
            return <FrxLoader />
          }
          return (
            <div className="accordion__section-view">
              <div className={`accordion ${this.state.active}`}>
                <div
                  style={{
                    backgroundColor: this.props.titleBG,
                  }}
                  className="title__header_container"
                  onClick={this.toggleAccordion}
                >
                  {this.props.showCheckbox ? (
                    <Checkbox
                      onChange={() => console.log(this.props.title)}
                      disabled={false}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  ) : null}
                  <p className="accordion__title">{this.props.title}</p>
                  <Chevron
                    className={`${this.state.rotate}`}
                    width={10}
                    height={10}
                    fill={"#323C47"}
                    toggleAccordion={this.toggleAccordion}
                  />
                </div>
                <div
                  className={
                    this.props.headerData.baseFormulary === null
                      ? "cell-font-style"
                      : "bg-white cell-font-style"
                  }
                >
                  <span
                    onClick={() => {
                      this.toggleDrugsListGrid(
                        // `${props.formularyType} - ${data.name}: Base Formulary`,
                        "Base Formulary",
                        false,
                        false,
                        this.props.baseformulary["id_formulary"],
                        this.props.headerData.baseFormulary
                      );
                    }}
                  >
                    {this.props.headerData.baseFormulary}
                  </span>
                </div>
              </div>
              <div
                ref={this.elementContent}
                style={{ maxHeight: `${this.state.height}` }}
                className="accordion__content"
              >
                <div className="accordion__text">{this.props.content()}</div>
              </div>
              {this.state.openDrugsList ? (
                <DialogPopup
                  showCloseIcon={false}
                  positiveActionText=""
                  negativeActionText=""
                  title={this.state.drugGridHeaderName}
                  handleClose={() => {
                    this.toggleDrugsListGrid(null, false, true, null, null);
                  }}
                  handleAction={this.rejectDrugAction}
                  showActions={false}
                  height="80%"
                  width="80%"
                  open={this.state.openDrugsList}
                  className="dialog-popup clone-dialog-popup"
                >
                  <FrxGridContainer
                    enableSearch={false}
                    enableColumnDrag
                    onSearch={() => { }}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName="MEDICARE"
                    isFetchingData={false}
                    columns={gridColumns}
                    scroll={{ x: 4600, y: 500 }}
                    enableResizingOfColumns={false}
                    data={this.state.drugGridData}
                    // pinning columns
                    isPinningEnabled={true}
                    // setting gear 1st column
                    enableSettings={true}
                    // checkbox 2nd column
                    // isCustomCheckboxEnabled={checkbox}
                    // event reference for checkbox (mandotory if checkbox is true)
                    // handleCustomRowSelectionChange={(r) => {
                    //   console.log(r);
                    // }}
                    customSettingIcon={
                      this.state.isRowSelectionEnabled ? null : "NONE"
                    }
                    isRowSelectionEnabled={this.state.isRowSelectionEnabled}
                    isRowSelectorCheckbox
                    getPerPageItemSize={this.onPageSize}
                    onGridPageChangeHandler={this.onGridPageChangeHandler}
                    clearFilterHandler={this.onClearFilterHandler}
                    applyFilter={this.onApplyFilterHandler}
                    applySort={this.onApplySortHandler}
                    isSingleSorted={this.state.isGridSingleSorted}
                    sortedInfo={this.state.gridSingleSortInfo}
                    applyMultiSort={this.applyMultiSortHandler}
                    isMultiSorted={this.state.isGridMultiSorted}
                    multiSortedInfo={this.state.gridMultiSortedInfo}
                    onMultiSortToggle={this.onMultiSortToggle}
                    getColumnSettings={this.onSettingsIconHandler}
                    pageSize={this.listPayload.limit}
                    selectedCurrentPage={
                      this.listPayload.index / this.listPayload.limit + 1
                    }
                    totalRowsCount={this.state.dataCount}
                    isFiltered={this.state.isFiltered}
                    filteredInfo={this.state.filteredInfo}
                  />
                </DialogPopup>
              ) : null}
            </div>
          );
      default:
        return <h1>NOT MATCHED</h1>;
    }
  }
}

export default PureAccordion;
