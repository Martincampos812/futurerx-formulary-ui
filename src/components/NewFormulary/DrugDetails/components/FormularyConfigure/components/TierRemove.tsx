import React from "react";
import { connect } from "react-redux";

import "./Tier.scss";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import { Row, Col } from "antd";
import Button from "../../../../../shared/Frx-components/button/Button";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns, tierColumnsNonMcr } from "../../../../../../utils/grid/columns";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import {
  postTierApplyInfo,
  getTier,
} from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../Utils/Toast";
import { getIntelliscenseSearch } from "../../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import "./TierReplace.scss";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import * as _ from "lodash";
import getLobCode from "../../../../Utils/LobUtils";

interface tabsState {
  tierGridContainer: boolean;
  isSearchOpen: boolean;
  fileTypes: any[];
  tierValues: any[];
  selectedTier: any;
  selectedFileKey: any;
  selectedFileType: any;
  drugData: any[];
  drugGridData: any[];
  selectedCriteria: any[];
  selectedDrugs: any[];
  hiddenColumns: any[];
  selectedRowKeys: any[];
  dataCount: any;
  gridSingleSortInfo: any;
  isGridSingleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  searchData: any[];
  searchNames: any[];
  isFiltered: boolean;
  filteredInfo: any;
  filter: any[];
  isSelectAll: boolean;
  isRequestFinished: boolean;
  isColumnsChanged: boolean;
  changedColumns: any[];
  selectedRxcuids: any[];
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    tierData: state.tierSliceReducer.data,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postTierApplyInfo: (a) => dispatch(postTierApplyInfo(a)),
    getTier: (a) => dispatch(getTier(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    getIntelliscenseSearch: (a) => dispatch(getIntelliscenseSearch(a)),
  };
}

class TierRemove extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    isSearchOpen: false,
    tierValues: Array(),
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedCriteria: Array(),
    selectedDrugs: Array(),
    selectedTier: -1,
    selectedFileKey: null,
    selectedFileType: "Full Formulary",
    fileTypes: [
      { type: "FRF", key: "FRF" },
      { type: "ORF/ERF", key: "OTC" },
      { type: "Non FRF Products", key: "NONFRF" },
      { type: "FRF Change Report", key: "FRFCR" },
      { type: "Full Formulary", key: "MCR" },
    ],
    index: 0,
    limit: 10,
    filter: Array(),
    sort_by: [{ key: 'drug_label_name', value: 'asc' }],
    hiddenColumns: Array(),
    dataCount: 0,
    selectedRowKeys: Array(),
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    searchData: Array(),
    quickFilter: Array(),
    isFiltered: false,
    filteredInfo: null,
    isSelectAll: false,
    isRequestFinished: true,
    changedColumns: Array(),
    isColumnsChanged: false,
    selectedRxcuids: [],
  };

  constructor(props) {
    super(props);

    var tierOptions = Array();
    if (this.props["tierData"] && this.props["tierData"].length > 0) {
      this.props["tierData"].map((tier) => {
        tierOptions.push(tier.tier_value);
      });
    }
    let fileTypesModified: any[] = [];

    this.state.fileTypes.map((fileType) => {
      if (fileType.type === "Full Formulary") {
        fileType.key = this.props.lobCode;
      }
      fileTypesModified.push(fileType);
      this.state.fileValues.push(fileType.type);
    });
    this.state.fileTypes = fileTypesModified;
    this.state.tierValues = tierOptions;
    this.state.selectedFileKey = this.props.lobCode;
  }
  
  onApplyFilterHandler = (filters, filteredInfo) => {
    console.log("filtering from be:" + (JSON.stringify(filters)));
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(element => element['prop'] !== fetchedProps);
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
            values: fetchedValues
          });
        }
      });

      this.setState({
        isFiltered: true,
        filteredInfo: filteredInfo
      }, () => {
        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      });

    } else {
      this.setState({
        filter: Array(),
        isFiltered: false,
        filteredInfo: filteredInfo
      }, () => {
        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      });
    }
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
      let sortOrder = order === 'ascend' ? 'asc' : 'desc';
      this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== key);
      this.state.sort_by.push({ key: key, value: sortOrder });
    } else {
      this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    }
    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: []
    });
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
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
        this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== sortInfo['columnKey']);
        this.state.sort_by.push({ key: sortInfo['columnKey'], value: sortOrder });
      })
    }

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    if (!isMultiSortOn)
      this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onPageSize = pageSize => {
    this.setState({ selectedRxcuids: [] }, () => {
      console.log("Page size load");
      this.state.limit = pageSize;
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    });
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    console.log("Page change load");
    this.state.index = (pageNumber - 1) * this.state.limit;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  
  onClearFilterHandler = () => {
    this.setState({
      filter: Array(),
      isFiltered: false,
      filteredInfo: null,
      selectedRxcuids: [],
    }, () => {
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    });
  };

  onSearchValueChanges = (value, event) => {
    console.log("Search value changed:" + event.value + " " + event.key);
    this.state.searchValue = value;
    this.state.quickFilter = [];
    if (
      this.state.searchData &&
      Array.isArray(this.state.searchData) &&
      this.state.searchData.length > 0
    ) {
      if (event.key < this.state.searchData.length) {
        let propData = this.state.searchData[event.key];
        switch (propData.key) {
          case "drug_descriptor_identifier":
            this.state.quickFilter.push({
              prop: "drug_descriptor_identifier",
              operator: "is_like",
              values: [propData.value],
            });
            break;

          case "rxcui":
            this.state.quickFilter.push({
              prop: "rxcui",
              operator: "is_like",
              values: [propData.value],
            });
            break;

          case "ndc":
            this.state.quickFilter.push({
              prop: "ndc",
              operator: "is_like",
              values: [propData.value],
            });
            break;

          case "generic_product_identifier":
            this.state.quickFilter.push({
              prop: "generic_product_identifier",
              operator: "is_like",
              values: [propData.value],
            });
            break;

          case "drug_label_name":
            this.state.quickFilter.push({
              prop: "drug_label_name",
              operator: "is_like",
              values: [propData.value],
            });
            break;

          case "database_class":
            this.state.quickFilter.push({
              prop: "database_class",
              operator: "is_like",
              values: [propData.value],
            });
            break;

          case "database_category":
            this.state.quickFilter.push({
              prop: "database_category",
              operator: "is_like",
              values: [propData.value],
            });
            break;
        }
        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      }
    }
  };

  clearSearchFilter = (e) => {
    this.state.quickFilter = Array();
    this.state.searchData = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onInputValueChanged = (value) => {
    if (value) {
      let lobCode = this.props.lobCode;
      let requests = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = commonConstants.SEARCH_GPI;
      apiDetails["pathParams"] =
        this.props?.formulary_id + "/" + lobCode + "/" + "F";
      if (lobCode === "MCR") {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] +
          "/" +
          (this.props.formulary_type_id === 1 ? "MC" : "MMP");
      } else {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] + "/" + lobCode;
      }
      apiDetails["keyVals"] = [
        { key: commonConstants.KEY_SEARCH_VALUE, value: value },
      ];
      requests.push({
        key: "generic_product_identifier",
        apiDetails: apiDetails,
      });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_NDC;
      requests.push({ key: "ndc", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_LABEL_NAME;
      requests.push({ key: "drug_label_name", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_CLASS;
      requests.push({ key: "database_class", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_CATEGORY;
      requests.push({ key: "database_category", apiDetails: apiDetails });

      if (this.props.formulary_lob_id == 1) {
        apiDetails = Object.assign({}, apiDetails);
        apiDetails["apiPart"] = commonConstants.SEARCH_RXCUI;
        requests.push({ key: "rxcui", apiDetails: apiDetails });
      } else {
        apiDetails = Object.assign({}, apiDetails);
        apiDetails["apiPart"] = commonConstants.SEARCH_DDID;
        requests.push({
          key: "drug_descriptor_identifier",
          apiDetails: apiDetails,
        });
      }

      const drugGridData = this.props
        .getIntelliscenseSearch(requests)
        .then((json) => {
          if (
            json.payload &&
            json.payload.data &&
            Array.isArray(json.payload.data) &&
            json.payload.data.length > 0
          ) {
            let tmpData = json.payload.data;
            var data: any[] = [];
            var gridData = tmpData.map(function (el) {
              var element = Object.assign({}, el);
              data.push(element);
              let gridItem = element["value"];
              return gridItem;
            });
            this.setState({
              searchData: data,
              searchNames: gridData,
            });
          }
        });
    }
  };

  processMedGridData = (gridItem, element) => {
    gridItem["override_category"] = element.override_category ? "" + element.override_category : "";
    gridItem["override_class"] = element.override_class ? "" + element.override_class : "";
    gridItem["database_category"] = element.database_category ? "" + element.database_category : "";
    gridItem["database_class"] = element.database_class ? "" + element.database_class : "";
    gridItem["drug_label_name"] = element.drug_label_name ? "" + element.drug_label_name : "";
    gridItem["file_type"] = element.file_type ? "" + element.file_type : "";
    gridItem["data_source"] = element.data_source ? "" + element.data_source : "";
    gridItem["ndc"] = element.ndc ? "" + element.ndc : "";
    gridItem["tier_value"] = element.tier_value ? "" + element.tier_value : "";
    gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
    gridItem["tty"] = element.tty ? "" + element.tty : "";
    gridItem["generic_product_identifier"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
    gridItem["trademark_code"] = element.trademark_code ? "" + element.trademark_code : "";
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
    gridItem["is_la"] = element.is_la ? "" + element.is_la : "";
    gridItem["is_mo"] = element.is_mo ? "" + element.is_mo : "";
    gridItem["is_nm"] = element.is_nm ? "" + element.is_nm : "";
    gridItem["is_ssm"] = element.is_ssm ? "" + element.is_ssm : "";
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
    gridItem["lis_cost_sharing_amount"] = element.lis_cost_sharing_amount ? "" + element.lis_cost_sharing_amount : "";
    gridItem["is_pbst"] = element.is_pbst ? "" + element.is_pbst : "";
    gridItem["is_abr_formulary"] = element.is_abr_formulary ? "" + element.is_abr_formulary : "";
    gridItem["is_user_defined_1"] = element.is_user_defined_1 ? "" + element.is_user_defined_1 : "";
    gridItem["is_user_defined_2"] = element.is_user_defined_2 ? "" + element.is_user_defined_2 : "";
    gridItem["is_user_defined_3"] = element.is_user_defined_3 ? "" + element.is_user_defined_3 : "";
    gridItem["is_user_defined_4"] = element.is_user_defined_4 ? "" + element.is_user_defined_4 : "";
    gridItem["is_user_defined_5"] = element.is_user_defined_5 ? "" + element.is_user_defined_5 : "";
  }

  processGridData = (gridItem, element) => {
    gridItem["tier_value"] = element.tier_value ? "" + element.tier_value : "";
    gridItem["drug_label_name"] = element.drug_label_name ? "" + element.drug_label_name : "";
    gridItem["ndc"] = element.ndc ? "" + element.ndc : "";
    gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
    gridItem["trademark_code"] = element.trademark_code ? "" + element.trademark_code : "";
    gridItem["database_category"] = element.database_category ? "" + element.database_category : "";
    gridItem["database_class"] = element.database_class ? "" + element.database_class : "";
    gridItem["generic_product_identifier"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
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
    gridItem["fills_allowed"] = element.fills_allowed ? "" + element.fills_allowed : "";
    gridItem["full_limit_period_of_time"] = element.full_limit_period_of_time ? "" + element.full_limit_period_of_time : "";
    gridItem["covered_genders"] = element.covered_genders ? "" + element.covered_genders : "";
    gridItem["covered_icds"] = element.covered_icds ? "" + element.covered_icds : "";
    gridItem["covered_max_ages"] = element.covered_max_ages ? "" + element.covered_max_ages : "";
    gridItem["covered_max_operators"] = element.covered_max_operators ? "" + element.covered_max_operators : "";
    gridItem["covered_min_ages"] = element.covered_min_ages ? "" + element.covered_min_ages : "";
    gridItem["covered_min_operators"] = element.covered_min_operators ? "" + element.covered_min_operators : "";
    gridItem["covered_patient_residences"] = element.covered_patient_residences ? "" + element.covered_patient_residences : "";
    gridItem["covered_pharmacy_networks"] = element.covered_pharmacy_networks ? "" + element.covered_pharmacy_networks : "";
    gridItem["covered_place_of_services"] = element.covered_place_of_services ? "" + element.covered_place_of_services : "";
    gridItem["covered_prescriber_taxonomies"] = element.covered_prescriber_taxonomies ? "" + element.covered_prescriber_taxonomies : "";
    gridItem["not_covered_genders"] = element.not_covered_genders ? "" + element.not_covered_genders : "";
    gridItem["not_covered_icds"] = element.not_covered_icds ? "" + element.not_covered_icds : "";
    gridItem["not_covered_max_ages"] = element.not_covered_max_ages ? "" + element.not_covered_max_ages : "";
    gridItem["not_covered_min_ages"] = element.not_covered_min_ages ? "" + element.not_covered_min_ages : "";
    gridItem["not_covered_max_operators"] = element.not_covered_max_operators ? "" + element.not_covered_max_operators : "";
    gridItem["not_covered_min_operators"] = element.not_covered_min_operators ? "" + element.not_covered_min_operators : "";
    gridItem["not_covered_patient_residences"] = element.not_covered_patient_residences ? "" + element.not_covered_patient_residences : "";
    gridItem["not_covered_pharmacy_networks"] = element.not_covered_pharmacy_networks ? "" + element.not_covered_pharmacy_networks : "";
    gridItem["not_covered_place_of_services"] = element.not_covered_place_of_services ? "" + element.not_covered_place_of_services : "";
    gridItem["not_covered_prescriber_taxonomies"] = element.not_covered_prescriber_taxonomies ? "" + element.not_covered_prescriber_taxonomies : "";
    gridItem["is_user_defined_1"] = element.is_user_defined_1 ? "" + element.is_user_defined_1 : "";
    gridItem["is_user_defined_2"] = element.is_user_defined_2 ? "" + element.is_user_defined_2 : "";
    gridItem["is_user_defined_3"] = element.is_user_defined_3 ? "" + element.is_user_defined_3 : "";
    gridItem["is_user_defined_4"] = element.is_user_defined_4 ? "" + element.is_user_defined_4 : "";
    gridItem["is_user_defined_5"] = element.is_user_defined_5 ? "" + element.is_user_defined_5 : "";
  }

  populateGridData = (searchBody = null) => {
    if (this.state.selectedCriteria && this.state.selectedCriteria.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] =
        this.state.selectedFileKey === this.props.lobCode
          ? tierConstants.FORMULARY_DRUGS_TIER
          : tierConstants.DRUGS_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.selectedFileKey +
        "/" +
        commonConstants.TYPE_REMOVE;
      apiDetails["keyVals"] = [
        { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
        { key: commonConstants.KEY_INDEX, value: this.state.index },
        { key: commonConstants.KEY_LIMIT, value: this.state.limit },
      ];
      apiDetails["messageBody"] = {};
      if (
        this.state.selectedCriteria &&
        this.state.selectedCriteria.length > 0
      ) {
        apiDetails["messageBody"][
          "selected_criteria_ids"
        ] = this.state.selectedCriteria;
      }

      if (searchBody) {
        apiDetails["messageBody"] = Object.assign(
          apiDetails["messageBody"],
          searchBody
        );
      }

      let allFilters = Array();
      let filterProps = Array();
      this.state.filter.map(filterInfo => {
        allFilters.push(filterInfo);
        filterProps.push(filterInfo['prop']);
      });

      this.state.quickFilter.map(filterInfo => {
        if (!filterProps.includes(filterInfo['prop']))
          allFilters.push(filterInfo);
      });

      apiDetails['messageBody']['filter'] = allFilters;


      if (this.state.sort_by && this.state.sort_by.length > 0) {
        let keys = Array();
        let values = Array();

        this.state.sort_by.map(keyPair => {
          keys.push(keyPair['key']);
          values.push(keyPair['value']);
        });

        apiDetails['messageBody']['sort_by'] = keys;
        apiDetails['messageBody']['sort_order'] = values;
      }
    
      console.log("The Selected Rxcuids = ", this.state.selectedRxcuids);

      const thisRef = this;
      this.props
        .postTierApplyInfo(apiDetails)
        .then((json) => {
          if (json.payload && json.payload.result) {
            let tmpData = json.payload && json.payload.result ? json.payload.result : [];
            var data: any[] = [];
            let count = 1;
            var gridData = tmpData.map(function (el) {
              var element = Object.assign({}, el);
              data.push(element);
              let gridItem = {};
              gridItem["id"] = count;
              gridItem["key"] = count;
              // gridItem["tier_value"] = element.tier_value;
              // gridItem["file_type"] = element.file_type ? "" + element.file_type : "";
              // gridItem["data_source"] = element.data_source ? "" + element.data_source : "";
              // gridItem["drug_label_name"] = element.drug_label_name ? "" + element.drug_label_name : "";
              // gridItem["ndc"] = "";

              if (thisRef.props.lobCode === 'MCR') {
                gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
              } else {
                gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
              }

              // Rxcuid pre selections
              if(thisRef.props.lobCode === "MCR") {
                let selrxs = thisRef.state.selectedRxcuids.filter(e => e === element?.rxcui);
    
                if(selrxs.length > 0) {
                  gridItem["isChecked"] = true;
                  gridItem["rowStyle"] = "table-row--red-font";
                }
              }

              if(getLobCode(thisRef.props.formulary_lob_id) === "MCR") {
                thisRef.processMedGridData(gridItem, element);
              } else {
                thisRef.processGridData(gridItem, element);
              }

              // gridItem["generic_product_identifier"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
              // gridItem["trademark_code"] = element.trademark_code ? "" + element.trademark_code : "";
              // gridItem["database_category"] = element.database_category ? "" + element.database_category : "";
              count++;
              return gridItem;
            });
            this.setState({
              drugData: data,
              drugGridData: gridData,
              dataCount: json.payload.count,
            });
          } else {
            this.setState({
              drugData: Array(),
              drugGridData: Array(),
              dataCount: 0,
            });
          }
        });
    }
  };

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      this.setState({
        isRequestFinished: false,
      });
      let apiDetails = {};
      apiDetails["apiPart"] = tierConstants.APPLY_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.selectedFileKey +
        "/" +
        commonConstants.TYPE_REMOVE;
      apiDetails["keyVals"] = [];
      apiDetails["messageBody"] = {
        category_list: "",
        covered: {},
        filter: [],
        is_select_all: false,
        not_covered: {},
        removedformulary_drug_ids: [],
        search_key: "",
      };
      if (
        this.state.selectedCriteria &&
        this.state.selectedCriteria.length > 0
      ) {
        apiDetails["messageBody"][
          "selected_criteria_ids"
        ] = this.state.selectedCriteria;
      }
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;

      if (this.props.advancedSearchBody && Object.keys(this.props.advancedSearchBody).length > 0) {
        apiDetails["messageBody"] = Object.assign(apiDetails["messageBody"], this.props.advancedSearchBody);
      }

      apiDetails["messageBody"]['is_select_all'] = this.state.isSelectAll;

      let allFilters = Array();
      let filterProps = Array();
      this.state.filter.map(filterInfo => {
        allFilters.push(filterInfo);
        filterProps.push(filterInfo["prop"]);
      });

      this.state.quickFilter.map(filterInfo => {
        if (!filterProps.includes(filterInfo["prop"]))
          allFilters.push(filterInfo);
      });

      apiDetails["messageBody"]["filter"] = allFilters;

      const saveData = this.props.postTierApplyInfo(apiDetails).then((json) => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code && json.payload.code === "200") {
          showMessage("Success", "success");
        } else {
          showMessage("Failure", "error");
        }
        this.state.drugData = [];
        this.state.drugGridData = [];
        this.resetData();
        this.populateGridData();
        apiDetails = {};
        apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
        apiDetails["pathParams"] = this.props?.formulary_id;
        apiDetails["keyVals"] = [
          {
            key: commonConstants.KEY_ENTITY_ID,
            value: this.props?.formulary_id,
          },
        ];

        const TierDefinationData = this.props
          .getTier(apiDetails)
          .then((json) => {
            this.setState({ tierGridContainer: true , isRequestFinished: true});
          });
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
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
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedCriteria = selectedRowKeys.map((tierId) => tierId);
    }
    this.resetData();
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) =>
        this.state.drugData[tierId - 1]["formulary_drug_id"]
          ? this.state.drugData[tierId - 1]["formulary_drug_id"]
          : this.state.drugData[tierId - 1]["drug_id"]
      );
    }
    console.log('Selected drugs:' + JSON.stringify(this.state.selectedDrugs));
  };

  selectRow = (drugGridData, selectedRow) => {
    const data = drugGridData.map((d: any) => {
      if (d.key === selectedRow.key) {
        d["isChecked"] = true;
        d["rowStyle"] = "table-row--red-font";
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
    console.log("data row ", selectedRow, isSelected, selectedRow["isDisabled"]);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        let selectedRowKeys = this.state.selectedRowKeys;
        let data = this.selectRow(this.state.drugGridData, selectedRow);

        if (!selectedRowKeys.includes(selectedRow.key)) {
          selectedRowKeys.push(selectedRow.key);
        }

        // RXcuid Mapping for Medicare
        if(this.props.lobCode === "MCR") {
          let rxcuids: any[] = this.state.selectedRxcuids;
          let rxcuidIndex = rxcuids.findIndex(x => x === selectedRow?.rxcui);
          if(rxcuidIndex === -1) {
            rxcuids.push(selectedRow?.rxcui);
          }

          // Checking if there are any duplicate rxcuids in the current list of data
          let selectedRxid = selectedRow?.rxcui;
          let currentPageRxidClones = this.state.drugGridData.filter(e => (e.rxcui === selectedRxid && e.key !== selectedRow.key));

          if(currentPageRxidClones.length > 0) {
            currentPageRxidClones.forEach(e => {
              data = this.selectRow(this.state.drugGridData, e);
            })
          }

          let additionalSelectedKeys = currentPageRxidClones.map(e => e.key);

          selectedRowKeys = [...selectedRowKeys, ...additionalSelectedKeys];
          this.setState({ selectedRxcuids: rxcuids });
        }

        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        let data = this.unselectRow(this.state.drugGridData, selectedRow);

        this.state.selectedRowKeys = this.state.selectedRowKeys.filter(rowKey => rowKey !== selectedRow.key);
        console.log('Selected row keys:' + JSON.stringify(this.state.selectedRowKeys));
        this.onSelectedTableRowChanged(this.state.selectedRowKeys);
        
        // RXcuid Mapping for Medicare
        if(this.props.lobCode === "MCR") {
          // Checking if there are any duplicate rxcuids in the current list of data
          let selectedRxid = selectedRow?.rxcui;
          let currentPageRxidClones = this.state.drugGridData.filter(e => (e.rxcui === selectedRxid && e.key !== selectedRow.key));

          if(currentPageRxidClones.length > 0) {
            currentPageRxidClones.forEach(e => {
              data = this.unselectRow(this.state.drugGridData, e);
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

        this.setState({
          drugGridData: data
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    this.state.selectedRowKeys = Array();
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          this.state.selectedRowKeys.push(d["key"]);
          d["rowStyle"] = "table-row--red-font";
        } else {
          if (d["rowStyle"])
            delete d["rowStyle"]
        }
      }
      return d;
    });
    
    this.onSelectedTableRowChanged(selectedRowKeys);
    this.setState({ drugGridData: data, isSelectAll: isSelected });
  };


  fileTypeDropDownSelectHandler = (value, event) => {
    let fileType = event.value.toString().trim();
    let fileKey = this.props.lobCode;

    if (fileType) {
      let filtered = this.state.fileTypes.filter(
        (fileObject) => fileObject.type.toString().trim() === fileType
      );
      if (filtered && filtered.length > 0) {
        fileKey = filtered[0].key;
      }
    }
    console.log("Selected file key is:" + fileKey);
    this.setState({ selectedFileKey: fileKey });

    this.populateGridData();
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
    this.state.drugData = [];
    this.state.drugGridData = [];
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  onColumnChange = (columns: any[]) => {
    console.log("swapped", columns);
    const cols = _.cloneDeep(columns);
    const changedColumns = cols
    this.setState({
      isColumnsChanged: true,
      changedColumns
    });
  };

  resetData = () => {
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {}
    };
    this.props.setAdvancedSearch(payload);
    this.state.filter = Array();
    this.state.quickFilter = Array();
    this.state.sort_by = Array();
    this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    this.state.index = 0;
    this.state.limit = 10;
    this.state.hiddenColumns = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    this.state.searchData = Array();

    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = false;
    this.state.isGridSingleSorted = false;

    this.state.filteredInfo = null;
    this.state.isFiltered = false;
    this.state.selectedRowKeys = Array();
    this.state.isSelectAll = false;
  }

  render() {
    const dataSource: any[] = [];

    if (this.props["tierData"].length > 0) {
      this.props["tierData"].map((tier) => {
        if (tier.added_count > 0) {
          dataSource.push({ key: tier.id_tier, tierName: tier.tier_name });
        }
      });
    }

    const columns = [
      {
        title: "Tier Name",
        dataIndex: "tierName",
        key: "tierName",
      },
    ];
    let gridColumns = this.props.lobCode === 'MCR' ? tierColumns() : tierColumnsNonMcr();
    if (this.state.hiddenColumns.length > 0) {
      gridColumns = gridColumns.filter(key => !this.state.hiddenColumns.includes(key));
    }
    if(!this.state.isRequestFinished){
      return <FrxLoader />;
    }
    return (
      <>
        {!this.props.configureSwitch && (
          <div className="white-bg">
            <Grid item xs={5}>
              <div className="tier-grid-remove-container">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  rowSelection={{
                    columnWidth: 20,
                    fixed: true,
                    type: "checkbox",
                    onChange: this.onSelectedRowKeysChange,
                  }}
                />
              </div>
            </Grid>
            <Row justify="end">
              <Col>
                <Button
                  label="Apply"
                  onClick={this.openTierGridContainer}
                ></Button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.tierGridContainer && !this.props.configureSwitch && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header remove-btn-wrapper-right pr-10">
                <div className="header-dropdown">
                  <DropDown
                    value={this.state.searchValue}
                    options={this.state.searchNames}
                    placeholder={this.state.filterPlaceholder}
                    showSearch={true}
                    onSearch={this.onInputValueChanged}
                    onSelect={this.onSearchValueChanges}
                  />
                  {this.state.quickFilter.length > 0 && (
                    <span
                      style={{ marginLeft: 10 }}
                      onClick={this.clearSearchFilter}
                    >
                      Clear
                    </span>
                  )}
                </div>
                <div className="button-wrapper">
                  <Button
                    className="Button normal"
                    label="Advance Search"
                    onClick={this.advanceSearchClickHandler}
                  />
                  <Button label="Save" onClick={this.handleSave} />
                </div>
              </div>

              <div className="tier-grid-container tier-replace-root">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  settingsWidth={50}
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="TIER"
                  enableSettings
                  columns={gridColumns}
                  // columns={
                  //   this.state.isColumnsChanged
                  //     ? this.state.changedColumns
                  //     : tierColumnsNonMcr()
                  // }
                  scroll={{ x: 8000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  totalRowsCount={this.state.dataCount}
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
                  pageSize={this.state.limit}
                  selectedCurrentPage={
                    this.state.index / this.state.limit + 1
                  }
                  isFiltered={this.state.isFiltered}
                  filteredInfo={this.state.filteredInfo}
                  onColumnChange={this.onColumnChange}
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvanceSearchContainer
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TierRemove);
