import { Card } from "@material-ui/core";
import React from "react";
import { TabInfo } from "../../../models/tab.model";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import "./PrescriberTabbedView.scss";
import TabDemographics from "./PrescriberTabComponents/TabDemographics";
import TabPharmacyDemographics from "./PrescriberTabComponents/TabPharmacyDemographics";
import TabSpeciality from "./PrescriberTabComponents/TabSpeciality";
import TabLicensure from "./PrescriberTabComponents/TabLicensure";
import TabDispensedDrug from "./PrescriberTabComponents/TabDispensedDrug";

interface Props {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  onTabChange: (selectedTab: number) => void;
  prescriberTabDemography?: any;
  prescriberTabSpeciality?: any;
  prescriberTabLicensure?: any
  filteredData?: any;
  columns?: any;
  isFetchingData?: any;
  handleSearch?: any
}

interface State {
  selectedMiniTabIndex: number;
}

const top5MiniTab = [
  {
    id: 1,
    text: "Overall"
  },
  {
    id: 2,
    text: "Brand"
  },
  {
    id: 3,
    text: "Generic"
  },
  {
    id: 4,
    text: "Narcotics"
  },
]
class PrescriberTabbedView extends React.Component<
Props, 
State
>{
  state = {
    selectedMiniTabIndex: 0
  }


  onClickTab = (selectedTabIndex: number) => {
    this.props.onTabChange(selectedTabIndex);
  };

  onClickMiniTab = (selectedTabIndex: number) => {
    this.setState({
      selectedMiniTabIndex: selectedTabIndex
    })
  }
  renderMiniTabs = () => {
    return (
      <FrxMiniTabs
        tabList={top5MiniTab}
        activeTabIndex={this.state.selectedMiniTabIndex}
        onClickTab={this.onClickMiniTab}
      />
    );
  };

  renderActiveTabContent = () => {
    const index = this.props.activeTabIndex;
    const total = this.props.tabs.length;
    if (total === 3) {
      switch (index) {
        case 0:
          return (
            <div className="prescriber-tabbed-view-root__content">
              {/* PRESCRIBER DEMOGRAPHICS CARD */}
              {this.props.prescriberTabDemography.type === "Prescriber" ? (
              <TabDemographics prescriberTabDemography={this.props.prescriberTabDemography} />
              ) : this.props.prescriberTabDemography.type === "Pharmacy" ? (
                <TabPharmacyDemographics prescriberTabDemography={this.props.prescriberTabDemography} />
              ):""}
            </div>
          );
        case 1:
          return (
            <div className="prescriber-tabbed-view-root__content">
              {/* PRESCRIBER SPECIALITY CARD */}
             <TabSpeciality prescriberTabSpeciality={this.props.prescriberTabSpeciality}/>
            </div>
          );
        case 2:
          return (
            <div className="prescriber-tabbed-view-root__content">
              {/* PRESCRIBER STATE LICENSURE CARD */}
              <TabLicensure prescriberTabLicensure={this.props.prescriberTabLicensure}/>
            </div>
          );
        default:
          return;
      }
    } else if (total === 4 || 2) {
      switch (index) {
        case 0:
          return (
            <div className="prescriber-tabbed-view-root__content">
              {/* Top 5 inferred dispensed drugs */}
              {this.renderMiniTabs()}
              <TabDispensedDrug 
              filteredData={this.props.filteredData}
              columns={this.props.columns}
              isFetchingData={this.props.isFetchingData}
              handleSearch={this.props.handleSearch}
              />
            </div>
          );
        case 1:
          return (
            <div className="prescriber-tabbed-view-root__content">
              Top 5 inferred diseased states
            </div>
          );
        case 2:
          return (
            <div className="prescriber-tabbed-view-root__content">
              Top 5 highest cost drugs
            </div>
          );
        case 3:
          return (
            <div className="prescriber-tabbed-view-root__content">
              Top 5 plan utilization
            </div>
          );
        default:
          return;
      }
    }
  };

  render() {
    console.log(this.props.prescriberTabDemography )
    return (
      <React.Fragment>
        <Card variant="outlined" className="prescriber-tabbed-view-root">
          <FrxTabs
            tabList={this.props.tabs}
            activeTabIndex={this.props.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          {this.renderActiveTabContent()}
        </Card>
      </React.Fragment>
    );
  }
}

export default PrescriberTabbedView;
