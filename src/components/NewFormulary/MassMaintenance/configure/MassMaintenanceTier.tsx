import React, { Component } from "react";
import { connect } from "react-redux";
import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import {
  getColumns,
  getData,
  getCommercialData,
  getDrugsList,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";
import * as tierConstants from "../../../../api/http-tier";
import {
  postMaintenaceDrugTier,
  getMaintenanceFormularyTiers,
  postTierApplyInfo,
  postAddMaintenanceDrugs,
} from "../../../../redux/slices/formulary/tier/tierActionCreation";
import * as constants from "../../../../api/http-commons";
import { TabInfo } from "../../../../models/tab.model";
import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import DropDownMap from "../../../shared/Frx-components/dropdown/DropDownMap";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input, Checkbox } from "antd";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
import SimpleSearch from "../../../communication/Search/SimpleSearch/SimpleSearch";
import formularyDetailsContext from "../../FormularyDetailsContext";
import {
  getFormularyGridData,
  getTierAssignmentGridData,
  getTierAssignmentCommercialGridData,
} from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";

import {
  getFormularyGridColumns,
  getDrugsPAGridColumns,
  getTierAssignmentGridColumns,
} from "../../../../mocks/formulary-grid/FormularyGridColumn";
import RoundedSimpleSearch from "../../../communication/Search/SimpleSearch/RoundedSimpleSearch";
import { drugData } from "../../../../mocks/BestPriceDrugMock";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import PanelHeader from "../../../shared/Frx-components/panel-header/PanelHeader";
import {
  formatDate,
  formatDateAndTime,
} from "../../../../utils/formatters/date-format";
import {
  fetchCompleteTabData,
  setSelectedRow,
  fetchTierAssignmentData,
  getMaintenanceFormulariesInfo,
} from "../../../../redux/slices/maintenance/maintenanceSlice";
import { gridSettingsSlice } from "../../../../redux/slices/formulary/gridHandler/gridSettingsSlice";
import { Column } from "../../../../models/grid.model";
import * as _ from "lodash";
import {
  setFormulary,
  setLocation,
  setLocationHome,
  clearApplication,
  setModeLob,
} from "../../../../redux/slices/formulary/application/applicationSlice";
import DrugGrid from "./DrugGrid";
import { postMaintenaceDrugPA } from "../../../../redux/slices/formulary/pa/paActionCreation";
import getLobCode from "../../Utils/LobUtils";
import showMessage from "../../Utils/Toast";

class MassMaintenanceTier extends Component<any, any> {
  state = {
    isSearchOpen: false,
    tierData: getData(),
    gridColumns: getColumns(),
    drugsList: getDrugsList(),
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    miniTabs: [
      {
        id: 1,
        text: "Replace",
        value: "replace",
      },
      {
        id: 2,
        text: "Append",
        value: "append",
      },
      {
        id: 3,
        text: "Remove",
        value: "remove",
      },
    ],
    activeMiniTabIndex: 0,
    isFormularyGridShown: false,
    columns: null,
    drugGridData: {},
    appliedFormularyDrugs: Array(),
    selectedTiers: [] as any[],
  };

  constructor(props) {
    super(props);
    this.saveDrugs = this.saveDrugs.bind(this);
  }
  static contextType = formularyDetailsContext;
  addNew = () => { };
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
  rowSelectionChange = (r) => {
    console.log(r);
  };

  getTierAssignmentGridData() {
    if (this.context.selectedLOBType == "medicare") {
      return getTierAssignmentGridData();
    } else if (this.context.selectedLOBType == "commercial") {
      return getTierAssignmentCommercialGridData();
    }
  }

  getTierGridData() {
    if (this.context.selectedLOBType == "medicare") {
      return getData();
    } else if (this.context.selectedLOBType == "commercial") {
      return getCommercialData();
    }
  }
  updateDrugGridData = (gridData) => {
    debugger;
    this.state.drugGridData = gridData;
  };
  componentDidMount() {
    this.props.fetchCompleteTabData(this.listPayload);
    //this.props.fetchTierAssignmentData(this.listPayload);
    this.props.getMaintenanceFormulariesInfo(this.listPayload);
    let api_details = {};
    api_details["pathParams"] = this.props.rowId;
    api_details["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props.rowId },
    ];
    this.props.getMaintenanceFormularyTiers(api_details);
    // this.setState({
    //   data: this.getTierAssignmentGridData(),
    //   gridData: this.getTierGridData(),
    // });
  }

  listPayload: any = {
    id_maintenance_formulary: this.props.rowId,
    data_source: "COMMDF",
    index: 0,
    limit: 10,
    filter: [],
    id_lob: this.props.lob_id,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["insert_datetime"],
    sort_order: ["desc"],
  };

  loadGridData = (payload) => {
    payload["id_maintenance_formulary"] = this.props.rowId;
    this.props.fetchTierAssignmentData(payload);
  };

  componentWillReceiveProps(newProps) {
    if (newProps.lob_id !== this.props.lob_id) {
      this.props.fetchLandingData(this.listPayload);
    }
  }

  handleSearch = (searchObject: any) => { };

  handleSave = () => {

    if (this.state.miniTabs[this.state.activeMiniTabIndex].value == "remove") {

    } else {
      let isError = false;
      if (Object.keys(this.state.selectedTiers).length > 0) {
        let cur_gd = Object.keys(this.state.selectedTiers).forEach(element => {
          let tmp_gd = this.state.selectedTiers[element];
          if (tmp_gd.selected_tier == null) {
            showMessage("Select the Tier", "info");
            isError = true;
          }
        });
      } else {
        showMessage("Select the formulary tier.", "info");
        isError = true;
      }
      if (isError) {
        return;
      }

    }
    if (this.state.appliedFormularyDrugs && this.state.appliedFormularyDrugs.length > 0) {
      let apiDetails = {};
      // apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails["lob_type"] = this.props.formulary_lob_id;

      apiDetails["messageBody"] = {
        covered: {},
        filter: [],
        is_select_all: false,
        not_covered: {},
        search_key: "",
        drug_list: "",
        prev_formulary: "",
        keep_existing_tier: "",
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

        let lobCode = "";
        if (that.props.rowData.id_lob != 1) {
          lobCode = getLobCode(that.props.rowData.id_lob, true)
        } else {
          lobCode = this.state.drugGridData["fileType"];
        }
        //lobCode=  this.state.drugGridData["fileType"];
        apiDetails["pathParams"] =
          curFormulary.id_formulary +
          "/" + lobCode
          +
          "/" +
          that.state.miniTabs[that.state.activeMiniTabIndex].value;
        apiDetails["keyVals"] = [
          { key: constants.KEY_ENTITY_ID, value: curFormulary.id_formulary },
        ];
        apiDetails["apiPart"] = tierConstants.APPLY_TIER;
        apiDetails["messageBody"]["version_type"] = "M";

        if (that.state.miniTabs[that.state.activeMiniTabIndex].value == "remove") {
          //apiDetails["messageBody"]["selected_criteria_ids"] = this.state.selectedGDsRemove;
        } else {
          let cur_gd = that.state.selectedTiers.filter((tmp) =>
            tmp.id_base_formulary == curFormulary.id_base_formulary)[0];
          if (cur_gd != null) {
            apiDetails["messageBody"]["id_tier"] = Number(cur_gd["selected_tier_id"]);
            apiDetails["messageBody"]["keep_existing_tier"] = cur_gd["keep_existing_tier"];
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

        that.props.postTierApplyInfo(apiDetails)
          .then((json) => {
            if (json.payload && json.payload.code === "200") {
              showMessage("Success", "success");

            } else {
              showMessage("Failure", "error");
            }
          });
      });

    } else {
      showMessage("Select the drugs", "info");
    }
  };

  applySortHandler = (key, order, sortedInfo) => {
    this.setState(
      {
        gridSingleSortInfo: sortedInfo,
        isGridSingleSorted: true,
        isGridMultiSorted: false,
        gridMultiSortedInfo: [],
      },
      () => {
        // this.props.applySortHandler(key, order);
        this.onApplySortHandler(key, order);
      }
    );
    // this.props.fetchFormularies(this.listPayload);
  };

  onApplySortHandler = (key, order) => {
    const listPayload = { ...this.listPayload };
    listPayload.sort_by = [key];
    const sortorder = order && order === "ascend" ? "asc" : "desc";
    listPayload.sort_order = [sortorder];
    this.listPayload = listPayload;
    this.props.fetchCompleteTabData(this.listPayload);
  };

  tierChange = (data, index, drug, maintenanceFormularyTiers) => {
    let selectedTiers: any[] = this.state.selectedTiers;

    if (selectedTiers.length === 0) {
      for (let i = 0; i < maintenanceFormularyTiers.length; i++) {
        let obj = {};
        obj["id_base_formulary"] = maintenanceFormularyTiers[i].id_base_formulary;
        obj["id_formulary"] = maintenanceFormularyTiers[i].id_formulary;
        obj["selected_tier"] = "";
        obj["selected_tier_id"] = "";
        obj["keep_existing_tier"] = false;
        selectedTiers.push(obj);
      }
    }
    debugger;
    if (selectedTiers.length > 0 && selectedTiers[index].id_base_formulary === drug.id_base_formulary) {
      let selectedObj = drug.tier_info[index]?.tier_label;
      selectedTiers[index].selected_tier = selectedObj;
      selectedTiers[index].selected_tier_id = drug.tier_info[index]?.id_tier;
    }
    this.setState({ selectedTiers })
  };
  keepCheckBox = (data, index, drug, maintenanceFormularyTiers) => {
    let selectedTiers: any[] = this.state.selectedTiers;
    debugger;
    if (selectedTiers.length === 0) {
      for (let i = 0; i < maintenanceFormularyTiers.length; i++) {
        let obj = {};
        obj["id_base_formulary"] = maintenanceFormularyTiers[i].id_base_formulary;
        obj["id_formulary"] = maintenanceFormularyTiers[i].id_formulary;
        obj["selected_tier"] = "";
        obj["selected_tier_id"] = "";
        obj["keep_existing_tier"] = false;
        selectedTiers.push(obj);
      }
    }
    debugger;
    if (selectedTiers.length > 0 && selectedTiers[index].id_base_formulary === drug.id_base_formulary) {
      selectedTiers[index].keep_existing_tier = data.target.checked;
    }
    this.setState({ selectedTiers })
  };
  async saveDrugs(data) {
    let resp;
    let fileType = this.state.drugGridData["fileTypeName"];
    if (fileType != "Full Formulary") {
      resp = await this.props.postMaintenaceDrugTier(data);
    } else {
      resp = await this.props.postMaintenaceDrugPA(data);
    }
    return resp;
  }
  saveFormularyDrugs = () => {
    debugger;
    if (this.state.drugGridData["selectedDrugs"] && this.state.drugGridData["selectedDrugs"].length > 0) {


      let apiDetails = {};

      apiDetails["messageBody"] = {
        "is_advance_search": false,
        "is_select_all": false,
        "not_covered": {},
        "covered": {},
        "filter": [],
        "search_key": ""
      }

      apiDetails["messageBody"]["is_advance_search"] = true;
      apiDetails["messageBody"]["is_select_all"] = this.state.drugGridData["isSelectAll"];
      apiDetails["messageBody"]["search_key"] = this.state.drugGridData["searchKey"];
      apiDetails["messageBody"]["filter"] = this.state.drugGridData["filter"];
      apiDetails["messageBody"]["covered"] = { "drug_label_names": this.state.drugGridData["selectedDrugsLabels"] };
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.drugGridData["selectedDrugs"];

      let lobCode = this.state.drugGridData["fileType"];
      // if (this.props.rowData.id_lob!=1){
      //   lobCode = getLobCode(this.props.rowData.id_lob)
      // }else{
      //   lobCode = 
      // }

      apiDetails["pathParams"] = this.props.rowId + "/" + lobCode + "/replace";
      apiDetails["keyVals"] = [
        { key: constants.KEY_ENTITY_ID, value: this.props.rowId },
        { key: "index", value: 0 },
        { key: "limit", value: 20 },
      ];

      if (this.state.drugGridData["fileTypeName"] == "Full Formulary") {
        this.props.postMaintenaceDrugPA(apiDetails).then((json) => {
          if (json?.payload && json?.payload?.code =="200") {
            showMessage("Drugs selected for formulary.", "info");
            debugger;
            this.setState({ appliedFormularyDrugs: json?.payload?.result })
          } else {
            showMessage("Failure", "error");
          }

        });
      } else {
        this.props.postAddMaintenanceDrugs(apiDetails).then((resp) => {
          if (resp?.payload && resp?.payload?.code =="200") {
            this.props.postMaintenaceDrugPA(apiDetails).then((json) => {
              if (json?.payload && json?.payload?.result?.length > 0) {
                showMessage("Drugs selected for formulary.", "info");
                debugger;
                this.setState({ appliedFormularyDrugs: json?.payload?.result })
              } else {
                showMessage("Failure", "error");
              }
            });
          } else {
            showMessage("Failure", "error");
          }
        });
      }

      
    }else {
        showMessage("Please select the drugs", "info");
        return;
      }


    }
    render() {
      const {
        tierData,
        gridColumns,
        miniTabs,
        activeMiniTabIndex,
        isSearchOpen,
        drugsList,
      } = this.state;
      const dataTierAssignment = this.props.maintenanceTierAssignGrid.landing;

      let GridElement = this.props.maintenanceGrid.isLoading;
      let tiersData = Object.entries(this.props.maintenanceFormularyTiers).length >
        0 &&
        this.props.maintenanceFormularyTiers?.map((drug, index) => (
          <>
            {(this.state.miniTabs[this.state.activeMiniTabIndex].value == "remove") ?
              <div className=" m-b-5">
                <div className="header">{drug.formulary_name}</div>
                <div className="inner-container drugs-flex-container">
                  <div className="p-b-15 font-style ">
                    Selected drugs will be removed from Tier
            </div>
                </div>
              </div>
              :
              <>
                <div className="bordered m-b-5">
                  <div className="header">{drug.formulary_name}</div>
                  <div className="inner-container drugs-flex-container">

                    <div className="p-b-15 font-style width-65">
                      New Tier
            </div>
                    <div className="tier-definition-wrapper">
                      <div className="mini-flex-container">
                        <Checkbox className="mm-tier-checkbox" onChange={(val) => this.keepCheckBox(val, index, drug, this.props.maintenanceFormularyTiers)} />
                        <span className="font-style">
                          Keep current tier?
              </span>
                      </div>
                      <SimpleGrid
                        columns={[
                          {
                            title: "TIER NUMBER",
                            dataIndex: "tierNumber",
                            key: "tierNumber",
                            className: "table-head-color",
                            render: (tierNumber) => (
                              <DropDownMap
                                placeholder={tierNumber}
                                options={drug.tier_info}
                                valueProp={"id_tier"}
                                dispProp={"id_tier"}
                                onChange={(data) =>
                                  this.tierChange(data, index, drug, this.props.maintenanceFormularyTiers)
                                }
                              />
                            ),
                          },
                          {
                            title: "TIER DESCRIPTION",
                            dataIndex: "selected_tier",
                            key: "selected_tier",
                            className: "table-head-color large-width",
                          },
                        ]}
                        data={[this.state.selectedTiers[index]]}
                      />
                    </div>

                  </div>
                </div>
              </>}
          </>
        ));

      return (
        <div className="mm-tier-root">
          <div className="bordered details-top">
            <div>
              <PanelHeader
                title="SELECTED FORMULARIES FOR TIER ASSIGNMENT"
                tooltip="SELECTED FORMULARIES FOR TIER ASSIGNMENT"
              />
            </div>
            <div className="inner-container p-20">
              <div>
                <SimpleGrid
                  columns={gridColumns}
                  data={this.props.maintenanceFormularies?.list}
                />
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


          <div className="bordered mm-configure details-top">


            {GridElement ? (
              <FrxLoader />
            ) : (
                <>
                  <DrugGrid
                    getDrugs={this.saveDrugs}
                    columns={getDrugsPAGridColumns()}
                    updateDrugGridData={this.updateDrugGridData}
                    tab="tier"
                  />
                  <div className="button-container-right">
                    <Button label="Apply" onClick={this.saveFormularyDrugs} />
                  </div>
                </>
              )}
            {isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
              />
            ) : null}
          </div>
          <div className="bordered white-bg details-top">
            <div className="header">MANUAL MAINTENANCE SETTINGS</div>

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
          </div>
          <div className="bordered sections-root details-top">
            <div className="header">Tier Definition</div>
            <div className="inner-container">
              <div className="sections-root-grid-container">
                <div className="bordered drugs-list-container">
                  <div className="header">selected drugs</div>
                  <div className="inner-container drugs-list scroll-bar">
                    <RoundedSimpleSearch
                      onSearch={this.handleSearch}
                      placeholder="Search..."
                    />
                    <div className="scroll-bar selected-drugs-fiter">
                      {this.state.appliedFormularyDrugs.length > 0 && this.state.appliedFormularyDrugs?.map((el) => (
                        <div className="list-items">{el.drug_label_name}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="drug-tiers-card p-7">
                  {tiersData}
                </div>
              </div>
            </div>
            <div className="button-container-right">
              <span className="white-bg-btn">
                <Button label="Cancel" onClick={() => { }} />
              </span>
              <Button label="Save" onClick={this.handleSave} />
            </div>
          </div>
          <div className="button-container-right-root">
            <span className="white-bg-btn">
              <Button
                label="Assign Additional Drugs to Tier"
                onClick={() => { }}
              />
            </span>
            <Button label="Continue to Drug Edits" onClick={() => { }} />
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      maintenanceGrid: {
        count: state.maintenance.selectedFormularies.count,
        landing: state.maintenance.selectedFormularies.list,
        isLoading: state.maintenance.isLoading,
        grid_settings: state.gridSettings,
        refernce_id:
          state.maintenance.selectedFormularies.list.id_formulary_maintenance,
      },
      rowId: state.maintenance.selectedRow.id_maintenance_formulary,
      rowData: state.maintenance.selectedRow,
      maintenanceTierAssignGrid: {
        count: state.maintenance.tierAssignment.count,
        landing: state.maintenance.tierAssignment.list,
        isLoading: state.maintenance.isLoading,
        grid_settings: state.gridSettings,
      },
      maintenanceFormularies: state.maintenance.maintenanceFormularies,
      maintenanceFormularyTiers: state.tierSliceReducer.maintenanceFormularyTiers,

    };
  };

function mapDispatchToProps(dispatch) {
  return {
    fetchCompleteTabData: (a) => dispatch(fetchCompleteTabData(a)),
    fetchTierAssignmentData: (a) => dispatch(fetchTierAssignmentData(a)),
    setHiddenColumn: (hiddenColumns) =>
      dispatch(gridSettingsSlice.actions.setHiddenColum(hiddenColumns)),
    clearHiddenColumns: () =>
      dispatch(gridSettingsSlice.actions.clearHiddenColumns(true)),
    setModeLob: (a) => dispatch(setModeLob(a)),
    getMaintenanceFormulariesInfo: (a) =>
      dispatch(getMaintenanceFormulariesInfo(a)),
    postMaintenaceDrugTier: (a) => dispatch(postMaintenaceDrugTier(a)),
    getMaintenanceFormularyTiers: (a) =>
      dispatch(getMaintenanceFormularyTiers(a)),
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    postTierApplyInfo: (a) => dispatch(postTierApplyInfo(a)),
    postAddMaintenanceDrugs: (a) => dispatch(postAddMaintenanceDrugs(a)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassMaintenanceTier);
