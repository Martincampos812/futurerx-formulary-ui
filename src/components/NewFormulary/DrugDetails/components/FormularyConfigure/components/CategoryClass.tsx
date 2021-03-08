import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

// import css
import "./Tier.scss";
import "./categoryclass.scss";

import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import {
  getTapList,
  getMiniTabs
} from "../../../../../../mocks/formulary/mock-data";
import PanelHeader from "./PanelHeader";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  categoryCommercialClassColumns,
  categoryClassColumns
} from "../../../../../../utils/grid/columns";
import FormularyDetailsContext from "../../../../FormularyDetailsContext";
import OverridePopup from "./OverridePopup/OverridePopup";
import { getTier } from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import {
  getClassificationSystems,
  postDrugsCategory,
  getIntelliscenseSearch,
  postDrugsClassCategoryOverride
} from "../../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import * as categoryConstants from "../../../../../../api/http-category-class";
import getLobCode from "../../../../Utils/LobUtils";
import showMessage from "../../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import * as _ from "lodash";

function mapDispatchToProps(dispatch) {
  return {
    getTier: a => dispatch(getTier(a)),
    getClassificationSystems: a => dispatch(getClassificationSystems(a)),
    postDrugsCategory: a => dispatch(postDrugsCategory(a)),
    getIntelliscenseSearch: a => dispatch(getIntelliscenseSearch(a)),
    postDrugsClassCategoryOverride: a => dispatch(postDrugsClassCategoryOverride(a)),
    setAdvancedSearch: a => dispatch(setAdvancedSearch(a))
  };
}

const mapStateToProps = state => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog
  };
};

interface State {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  materialPopupInd: any;
  show: any;
  isSearchOpen: false;
  columns: any;
  data: any;
  filteredData: any;
  tierOption: any[];
  classificationSystems: any[];
  lobCode: any;
  filter: any[];
  searchData: any[];
  searchNames: any[];
  searchValue: any;
  addedFormularyDrugs: any[];
  fixedSelectedRows: number[];
  selectedRowKeys: number[];
  isFiltered: boolean;
  filteredInfo: any;
  isSelectAll: boolean;
  isRequestFinished: boolean;
  isColumnsChanged: boolean;
  changedColumns: any[];
  selectedRxcuids: any[];
}

class CategoryClass extends React.Component<any, any> {
  state = {
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: getTapList(),
    materialPopupInd: false,
    show: false,
    isSearchOpen: false,
    popupName: "",
    title: "",
    columns: [] as any,
    data: [] as any,
    filteredData: Array(),
    tierOption: Array(),
    classificationSystems: Array(),
    showActionsInd: false,
    lobCode: "MCR",
    filter: Array(),
    searchData: Array(),
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    overriddenClass: null,
    overriddenCategory: null,
    addedFormularyDrugs: Array(),
    customCategory: false,
    customClass: false,
    selectedRowKeys: Array(),
    index: 0,
    limit: 10,
    sort_by: [{ key: 'drug_label_name', value: 'asc' }],
    hiddenColumns: Array(),
    dataCount: 0,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    quickFilter: Array(),
    fixedSelectedRows: [] as number[],
    isFiltered: false,
    filteredInfo: null,
    isSelectAll: false,
    isRequestFinished: true,
    changedColumns: Array(),
    isColumnsChanged: false,
    selectedRxcuids: [],
  };

  static contextType = FormularyDetailsContext;

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

