import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import { ToastContainer } from "react-toastify";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnICD } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsICDSummary,
  getDrugDetailsICDList,
  getICDReplaceSrch,
  postICDCriteriaList,
  postRemoveICDDrug,
  postReplaceICDDrug,
} from "../../../../../redux/slices/formulary/drugDetails/icd/icdActionCreation";
import * as icdConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import IcdLimitSettings from "./IcdLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import ICDRemove from "./ICDRemove";
import showMessage from "../../../Utils/Toast";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsICDSummary: (a) => dispatch(getDrugDetailsICDSummary(a)),
    getDrugDetailsICDList: (a) => dispatch(getDrugDetailsICDList(a)),
    getICDReplaceSrch: (arg) => dispatch(getICDReplaceSrch(arg)),
    postICDCriteriaList: (a) => dispatch(postICDCriteriaList(a)),
    postRemoveICDDrug: (a) => dispatch(postRemoveICDDrug(a)),
    postReplaceICDDrug: (a) => dispatch(postReplaceICDDrug(a)),
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

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
};

interface icdState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  data: any;
  selectedList: any[];
  replaceTab: any;
  lookBackDays: number;
  icdSettingsStatus: any;
  listCount: number;
  selectedDrugs: any[];
  drugData: any[];
  tabs: any[];
  removeTabsData: any[];
  icdRemoveCheckedList: any[];
  icdRemoveSettingsStatus: any;
  showGrid: boolean;
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
  icdSettings: any[];
}

const columnFilterMapping = {
  icdLimit: "is_icdl",
  coveredIcd: "covered_icds",
  icdLookBack: "lookback_days",
  not_covered_icds: "not_covered_icds",
  tier_value: "tier_value",
  labelName: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date",
};

