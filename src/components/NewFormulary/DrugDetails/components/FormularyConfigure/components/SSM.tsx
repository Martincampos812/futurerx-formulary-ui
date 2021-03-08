import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import { ToastContainer } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "./PanelHeader";
import { Table } from "antd";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { getDrugDetailsColumnSSM } from "../DrugGridColumn";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import {
  getDrugDetailsSSMSummary,
  getDrugDetailsSSMList,
  getSSMCriteriaList,
  postRemoveSSMDrug,
  postReplaceSSMDrug,
} from "../../../../../../redux/slices/formulary/drugDetails/ssm/ssmActionCreation";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import * as ssmConstants from "../../../../../../api/http-drug-details";
import getLobCode from "../../../../Utils/LobUtils";
import showMessage from "../../../../Utils/Toast";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsSSMSummary: (a) => dispatch(getDrugDetailsSSMSummary(a)),
    getDrugDetailsSSMList: (a) => dispatch(getDrugDetailsSSMList(a)),
    getSSMCriteriaList: (a) => dispatch(getSSMCriteriaList(a)),
    postRemoveSSMDrug: (a) => dispatch(postRemoveSSMDrug(a)),
    postReplaceSSMDrug: (a) => dispatch(postReplaceSSMDrug(a)),
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

interface ssmState {
  isSearchOpen: boolean;
  panelGridTitle1: any[];
  panelTitleAlignment1: any[];
  panelGridValue1: any[];
  activeTabIndex: number;
  columns: any;
  data: any[];
  tabs: any[];
  selectedDrugs: any[];
  drugData: any[];
  lobCode: any;
  listCount: number;
  hiddenColumns: any[];
  selectedRowKeys: any[];
  fixedSelectedRows: any[];
  sort_by: any[];
  isGridSingleSorted: boolean;
  gridSingleSortInfo: any;
  isGridMultiSorted: boolean;
  gridMultiSortedInfo: any[];
  isSelectAll: boolean;
  showGrid: boolean;
  ssmRemoveCheckedList: any[];
  ssmRemoveData: any[];
  ssmRemoveColumn: any[];
  selectedCriteria: any[];
  selectedRxcuids: any[];
}

const columnFilterMapping = {
  is_la: "is_la",
  ssm_contract_id: "ssm_contract_id",
  ssm_pbp_id: "ssm_pbp_id",
  tier_value: "tier_value",
  file_type: "file_type",
  data_source: "data_source",
  drug_descriptor_identifier: "drug_descriptor_identifier",
  rxcui: "rxcui",
  tty: "tty",
  generic_product_identifier: "generic_product_identifier",
  drug_label_name: "drug_label_name",
  trademark_code: "trademark_code",
  database_category: "database_category",
  database_class: "database_class",
  created_by: "created_by",
  created_date: "created_date",
  modified_by: "modified_by",
  modified_date: "modified_date",
  pa_group_description: "pa_group_description",
  pa_type: "pa_type",
  st_group_description: "st_group_description",
  st_type: "st_type",
  st_value: "st_value",
  ql_type: "ql_type",
  ql_quantity: "ql_quantity",
  ql_days: "ql_days",
  is_mo: "is_mo",
  is_nm: "is_nm",
  is_ssm: "is_ssm",
  is_ibf: "is_ibf",
  me_shcui: "me_shcui",
  is_pgc: "is_pgc",
  is_fff: "is_fff",
  is_hi: "is_hi",
  is_vbid: "is_vbid",
  is_cb: "is_cb",
  cb_quanity: "cb_quanity",
  cb_days: "cb_days",
  is_lis: "is_lis",
  lis_cost_sharing_amount: "lis_cost_sharing_amount",
  is_pbst: "is_pbst",
  is_abr_formulary: "is_abr_formulary",
  is_user_defined_1: "is_user_defined_1",
  is_user_defined_2: "is_user_defined_2",
  is_user_defined_3: "is_user_defined_3",
  is_user_defined_4: "is_user_defined_4",
  is_user_defined_5: "is_user_defined_5",
};

interface initialFormData {
  ssm_contract_id: any;
  ssm_pbp_id: any;
  ssm_copay: number;
}

const initialFormData: initialFormData = {
  ssm_contract_id: "",
  ssm_pbp_id: "",
  ssm_copay: 0,
};

