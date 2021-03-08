import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import STF from "./STF";
import STRemove from "./StepTherpyRemove";
import FrxGrid from "../../../../../shared/FrxGrid/FrxGrid";
import { getClaimsGridData } from "../../../../../../mocks/grid/claims-mock";
import { getAuditMockColumns } from "../../../../../../utils/grid/columns";
import { getClaimsSearchData } from "../../../../../../mocks/search/claims-search-mock";
import {
  claimsGridColumnsForRejectedAndTotal,
  _claimsGridColumns,
  _grievancesGridColumns,
  _pacases_initial,
  _testClaimsGridColumns,
} from "../../../../../../utils/grid/columns";

interface MemberAuditPopupState {
  activeMiniTabIndex: number;
  miniTabs: any;
  filteredData: any;
  isFetchingData: boolean;
  data: any;
}

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    configureSwitch: state.switchReducer.configureSwitch,
  };
}

class STS extends React.Component<any, any> {
  state = {
    panelGridValue1: [],
    filteredData: [],
    activeTabIndex: 0,
    tabs: [
      {
        id: 1,
        text: "Replace",
        disabled: false,
      },
      {
        id: 2,
        text: "Append",
        disabled: this.props.formulary_lob_id == 1 ? true : false,
      },
      {
        id: 3,
        text: "Remove",
        disabled: false,
      },
    ],
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

  componentWillReceiveProps(nextProps) {
    console.log("TIER: componentWillReceiveProps", nextProps);

    if (nextProps.configureSwitch) {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: true },
          { id: 2, text: "Append", disabled: true },
          { id: 3, text: "Remove", disabled: true },
        ],
        activeTabIndex: 0,
      });
    } else {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: false },
          {
            id: 2,
            text: "Append",
            disabled: this.props.formulary_lob_id == 1 ? true : false,
          },
          { id: 3, text: "Remove", disabled: false },
        ],
      });
    }
  }
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    const columns = getAuditMockColumns();
    switch (tabIndex) {
      case 0:
        return <STF tab_type="replace" />;

      case 1:
        switch (this.props.formulary_lob_id) {
          case 1:
            return "";

            break;
          case 4:
            return <STF tab_type="append" />;
            break;
          default:
            break;
        }
        break;

      case 2:
        //     return <FrxGrid
        //     showSettingsMenu={false}
        //     enableColumnDrag={false}
        //     pagintionPosition="topRight"
        //     columns={columns}
        //     data={this.state.filteredData}
        //     gridName={"Audit"}
        //     fixedColumnKeys={['record_type']}
        //     hideClearFilter={true}
        //     hideItemsPerPage={true}
        //     hideMultiSort={true}
        //     hidePageJumper={true}
        //     hideResults={true}
        //     scroll={{ x: 300, y: 400 }}
        //     enableSettings={false}
        //     hidePagination={true}
        // />

        return <STRemove />;
    }
  };

  render() {
    return (
      <>
        <div className="bordered">
          <PanelHeader title="STEP THERAPY SETTING" />
          <div className="inner-container bg-light-grey" style={{ padding: "0px" }}>
            <div className="modify-wrapper  white-bg">
              <div className="modify-panel">
                <div className="icon">
                  <span>P</span>
                </div>
                <div className="switch-box">
                  <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-info">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(STS);

export const processMedGridData = (gridItem, element) => {
  gridItem["is_um_criteria"] = element.is_um_criteria ? "" + element.is_um_criteria : "";
  gridItem["ql_period_of_time"] = element.ql_period_of_time ? "" + element.ql_period_of_time : "";
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

export const processGridData = (gridItem, element) => {
  gridItem["is_um_criteria"] = element.is_um_criteria ? "" + element.is_um_criteria : "";
  gridItem["ql_period_of_time"] = element.ql_period_of_time ? "" + element.ql_period_of_time : "";
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
