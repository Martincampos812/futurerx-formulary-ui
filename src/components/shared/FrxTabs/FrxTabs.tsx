// React imports
import React from "react";

// Material imports
import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import { Tooltip, Button } from "@material-ui/core";
import { Tabs, Tooltip } from "antd";

// Shared models
import { TabInfo } from "../../../models/tab.model";

// Styling imports
import "./FrxTabs.scss";

const { TabPane } = Tabs;

interface TabProps {
  tabList: TabInfo[];
  activeTabIndex: number;
  // activeKey?:
  typeCard?: any;
  count?: number;
  countIndex?: number;
  onClickTab: (clickedTab: number) => void;
}

interface TabState {}

class FrxTabs extends React.Component<TabProps, TabState> {
  /**
   * @function onClickTab
   * triggered when you switch a tab
   */
  onClickTab: any = (clickedTab: number) => {
    this.props.onClickTab(clickedTab - 1);
    // console.log("[clickedTab frxTab]:", clickedTab);
  };

  render() {
    // console.log(this.props.typeCard);
    // console.log("[activeTabIndex]:", this.props.activeTabIndex);
    return (
      <AppBar className="frx-tabs-root">
        <Tabs
          onChange={this.onClickTab}
          type={this.props.typeCard !== undefined ? this.props.typeCard : "card"}
          defaultValue={this.props.activeTabIndex}
          className={this.props.typeCard !== undefined ? "frx-tabs-root-line" : "frx-tabs-root-card"}
          activeKey={String(this.props.activeTabIndex + 1)}
          aria-label="tabs"
        >
          {this.props.tabList.map((tab: any, index: number) => (
            <TabPane
              disabled={tab.disable === true}
              key={tab.id}
              tab={
                this.props.countIndex === index && this.props.count ? (
                  <span className="tabs-with-count" title={tab.tooltip}>
                    {tab.text} <em>{this.props.count}</em>
                  </span>
                ) : (
                  <Tooltip placement="bottom" title={tab.tooltip} color={"#ffffff"}>
                    <span>{tab.text}</span>
                  </Tooltip>
                )
              }
            />
          ))}
        </Tabs>
        <div className="dev-status wip">TODO: 3px white space below the active-line needs to be removed</div>
      </AppBar>
    );
  }
}

export default FrxTabs;
