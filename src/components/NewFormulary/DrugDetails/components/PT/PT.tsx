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
import { getDrugDetailsColumnPT } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import {
  getDrugDetailsPTSummary,
  getPTDrugList,
  getPTReplaceSrch,
  postPTCriteriaList,
  postRemovePTDrug,
  postReplacePTDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pt/ptActionCreation";
import * as ptConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import showMessage from "../../../Utils/Toast";

import PtSettings from "./PtSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import PTRemove from "./PTRemove";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPTSummary: (a) => dispatch(getDrugDetailsPTSummary(a)),
    getPTDrugList: (a) => dispatch(getPTDrugList(a)),
    getPTReplaceSrch: (arg) => dispatch(getPTReplaceSrch(arg)),
    postPTCriteriaList: (a) => dispatch(postPTCriteriaList(a)),
    postRemovePTDrug: (a) => dispatch(postRemovePTDrug(a)),
    postReplacePTDrug: (a) => dispatch(postReplacePTDrug(a)),
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

interface ptState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  replaceTab: any;
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  data: any[];
  tabs: any[];
  ptSettingsStatus: any;
  listCount: number;
  selectedList: any[];
  selectedDrugs: any[];
  drugData: any[];
  removeTabsData: any[];
  ptRemoveCheckedList: any[];
  ptRemoveSettingsStatus: any;
  showGrid: boolean;
  sort_by: any[];
  hiddenColumns: any[];
  selectedRowKeys: number[];
  fixedSelectedRows: number[];

  // sorting & filtering api callbacks
  gridSingleSortInfo: any;
  isGridSingleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  filter: any[];
  quickFilter: any[];
  isSelectAll: boolean;
}

