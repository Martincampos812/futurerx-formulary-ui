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
import { getDrugDetailsColumnPR } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPRSummary,
  getPRSettings,
  getDrugDetailsPRList,
  getDrugDetailsRemoveTab,
  postRemovePRDrug,
  postReplacePRDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import * as prConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import showMessage from "../../../Utils/Toast";

import PrSettings from "./PrSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import PrRemove from "./PrRemove";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPRSummary: (a) => dispatch(getDrugDetailsPRSummary(a)),
    getPRSettings: (a) => dispatch(getPRSettings(a)),
    getDrugDetailsPRList: (a) => dispatch(getDrugDetailsPRList(a)),
    getDrugDetailsRemoveTab: (arg) => dispatch(getDrugDetailsRemoveTab(arg)),
    postRemovePRDrug: (arg) => dispatch(postRemovePRDrug(arg)),
    postReplacePRDrug: (arg) => dispatch(postReplacePRDrug(arg)),
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

interface prState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  removeTabsData: any[];
  posCheckedList: any[];
  posRemoveSettingsStatus: any;
  data: any[];
  tabs: any[];
  prSettings: any[];
  prSettingsStatus: any;
  listCount: number;
  showGrid: boolean;
  isSelectAll: boolean;
  selectedDrugs: any[];
  drugData: any[];
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
}

