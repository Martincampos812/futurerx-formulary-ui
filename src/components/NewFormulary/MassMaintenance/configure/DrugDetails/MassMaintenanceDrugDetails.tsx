import React from "react";
import { connect } from "react-redux";
import { TabInfo } from "../../../../../models/tab.model";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import MassMaintenanceAL from "./MassMaintenanceAL";
import MassMaintenanceFFF from "./MassMaintenanceFFF";
import MassMaintenanceGL from "./MassMaintenanceGL";
import MassMaintenanceICD from "./MassMaintenanceICD";
import MassMaintenanceOther from "./MassMaintenanceOther";
import MassMaintenancePN from "./MassMaintenancePN";
import MassMaintenancePOS from "./MassMaintenancePOS";
import MassMaintenancePR from "./MassMaintenancePR";
import MassMaintenancePT from "./MassMaintenancePT";
import { getMaintenanceFormulariesInfo } from "../../../../../redux/slices/maintenance/maintenanceSlice";
import MassMaintenanceLA from "./MassMaintenanceLA";
import MassMaintenanceMONM from "./MassMaintenanceMONM";
import MassMaintenanceIBF from "./MassMaintenanceIBF";
import MassMaintenanceFGC from "./MassMaintenanceFGC";
import MassMaintenancePGC from "./MassMaintenancePGC";
import MassMaintenanceHI from "./MassMaintenanceHI";
import MassMaintenanceVBID from "./MassMaintenanceVBID";
import MassMaintenanceLIS from "./MassMaintenanceLIS";
import MassMaintenancePBST from "./MassMaintenancePBST";
import MassMaintenanceSSM from "./MassMaintenanceSSM";
import MassMaintenanceAF from "./MassMaintenanceAF";
import "./MassMaintenanceDrugDetails.scss";

const mapStateToProps = (state) => {
  return {
    id_maintenance_formulary:
      state.maintenance.selectedRow.id_maintenance_formulary,
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getMaintenanceFormulariesInfo: (a) =>
      dispatch(getMaintenanceFormulariesInfo(a)),
  };
}

class MassMaintenanceDrugDetails extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: [] as any[],
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

  componentDidMount() {
    let apiDetails = {
      id_maintenance_formulary: this.props?.id_maintenance_formulary
    };

    let tabs: any[] = [];
    this.props.getMaintenanceFormulariesInfo(apiDetails);
    let tmpData: any[]  = this.props.maintenanceFormularies?.list;
    console.log("The maintenanceFormularies Drug Details = ", tmpData);

    if(tmpData){
      let count = 0;
      tmpData.forEach((element) => {
        let breadCrumbInfo: any[] = element?.bread_crumb_info;
        let drugDetailChildren = breadCrumbInfo.find(
          (e) => e?.code_value === "DRGDT"
        )?.children;

        if(drugDetailChildren) {
          drugDetailChildren.map((a, i) => {
            let text = this.getDisplayCodes(a?.code_value)
            let tempObj =  {
              id: tabs.length + 1,
              text,
            };

            if(!tabs.find(e => e.text === text)) {
              tabs.push(tempObj)
            };
          });
          
          this.setState({ tabs });
        }
        count++;
      });
    }
    
    console.log("The DD Tabs List = ", tabs);
  }

  getDisplayCodes = (code: string) => {
    switch (code) {
      case "ICDL":
        return "ICD";
      case "PATRS":
        return "PR";
      case "PHNW":
        return "PN";
      case "PRTX":
        return "PT";
      case "EDOTH":
      case "SBOTH":
        return "Other";
      case "ABRFA":
        return "AF";
      default:
        return code;
    }
  };

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    let tabToRender = this.state.tabs[tabIndex]?.text;

    switch (tabToRender) {
      case "AL":
        return <MassMaintenanceAL />;
      case "GL":
        return <MassMaintenanceGL />;
      case "ICD":
        return <MassMaintenanceICD />;
      case "PR":
        return <MassMaintenancePR />;
      case "PN":
        return <MassMaintenancePN />;
      case "PT":
        return <MassMaintenancePT />;
      case "POS":
        return <MassMaintenancePOS />;
      case "FFF":
        return <MassMaintenanceFFF />;
      case "Other":
        return <MassMaintenanceOther />;
      case "LA":
        return <MassMaintenanceLA />;
      case "MONM":
        return <MassMaintenanceMONM />;
      case "IBF":
        return <MassMaintenanceIBF />;
      case "FGC":
        return <MassMaintenanceFGC />;
      case "PGC":
        return <MassMaintenancePGC />;
      case "HI":
        return <MassMaintenanceHI />;
      case "VBID":
        return <MassMaintenanceVBID />;
      case "LIS":
        return <MassMaintenanceLIS />;
      case "PBST":
        return <MassMaintenancePBST />;
      case "SSM":
        return <MassMaintenanceSSM />;
      case "AF":
        return <MassMaintenanceAF />;
    }
  };

  render() {
    return (
      <>
        <div>
          <div className="bordered details-top white-bg details-tab-top">
            <div className="header">Drug Details</div>
            <div className="inner-container">
              <div className="configure-mini-tabs">
                <FrxMiniTabs
                  tabList={this.state.tabs}
                  activeTabIndex={this.state.activeTabIndex}
                  onClickTab={this.onClickTab}
                  position={true}
                />
              </div>
            </div>
          </div>
          <div className="tabs-info details-tab-bottom-info">
            {this.renderActiveTabContent()}
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassMaintenanceDrugDetails);
