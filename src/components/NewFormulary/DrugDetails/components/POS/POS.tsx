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
import { getDrugDetailsColumnPOS } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../../DrugDetails/components/DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsPOSSummary,
  getDrugDetailsPOSSettings,
  getDrugDetailsPOSGridData,
  getDrugDetailsRemoveTab,
  postPOSCriteriaList,
  postRemovePOSDrug,
  postReplacePOSDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import * as posConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import showMessage from "../../../Utils/Toast";

import PosSettings from "./PosSettings";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer";
import PosRemove from "./PosRemove";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsPOSSummary: (a) => dispatch(getDrugDetailsPOSSummary(a)),
    getDrugDetailsPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getDrugDetailsPOSGridData: (a) => dispatch(getDrugDetailsPOSGridData(a)),
    getDrugDetailsRemoveTab: (arg) => dispatch(getDrugDetailsRemoveTab(arg)),
    postPOSCriteriaList: (a) => dispatch(postPOSCriteriaList(a)),
    postRemovePOSDrug: (a) => dispatch(postRemovePOSDrug(a)),
    postReplacePOSDrug: (a) => dispatch(postReplacePOSDrug(a)),
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

interface posState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  posSettings: any[];
  removeTabsData: any[];
  posSettingsStatus: any;
  posRemoveSettingsStatus: any;
  posCheckedList: any[];
  listCount: number;
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  data: any[];
  tabs: any[];
  isSelectAll: boolean;
  showGrid: boolean;
  selectedList: any[];
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
  placeOfService: "is_pos",
  coveredPlaceOfService: "covered_place_of_services",
  notCoveredPlaceOfService: "not_covered_place_of_services",
  tier: "tier_value",
  labelName: "drug_label_name",
  ddid: "drug_descriptor_identifier",
  gpi: "generic_product_identifier",
  coverAgeMax: "covered_max_ages",
  notCoverMin: "not_covered_min_operators",
  notCoverAgeMin: "not_covered_min_ages",
  notCoverMax: "not_covered_max_operators",
  notCoverAgeMax: "not_covered_max_ages",
  trademark: "trademark_code",
  databaseCategory: "database_category",
  databaseClass: "database_class",
  createdBy: "created_by",
  createdOn: "created_date",
  modifiedBy: "modified_by",
  modifiedOn: "modified_date",
};

