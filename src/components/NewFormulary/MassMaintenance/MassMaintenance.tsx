import React from "react";
import { connect } from "react-redux";
import { TabInfo } from "../../../models/tab.model";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import MassMaintenanceConfigure from "./configure/MassMaintenanceConfigure";
import MassMaintenanceTop from "./MassMaintenanceTop";
import MassMaintenanceSetup from "./setup/MassMaintenanceSetup";
import MassMaintenanceComplete from "./CompleteTab/MassMaintenanceComplete";
import MassMaintenanceAssembly from "./AssemblyTab/MassMaintenanceAssembly";
// import "./FormularyDetails.scss";
import { createBrowserHistory } from "history";
import {
  fetchCompleteTabData,
  setSelectedRow,
} from "../../../redux/slices/maintenance/maintenanceSlice";

import {
  useParams
} from "react-router-dom";
import ViewFormularies from "./ViewFormularies";

const browserHistory = createBrowserHistory();

const tabs = [
  { id: 1, text: "Setup" },
  { id: 2, text: "Configure" },
  { id: 3, text: "Assembly" },
  { id: 4, text: "View" },
  { id: 5, text: "Complete" },
  // { id: 5, text: "Complete" }
];

class MassMaintenance extends React.Component<any, any> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };
  
  componentDidMount(){
    const param_id: string = this.props.match.params.id;
    const param_type: string = this.props.match.params.name;

    debugger;
    if (this.props.id_formulary_maintenance==null){
      this.props.fetchCompleteTabData({id_maintenance_formulary: param_id}).then((json) =>{
        if (json.payload){
          let obj = Object.assign({}, json.payload.list)
          obj["id_maintenance_formulary"]=obj.id_formulary_maintenance;
          //obj["is_view"] = param_type=="View"?true:false;
          //commented above line as for now we need to allow edit, this option will be handled later 
          obj["is_view"] = false;
          this.props.setSelectedRow(obj);
        }
      });
    }
  }
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0 as any;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
        // this.props.history.push(`/formulary/maintenance/maintenance-${tab.text}/${activeTabIndex = index}`)
        // browserHistory.push(`/formulary/maintenance/maintenance-${tab.text}/${activeTabIndex = index}`);
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <MassMaintenanceSetup onClickTab={this.onClickTab} />;
      // case 1:
      //   return <MassMaintenanceConfigure />;
      case 1:
        return <MassMaintenanceConfigure />;
      case 2:
        return <MassMaintenanceAssembly />;
      case 3:
        return <ViewFormularies />;
      case 4:
        return (
          <MassMaintenanceComplete
            history={this.props.history}
            onClickTab={this.onClickTab}
          />
        );
      default:
        return null;
    }
  };
  render() {
    console.log("propsData", this.props.history);
    const fData = this.props.data;
    return (
      <>
        <MassMaintenanceTop
          formularyTopData={fData}
          onBreadcrumbClick={this.props.onBreadcrumbClick}
        />
        <div className="drug-details-bottom">
          <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          <div className="inner-container">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCompleteTabData: (a) => dispatch(fetchCompleteTabData(a)),
    setSelectedRow: (a) => dispatch(setSelectedRow(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassMaintenance);