class SSM extends React.Component<any, any> {
  state: ssmState = {
    isSearchOpen: false,
    panelGridTitle1: [
      "Senior Saving Model",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "left", "left", "left"],
    panelGridValue1: [],
    activeTabIndex: 0,
    columns: null,
    data: [],
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: false },
      { id: 3, text: "Remove", disabled: false },
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    lobCode: null,
    listCount: 0,
    hiddenColumns: Array(),
    selectedRowKeys: [],
    fixedSelectedRows: [],
    sort_by: Array(),
    isGridSingleSorted: false,
    gridSingleSortInfo: null,
    isGridMultiSorted: false,
    gridMultiSortedInfo: [],
    isSelectAll: false,
    showGrid: false,
    ssmRemoveCheckedList: [],
    ssmRemoveData: [],
    ssmRemoveColumn: [
      { title: "copay", dataIndex: "copay", key: "copay" },
      { title: "contract id", dataIndex: "ssm_contract_id", key: "ssm_contract_id" },
      { title: "pbp id", dataIndex: "ssm_pbp_id", key: "ssm_pbp_id" },
    ],
    selectedCriteria: [],
    selectedRxcuids: [],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  formData: initialFormData = {
    ssm_contract_id: "",
    ssm_pbp_id: "",
    ssm_copay: 0,
  };

  rpSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    ssm_contract_id: "",
    ssm_pbp_id: "",
    ssm_copay: 0,
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    senior_savings_model: {}, // form Data
  };

  rmSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    ssm_contract_id: "",
    ssm_pbp_id: "",
    ssm_copay: 0,
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    senior_savings_model: {},
  }

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
      apiDetails["apiPart"] = ssmConstants.APPLY_SSM_DRUG;
      apiDetails["keyVals"] = [
        { key: ssmConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      
      this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
      this.rpSavePayload.senior_savings_model = this.formData
      this.rpSavePayload.is_select_all = this.state.isSelectAll
      this.rpSavePayload.ssm_contract_id = this.formData.ssm_contract_id
      this.rpSavePayload.ssm_pbp_id = this.formData.ssm_pbp_id
      this.rpSavePayload.ssm_copay = +this.formData.ssm_copay
      apiDetails["messageBody"] = this.rpSavePayload;

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        let triggerType = (this.state.activeTabIndex === 0) ? ssmConstants.TYPE_REPLACE : ssmConstants.TYPE_APPEND
        apiDetails["pathParams"] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id) + "/" + triggerType;

        // Replace and Append Drug method call
        this.props.postReplaceSSMDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getSSMSummary();
            this.getSSMList();
          } else if (json?.payload?.code && json?.payload?.code != "200") {
            showMessage(json.payload?.message, "error");
          } else {
            showMessage("Failure", "error");
          }
        });
      } else if(this.state.activeTabIndex === 2) {
        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rmSavePayload.selected_criteria_ids = this.state.selectedCriteria
        this.rmSavePayload.is_select_all = this.state.isSelectAll
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + ssmConstants.TYPE_REMOVE;

        // Remove Drug method call
        this.props.postRemoveSSMDrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getSSMSummary();
            this.getSSMList();
            // this.getALCriteriaList(this.state.alRemoveSettingsStatus.covered);
          } else {
            showMessage("Failure", "error");
          }
        });
      }
    }
  };

  onPageSize = (pageSize) => {
    this.setState({ selectedRxcuids: [] }, () => {
      this.listPayload.limit = pageSize;
      this.getSSMList({ limit: this.listPayload.limit });
    });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getSSMList({
      index: this.listPayload.index,
      limit: this.listPayload.limit,
      listPayload: this.listPayload,
    });
  };

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getSSMList({
      index: defaultListPayload.index,
      limit: defaultListPayload.limit,
    });
    this.setState({ selectedRxcuids: [] });
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

      this.setState({ selectedDrugs: selDrugs });
    } else {
      this.setState({ selectedDrugs: [] });
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
      this.getSSMList({ listPayload: this.listPayload });
    }
  };

  getSSMSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = ssmConstants.GET_DRUG_SUMMARY_SSM;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: ssmConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsSSMSummary(apiDetails).then((json) => {
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
        selectedRxcuids: [],
      });
    });
  };

  getSSMCriteriaList = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = ssmConstants.GET_SSM_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [{ key: ssmConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
    apiDetails["messageBody"] = {};

    this.props.getSSMCriteriaList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];      
      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          "key": ele["id_ssm_criteria"],
          "copay": ele["id_ssm_criteria"],
          "ssm_contract_id": ele["ssm_contract_id"],
          "ssm_pbp_id": ele["ssm_pbp_id"],
        };
        return curRow;
      });

      this.setState({
        ssmRemoveData: settingsRows,
        showGrid: false,
      });
    });
  }

  getSSMList = ({
    index = 0,
    limit = 10,
    listPayload = {},
    searchBody = {},
  } = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = ssmConstants.GET_SSM_FORMULARY_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: ssmConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: ssmConstants.KEY_INDEX, value: index },
      { key: ssmConstants.KEY_LIMIT, value: limit },
    ];
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

    if(this.state.activeTabIndex === 2) {
      apiDetails['messageBody']['selected_criteria_ids'] = this.state.selectedCriteria;
    }

    let listCount = 0;
    this.props.getDrugDetailsSSMList(apiDetails).then((json) => {
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

        // for preseelct items with selected SSM value
        if (this.state.activeTabIndex !== 2) {
          if (element.is_ssm && element.is_ssm === "Y") {
            if(element.ssm_contract_id && element.ssm_contract_id === this.formData.ssm_contract_id){
              if(element.ssm_pbp_id && element.ssm_pbp_id === this.formData.ssm_pbp_id){
                gridItem["isChecked"] = true;
                gridItem["isDisabled"] = true;
                gridItem["rowStyle"] = "table-row--blue-font";
              }
            }
          }
        }

        if (this.props.configureSwitch) {
          gridItem["isDisabled"] = true;
          gridItem["rowStyle"] = "table-row--disabled-font";
        }

        // Rxcuid pre selections
        if(getLobCode(this.props.formulary_lob_id) === "MCR") {
          let selrxs = this.state.selectedRxcuids.filter(e => e === element?.rxcui);

          if(selrxs.length > 0) {
            gridItem["isChecked"] = true;
            gridItem["rowStyle"] = this.state.activeTabIndex === 2 ? "table-row--red-font" : "table-row--green-font";
          }
        }

        gridItem["is_ssm"] = element.is_ssm ? "" + element.is_ssm : "";
        gridItem["ssm_contract_id"] = element.ssm_contract_id ? "" + element.ssm_contract_id : "";
        gridItem["ssm_pbp_id"] = element.ssm_pbp_id ? "" + element.ssm_pbp_id : "";
        gridItem["is_la"] = element.is_la ? "" + element.is_la : "";
        gridItem["tier_value"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["file_type"] = element.file_type ? "" + element.file_type : "";
        gridItem["data_source"] = element.data_source ? "" + element.data_source : "";
        gridItem["ndc"] = "";
        gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
        gridItem["tty"] = element.tty ? "" + element.tty : "";
        gridItem["generic_product_identifier"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["drug_label_name"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["trademark_code"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["database_category"] = element.database_category ? "" + element.database_category : "";
        gridItem["database_class"] = element.database_class ? "" + element.database_class : "";
        gridItem["created_by"] = element.created_by ? "" + element.created_by : "";
        gridItem["created_date"] = element.created_date ? "" + element.created_date : "";
        gridItem["modified_by"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modified_date"] = element.modified_date ? "" + element.modified_date : "";
        gridItem["pa_group_description"] = element.pa_group_description ? "" + element.pa_group_description : "";
        gridItem["pa_type"] = element.pa_type ? "" + element.pa_type : "";
        gridItem["st_group_description"] = element.st_group_description ? "" + element.st_group_description : "";
        gridItem["st_type"] = element.st_type ? "" + element.st_type : "";
        gridItem["st_value"] = element.st_value ? "" + element.st_value : "";
        gridItem["ql_type"] = element.ql_type ? "" + element.ql_type : "";
        gridItem["ql_quantity"] = element.ql_quantity ? "" + element.ql_quantity : "";
        gridItem["ql_days"] = element.ql_days ? "" + element.ql_days : "";
        gridItem["is_mo"] = element.is_mo ? "" + element.is_mo : "";
        gridItem["is_nm"] = element.is_nm ? "" + element.is_nm : "";
        gridItem["is_ibf"] = element.is_ibf ? "" + element.is_ibf : "";
        gridItem["me_shcui"] = element.me_shcui ? "" + element.me_shcui : "";
        gridItem["is_pgc"] = element.is_pgc ? "" + element.is_pgc : "";
        gridItem["is_fff"] = element.is_fff ? "" + element.is_fff : "";
        gridItem["is_hi"] = element.is_hi ? "" + element.is_hi : "";
        gridItem["is_vbid"] = element.is_vbid ? "" + element.is_vbid : "";
        gridItem["is_cb"] = element.is_cb ? "" + element.is_cb : "";
        gridItem["cb_quanity"] = element.cb_quanity ? "" + element.cb_quanity : "";
        gridItem["cb_days"] = element.cb_days ? "" + element.cb_days : "";
        gridItem["is_lis"] = element.is_lis ? "" + element.is_lis : "";
        gridItem["lis_red"] = "";
        gridItem["lis_cost_sharing_amount"] = element.lis_cost_sharing_amount ? "" + element.lis_cost_sharing_amount : "";
        gridItem["is_pbst"] = element.is_pbst ? "" + element.is_pbst : "";
        gridItem["is_abr_formulary"] = element.is_abr_formulary ? "" + element.is_abr_formulary : "";
        gridItem["is_user_defined_1"] = element.is_user_defined_1 ? "" + element.is_user_defined_1 : "";
        gridItem["is_user_defined_2"] = element.is_user_defined_2 ? "" + element.is_user_defined_2 : "";
        gridItem["is_user_defined_3"] = element.is_user_defined_3 ? "" + element.is_user_defined_3 : "";
        gridItem["is_user_defined_4"] = element.is_user_defined_4 ? "" + element.is_user_defined_4 : "";
        gridItem["is_user_defined_5"] = element.is_user_defined_5 ? "" + element.is_user_defined_5 : "";
        gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";

        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
        showGrid: true,
        listCount: listCount,
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
    this.getSSMSummary();
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    if (this.props.configureSwitch) {
      this.getSSMList();
    }

    this.formData = initialFormData;
    
    if(activeTabIndex === 2) {
      this.getSSMCriteriaList();
    }

    this.clearSearch();

    this.setState({
      tabs,
      activeTabIndex,
      selectedDrugs: [],
      showGrid: false,
      isSelectAll: false,
      selectedRxcuids: [],
    });
  };

  validateGLForm = () => {
    let formValid = false;
    if(this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      if(this.formData.ssm_contract_id !== "" && this.formData.ssm_copay !== null && this.formData.ssm_pbp_id !== "") {
        formValid = true;
      }
    } else if(this.state.activeTabIndex === 2) {
      formValid = !(this.state.selectedCriteria.length === 0);
    }

    return formValid;
  }

  settingFormApplyHandler = () => {
    if(this.validateGLForm()) {
      this.getSSMList();
    } else {
      this.state.activeTabIndex === 2 ? showMessage("Please select atleast one ssm", "info") : showMessage("Please fill ssm details", "info");
    }
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

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };

  selectRow = (drugGridData, selectedRow) => {    
    const data = drugGridData.map((d: any) => {
      if (d.key === selectedRow.key) {
        d["isChecked"] = true;
        d["rowStyle"] = this.state.activeTabIndex === 2 ? "table-row--red-font" : "table-row--green-font";
      }
      return d;
    });

    return data;
  }

  unselectRow = (drugGridData, selectedRow) => {
    const data = drugGridData.map((d: any) => {
      if (d.key === selectedRow.key) {
        d["isChecked"] = false;
        if (d["rowStyle"])
          delete d["rowStyle"];
      }
      return d;
    });

    return data;
  }

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        let data = this.selectRow(this.state.data, selectedRow);

        let selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];

        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        // RXcuid Mapping for Medicare
        if(getLobCode(this.props.formulary_lob_id) === "MCR") {
          let rxcuids: any[] = this.state.selectedRxcuids;
          let rxcuidIndex = rxcuids.findIndex(x => x === selectedRow?.rxcui);
          if(rxcuidIndex === -1) {
            rxcuids.push(selectedRow?.rxcui);
          }

          // Checking if there are any duplicate rxcuids in the current list of data
          let selectedRxid = selectedRow?.rxcui;
          let currentPageRxidClones = this.state.data.filter(e => (e.rxcui === selectedRxid && e.key !== selectedRow.key));

          if(currentPageRxidClones.length > 0) {
            currentPageRxidClones.forEach(e => {
              data = this.selectRow(this.state.data, e);
            })
          }

          let additionalSelectedKeys = currentPageRxidClones.map(e => e.key);

          selectedRowKeys = [...selectedRowKeys, ...additionalSelectedKeys];
          this.setState({ selectedRxcuids: rxcuids });
        }

        this.onSelectedTableRowChanged(selectedRows);

        this.setState({ data: data });
      } else {
        let data = this.unselectRow(this.state.data, selectedRow);

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        
        // RXcuid Mapping for Medicare
        if(getLobCode(this.props.formulary_lob_id) === "MCR") {
          // Checking if there are any duplicate rxcuids in the current list of data
          let selectedRxid = selectedRow?.rxcui;
          let currentPageRxidClones = this.state.data.filter(e => (e.rxcui === selectedRxid && e.key !== selectedRow.key));

          if(currentPageRxidClones.length > 0) {
            currentPageRxidClones.forEach(e => {
              data = this.unselectRow(this.state.data, e);
            })
          }

          // Updating the selected Rxcuids
          let rxcuids: any[] = this.state.selectedRxcuids;
          let rxcuidIndex = rxcuids.findIndex(x => x === selectedRow?.rxcui);
          if(rxcuidIndex !== -1) {
            const index = rxcuids.indexOf(selectedRow?.rxcui);
            if (index > -1) {
              rxcuids.splice(index, 1);
            }
          }

          this.setState({ selectedRxcuids: rxcuids });
        }

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
      this.getSSMList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getSSMList();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      this.getSSMList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getSSMList();
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
      this.getSSMList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getSSMList();
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

      this.getSSMList();
    } else {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: false },
          { id: 2, text: "Append", disabled: false },
          { id: 3, text: "Remove", disabled: false },
        ],
      });
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.getSSMList({
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

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({selectedCriteria: selectedRowKeys.map(otId => otId)});
  }

  inputChangeHandler = (e) => {
    if(e.target.name === "ssm_copay") {
      this.formData[e.target.name] = +e.target.value;
    } else {
      this.formData[e.target.name] = e.target.value;
    }
  }

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let dataGrid = <FrxLoader />;
    let columns = getDrugDetailsColumnSSM();
    if (this.state.hiddenColumns.length > 0) {
      columns = columns.filter(
        (key) => !this.state.hiddenColumns.includes(key)
      );
    }
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
            scroll={{ x: 9000, y: 377 }}
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

    let rowSelection = {
      selectedRowKeys: this.state.selectedCriteria,
      onChange: this.onSelectedRowKeysChange,
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="Senior Saving Model"
            tooltip="Define Senior Savings Model Designation in Drug Grid below for marketing material considerations."
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

              <div className="settings-form">
              {this.state.activeTabIndex === 2 ? (
                <Grid item xs={5}>
                  <div className="tier-grid-remove-container other-removed-sec">
                    <Table
                      columns={this.state.ssmRemoveColumn}
                      dataSource={this.state.ssmRemoveData}
                      pagination={false}
                      rowSelection={rowSelection}
                    />
                  </div>
                </Grid>
                ) : (
                <Grid container key={this.state.activeTabIndex}>
                  <Grid item xs={6}>
                    <div className="group">
                      <label>
                        Contract Id <span className="astrict">*</span>
                      </label>
                      <input type="text" name="ssm_contract_id" onChange={(e) => this.inputChangeHandler(e)} />
                    </div>

                    <div className="group">
                      <label>
                        PBP Id <span className="astrict">*</span>
                      </label>
                      <input type="text" name="ssm_pbp_id" onChange={(e) => this.inputChangeHandler(e)} />
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="group">
                      <label>
                        copay <span className="astrict">*</span>
                      </label>
                      <input type="number" name="ssm_copay" onChange={(e) => this.inputChangeHandler(e)} />
                    </div>
                  </Grid>
                </Grid>
              )}

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    label="Apply"
                    disabled={this.props.configureSwitch}
                    onClick={this.settingFormApplyHandler}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>

        {this.state.showGrid ? (
          <div className="bordered">
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

export default connect(mapStateToProps, mapDispatchToProps)(SSM);
