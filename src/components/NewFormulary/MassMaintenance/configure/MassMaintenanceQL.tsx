import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../shared/Frx-components/button/Button";
import FrxDrugGridContainer from "../../../shared/FrxGrid/FrxDrugGridContainer";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer"; // "../../shared/FrxGrid/FrxGridContainer";
import FrxDrugGrid from "../../../shared/FrxGrid/FrxDrugGrid";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";

import {
  getTapList,
  getMiniTabs,
} from "../../../../mocks/formulary/mock-data";
import {
  getColumns,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";

import {
  getDrugsPAGridColumns,
} from "../../../../mocks/formulary-grid/FormularyGridColumn";

import {
  postMaintenaceDrugPA,
} from "../../../../redux/slices/formulary/pa/paActionCreation";
import CustomizedSwitches from "./../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import PanelHeader from "../../../shared/Frx-components/panel-header/PanelHeader";
import PanelGrid from "../../../shared/Frx-components/panel-grid/PanelGrid";

import { TabInfo } from "../../../../models/tab.model";
import { getTier } from "../../../../redux/slices/formulary/tier/tierActionCreation";


import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton"; //"../../../../shared/Frx-components/radio-button/RadioButton";
import Label from "../../../shared/Frx-components/label/Label"; //"../../../../shared/Frx-components/label/Label";
import {
  getQlSummary,
  postApplyFormularyDrugQl,
  postFormularyDrugQl,
  getQlFileTypes,
  // postApplyFormularyDrugQl
} from "../../../../redux/slices/formulary/ql/qlActionCreation";
import * as constants from "../../../../api/http-commons";
import showMessage from "../../Utils/Toast"; //"../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import AdvanceSearchContainer from "../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { setAdditionalCriteria } from "../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";

import "./QlTab/common.scss";
import "./QL.scss";

import FrxDialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";
import Replace from "./QlTab/Replace";
import Remove from "./QlTab/Remove";
import getLobCode from "../../Utils/LobUtils";
import FillLimitSettings from "../../DrugDetails/components/QL/components/FillLimitSettings";
import UmCriteria from "./UmCriteria";
import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import DrugGrid from "./DrugGrid";

function mapDispatchToProps(dispatch) {
  return {
    // getTier: (a) => dispatch(getTier(a)),
    getQlSummary: (a) => dispatch(getQlSummary(a)),
    postFormularyDrugQl: (a) => dispatch(postFormularyDrugQl(a)),
    postApplyFormularyDrugQl: (a) => dispatch(postApplyFormularyDrugQl(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
    getQLFileTypes: (a) => dispatch(getQlFileTypes(a)),
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
  };
}

function mapStateToProps(state) {
  return {
    qlData: state.qlReducer.data,
    switchState: state.switchReducer.configureSwitch,

    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
}

interface newParamterType {
  quantity: number | null;
  days: number | null;
  periodOfTime: number | null;
  fillsAllowed: number | null;
  fillLimitPeriodOfTime: number | null;
}
interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  drugGridContainer: boolean;
  activeTabIndex: any;
  panelGridValue: any;
  drugGridData: any;
  quantityAndFillLimitObject: any; //newParamterType;
  selectedDrugs: any;
  prevSelectedDrugs: any;
  drugData: any;
  drugCount: number;
  selectedCriteria: any;
  errorObject: any;
  selectedTab: string;
  isAdvanceSearchOpen: boolean;
  isAdditionalCriteriaOpen: boolean;
  additionalCriteriaState: null;
  is_additional_criteria_defined: boolean;
  isLoading: boolean;
  fixedSelectedRows: number[];
  selectedRowKeys: number[];
  gridSingleSortInfo: any;
  isGridSingleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  hiddenColumns: any;
  filter: any;
  sort_by: any;
  isSettingsApplied: boolean;
  isSelectAll: boolean;
  qlFileTypes: any;
  radioButtons: any;
  selectedQlFileType: any;
  showUmCriteria:boolean;
  clickedDrugId:any;
}

const removeRadioButtonMedicare = [
  { id: 1, text: "ADD File", value: "ADD", tab: "ADD FILE", is_selected: true },
  {
    id: 2,
    text: "ALL Other File Types",
    value: "MCR",
    tab: "ALL Other File Types",
    is_selected: false,
  },
];

class Tier extends React.Component<any, tabsState> {
  state = {
    drugGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    panelGridTitle: ["", "NUMBER OF DRUGS", "ADDED DRUGS", "REMOVED DRUGS"],
    panelGridValue: [],
    drugGridData: [],
    quantityAndFillLimitObject: {},
    selectedDrugs: Array(),
    prevSelectedDrugs: Array(),
    drugData: [],
    selectedCriteria: {},
    selectedTab: constants.TYPE_REPLACE,
    isAdvanceSearchOpen: false,
    isAdditionalCriteriaOpen: false,
    additionalCriteriaState: null,
    is_additional_criteria_defined: false,
    isLoading: false,
    errorObject: {},
    fixedSelectedRows: Array(),
    selectedRowKeys: Array(),
    drugCount: 0,

    index: 0,
    limit: 10,
    filter: Array(),
    sort_by: Array(),
    hiddenColumns: Array(),
    dataCount: 0,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    isSettingsApplied: false,
    isSelectAll: false,
    qlFileTypes: Array(),
    radioButtons: Array(),
    selectedQlFileType: "",
    showUmCriteria:false,
    clickedDrugId:null,
    gridColumns: getColumns(),
    selectedGDs: {},
    selectedGDsRemove: Array(),
  };

  addNew = () => {

  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      console.log(activeTabIndex);
      return tab;
    });
    this.setState(
      {
        tabs,
        activeTabIndex,
        drugGridContainer: false,
        quantityAndFillLimitObject: {},
        errorObject: {},
        filter: [],
        sort_by: [],
        gridSingleSortInfo: null,
        gridMultiSortedInfo: [],
        isGridMultiSorted: false,
        isGridSingleSorted: false,
        selectedDrugs: Array(),
        prevSelectedDrugs: Array(),
      },

      () => {
        if (this.props.id_lob == 1) this.renderRadioButtons();
      }
    );
    // this.renderRadioButtons();
  };
  setGDForDrug = (key, value) => {
    debugger;
    this.state.selectedGDs[key] = value;
  }

  setGDForRemove = (value) => {
    debugger;
    this.state.selectedGDsRemove = value;
  }

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  }
  onCurrentQlFileType = () => {
    let currentQlFileType = this.state.selectedQlFileType;
    this.state.qlFileTypes.map((qlType) => {
      if (qlType.is_selected === true) currentQlFileType = qlType.value;
    });

    this.setState({ selectedQlFileType: currentQlFileType });
  };

  renderRadioButtons = () => {
    // debugger;
    let renderRadioButtons: any = null;
    console.log(this.state.activeTabIndex);
    switch (this.state.activeTabIndex) {
      case 0:
        this.state.qlFileTypes
          ? (renderRadioButtons = this.state.qlFileTypes.map((data) => (
              <RadioButton
                label={data.text}
                checked={data.is_selected}
                value={data.value}
                onClick={this.onSelectQlFiltType}
                name="ql-file"
                disabled={!data.is_selected}
              />
            )))
          : (renderRadioButtons = null);
        this.setState({ radioButtons: renderRadioButtons });
        break;

      case 1:
        this.state.qlFileTypes
          ? (renderRadioButtons = this.state.qlFileTypes.map((data) => (
              <RadioButton
                label={data.text}
                checked={data.is_selected}
                value={data.value}
                onClick={this.onSelectQlFiltType}
                name="ql-file"
                // disabled={props.isViweAll}
              />
            )))
          : (renderRadioButtons = null);
        this.setState({ radioButtons: renderRadioButtons });
        break;
      case 2:
        removeRadioButtonMedicare
          ? (renderRadioButtons = removeRadioButtonMedicare.map((data) => (
              <RadioButton
                // id={data.id}
                label={data.text}
                // checked={data.is_selected}
                value={data.value}
                onClick={this.onRemoveQlFileType}
                name="ql-file"
                // disabled={props.isViweAll}
              />
            )))
          : (renderRadioButtons = null);
        this.setState({ radioButtons: renderRadioButtons });
        break;

      default:
        return this.setState({ radioButtons: null });
    }
  };
  onSelectQlFiltType = (e) => {
    // debugger;
    console.log(e.target.value);
    this.setState({ selectedQlFileType: e.target.value });
  };

  onRemoveQlFileType = (e) => {
    let tempQlfileTypes = [...this.state.qlFileTypes];
    if (e.target.checked) {
      // tempQlfileTypes = this.state.qlFileTypes.map(filetype=>{
      //   if(filetype.id==e.target.id)
      //   filetype.
      // })
      this.setState({ selectedQlFileType: e.target.value });
    }
    console.log("[event]:", e.target.checked);
  };
  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    
    switch (activeTabIndex) {
      case 0:
        return (
          <>
          {this.props.maintenanceFormularies.list.map((drug) => (
            <div className="mm-configure-pa-auth-grid-item">
            <div>
              <span className="font-style">{drug.formulary_name}</span>
            </div>
            <Replace
            handleOnChange={(e) => this.handleOnChange(e, drug.id_formulary)}
            onUpdateSelectedCriteria={this.onUpdateSelectedCriteria}
            values={this.state.quantityAndFillLimitObject[drug.id_formulary]?this.state.quantityAndFillLimitObject[drug.id_formulary]:{}}
            errors={this.state.errorObject}
            isViweAll={this.props.switchState}
            radioButtons={this.state.radioButtons}
            formularyId={drug.id_formulary} 
          />
          </div>
          
          ))}
          </>
        );
      case 1:
        switch (this.props.id_lob) {
          case 1:
            return "";
            break;
          case 2:
          case 3:
          case 4:
        return (
          <>
          {this.props.maintenanceFormularies.list.map((drug) => (
            <div className="mm-configure-pa-auth-grid-item">
            <div>
              <span className="font-style">{drug.formulary_name}</span>
            </div>
            <Replace
          handleOnChange={(e) => this.handleOnChange(e, drug.id_formulary)}
          onUpdateSelectedCriteria={this.onUpdateSelectedCriteria}
          values={this.state.quantityAndFillLimitObject[drug.id_formulary]?this.state.quantityAndFillLimitObject[drug.id_formulary]:{}}
          errors={this.state.errorObject}
            isViweAll={this.props.switchState}
            radioButtons={this.state.radioButtons}
          />
          </div>
          
          ))}
          </>
          
        );
        break;
      }
      break;
      case 2:
        return (
          <>
          {this.props.maintenanceFormularies.list.map((drug) => (
            <div className="mm-configure-pa-auth-grid-item">
            <div>
              <span className="font-style">{drug.formulary_name}</span>
            </div>
                <Remove
                selectedCriteria={this.state.selectedCriteria}
                onUpdateSelectedCriteria={this.onUpdateSelectedCriteria}
                radioButtons={this.state.radioButtons}
                selectedQlFileType={this.state.selectedQlFileType}
                formularyId={drug.id_formulary} 
              />
          </div>
          
          ))}
          </>
          
        );
    }
  };

  checkForRequiredFields = (quantityAndFillLimitObject) => {
    let tempErr = {};
    debugger;
    console.log(quantityAndFillLimitObject);

    if (Object.keys(quantityAndFillLimitObject).length > 0) {
      const {
        quantity,
        days,
        periodOfTime,
        fillsAllowed,
        fillLimitPeriodOfTime,
      } = quantityAndFillLimitObject;

      
      if (
        quantityAndFillLimitObject.quantity == "" ||
        quantityAndFillLimitObject.quantity == undefined
      ) {
        if (
          days !== "" ||
          periodOfTime != "" ||
          fillsAllowed !== "" ||
          fillLimitPeriodOfTime != ""
        ) {
          tempErr = {
            quantity: false,
            days: false,
          };
          this.setState({ errorObject: tempErr });
          return true;
        }
      } else {
        tempErr = {
          quantity: false,
          days: false,
        };
        this.setState({ errorObject: tempErr });
        return true;
      }
    } else {
      tempErr = {
        quantity: true,
        days: true,
      };
      this.setState({ errorObject: tempErr });
      return false;
    }

    // return false;
  };

  showDrugGrid = (searchBody = null) => {
    let currentLob = getLobCode(this.props.id_lob);
    if (this.props.id_lob == 1) {
      if (!this.props.switchState) {
        currentLob = this.state.selectedQlFileType;
      }
    }
    this.setState({ drugGridContainer: true });
    console.log("{searchBody}", this.props.advancedSearchBody);

    let apiDetails = {
      formulary_id: this.props.id_formulary_maintenance,
      pathParams: this.props.id_formulary_maintenance + "/" + currentLob,
      //this.props.current_formulary.formulary_type_info.formulary_type_code,

      keyVals: [
        { key: constants.KEY_INDEX, value: this.state.index },
        { key: constants.KEY_LIMIT, value: this.state.limit },
      ],
    };
    apiDetails["messageBody"] = {};
    apiDetails["messageBody"][
      "selected_criteria_ids"
    ] = this.state.selectedCriteria;
    apiDetails["messageBody"]["filter"] = this.state.filter;
    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map((keyPair) => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      apiDetails["messageBody"]["sort_by"] = keys;
      apiDetails["messageBody"]["sort_order"] = values;
    }

    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
      //   apiDetails["messageBody"],
      // searchBody // Object.assign({}, searchBody);
    }
    console.log("[apiDetails]:", apiDetails);
    this.props.postFormularyDrugQl(apiDetails).then((json) => {
      console.log("[QlDetail]:", json.payload);
      if (json.payload) {
        this.loadGridData(json);
        console.log("{drugCount", json.payload.count);
        this.setState({ drugCount: json.payload.count });
        // } else {
        // showMessage("something went wrong", "error");
        // }
        this.setState({
          // filter: [],
          // sort_by: [],
          // gridSingleSortInfo: null,
          // gridMultiSortedInfo: [],
          // isGridMultiSorted: false,
          // isGridSingleSorted: false,
        });
      }
    });
    // }
  };

  goToSettingSection = () => {
    window.scrollTo({
      top: 420,
      left: 0,
      behavior: "smooth",
    });
  };

  loadGridData(json: any) {
    let tmpData = json.payload.result;
    var data: any[] = [];
    var switchState = this.props.switchState;
    let selectedDrugs: any = [...this.state.prevSelectedDrugs];
    let count = 1;
    var gridData: any = tmpData.map(function (el) {
      var element = Object.assign({}, el);
      data.push(element);
      let gridItem = {};
      gridItem["id"] = count;
      gridItem["key"] = count;
      gridItem["is_um_criteria"] = element.is_um_criteria;
      gridItem["covered_genders"] = element.covered_genders;
      gridItem["covered_icds"] = element.covered_icds;
      gridItem["formulary_drug_id"] = element.formulary_drug_id;
      gridItem["covered_max_ages"] = element.covered_max_ages;
      gridItem["covered_max_operators"] = element.covered_max_operators
        ? "" + element.covered_max_operators
        : "";

      if (switchState) {
        gridItem["isDisabled"] = true;
        gridItem["rowStyle"] = "table-row--disabled-font";
      }
      if (selectedDrugs.length > 0) {
        if (selectedDrugs.includes(element.md5_id)) {
          gridItem["isChecked"] = true;
          gridItem["isDisabled"] = true;
          // decide on class names based on data properties conditionally
          // the required styles are added under each classNames in FrxGrid.scss (towards the end)
          //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
          gridItem["rowStyle"] = "table-row--blue-font";
        }
      }
      gridItem["covered_min_ages"] = element.covered_min_ages
        ? "" + element.covered_min_ages
        : "";
      gridItem["drug_label_name"] = element.drug_label_name
        ? "" + element.drug_label_name
        : "";
      gridItem["covered_min_operators"] = "";
      gridItem[
        "covered_patient_residences"
      ] = element.covered_patient_residences
        ? "" + element.covered_patient_residences
        : "";
      gridItem["covered_pharmacy_networks"] = element.covered_pharmacy_networks
        ? "" + element.covered_pharmacy_networks
        : "";
      gridItem["trademark_code"] = element.trademark_code
        ? "" + element.trademark_code
        : "";
      gridItem["database_category"] = element.database_category
        ? "" + element.database_category
        : "";
      gridItem["covered_place_of_services"] = element.covered_place_of_services
        ? "" + element.covered_place_of_services
        : "";
      gridItem[
        "covered_prescriber_taxonomies"
      ] = element.covered_prescriber_taxonomies
        ? "" + element.covered_prescriber_taxonomies
        : "";
      gridItem["created_by"] = element.created_by
        ? "" + element.created_by
        : "";

      gridItem["created_date"] = element.created_date
        ? "" + element.created_date
        : "";
      gridItem["data_source"] = element.data_source
        ? "" + element.data_source
        : "";
      gridItem[
        "drug_descriptor_identifier"
      ] = element.drug_descriptor_identifier
        ? "" + element.drug_descriptor_identifier
        : "";
      gridItem["file_type"] = element.file_type ? "" + element.file_type : "";
      gridItem["fills_allowed"] = element.fills_allowed
        ? "" + element.fills_allowed
        : "";
      gridItem["formulary_drug_id"] = element.formulary_drug_id
        ? "" + element.formulary_drug_id
        : "";
      gridItem["full_limit_period_of_time"] = element.full_limit_period_of_time
        ? "" + element.full_limit_period_of_time
        : "";
      gridItem[
        "generic_product_identifier"
      ] = element.generic_product_identifier
        ? "" + element.generic_product_identifier
        : "";
      gridItem["is_al"] = element.is_al ? "" + element.is_al : "";
      gridItem["is_fff"] = element.is_fff ? "" + element.is_fff : "";
      gridItem["is_gl"] = element.is_gl ? "" + element.is_gl : "";
      gridItem["is_patrs"] = element.is_patrs ? "" + element.is_patrs : "";
      gridItem["is_phnw"] = element.is_phnw ? "" + element.is_phnw : "";
      gridItem["is_pos"] = element.is_pos ? "" + element.is_pos : "";
      gridItem["is_prtx"] = element.is_prtx ? "" + element.is_prtx : "";
      gridItem["is_user_defined_1"] = element.is_user_defined_1
        ? "" + element.is_user_defined_1
        : "";
      gridItem["is_user_defined_2"] = element.is_user_defined_2
        ? "" + element.is_user_defined_2
        : "";
      gridItem["is_user_defined_2"] = element.is_user_defined_2
        ? "" + element.is_user_defined_2
        : "";
      gridItem["is_user_defined_3"] = element.is_user_defined_3
        ? "" + element.is_user_defined_3
        : "";
      gridItem["is_user_defined_4"] = element.is_user_defined_4
        ? "" + element.is_user_defined_4
        : "";
      gridItem["is_user_defined_5"] = element.is_user_defined_5
        ? "" + element.is_user_defined_5
        : "";
      gridItem["lookback_days"] = element.lookback_days
        ? "" + element.lookback_days
        : "";
      gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";
      gridItem["modified_by"] = element.modified_by
        ? "" + element.modified_by
        : "";
      gridItem["modified_date"] = element.modified_date
        ? "" + element.modified_date
        : "";
      gridItem["not_covered_genders"] = element.not_covered_genders
        ? "" + element.not_covered_genders
        : "";
      gridItem["not_covered_icds"] = element.not_covered_icds
        ? "" + element.not_covered_icds
        : "";
      gridItem["not_covered_max_ages"] = element.not_covered_max_ages
        ? "" + element.not_covered_max_ages
        : "";
      gridItem["not_covered_max_operators"] = element.not_covered_max_operators
        ? "" + element.not_covered_max_operators
        : "";
      gridItem["not_covered_max_operators"] = element.not_covered_max_operators
        ? "" + element.not_covered_max_operators
        : "";
      gridItem["not_covered_min_ages"] = element.not_covered_min_ages
        ? "" + element.not_covered_min_ages
        : "";
      gridItem["not_covered_min_operators"] = element.not_covered_min_operators
        ? "" + element.not_covered_min_operators
        : "";
      gridItem[
        "not_covered_patient_residences"
      ] = element.not_covered_patient_residences
        ? "" + element.not_covered_patient_residences
        : "";
      gridItem[
        "not_covered_pharmacy_networks"
      ] = element.not_covered_pharmacy_networks
        ? "" + element.not_covered_pharmacy_networks
        : "";
      gridItem[
        "not_covered_place_of_services"
      ] = element.not_covered_place_of_services
        ? "" + element.not_covered_place_of_services
        : "";
      gridItem[
        "not_covered_prescriber_taxonomies"
      ] = element.not_covered_prescriber_taxonomies
        ? "" + element.not_covered_prescriber_taxonomies
        : "";
      gridItem["override_category"] = element.override_category
        ? "" + element.override_category
        : "";
      gridItem["override_class"] = element.override_class
        ? "" + element.override_class
        : "";
      gridItem["pa_group_description"] = element.pa_group_description
        ? "" + element.pa_group_description
        : "";
      gridItem["pa_type"] = element.pa_type ? "" + element.pa_type : "";
      gridItem["ql_days"] = element.ql_days ? "" + element.ql_days : "";
      gridItem["ql_period_of_time"] = element.ql_period_of_time
        ? "" + element.ql_period_of_time
        : "";
      gridItem["ql_quantity"] = element.ql_quantity
        ? "" + element.ql_quantity
        : "";
      gridItem["ql_type"] = element.ql_type ? "" + element.ql_type : "";
      gridItem["st_group_description"] = element.st_group_description
        ? "" + element.st_group_description
        : "";
      gridItem["st_type"] = element.st_type ? "" + element.st_type : "";
      gridItem["st_value"] = element.st_value ? "" + element.st_value : "";
      gridItem["tier_value"] = element.tier_value
        ? "" + element.tier_value
        : "";
      gridItem["user_defined"] = element.user_defined
        ? "" + element.user_defined
        : "";
      gridItem["ndc"] = element.ndc ? element.ndc : "";

      count++;
      return gridItem;
    });
    this.setState({
      drugData: data,
      drugGridData: gridData,
      drugGridContainer: true,
      selectedDrugs: Array(),
    });
  }

  handleOnChange = (e, formularyId) => {
    debugger;
    var numbers = /^[0-9]+$/;
    let tempObject = {};
    let mainObject =this.state.quantityAndFillLimitObject;
    let temError = {};
    let formularyData= {};
    formularyData = mainObject[formularyId];
    if (formularyData==null){
      formularyData={};
    }

    console.log(e.target.value);
    if (e.target.value.match(numbers)) {
      tempObject = {
        ...formularyData,
        [e.target.name]: Number(e.target.value),
      };
      temError = {
        ...this.state.errorObject,
        [e.target.name]: false,
      };
      mainObject[formularyId] =tempObject;
      this.setState({
        quantityAndFillLimitObject: mainObject,
        errorObject: temError,
      });
    }
    if (e.target.value == "") {
      tempObject = {
        ...formularyData,
        [e.target.name]: e.target.value,
      };
      temError = {
        ...this.state.errorObject,
        [e.target.name]: false,
      };
      mainObject[formularyId] =tempObject;
      this.setState({
        quantityAndFillLimitObject: mainObject,
        errorObject: temError,
      });
    }
  };
  onSelectedTableRowChanged = (selectedRowKeys) => {
    // this.state.selectedDrugs = [];
    console.log("[selectedRowKeys]:", selectedRowKeys);

    if (selectedRowKeys && selectedRowKeys.length > 0) {
      // this.state.selectedDrugs = selectedRowKeys.map(
      //   (tierId) => this.state.drugData[tierId - 1]["md5_id"]
      // );
      const currentDrug: any = selectedRowKeys.map(
        (tierId) => this.state.drugData[tierId - 1]["md5_id"]
      );
      this.state.selectedDrugs = [...this.state.selectedDrugs, ...currentDrug];
    }
  };

