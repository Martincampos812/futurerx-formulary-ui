import React, { Component } from "react";
import ClaimResultGrid from "./ClaimResultGrid/ClaimResultGrid";
import { Container, Button, Grid } from "@material-ui/core";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import {
  claimTransactionAccorLabels,
  getClaimsResultModalFolderTabData,
  getClaimModalTransactionMiniTabData,
} from "../../mocks/ClaimGridModelMock";
import { getClaimModalMiniTabData } from "../../mocks/ClaimGridModelMock";
import { TabInfo } from "../../models/tab.model";

import "./ClaimsResult.scss";

interface Props {
  firstClaim: {};
  secondClaim: {};
  handleNewTestClaim: any;
}

interface State {
  isResultDailogOpen: boolean;
  isFliped: boolean;
  activeTabIndex: number;
  folderTabs: any;
  details: {};
  // Claim Details
  detailsMiniTab: any[];
  detailsActiveTabIndex: number;
  // Claim Transaction
  transactionBlocks: any[];
  transactionMiniTab: any[];
  transactionActiveTabIndex: number;
  transactionShowButton: boolean;
}

class ClaimsResult extends Component<Props, State> {
  state = {
    isResultDailogOpen: false,
    isFliped: true,
    activeTabIndex: 0,
    folderTabs: getClaimsResultModalFolderTabData(),
    details: {},

    // Claim Details
    detailsMiniTab: getClaimModalMiniTabData(),
    detailsActiveTabIndex: 0,

    // Claim Transaction
    transactionBlocks: claimTransactionAccorLabels,
    transactionMiniTab: getClaimModalTransactionMiniTabData(),
    transactionActiveTabIndex: 0,
    transactionShowButton: true,
  };

