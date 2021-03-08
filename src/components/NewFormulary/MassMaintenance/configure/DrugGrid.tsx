import React, { useState } from "react";
import { connect } from "react-redux";

import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../mocks/formulary/mock-data";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";
import showMessage from "../../Utils/Toast";
//import AdvancedSearch from './../search/AdvancedSearch';
import AdvanceSearchContainer from "../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import FrxDrugGridContainer from "../../../shared/FrxGrid/FrxDrugGridContainer";

import DropDownMap from "../../../shared/Frx-components/dropdown/DropDownMap";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../shared/Frx-components/button/Button";
import * as constants from "../../../../api/http-commons";
import { ToastContainer } from "react-toastify";
import { setAdditionalCriteria } from "../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
// import PaGroupDescriptionManagement from "PaGroupDescriptionManagement";
import "./PaTab/PaReplace.scss";
import getLobCode from "../../Utils/LobUtils";
// import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import {
  getPaSummary,
  getPaGrouptDescriptions,
  getPaGrouptDescription,
  getPaTypes,
  getDrugLists,
  postFormularyDrugPA,
  postMaintenaceDrugPA,
  getPaGrouptDescriptionVersions,
  postApplyFormularyDrugPA,
  getLobFormularies,
} from "../../../../redux/slices/formulary/pa/paActionCreation";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import UmCriteria from "UmCriteria";

