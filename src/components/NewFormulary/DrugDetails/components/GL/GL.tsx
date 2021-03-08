import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { filter } from "lodash";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../../shared/Frx-components/panel-grid/PanelGrid";
import CustomizedSwitches from "../FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnGL } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import {
  getDrugDetailsGLSummary,
  getDrugDetailsGLList,
  postReplaceGLDrug,
  postGLCriteriaList,
  postRemoveGLDrug,
} from "../../../../../redux/slices/formulary/drugDetails/gl/glActionCreation";
import * as glConstants from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

import GenderLimitSettings from "./GenderLimitSettings";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import showMessage from "../../../Utils/Toast";
import GLRemove from "./GLRemove";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsGLSummary: (a) => dispatch(getDrugDetailsGLSummary(a)),
    getDrugDetailsGLList: (a) => dispatch(getDrugDetailsGLList(a)),
    postReplaceGLDrug: (a) => dispatch(postReplaceGLDrug(a)),
    postGLCriteriaList: (a) => dispatch(postGLCriteriaList(a)),
    postRemoveGLDrug: (a) => dispatch(postRemoveGLDrug(a)),
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

interface glState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  isNotesOpen: boolean;
  activeTabIndex: number;
  columns: any;
  data: any[];
  tabs: any[];
  selectedDrugs: any[];
  drugData: any[];
  lobCode: any;
  listCount: number;
  removeTabsData: any[];
  showGrid: boolean;
  glSettings: any[];
  glSettingsStatus: any;
  glRemoveCheckedList: any[];
  glRemoveSettingsStatus: any;
  showApply: boolean;
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
  genderLimit: "is_gl",
  coveredGender: "covered_genders",
  noCoveredGender: "not_covered_genders",
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

class DrugDetailGL extends React.Component<any, any> {
  state: glState = {
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
    removeTabsData: [],
    showGrid: false,
    glSettings: [
      { index: 0, isChecked: false, gl_type_name: "female", gl_code: "F" },
      { index: 1, isChecked: false, gl_type_name: "male", gl_code: "M" },
      { index: 2, isChecked: false, gl_type_name: "unknown", gl_code: "U" },
    ],
    glSettingsStatus: {
      type: "covered",
      covered: true,
    },
    glRemoveCheckedList: [],
    glRemoveSettingsStatus: {
      type: "covered",
      covered: true,
    },
    showApply: false,
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

  glCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    selected_criteria_ids: [2],
    not_covered: {},
    is_covered: true,
  };

  rpSavePayload: any = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    gender_limits: [],
    breadcrumb_code_value: "",
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

