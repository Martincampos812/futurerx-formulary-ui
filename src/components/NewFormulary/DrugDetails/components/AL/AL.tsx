import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnAL } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import {
  getDrugDetailsALSummary,
  getDrugDetailsALList,
  postReplaceALDrug,
  getALCriteriaList,
  postRemoveALDrug,
} from "../../../../../redux/slices/formulary/drugDetails/al/alActionCreation";
import * as alConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import AgeLimitSettings from "./AgeLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";
import ALRemove from "./alRemove";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsALSummary: (a) => dispatch(getDrugDetailsALSummary(a)),
    getDrugDetailsALList: (a) => dispatch(getDrugDetailsALList(a)),
    postReplaceALDrug: (a) => dispatch(postReplaceALDrug(a)),
    getALCriteriaList: (a) => dispatch(getALCriteriaList(a)),
    postRemoveALDrug: (a) => dispatch(postRemoveALDrug(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

interface initialFormData {
  minimumVal: any;
  maximumVal: any;
  minimumType: any;
  maximumType: any;
  index: any;
  covered: boolean;
}

interface drugDetailALState {
  isSearchOpen: boolean;
  panelGridTitle1: any;
  panelTitleAlignment1: any;
  panelGridValue1: any;
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  data: any;
  tabs: any;
  selectedDrugs: any;
  drugData: any;
  lobCode: any;
  listCount: number;
  ageLimitsCount: number;
  isCovered: boolean;
  showGrid: boolean;
  showApply: boolean;
  removeData: any;
  removeTabsData: any[];
  alRemoveCheckedList: any[];
  alRemoveSettingsStatus: any;
  alSettings: initialFormData[];
  sort_by: any[];
  hiddenColumns: any[];
  selectedRowKeys: number[];
  fixedSelectedRows: number[];
  gridSingleSortInfo: any;
  isGridSingleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  filter: any[];
  quickFilter: any[];
  isSelectAll: boolean;
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
};

const initialFormData: initialFormData = {
  minimumVal: "",
  maximumVal: "",
  minimumType: "IO",
  maximumType: "IO",
  index: "",
  covered: true,
};

const columnFilterMapping = {
  is_al: "is_al",
  covered_min_operators: "covered_min_operators",
  covered_min_ages: "covered_min_ages",
  covered_max_operators: "covered_max_operators",
  covered_max_ages: "covered_max_ages",
  not_covered_min_operators: "not_covered_min_operators",
  not_covered_min_ages: "not_covered_min_ages",
  not_covered_max_operators: "not_covered_max_operators",
  not_covered_max_ages: "not_covered_max_ages",
  tier_value: "tier_value",
  drug_label_name: "drug_label_name",
  drug_descriptor_identifier: "drug_descriptor_identifier",
  generic_product_identifier: "generic_product_identifier",
  trademark_code: "trademark_code",
  database_category: "database_category",
  database_class: "database_class",
  created_by: "created_by",
  created_date: "created_date",
  modified_by: "modified_by",
  modified_date: "modified_date",
};

class DrugDetailAL extends React.Component<any, any> {
  state: drugDetailALState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: true },
      { id: 3, text: "Remove", disabled: false },
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
    listCount: 0,
    ageLimitsCount: 1,
    isCovered: true,
    showGrid: false,
    showApply: false,
    removeData: [],
    removeTabsData: [],
    alRemoveCheckedList: [],
    alRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    alSettings: [
      {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: 0,
        covered: true,
      },
    ],
    sort_by: Array(),
    hiddenColumns: Array(),
    selectedRowKeys: [],
    fixedSelectedRows: [],
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    filter: Array(),
    quickFilter: Array(),
    isSelectAll: false,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  alCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true,
  };

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    age_limits: [], //{"min_age_condition":"GT","min_age_limit":10,"max_age_condition":"","max_age_limit":null,"sequence_number":1}
    filter: [],
    search_key: "",
  };

  formData2: initialFormData[] = [
    {
      minimumVal: "",
      maximumVal: "",
      minimumType: "IO",
      maximumType: "IO",
      index: 0,
      covered: true,
    },
  ];

  rmSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [], //key
    filter: [],
    search_key: "",
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  saveClickHandler = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = alConstants.APPLY_AL_DRUG;
      apiDetails["keyVals"] = [
        { key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      let ageLimits: any[] = [];
      for (let i = 0; i < this.state.alSettings.length; i++) {
        let ageObj = {
          min_age_condition: this.formData2[i].minimumType,
          min_age_limit: +this.formData2[i].minimumVal,
          max_age_condition: this.formData2[i].maximumType,
          max_age_limit: +this.formData2[i].maximumVal,
          sequence_number: this.formData2[i].index + 1,
        };
        ageLimits.push(ageObj);
      }

      this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
      this.rpSavePayload.age_limits = ageLimits;
      this.rpSavePayload.is_covered = this.state.alSettings[0].covered;
      this.rpSavePayload.is_select_all = this.state.isSelectAll;
      apiDetails["messageBody"] = this.rpSavePayload;

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          alConstants.TYPE_REPLACE;

        // Append Functionality
        if (this.state.activeTabIndex === 1) {
          // let selDrugs = this.state.selectedDrugs;
          // let setAlconditions = new Set();
          let appendALSettings = [...ageLimits];

          if (
            this.formData2.length < 3 &&
            this.state.selectedDrugs.length === 1 &&
            ageLimits.length < 3
          ) {
            for (let i = 0; i < this.state.selectedDrugs.length; i++) {
              let tmpSelDrg = this.state.selectedDrugs[i];

              for (let j = 0; j < this.state.data.length; j++) {
                if (tmpSelDrg === this.state.data[j].md5_id) {
                  let cminOp = [];
                  let cminAg = [];
                  let cmaxOp = [];
                  let cmaxAg = [];
                  if (this.state.alSettings[0].covered) {
                    cminOp = this.state.data[j]?.covered_min_operators
                      .split(",")
                      .map((e) => e.trim());
                    cminAg = this.state.data[j]?.covered_min_ages
                      .split(",")
                      .map((e) => e.trim());
                    cmaxOp = this.state.data[j]?.covered_max_operators
                      .split(",")
                      .map((e) => e.trim());
                    cmaxAg = this.state.data[j]?.covered_max_ages
                      .split(",")
                      .map((e) => e.trim());
                  } else if (!this.state.alSettings[0].covered) {
                    cminOp = this.state.data[j]?.not_covered_min_operators
                      .split(",")
                      .map((e) => e.trim());
                    cminAg = this.state.data[j]?.not_covered_min_ages
                      .split(",")
                      .map((e) => e.trim());
                    cmaxOp = this.state.data[j]?.not_covered_max_operators
                      .split(",")
                      .map((e) => e.trim());
                    cmaxAg = this.state.data[j]?.not_covered_max_ages
                      .split(",")
                      .map((e) => e.trim());
                  }

                  if (cminOp.length > 0) {
                    let maxAls = 3;

                    for (let a = 0; a < cminOp.length; a++) {
                      if (appendALSettings.length < maxAls) {
                        if (
                          cminOp[a] !== "" &&
                          cminAg[a] !== "" &&
                          cmaxOp[a] !== "" &&
                          cmaxAg[a] !== ""
                        ) {
                          let alTmpObj = {
                            min_age_condition: cminOp[a],
                            min_age_limit: +cminAg[a],
                            max_age_condition: cmaxOp[a],
                            max_age_limit: +cmaxAg[a],
                            sequence_number: appendALSettings.length + 1,
                          };
                          appendALSettings.push(alTmpObj);
                        }
                      }
                    }
                  }
                }
              }
            }

            // let alArray = Array.from(setAlconditions);
            this.rpSavePayload.age_limits = appendALSettings;
          }
        }

        // Replace and Append Drug method call
        this.props.postReplaceALDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getALSummary();
            this.getALDrugsList();
            // this.refreshSelections({ activeTabIndex: this.state.activeTabIndex });
          } else if (json?.payload?.code && json?.payload?.code != "200") {
            showMessage(json.payload?.message, "error");
          } else {
            showMessage("Failure", "error");
            // this.refreshSelections({ activeTabIndex: this.state.activeTabIndex });
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let alCheckedList: any[] = [];
        if (this.state.alRemoveCheckedList.length > 0) {
          alCheckedList = this.state.alRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.alRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = alCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          alConstants.TYPE_REMOVE;

        // Remove Drug method call
        this.props.postRemoveALDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getALSummary();
            this.getALDrugsList();
            this.getALCriteriaList(this.state.alRemoveSettingsStatus.covered);
            this.refreshSelections({
              activeTabIndex: this.state.activeTabIndex,
            });
          } else {
            showMessage("Failure", "error");
            this.refreshSelections({
              activeTabIndex: this.state.activeTabIndex,
            });
          }
        });
      }
    }
  };

  onApplyFilterHandler = (filters) => {
    this.listPayload.filter = Array();
    if (filters && filter.length > 0) {
      const fetchedKeys = Object.keys(filters);
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps] && columnFilterMapping[fetchedProps]) {
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

          let fetchedPropsValue;
          if (filters[fetchedProps][0].value !== "") {
            const fetchedPropsValueNum = Number(
              filters[fetchedProps][0].value.toString()
            );
            fetchedPropsValue = isNaN(fetchedPropsValueNum)
              ? filters[fetchedProps][0].value.toString()
              : fetchedPropsValueNum;
          }
          const fetchedValues =
            filters[fetchedProps][0].value !== "" ? [fetchedPropsValue] : [];
          this.listPayload.filter.push({
            prop: columnFilterMapping[fetchedProps],
            operator: fetchedOperator,
            values: fetchedValues,
          });
        }
      });
      this.getALDrugsList({ listPayload: this.listPayload });
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getALDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getALDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getALDrugsList({
      index: defaultListPayload.index,
      limit: defaultListPayload.limit,
    });
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys],
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map((ele) => {
        return this.state.drugData[ele - 1]["md5_id"]
          ? this.state.drugData[ele - 1]["md5_id"]
          : "";
      });

      let selStateTmpDrugs = [...this.state.selectedDrugs, ...selDrugs];

      this.setState({ selectedDrugs: selStateTmpDrugs });
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  refreshSelections = ({ activeTabIndex = 0 }) => {
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      let alSettings = [
        {
          minimumVal: "",
          maximumVal: "",
          minimumType: "IO",
          maximumType: "IO",
          index: 0,
          covered: true,
        },
      ];

      this.formData2 = alSettings;

      this.setState({ alSettings });
    } else if (activeTabIndex === 2) {
      this.getALCriteriaList(this.state.alRemoveSettingsStatus.covered);
    }
  };

  handleMinChange = (e, args) => {
    this.formData2[args].minimumVal = e.target.value;
  };

  handleMaxChange = (e, args) => {
    this.formData2[args].maximumVal = e.target.value;
  };

  onMinChangeHandler = (e, args) => {
    this.formData2[args].minimumType = e === "Greater Than" ? "GT" : "IO";
  };

  onMaxChangeHandler = (e, args) => {
    this.formData2[args].maximumType = e === "Less Than" ? "LT" : "IO";
  };

  handleStatus = (key: string, args) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    for (let i = 0; i < this.formData2.length; i++) {
      this.formData2[i].covered = isCovered;
    }

    this.setState({ alSettings: this.formData2 });
  };

  getALSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = alConstants.GET_DRUG_SUMMARY_AL;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsALSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
      });
    });
  };

  getALCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = alConstants.GET_AL_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = {};
    this.alCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.alCriteriaPayload;

    this.props.getALCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows: any[] = [];
      for (let i = 0; i < tmpData.length; i++) {
        let obj = {};
        obj["key"] = tmpData[i]["id_age_limit_criteria"];
        obj["minAgeLimit"] = tmpData[i]["min_age_limit"];
        obj["maxAgeLimit"] = tmpData[i]["max_age_limit"];

        rows.push(obj);
      }

      this.setState({ removeData: rows, removeTabsData: rows });
    });
  };

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
  };

  getALDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = alConstants.GET_AL_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: alConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: alConstants.KEY_INDEX, value: index },
      { key: alConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      listPayload["is_covered"] = this.state.alRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.alRemoveCheckedList.map(
        (e) => e?.key
      );
    }

    apiDetails["messageBody"] = listPayload;

    if (searchBody) {
      let merged = { ...listPayload, ...searchBody };
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        merged
      );
    }

    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map((keyPair) => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      let tempKeys: any[] = [];
      keys.forEach((e) => {
        tempKeys.push(columnFilterMapping[e]);
      });

      apiDetails["messageBody"]["sort_by"] = tempKeys;
      apiDetails["messageBody"]["sort_order"] = values;
    }

    let listCount = 0;
    const thisRef = this;
    this.props.getDrugDetailsALList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      listCount = json.payload?.count;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        // for preseelct items with selected tier value

        if (this.state.activeTabIndex !== 2) {
          if (this.state.alSettings[0].covered) {
            let alcoveredMinopr = element.covered_min_operators
              ? element.covered_min_operators.split(",").map((e) => e.trim())
              : [];
            let alcoveredMinages = element.covered_min_ages
              ? element.covered_min_ages.split(",").map((e) => e.trim())
              : [];
            let alcoveredMaxopr = element.covered_max_operators
              ? element.covered_max_operators.split(",").map((e) => e.trim())
              : [];
            let alcoveredMaxages = element.covered_max_ages
              ? element.covered_max_ages.split(",").map((e) => e.trim())
              : [];
            if (this.formData2.length === alcoveredMinopr.length) {
              let formMinTypes = this.formData2.map((e) => e.minimumType);
              let formMinValue = this.formData2.map((e) => e.minimumVal);
              let formMaxTypes = this.formData2.map((e) => e.maximumType);
              let formMaxValue = this.formData2.map((e) => e.maximumVal);

              let minTypebool = thisRef.arraysEqual(
                alcoveredMinopr,
                formMinTypes
              );
              let minValbool = thisRef.arraysEqual(
                alcoveredMinages,
                formMinValue
              );
              let maxTypebool = thisRef.arraysEqual(
                alcoveredMaxopr,
                formMaxTypes
              );
              let maxValbool = thisRef.arraysEqual(
                alcoveredMaxages,
                formMaxValue
              );

              if (minTypebool && minValbool && maxTypebool && maxValbool) {
                gridItem["isChecked"] = true;
                gridItem["isDisabled"] = true;
                gridItem["rowStyle"] = "table-row--blue-font";
              }
            }
          } else if (!this.state.alSettings[0].covered) {
            let alncoveredMinopr = element.not_covered_min_operators
              ? element.not_covered_min_operators
                  .split(",")
                  .map((e) => e.trim())
              : [];
            let alncoveredMinages = element.not_covered_min_ages
              ? element.not_covered_min_ages.split(",").map((e) => e.trim())
              : [];
            let alncoveredMaxopr = element.not_covered_max_operators
              ? element.not_covered_max_operators
                  .split(",")
                  .map((e) => e.trim())
              : [];
            let alncoveredMaxages = element.not_covered_max_ages
              ? element.not_covered_max_ages.split(",").map((e) => e.trim())
              : [];
            if (this.formData2.length === alncoveredMinopr.length) {
              let formMinTypes = this.formData2.map((e) => e.minimumType);
              let formMinValue = this.formData2.map((e) => e.minimumVal);
              let formMaxTypes = this.formData2.map((e) => e.maximumType);
              let formMaxValue = this.formData2.map((e) => e.maximumVal);

              let minTypebool = thisRef.arraysEqual(
                alncoveredMinopr,
                formMinTypes
              );
              let minValbool = thisRef.arraysEqual(
                alncoveredMinages,
                formMinValue
              );
              let maxTypebool = thisRef.arraysEqual(
                alncoveredMaxopr,
                formMaxTypes
              );
              let maxValbool = thisRef.arraysEqual(
                alncoveredMaxages,
                formMaxValue
              );

              if (minTypebool && minValbool && maxTypebool && maxValbool) {
                gridItem["isChecked"] = true;
                gridItem["isDisabled"] = true;
                gridItem["rowStyle"] = "table-row--blue-font";
              }
            }
          }
        }

        if (thisRef.props.configureSwitch) {
          gridItem["isDisabled"] = true;
          gridItem["rowStyle"] = "table-row--disabled-font";
        }

        gridItem["is_al"] = element.is_al ? "" + element.is_al : "";
        gridItem["covered_min_operators"] = element.covered_min_operators
          ? "" + element.covered_min_operators
          : "";
        gridItem["covered_min_ages"] = element.covered_min_ages
          ? "" + element.covered_min_ages
          : "";
        gridItem["covered_max_operators"] = element.covered_max_operators
          ? "" + element.covered_max_operators
          : "";
        gridItem["covered_max_ages"] = element.covered_max_ages
          ? "" + element.covered_max_ages
          : "";
        gridItem[
          "not_covered_min_operators"
        ] = element.not_covered_min_operators
          ? "" + element.not_covered_min_operators
          : "";
        gridItem["not_covered_min_ages"] = element.not_covered_min_ages
          ? "" + element.not_covered_min_ages
          : "";
        gridItem[
          "not_covered_max_operators"
        ] = element.not_covered_max_operators
          ? "" + element.not_covered_max_operators
          : "";
        gridItem["not_covered_max_ages"] = element.not_covered_max_ages
          ? "" + element.not_covered_max_ages
          : "";
        gridItem["tier_value"] = element.tier_value
          ? "" + element.tier_value
          : "";
        gridItem["drug_label_name"] = element.drug_label_name
          ? "" + element.drug_label_name
          : "";
        gridItem[
          "drug_descriptor_identifier"
        ] = element.drug_descriptor_identifier
          ? "" + element.drug_descriptor_identifier
          : "";
        gridItem[
          "generic_product_identifier"
        ] = element.generic_product_identifier
          ? "" + element.generic_product_identifier
          : "";
        gridItem["trademark_code"] = element.trademark_code
          ? "" + element.trademark_code
          : "";
        gridItem["database_category"] = element.database_category
          ? "" + element.database_category
          : "";
        gridItem["database_class"] = element.database_class
          ? "" + element.database_class
          : "";
        gridItem["created_by"] = element.created_by
          ? "" + element.created_by
          : "";
        gridItem["created_date"] = element.created_date
          ? "" + element.created_date
          : "";
        gridItem["modified_by"] = element.modified_by
          ? "" + element.modified_by
          : "";
        gridItem["modified_date"] = element.modified_date
          ? "" + element.modified_date
          : "";
        gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";
        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
        listCount: listCount,
        showGrid: true,
        fixedSelectedRows: gridData
          .filter((item) => item.isChecked)
          .map((item) => item.key),
        selectedRowKeys: gridData
          .filter((item) => item.isChecked)
          .map((item) => item.key),
      });
    });
  };

  componentDidMount() {
    this.getALSummary();
    // this.getALCriteriaList(true);
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    this.refreshSelections({ activeTabIndex });

    if (this.props.configureSwitch) {
      this.getALDrugsList();
    }

    this.clearSearch();

    this.setState({ tabs, activeTabIndex, showGrid: false });
  };

  clearSearch = () => {
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    this.props.setAdvancedSearch(payload);
  };

  componentWillUnmount() {
    this.clearSearch();
  }

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let alRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ alRemoveSettingsStatus, showGrid: false });
    this.getALCriteriaList(isCovered);
  };

  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  settingFormApplyHandler = () => {
    alert(1);
  };

  validateGLForm = () => {
    let formValid = false;
    if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      for (let i = 0; i < this.formData2.length; i++) {
        if (
          this.formData2[i].minimumType &&
          this.formData2[i].maximumType &&
          this.formData2[i].maximumVal &&
          this.formData2[i].maximumVal
        ) {
          formValid = true;
        } else {
          formValid = false;
        }
      }
    } else if (this.state.activeTabIndex === 2) {
      formValid = !(this.state.alRemoveCheckedList.length === 0);
    }

    return formValid;
  };

  showGridHandler = () => {
    if (this.validateGLForm()) {
      this.getALDrugsList();
    } else {
      showMessage("Please add atleast one age limit", "info");
    }
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState({ alRemoveCheckedList: selectedRows, showGrid: false });
  };

  addNewAgeLimit = () => {
    if (this.state.alSettings.length < 3) {
      let newAgeLimit = {
        minimumVal: "",
        maximumVal: "",
        minimumType: "IO",
        maximumType: "IO",
        index: this.state.alSettings.length,
        covered: this.state.alSettings[0].covered,
      };

      let alSettings = [...this.state.alSettings];
      alSettings.push(newAgeLimit);
      this.formData2.push(newAgeLimit);
      this.setState({ alSettings });
    }
  };

  deleteAlLimit = () => {
    if (this.state.alSettings.length > 1) {
      let alSettings = [...this.state.alSettings];
      this.formData2.pop();
      alSettings.pop();
      this.setState({ alSettings });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.configureSwitch) {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: true },
          { id: 2, text: "Append", disabled: true },
          { id: 3, text: "Remove", disabled: true },
        ],
        activeTabIndex: 0,
      });

      this.getALDrugsList();
    } else {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: false },
          { id: 2, text: "Append", disabled: true },
          { id: 3, text: "Remove", disabled: false },
        ],
        showGrid: false,
      });
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.getALDrugsList({
        listPayload: this.listPayload,
        searchBody: nextProps.advancedSearchBody,
      });
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }

      this.props.setAdvancedSearch(payload);
    }
  }

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.data.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            d["rowStyle"] =
              this.state.activeTabIndex === 2
                ? "table-row--red-font"
                : "table-row--green-font";
          }
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];
        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ data: data });
      } else {
        const data = this.state.data.map((d: any) => {
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
          data: data,
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.data.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          d["rowStyle"] =
            this.state.activeTabIndex === 2
              ? "table-row--red-font"
              : "table-row--green-font";
        } else {
          if (d["rowStyle"]) delete d["rowStyle"];
        }
      }

      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      (k) => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ data: data, isSelectAll: isSelected });
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order, sortedInfo) => {
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
    if (this.props.advancedSearchBody) {
      this.getALDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getALDrugsList();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      this.getALDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getALDrugsList();
    }
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    });

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

    if (this.props.advancedSearchBody) {
      this.getALDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getALDrugsList();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnAL();
    if (this.state.hiddenColumns.length > 0) {
      columns = columns.filter(
        (key) => !this.state.hiddenColumns.includes(key)
      );
    }
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <div className="tier-grid-container">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            settingsWidth={30}
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={columns}
            scroll={{ x: 4000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
            onSelectAllRows={this.onSelectAllRows}
            customSettingIcon={"FILL-DOT"}
            totalRowsCount={this.state.listCount}
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
          />
        </div>
      );
    }

    return (
      <>
        <div className="p-10 pt-0 bordered bt-none mb-10 white-bg">
          <div className="bordered">
            <PanelHeader title="Age Limit" tooltip="Age Limit" />
            <div className="inner-container bg-light-grey">
              <div className="mb-10">
                <PanelGrid
                  panelGridTitle={this.state.panelGridTitle1}
                  panelGridValue={this.state.panelGridValue1}
                  panelTitleAlignment={this.state.panelTitleAlignment1}
                />
              </div>
              <div className="modify-wrapper bordered white-bg">
                <div className="modify-panel">
                  <div className="icon">
                    <span>P</span>
                  </div>
                  <div className="switch-box">
                    <CustomizedSwitches
                      leftTitle="Modify"
                      rightTitle="view all"
                    />
                  </div>
                  <div className="mini-tabs">
                    <FrxMiniTabs
                      tabList={this.state.tabs}
                      activeTabIndex={this.state.activeTabIndex}
                      onClickTab={this.onClickTab}
                      disabled={this.props.configureSwitch}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(this.state.activeTabIndex == 0 || this.state.activeTabIndex == 1) && (
          <AgeLimitSettings
            key={this.state.activeTabIndex}
            handleMinChange={this.handleMinChange}
            handleMaxChange={this.handleMaxChange}
            onMinChangeHandler={this.onMinChangeHandler}
            onMaxChangeHandler={this.onMaxChangeHandler}
            showGrid={this.showGridHandler}
            alSettings={this.state.alSettings}
            addNewAgeLimit={this.addNewAgeLimit}
            deleteAlLimit={this.deleteAlLimit}
            handleStatus={this.handleStatus}
            isDisabled={this.props.configureSwitch}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <ALRemove
            data={this.state.removeTabsData}
            showGridHandler={this.showGridHandler}
            handleChangeEvent={this.handleChangeEvent}
            handleRemoveChecked={this.handleRemoveChecked}
          />
        )}

        {this.state.showGrid ? (
          <div className="bordered white-bg">
            <div className="header space-between pr-10">
              Drug Grid
              <div className="button-wrapper">
                <Button
                  className="Button normal"
                  label="Advance Search"
                  onClick={this.advanceSearchClickHandler}
                />
                {!this.props.configureSwitch ? (
                  <Button
                    label="Save"
                    onClick={this.saveClickHandler}
                    disabled={!(this.state.selectedDrugs.length > 0)}
                  />
                ) : null}
              </div>
            </div>
            {dataGrid}
            {this.state.isSearchOpen ? (
              <AdvanceSearchContainer
                {...searchProps}
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailAL);