const columnFilterMapping = {
  patientResidence: "is_patrs",
  coveredpatientResidence: "covered_patient_residences",
  notCoveredpatientResidence: "not_covered_patient_residences",
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

class DrugDetailPR extends React.Component<any, any> {
  state: prState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    removeTabsData: [],
    posCheckedList: [],
    posRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    data: [],
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: true },
      { id: 3, text: "Remove", disabled: false },
    ],
    prSettings: [],
    prSettingsStatus: {
      type: "covered",
      covered: true,
    },
    listCount: 0,
    showGrid: false,
    isSelectAll: false,
    selectedDrugs: Array(),
    drugData: Array(),
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
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
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

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    patient_residences: [], // Selected Checkbox id
    breadcrumb_code_value: "PATRS",
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
    console.log("Save data");
    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = prConstants.APPLY_PR_DRUGS;
      apiDetails["keyVals"] = [
        { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        let patientResidences = this.state.prSettings
          .filter((f) => f.isChecked)
          .map((e) => {
            if (e.isChecked && e.isChecked !== undefined) {
              return e.id_patient_residence_type;
            }
          });

        console.log("----SAVE PR Ids === ", patientResidences);
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.is_covered = this.state.prSettingsStatus.covered; //this.state.posCheckedList
        this.rpSavePayload.patient_residences = patientResidences;
        this.rpSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          prConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Adding Append Condition
        if (this.state.activeTabIndex === 1) {
          let selDrugs = this.state.selectedDrugs;
          let setprs = new Set();

          patientResidences.forEach((el) => setprs.add(el));

          for (let i = 0; i < this.state.selectedDrugs.length; i++) {
            let tmpSelDrg = this.state.selectedDrugs[i];

            for (let j = 0; j < this.state.data.length; j++) {
              if (tmpSelDrg === this.state.data[j].md5_id) {
                let covGens = [];
                if (this.state.prSettingsStatus.covered) {
                  covGens = this.state.data[j]?.coveredpatientResidence
                    .split(",")
                    .map((e) => e.trim().toLowerCase());
                } else if (!this.state.prSettingsStatus.covered) {
                  covGens = this.state.data[j]?.notCoveredpatientResidence
                    .split(",")
                    .map((e) => e.trim().toLowerCase());
                }

                covGens.forEach((element) => {
                  let tmpGCode = this.state.prSettings
                    .filter(
                      (e) =>
                        e.patient_residence_type_name.toLowerCase() === element
                    )
                    .map((a) => a.id_patient_residence_type);
                  tmpGCode.forEach((el) => setprs.add(el));
                });

                console.log("The Covered PRS = ", setprs);
              }
            }
          }

          let covArray = Array.from(setprs);
          this.rpSavePayload.patient_residences = covArray;
        }

        // // Replace and Append Drug method call
        this.props.postReplacePRDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPRSummary();
            this.getPRDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let prCheckedList: any[] = [];
        if (this.state.posCheckedList.length > 0) {
          prCheckedList = this.state.posCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.posRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = prCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          prConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePRDrug(apiDetails).then((json) => {
          console.log("The Remove PR Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPRSummary();
            this.getPRRemoveSettings(
              this.state.posRemoveSettingsStatus.covered
            );
            this.getPRDrugsList();
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
      this.getPRDrugsList({ listPayload: this.listPayload });
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPRDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPRDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getPRDrugsList({
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

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
  };

  getPRSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_DRUG_SUMMARY_PR;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsPRSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["attribute_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });
      console.log("The PR Rows = ", rows);

      this.setState({
        panelGridValue1: rows,
        // showGrid: false,
      });
    });
  };

  getPRRemoveSettings = (isCovered) => {
    this.listPayload["is_covered"] = isCovered;
    let apiDetails = {};
    // apiDetails["apiPart"] = prConstants.GET_PR_DRUG_REMOVE_TAB;
    apiDetails["apiPart"] = prConstants.GET_PR_DRUG_REMOVE_TAB;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = this.listPayload;

    this.props.getDrugDetailsRemoveTab(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_patient_residence_type"],
          ele["patient_residence_type_code"],
          ele["patient_residence_type_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The PR Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posRemoveSettingsStatus, showGrid: false });
    this.getPRRemoveSettings(isCovered);
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        posCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("ROW CHANGE UPDATED STATE: ", this.state.posCheckedList)
    );
  };

  getPRSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_PR_SETTINGS_LIST;
    this.props.getPRSettings(apiDetails).then((json) => {
      const prSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      prSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        prSettings,
      });
    });
  };

  getPRDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = prConstants.GET_PR_FORMULARY_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: prConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: prConstants.KEY_INDEX, value: index },
      { key: prConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "----LIST TAB 2 PR Ids === ",
        this.state.posCheckedList.map((e) => e?.key)
      );
      console.log(
        "----LIST TAB 2 PR COVERED Status = ",
        this.state.posRemoveSettingsStatus.covered
      );
      listPayload["is_covered"] = this.state.posRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.posCheckedList.map(
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
    this.props.getDrugDetailsPRList(apiDetails).then((json) => {
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
          if (this.state.prSettingsStatus.covered) {
            if (element.covered_patient_residences) {
              let cprsArray = element.covered_patient_residences
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.prSettings
                .filter((e) => e.isChecked)
                .map((e) => e.patient_residence_type_name.toLowerCase());

              if (chFilterSettings.length === cprsArray.length) {
                let arrEqRes = thisRef.arraysEqual(chFilterSettings, cprsArray);
                if (arrEqRes) {
                  gridItem["isChecked"] = true;
                  gridItem["isDisabled"] = true;
                  gridItem["rowStyle"] = "table-row--blue-font";
                }
              }
            }
          } else if (!this.state.prSettingsStatus.covered) {
            if (element.not_covered_patient_residences) {
              let ncgendersArray = element.not_covered_patient_residences
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.prSettings
                .filter((e) => e.isChecked)
                .map((e) => e.patient_residence_type_name.toLowerCase());

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

        gridItem["patientResidence"] = element.is_patrs
          ? "" + element.is_patrs
          : "";
        gridItem["coveredpatientResidence"] = element.covered_patient_residences
          ? "" + element.covered_patient_residences
          : "";
        gridItem[
          "notCoveredpatientResidence"
        ] = element.not_covered_patient_residences
          ? "" + element.not_covered_patient_residences
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
      this.getPRDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPRDrugsList();
    }
  };

  componentDidMount() {
    this.getPRSummary();
    this.getPRSettings();
    this.getPRRemoveSettings(true);
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    // if (activeTabIndex === 2) {
    //   this.getPRRemoveSettings(true);
    // }

    this.refreshSelections({ activeTabIndex });

    if (this.props.configureSwitch) {
      this.getPRDrugsList();
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

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ prSettingsStatus, showGrid: false }, () => {
      console.log("THe Pr Settings Status = ", this.state.prSettingsStatus);
    });
  };

  refreshSelections = ({ activeTabIndex = 0 }) => {
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      this.getPRSettings();
    } else if (activeTabIndex === 2) {
      this.getPRRemoveSettings(true);
    }
  };

  serviceSettingsChecked = (e) => {
    const { prSettings } = this.state;

    prSettings.forEach((s: any) => {
      if (s.id_patient_residence_type === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      prSettings,
    });
  };

  handleSelectAll = () => {
    const { prSettings, isSelectAll } = this.state;
    prSettings.forEach((s: any) => {
      s.isChecked = !isSelectAll;
    });

    this.setState({
      prSettings,
      isSelectAll: !isSelectAll,
    });
  };

  validateGLForm = () => {
    if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      let rpSelected = this.state.prSettings.filter((e) => e.isChecked);
      return !(rpSelected.length === 0);
    } else if (this.state.activeTabIndex === 2) {
      return !(this.state.posCheckedList.length === 0);
    }

    return true;
  };

  showGridHandler = () => {
    // console.log("Called-----THe Show Grid Handler-----")
    // this.getPOSDrugsList();
    console.log("The State of the Tab = ", this.state);
    // this.setState({ showGrid: true });
    // this.getPRDrugsList();

    if (this.validateGLForm()) {
      this.getPRDrugsList();
    } else {
      showMessage("Please Select atleast one PR", "info");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getPRDrugsList();
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

      this.getPRDrugsList();
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
      console.log(
        "-----Inside Advance search Body if Condition-----advancedSearchBody ",
        nextProps.advancedSearchBody
      );
      console.log(
        "-----Inside Advance search Body if Condition-----populateGrid ",
        nextProps.advancedSearchBody
      );
      this.getPRDrugsList({
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
      this.getPRDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPRDrugsList();
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
      this.getPRDrugsList({ searchBody: this.props.advancedSearchBody });
      // this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.getPRDrugsList();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnPR();
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
            columns={getDrugDetailsColumnPR()}
            scroll={{ x: 3500, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            getPerPageItemSize={this.onPageSize}
            selectedCurrentPage={(this.listPayload.index/this.listPayload.limit + 1)}
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
    const { prSettings, prSettingsStatus, isSelectAll, showGrid } = this.state;

    return (
      <>
        <div className="p-10 pt-0 bordered bt-none mb-10 white-bg">
          <div className="bordered">
            <PanelHeader
              title="patient residence"
              tooltip="patient residence"
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
          <PrSettings
            prSettingsServies={{ prSettings, prSettingsStatus }}
            handleStatus={this.handleStatus}
            serviceSettingsChecked={this.serviceSettingsChecked}
            selectAllHandler={{
              isSelectAll: isSelectAll,
              handleSelectAll: this.handleSelectAll,
            }}
            showGridHandler={this.showGridHandler}
            isDisabled={this.props.configureSwitch}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <PrRemove
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPR);