  handleOpen = () => this.state.isResultDailogOpen;
  handleClose = () => {};
  handleFlip = () => {
    this.setState({
      isFliped: !this.state.isFliped,
    });
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const newFolderTabs = this.state.folderTabs.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabIndex = index;
        }
        return tab;
      }
    );
    this.setState({ folderTabs: newFolderTabs, activeTabIndex });
  };

  // *** START OF CLAIM DETAILS *** //
  detailsOnClickMiniTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    console.log("active: " + activeTabIndex + " selected: " + selectedTabIndex);
    const folderTabs = this.state.detailsMiniTab.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabIndex = index;
        }
        return tab;
      }
    );
    this.setState({
      detailsMiniTab: folderTabs,
      detailsActiveTabIndex: activeTabIndex,
    });
  };
  // *** END OF CLAIM DETAILS *** //

  // *** START OF CLAIM TRANSACTION *** //
  transactionOnClickMiniTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    const folderTabs = this.state.transactionMiniTab.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabIndex = index;
        }
        return tab;
      }
    );
    this.setState({
      transactionMiniTab: folderTabs,
      transactionActiveTabIndex: activeTabIndex,
    });
  };

  toggle = (id) => {
    this.setState((prevState) => {
      const index = prevState.transactionBlocks.findIndex(
        (item) => item.id == id
      );
      prevState.transactionBlocks[index].expanded = !prevState
        .transactionBlocks[index].expanded;
      return {
        transactionBlocks: prevState.transactionBlocks,
      };
    });
  };

  toggleExpand = (expand) => {
    this.setState((prevState) => {
      const blocks = prevState.transactionBlocks.map((item) => {
        item.expanded = expand;
        return item;
      });
      return {
        transactionBlocks: blocks,
      };
    });
    this.setState({
      transactionShowButton: !this.state.transactionShowButton,
    });
  };
  // *** END OF CLAIM TRANSACTION *** //
  // componentDidMount() {
  //   const tabsArr = getClaimsResultModalFolderTabData();
  //   this.setState({
  //     folderTabs: tabsArr,
  //     // folderTabs: getClaimsResultModalFolderTabData(),
  //   });
  // }

  render() {
    const { isResultDailogOpen, isFliped } = this.state;

    const firstClaim = this.props.firstClaim;
    const secondClaim = this.props.secondClaim;

    return (
      <>
        {/* {isFliped ? ( */}
        <ScrollSync className="main-container">
          <div className="claims-result-root">
            <ScrollSyncPane>
              <div className="compare-section scroll-bar">
                <ClaimResultGrid
                  data={isFliped ? firstClaim : secondClaim}
                  isOpen={isResultDailogOpen}
                  onClose={this.handleClose}
                  onFlip={this.handleFlip}
                  topResult={isFliped ? isFliped : !isFliped}
                  folderTabs={this.state.folderTabs}
                  activeTabIndex={this.state.activeTabIndex}
                  onTabClick={this.onClickTab}
                  detailsMiniTab={this.state.detailsMiniTab}
                  detailsActiveTabIndex={this.state.detailsActiveTabIndex}
                  transactionBlocks={this.state.transactionBlocks}
                  transactionMiniTab={this.state.transactionMiniTab}
                  transactionActiveTabIndex={
                    this.state.transactionActiveTabIndex
                  }
                  transactionShowButton={this.state.transactionShowButton}
                  handleDetailsMinitabClick={this.detailsOnClickMiniTab}
                  handleTransactionMinitabClick={this.transactionOnClickMiniTab}
                  handleTransactionExpandAllToggle={this.toggleExpand}
                  handleTransactionExpandToggle={this.toggle}
                  handleNewTestClaim={this.props.handleNewTestClaim}
                />
              </div>
            </ScrollSyncPane>
            <div className="div-rectangle"> </div>
            <ScrollSyncPane>
              <div className="compare-section scroll-bar">
                <ClaimResultGrid
                  data={isFliped ? secondClaim : firstClaim}
                  isOpen={isResultDailogOpen}
                  onClose={this.handleClose}
                  onFlip={this.handleFlip}
                  topResult={isFliped ? !isFliped : isFliped}
                  folderTabs={this.state.folderTabs}
                  activeTabIndex={this.state.activeTabIndex}
                  onTabClick={this.onClickTab}
                  detailsMiniTab={this.state.detailsMiniTab}
                  detailsActiveTabIndex={this.state.detailsActiveTabIndex}
                  transactionBlocks={this.state.transactionBlocks}
                  transactionMiniTab={this.state.transactionMiniTab}
                  transactionActiveTabIndex={
                    this.state.transactionActiveTabIndex
                  }
                  transactionShowButton={this.state.transactionShowButton}
                  handleDetailsMinitabClick={this.detailsOnClickMiniTab}
                  handleTransactionMinitabClick={this.transactionOnClickMiniTab}
                  handleTransactionExpandAllToggle={this.toggleExpand}
                  handleTransactionExpandToggle={this.toggle}
                  handleNewTestClaim={this.props.handleNewTestClaim}
                />
              </div>
            </ScrollSyncPane>
          </div>
        </ScrollSync>
        {/* ) : (
          <ScrollSync className="main-container">
            <div className="claims-result-root">
              <ScrollSyncPane>
                <div className="compare-section scroll-bar">
                  <ClaimResultGrid
                    data={secondClaim}
                    isOpen={isResultDailogOpen}
                    onClose={this.handleClose}
                    onFlip={this.handleFlip}
                    topResult={true}
                    folderTabs={this.state.folderTabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onTabClick={this.onClickTab}
                    detailsMiniTab={this.state.detailsMiniTab}
                    detailsActiveTabIndex={this.state.detailsActiveTabIndex}
                    transactionBlocks={this.state.transactionBlocks}
                    transactionMiniTab={this.state.transactionMiniTab}
                    transactionActiveTabIndex={
                      this.state.transactionActiveTabIndex
                    }
                    transactionShowButton={this.state.transactionShowButton}
                    handleDetailsMinitabClick={this.detailsOnClickMiniTab}
                    handleTransactionMinitabClick={
                      this.transactionOnClickMiniTab
                    }
                    handleTransactionExpandAllToggle={this.toggleExpand}
                    handleTransactionExpandToggle={this.toggle}
                    handleNewTestClaim={this.props.handleNewTestClaim}
                  />
                </div>
              </ScrollSyncPane>
              <div className="div-rectangle"> </div>
              <ScrollSyncPane>
                <div className="compare-section scroll-bar">
                  <ClaimResultGrid
                    data={firstClaim}
                    isOpen={isResultDailogOpen}
                    onClose={this.handleClose}
                    onFlip={this.handleFlip}
                    topResult={false}
                    folderTabs={this.state.folderTabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onTabClick={this.onClickTab}
                    detailsMiniTab={this.state.detailsMiniTab}
                    detailsActiveTabIndex={this.state.detailsActiveTabIndex}
                    transactionBlocks={this.state.transactionBlocks}
                    transactionMiniTab={this.state.transactionMiniTab}
                    transactionActiveTabIndex={
                      this.state.transactionActiveTabIndex
                    }
                    transactionShowButton={this.state.transactionShowButton}
                    handleDetailsMinitabClick={this.detailsOnClickMiniTab}
                    handleTransactionMinitabClick={
                      this.transactionOnClickMiniTab
                    }
                    handleTransactionExpandAllToggle={this.toggleExpand}
                    handleTransactionExpandToggle={this.toggle}
                    handleNewTestClaim={this.props.handleNewTestClaim}
                  />
                </div>
              </ScrollSyncPane>
            </div>
          </ScrollSync>
        )} */}
      </>
    );
  }
}

export default ClaimsResult;
