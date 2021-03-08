// React imports
import React from "react";

// Material imports
import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import { Tooltip, Button } from "@material-ui/core";
import { Tabs } from "antd";

// Shared models
import { TabInfo } from "../../../models/tab.model";

// Styling imports
import "./ClaimResultTab.scss";

const { TabPane } = Tabs;

interface TabProps {
  tabList: TabInfo[];
  activeTabIndex: number;
  typeCard?: any;
  onClickTab: (clickedTab: number) => void;
}

interface TabState {}

class ClaimResultTab extends React.Component<TabProps, TabState> {
  /**
   * @function onClickTab
   * triggered when you switch a tab
   */
  onClickTab: any = (clickedTab: number) => {
    this.props.onClickTab(clickedTab - 1);
  };

  render() {
    console.log(this.props.typeCard, this.props.activeTabIndex);

    return (
      <>
        {/* <div className="_claim-root-note-icon">
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cd-history-root__header__icon-container__note-icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
              fill="#2055B5"
            />
          </svg>
        </div> */}
        <AppBar position="static" className="frx-claims-tabs-root">
          <Tabs
            onChange={this.onClickTab}
            type={
              this.props.typeCard !== undefined ? this.props.typeCard : "card"
            }
            defaultValue={this.props.activeTabIndex}
            activeKey={this.props.activeTabIndex + 1 + ""}
            className={
              this.props.typeCard !== undefined
                ? "frx-tabs-root-line"
                : "frx-tabs-root-card"
            }
            aria-label="tabs"
          >
            {this.props.tabList.map((tab: TabInfo) => (
              <TabPane key={tab.id} tab={tab.text} />
            ))}
          </Tabs>

          <div className="dev-status wip">
            TODO: 3px white space below the active-line needs to be removed
          </div>
        </AppBar>
      </>
    );
  }
}

export default ClaimResultTab;
