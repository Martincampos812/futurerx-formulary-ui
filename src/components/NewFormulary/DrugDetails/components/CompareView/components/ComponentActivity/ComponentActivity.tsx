import React from "react";
import { TabInfo } from "../../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Activity from "./Activity";
import ActivityGridConflictDetail from "./ActivityGridConflictDetail";
import "./ComponentActivity.scss";

const tabs = [
    { id: 1, text: "Activity" },
    { id: 2, text: "Conflict" },
  ];


export default class ComponentActivity extends React.Component<any, any> {

    state = {
        tabs: tabs,
        activeTabIndex: 0,
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
            return <Activity />;
          case 1:
            return <ActivityGridConflictDetail />;
        }
      };
  render() {
    return (
        <div className="component-activity-container">
           <FrxMiniTabs
                tabList={this.state.tabs}
                activeTabIndex={this.state.activeTabIndex}
                onClickTab={this.onClickTab}
                disabled={this.props.configureSwitch}
            />
            <div className="white-bg">
                {this.renderActiveTabContent()}
            </div>
        </div>
    );
  }
}
