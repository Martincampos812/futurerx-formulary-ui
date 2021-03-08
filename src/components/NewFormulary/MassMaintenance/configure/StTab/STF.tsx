import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { TabInfo } from "../../../../../models/tab.model";
import Box from "@material-ui/core/Box";
import Button from "../../../../shared/Frx-components/button/Button";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDownMap";
import RadioButton from "../../../../shared/Frx-components/radio-button/RadioButton";
import UmCriteria from "../UmCriteria";
import "./STF.scss";
import * as constants from "../../../../../api/http-commons";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import { Row, Col, Space } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";
//import CloneFormularyPopup from "../FormularySetUp/components/CloneFormularyPopup";
import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import {
  getStSummary,
  getStGrouptDescriptions,
  getStGrouptDescription,
  getStTypes,
  getDrugLists,
  postFormularyDrugST,
  getStGrouptDescriptionVersions,
  postApplyFormularyDrugST,
  getLobFormularies,
} from "../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import GPM from "./GPM";

function mapDispatchToProps(dispatch) {
  return {
    getStSummary: (a) => dispatch(getStSummary(a)),
    getStGrouptDescriptions: (a) => dispatch(getStGrouptDescriptions(a)),
    getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
    getStTypes: (a) => dispatch(getStTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    postFormularyDrugST: (a) => dispatch(postFormularyDrugST(a)),
    getStGrouptDescriptionVersions: (a) =>
      dispatch(getStGrouptDescriptionVersions(a)),
    postApplyFormularyDrugST: (a) => dispatch(postApplyFormularyDrugST(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
    getLobFormularies: (a) => dispatch(getLobFormularies(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    client_id: state.application.clientId,
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob :state.maintenance?.selectedRow?.id_lob,
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
  };
};
class STF extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    panelGridTitle1: [
      "Value Based Insurance",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "left", "left", "left"],
    panelGridValue1: [],
    isNotesOpen: false,
    stGroupDescription: [],
    stTypes: [],
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    tierGridContainer: false,
    showStConfiguration: false,
    isSearchOpen: false,
    selectedLobFormulary: {},
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedGroupDescription: null,
    selectedStType: null,
    selectedLastestedVersion: null,
    fileType: null,
    lobFormularies: [],
    stValue: null,
    groupDescriptionProp: "",
    isAdditionalCriteriaOpen: false,
    additionalCriteriaState: null,
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
    showStGroupDescription: false,
    selectedGroupDescriptionObj: {},
    isSelectAll: false,
    st_rx_otc: "Rx",
    st_brand_generic: "Brand",
    showUmCriteria:false,
    clickedDrugId:null,
  };

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.state.selectedRowKeys = [];

    if (this.state.selectedGroupDescription === null) {
      showMessage("Group Description is required", "info");
      return;
    }

    if (this.state.selectedStType === null) {
      showMessage("ST Type is required", "info");
      return;
    }

    if (this.state.stValue === null) {
      showMessage("ST Value is required", "info");
      return;
    }

    if (
      this.state.showStConfiguration &&
      this.state.selectedLobFormulary["id_formulary"] === undefined
    ) {
      showMessage("Related Formulary is required", "info");
      return;
    }
    //this.populateGridData();
  };

  dropDownSelectHandlerLob = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedLobFormulary: tmp_value });
    this.props.updateGDHandler(this.props.formularyId, 
      {
        "selectedGroupDescription": this.state.selectedGroupDescription,
        "selectedStType":this.state.selectedStType,
        "stValue":this.state.stValue,
        "selectedLastestedVersion" : this.state.selectedLastestedVersion,
        "additionalCriteria" : this.state.additionalCriteriaState
    });
  };

  onClose = () => {

    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = () => {
    this.setState({ selectFormulary: true });
  };

  selectFormularyClick = (dataRow) => {

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

  

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  componentWillReceiveProps(nextProps) {
    //this.initialize(nextProps);
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
          "selectedStType":this.state.selectedStType,
          "stValue":this.state.stValue,
          "selectedLastestedVersion" : this.state.selectedLastestedVersion,
          "additionalCriteria" : this.state.additionalCriteriaState
      });
    }
    if (nextProps.configureSwitch) {
      this.setState({
        showStConfiguration: false,
        selectedGroupDescription: null,
        selectedStType: null,
        is_additional_criteria_defined: false,
      });
      //this.populateGridData(null, nextProps.configureSwitch);
    } else {
      this.setState({ tierGridContainer: false });
    }
  }
  dropDownSelectHandlerGroupDescription = (tmp_value, event) => {
    // let tmp_index = event.key;
    // let tmp_value = event.value;

    this.setState({ selectedGroupDescription: tmp_value });
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.id_lob;
    apiDetails["pathParams"] = "/" + tmp_value;
    this.state.showStGroupDescription = false;
    let selected = this.state.stGroupDescription.filter(
      (obj) => obj[this.state.groupDescriptionProp] == tmp_value
    )[0];
    this.setState({
      selectedGroupDescriptionObj: selected,
    });
    this.props.getStGrouptDescriptionVersions(apiDetails).then((json) => {
      if (json?.payload && json?.payload?.data?.length > 0) {
        let data = json.payload.data;
        let ftype = "";
        switch (this.props.id_lob) {
          case 1:
            ftype = data[0].file_type;
            break;
          case 2:
              ftype = "MCD";
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
          if (element.id_st_group_description > latestVersionId) {
            latestVersionId = element.id_st_group_description;
          }
        });
        let tmp_additionalCriteria = false;
        let tmp_selectedStType = null;
        this.props
          .getStGrouptDescription({
            lob_type: this.props.id_lob,
            pathParams: "/" + latestVersionId,
          })
          .then((json) => {
            this.props.setAdditionalCriteria([]);
            if (json?.payload && json?.payload?.code === "200") {
              if (
                json.payload.data["um_criteria"] != null &&
                json.payload.data["um_criteria"].length > 0
              ) {
                let payload: any = {};
                payload.additionalCriteriaBody = json.payload.data["um_criteria"];
                this.props.setAdditionalCriteria(payload);
                tmp_additionalCriteria = true;
              }
              tmp_selectedStType=json?.payload?.data?.id_st_type;
            }
            this.setState({
              is_additional_criteria_defined: tmp_additionalCriteria,
              selectedStType: tmp_selectedStType,
            });
            this.props.updateGDHandler(this.props.formularyId, 
              {
                "selectedGroupDescription": this.state.selectedGroupDescription,
                "selectedStType":this.state.selectedStType,
                "stValue":this.state.stValue,
                "selectedLastestedVersion" : latestVersionId,
                "additionalCriteria" : this.state.additionalCriteriaState
            });
          });
        this.setState({
          selectedLastestedVersion: latestVersionId,
          fileType: ftype,
        });
        
        this.setState({
          tierGridContainer: false,
          gridData: [],
          drugGridData: [],
        });
      }
    });
  };

  dropDownSelectHandlerStType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedStType: tmp_value });
    this.props.updateGDHandler(this.props.formularyId, 
      {
        "selectedGroupDescription": this.state.selectedGroupDescription,
        "selectedStType":this.state.selectedStType,
        "stValue":this.state.stValue,
        "selectedLastestedVersion" : this.state.selectedLastestedVersion,
        "additionalCriteria" : this.state.additionalCriteriaState
    });
    this.setState({
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  st_configurationChange = (event, value) => {
    let tmp_index = event.target.key;
    let tmp_value = event.target.value;

    if (tmp_value == "true") {
      this.setState({ showStConfiguration: true });
    } else {
      this.setState({ showStConfiguration: false });
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
    this.props.updateGDHandler(this.props.formularyId, 
      {
        "selectedGroupDescription": this.state.selectedGroupDescription,
        "selectedStType":this.state.selectedStType,
        "stValue":this.state.stValue,
        "selectedLastestedVersion" : this.state.selectedLastestedVersion,
        "additionalCriteria" : this.state.additionalCriteriaState
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
    this.setState({ tabs, activeTabIndex });
  };
  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  
  componentDidMount() {
    switch (this.props.id_lob) {
      case 1:
        this.setState({
          groupDescriptionProp: "id_st_group_description",
        });
        break;
      default:
        this.setState({
          groupDescriptionProp: "id_st_group_description",
        });
        break;
     
    }
    let apiDetails_1 = {};
    apiDetails_1["lob_type"] = this.props.id_lob;
    apiDetails_1["pathParams"] = "/" + this.props?.client_id;
    this.props.getStGrouptDescriptions(apiDetails_1).then((json) => {

      let result = json?.payload?.data.filter(
        (obj) => !obj.is_archived && obj.is_setup_complete
      );
      this.setState({
        stGroupDescription: result,
      });
    });

    this.props.getStTypes(this.props.id_lob).then((json) => {
      this.setState({
        stTypes: json?.payload?.data,
      });
    });
    let apiDetails = {
      formulary_type_id: this.props?.formulary_type_id,
      formulary_lob_id: this.props?.id_lob,
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
      <div className="stf-root">
        <div className="modify-wrapper  white-bg">
          <div className="settings-form">
            <Grid container>
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    ST GROUP DESCRIPTION<span className="astrict">*</span>
                  </label>

                  <div className="input-element">
                    <div className="bordered pointer bg-green">
                      <span
                        onClick={(e) => {
                          this.setState({ showStGroupDescription: true });
                        }}
                        className="inner-font"
                      >
                        {this.state.selectedGroupDescriptionObj[
                          "st_group_description_name"
                        ]
                          ? this.state.selectedGroupDescriptionObj[
                          "st_group_description_name"
                          ]
                          : "Select Group Description"}
                      </span>
                      <svg 
                        onClick={(e) => {
                          this.setState({ showStGroupDescription: true });
                        }}
                        className={"hide-edit-icon"}
                        width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#1D54B4"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label>
                    What drugs will this apply?{" "}
                  </label>
                  <Space size="large">
                    <div className="marketing-material radio-group">
                        <RadioButton
                        label="RX"
                        name="st_rx_otc"
                        onClick={() => this.setState({ st_rx_otc: "Rx" })}
                        disabled={this.props.configureSwitch}
                        checked={this.state.st_rx_otc ==="Rx"}
                      />
                      <RadioButton
                        label="OTC"
                        name="st_rx_otc"
                        // checked={!isAdditionalCriteriaOpen}
                        onClick={() => this.setState({ st_rx_otc: "OTC" })}
                        disabled={this.props.configureSwitch}
                        checked={this.state.st_rx_otc =="OTC"}
                      />
                      <RadioButton
                        label="BOTH"
                        name="st_rx_otc"
                        // checked={!isAdditionalCriteriaOpen}
                        onClick={() => this.setState({ st_rx_otc: "Both" })}
                        disabled={this.props.configureSwitch}
                        checked={this.state.st_rx_otc=="Both"}
                      />
                    </div>
                  </Space>
                </div>
                
                  <div className="group">
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
                            this.setState({
                              is_additional_criteria_defined: true,
                            });
                          }}
                          disabled={this.props.editable}
                        />
                        <RadioButton
                          label="No"
                          name="add-filter"
                          // checked={!isAdditionalCriteriaOpen}
                          onClick={() => {
                            this.setState({
                              is_additional_criteria_defined: false,
                            });
                          }}
                          disabled={this.props.editable}
                        />
                      </div>
                    </Space>
                  </div>

                  {isAdditionalCriteriaOpen ? (
                    <AdvanceSearchContainer
                      openPopup={isAdditionalCriteriaOpen}
                      onClose={this.closeAdditionalCriteria}
                      isAdvanceSearch={false}
                    />
                  ) : null}
              </Grid>
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    ST Type <span className="astrict">*</span>
                  </label>
                  <DropDown
                    options={this.state.stTypes}
                    valueProp="id_st_type"
                    dispProp="st_type_name"
                    onSelect={this.dropDownSelectHandlerStType}
                    disabled={this.props.configureSwitch}
                    value={this.state.selectedStType}
                  />
                </div>
                <div className="group">
                  <label>
                    What drugs will this apply?{" "}
                  </label>
                  <Space size="large">
                    <div className="marketing-material radio-group">
                        <RadioButton
                        label="RX"
                        name="st_brand_generic"
                        onClick={() => this.setState({ st_brand_generic: "Brand" })}
                        disabled={this.props.configureSwitch}
                        checked={this.state.st_brand_generic ==="Brand"}
                      />
                      <RadioButton
                        label="OTC"
                        name="st_brand_generic"
                        // checked={!isAdditionalCriteriaOpen}
                        onClick={() => this.setState({ st_brand_generic: "Generic" })}
                        disabled={this.props.configureSwitch}
                        checked={this.state.st_brand_generic =="Generic"}
                      />
                      <RadioButton
                        label="BOTH"
                        name="st_brand_generic"
                        // checked={!isAdditionalCriteriaOpen}
                        onClick={() => this.setState({ st_brand_generic: "Both" })}
                        disabled={this.props.configureSwitch}
                        checked={this.state.st_brand_generic=="Both"}
                      />
                    </div>
                  </Space>
                </div>
                </Grid>

              <Grid item xs={4}>
                <div className="group">
                  <label>
                    ST Value <span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    name="stValue"
                    onChange={this.handleChange}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          
        </div>
        
        {this.state.showStGroupDescription && (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Group Description"}
            handleClose={() => {
              this.setState({
                showStGroupDescription: !this.state.showStGroupDescription,
              });
            }}
            handleAction={() => { }}
            open={this.state.showStGroupDescription}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <GPM
              isPopUpView={true}
              selectGroupDescriptionClick={
                this.dropDownSelectHandlerGroupDescription
              }
            />
          </DialogPopup>
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
            
            <UmCriteria
              selectedDrugId={this.state.clickedDrugId}
              
            />
          </DialogPopup>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(STF);
