import React, { useState } from "react";
import { connect } from "react-redux";

import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../mocks/formulary/mock-data";
import DialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";
import showMessage from "../../../Utils/Toast";
//import AdvancedSearch from './../search/AdvancedSearch';
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import DropDownMap from "../../../../shared/Frx-components/dropdown/DropDownMap";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../shared/Frx-components/button/Button";
import * as constants from "../../../../../api/http-commons";
import { ToastContainer } from "react-toastify";
import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
// import PaGroupDescriptionManagement from "../PaGroupDescriptionManagement";
import "./PaReplace.scss";
import getLobCode from "../../../Utils/LobUtils";
// import AdvanceSearchContainer from "../../../../../NewAdvanceSearch/AdvanceSearchContainer";
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
} from "../../../../../redux/slices/formulary/pa/paActionCreation";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PaGroupDescriptionManagement from "./PaGroupDescriptionManagement";
// import UmCriteria from "../UmCriteria";

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
    configureSwitch: state.switchReducer.configureSwitch || state.maintenance?.selectedRow.is_view,
    applyData: state.tierSliceReducer.applyData,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    formulary_list: state.maintenance?.setupOptions?.list,
    formulary_list_count: state.maintenance?.setupOptions?.count,
    submission_months: state.maintenance?.setupOptions?.submission_months,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob :state.maintenance?.selectedRow?.id_lob,
    formulary_lob_id:state.maintenance?.selectedRow?.id_lob,
  };
};

