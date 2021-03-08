import React from "react";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../../../../../models/tab.model";
import { getStTabs } from "../../../../../../mocks/formulary/mock-data";
import StepTherpay from "./StepTherapy";
import GPM from "./GPM";

interface drugDetailsState {
  activeTabIndex: number;
  tabs: Array<TabInfo>;
}

export default class StepTherpayDetails extends React.Component<any, drugDetailsState> {
  state = {
    activeTabIndex: 0,
    tabs: getStTabs(),
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
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <GPM />;
      case 1:
        return <StepTherpay />;
      case 2:
        return <div>IBF</div>;
    }
  };
  render() {
    return (
      <>
        <div className="details-top">
          <div className="configure-mini-tabs">
            <FrxMiniTabs
              tabList={this.state.tabs}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
          </div>
          <div className="tabs-info">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}
