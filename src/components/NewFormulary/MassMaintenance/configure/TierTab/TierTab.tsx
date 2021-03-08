import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import "./TierTab.scss";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../mocks/formulary/mock-data";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import PanelHeader from "../../../DrugDetails/components/FormularyConfigure/components/PanelHeader";
import PanelGrid from "../../../DrugDetails/components/FormularyConfigure/components/panelGrid";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import getLobCode from "../../../Utils/LobUtils";
import getMaxTierCount from "../../../Utils/TierCount";
import showMessage from "../../../Utils/Toast";
import { tierDefinationColumns } from "../../../DrugDetails/components/FormularyConfigure/components/TierDefinationGridColumn";
import { getTierDefinationData } from "../../../../../mocks/formulary/tierDefinationMock";
import { TabInfo } from "../../../../../models/tab.model";
import TierReplace from "../../../DrugDetails/components/FormularyConfigure/components/TierReplace";
import TierRemove from "../../../DrugDetails/components/FormularyConfigure/components/TierRemove";
import ReplaceDeletedTiers from "../../../DrugDetails/components/FormularyConfigure/components/ReplaceDeletedTiers";
import {
  getTier,
  getTierLabels,
  postNewTier,
  replaceTier,
  deleteTier,
  reassignTier,
} from "../../../../../redux/slices/formulary/tier/tierActionCreation";
//import { getFormularySetup } from "../../../../../../redux/slices/formulary/formularySummaryActionCreation";
import { GridMenu } from "../../../../../models/grid.model";
import DialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";
import { ToastContainer } from "react-toastify";

import * as tierConstants from "../../../../../api/http-tier";
import * as commonConstants from "../../../../../api/http-commons";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { AnyMxRecord, AnyNaptrRecord } from "dns";
import CustomPanelGrid from "../../../../shared/Frx-components/custom-panel-grid/CustomPanelGrid";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import Button from "../../../../shared/Frx-components/button/Button";
import {getMassMaintenanceCompleteTabColumns} from "../../../../../utils/grid/columns";
import { getMaintenanceMassCompleteSelected } from "../../../../../mocks/MassMCompleteSelectedMock";
import {formatDate, formatDateAndTime} from "../../../../../utils/formatters/date-format";
import { fetchCompleteTabData, setSelectedRow } from "../../../../../redux/slices/maintenance/maintenanceSlice";
import { gridSettingsSlice } from "../../../../../redux/slices/formulary/gridHandler/gridSettingsSlice";
import { Column } from "../../../../../models/grid.model";
import * as _ from "lodash";
import {
  setFormulary,
  setLocation,
  setLocationHome,
  clearApplication,
  setModeLob
} from "../../../../../redux/slices/formulary/application/applicationSlice";