class PaReplace extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    tierGridContainer: false,
    isSearchOpen: false,
    paTypes: [],
    paGroupDescriptions: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
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
    showUmCriteria:false,
    clickedDrugId:null,
    fileValues: Array(),
    selectedFileKey: "",
    selectedFileType: "Full Formulary",
    fileTypes: [
      { type: "FRF", key: "FRF" },
      { type: "ORF/ERF", key: "OTC" },
      { type: "Non FRF Products", key: "NONFRF" },
      { type: "FRF Change Report", key: "FRFCR" },
      { type: "Full Formulary", key: "MCR" },
    ],
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
    debugger;
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      
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
    if (nextProps.additionalCriteriaBody) {
      this.setState({
        additionalCriteriaState: nextProps.additionalCriteriaBody,
      });
      this.props.updateGDHandler(this.props.formularyId, 
        {
          "selectedGroupDescription": this.state.selectedGroupDescription,
          "selectedPaType":this.state.selectedPaType,
          "selectedLastestedVersion" : this.state.selectedLastestedVersion,
          "additionalCriteria" : this.state.additionalCriteriaState
        });

    }
    if (nextProps.configureSwitch) {
      this.setState({
        showPaConfiguration: false,
        selectedGroupDescription: null,
        selectedPaType: null,
        is_additional_criteria_defined: false,
      });
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
        let tmp_selectedPaType :any =null;
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
              if (json?.payload?.data?.pa_group_description_name =="BvD"){
                tmp_selectedPaType =3;
              }else{
                tmp_selectedPaType=json?.payload?.data?.id_pa_type;
              }
              
            }
            this.setState({
              is_additional_criteria_defined: tmp_additionalCriteria,
              selectedPaType: tmp_selectedPaType
            });
             //settingt the GD in the parent mass maintenance
          this.props.updateGDHandler(this.props.formularyId, 
            {
              "selectedGroupDescription": tmp_value,
              "selectedPaType":this.state.selectedPaType,
              "selectedLastestedVersion" : this.state.selectedLastestedVersion,
              "additionalCriteria" : this.state.additionalCriteriaState,
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
    });
  
  };


  dropDownSelectHandlerPaType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({
      selectedPaType: tmp_value,
      tierGridContainer: false,
    });
     //settingt the GD in the parent mass maintenance
     this.props.updateGDHandler(this.props.formularyId, 
      {
        "selectedGroupDescription": this.state.selectedGroupDescription,
        "selectedPaType":this.state.selectedPaType,
        "selectedLastestedVersion" : this.state.selectedLastestedVersion,
        "additionalCriteria" : this.state.additionalCriteriaState,
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

  

  
  componentDidMount() {
    switch (this.props.formulary_lob_id) {
      case 1:
        this.setState({
          groupDescriptionProp: "id_mcr_base_pa_group_description",
        });
        break;
      default:
        this.setState({
          groupDescriptionProp: "id_base_pa_group_description",
        });
        break;
    }

    let apiDetails_1 = {};
    apiDetails_1["lob_type"] = this.props.formulary_lob_id;
    apiDetails_1["pathParams"] = "/" + this.props?.client_id;

    this.props.getPaGrouptDescriptions(apiDetails_1).then((json: any) => {
      if (json?.payload && json?.payload?.data?.length > 0) {
        let result = json.payload.data.filter(
          (obj) => !obj.is_archived && obj.is_setup_complete
        );
        this.setState({
          paGroupDescriptions: result,
        });
      }
    });

    this.props.getPaSummary(this.props?.formularyId).then((json) => {
      this.setState({
        paTypes: json?.payload?.result,
      });
    });

    let apiDetails = {
      formulary_type_id: this.props?.formulary_type_id,
      formulary_lob_id: this.props?.formulary_lob_id,
    };
    this.props.getLobFormularies(apiDetails).then((json) => {
      this.setState({
        lobFormularies: json?.payload?.result,
      });
    });

  }

  // additional criteria toggle
  closeAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: false });
  };
  openAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: true });
  };


  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    const { isAdditionalCriteriaOpen } = this.state;
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Row>
            <Col lg={8} className="mb-10">
              <label>
                PA GROUP DESCRIPTION<span className="astrict">*</span>
              </label>
       
              <div className="input-element">
                <div className="bordered pointer bg-green">
                  <span onClick={(e) => { this.setState({ showPaGroupDescription: true }); }} className="inner-font">
                    {this.state.selectedGroupDescriptionObj["pa_group_description_name"]
                      ? this.state.selectedGroupDescriptionObj["pa_group_description_name"]
                      : "Select Group Description"}
                  </span>
                  <svg 
                    onClick={(e) => { this.setState({ showPaGroupDescription: true }); }} className={"hide-edit-icon"}
                    width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#1D54B4"/>
                  </svg>
                </div>
              </div>
            </Col>
            <Col lg={4}></Col>
            <Col lg={8} className="mb-10">
              <label>
                PA TYPE <span className="astrict">*</span>
              </label>
              <DropDownMap
                options={this.state.paTypes}
                valueProp="id_pa_type"
                dispProp="pa_type_name"
                onSelect={this.dropDownSelectHandlerPaType}
                disabled={this.props.configureSwitch}
                value={this.state.selectedPaType}
              />
            </Col>
            <Col lg={4}></Col>
            <Col lg={8}>
            <label>What drugs will this apply? </label>
              <Space size="large">
                <div className="marketing-material radio-group">
                  <RadioButton
                    label="RX"
                    name="pa_rx_otc"
                    onClick={() => this.setState({ pa_rx_otc: "Rx" })}
                    disabled={this.props.configureSwitch}
                    checked={this.state.pa_rx_otc === "Rx"}
                  />
                  <RadioButton
                    label="OTC"
                    name="pa_rx_otc"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() => this.setState({ pa_rx_otc: "OTC" })}
                    disabled={this.props.configureSwitch}
                    checked={this.state.pa_rx_otc == "OTC"}
                  />
                  <RadioButton
                    label="BOTH"
                    name="pa_rx_otc"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() => this.setState({ pa_rx_otc: "Both" })}
                    disabled={this.props.configureSwitch}
                    checked={this.state.pa_rx_otc == "Both"}
                  />
                </div>
              </Space>
            </Col>
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>What drugs will this apply? </label>
              <Space size="large">
                <div className="marketing-material radio-group">
                  <RadioButton
                    label="Brand"
                    name="pa_brand_generic"
                    onClick={() => this.setState({ pa_brand_generic: "Brand" })}
                    disabled={this.props.configureSwitch}
                    checked={this.state.pa_brand_generic === "Brand"}
                  />
                  <RadioButton
                    label="Generic"
                    name="pa_brand_generic"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() =>
                      this.setState({ pa_brand_generic: "Generic" })
                    }
                    disabled={this.props.configureSwitch}
                    checked={this.state.pa_brand_generic == "Generic"}
                  />
                  <RadioButton
                    label="BOTH"
                    name="pa_brand_generic"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() => this.setState({ pa_brand_generic: "Both" })}
                    disabled={this.props.configureSwitch }
                    checked={this.state.pa_brand_generic == "Both"}
                  />
                </div>
              </Space>
            </Col>
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>
                do you want to add additional criteria?{" "}
                <span className="astrict">*</span>
              </label>
              <Space size="large">
                <div className="marketing-material radio-group">
                  <RadioButton
                    label="Yes"
                    name="add-filter"
                    // checked={isAdditionalCriteriaOpen}
                    onClick={() => {
                      this.setState({ isAdditionalCriteriaOpen: true });
                      this.setState({ is_additional_criteria_defined: true });
                    }}
                    disabled={this.props.configureSwitch}
                    checked={this.state.is_additional_criteria_defined}
                  />
                  <RadioButton
                    label="No"
                    name="add-filter"
                    // checked={!isAdditionalCriteriaOpen}
                    onClick={() => {
                      this.setState({ is_additional_criteria_defined: false });
                    }}
                    disabled={this.props.configureSwitch}
                    checked={!this.state.is_additional_criteria_defined}
                  />
                </div>
                
              </Space>
            </Col>
            
          </Row>

          {isAdditionalCriteriaOpen ? (
            <AdvanceSearchContainer
              openPopup={isAdditionalCriteriaOpen}
              onClose={this.closeAdditionalCriteria}
              isAdvanceSearch={false}
            />
          ) : null}
        </div>
        
        {this.state.showPaGroupDescription && (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Group Description"}
            handleClose={() => {
              this.setState({
                showPaGroupDescription: !this.state.showPaGroupDescription,
              });
            }}
            handleAction={() => { }}
            open={this.state.showPaGroupDescription}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
             <PaGroupDescriptionManagement
              isPopUpView={true}
              selectGroupDescriptionClick={
                this.dropDownSelectHandlerGroupDescription
              }
            /> 
          </DialogPopup>
        )}

       
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaReplace);