function mapDispatchToProps(dispatch) {
  return {
    getPaSummary: (a) => dispatch(getPaSummary(a)),
    getPaGrouptDescriptions: (a) => dispatch(getPaGrouptDescriptions(a)),
    getPaGrouptDescription: (a) => dispatch(getPaGrouptDescription(a)),
    getPaTypes: (a) => dispatch(getPaTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    postFormularyDrugPA: (a) => dispatch(postFormularyDrugPA(a)),
    getPaGrouptDescriptionVersions: (a) =>
      dispatch(getPaGrouptDescriptionVersions(a)),
    postApplyFormularyDrugPA: (a) => dispatch(postApplyFormularyDrugPA(a)),
    getLobFormularies: (a) => dispatch(getLobFormularies(a)),
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    client_id: state.application.clientId,
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    formulary_list: state.maintenance?.setupOptions?.list,
    formulary_list_count: state.maintenance?.setupOptions?.count,
    submission_months: state.maintenance?.setupOptions?.submission_months,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

class DrugGrid extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    tierGridContainer: false,
    isSearchOpen: false,
    paTypes: [],
    paGroupDescriptions: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedDrugsLabels: Array(),
    selectedGroupDescription: null,
    selectedGroupDescriptionObj: {},
    selectedPaType: null,
    showPaConfiguration: false,
    selectedLastestedVersion: null,
    fileType: null,
    lobFormularies: null,
    selectedLobFormulary: {},
    groupDescriptionProp: "",
    isAdditionalCriteriaOpen: false,
    additionalCriteriaState: null,
    showPaGroupDescription: false,
    is_additional_criteria_defined: false,
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[],
    index: 0,
    limit: 10,
    filter: Array(),
    dataCount: 0,
    quickFilter: Array(),
    sort_by: Array(),
    hiddenColumns: Array(),
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    searchData: Array(),
    isSelectAll: false,
    pa_rx_otc: "Rx",
    pa_brand_generic: "Brand",
    showUmCriteria: false,
    clickedDrugId: null,
    fileValues: Array(),
    selectedFileKey: "",
    selectedFileType: "Full Formulary",
    fileTypes: [
      { type: "Full Formulary", key: "MCR" },
      { type: "Full Formulary", key: "MCD" },
      { type: "Full Formulary", key: "COMM" },
      { type: "Drug Table", key: "MCDDF" },
      { type: "Drug Table", key: "COMMDF" },
      
      { type: "FRF", key: "FRF" },
      { type: "ORF/ERF", key: "OTC" },
      { type: "Non FRF Products", key: "NONFRF" },
      { type: "ADD File", key: "ADD" },
      { type: "Excluded", key: "ExD" },
    ],
    showMedicareFileType: false,
    
  };

  fileTypeDropDownSelectHandler = (value, event) => {
    
    let fileKey = event.value.toString().trim();
    let fileType = this.props.lobCode;

    if (fileKey) {
      let filtered = this.state.fileTypes.filter(
        (fileObject) => fileObject.key.toString().trim() === fileKey
      );
      if (filtered && filtered.length > 0) {
        fileType = filtered[0].type;

      }
    }
    console.log("Selected file key is:" + fileKey);
    this.state.selectedFileKey = fileKey;
    this.state.selectedFileType = fileType;
    //this.state.selectedFileType = fileType;
    //this.setState({ selectedFileKey: fileKey });

    this.resetData();
this.updateDrugGridData();
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  resetData = () => {
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    this.props.setAdvancedSearch(payload);
    this.state.filter = Array();
    this.state.quickFilter = Array();
    this.state.sort_by = Array();
    this.state.sort_by.push({ key: "drug_label_name", value: "asc" });
    this.state.index = 0;
    this.state.limit = 10;
    //this.state.hiddenColumns = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    this.state.searchData = Array();

    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = false;
    this.state.isGridSingleSorted = false;

    //this.state.filteredInfo = null;
    //this.state.isFiltered = false;
    this.state.isSelectAll = false;
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            d["rowStyle"] = "table-row--green-font";
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

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
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
          drugGridData: data,
        });
      }
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    console.log("selected row ", selectedRowKeys);

    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys],
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) => {
        return this.state.drugData[tierId - 1]["md5_id"];
      });
      this.state.selectedDrugsLabels = selectedRowKeys.map((tierId) => {
        return this.state.drugData[tierId - 1]["drug_label_name"];
      });
    }
    this.updateDrugGridData();
  };
  // onSelectedTableRowChanged = (selectedRowKeys) => {
  //   debugger;
  //   this.state.selectedDrugs = [];
  //   if (selectedRowKeys && selectedRowKeys.length > 0) {
  //     this.state.selectedDrugs = selectedRowKeys.map(
  //       (tierId) => this.state.drugData[tierId - 1]["md5_id"]
  //     );
  //   }
  // };

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.state.selectedRowKeys = [];
    if (this.state.selectedGroupDescription === null) {
      showMessage("Group Description is required", "info");
      return;
    }

    if (this.state.selectedPaType === null) {
      showMessage("PA Type is required", "info");
      return;
    }

    if (
      this.state.showPaConfiguration &&
      this.state.selectedLobFormulary["id_formulary"] === undefined
    ) {
      showMessage("Related Formulary is required", "info");
      return;
    }

    this.populateGridData();
  };

  onClose = () => {
    console.log("close");
    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = () => {
    this.setState({ selectFormulary: true });
  };

  selectFormularyClick = (dataRow) => {
    console.log(dataRow);
    if (dataRow) {
      this.state.selectedLobFormulary = dataRow;
      // if(this.state.currentPopupType === this.POPUP_TYPE_BASE){
      //  // this.state.baseFormulary = dataRow;
      // }else if(this.state.currentPopupType === this.POPUP_TYPE_REFERENCE){
      //   //this.state.referenceFormulary = dataRow;
      // }
    }
    this.setState({ selectFormulary: false });
  };

  componentWillReceiveProps(nextProps) {
    //this.initialize(nextProps);
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
    
    if (nextProps.configureSwitch) {
      this.setState({
        showPaConfiguration: false,
        selectedGroupDescription: null,
        selectedPaType: null,
        is_additional_criteria_defined: false,
      });
      this.populateGridData(null, nextProps.configureSwitch);
    } else {
      this.setState({ tierGridContainer: false });
    }
  }

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };



  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      // apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails["lob_type"] = this.props.formulary_lob_id;
      apiDetails["pathParams"] =
        this.props?.id_formulary_maintenance +
        "/" +
        this.state.fileType +
        "/" +
        this.props.tab_type;
      apiDetails["keyVals"] = [
        { key: constants.KEY_ENTITY_ID, value: this.props?.id_formulary_maintenance },
      ];

      apiDetails["messageBody"] = {
        covered: {},
        filter: [],
        is_select_all: false,
        not_covered: {},
        search_key: "",
        drug_list: "",
        prev_formulary: "",
      };
      if (
        this.props.advancedSearchBody &&
        Object.keys(this.props.advancedSearchBody).length > 0
      ) {
        apiDetails["messageBody"] = Object.assign(
          apiDetails["messageBody"],
          this.props.advancedSearchBody
        );
      }

      apiDetails["messageBody"]["is_select_all"] = this.state.isSelectAll;

      let allFilters = Array();
      let filterProps = Array();
      this.state.filter.map((filterInfo) => {
        allFilters.push(filterInfo);
        filterProps.push(filterInfo["prop"]);
      });

      this.state.quickFilter.map((filterInfo) => {
        if (!filterProps.includes(filterInfo["prop"]))
          allFilters.push(filterInfo);
      });

      apiDetails["messageBody"]["filter"] = allFilters;
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"][
        "base_pa_group_description_id"
      ] = this.state.selectedGroupDescription;
      apiDetails["messageBody"][
        "id_pa_group_description"
      ] = this.state.selectedLastestedVersion;
      apiDetails["messageBody"]["id_pa_type"] = Number(
        this.state.selectedPaType
      );
      apiDetails["messageBody"]["pa_rx_otc"] = this.state.pa_rx_otc;
      apiDetails["messageBody"]["pa_brand_generic"] = this.state.pa_brand_generic;

      apiDetails["messageBody"]["search_key"] = "";

      if (
        this.state.additionalCriteriaState != null &&
        this.state.is_additional_criteria_defined
      ) {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = true;
        apiDetails["messageBody"][
          "um_criteria"
        ] = this.state.additionalCriteriaState;
      } else {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = false;
        apiDetails["messageBody"]["um_criteria"] = [];
      }

      //apiDetails['messageBody']['id_tier'] = this.state.selectedTier;

      const saveData = this.props
        .postApplyFormularyDrugPA(apiDetails)
        .then((json) => {
          console.log("Save response is:" + JSON.stringify(json));
          if (json.payload && json.payload.code === "200") {
            showMessage("Success", "success");
            this.state.drugData = [];
            this.state.drugGridData = [];
            this.populateGridData();

            this.props
              .getPaSummary(this.props.current_formulary.id_formulary)
              .then((json) => {
                // debugger;
                this.setState({ tierGridContainer: true });
              });
          } else {
            showMessage("Failure", "error");
          }
        });
    }
  };


  dropDownSelectHandlerGroupDescription = (tmp_value, event) => {

    // let tmp_index = event.key;
    // let tmp_value = event.value;
    debugger;
    this.setState({ selectedGroupDescription: tmp_value });
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + tmp_value;
    this.state.showPaGroupDescription = false;
    let selected = this.state.paGroupDescriptions.filter(
      (obj) => obj[this.state.groupDescriptionProp] == tmp_value
    )[0];
    this.setState({
      selectedGroupDescriptionObj: selected
    });
    this.props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
      if (json?.payload && json?.payload?.data?.length > 0) {
        let data = json.payload.data;
        let ftype = "";
        switch (this.props.formulary_lob_id) {
          case 1:
            ftype = data[0].file_type;
            break;
          case 2:
            ftype = 'MCD';
            break;
          case 3:
            ftype = "EXNG";
            break;
          case 4:
            ftype = "COMM";
            break;
          default:
            break;
        }
        let latestVersionId = -1;
        data.forEach((element) => {
          if (element.id_pa_group_description > latestVersionId) {
            latestVersionId = element.id_pa_group_description;
          }
        });
        let tmp_additionalCriteria = false;
        let tmp_selectedPaType: any = null;
        this.props
          .getPaGrouptDescription({
            lob_type: this.props.formulary_lob_id,
            pathParams: "/" + latestVersionId,
          })
          .then((json) => {

            this.props.setAdditionalCriteria([]);
            if (json.payload && json.payload.code === "200") {
              if (
                json.payload.data["um_criteria"] != null &&
                json.payload.data["um_criteria"].length > 0
              ) {
                let payload: any = {};
                payload.additionalCriteriaBody = json.payload.data["um_criteria"];
                this.props.setAdditionalCriteria(payload);
                tmp_additionalCriteria = true;
              }
              if (json?.payload?.data?.pa_group_description_name == "BvD") {
                tmp_selectedPaType = 3;
              } else {
                tmp_selectedPaType = json?.payload?.data?.id_pa_type;
              }

            }
            this.setState({
              is_additional_criteria_defined: tmp_additionalCriteria,
              selectedPaType: tmp_selectedPaType
            });
          });
        this.setState({
          selectedLastestedVersion: latestVersionId,
          fileType: ftype,
        });
      }
    });
    this.setState({
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  onPageSize = (pageSize) => {
    console.log("Page size load");
    this.state.limit = pageSize;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
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
    this.state.filter = Array();
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  dropDownSelectHandlerPaType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({
      selectedPaType: tmp_value,
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  dropDownSelectHandlerLob = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedLobFormulary: tmp_value });
  };

  pa_configurationChange = (event, value) => {
    let tmp_index = event.target.key;
    let tmp_value = event.target.value;

    if (tmp_value == "true") {
      this.setState({ showPaConfiguration: true });
    } else {
      this.setState({ showPaConfiguration: false });
    }
  };

  handleChange = (e: any) => {
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
    this.setState({ [tmp_key]: tmp_value });
  };

  populateGridData = (searchBody = null, switchState = false) => {
    console.log("Populate grid data is called");
    let apiDetails = {};
    debugger;
    // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);

    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.id_formulary_maintenance },
      { key: constants.KEY_INDEX, value: this.state.index },
      { key: constants.KEY_LIMIT, value: this.state.limit },
    ];
    apiDetails["messageBody"] = {
      "is_advance_search" :false,
    };
    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    let allFilters = Array();
    let filterProps = Array();
    this.state.filter.map((filterInfo) => {
      allFilters.push(filterInfo);
      filterProps.push(filterInfo["prop"]);
    });

    this.state.quickFilter.map((filterInfo) => {
      if (!filterProps.includes(filterInfo["prop"]))
        allFilters.push(filterInfo);
    });

    apiDetails["messageBody"]["filter"] = allFilters;
    // if (this.state.sort_by && this.state.sort_by.length ==0){
    //   this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    // }

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
    let tmp_fileType: any = "";
    apiDetails["messageBody"]["search_key"] = "";
    apiDetails["messageBody"]["not_covered"] = {"drug_ids":[]}
    apiDetails["messageBody"]["is_covered"] = true;

    
    debugger;
    let lobCode ="";
    
    // if (this.props.tab=="tier"){
    //   if (this.props.id_lob==1){
    //     lobCode = this.state.mcrFileType;
    //   }else{
    //     lobCode = getLobCode(this.props.id_lob,true);
    //   }
    // }else{
    //   lobCode = getLobCode(this.props.id_lob);
    // }
    lobCode= this.state.selectedFileKey;
    apiDetails["pathParams"] =
      this.props?.id_formulary_maintenance + "/" +lobCode + "/";
    this.props
      .getDrugs(apiDetails)
      .then((json) => this.loadGridData(json));


    this.setState({ tierGridContainer: true });
  };

  loadGridData(json: any) {
    {
      if (json.payload != null && json.payload.code === "200") {
        this.setState({ tierGridContainer: true });
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;

        let selected = this.state.paGroupDescriptions.filter(
          (obj) =>
            obj[this.state.groupDescriptionProp] ==
            this.state.selectedGroupDescription
        )[0];

        let thisRef = this;
        var gridData = tmpData.map(function (el) {
          var gridItem = Object.assign({}, el);
          data.push(gridItem);
          gridItem["id"] = count;
          gridItem["key"] = count;


          if (selected &&
            selected["pa_group_description_name"] ===
            gridItem.pa_group_description
          ) {
            //console.log("element value tier ", selectedGroup, element.pa_group_description);
            gridItem["isChecked"] = true;
            gridItem["isDisabled"] = true;
            // decide on class names based on data properties conditionally
            // the required styles are added under each classNames in FrxGrid.scss (towards the end)
            //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
            gridItem["rowStyle"] = "table-row--blue-font";
          }

          if (thisRef.props.configureSwitch) {
            gridItem["isDisabled"] = true;
            gridItem["rowStyle"] = "table-row--disabled-font";
          }
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
    }
  }
  componentDidMount() {
     
      
      let tmpFileValues :any = [];
      let tmpSelectedFileKey="";
      switch(this.props.id_lob){
        case 1:
          tmpFileValues.push ({ type: "Full Formulary", key: "MCR" } );
          if (this.props.tab=="tier"){
          tmpFileValues.push (  { type: "FRF", key: "FRF" } );
          tmpFileValues.push (  { type: "ORF/ERF", key: "OTC" } );
          tmpFileValues.push ( { type: "Non FRF Products", key: "NONFRF" } );
          tmpFileValues.push ( { type: "ADD File", key: "ADDDF"  });
          tmpFileValues.push ( { type: "Excluded", key: "ExD"  });
          }
          tmpSelectedFileKey="MCR";
        break;
        case 2:
          tmpFileValues.push ({ type: "Full Formulary", key: "MCD" } );
          if (this.props.tab=="tier"){
          tmpFileValues.push ({ type: "Drug Table", key: "MCDDF" } );
          }
          tmpSelectedFileKey="MCD";
        break;
        case 3:
        case 4:
          tmpFileValues.push ({ type: "Full Formulary", key: "COMM" } );
          if (this.props.tab=="tier"){
            tmpFileValues.push ({ type: "Drug Table", key: "COMMDF" } );
          }
          tmpSelectedFileKey="COMM";
        break;
      }

      this.setState({"fileValues": tmpFileValues,
      "selectedFileKey":tmpSelectedFileKey},()=>
        
        {
          this.updateDrugGridData();
      this.populateGridData();
        });
      
  }

  // additional criteria toggle
  closeAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: false });
  };
  openAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: true });
  };
  onSelectAllRows = (isSelected: boolean) => {
    debugger;
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
    this.setState({ drugGridData: data, isSelectAll: isSelected });
    this.onSelectedTableRowChanged(selectedRows);
    
  };
  // additional criteria toggle

  onApplyFilterHandler = (filters) => {
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(
            (element) => element["prop"] !== fetchedProps
          );
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
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
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
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  updateDrugGridData = () => {
    debugger;
    let allFilters = Array();
    let filterProps = Array();
    this.state.filter.map((filterInfo) => {
      allFilters.push(filterInfo);
      filterProps.push(filterInfo["prop"]);
    });

    this.state.quickFilter.map((filterInfo) => {
      if (!filterProps.includes(filterInfo["prop"]))
        allFilters.push(filterInfo);
    });
    let data = {
      "isSelectAll": this.state.isSelectAll,
      "searchKey": "",
      "allFilters": allFilters,
      "selectedDrugs": this.state.selectedDrugs,
      "selectedDrugsLabels": this.state.selectedDrugsLabels,
      "fileType": this.state.selectedFileKey,
      "fileTypeName": this.state.selectedFileType,
    }
    this.props.updateDrugGridData(data);
  }
  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));

    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    })

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
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
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
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    const { isAdditionalCriteriaOpen } = this.state;
    return (
      <>
 
 
        {true && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">

            <div className="header space-between pr-10 select-drug-from-table-header">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ marginRight: 10 }}>Select Drugs From</span>
                  <DropDownMap
                    options={this.state.fileValues}
                    valueProp="key"
                    dispProp="type"
                    disabled={this.props.configureSwitch}
                    onSelect={this.fileTypeDropDownSelectHandler}
                    defaultValue={this.state.selectedFileType}
                  />
                </div>

                <div className="button-wrapper">
                  <Button
                    className="Button normal"
                    label="Advance Search"
                    onClick={this.advanceSearchClickHandler}
                    disabled={this.props.configureSwitch}
                  />
                  {/* {!this.props.configureSwitch && (
                    <Button label="Save" onClick={this.handleSave} />
                  )} */}
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="DRUG GRID"
                  enableSettings
                  columns={this.props.columns}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  settingsWidth={30}
                  pageSize={this.state.limit}
                  selectedCurrentPage={this.state.index / this.state.limit + 1}
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
                // rowSelection={{
                //   columnWidth: 50,
                //   fixed: true,
                //   type: "checkbox",
                //   onChange: this.onSelectedTableRowChanged,
                // }}
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvanceSearchContainer
                {...searchProps}
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        )}



        {this.state.showUmCriteria && (
          <DialogPopup
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

            {/* <UmCriteria
              selectedDrugId={this.state.clickedDrugId}
              
            /> */}
          </DialogPopup>
        )}
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugGrid);