function mapDispatchToProps(dispatch) {
  return {
    getTier: (a) => dispatch(getTier(a)),
    getTierLabels: (a) => dispatch(getTierLabels(a)),
    postNewTier: (a) => dispatch(postNewTier(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    replaceTier: (a) => dispatch(replaceTier(a)),
    deleteTier: (a) => dispatch(deleteTier(a)),
    reassignTier: (a) => dispatch(reassignTier(a)),
    //getFormularySetup:(a)=>dispatch(getFormularySetup(a))
    fetchCompleteTabData: (a) => dispatch(fetchCompleteTabData(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    tierData: state.tierSliceReducer.data,
    tierLabels: state.tierSliceReducer.tierLabels,
    maintenanceGrid: {
        count: state.maintenance.selectedFormularies.count,
        landing: state.maintenance.selectedFormularies.list,
        isLoading: state.maintenance.isLoading,
        grid_settings: state.gridSettings,
        refernce_id: state.maintenance.selectedFormularies.list.id_formulary_maintenance
    },
    rowId: state.maintenance.selectedRow.id_maintenance_formulary,
    rowData: state.maintenance.selectedRow
  };
};

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
  activeTabIndex: any;
  tierDefinationColumns: any;
  tierDefinationData: any;
  columns: any;
  data: any;
  openPopup: boolean;
  tierOption: any[];
  tierLabels: any[];
  tierLabelNames: any[];
  addNewTierPopup: boolean;
  settingsTriDotDropDownItems: any[];
  deleteTierPupup: boolean;
  deleteTierReplacePopup: boolean;
  afterDeleteTierOptions: any[];
  afterDeleteRemainigTiers: any[];
  tierNames: any[];
  pupupTitle: any;
  popupPositiveButtonText: any;
  selectedTierToDelete: any;
  filteredTierLabels: any[];
  updateTierId: any;
  updateTierMode: any;
  newTierLabel: any;
  isEditMode: boolean;
  currentTierLabel: any;
  newTierLabelId: any;
  gridSingleSortInfo: any;
    isGridSingleSorted: boolean;
    gridMultiSortedInfo: any;
    isGridMultiSorted: boolean;
}

const MODE_ADD_NEW = 0;
const MODE_REPLACE = 1;
const MODE_DELETE = 2;

class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    newTierId: 0,
    newTierLabelId: -1,
    columns: [],
    data: [],
    lobCode: "",
    tierOption: [],
    tierLabels: [],
    settingsTriDotDropDownItems: [],
    tierLabelNames: [],
    filteredTierLabels: Array(),
    tierData: [],
    tierDefinationColumns: [],
    tierDefinationData: [],
    openPopup: false,
    addNewTierPopup: false,
    deleteTierPupup: false,
    deleteTierReplacePopup: false,
    afterDeleteTierOptions: [],
    afterDeleteRemainigTiers: [],
    tierNames: [],
    pupupTitle: "",
    selectedTierToDelete: "",
    popupPositiveButtonText: "",
    updateTierId: 0,
    updateTierMode: MODE_ADD_NEW,
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: true },
      { id: 3, text: "Remove", disabled: false },
    ],
    isEditMode: false,
    newTierLabel: "",
    currentTierLabel: "",
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
  };

  populateTierDetails = (TierColumns, formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
    apiDetails["pathParams"] = formularyId;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: formularyId },
    ];

    const TierDefinationData = this.props.getTier(apiDetails).then((json) => {
      //debugger;
      if (json.payload && json.payload.data) {
        let tmpData = json.payload.data;
        var tierOption: any[] = [];
        var result = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          tierOption.push(element);
          element.image = "tierWarning";
          if (element.added_count > 0) {
            element.image = "tierChecked";
          }
          return element;
        });
        if (tierOption.length > 0) {
          let lastTier = tierOption[tierOption.length - 1];
          this.state.newTierId = lastTier.id_tier + 1;
        }
        this.setState({
          tierDefinationColumns: TierColumns,
          tierDefinationData: result,
          tierOption: tierOption,
        });
      }
    });
  };

  deleteTier = (tierId) => {
    let lobCode = getLobCode(this.props.formulary_lob_id);
    let apiDetails = {};
    apiDetails["apiPart"] = tierConstants.FORMULARY_TIER;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + lobCode + "/" + tierId;
    const tierData = this.props.deleteTier(apiDetails).then((json) => {
      if (json.payload && json.payload.code && json.payload.code === "200") {
        showMessage("Tier Deleted", "success");
        const TierColumns = tierDefinationColumns();
        this.populateTierDetails(TierColumns, this.props.formulary_id);
        this.populateTierLabels(
          this.props.formulary_id,
          this.props.formulary_type_id
        );
      } else {
        showMessage("Error: Failed to delete tier", "error");
      }
      this.setState({
        addNewTierPopup: false,
      });
    });
  };

  reassignTier = (payload) => {
    let lobCode = getLobCode(this.props.formulary_lob_id);
    let apiDetails = {};
    apiDetails["apiPart"] = tierConstants.REASSIGN_TIER;
    apiDetails["pathParams"] = this.props?.formulary_id + "/" + lobCode;
    apiDetails["messageBody"] = payload;
    const tierData = this.props.reassignTier(apiDetails).then((json) => {
      if (json.payload && json.payload.code && json.payload.code === "200") {
        showMessage("Tier/s reassign is successful", "success");
        const TierColumns = tierDefinationColumns();
        this.populateTierDetails(TierColumns, this.props.formulary_id);
        this.populateTierLabels(
          this.props.formulary_id,
          this.props.formulary_type_id
        );
      } else {
        showMessage("Error: Failed to reassign tier/s", "error");
      }
      this.setState({
        addNewTierPopup: false,
        deleteTierReplacePopup: false,
      });
    });
  };

  populateTierLabels = (formularyId, formularyTypeId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = tierConstants.GET_TIER_LABEL;
    apiDetails["pathParams"] = formularyTypeId + "/0/" + formularyId;

    const TierDefinationData = this.props
      .getTierLabels(apiDetails)
      .then((json) => {
        if (json.payload && json.payload.data) {
          let tmpData = json.payload.data;
          let labelNames: any[] = [];
          var result = tmpData.map(function (el) {
            var element = Object.assign({}, el);
            labelNames.push(element.tier_label);
            return element;
          });
          this.setState({
            tierLabels: result,
            tierLabelNames: labelNames,
          });
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    console.log("TIER: componentWillReceiveProps", nextProps);
    const TierColumns = tierDefinationColumns();
    let tmpData = nextProps.tierData;
    if (tmpData && Array.isArray(tmpData) && tmpData.length > 0) {
      var tierOption: any[] = [];
      var result = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        tierOption.push(element);
        element.image = "tierWarning";
        if (element.added_count > 0) {
          element.image = "tierChecked";
        }
        return element;
      });
      if (tierOption.length > 0) {
        let lastTier = tierOption[tierOption.length - 1];
        this.state.newTierId = lastTier.id_tier + 1;
      }
      this.setState({
        tierDefinationColumns: TierColumns,
        tierDefinationData: result,
        tierOption: tierOption,
      });
    }
    if (this.props.formulary_id !== nextProps.formulary_id) {
      this.populateTierDetails(TierColumns, nextProps.formulary_id);
      this.populateTierLabels(
        nextProps.formulary_id,
        nextProps.formulary_type_id
      );
      this.state.lobCode = getLobCode(nextProps.formulary_lob_id);
    }
    if (this.props.configureSwitch !== nextProps.configureSwitch) {
      if (nextProps.configureSwitch) {
        this.state.tabs.map((tabInfo) => {
          if (tabInfo.id === 2 || tabInfo.id === 3) {
            tabInfo.disabled = true;
          } else {
            tabInfo.disabled = false;
          }
        });
        this.setState({
          activeTabIndex: 0,
        });
      } else {
        this.state.tabs.map((tabInfo) => {
          if (tabInfo.id === 2) {
            tabInfo.disabled = true;
          } else {
            tabInfo.disabled = false;
          }
        });
        this.setState({
          activeTabIndex: this.state.activeTabIndex,
        });
      }
    }
  }

  componentDidMount() {
    this.setState({
      settingsTriDotDropDownItems: [
        ...this.state.settingsTriDotDropDownItems,
        ...[
          {
            id: 21,
            key: 21,
            title: "Replace Tier",
          },
          {
            id: 22,
            key: 22,
            title: "Delete Tier",
          },
        ],
      ],
    });
    const TierColumns = tierDefinationColumns();
    console.log("Formulary ID in tier:" + this.props.formulary_id);
    if (this.props.formulary_id) {
      this.populateTierDetails(TierColumns, this.props.formulary_id);
      this.populateTierLabels(
        this.props.formulary_id,
        this.props.formulary_type_id
      );
      this.state.lobCode = getLobCode(this.props.formulary_lob_id);
    }
    this.props.fetchCompleteTabData(this.listPayload);
  }
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    this.props.setAdvancedSearch(payload);
    this.setState({ tabs, activeTabIndex });
  };

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    console.log("Active tab index is:" + this.state.activeTabIndex);
    switch (activeTabIndex) {
      case 0:
        return (
          <TierReplace
            tierOptions={this.state.tierOption}
            formularyId={this.props?.formulary_id}
            formulary={this.props?.formulary}
            lobCode={this.state.lobCode}
          />
        );
      case 1:
        return <div>Append</div>;
      case 2:
        return (
          <TierRemove
            formularyId={this.props?.formulary_id}
            formulary={this.props?.formulary}
            lobCode={this.state.lobCode}
          />
        );
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
  };

  handleSearch = () => {
    console.log("work");
  };
  settingsTriDotClick = (data: any) => {
    console.log("tri dot clicked ", data);
  };

  settingsTriDotDropDownItemClick = (data: any, item: any) => {
    if (item.title === "Replace Tier") {
      console.log("Replace tier id is:" + data.id_tier);
      this.onAddNewTierHandler(data.id_tier, data.tier_label, MODE_REPLACE);
    } else if (item.title === "Delete Tier") {
      this.setState({ selectedTierToDelete: data.tier_name });
      this.onDeleteTierHandler();
    }
  };
  settingsTriDotMenuClick = (menuItem: GridMenu) => {
    if (menuItem.title === "Modify Auth or Override") {
      this.setState({
        openPopup: true,
      });
    }
    if (this.props.settingsTriDotMenuClick) {
      console.log("tridot menu clicked", menuItem);
    }
  };
  onAddNewTierHandler = (tierId, tierLabel, mode) => {
    this.setState({
      pupupTitle: "TIER DEFINITION",
      popupPositiveButtonText: "Save",
      deleteTierPupup: false,
      updateTierMode: mode,
    });
    if (mode === MODE_ADD_NEW) {
      let maxTierCount = getMaxTierCount(
        this.props.formulary_lob_id,
        this.props.formulary_type_id
      );
      if (this.state.newTierId > maxTierCount) {
        showMessage("Error: Max tier limit reached", "error");
      } else {
        let filteredTierLabels = Array();
        if (this.state.tierLabelNames.length > 0) {
          let existingTierLabels = this.state.tierOption.map((tierInfo) => {
            return tierInfo["tier_label"];
          });
          filteredTierLabels = this.state.tierLabelNames.filter(
            (label) => !existingTierLabels.includes(label)
          );
          filteredTierLabels = [...["Create New"], ...filteredTierLabels];
        }
        this.setState({
          addNewTierPopup: true,
          filteredTierLabels: filteredTierLabels,
          updateTierId: tierId,
        });
      }
    } else if (mode === MODE_REPLACE) {
      let filteredTierLabels = Array();
      if (this.state.tierLabelNames.length > 0) {
        let existingTierLabels = this.state.tierOption.map((tierInfo) => {
          return tierInfo["tier_label"];
        });
        filteredTierLabels = this.state.tierLabelNames.filter(
          (label) => !existingTierLabels.includes(label)
        );
        filteredTierLabels = [
          ...["Create New", tierLabel],
          ...filteredTierLabels,
        ];
      }
      this.setState({
        addNewTierPopup: true,
        filteredTierLabels: filteredTierLabels,
        updateTierId: tierId,
      });
    }
  };
  onDeleteTierHandler = () => {
    this.setState({
      pupupTitle: "DELETE TIER",
      popupPositiveButtonText: "Yes, Delete",
      deleteTierPupup: true,
      addNewTierPopup: true,
    });
  };
  onNewTierPopupClose = () => {
    //showMessage("Popup closed", "success");
    this.setState({
      addNewTierPopup: false,
      isEditMode: false,
      newTierLabel: "",
      currentTierLabel: "",
    });
  };

  tierLabelDropDownSelectHandler = (value, event) => {
    let tierLabel = event.value.toString().trim();
    let tierLabelId = -1;
    if (tierLabel) {
      if (tierLabel === "Create New") {
        this.setState({
          isEditMode: true,
          newTierLabel: "",
          currentTierLabel: "",
        });
      } else {
        let filtered = this.state.tierLabels.filter(
          (tierObject) => tierObject["tier_label"] === tierLabel
        );
        if (filtered && filtered.length > 0) {
          tierLabelId = filtered[0]["id_tier_label"];
          this.state.newTierLabelId = tierLabelId;
        }
      }
    }
  };

  onTierLabelChange = (e) => {
    if (e.target.value) {
      this.state.newTierLabel = e.target.value;
    } else {
      this.state.newTierLabel = "";
    }
  };

  onNewTierAction = (action) => {
    if (action === "positive") {
      let apiDetails = {};
      apiDetails["apiPart"] = tierConstants.FORMULARY_TIER;
      apiDetails["pathParams"] = this.props?.formulary_id;
      apiDetails["keyVals"] = [];
      apiDetails["messageBody"] = {
        id_tier: this.state.updateTierId,
        id_tier_label: this.state.newTierLabelId,
      };

      if (this.state.newTierLabelId === -1) {
        apiDetails["messageBody"]["id_tier_label"] = null;
        apiDetails["messageBody"]["is_custom"] = true;
        apiDetails["messageBody"][
          "tier_label_name"
        ] = this.state.currentTierLabel;
      }

      if (this.state.updateTierMode === MODE_ADD_NEW) {
        const TierDefinationData = this.props
          .postNewTier(apiDetails)
          .then((json) => {
            if (
              json.payload &&
              json.payload.code &&
              json.payload.code === "200"
            ) {
              showMessage("Tier Added", "success");
              const TierColumns = tierDefinationColumns();
              this.setState(
                {
                  isEditMode: false,
                  newTierLabel: "",
                  currentTierLabel: "",
                  newTierLabelId: -1,
                },
                () => {
                  this.populateTierDetails(
                    TierColumns,
                    this.props.formulary_id
                  );
                  this.populateTierLabels(
                    this.props.formulary_id,
                    this.props.formulary_type_id
                  );
                }
              );
            } else {
              showMessage("Error: Failed to add tier", "error");
              this.setState({
                isEditMode: false,
                newTierLabel: "",
                currentTierLabel: "",
                newTierLabelId: -1,
              });
            }
          });
      } else if (this.state.updateTierMode === MODE_REPLACE) {
        const TierDefinationData = this.props
          .replaceTier(apiDetails)
          .then((json) => {
            if (
              json.payload &&
              json.payload.code &&
              json.payload.code === "200"
            ) {
              showMessage("Tier Replaced", "success");
              const TierColumns = tierDefinationColumns();
              this.setState(
                {
                  isEditMode: false,
                  newTierLabel: "",
                  currentTierLabel: "",
                  newTierLabelId: -1,
                },
                () => {
                  this.populateTierDetails(
                    TierColumns,
                    this.props.formulary_id
                  );
                  this.populateTierLabels(
                    this.props.formulary_id,
                    this.props.formulary_type_id
                  );
                }
              );
            } else {
              showMessage("Error: Failed to replace tier", "error");
              this.setState({
                isEditMode: false,
                newTierLabel: "",
                currentTierLabel: "",
                newTierLabelId: -1,
              });
            }
          });
      }
    }
    this.setState({
      addNewTierPopup: false,
    });
  };

  onDeleteTierAction = (action) => {
    if (action === "positive") {
      const tierDataLength = this.props.tierData.length;
      const indexOfDeletedTier =
        this.props.tierData.findIndex(
          (e) => e.tier_name === this.state.selectedTierToDelete
        ) + 1;
      if (tierDataLength === indexOfDeletedTier) {
        const deletedTierId = parseInt(
          this.state.selectedTierToDelete.split(" ")[1]
        );
        this.deleteTier(deletedTierId);
      } else {
        const restofTiers = this.props.tierData.filter(
          (e) => e.tier_name !== this.state.selectedTierToDelete
        );
        const fetchTierName = restofTiers.map((e) => e.tier_name);
        const dropdownoptions = this.props.tierData.map((e) => e.tier_name);
        dropdownoptions.pop();
        this.setState({
          addNewTierPopup: false,
          deleteTierReplacePopup: true,
          afterDeleteRemainigTiers: restofTiers,
          tierNames: fetchTierName,
          afterDeleteTierOptions: dropdownoptions,
        });
      }
    }
  };
  onChangeTierOptions = (e, tiername) => {
    const updateData: any = [...this.state.afterDeleteRemainigTiers];
    const indexOfSelect = updateData.findIndex(
      (el) => el.id_tier_label === tiername
    );
    const newCol: any = { ...updateData[indexOfSelect] };
    newCol.tier_name = e;
    updateData[indexOfSelect] = newCol;
    this.setState({
      afterDeleteRemainigTiers: updateData,
    });
  };
  onDeleteTierReplaceAction = () => {
    const data = [...this.state.afterDeleteRemainigTiers];
    let addedTiers = Array();
    let duplicatesPresent = false;
    data.map((el: any) => {
      const current_id = parseInt(el.tier_name.split(" ")[1]);
      if (!addedTiers.includes(current_id)) {
        addedTiers.push(current_id);
      } else {
        duplicatesPresent = true;
      }
    });
    if (duplicatesPresent) {
      showMessage(
        "Duplicate tiers are not allowed in reassigned tier section",
        "error"
      );
      return;
    }
    const createdData: any = data.map((el: any) => {
      const current_id = parseInt(el.tier_name.split(" ")[1]);
      return {
        current_tier_value: current_id,
        file_type: "COMM",
        id_tier: current_id,
        id_tier_label: el.id_tier_label,
        old_tier_id: el.id_tier,
        old_tier_value: el.id_tier,
      };
    });
    const sendingData = {
      removed_tier_value: parseInt(
        this.state.selectedTierToDelete.split(" ")[1]
      ),
      tiers: [...createdData],
    };
    this.reassignTier(sendingData);
    // Make api call here for put request
  };
  onDeleteTierReplaceActionClose = () => {
    this.setState({
      deleteTierReplacePopup: false,
    });
  };
  onNewTierSave = (e) => {
    console.log("Tier label value:" + this.state.newTierLabel);
    if (this.state.newTierLabel && this.state.newTierLabel.length > 0) {
      let existingTierLabels = this.state.tierOption.map((tierInfo) => {
        return tierInfo["tier_label"];
      });
      let tmpLabels = Array();
      tmpLabels = existingTierLabels.filter(
        (label) => label === this.state.newTierLabel
      );
      if (tmpLabels.length > 0) {
        showMessage("Tier label already exists", "error");
        return;
      }
      tmpLabels = this.state.filteredTierLabels.filter(
        (label) => label === this.state.newTierLabel
      );
      if (tmpLabels.length > 0) {
        showMessage(
          "Tier label already exists in the current dropdown",
          "error"
        );
        return;
      }
      if (
        this.state.currentTierLabel &&
        this.state.currentTierLabel.length > 0
      ) {
        this.state.filteredTierLabels = this.state.filteredTierLabels.filter(
          (label) => label !== this.state.currentTierLabel
        );
        this.state.filteredTierLabels = [
          ...[this.state.newTierLabel],
          ...this.state.filteredTierLabels,
        ];
      } else {
        this.state.filteredTierLabels = this.state.filteredTierLabels.filter(
          (label) => label !== "Create New"
        );
        this.state.filteredTierLabels = [
          ...[this.state.newTierLabel],
          ...this.state.filteredTierLabels,
        ];
      }
    } else {
      if (
        this.state.currentTierLabel &&
        this.state.currentTierLabel.length > 0
      ) {
        this.state.filteredTierLabels = this.state.filteredTierLabels.filter(
          (label) => label !== this.state.currentTierLabel
        );
      } else {
        this.state.filteredTierLabels = this.state.filteredTierLabels.filter(
          (label) => label !== "Create New"
        );
      }
      this.state.filteredTierLabels = [
        ...["Create New"],
        ...this.state.filteredTierLabels,
      ];
    }
    this.setState({
      isEditMode: false,
      newTierLabel: "",
      currentTierLabel: this.state.newTierLabel,
    });
  };

  onNewTierClose = (e) => {
    this.setState({
      isEditMode: false,
      newTierLabel: "",
    });
  };

  onNewTierEdit = (e) => {
    this.setState({
      isEditMode: true,
      newTierLabel: this.state.currentTierLabel,
    });
  };

  listPayload: any = {
    id_maintenance_formulary: this.props.rowId,
};

  applySortHandler = (key, order, sortedInfo) => {
    console.log("sorted info for single sorting ", sortedInfo);
    this.setState(
      {
        gridSingleSortInfo: sortedInfo,
        isGridSingleSorted: true,
        isGridMultiSorted: false,
        gridMultiSortedInfo: [],
      },
      () => {
        // this.props.applySortHandler(key, order);
        this.onApplySortHandler(key, order)
      }
    );
    // this.props.fetchFormularies(this.listPayload);
  };

  onApplySortHandler = (key, order) => {
    console.log("key and order ", key, order);
    const listPayload = { ...this.listPayload };
    listPayload.sort_by = [key];
    const sortorder = order && order === "ascend" ? "asc" : "desc";
    listPayload.sort_order = [sortorder];
    this.listPayload = listPayload;
    this.props.fetchCompleteTabData(this.listPayload);
  };

  render() {
    const tierDefinationColumns = this.state.tierDefinationColumns;
    const tierDefinationData = this.state.tierDefinationData;
    console.log("Tier length is:" + tierDefinationData.length);
    const selected_formularies_columns = getMassMaintenanceCompleteTabColumns();
    const data = this.props.maintenanceGrid.landing
    let GridElement =  this.props.maintenanceGrid.isLoading;
    const gridData = [] as any;
    if(data){
        let selectedFormularies = {
            formulary_name: this.props.rowData.formulary_names ? this.props.rowData.formulary_names.length > 18 ? this.props.rowData.formulary_names.slice(0, 18) + "..." : this.props.rowData.formulary_names : "NA",
            formulary_version: data.id_lob !== undefined ? data.id_lob : "NA",
            contact_year: data.contract_year !== undefined ? data.contract_year : "NA",
            formulary_type: data.lob_name !== undefined ? data.lob_name : "NA",
            effective_date: formatDateAndTime(data.effective_date),
            items: this.state.settingsTriDotDropDownItems
        }
        gridData.push(selectedFormularies)
    }
    console.log("result", data, gridData);
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="Selected Formularies"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                   
                    <div className="inner-container tier-defination-grid white-bg">
                       {GridElement ? <FrxLoader /> : (
                        <FrxGridContainer
                            enableSearch
                            enableColumnDrag
                            onSearch={this.handleSearch}
                            enableSettings={false}
                            fixedColumnKeys={["formulary_name"]}
                            gridName="SELECTED FORMULARIES"
                            isFetchingData={this.state.isFetchingData}
                            columns={selected_formularies_columns}
                            // data={this.state.filteredData}
                            data = {gridData}
                            pagintionPosition="topRight"
                            onSettingsClick="grid-menu"
                            scroll={{ x: 0, y: 300 }}
                            hidePagination
                            hideClearFilter
                            applySort={this.applySortHandler}
                        />
                        )}
                        {/* <CustomPanelGrid
                        gridData={tierDefinationData}
                        onMenuClick={(item, data) => {
                          this.settingsTriDotDropDownItemClick(data, item);
                        }}
                        menuItems={this.state.settingsTriDotDropDownItems}
                      />
                      <div className="tier-popup-btn">
                        <svg
                          onClick={(e) =>
                            this.onAddNewTierHandler(
                              this.state.newTierId,
                              "",
                              MODE_ADD_NEW
                            )
                          }
                          width="75"
                          height="25"
                          viewBox="0 0 75 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M33.2554 14.521C33.1929 14.396 33.1421 14.1733 33.103 13.853C32.5991 14.3765 31.9976 14.6382 31.2983 14.6382C30.6733 14.6382 30.1597 14.4624 29.7573 14.1108C29.3589 13.7554 29.1597 13.3062 29.1597 12.7632C29.1597 12.103 29.4097 11.5913 29.9097 11.228C30.4136 10.8608 31.1206 10.6772 32.0308 10.6772H33.0854V10.1792C33.0854 9.80029 32.9722 9.49951 32.7456 9.27686C32.519 9.05029 32.1851 8.93701 31.7437 8.93701C31.3569 8.93701 31.0327 9.03467 30.771 9.22998C30.5093 9.42529 30.3784 9.66162 30.3784 9.93896H29.2886C29.2886 9.62256 29.3999 9.31787 29.6226 9.0249C29.8491 8.72803 30.1538 8.49365 30.5366 8.32178C30.9233 8.1499 31.3472 8.06396 31.8081 8.06396C32.5386 8.06396 33.1108 8.24756 33.5249 8.61475C33.939 8.97803 34.1538 9.47998 34.1694 10.1206V13.0386C34.1694 13.6206 34.2437 14.0835 34.3921 14.4272V14.521H33.2554ZM31.4565 13.6948C31.7964 13.6948 32.1187 13.6069 32.4233 13.4312C32.728 13.2554 32.9487 13.0269 33.0854 12.7456V11.4448H32.2358C30.9077 11.4448 30.2437 11.8335 30.2437 12.6108C30.2437 12.9507 30.3569 13.2163 30.5835 13.4077C30.8101 13.5991 31.1011 13.6948 31.4565 13.6948ZM35.605 11.2983C35.605 10.3257 35.8354 9.54443 36.2964 8.95459C36.7573 8.36084 37.3608 8.06396 38.1069 8.06396C38.8491 8.06396 39.437 8.31787 39.8706 8.82568V5.521H40.9546V14.521H39.9585L39.9058 13.8413C39.4722 14.3726 38.8687 14.6382 38.0952 14.6382C37.3608 14.6382 36.7612 14.3374 36.2964 13.7358C35.8354 13.1343 35.605 12.3491 35.605 11.3804V11.2983ZM36.689 11.4214C36.689 12.1401 36.8374 12.7026 37.1343 13.1089C37.4312 13.5151 37.8413 13.7183 38.3647 13.7183C39.0522 13.7183 39.5542 13.4097 39.8706 12.7925V9.88037C39.5464 9.28271 39.0483 8.98389 38.3765 8.98389C37.8452 8.98389 37.4312 9.18896 37.1343 9.59912C36.8374 10.0093 36.689 10.6167 36.689 11.4214ZM42.3784 11.2983C42.3784 10.3257 42.6089 9.54443 43.0698 8.95459C43.5308 8.36084 44.1343 8.06396 44.8804 8.06396C45.6226 8.06396 46.2104 8.31787 46.644 8.82568V5.521H47.728V14.521H46.7319L46.6792 13.8413C46.2456 14.3726 45.6421 14.6382 44.8687 14.6382C44.1343 14.6382 43.5347 14.3374 43.0698 13.7358C42.6089 13.1343 42.3784 12.3491 42.3784 11.3804V11.2983ZM43.4624 11.4214C43.4624 12.1401 43.6108 12.7026 43.9077 13.1089C44.2046 13.5151 44.6147 13.7183 45.1382 13.7183C45.8257 13.7183 46.3276 13.4097 46.644 12.7925V9.88037C46.3198 9.28271 45.8218 8.98389 45.1499 8.98389C44.6187 8.98389 44.2046 9.18896 43.9077 9.59912C43.6108 10.0093 43.4624 10.6167 43.4624 11.4214ZM53.4175 8.18115L53.4526 8.97803C53.937 8.36865 54.5698 8.06396 55.3511 8.06396C56.6909 8.06396 57.3667 8.81982 57.3784 10.3315V14.521H56.2944V10.3257C56.2905 9.86865 56.1851 9.53076 55.978 9.31201C55.7749 9.09326 55.4565 8.98389 55.0229 8.98389C54.6714 8.98389 54.3628 9.07764 54.0972 9.26514C53.8315 9.45264 53.6245 9.69873 53.4761 10.0034V14.521H52.3921V8.18115H53.4175ZM61.644 14.6382C60.7847 14.6382 60.0854 14.3569 59.5464 13.7944C59.0073 13.228 58.7378 12.4722 58.7378 11.5269V11.3276C58.7378 10.6987 58.8569 10.1382 59.0952 9.646C59.3374 9.1499 59.6733 8.76318 60.103 8.48584C60.5366 8.20459 61.0054 8.06396 61.5093 8.06396C62.3335 8.06396 62.9741 8.33545 63.4312 8.87842C63.8882 9.42139 64.1167 10.1987 64.1167 11.2104V11.6616H59.8218C59.8374 12.2866 60.019 12.7925 60.3667 13.1792C60.7183 13.562 61.1636 13.7534 61.7026 13.7534C62.0854 13.7534 62.4097 13.6753 62.6753 13.519C62.9409 13.3628 63.1733 13.1558 63.3726 12.8979L64.0347 13.4136C63.5034 14.23 62.7065 14.6382 61.644 14.6382ZM61.5093 8.95459C61.0718 8.95459 60.7046 9.11475 60.4077 9.43506C60.1108 9.75146 59.9272 10.1968 59.8569 10.771H63.0327V10.689C63.0015 10.1382 62.853 9.7124 62.5874 9.41162C62.3218 9.10693 61.9624 8.95459 61.5093 8.95459ZM70.9897 13.0269L72.2085 8.18115H73.2925L71.4468 14.521H70.5679L69.0269 9.71631L67.5269 14.521H66.6479L64.8081 8.18115H65.8862L67.1343 12.9272L68.6108 8.18115H69.4839L70.9897 13.0269Z"
                            fill="#707683"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.0312 18.0314C21.3507 14.712 21.3507 9.33007 18.0312 6.01059C14.7117 2.69111 9.32985 2.69115 6.01041 6.01059C2.69097 9.33003 2.69092 14.7119 6.01041 18.0314C9.32989 21.3509 14.7118 21.3508 18.0312 18.0314ZM17.3241 17.3243C20.2531 14.3954 20.253 9.6466 17.3241 6.7177C14.3952 3.7888 9.64646 3.78875 6.71751 6.7177C3.78857 9.64664 3.78861 14.3954 6.71751 17.3243C9.64641 20.2532 14.3952 20.2532 17.3241 17.3243Z"
                            fill="#707683"
                          />
                          <path
                            d="M7.52082 12.021C7.52082 12.2971 7.74468 12.521 8.02082 12.521H11.5208V16.021C11.5208 16.2971 11.7447 16.521 12.0208 16.521C12.297 16.521 12.5208 16.2971 12.5208 16.021V12.521L16.0208 12.521C16.297 12.521 16.5208 12.2971 16.5208 12.021C16.5208 11.7448 16.297 11.521 16.0208 11.521H12.5208L12.5208 8.02099C12.5208 7.74485 12.297 7.52099 12.0208 7.52099C11.7447 7.52099 11.5208 7.74485 11.5208 8.02099V11.521H8.02082C7.74468 11.521 7.52082 11.7448 7.52082 12.021Z"
                            fill="#707683"
                          />
                          <line
                            x1="29.521"
                            y1="17.021"
                            x2="72.521"
                            y2="17.021"
                            stroke="#707683"
                            stroke-dasharray="1 1"
                          />
                        </svg>
                      </div> */}
                      
                      <DialogPopup
                        className="tier-dialog-popup delete-replace-popup"
                        showCloseIcon={true}
                        positiveActionText="Save"
                        negativeActionText="Cancel"
                        title={`Reassign ${this.state.selectedTierToDelete}`}
                        handleClose={this.onDeleteTierReplaceActionClose}
                        handleAction={this.onDeleteTierReplaceAction}
                        showActions={true}
                        open={this.state.deleteTierReplacePopup}
                      >
                        <ReplaceDeletedTiers
                          data={this.state.afterDeleteRemainigTiers}
                          options={this.state.afterDeleteTierOptions}
                          removedTier={this.state.selectedTierToDelete}
                          updateTierOption={this.onChangeTierOptions}
                          tierNames={this.state.tierNames}
                        />
                        {/* {this.state.afterDeleteRemainigTiers?.map(el => {
                        return (
                          <div className="gridRow">
                            <div>
                              <DropDown
                                className="tier-description-dropdown"
                                placeholder="Select"
                                options={this.state.afterDeleteTierOptions}
                                value={el.tier_name}
                                onSelect={
                                  this.tierLabelDropDownSelectHandler
                                }
                              />
                            </div>
                          </div>
                        )
                      }) : null} */}
                      </DialogPopup>
                      <DialogPopup
                        className="tier-dialog-popup"
                        showCloseIcon={!this.state.isEditMode}
                        positiveActionText={this.state.popupPositiveButtonText}
                        negativeActionText="Cancel"
                        title={this.state.pupupTitle}
                        handleClose={() => this.onNewTierPopupClose()}
                        handleAction={(e) =>
                          this.state.deleteTierPupup
                            ? this.onDeleteTierAction(e)
                            : this.onNewTierAction(e)
                        }
                        showActions={!this.state.isEditMode}
                        open={this.state.addNewTierPopup}
                      >
                        {this.state.deleteTierPupup ? (
                          <div className="tier-definition-container">
                            <Grid item xs={12}>
                              <div className="delete-tier-wrapper">
                                <p>
                                  Are you sure that you want to delete{" "}
                                  <b>{this.state.selectedTierToDelete}</b> from
                                  your formulary?
                                </p>
                                <br />
                                <span className="red-bold">
                                  Doing so is a permanent action.
                                </span>
                              </div>
                            </Grid>
                          </div>
                        ) : (
                          <div className="tier-definition-container">
                            <Grid item xs={12}>
                              <div className="tier-definition-popup-wrapper">
                                <div className="tier-number-wrapper">
                                  <div className="heading border-right">
                                    tier number
                                  </div>
                                  <div className="tier-number border-right">
                                    Tier {this.state.updateTierId}
                                  </div>
                                </div>
                                <div className="tier-description-wrapper">
                                  <div className="heading">
                                    tier description
                                  </div>
                                  <div className="tier-descripption">
                                    {this.state.isEditMode ? (
                                      <input
                                        className="tier-description-dropdown"
                                        type="text"
                                        onChange={this.onTierLabelChange}
                                        defaultValue={
                                          this.state.currentTierLabel
                                        }
                                      />
                                    ) : (
                                      <DropDown
                                        className="tier-description-dropdown"
                                        placeholder="Select"
                                        options={this.state.filteredTierLabels}
                                        onSelect={
                                          this.tierLabelDropDownSelectHandler
                                        }
                                      />
                                    )}
                                    {this.state.isEditMode ? (
                                      <div className="tier-modify-buttons">
                                        <i
                                          className="fa fa-save"
                                          onClick={this.onNewTierSave}
                                        ></i>
                                        <i
                                          className="fa fa-times"
                                          onClick={this.onNewTierClose}
                                        ></i>
                                      </div>
                                    ) : this.state.currentTierLabel.length >
                                      0 ? (
                                      <div className="tier-modify-buttons">
                                        <i
                                          className="fa fa-pencil"
                                          onClick={this.onNewTierEdit}
                                        ></i>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </div>
                        )}
                      </DialogPopup>
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="Tier Definition Settings" />
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
                        <div className="mini-tabs tier-mini-tabs">
                          <FrxMiniTabs
                            tabList={this.state.tabs}
                            activeTabIndex={this.state.activeTabIndex}
                            onClickTab={this.onClickTab}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="tab-content">{this.renderTabContent()}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tier);
