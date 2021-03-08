import React, { Component } from "react";
import { connect } from "react-redux";
import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import DownloadIcon from "../../../../assets/icons/DownloadIcon.svg";
import EditIcon from "../../../../assets/icons/EditIcon.svg";
import {
  getColumns,
  getData,
  getPACommercialData,
  getDrugsList,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";
import {
  formatDate,
  formatDateAndTime,
} from "../../../../utils/formatters/date-format";
import * as constants from "../../../../api/http-commons";
import {
  postMaintenaceDrugPA,
} from "../../../../redux/slices/formulary/pa/paActionCreation";
import {
  postApplyFormularyDrugST,
} from "../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../shared/Frx-components/button/Button";
import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import { TabInfo } from "../../../../models/tab.model";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input } from "antd";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
import formularyDetailsContext from "../../FormularyDetailsContext";
import {
  getFormularyGridData,
  getDrugsPAGridData,
} from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";
import DrugGrid from "./DrugGrid";
import {
  getFormularyGridColumns,
  getDrugsPAGridColumns,
  getTPACommercialGridData,
  getTPAtGridData,
} from "../../../../mocks/formulary-grid/FormularyGridColumn";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";
import PanelHeader from "../../../shared/Frx-components/panel-header/PanelHeader";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import PaReplace from "./PaTab/PaReplace";
import PaRemove from "./PaTab/PaRemove";
import FrxDrugGrid from "../../../shared/FrxGrid/FrxDrugGrid";
import getLobCode from "../../Utils/LobUtils";
import showMessage from "../../Utils/Toast";
import STF from "./StTab/STF";
import StepTherpyRemove from "./StTab/StepTherpyRemove";

export interface FormularyGridDS {
  key: string;
  formularyName: string;
  formularyId: string;
  formularyVersion: number;
  contractYeat: string;
  formularyType: string;
  effectiveDate: string;
}
interface MassMaintenancePAState {
  isGroupDescPopupEnabled: boolean;
  gridData: FormularyGridDS[];
  isSearchOpen: boolean;
  isFormularyGridShown: boolean;
  columns: any;
  data: any;
  pinData: {
    value: boolean;
  };
  scroll: {
    x: number;
    y: number;
  };
  miniTabs: TabInfo[];
  activeMiniTabIndex: number;
  drugsList: any[];
  selectedGDs: {};
  drugGridData: any;
  selectedGDsRemove: any[],
}
class MassMaintenancePA extends Component<any, MassMaintenancePAState> {
  state = {
    isGroupDescPopupEnabled: false,
    isSearchOpen: false,
    gridData: getData(),
    gridColumns: getColumns(),
    drugsList: getDrugsList(),
    isFormularyGridShown: false,
    columns: null,
    data: [],
    pinData: {
      value: false,
    },
    scroll: {
      x: 960,
      y: 450,
    },
    miniTabs: [
      {
        id: 1,
        text: "Replace",
        value: "replace"
      },
      {
        id: 2,
        text: "Append",
        value: "append"
      },
      {
        id: 3,
        text: "Remove",
        value: "remove"
      },
    ],
    activeMiniTabIndex: 0,
    selectedGDs: {},
    selectedDrugs: Array(),
    drugGridData: {},
    selectedGDsRemove: Array(),
  };
  static contextType = formularyDetailsContext;
  addNew = () => {

  };

  setGDForDrug = (key, value) => {
    debugger;
    this.state.selectedGDs[key] = value;
  }

  setGDForRemove = (value) => {
    debugger;
    this.state.selectedGDsRemove = value;
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
  };
  rowSelectionChange = (r) => {
    console.log(r);
  };

  getPAAssignmentGridData() {
    if (this.context.selectedLOBType == "medicare") {
      return getTPAtGridData();
    }
    else if (this.context.selectedLOBType == "commercial") {
      return getTPACommercialGridData();
    }
    return getTPACommercialGridData();
  }

  getPAGridData() {
    if (this.context.selectedLOBType == "medicare") {
      return getData();
    }
    else if (this.context.selectedLOBType == "commercial") {
      return getPACommercialData();
    }
    return getPACommercialData();
  }

  componentDidMount() {
    debugger;
    this.setState({
      data: this.getPAAssignmentGridData(),
      gridData: this.getPAGridData(),
    });
  }

  onClickMiniTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ miniTabs: tabs, activeMiniTabIndex: activeTabIndex });
  };

  handleSave = () => {
    
    if (this.state.miniTabs[this.state.activeMiniTabIndex].value == "remove") {
      if (this.state.selectedGDsRemove.length==0){
        showMessage("Select the Group Description","info");
        return;
      }
    }else{
      let isError=false;  
      if (Object.keys(this.state.selectedGDs).length>0){    
      let cur_gd = Object.keys(this.state.selectedGDs).forEach(element => {
        let tmp_gd = this.state.selectedGDs[element];
        if (tmp_gd.selectedStType ==null){
          showMessage("Select ST Type","info");
          isError=true;
        }
        if (tmp_gd.selectedLastestedVersion==null){
          showMessage("Select the Group Description","info");
          isError=true;
        }
      });
    }else{
      showMessage("Select the Group description for at least one formulary." , "info");
      isError=true;
    }
      if (isError ){
        return;
      }
      
    }
    if (this.state.drugGridData["selectedDrugs"] && this.state.drugGridData["selectedDrugs"].length > 0) {
      let apiDetails = {};
      // apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails["lob_type"] = this.props.id_lob;


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

      apiDetails["messageBody"]["is_select_all"] = this.state.drugGridData["isSelectAll"];



      apiDetails["messageBody"]["filter"] = this.state.drugGridData["filter"];
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.drugGridData["selectedDrugs"];


      apiDetails["messageBody"]["search_key"] = "";
      const that = this;
      this.props.maintenanceFormularies.list.map((curFormulary) => {

        

        apiDetails["pathParams"] =
          curFormulary.id_formulary +
          "/" +
          getLobCode(that.props.id_lob) +
          "/" +
          that.state.miniTabs[that.state.activeMiniTabIndex].value;
        apiDetails["keyVals"] = [
          { key: constants.KEY_ENTITY_ID, value: curFormulary.id_formulary },
        ];
        
        
        if (that.state.miniTabs[that.state.activeMiniTabIndex].value == "remove") {
          apiDetails["messageBody"]["selected_criteria_ids"] = this.state.selectedGDsRemove;
        }else{
          let cur_gd = that.state.selectedGDs[curFormulary.id_formulary];
          if (cur_gd != null) {
            apiDetails["messageBody"]["base_st_group_description_id"] = cur_gd["selectedGroupDescription"];
            apiDetails["messageBody"]["id_st_group_description"] = cur_gd["selectedLastestedVersion"];
            apiDetails["messageBody"]["id_st_type"] = Number(cur_gd["selectedStType"]);
            apiDetails["messageBody"]["st_value"] = Number(cur_gd["stValue"]);
            if (
              cur_gd["additionalCriteria"] != null &&
              cur_gd["additionalCriteria"]
            ) {
              apiDetails["messageBody"]["is_custom_additional_criteria"] = true;
              apiDetails["messageBody"][
                "um_criteria"
              ] = cur_gd["additionalCriteria"]
            } else {
              apiDetails["messageBody"]["is_custom_additional_criteria"] = false;
              apiDetails["messageBody"]["um_criteria"] = [];
            }
          }
        }
        that.props.postApplyFormularyDrugST(apiDetails)
          .then((json) => {
            if (json.payload && json.payload.code === "200") {
              showMessage("Success", "success");
              
            } else {
              showMessage("Failure", "error");
            }
          });
      });

    }else{
      showMessage("Select the drugs","info");
    }
  };

  renderTabContent = () => {
    const activeTabIndex = this.state.activeMiniTabIndex;
    switch (activeTabIndex) {
      case 0:
        return <>{this.props.maintenanceFormularies.list.map((drug) => (
          <div className="mm-configure-pa-auth-grid-item">
            <div>
              <span className="font-style">{drug.formulary_name}</span>
            </div>
            <STF tab_type="replace" formularyId={drug.id_formulary} updateGDHandler={this.setGDForDrug} />
          </div>
        ))}</>;
        break;
      case 1:
            return <>{this.props.maintenanceFormularies.list.map((drug) => (
              <div className="mm-configure-pa-auth-grid-item">
                <div>
                  <span className="font-style">{drug.formulary_name}</span>
                </div>
                <STF tab_type="append" formularyId={drug.id_formulary} updateGDHandler={this.setGDForDrug} />
              </div>
            ))}</>;

        break;
      case 2:
        return <>{this.props.maintenanceFormularies.list.map((drug) => (
          <div className="mm-configure-pa-auth-grid-item">
            <div>
              <span className="font-style">{drug.formulary_name}</span>
            </div>
            <StepTherpyRemove tab_type="replace" formularyId={drug.id_formulary} updateGDHandler={this.setGDForRemove} />
          </div>
        ))}</>;

        break;
    }
  };

  openGroupDescription = (event) => {
    event.stopPropagation();
    this.setState({
      isGroupDescPopupEnabled: !this.state.isGroupDescPopupEnabled,
    });
  };

  closeGroupDescription = () => {
    this.setState({
      isGroupDescPopupEnabled: !this.state.isGroupDescPopupEnabled,
    });
  };
  handleSearch = (searchObject: any) => {

  };

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  }
  render() {
    const {
      gridData,
      gridColumns,
      drugsList,
      isSearchOpen,
      miniTabs,
      activeMiniTabIndex,
      isGroupDescPopupEnabled,
    } = this.state;


    return (
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
              <SimpleGrid columns={gridColumns} data={this.props.maintenanceFormularies.list} />
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
        <div className="bordered mm-configure details-top">


          {isSearchOpen ? (
            <AdvancedSearch
              category="Grievances"
              openPopup={isSearchOpen}
              onClose={this.advanceSearchClosekHandler}
            />
          ) : null}
        </div>
        <div className="bordered mm-configure-pa-auth details-top">
          <div className="header">PRIOR AUTHORIZATION</div>
          <div className="modify-panel">
            <div className="icon">
              <span>P</span>
            </div>
            <div className="switch-box">
              <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
            </div>
            <div className="mini-tabs">
              <FrxMiniTabs
                tabList={miniTabs}
                activeTabIndex={activeMiniTabIndex}
                onClickTab={this.onClickMiniTab}
              />
            </div>
          </div>

          <div className="inner-container mm-configure-pa-auth-grid p-20">
            <div className="pa-tab-content">
              {this.renderTabContent()}
            </div>

            <div className="button-container-root">
              <span className="white-bg-btn">
                <Button label="Save" onClick={this.handleSave} />
              </span>
              <Button label="Save & Continue" onClick={this.handleSave} />
            </div>
          </div>
        </div>
        {isGroupDescPopupEnabled ? (
          <DialogPopup
            showCloseIcon={false}
            positiveActionText=""
            negativeActionText=""
            title="group description"
            children="Group Description Screen #16"
            handleClose={this.closeGroupDescription}
            handleAction={() => { }}
            showActions={false}
            height="80%"
            width="90%"
            open={isGroupDescPopupEnabled}
          />
        ) : null}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    postApplyFormularyDrugST: (a) => dispatch(postApplyFormularyDrugST(a)),
  };
}


const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenancePA);