const columnFilterMapping = {
  prescriberTaxonomy: "is_prtx",
  coveredTaxonomy: "covered_prescriber_taxonomies",
  notCoveredTaxonomy: "not_covered_prescriber_taxonomies",
  tier: "tier_value",
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

class DrugDetailPT extends React.Component<any, any> {
  state: ptState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    replaceTab: {
      searchResult: [],
    },
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: false },
      { id: 3, text: "Remove", disabled: false },
    ],
    ptSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,
    selectedList: [],
    selectedDrugs: Array(),
    drugData: Array(),
    removeTabsData: [],
    ptRemoveCheckedList: [],
    ptRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    showGrid: false,
    sort_by: Array(),
    hiddenColumns: Array(),
    selectedRowKeys: [],
    fixedSelectedRows: [],

    // sorting & filtering api callbacks
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

  ptCriteriaPayload: any = {
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
    prescriber_taxonomies: [], //{"key":2,"value":"Med Prescribers","text":"Med Prescribers","is_list":false}
    breadcrumb_code_value: "PRTX",
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
    let ptRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ ptRemoveSettingsStatus, showGrid: false });
    this.getPTCriteriaList(isCovered);
  };

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = ptConstants.APPLY_PT_DRUGS;
      apiDetails["keyVals"] = [
        { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        // Replace and Append Drug method call
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.prescriber_taxonomies = this.state.selectedList;
        this.rpSavePayload.breadcrumb_code_value = "PRTX";
        this.rpSavePayload.is_covered = this.state.ptSettingsStatus.covered;
        this.rpSavePayload.is_select_all = this.state.isSelectAll;

        let triggerType =
          this.state.activeTabIndex === 0
            ? ptConstants.TYPE_REPLACE
            : ptConstants.TYPE_APPEND;

        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          triggerType;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplacePTDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPTSummary();
            this.getPTDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let ptCheckedList: any[] = [];
        if (this.state.ptRemoveCheckedList.length > 0) {
          ptCheckedList = this.state.ptRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.ptRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = ptCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          ptConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePTDrug(apiDetails).then((json) => {
          console.log("The Remove PT Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPTSummary();
            this.getPTDrugsList();
            this.getPTCriteriaList(this.state.ptRemoveSettingsStatus.covered);
          } else {
            console.log("------REMOVE FAILED-------");
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  validateGLForm = () => {
    if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      return !(this.state.selectedList.length === 0);
    } else if (this.state.activeTabIndex === 2) {
      return !(this.state.ptRemoveCheckedList.length === 0);
    }
  };

  showGridHandler = () => {
    // this.getPTDrugsList();
    console.log("The State of the PT Tab = ", this.state);

    if (this.validateGLForm()) {
      this.getPTDrugsList();
    } else {
      showMessage("Please Select atleast one PT", "info");
    }
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let ptSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ ptSettingsStatus, showGrid: false });
  };

  refreshSelections = ({ activeTabIndex = 0 }) => {
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      this.setState({ selectedList: [] });
    } else if (activeTabIndex === 2) {
      this.setState({ ptRemoveCheckedList: [] });
      this.getPTCriteriaList(true);
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
      this.getPTDrugsList({ listPayload: this.listPayload });
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPTDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPTDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getPTDrugsList({
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

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        ptRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("ptRemoveCheckedList: ", this.state.ptRemoveCheckedList)
    );
  };

  getPTCriteriaList = (isCovered) => {
    let apiDetails = {};
    // apiDetails["apiPart"] = ptConstants.GET_PT_CRITERIA_LIST;
    apiDetails["apiPart"] = ptConstants.GET_PT_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.ptCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.ptCriteriaPayload;

    this.props.postPTCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PT Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_prescriber_network"],
          ele["prescriber_taxonomy_code"],
          ele["prescriber_network_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The PT Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
  };

  getPTSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_DRUG_SUMMARY_PT;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPTSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PT Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PT Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        // showGrid: false,
      });
    });
  };

  getPTDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_PT_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: ptConstants.KEY_INDEX, value: index },
      { key: ptConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The PT LIST is Covered = ",
        this.state.ptRemoveSettingsStatus.covered
      );
      console.log(
        "The PT LIST is Covered = ",
        this.state.ptRemoveCheckedList.map((e) => e?.key)
      );
      listPayload["is_covered"] = this.state.ptRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.ptRemoveCheckedList.map(
        (e) => e?.key
      );
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

    ////////////////////////////////////////////////////////////////////// sorting & filtering
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
    ////////////////////////////////////////////////////////////////////// sorting & filtering
    let listCount = 0;
    const thisRef = this;
    this.props.getPTDrugList(apiDetails).then((json) => {
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
          if (this.state.ptSettingsStatus.covered) {
            if (element.covered_prescriber_taxonomies) {
              let cprsArray = element.covered_prescriber_taxonomies
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.selectedList.map((e) =>
                e.text.toLowerCase()
              );
              console.log(
                "THe 2 Arrays To Match = ",
                cprsArray,
                "  2nd Array = ",
                chFilterSettings
              );

              if (chFilterSettings.length === cprsArray.length) {
                let arrEqRes = thisRef.arraysEqual(chFilterSettings, cprsArray);
                if (arrEqRes) {
                  gridItem["isChecked"] = true;
                  gridItem["isDisabled"] = true;
                  gridItem["rowStyle"] = "table-row--blue-font";
                }
              }
            }
          } else if (!this.state.ptSettingsStatus.covered) {
            if (element.not_covered_prescriber_taxonomies) {
              let ncgendersArray = element.not_covered_prescriber_taxonomies
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.selectedList.map((e) =>
                e.text.toLowerCase()
              );
              console.log(
                "THe 2 Arrays To Match = ",
                ncgendersArray,
                "  2nd Array = ",
                chFilterSettings
              );

              if (chFilterSettings.length === ncgendersArray.length) {
                let arrEqRes = thisRef.arraysEqual(
                  chFilterSettings,
                  ncgendersArray
                );
                if (arrEqRes) {
                  gridItem["isChecked"] = true;
                  gridItem["isDisabled"] = true;
                  gridItem["rowStyle"] = "table-row--blue-font";
                }
              }
            }
          }
        }

        if (thisRef.props.configureSwitch) {
          gridItem["isDisabled"] = true;
          gridItem["rowStyle"] = "table-row--disabled-font";
        }

        gridItem["prescriberTaxonomy"] = element.is_prtx
          ? "" + element.is_prtx
          : "";
        gridItem["coveredTaxonomy"] = element.covered_prescriber_taxonomies
          ? "" + element.covered_prescriber_taxonomies
          : "";
        gridItem[
          "notCoveredTaxonomy"
        ] = element.not_covered_prescriber_taxonomies
          ? "" + element.not_covered_prescriber_taxonomies
          : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
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

  getPTReplaceSrch = (searchTxt) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ptConstants.GET_PT_DRUGS_REPLACE;
    apiDetails["pathParams"] = "";
    apiDetails["keyVals"] = [
      { key: ptConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: ptConstants.SEARCHKEY, value: searchTxt },
    ];

    this.props.getPTReplaceSrch(apiDetails).then((json) => {
      let curRow = json.payload && json.payload.data ? json.payload.data : [];
      this.setState({
        replaceTab: {
          searchResult: curRow,
        },
      });
    });
  };

  componentDidMount() {
    this.getPTSummary();
    this.getPTCriteriaList(true);
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

    // if (activeTabIndex === 2) {
    //   this.getPTCriteriaList(true);
    // }

    if (this.props.configureSwitch) {
      this.getPTDrugsList();
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
    // this.setState({
    //   selectedList: selectedItem,
    // });
    this.getPTReplaceSrch(selectedItem);
  };

  handlePNChange = (value: any[]) => {
    let pts: any[] = [];
    this.state.replaceTab.searchResult.forEach((pt: any) => {
      value.forEach((v) => {
        if (typeof v === "number")
          if (pt["key"] === v) {
            pts.push(pt);
          }
      });
    });

    this.setState({
      selectedList: pts,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getPTDrugsList();
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

      this.getPTDrugsList();
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
      this.getPTDrugsList({
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

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      // this.populateGridData(this.props.advancedSearchBody);
      this.getPTDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPTDrugsList();
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
      this.getPTDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPTDrugsList();
    }
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
    if (this.props.advancedSearchBody) {
      this.getPTDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPTDrugsList();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnPT();
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
            columns={getDrugDetailsColumnPT()}
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
            <PanelHeader
              title="prescriber taxonomy"
              tooltip="prescriber taxonomy"
            />
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
          <PtSettings
            key={this.state.activeTabIndex}
            options={this.state.replaceTab.searchResult}
            handleReplaceSrch={this.handleReplaceSrch}
            handleStatus={this.handleStatus}
            showGridHandler={this.showGridHandler}
            ptSettingsStatus={this.state.ptSettingsStatus}
            isDisabled={this.props.configureSwitch}
            handlePNChange={this.handlePNChange}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <PTRemove
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
              // <AdvancedSearch
              //   category="Grievances"
              //   openPopup={this.state.isSearchOpen}
              //   onClose={this.advanceSearchClosekHandler}
              // />
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPT);
