import React from "react";
import "./MemberCostshare.scss";

// Material-layout //
import Grid from "@material-ui/core/Grid";

// React components //
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../models/tab.model";
import { getMemberCostshareTabNames } from "../../mocks/MemberCostshare";
import DeductibleStage from "./Components/DeductibleStage";
import IntialCoverageStage from "./Components/IntialCoverageStage";
import CoverageGap from "./Components/CoverageGapStage";
import CatstrophicStage from "./Components/CatstrophicStage";
import NotesPopup from "../member/MemberNotesPopup";

class MemberCostshare extends React.Component {
  state = {
    tabs: getMemberCostshareTabNames(),
    activeTabIndex: 0,
    isNotesOpen: false
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

  openNotesDialog = () => {
    console.log("invoked member cost share");
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  render() {
    const deductible: any[] = [
      {
        deductibleBrandName:
          "[insert if applicable: brand name OR [tier name(s)]]",
        deductibleAmount: "$[insert deductible amount]",
        deductibleInfo:
          "[insert if applicable: brand name OR [tier name(s)]] drugs ($[insert deductible amount] is the amount of your [insert if applicable: brand name OR [tier name(s)]] deductible)."
      }
    ];
    const intialCoverageStage: any[] = [
      {
        coverageTierName: "[insert if applicable: generic OR [tier name(s)]]",
        covergePayment:
          "[insert as applicable: “total drug costs” (your payments plus any Part D plan’s payments) total $[insert initial coverage limit]. OR “out-of-pocket costs” (your payments) reach $[insert YYYY out-of-pocket threshold].]",
        covergeAmount:
          "[insert as applicable: copayment OR coinsurance amount OR copayment or coinsurance amount]",
        covergeThreshold: "$[insert YYYY out-of-pocket threshold]"
      }
    ];
    const coverageGap: any[] = [
      {
        genericCoverage:
          "[plans should briefly describe generic coverage. E.g., either a $10 copayment or 25% of the costs, whichever is lower].",
        coverageThreshold: "$[insert YYYY out-of-pocket threshold.]"
      }
    ];
    const catstrophicStage: any[] = [
      {
        catstrophicMove:
          "$[insert as applicable: Initial Coverage Stage OR Coverage Gap Stage]",
        catstrophicThreshold: "$[insert YYYY. out-of-pocket threshold]",
        catstrophicBenefits:
          "[insert appropriate option for your catastrophic cost-sharing based on Benefits]",
        catstrophicCostSharingOption1:
          "$[Insert YYYY catastrophic cost-sharing amount for generics/preferred multisource drugs from Benefits]",
        catstrophicOtherCostSharing:
          "$[insert YYYY catastrophic cost-sharing amount for all other drugs from Benefits]",
        catstrophicCostSharingOption2:
          "[Insert appropriate tiered cost-sharing amounts from Benefits].",
        catastrophicCostShareDesc:
          "[If plan provides coverage for excluded drugs as a supplemental benefit, insert a description of cost-sharing in the Catastrophic Coverage Stage.]"
      }
    ];
    return (
      <div className="member-costshare-root">
        <Grid className="member-costshare-root__header" container xs={12}>
          <Grid item sm={11}>
            <h4 className="member-costshare-root__header--heading">
              Member Cost Share
            </h4>
          </Grid>
          <Grid item sm={1}>
            <svg
              onClick={this.openNotesDialog}
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="member-costshare-root__header--noteicon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                fill="#2055B5"
              />
            </svg>
            {this.state.isNotesOpen ? (
              <NotesPopup
                category="Member Cost Share"
                openPopup={this.state.isNotesOpen}
                onClose={this.openNotesDialog}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <>
          <div className="member-costshare-root__mini-tab">
            <FrxMiniTabs
              tabList={this.state.tabs}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
          </div>
          <>
            {this.state.activeTabIndex === 0 ? (
              <>
                <DeductibleStage deductible={deductible} />
              </>
            ) : this.state.activeTabIndex === 1 ? (
              <>
                <IntialCoverageStage
                  intialCoverageStage={intialCoverageStage}
                />
              </>
            ) : this.state.activeTabIndex === 2 ? (
              <>
                <CoverageGap coverageGap={coverageGap} />
              </>
            ) : this.state.activeTabIndex === 3 ? (
              <>
                <CatstrophicStage catstrophicStage={catstrophicStage} />
              </>
            ) : (
              ""
            )}
          </>
        </>
      </div>
    );
  }
}

export default MemberCostshare;