class DrugDetailPOS extends React.Component<any, any> {
  state: posState = {
    isSearchOpen: false,
    panelGridTitle1: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelTitleAlignment1: ["center", "center", "center", "center"],
    panelGridValue1: [],
    posSettings: [],
    removeTabsData: [],
    posSettingsStatus: {
      type: "covered",
      covered: true,
    },
    posRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    posCheckedList: [],
    listCount: 0,
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: getDrugDetailsColumnPOS(),
    data: getDrugDetailData(),
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: true },
      { id: 3, text: "Remove", disabled: false },
    ],
    selectedList: [],
    selectedDrugs: Array(),
    drugData: Array(),
    isSelectAll: false,
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
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    is_covered: this.state.posSettingsStatus.covered,
  };

  posCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true,
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
    place_of_services: [], //[1,2]
    breadcrumb_code_value: "POS",
    filter: [],
    search_key: "",
  };

  componentDidMount() {
    this.getPOSSummary();
    this.getPOSSettings();
    // this.getPOSRemoveSettings(true);
    this.getPOSCriteriaList(true);
  }
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  saveClickHandler = () => {
    console.log("Save data");

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = posConstants.APPLY_POS_DRUGS;
      apiDetails["keyVals"] = [
        { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        // Replace & Append Drug method call
        let posRows = this.state.posSettings
          .filter((f) => f.isChecked)
          .map((e) => {
            if (e.isChecked && e.isChecked !== undefined) {
              return e.id_place_of_service_type;
            }
          });

        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.place_of_services = posRows;
        this.rpSavePayload.is_covered = this.state.posSettingsStatus.covered;
        this.rpSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          posConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        // Adding Append Condition
        if (this.state.activeTabIndex === 1) {
          let selDrugs = this.state.selectedDrugs;
          let setpos = new Set();

          posRows.forEach((el) => setpos.add(el));

          for (let i = 0; i < this.state.selectedDrugs.length; i++) {
            let tmpSelDrg = this.state.selectedDrugs[i];

            for (let j = 0; j < this.state.data.length; j++) {
              if (tmpSelDrg === this.state.data[j].md5_id) {
                let covGens = [];
                if (this.state.posSettingsStatus.covered) {
                  covGens = this.state.data[j]?.coveredPlaceOfService
                    .split(",")
                    .map((e) => e.trim().toLowerCase());
                } else if (!this.state.posSettingsStatus.covered) {
                  covGens = this.state.data[j]?.notCoveredPlaceOfService
                    .split(",")
                    .map((e) => e.trim().toLowerCase());
                }

                covGens.forEach((element) => {
                  let tmpGCode = this.state.posSettings
                    .filter(
                      (e) =>
                        e.place_of_service_type_name.toLowerCase() === element
                    )
                    .map((a) => a.id_place_of_service_type);
                  tmpGCode.forEach((el) => setpos.add(el));
                });

                console.log("The Covered POS = ", setpos);
              }
            }
          }

          let covArray = Array.from(setpos);
          this.rpSavePayload.place_of_services = covArray;
        }

        this.props.postReplacePOSDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPOSSummary();
            this.getPOSDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let posCheckedList: any[] = [];
        if (this.state.posCheckedList.length > 0) {
          posCheckedList = this.state.posCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.posRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = posCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          posConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemovePOSDrug(apiDetails).then((json) => {
          console.log("The Remove PT Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getPOSSummary();
            this.getPOSCriteriaList(this.state.posRemoveSettingsStatus.covered);
            this.getPOSDrugsList();
          } else {
            console.log("------REMOVE FAILED-------");
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  getPOSCriteriaList = (isCovered) => {
    let apiDetails = {};
    // apiDetails["apiPart"] = posConstants.GET_POS_CRITERIA_LIST;
    apiDetails["apiPart"] = posConstants.GET_POS_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.posCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.posCriteriaPayload;

    this.props.postPOSCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The POS Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_place_of_service_type"],
          ele["place_of_service_type_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The POS Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  getPOSSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SUMMARY_POS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    console.log("apiDetails 1: ", apiDetails);
    this.props.getDrugDetailsPOSSummary(apiDetails).then((json) => {
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
        // showGrid: false,
      });
    });
  };

  getPOSRemoveSettings = (isCovered) => {
    this.listPayload["is_covered"] = isCovered;
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_POS_DRUG_REMOVE_TAB;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = this.listPayload;

    this.props.getDrugDetailsRemoveTab(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The PR Temp Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_place_of_service_type"],
          ele["place_of_service_type_name"],
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

  getPOSDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_POS_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: posConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: posConstants.KEY_INDEX, value: index },
      { key: posConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The POS LIST is Covered = ",
        this.state.posRemoveSettingsStatus.covered
      );
      console.log(
        "The POS LIST is Covered = ",
        this.state.posCheckedList.map((e) => e?.key)
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
    this.props.getDrugDetailsPOSGridData(apiDetails).then((json) => {
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
          if (this.state.posSettingsStatus.covered) {
            if (element.covered_place_of_services) {
              let cprsArray = element.covered_place_of_services
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.posSettings
                .filter((e) => e.isChecked)
                .map((e) => e.place_of_service_type_name.toLowerCase());
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
          } else if (!this.state.posSettingsStatus.covered) {
            if (element.not_covered_place_of_services) {
              let ncgendersArray = element.not_covered_place_of_services
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.posSettings
                .filter((e) => e.isChecked)
                .map((e) => e.place_of_service_type_name.toLowerCase());
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

        gridItem["placeOfService"] = element.is_pos ? "" + element.is_pos : "";
        gridItem["coveredPlaceOfService"] = element.covered_place_of_services
          ? "" + element.covered_place_of_services
          : "";
        gridItem[
          "notCoveredPlaceOfService"
        ] = element.not_covered_place_of_services
          ? "" + element.not_covered_place_of_services
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
        gridItem["coverAgeMax"] = element.covered_max_ages
          ? "" + element.covered_max_ages
          : "";
        gridItem["notCoverMin"] = element.not_covered_min_operators
          ? "" + element.not_covered_min_operators
          : "";
        gridItem["notCoverAgeMin"] = element.not_covered_min_ages
          ? "" + element.not_covered_min_ages
          : "";
        gridItem["notCoverMax"] = element.not_covered_max_operators
          ? "" + element.not_covered_max_operators
          : "";
        gridItem["notCoverAgeMax"] = element.not_covered_max_ages
          ? "" + element.not_covered_max_ages
          : "";
        gridItem["tier"] = element.tier_value ? "" + element.tier_value : "";
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
      this.getPOSDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPOSDrugsList();
    }
  };

  getPOSSettings = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = posConstants.GET_DRUG_SETTING_POS;
    this.props.getDrugDetailsPOSSettings(apiDetails).then((json) => {
      const posSettings =
        json.payload && json.payload.data ? json.payload.data : [];

      posSettings.forEach((s) => {
        s["isChecked"] = false;
      });
      this.setState({
        posSettings,
      });
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
      this.getPOSDrugsList({ listPayload: this.listPayload });
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getPOSDrugsList({
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getPOSDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getPOSDrugsList({
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

      this.setState({ selectedDrugs: selStateTmpDrugs });
    } else {
      this.setState({ selectedDrugs: [] });
    }
  };

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
  };

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ posSettingsStatus, showGrid: false });
  };

  refreshSelections = ({ activeTabIndex = 0 }) => {
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      this.getPOSSettings();
    } else if (activeTabIndex === 2) {
      this.getPOSCriteriaList(true);
    }
  };

  serviceSettingsChecked = (e) => {
    // console.log(e.target.id);
    // console.log(e.target.name);
    // console.log(e.target.checked);

    const { posSettings } = this.state;

    posSettings.forEach((s: any) => {
      if (s.id_place_of_service_type === e.target.id) {
        s.isChecked = e.target.checked;
      }
    });

    this.setState({
      posSettings,
    });
  };

  handleSelectAll = () => {
    const { posSettings, isSelectAll } = this.state;
    posSettings.forEach((s: any) => {
      s.isChecked = !isSelectAll;
    });

    this.setState({
      posSettings,
      isSelectAll: !isSelectAll,
    });
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    // if (activeTabIndex === 2) {
    //   this.getPOSCriteriaList(true);
    // }

    this.refreshSelections({ activeTabIndex });

    if (this.props.configureSwitch) {
      this.getPOSDrugsList();
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

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({
      posRemoveSettingsStatus,
      showGrid: false,
      posCheckedList: [],
    });
    this.getPOSCriteriaList(isCovered);
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

  validateGLForm = () => {
    if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      let rpSelected = this.state.posSettings.filter((e) => e.isChecked);
      return !(rpSelected.length === 0);
    } else if (this.state.activeTabIndex === 2) {
      return !(this.state.posCheckedList.length === 0);
    }

    return true;
  };

  showGridHandler = () => {
    // this.setState({
    //   showGrid: !this.state.showGrid,
    // });
    // this.getPOSDrugsList();
    console.log("The State of the POS Tab = ", this.state);

    if (this.validateGLForm()) {
      this.getPOSDrugsList();
    } else {
      showMessage("Please Select atleast one POS", "info");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getPOSDrugsList();
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

      this.getPOSDrugsList();
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
      this.getPOSDrugsList({
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
      this.getPOSDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getPOSDrugsList();
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
      this.getPOSDrugsList({ searchBody: this.props.advancedSearchBody });
      // this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.getPOSDrugsList();
    }
  };
  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnPOS();
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
            columns={getDrugDetailsColumnPOS()}
            scroll={{ x: 3600, y: 377 }}
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

    const {
      posSettings,
      posSettingsStatus,
      isSelectAll,
      showGrid,
    } = this.state;

    return (
      <>
        <div className="p-10 pt-0 bordered bt-none mb-10 white-bg">
          <div className="bordered">
            <PanelHeader title="place of service" tooltip="place of service" />
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
          <PosSettings
            posSettingsServies={{ posSettings, posSettingsStatus }}
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
          <PosRemove
            data={this.state.removeTabsData}
            showGridHandler={this.showGridHandler}
            handleChangeEvent={this.handleChangeEvent}
            handleRemoveChecked={this.handleRemoveChecked}
          />
        )}

        {showGrid ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailPOS);