onUpdateSelectedCriteria = (currentSelectedCriteriaIds,formularyId) => {
    debugger;
    let tmp = this.state.selectedCriteria;
    tmp[formularyId] =currentSelectedCriteriaIds;
    this.setState({ selectedCriteria: tmp });
  };

  componentDidMount() {
    this.props
      .getQlSummary(this.props.id_formulary_maintenance)
      .then((json) => {
        console.log("[json.payload]", json.payload);
        this.initailizeQlSummary(json);
      });
    console.log("in ql, [curenformulary]:", this.props.current_formulary);
    if (this.props.id_lob == 1) {
      this.props
        .getQLFileTypes(this.props.id_formulary_maintenance)
        .then((json) => {
          this.setState({ qlFileTypes: json.payload.data }, () =>
            this.onCurrentQlFileType()
          );
          console.log("[json]:", json);
          this.renderRadioButtons();
        });
    }
  }

  initailizeQlSummary(json: any) {
    let tmpData =
      json.payload && json.payload.result ? json.payload.result : [];

    var rows = tmpData.map(function (el) {
      var curRow = [
        el["ql_type_name"],
        el["total_group_description_count"],
        el["added_group_description_count"],
        el["removed_group_description_count"],
      ];
      return curRow;
    });

    console.log(rows);
    this.setState({
      panelGridValue: rows,
    });
  }

  getCurrentAction = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return constants.TYPE_REPLACE;
      case 1:
        return "append";
      case 2:
        return constants.TYPE_REMOVE;
    }
  };

  handleSave = () => {
     debugger;

    if (this.state.drugGridData["selectedDrugs"] && this.state.drugGridData["selectedDrugs"].length > 0) {
      let data = this.state.quantityAndFillLimitObject;
      let currentAction = this.getCurrentAction();
      let currentLob = getLobCode(this.props.id_lob);

      if (this.props.id_lob == 1) {
        // if (!this.props.switchState) {
        currentLob = this.state.selectedQlFileType;
        // }
      }


      this.props.maintenanceFormularies.list.map((curFormulary) => {
        let quantityAndFillLimitObject = data[curFormulary.id_formulary];
        let selectedCriteria = this.state.selectedCriteria[curFormulary.id_formulary];
        if (selectedCriteria==null){
          selectedCriteria=[];
        }
        if ( currentAction != "remove" && quantityAndFillLimitObject!=undefined){
        
              if (!this.checkForRequiredFields({
                  ...this.state.quantityAndFillLimitObject,
                })
              ) {
               
                showMessage("Please fill the required fields", "error");
                return;
              }
            }
              if (currentAction == "remove" && Object.keys(selectedCriteria).length ==0) {
                showMessage("Please select the critieria", "error"); 
                return;
              }
      let apiDetails = {};

      apiDetails["pathParams"] =
      curFormulary.id_formulary +
        "/" +
        currentLob +
        "/" +
        currentAction;

        apiDetails["keyVals"] = [
          { key: constants.KEY_ENTITY_ID, value: curFormulary.id_formulary },
        ];
      apiDetails["messageBody"] = {};
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.drugGridData["selectedDrugs"];

      if (currentAction != "remove"){

      
      apiDetails["messageBody"]["quantity"] = quantityAndFillLimitObject[
        "quantity"
      ]
        ? quantityAndFillLimitObject["quantity"]
        : null;
      apiDetails["messageBody"][
        "quantity_limit_days"
      ] = quantityAndFillLimitObject["days"]
        ? quantityAndFillLimitObject["days"]
        : null;
      apiDetails["messageBody"][
        "quantity_limit_period_of_time"
      ] = quantityAndFillLimitObject["periodOfTime"]
        ? quantityAndFillLimitObject["periodOfTime"]
        : null;
      apiDetails["messageBody"]["fills_allowed"] = quantityAndFillLimitObject[
        "fillsAllowed"
      ]
        ? quantityAndFillLimitObject["fillsAllowed"]
        : null;
      apiDetails["messageBody"][
        "full_limit_period_of_time"
      ] = quantityAndFillLimitObject["fillLimitPeriodOfTime"]
        ? quantityAndFillLimitObject["fillLimitPeriodOfTime"]
        : null;
      }

      apiDetails["messageBody"]["is_select_all"] = this.state.isSelectAll;
      apiDetails["messageBody"]["search_key"] = "";
     
      apiDetails["messageBody"]["selected_criteria_ids"] = selectedCriteria;
     
      if (
        quantityAndFillLimitObject["additionalCriteria"] != null &&
        quantityAndFillLimitObject["additionalCriteria"]
      ) {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = true;
        apiDetails["messageBody"][
          "um_criteria"
        ] = quantityAndFillLimitObject["additionalCriteria"]
      } else {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = false;
        apiDetails["messageBody"]["um_criteria"] = [];
      }

     // apiDetails["messageBody"]["is_covered"] = true;
      apiDetails["messageBody"]["filter"] = [];

      console.log("[path]:", apiDetails["pathParams"]);
      console.log("{apiDetails}", apiDetails);

      const saveData = this.props
        .postApplyFormularyDrugQl(apiDetails)
        .then((json) => {
          console.log("Save response is:" + JSON.stringify(json));
          console.log("[json]", json);

          if (json.payload && json.payload.code === "200") {
            showMessage("Success", "success");
            
          } else {
            showMessage("Failure", "error");
          }
        });
      });
    }else{
      showMessage("Please select the drugs.", "error");
    }
  };

  advanceSearchClickHandler = () => {
    this.setState({ isAdvanceSearchOpen: !this.state.isAdvanceSearchOpen });
  };

  openAdditionalCriteria = () => {
    if (this.state.is_additional_criteria_defined) {
      this.setState({
        is_additional_criteria_defined: false,
        isAdditionalCriteriaOpen: false,
      });
    } else {
      this.setState({
        is_additional_criteria_defined: true,
        isAdditionalCriteriaOpen: true,
      });
    }
  };
  closeAdditonalCriteria = () => {
    this.setState({
      isAdditionalCriteriaOpen: false,
    });
  };

  onRadioButtohandleChange = (e) => {
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
    this.setState({ is_additional_criteria_defined: tmp_value });
  };

  // onApply = () => {
  //   this.state.prevSelectedDrugs = Array();
  //   if (this.getCurrentAction() !== constants.TYPE_REMOVE) {
  //     if (
  //       this.checkForRequiredFields({
  //         ...this.state.quantityAndFillLimitObject,
  //       })
  //     ) {
  //       this.showDrugGrid();
  //     } else {
  //       showMessage("Please fill the required fields", "error");
  //     }
  //   } else {
  //     if (this.state.selectedCriteria.length == 0) {
  //       showMessage("Select Crieria to Remove Drugs", "error");
  //     } else {
  //       this.showDrugGrid();
  //     }
  //   }
  // };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    // debugger;
    console.log("data row ", selectedRow, isSelected, key);
    // this.state.selectedRowKeys = [
    //   ...this.state.selectedRowKeys,
    //   selectedRow.key,
    // ];
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = true;
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

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = false;
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        const removeSelectedDrug = this.state.selectedDrugs.filter(
          (drugId) => drugId !== selectedRow.md5_id
        );
        // this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          drugGridData: data,
          selectedDrugs: removeSelectedDrug,
          // prevSelectedDrugs: removeSelectedDrug,
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    // alert("onSelectAll");
    // if (isSelected) {
    const selectedRowKeys: number[] = [];
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) selectedRowKeys.push(d["key"]);
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      (k) => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({
      drugGridData: data,
      // isSelectAll: isSelected,
    });
    // } else {
    //   const data = this.state.drugGridData.map((d: any) => {
    //     if (!d["isDisabled"]) {
    //       d["isChecked"] = isSelected;
    //     }

    //     // else d["isSelected"] = false;
    //     return d;
    //   });
    //   this.setState({
    //     selectedDrugs: Array(),
    //     drugGridData: data,
    //     // isSelectAll: isSelected,
    //   });
    // }
  };

  onPageSize = (pageSize) => {
    console.log("Page size load");
    this.state.limit = pageSize;
    if (this.props.advancedSearchBody) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

  onGridPageChangeHandler = (pageNumber: any) => {
    console.log("Page change load");
    this.state.index = (pageNumber - 1) * this.state.limit;
    if (this.props.advancedSearchBody) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

  onClearFilterHandler = () => {
    this.state.filter = Array();
    if (Object.keys(this.props.advancedSearchBody).length > 0) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

  onApplyFilterHandler = (filters) => {
    // debugger;
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
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
            values: fetchedValues,
          });
        }
      });
    } else {
      this.state.filter = Array();
    }
    console.log("Filters:" + JSON.stringify(this.state.filter));
    if (Object.keys(this.props.advancedSearchBody).length > 0) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

  onApplySortHandler = (key, order, sortedInfo) => {
    // debugger;
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === "ascend" ? "asc" : "desc";
      this.state.sort_by = this.state.sort_by.filter(
        (keyPair) => keyPair["key"] !== key
      );
      this.state.sort_by.push({ key: key, value: sortOrder });
    }
    this.state.gridSingleSortInfo = sortedInfo;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = false;
    this.state.isGridSingleSorted = true;
    if (Object.keys(this.props.advancedSearchBody).length > 0) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = multiSortedInfo;
    this.state.isGridMultiSorted = true;
    this.state.isGridSingleSorted = false;

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

    if (Object.keys(this.props.advancedSearchBody).length > 0) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (Object.keys(this.props.advancedSearchBody).length > 0) {
      this.showDrugGrid(this.props.advancedSearchBody);
    } else {
      this.showDrugGrid();
    }
  };

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

  componentDidUpdate = (prevState) => {
    // debugger;
    console.log("component update");
    // if (this.props.id_lob === 1) {
    //   this.setState({
    //     tabs: this.state.tabs.map((tab) => {
    //       if (tab.id == 2) {
    //         tab["disabled"] = true;
    //       }
    //       return tab;
    //     }),
    //   });
    // }

    // if (
    //   this.state.drugGridContainer &&
    //   Object.keys(this.state.quantityAndFillLimitObject).length > 0
    // ) {
    //   window.scrollTo({
    //     top: 420,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.switchState) {
      this.showDrugGrid({ ...nextProps.advancedSearchBody });
      this.setState({
        tabs: this.state.tabs.map((tab) => {
          tab["disabled"] = true;
          return tab;
        }),
        is_additional_criteria_defined: false,
        isSettingsApplied: false,
      });
      this.onClickTab(0);
    } else {
      let tabs = [
        { id: 1, text: "Replace" },
        { id: 2, text: "Append" },
        { id: 3, text: "Remove" },
      ];
      if (this.props.id_lob === 1) {
        this.setState({
          tabs: tabs.map((tab) => {
            if (tab.id == 2) tab["disabled"] = true;
            return tab;
          }),
        });
      }
      this.setState({
        tabs,
      });
      if (this.state.isSettingsApplied) return;
      this.state.drugGridContainer = false;
    }

    // if (this.props.id_lob === 1) {
    //   this.setState({
    //     tabs: this.state.tabs.map((tab) => {
    //       if (tab.id == 2) {
    //         tab["disabled"] = true;
    //       }
    //       return tab;
    //     }),
    //   });
    // }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.showDrugGrid({ ...nextProps.advancedSearchBody });
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isAdvanceSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }

    if (nextProps.additionalCriteriaBody) {
      const additionalCriteriaState = nextProps.additionalCriteriaBody;
      this.setState({ additionalCriteriaState }, () =>
        console.log(this.state.additionalCriteriaState)
      );
    }
  }

  render() {
    console.log("in ql [data]", this.props.qlData);
    console.log("[drugGridData]", this.state.drugGridData);
    const searchProps = {
      lobCode: this.props.id_lob,
    };
    const dataLength = this.state.drugGridData.length > 0 ? true : false;
    return (
      <div className="drug-detail-LA-root QL-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                      <div className="mm-pa-root">
                        <div className="bordered details-top">
                          <div>
                            <PanelHeader
                              title="SELECTED FORMULARIES"
                              tooltip="SELECTED FORMULARIES"
                            />
                          </div>
                          <div className="inner-container p-20">
                            <div>
                              <SimpleGrid columns={this.state.gridColumns} data={this.props.maintenanceFormularies.list} />
                            </div> 
                            <div className="dynamic-row-addition">
                              <span onClick={this.addNew}>
                                <img src={PlusIcon} alt="PlusIcon" />
                                &nbsp;
                                <span className="__add-new-row">add new</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <DrugGrid
                          getDrugs={this.props.postMaintenaceDrugPA}
                          columns={getDrugsPAGridColumns()}
                          updateDrugGridData={this.updateDrugGridData}
                        />
                      </div>
                      <div className="quntity-limits-sec">
                        <div className="limited-access">
                          <PanelHeader title="QUANTITY LIMIT SETTINGS" />
                          <div className="modify-wrapper white-bg tier-modify-panel">
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
                                  disabled={this.props.switchState}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="tab-content">
                            {this.renderTabContent()}
                          </div>

                          
                        </div>
                      </div>
                      
                  </div>
                </div>
              </Grid>
              {/* <div className="apply-button"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                
                <Button
                  label="Save"
                  onClick={this.onApply}
                  disabled={this.props.switchState}
                ></Button>
              </div> */}
              <div className="button-container-root">
              <span className="white-bg-btn">
                <Button label="Save" onClick={this.handleSave} />
              </span>
              <Button label="Save & Continue" onClick={this.handleSave} />
            </div> 
            </Grid>
            
          </div>
          {this.state.isAdvanceSearchOpen && (
            <AdvanceSearchContainer
              {...searchProps}
              openPopup={this.state.isAdvanceSearchOpen}
              onClose={this.advanceSearchClickHandler}
              isAdvanceSearch={true}
            />
          )}
          {this.state.showUmCriteria && (
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"UM Criteria"}
            handleClose={() => {
              this.setState({
                showUmCriteria: !this.state.showUmCriteria,
              });
            }}
            handleAction={() => { }}
            open={this.state.showUmCriteria}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            
            <UmCriteria
              selectedDrugId={this.state.clickedDrugId}
              
            />
          </FrxDialogPopup>
        )}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tier);
