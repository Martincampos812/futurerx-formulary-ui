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
import { getDrugDetailsColumnPN } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import {
  getDrugDetailsPNSummary,
  getDrugDetailsPNList,
  getPNReplaceSrch,
  postPNCriteriaList,
  postRemovePNDrug,
  postReplacePNDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pn/pnActionCreation";
import * as pnConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import PnLimitSettings from "./PnLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import PNRemove from "./PNRemove";
import showMessage from "../../../Utils/Toast";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPNSummary: (a) => dispatch(getDrugDetailsPNSummary(a)),
    getDrugDetailsPNList: (a) => dispatch(getDrugDetailsPNList(a)),
    getPNReplaceSrch: (arg) => dispatch(getPNReplaceSrch(arg)),
    postPNCriteriaList: (a) => dispatch(postPNCriteriaList(a)),
    postRemovePNDrug: (a) => dispatch(postRemovePNDrug(a)),
    postReplacePNDrug: (a) => dispatch(postReplacePNDrug(a)),
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

interface pnState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  isNotesOpen: boolean;
  activeTabIndex: number;
  replaceTab: any;
  pnSettingsStatus: any;
  columns: any;
  selectedList: any[];
  data: any[];
  listCount: number;
  tabs: any[];
  selectedDrugs: any[];
  drugData: any[];
  removeTabsData: any[];
  pnRemoveCheckedList: any[];
  pnRemoveSettingsStatus: any;
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
}

