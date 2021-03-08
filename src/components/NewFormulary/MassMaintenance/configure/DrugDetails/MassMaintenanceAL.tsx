import React from "react";
import { connect } from "react-redux";
import {
  getColumns,
  getData,
  getDrugsList,
} from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import { TabInfo } from "../../../../../models/tab.model";
import { postMaintenaceDrugTier } from "../../../../../redux/slices/formulary/tier/tierActionCreation";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import {
  postMaintenaceDrugPA,
} from "../../../../../redux/slices/formulary/pa/paActionCreation";

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
    postMaintenaceDrugTier: (a) => dispatch(postMaintenaceDrugTier(a)),
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
  };
}

class MassMaintenanceAL extends React.Component<any, any> {
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

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
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

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  };

  keepCheckBox = (data, index, drug, maintenanceFormularyTiers) => {
    let selectedTiers: any[] = this.state.selectedTiers;
    if (selectedTiers.length === 0) {
      for (let i = 0; i < maintenanceFormularyTiers.length; i++) {
        let obj = {};
        obj["id_base_formulary"] =
          maintenanceFormularyTiers[i].id_base_formulary;
        obj["id_formulary"] = maintenanceFormularyTiers[i].id_formulary;
        obj["selected_tier"] = "";
        obj["selected_tier_id"] = "";
        obj["keep_existing_tier"] = false;
        selectedTiers.push(obj);
      }
    }

    if (
      selectedTiers.length > 0 &&
      selectedTiers[index].id_base_formulary === drug.id_base_formulary
    ) {
      selectedTiers[index].keep_existing_tier = data.target.checked;
    }
    this.setState({ selectedTiers });
  };

  tierChange = (data, index, drug, maintenanceFormularyTiers) => {
    let selectedTiers: any[] = this.state.selectedTiers;

    if (selectedTiers.length === 0) {
      for (let i = 0; i < maintenanceFormularyTiers.length; i++) {
        let obj = {};
        obj["id_base_formulary"] =
          maintenanceFormularyTiers[i].id_base_formulary;
        obj["selected_tier"] = "";
        selectedTiers.push(obj);
      }
    }

    if (
      selectedTiers.length > 0 &&
      selectedTiers[index].id_base_formulary === drug.id_base_formulary
    ) {
      let selectedObj = drug.tier_info[data]?.tier_label;
      selectedTiers[index].selected_tier = selectedObj;
    }
    this.setState({ selectedTiers });
  };

  addNew = () => {};

  render() {
    const { gridColumns, miniTabs, activeMiniTabIndex, isSearchOpen } = this.state;

    return (
      <div className="mm-tier-root">
        <MMDDSelectedFormulariesGrid
          gridColumns={gridColumns}
          maintenanceFormularies={this.props.maintenanceFormularies}
          addNew={this.addNew}
        />

        <DrugGrid
          getDrugs={this.props.postMaintenaceDrugPA}
          columns={getMMDrugDetailsColumns()}
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceAL);