class DrugDetailICD extends React.Component<any, any> {
  state: icdState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    selectedList: [],
    replaceTab: {
      searchResult: [],
    },
    lookBackDays: 0,
    icdSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,
    selectedDrugs: Array(),
    drugData: Array(),
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: false },
      { id: 3, text: "Remove", disabled: false },
    ],
    removeTabsData: [],
    icdRemoveCheckedList: [],
    icdRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    showGrid: false,
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
    icdSettings: [],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  icdCriteriaPayload: any = {
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
    icd_limits: {
      lookback_days: null,
      icds: [],
    },
    breadcrumb_code_value: "ICDL",
    filter: [],
    search_key: "",
  };

  rmSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
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

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let icdRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({
      icdRemoveSettingsStatus,
      showGrid: false,
      icdRemoveCheckedList: [],
    });
    this.getICDCriteriaList(isCovered);
  };

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = icdConstants.APPLY_ICD_DRUGS;
      apiDetails["keyVals"] = [
        { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        // Replace and Append Drug method call
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.icd_limits.lookback_days = +this.state.lookBackDays;
        this.rpSavePayload.icd_limits.icds = this.state.selectedList;
        this.rpSavePayload.breadcrumb_code_value = "ICDL";
        this.rpSavePayload.is_covered = this.state.icdSettingsStatus.covered;
        this.rpSavePayload.is_select_all = this.state.isSelectAll;

        let triggerType =
          this.state.activeTabIndex === 0
            ? icdConstants.TYPE_REPLACE
            : icdConstants.TYPE_APPEND;

        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          triggerType;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplaceICDDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getICDSummary();
            this.getICDDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let icdCheckedList: any[] = [];
        if (this.state.icdRemoveCheckedList.length > 0) {
          icdCheckedList = this.state.icdRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.icdRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = icdCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          icdConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveICDDrug(apiDetails).then((json) => {
          console.log("The Remove ICD Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getICDSummary();
            this.getICDCriteriaList(this.state.icdRemoveSettingsStatus.covered);
            this.getICDDrugsList();
          } else {
            console.log("------REMOVE FAILED-------");
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        icdRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () =>
        console.log("icdRemoveCheckedList: ", this.state.icdRemoveCheckedList)
    );
  };

  getICDCriteriaList = (isCovered) => {
    let apiDetails = {};
    // apiDetails["apiPart"] = icdConstants.GET_ICD_CRITERIA_LIST;
    apiDetails["apiPart"] = icdConstants.GET_ICD_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.icdCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.icdCriteriaPayload;

    this.props.postICDCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The ICD Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_icd_code"],
          ele["icd_code"],
          ele["icd_code_description"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The ICD Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  getICDSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_DRUG_SUMMARY_ICD;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsICDSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The ICD Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The ICD Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        // showGrid: false,
      });
    });
  };

  getICDDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_ICD_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: icdConstants.KEY_INDEX, value: index },
      { key: icdConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The ICD LIST is COvered = ",
        this.state.icdRemoveSettingsStatus.covered
      );
      console.log(
        "The ICD LIST is COvered = ",
        this.state.icdRemoveCheckedList.map((e) => e?.key)
      );
      listPayload["is_covered"] = this.state.icdRemoveSettingsStatus.covered;
      listPayload[
        "selected_criteria_ids"
      ] = this.state.icdRemoveCheckedList.map((e) => e?.key);
    }

    apiDetails["messageBody"] = listPayload;

    if (searchBody) {
      console.log(
        "THe Search Body = ",
        searchBody,
        " and List Payload = ",
        listPayload
      );
      let merged = { ...listPayload, ...searchBody };
      console.log("Merged Body = ", merged);
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
    this.props.getDrugDetailsICDList(apiDetails).then((json) => {
      console.log("THe State of the Tab = ", this.state);
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The GEt ICd LIst Resp = ", tmpData);
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
          if (this.state.icdSettingsStatus.covered) {
            if (element.covered_icds) {
              let cprsArray = element.covered_icds
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.selectedList.map((e) =>
                e.text.substring(0, e.text.indexOf("-")).toLowerCase()
              );
              console.log(
                "THe 2 Arrays To Match = ",
                cprsArray,
                "  2nd Array = ",
                chFilterSettings
              );
              console.log(
                "The Look back Days Check =  state = ",
                this.state.lookBackDays,
                " --- API lookback days = ",
                element.lookback_days
              );

              if (chFilterSettings.length === cprsArray.length) {
                let arrEqRes = thisRef.arraysEqual(chFilterSettings, cprsArray);
                let elLkbkDays = element.lookback_days
                  ? element.lookback_days
                  : 0;
                let lkbkDays = this.state.lookBackDays
                  ? +this.state.lookBackDays
                  : 0;
                if (arrEqRes && lkbkDays === elLkbkDays) {
                  gridItem["isChecked"] = true;
                  gridItem["isDisabled"] = true;
                  gridItem["rowStyle"] = "table-row--blue-font";
                }
              }
            }
          } else if (!this.state.icdSettingsStatus.covered) {
            if (element.not_covered_icds) {
              let ncgendersArray = element.not_covered_icds
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.selectedList.map((e) =>
                e.text.substring(0, e.text.indexOf("-")).toLowerCase()
              );
              console.log(
                "THe 2 Arrays To Match = ",
                ncgendersArray,
                "  2nd Array = ",
                chFilterSettings
              );
              console.log(
                "The Look back Days Check =  state = ",
                this.state.lookBackDays,
                " --- API lookback days = ",
                element.lookback_days
              );

              if (chFilterSettings.length === ncgendersArray.length) {
                let arrEqRes = thisRef.arraysEqual(
                  chFilterSettings,
                  ncgendersArray
                );
                let elLkbkDays = element.lookback_days
                  ? element.lookback_days
                  : 0;
                let lkbkDays = this.state.lookBackDays
                  ? +this.state.lookBackDays
                  : 0;
                if (arrEqRes && lkbkDays === elLkbkDays) {
                  gridItem["isChecked"] = true;
                  gridItem["isDisabled"] = true;
                  gridItem["rowStyle"] = "table-row--blue-font";
                }
              }
            }
          }
        }

        let modIcdLimits: any[] = [];
        if (element.covered_icds) {
          let cprsArray = element.covered_icds
            .split(",")
            .map((e) => e.trim().toLowerCase());
          modIcdLimits = element.lookback_days
            ? ("" + element.lookback_days).split(",")
            : [];
          if (cprsArray.length !== modIcdLimits.length) {
            modIcdLimits = Array(cprsArray.length).fill(+element.lookback_days);
          }
        }

        if (element.not_covered_icds) {
          let ncgendersArray = element.not_covered_icds
            .split(",")
            .map((e) => e.trim().toLowerCase());
          modIcdLimits = element.lookback_days
            ? ("" + element.lookback_days).split(",")
            : [];
          if (ncgendersArray.length !== modIcdLimits.length) {
            modIcdLimits = Array(ncgendersArray.length).fill(
              +element.lookback_days
            );
          }
        }

        if (thisRef.props.configureSwitch) {
          gridItem["isDisabled"] = true;
          gridItem["rowStyle"] = "table-row--disabled-font";
        }

        gridItem["icdLimit"] = element.is_icdl ? "" + element.is_icdl : "";
        gridItem["icdLookBack"] = modIcdLimits + "";
        gridItem["coveredIcd"] = element.covered_icds
          ? "" + element.covered_icds
          : "";
        // gridItem["icdLookBack"] = element.lookback_days
        //   ? "" + element.lookback_days
        //   : "";
        gridItem["not_covered_icds"] = element.not_covered_icds
          ? "" + element.not_covered_icds
          : "";
        gridItem["tier_value"] = element.tier_value
          ? "" + element.tier_value
          : "";
        gridItem["labelName"] = element.drug_label_name
          ? "" + element.drug_label_name
          : "";
        gridItem["ddid"] = element.drug_descriptor_identifier
          ? "" + element.drug_descriptor_identifier
          : "";
        gridItem["gpi"] = element.generic_product_identifier
          ? "" + element.generic_product_identifier
          : "";
        gridItem["trademark"] = element.trademark_code
          ? "" + element.trademark_code
          : "";
        gridItem["databaseCategory"] = element.database_category
          ? "" + element.database_category
          : "";
        gridItem["databaseClass"] = element.database_class
          ? "" + element.database_class
          : "";

        gridItem["createdBy"] = element.created_by
          ? "" + element.created_by
          : "";
        gridItem["createdOn"] = element.created_date
          ? "" + element.created_date
          : "";
        gridItem["modifiedBy"] = element.modified_by
          ? "" + element.modified_by
          : "";
        gridItem["modifiedOn"] = element.modified_date
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

  getICDReplaceSrch = (searchTxt) => {
    let apiDetails = {};
    apiDetails["apiPart"] = icdConstants.GET_ICD_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: icdConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: icdConstants.SEARCHKEY, value: searchTxt },
    ];

    this.props.getICDReplaceSrch(apiDetails).then((json) => {
      let curRow = json.payload && json.payload.data ? json.payload.data : [];
      this.setState({
        replaceTab: {
          searchResult: curRow.slice(0, 10),
        },
      });
    });
  };

  componentDidMount() {
    // const columns = getDrugDetailsColumnICD();
    // this.setState({
    //   columns: columns,
    // });
    this.getICDSummary();
    this.getICDCriteriaList(true);
  }

  refreshSelections = ({ activeTabIndex = 0 }) => {
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      // this.getPOSSettings();
      // this.setState({ selectedList: [], lookBackDays: 0 })
    } else if (activeTabIndex === 2) {
      this.getICDCriteriaList(true);
    }
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    this.refreshSelections({ activeTabIndex });

    // if (activeTabIndex === 2) {
    //   this.getICDCriteriaList(true);
    // }

    if (this.props.configureSwitch) {
      this.getICDDrugsList();
    }

    // let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    // this.props.setAdvancedSearch(payload);
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

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getICDDrugsList({
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getICDDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getICDDrugsList({
      index: defaultListPayload.index,
      limit: defaultListPayload.limit,
      listPayload: this.listPayload,
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

      this.setState({ selectedDrugs: selStateTmpDrugs }, () =>
        console.log("The Selected Drugs = ", this.state.selectedDrugs)
      );
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
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

  handleReplaceSrch = (selectedItem) => {
    this.getICDReplaceSrch(selectedItem);
  };

  handleICDChange = (value: any[]) => {
    let icds: any[] = [];
    this.state.replaceTab.searchResult.forEach((icd: any) => {
      value.forEach((v) => {
        if (typeof v === "number")
          if (icd["key"] === v) {
            icds.push(icd);
          }
      });
    });

    this.setState({
      selectedList: icds,
    });
  };

  validateGLForm = () => {
    if (this.state.activeTabIndex === 0) {
      return !(this.state.selectedList.length === 0);
    } else if (this.state.activeTabIndex === 2) {
      return !(this.state.icdRemoveCheckedList.length === 0);
    }

    return true;
  };

  showGridHandler = () => {
    // this.getICDDrugsList();
    console.log("The State of the ICD Tab = ", this.state);

    if (this.validateGLForm()) {
      this.getICDDrugsList();
    } else {
      showMessage("Please Select atleast one ICD limit", "info");
    }
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let icdSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ icdSettingsStatus, showGrid: false });
  };

  handleLookBackDays = (lookDays) => {
    this.setState({
      lookBackDays: lookDays,
    });
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
      this.getICDDrugsList({ listPayload: this.listPayload });
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getICDDrugsList();
    // }

    if (nextProps.configureSwitch) {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: true },
          { id: 2, text: "Append", disabled: true },
          { id: 3, text: "Remove", disabled: true },
        ],
        activeTabIndex: 0,
      });

      this.getICDDrugsList();
    } else {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: false },
          { id: 2, text: "Append", disabled: false },
          { id: 3, text: "Remove", disabled: false },
        ],
        showGrid: false,
      });
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      console.log(
        "-----Inside Advance search Body if Condition-----advancedSearchBody ",
        nextProps.advancedSearchBody
      );
      console.log(
        "-----Inside Advance search Body if Condition-----populateGrid ",
        nextProps.advancedSearchBody
      );
      this.getICDDrugsList({
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

      console.log("---_Set Advanced Search payload = ", payload);
      this.props.setAdvancedSearch(payload);
    }
  }

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    console.log(
      "Settings icon handler: Hidden" +
        JSON.stringify(hiddenColumn) +
        " Visible:" +
        JSON.stringify(visibleColumn)
    );
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
    console.log("data row ", selectedRow, isSelected);
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
        console.log("selected row keys ", selectedRowKeys);
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
    if (this.props.advancedSearchBody) {
      this.getICDDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getICDDrugsList();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      // this.populateGridData(this.props.advancedSearchBody);
      this.getICDDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getICDDrugsList();
    }
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));

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
      this.getICDDrugsList({ searchBody: this.props.advancedSearchBody });
      // this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.getICDDrugsList();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnICD();
    if (this.state.hiddenColumns.length > 0) {
      columns = columns.filter(
        (key) => !this.state.hiddenColumns.includes(key)
      );
    }
    let dataGrid = <FrxLoader />;
    if (this.state.data) {
      dataGrid = (
        <div className="tier-grid-container">
          {/* <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="DRUGSDETAILS"
            enableSettings={false}
            columns={getDrugDetailsColumnICD()}
            scroll={{ x: 3200, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            getPerPageItemSize={this.onPageSize}
            selectedCurrentPage={
              this.listPayload.index / this.listPayload.limit + 1
            }
            pageSize={this.listPayload.limit}
            onGridPageChangeHandler={this.onGridPageChangeHandler}
            totalRowsCount={this.state.listCount}
            clearFilterHandler={this.onClearFilterHandler}
            applyFilter={this.onApplyFilterHandler}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
              onChange: this.onSelectedTableRowChanged,
            }}
          /> */}
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            settingsWidth={50}
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={columns}
            scroll={{ x: 3600, y: 377 }}
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
            <PanelHeader title="ICD Limit" tooltip="ICD Limit" />
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
          <IcdLimitSettings
            options={this.state.replaceTab.searchResult}
            handleReplaceSrch={this.handleReplaceSrch}
            handleStatus={this.handleStatus}
            showGridHandler={this.showGridHandler}
            icdSettingsStatus={this.state.icdSettingsStatus}
            handleLookBackDays={this.handleLookBackDays}
            isDisabled={this.props.configureSwitch}
            handleICDChange={this.handleICDChange}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <ICDRemove
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
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailICD);