  getGLCriteriaList = (isCovered) => {
    let apiDetails = {};
    apiDetails["apiPart"] = glConstants.GET_GL_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    this.glCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.glCriteriaPayload;

    this.props.postGLCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      console.log("The GL Criteria Data = ", tmpData);

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_gender_type"],
          ele["gender_type_code"],
          ele["gender_type_name"],
          ele["is_covered"],
        ];
        return curRow;
      });
      console.log("The GL Criteria Remove Rows = ", rows);

      this.setState({
        removeTabsData: rows,
      });
    });
  };

  handleChangeEvent = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let glRemoveSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({
      glRemoveSettingsStatus,
      showGrid: false,
      glRemoveCheckedList: [],
    });
    this.getGLCriteriaList(isCovered);
  };

  saveClickHandler = () => {
    console.log("Save data");
    console.log("The State of the tab = ", this.state);

    let glRows = this.state.glSettings
      .filter((f) => f.isChecked)
      .map((e) => {
        if (e.isChecked && e.isChecked !== undefined) {
          return e.gl_code;
        }
      });

    console.log("The Selected Drugs For Save = ", this.state.selectedDrugs);
    console.log("The GL Rows = ", glRows);

    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = glConstants.APPLY_GL_DRUGS;
      apiDetails["keyVals"] = [
        { key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rpSavePayload.gender_limits = glRows;
        this.rpSavePayload.breadcrumb_code_value = "GL";
        this.rpSavePayload.is_covered = this.state.glSettingsStatus.covered;
        this.rpSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rpSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          glConstants.TYPE_REPLACE;
        console.log("The API Details - ", apiDetails);

        console.log("The State of the app = ", this.state);
        if (this.state.activeTabIndex === 1) {
          let selDrugs = this.state.selectedDrugs;
          let setCoveredGenders = new Set();

          glRows.forEach((el) => setCoveredGenders.add(el));

          for (let i = 0; i < this.state.selectedDrugs.length; i++) {
            let tmpSelDrg = this.state.selectedDrugs[i];

            for (let j = 0; j < this.state.data.length; j++) {
              if (tmpSelDrg === this.state.data[j].md5_id) {
                let covGens = [];
                if (this.state.glSettingsStatus.covered) {
                  covGens = this.state.data[j]?.coveredGender
                    .split(",")
                    .map((e) => e.trim().toLowerCase());
                } else if (!this.state.glSettingsStatus.covered) {
                  covGens = this.state.data[j]?.noCoveredGender
                    .split(",")
                    .map((e) => e.trim().toLowerCase()); //noCoveredGender ++ ADD
                }

                covGens.forEach((element) => {
                  let tmpGCode = this.state.glSettings
                    .filter((e) => e.gl_type_name === element)
                    .map((a) => a.gl_code);
                  tmpGCode.forEach((el) => setCoveredGenders.add(el));
                });

                console.log("The COvered Genders = ", setCoveredGenders);
              }
            }
          }

          let covArray = Array.from(setCoveredGenders);
          this.rpSavePayload.gender_limits = covArray;
        }

        // Replace and Append Drug method call
        this.props.postReplaceGLDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getGLSummary();
            this.getGLDrugsList();
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if (this.state.activeTabIndex === 2) {
        let glCheckedList: any[] = [];
        if (this.state.glRemoveCheckedList.length > 0) {
          glCheckedList = this.state.glRemoveCheckedList.map((e) => e?.key);
        }

        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs;
        this.rmSavePayload.is_covered = this.state.glRemoveSettingsStatus.covered;
        this.rmSavePayload.selected_criteria_ids = glCheckedList;
        this.rmSavePayload.is_select_all = this.state.isSelectAll;
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] =
          this.props?.formulary_id +
          "/" +
          getLobCode(this.props.formulary_lob_id) +
          "/" +
          glConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveGLDrug(apiDetails).then((json) => {
          console.log("The Remove PR Drug Response = ", json);
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            showMessage("Success", "success");
            this.getGLSummary();
            this.getGLCriteriaList(this.state.glRemoveSettingsStatus.covered);
            this.getGLDrugsList();
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
      this.getGLDrugsList({ listPayload: this.listPayload });
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize;
    this.getGLDrugsList({ limit: this.listPayload.limit });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getGLDrugsList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getGLDrugsList({
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

  handleStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let glSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    this.setState({ glSettingsStatus, showGrid: false });
  };

  refreshSelections = ({ activeTabIndex = 0 }) => {
    console.log("The State of Tab ", this.state);
    if (activeTabIndex === 0 || activeTabIndex === 1) {
      let glCleanList: any[] = [];
      for (let i = 0; i < this.state.glSettings.length; i++) {
        let glObj = {};
        glObj["gl_code"] = this.state.glSettings[i]["gl_code"];
        glObj["gl_type_name"] = this.state.glSettings[i]["gl_type_name"];
        glObj["index"] = this.state.glSettings[i]["index"];
        glObj["isChecked"] = false;
        glCleanList.push(glObj);
      }
      this.setState({ glSettings: glCleanList });
    } else if (activeTabIndex === 2) {
      this.getGLCriteriaList(true);
    }
  };

  handleRemoveChecked = (selectedRows) => {
    this.setState(
      {
        glRemoveCheckedList: selectedRows,
        showGrid: false,
      },
      () => console.log("glRemoveCheckedList: ", this.state.glRemoveCheckedList)
    );
  };

  getGLSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = glConstants.GET_DRUG_SUMMARY_GL;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsGLSummary(apiDetails).then((json) => {
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

  arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;

    return a.sort().toString() == b.sort().toString();
  };

  getGLDrugsList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = glConstants.GET_GL_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: glConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: glConstants.KEY_INDEX, value: index },
      { key: glConstants.KEY_LIMIT, value: limit },
    ];

    if (this.state.activeTabIndex === 2) {
      console.log(
        "The GL LIST is COvered = ",
        this.state.glRemoveSettingsStatus.covered
      );
      console.log(
        "The GL LIST is COvered = ",
        this.state.glRemoveCheckedList.map((e) => e?.key)
      );
      listPayload["is_covered"] = this.state.glRemoveSettingsStatus.covered;
      listPayload["selected_criteria_ids"] = this.state.glRemoveCheckedList.map(
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
    this.props.getDrugDetailsGLList(apiDetails).then((json) => {
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
          if (this.state.glSettingsStatus.covered) {
            if (element.covered_genders) {
              let cgendersArray = element.covered_genders
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.glSettings
                .filter((e) => e.isChecked)
                .map((e) => e.gl_type_name);

              if (chFilterSettings.length === cgendersArray.length) {
                let arrEqRes = thisRef.arraysEqual(
                  chFilterSettings,
                  cgendersArray
                );
                if (arrEqRes) {
                  gridItem["isChecked"] = true;
                  gridItem["isDisabled"] = true;
                  gridItem["rowStyle"] = "table-row--blue-font";
                }
              }
            }
          } else if (!this.state.glSettingsStatus.covered) {
            if (element.not_covered_genders) {
              let ncgendersArray = element.not_covered_genders
                .split(",")
                .map((e) => e.trim().toLowerCase());

              let chFilterSettings = this.state.glSettings
                .filter((e) => e.isChecked)
                .map((e) => e.gl_type_name);

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

        // if (selectedTier === parseInt(element.is_gl)) {
        //   console.log("element value tier ", selectedTier, element.is_gl);
        //   gridItem["isChecked"] = true;
        //   gridItem["isDisabled"] = true;
        //   // decide on class names based on data properties conditionally
        //   // the required styles are added under each classNames in FrxGrid.scss (towards the end)
        //   //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
        //   gridItem["rowStyle"] = "table-row--blue-font";
        // }

        if (thisRef.props.configureSwitch) {
          gridItem["isDisabled"] = true;
          gridItem["rowStyle"] = "table-row--disabled-font";
        }

        gridItem["genderLimit"] = element.is_gl ? "" + element.is_gl : "";
        gridItem["coveredGender"] = element.covered_genders
          ? "" + element.covered_genders
          : "";
        gridItem["noCoveredGender"] = element.not_covered_genders
          ? "" + element.not_covered_genders
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

  componentDidMount() {
    // const data = getDrugDetailData();
    // const columns = getDrugDetailsColumnGL();
    // this.setState({
    //   columns: columns,
    //   data: data,
    // });
    this.getGLSummary();
    this.getGLCriteriaList(true);
    // this.getGLDrugsList();
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
    //   this.getGLCriteriaList(true);
    // }

    if (this.props.configureSwitch) {
      this.getGLDrugsList();
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

  serviceSettingsChecked = (e) => {
    const { glSettings } = this.state;

    let showApply = false;
    glSettings.forEach((s: any) => {
      console.log("The Each GL Settings = ", s);
      console.log("The Service Setting Checked Event = ", e);
      if (s.index === e.target.id) {
        s.isChecked = e.target.checked;
      }
      showApply = s.isChecked && e.target.checked ? true : false;
    });

    this.setState({
      glSettings,
      showApply,
    });
  };

  validateGLForm = () => {
    if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      let rpSelected = this.state.glSettings.filter((e) => e.isChecked);
      return !(rpSelected.length === 0);
    } else if (this.state.activeTabIndex === 2) {
      return !(this.state.glRemoveCheckedList.length === 0);
    }

    return true;
  };

  showGridHandler = () => {
    console.log("The State of the Tab = ", this.state);

    if (this.validateGLForm()) {
      this.getGLDrugsList();
    } else {
      showMessage("Please Select atleast one gender limit", "info");
    }

    // if(this.state.activeTabIndex === 0) {
    //   let rpSelected = this.state.glSettings.filter(e => e.isChecked);
    //   if(rpSelected.length === 0) {
    //     showMessage("Please Select atleast one gender limit", "error");
    //   } else {
    //     this.getGLDrugsList();
    //   }

    // } else if(this.state.activeTabIndex === 2) {
    //   // let rmSelected = this.state.glRemoveCheckedList.filter(e => e.isChecked);
    //   if(this.state.glRemoveCheckedList.length === 0) {
    //     showMessage("Please Select atleast one gender limit", "error");
    //   } else {
    //     this.getGLDrugsList();
    //   }
    // }
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
      this.getGLDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getGLDrugsList();
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);
    // if(nextProps.configureSwitch) {
    //   this.getGLDrugsList();
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

      this.getGLDrugsList();
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
      this.getGLDrugsList({
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
      this.getGLDrugsList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getGLDrugsList();
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
      this.getGLDrugsList({ searchBody: this.props.advancedSearchBody });
      // this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.getGLDrugsList();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let columns = getDrugDetailsColumnGL();
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
            columns={getDrugDetailsColumnGL()}
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
            scroll={{ x: 3000, y: 377 }}
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

    const { glSettings, glSettingsStatus, showGrid } = this.state;

    return (
      <>
        <div className="p-10 pt-0 bordered bt-none mb-10 white-bg">
          <div className="bordered">
            <PanelHeader title="Gender Limit" tooltip="Gender Limit" />
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
          <GenderLimitSettings
            glSettingsServies={{ glSettings, glSettingsStatus }}
            handleStatus={this.handleStatus}
            serviceSettingsChecked={this.serviceSettingsChecked}
            showGridHandler={this.showGridHandler}
            showApply={this.state.showApply}
            isDisabled={this.props.configureSwitch}
          />
        )}

        {this.state.activeTabIndex == 2 && (
          <GLRemove
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetailGL);
