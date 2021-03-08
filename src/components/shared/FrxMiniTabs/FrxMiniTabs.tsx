// React imports
import React from "react";

// Material imports
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Tooltip, Button } from "@material-ui/core";

// Shared models
import { TabInfo } from "../../../models/tab.model";

// Styling imports
import "./FrxMiniTabs.scss";

interface TabProps {
  tabList: TabInfo[];
  activeTabIndex: number;
  onClickTab: (clickedTab: number) => void;
  msgCount?: number;
  disabledIndex?: number;
  disabled?: boolean;
  position?: boolean;
}

interface TabState {}

class FrxMiniTabs extends React.Component<TabProps, TabState> {
  /**
   * @function onClickTab
   * triggered when you switch a tab
   */
  onClickTab = (event: React.ChangeEvent<{}>, clickedTab: number) => {
    this.props.onClickTab(clickedTab);
  };

  render() {
    return (
      <AppBar
        className="frx-mini-tabs-root"
        position={this.props.position ? "sticky" : "fixed"}
      >
        <Tabs
          value={this.props.activeTabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.onClickTab}
          aria-label="tabs"
          className="frx-mini-tabs-root__tabs"
        >
          {this.props.tabList.map((tab: any, index: number) => (
            <Tab
              className="frx-mini-tabs-root__tabs__tab"
              key={tab.id}
              disabled={
                (this.props.disabledIndex === index && this.props.disabled) ||
                tab.disabled
                  ? true
                  : false
              }
              label={
                tab.id === 3 && this.props.msgCount ? (
                  <span className="tabs-with-count">
                    {tab.text.split("(")[0]}
                    <em>{this.props.msgCount}</em>
                  </span>
                ) : (
                  tab.text
                )
              }
            />
          ))}
        </Tabs>
        <div className="frx-mini-tabs-root__active-line" />

        {/* <div className="dev-status wip">
          TODO: 3px white space below the active-line needs to be removed
        </div> */}
      </AppBar>
    );
  }
}

export default FrxMiniTabs;