const columnFilterMapping = {
  pharmacyNetwork: "is_phnw",
  coveredNetwork: "covered_pharmacy_networks",
  notCoveredNetwork: "not_covered_pharmacy_networks",
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

class DrugDetailPN extends React.Component<any, any> {
  state: pnState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    replaceTab: {
      searchResult: [],
    },
    pnSettingsStatus: {
      type: "covered",
      covered: true,
    },
    columns: null,
    selectedList: [],
    data: [],
    listCount: 0,
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: false },
      { id: 3, text: "Remove", disabled: false },
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    removeTabsData: [],
    pnRemoveCheckedList: [],
    pnRemoveSettingsStatus: {
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
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  pnCriteriaPayload: any = {
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
    pharmacy_networks: [], //{"key":1,"value":"network1","text":"network1","is_list":false}
    breadcrumb_code_value: "PHNW",
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
    let pnRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ pnRemoveSettingsStatus, showGrid: false });
    this.getPNCriteriaList(isCovered);
  };

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = pnConstants.APPLY_PN_DRUGS;
      apiDetails["keyVals"] = [
        { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        // Replace and append Drug method call
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.pharmacy_networks = this.state.selectedList;
        this.rpSavePayload.breadcrumb_code_value = "PHNW";
        this.rpSavePayload.is_covered = this.state.pnSettingsStatus.covered;
        this.rpSavePayload.is_select_all = this.state.isSelectAll;

        let triggerType =
          this.state.activeTabIndex === 0
            ? pnConstants.TYPE_REPLACE
            : pnConstants.TYPE_APPEND;

        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          triggerType;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplacePNDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPNSummary();
            this.getPNDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let pnCheckedList: any[] = [];
        if (this.state.pnRemoveCheckedList.length > 0) {
          pnCheckedList = this.state.pnRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.pnRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = pnCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          pnConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePNDrug(apiDetails).then((json) => {
          console.log("The Remove PN Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPNSummary();
            this.getPNCriteriaList(this.state.pnRemoveSettingsStatus.covered);
            this.getPNDrugsList();
          } else {
            console.log("------REMOVE FAILED-------");
            showMessage("Failure", "error");
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
      this.getPNDrugsList({ listPayload: this.listPayload });
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPNDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPNDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getPNDrugsList({
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

      this.setState({ selectedDrugs: selStateTmpDrugs }, () =>
        console.log("The Selected Drugs = ", this.state.selectedDrugs)
      );
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        pnRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("pnRemoveCheckedList: ", this.state.pnRemoveCheckedList)
    );
  };

  getPNCriteriaList = (isCovered) => {
    let apiDetails = {};
    // apiDetails["apiPart"] = pnConstants.GET_PN_CRITERIA_LIST;
    apiDetails["apiPart"] = pnConstants.GET_PN_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.pnCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.pnCriteriaPayload;

    this.props.postPNCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PN Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_pharmacy_network"],
          ele["pharmacy_npi"],
          ele["pharmacy_network_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The PN Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
  };

  getPNSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_DRUG_SUMMARY_PN;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPNSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PN Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PN Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        // showGrid: false,
      });
    });
  };

  getPNDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_PN_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: pnConstants.KEY_INDEX, value: index },
      { key: pnConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The PN LIST is Covered = ",
        this.state.pnRemoveSettingsStatus.covered
      );
      console.log(
        "The PN LIST is Covered = ",
        this.state.pnRemoveCheckedList.map((e) => e?.key)
      );
      listPayload["is_covered"] = this.state.pnRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.pnRemoveCheckedList.map(
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
    this.props.getDrugDetailsPNList(apiDetails).then((json) => {
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
          if (this.state.pnSettingsStatus.covered) {
            if (element.covered_pharmacy_networks) {
              let cprsArray = element.covered_pharmacy_networks
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
          } else if (!this.state.pnSettingsStatus.covered) {
            if (element.not_covered_pharmacy_networks) {
              let ncgendersArray = element.not_covered_pharmacy_networks
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

        gridItem["pharmacyNetwork"] = element.is_phnw
          ? "" + element.is_phnw
          : "";
        gridItem["coveredNetwork"] = element.covered_pharmacy_networks
          ? "" + element.covered_pharmacy_networks
          : "";
        gridItem["notCoveredNetwork"] = element.not_covered_pharmacy_networks
          ? "" + element.not_covered_pharmacy_networks
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

  getPNReplaceSrch = (searchTxt) => {
    let apiDetails = {};
    apiDetails["apiPart"] = pnConstants.GET_PN_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: pnConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: pnConstants.SEARCHKEY, value: searchTxt },
    ];

    this.props.getPNReplaceSrch(apiDetails).then((json) => {
      let curRow = json.payload && json.payload.data ? json.payload.data : [];
      this.setState({
        replaceTab: {
          searchResult: curRow,
        },
      });
    });
  };

  componentDidMount() {
    this.getPNSummary();
    this.getPNCriteriaList(true);
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
    //   this.getPNCriteriaList(true);
    // }

    if (this.props.configureSwitch) {
      this.getPNDrugsList();
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

  validateGLForm = () => {
    if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      return !(this.state.selectedList.length === 0);
    } else if (this.state.activeTabIndex === 2) {
      return !(this.state.pnRemoveCheckedList.length === 0);
    }
  };

  showGridHandler = () => {
    // this.getPNDrugsList();
    console.log("The State of the PN Tab = ", this.state);

    if (this.validateGLForm()) {
      this.getPNDrugsList();
    } else {
      showMessage("Please Select atleast one PN", "info");
    }
  };

  handleReplaceSrch = (selectedItem) => {
    // this.setState({
    //   selectedList: selectedItem,
    // });
    this.getPNReplaceSrch(selectedItem);
  };

  handlePNChange = (value: any[]) => {
    let pns: any[] = [];
    this.state.replaceTab.searchResult.forEach((pn: any) => {
      value.forEach((v) => {
        if (typeof v === "number")
          if (pn["key"] === v) {
            pns.push(pn);
          }
      });
    });

    this.setState({
      selectedList: pns,
    });
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let pnSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ pnSettingsStatus, showGrid: false });
  };

  refreshSelections = ({ activeTabIndex = 0 }) => {
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      // this.getPOSSettings();
      this.setState({ selectedList: [] });
    } else if (activeTabIndex === 2) {
      this.setState({ pnRemoveCheckedList: [] });
      this.getPNCriteriaList(true);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getPNDrugsList();
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

      this.getPNDrugsList();
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
      this.getPNDrugsList({
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
      this.getPNDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPNDrugsList();
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
      this.getPNDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPNDrugsList();
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
      this.getPNDrugsList({ searchBody: this.props.advancedSearchBody });
      // this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.getPNDrugsList();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnPN();
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
            columns={getDrugDetailsColumnPN()}
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
            <PanelHeader title="pharmacy network" tooltip="pharmacy network" />
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
          <PnLimitSettings
            key={this.state.activeTabIndex}
            options={this.state.replaceTab.searchResult}
            handleReplaceSrch={this.handleReplaceSrch}
            handleStatus={this.handleStatus}
            showGridHandler={this.showGridHandler}
            pnSettingsStatus={this.state.pnSettingsStatus}
            isDisabled={this.props.configureSwitch}
            handlePNChange={this.handlePNChange}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <PNRemove
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPN);