  populateTierDetails = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }
    ];
    const thisRef = this;
    
    this.props.getTier(apiDetails).then(json => {
      let tmpData = json.payload && json.payload.data ? json.payload.data : [];
      tmpData.map(function (el) {
        var element = Object.assign({}, el);
        thisRef.state.tierOption.push(element);
      });
    });
  };

  populateClassificationDetails = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = categoryConstants.CLASSIFICATION_SYSTEMS;
    apiDetails["pathParams"] =
      this.props?.formulary_type_id + "/" + this.props?.formulary_id;
    const thisRef = this;
    
    this.props.getClassificationSystems(apiDetails).then(json => {
      let tmpData = json.payload && json.payload.data ? json.payload.data : [];
      tmpData.map(function (el) {
        var element = Object.assign({}, el);
        thisRef.state.classificationSystems.push(element);
      });
    });
  };
  
  onApplyFilterHandler = (filters, filteredInfo) => {
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
    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === "ascend" ? "asc" : "desc";
      this.state.sort_by = this.state.sort_by.filter(
        keyPair => keyPair["key"] !== key
      );
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
    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null
    });

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map(sortInfo => {
        if (uniqueKeys.includes(sortInfo["columnKey"])) {
        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo["columnKey"]);
        }
      });
      filteredSorter.map(sortInfo => {
        let sortOrder = sortInfo["order"] === "ascend" ? "asc" : "desc";
        this.state.sort_by = this.state.sort_by.filter(
          keyPair => keyPair["key"] !== sortInfo["columnKey"]
        );
        this.state.sort_by.push({
          key: sortInfo["columnKey"],
          value: sortOrder
        });
      });
    }

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
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
      this.state.limit = pageSize;
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    })
  };

  onGridPageChangeHandler = (pageNumber: any) => {
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
    gridItem["override_category"] = element.override_category ? "" + element.override_category : "";
    gridItem["override_class"] = element.override_class ? "" + element.override_class : "";
    gridItem["database_category"] = element.database_category ? "" + element.database_category : "";
    gridItem["database_class"] = element.database_class ? "" + element.database_class : "";
    gridItem["drug_label_name"] = element.drug_label_name ? "" + element.drug_label_name : "";
    gridItem["ndc"] = element.ndc ? "" + element.ndc : "";
    gridItem["tier_value"] = element.tier_value ? "" + element.tier_value : "";
    gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
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
    gridItem["not_covered_max_operators"] = element.not_covered_max_operators ? "" + element.not_covered_max_operators : "";
    gridItem["not_covered_min_ages"] = element.not_covered_min_ages ? "" + element.not_covered_min_ages : "";
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
    let apiDetails = {};
    apiDetails["apiPart"] = categoryConstants.DRUGS_CATEGORY;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + this.state.lobCode;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: commonConstants.KEY_INDEX, value: this.state.index },
      { key: commonConstants.KEY_LIMIT, value: this.state.limit }
    ];
    apiDetails["messageBody"] = {};

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
      filterProps.push(filterInfo["prop"]);
    });

    this.state.quickFilter.map(filterInfo => {
      if (!filterProps.includes(filterInfo["prop"]))
        allFilters.push(filterInfo);
    });

    apiDetails["messageBody"]["filter"] = allFilters;

    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map(keyPair => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      apiDetails["messageBody"]["sort_by"] = keys;
      apiDetails["messageBody"]["sort_order"] = values;
    }
    
    console.log("The Selected Rxcuids = ", this.state.selectedRxcuids);

    const thisRef = this;
    this.props.postDrugsCategory(apiDetails).then(json => {
      if (json.payload && json.payload.result) {
        let tmpData = json.payload && json.payload.result ? json.payload.result : [];
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map((el) => {
          var element = Object.assign({}, el);
          data.push(element);

          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;

          // Rxcuid pre selections
          if(thisRef.state.lobCode === "MCR") {
            let selrxs = thisRef.state.selectedRxcuids.filter(e => e === element?.rxcui);

            if(selrxs.length > 0) {
              gridItem["isChecked"] = true;
            }
          }

          if(thisRef.state.lobCode === "MCR") {
            thisRef.processMedGridData(gridItem, element);
          } else {
            thisRef.processGridData(gridItem, element);
          }
          
          count++;
          return gridItem;
        });
        const columns = this.getColumns();
        this.setState({
          columns: columns,
          data: data,
          filteredData: gridData,
          dataCount: json.payload.count,
          fixedSelectedRows: gridData
            .filter(item => item.isChecked)
            .map(item => item.key),
          selectedRowKeys: gridData
            .filter(item => item.isChecked)
            .map(item => item.key)
        });
      } else {
        const columns = this.getColumns();
        this.setState({
          columns: columns,
          data: Array(),
          filteredData: Array(),
          dataCount: 0,
          fixedSelectedRows: Array(),
          selectedRowKeys: Array()
        });
      }
    });
  };

  onSearchValueChanges = (value, event) => {
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
              values: [propData.value]
            });
            break;

          case "rxcui":
            this.state.quickFilter.push({
              prop: "rxcui",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "ndc":
            this.state.quickFilter.push({
              prop: "ndc",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "generic_product_identifier":
            this.state.quickFilter.push({
              prop: "generic_product_identifier",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "drug_label_name":
            this.state.quickFilter.push({
              prop: "drug_label_name",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "database_class":
            this.state.quickFilter.push({
              prop: "database_class",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "database_category":
            this.state.quickFilter.push({
              prop: "database_category",
              operator: "is_like",
              values: [propData.value]
            });
            break;
        }
        this.populateGridData();
      }
    }
  };

  clearSearchFilter = e => {
    this.state.quickFilter = Array();
    this.state.searchData = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    this.populateGridData();
  };

  onInputValueChanged = value => {
    if (value) {
      let requests = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = commonConstants.SEARCH_GPI;
      apiDetails["pathParams"] =
        this.props?.formulary_id + "/" + this.state.lobCode + "/" + "F";
      if (this.state.lobCode === "MCR") {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] +
          "/" +
          (this.props.formulary_type_id === 1 ? "MC" : "MMP");
      } else {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] + "/" + this.state.lobCode;
      }
      apiDetails["keyVals"] = [
        { key: commonConstants.KEY_SEARCH_VALUE, value: value }
      ];
      requests.push({
        key: "generic_product_identifier",
        apiDetails: apiDetails
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
          apiDetails: apiDetails
        });
      }
      
      this.props
        .getIntelliscenseSearch(requests)
        .then(json => {
          if (
            json.payload &&
            json.payload.data &&
            Array.isArray(json.payload.data) &&
            json.payload.data.length > 0
          ) {
            let tmpData = json.payload && json.payload.data ? json.payload.data : [];
            var data: any[] = [];
            var gridData = tmpData.map(function (el) {
              var element = Object.assign({}, el);
              data.push(element);
              let gridItem = element["value"];
              return gridItem;
            });
            this.setState({
              searchData: data,
              searchNames: gridData
            });
          }
        });
    }
  };

  componentDidMount() {
    this.populateTierDetails();
    this.populateClassificationDetails();
    this.state.lobCode = getLobCode(this.props.formulary_lob_id);
    this.populateGridData();
  }

  getColumns = () => {
    switch (this.props.formulary_lob_id) {
      case 1:
        return categoryClassColumns();
      default:
        return categoryCommercialClassColumns();
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });
  };

  onClose = () => {
    this.state.addedFormularyDrugs = Array();
    this.resetData();
    this.setState({ materialPopupInd: false }, () => {
      this.populateGridData();
    });
    return true;
  };

  handleAddFileClick = () => { };

  handlePopupButtonClick = (popupName, title) => {
    if (popupName === "override") {
      if (this.state.addedFormularyDrugs.length > 0) {
        this.setState({
          materialPopupInd: true,
          popupName: popupName,
          title: title
        });

        this.setState({
          showActionsInd: true
        });
      } else {
        showMessage("Choose Drugs to Override Category/Class", "error");
      }
    } else {
      this.setState({
        materialPopupInd: true,
        popupName: popupName,
        title: title
      });

      this.setState({
        showActionsInd: false
      });
    }
  };

  processCloseActions = type => {
    if (type === "positive") {
      if (
        this.state.overriddenCategory &&
        this.state.overriddenClass &&
        this.state.addedFormularyDrugs.length > 0
      ) {
        this.setState({
          isRequestFinished: false,
        });
        let apiDetails = {};
        apiDetails["apiPart"] = categoryConstants.DRUG_CATEGORY_CLASS;
        apiDetails["pathParams"] =
          this.props?.formulary_id + "/" + this.state.lobCode;
        apiDetails["keyVals"] = [
          {
            key: commonConstants.KEY_ENTITY_ID,
            value: this.props?.formulary_id
          }
        ];
        apiDetails["messageBody"] = {
          category_name: this.state.overriddenCategory,
          class_name: this.state.overriddenClass,
          added_formulary_drugs: this.state.addedFormularyDrugs,
          category_list: "",
          covered: {},
          filter: [],
          is_select_all: false,
          not_covered: {},
          removedformulary_drug_ids: [],
          search_key: "",
          is_custom_category: this.state.customCategory,
          is_custom_class: this.state.customClass
        };
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
        this.props
          .postDrugsClassCategoryOverride(apiDetails)
          .then(json => {
            if (
              json.payload &&
              json.payload.code &&
              json.payload.code === "200"
            ) {
              this.state.addedFormularyDrugs = Array();
            } else {
              this.state.addedFormularyDrugs = Array();
            }
            this.state.isRequestFinished = true;
            this.resetData();
            this.populateGridData();
          });
      }
    } else {
      this.state.addedFormularyDrugs = Array();
      this.state.isRequestFinished = true;
      this.resetData();
      this.populateGridData();
    }
    this.setState({
      materialPopupInd: false,
    });
  };

  handleSearch = searchObject => {};

  rowSelectionChange = record => {
    this.state.addedFormularyDrugs = Array();
    if (record && record.length > 0) {
      record.map(row => {
        let checkedIndex = row - 1;
        if (checkedIndex < this.state.data.length) {
          let drug = this.state.data[checkedIndex];
          this.state.addedFormularyDrugs.push(drug["md5_id"]);
        }
      });
    }
  };

  selectRow = (drugGridData, selectedRow) => {
    const data = drugGridData.map((d: any) => {
      if (d.key === selectedRow.key) {
        d["isChecked"] = true;
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
        let data = this.selectRow(this.state.filteredData, selectedRow);

        let selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key
        ];

        const selectedRows: number[] = selectedRowKeys.filter(
          k => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        // RXcuid Mapping for Medicare
        if(this.state.lobCode === "MCR") {
          let rxcuids: any[] = this.state.selectedRxcuids;
          let rxcuidIndex = rxcuids.findIndex(x => x === selectedRow?.rxcui);
          if(rxcuidIndex === -1) {
            rxcuids.push(selectedRow?.rxcui);
          }

          // Checking if there are any duplicate rxcuids in the current list of data
          let selectedRxid = selectedRow?.rxcui;
          let currentPageRxidClones = this.state.filteredData.filter(e => (e.rxcui === selectedRxid && e.key !== selectedRow.key));

          if(currentPageRxidClones.length > 0) {
            currentPageRxidClones.forEach(e => {
              data = this.selectRow(this.state.filteredData, e);
            })
          }

          let additionalSelectedKeys = currentPageRxidClones.map(e => e.key);

          selectedRowKeys = [...selectedRowKeys, ...additionalSelectedKeys];
          this.setState({ selectedRxcuids: rxcuids });
        }

        this.rowSelectionChange(selectedRows);

        this.setState({ filteredData: data, selectedRowKeys: selectedRowKeys });
      } else {
        let data = this.unselectRow(this.state.filteredData, selectedRow);

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          k => k !== selectedRow.key
        );

        const selectedRows = selectedRowKeys.filter(
          k => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        
        // RXcuid Mapping for Medicare
        if(this.state.lobCode === "MCR") {
          // Checking if there are any duplicate rxcuids in the current list of data
          let selectedRxid = selectedRow?.rxcui;
          let currentPageRxidClones = this.state.filteredData.filter(e => (e.rxcui === selectedRxid && e.key !== selectedRow.key));

          if(currentPageRxidClones.length > 0) {
            currentPageRxidClones.forEach(e => {
              data = this.unselectRow(this.state.filteredData, e);
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

        this.rowSelectionChange(selectedRows);
        this.setState({
          filteredData: data,
          selectedRowKeys: selectedRowKeys
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.filteredData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
        } else {
          if (d["rowStyle"]) delete d["rowStyle"];
        }
      }
      
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      k => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.rowSelectionChange(selectedRows);
    this.setState({ filteredData: data, selectedRowKeys: selectedRowKeys, isSelectAll: isSelected });
  };

  onOverrideCategoryClass = (category, classValue) => {
    this.state.overriddenCategory = category;
    this.state.overriddenClass = classValue;

    if (!category && !classValue) {
      this.state.customCategory = false;
      this.state.customClass = false;
    }
  };

  onOverrideCategory = (category, isCustom = false) => {
    this.state.overriddenCategory = category;
    this.state.customCategory = isCustom;
  };

  onOverrideClass = classValue => {
    this.state.overriddenClass = classValue;
    this.state.customClass = true;
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  advanceSearchClickHandler = event => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }
  }

  onColumnChange = (columns: any[]) => {
    const cols = _.cloneDeep(columns);
    const changedColumns = cols
    this.setState({
      isColumnsChanged: true,
      changedColumns
    });
  };

  render() {
    let gridColumns = this.state.columns;
    if (this.state.hiddenColumns.length > 0) {
      gridColumns = gridColumns.filter(key => !this.state.hiddenColumns.includes(key));
    }
    if(!this.state.isRequestFinished){
      return <FrxLoader />;
    }
    return (
      <div className="drug-detail-LA-root class-category">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="Category/Class View And ASSIGNMENT"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                  </div>
                </div>
                <div className="bordered category-class-root">
                  <div className="header pr-10 category-class-wrapper">
                    <p></p>
                    <div className="category-class-button-wrapper">
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
                      <div
                        className="add-file-button"
                        onClick={e =>
                          this.handlePopupButtonClick(
                            "override",
                            "CATEGORY AND CLASS ASSIGNMENT"
                          )
                        }
                      >
                        Override
                      </div>
                      <div
                        className="advance-search-button advance-search-btn"
                        onClick={e => this.advanceSearchClickHandler(e)}
                      >
                        Advanced Search
                      </div>
                    </div>
                  </div>
                  {/* <div className="tier-grid-container"> */}
                    <FrxDrugGridContainer
                      className="umair"
                      enableSettings
                      settingsWidth={30}
                      enableSearch={false}
                      enableColumnDrag={false}
                      onSearch={this.handleSearch}
                      fixedColumnKeys={[]}
                      pagintionPosition="topRight"
                      gridName=""
                      isFetchingData={this.state.isFetchingData}
                      // columns={
                      //   this.state.isColumnsChanged
                      //     ? this.state.changedColumns
                      //     : categoryCommercialClassColumns()
                      // }
                      columns={gridColumns}
                      isPinningEnabled={false}
                      scroll={{ x: 8000, y: 377 }}
                      enableResizingOfColumns
                      data={this.state.filteredData}
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
                  {/* </div> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <DialogPopup
          className="frx-override-result-root"
          showCloseIcon={this.state.showActionsInd}
          positiveActionText="Assign"
          negativeActionText="Cancel"
          title={this.state.title}
          handleClose={() => {
            this.onClose();
          }}
          handleAction={type => {
            this.processCloseActions(type);
          }}
          showActions={this.state.showActionsInd}
          open={this.state.materialPopupInd}
        >
          {this.state.popupName === "override" ? (
            <OverridePopup
              onOverrideCategoryClass={this.onOverrideCategoryClass}
              onOverrideCategory={this.onOverrideCategory}
              onOverrideClass={this.onOverrideClass}
            />
          ) : (
              ""
            )}
        </DialogPopup>
        {this.state.isSearchOpen ? (
          <AdvanceSearchContainer
            openPopup={this.state.isSearchOpen}
            onClose={this.advanceSearchClosekHandler}
            isAdvanceSearch={true}
          />
        ) : null}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryClass);
