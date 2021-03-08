import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import { getAdvanceSearchTabNames } from "../../utils/text-labels";
import MemberInfoSearch from "./member-info-search/MemberInfoSearch";
import FormularyInfoSearch from "./formulary-info-search/FormularyInfoSearch";
import PharmacyInfoSearch from "./pharmacy-info-search/PharmacyInfoSearch";
import PrescriberInfoSearch from "./prescriber-info-search/PrescriberInfoSearch";
import TestClaimsInfoSearch from "./test-claim-info-search/TestClaimsInfoSearch";
import ClaimsInfoSearch from "./claims-info-search/ClaimsInfoSearch";
import PaInfoSearch from "./pa-info-search/PaInfoSearch";
import GrievancesInfoSearch from "./grievances-info-search/GrievancesInfoSearch";
import AuthOverridesSearch from "./auths-overrides/AuthOverridesSearch";
import CommunicationsInfoSearch from "./communication-info-search/CommunicationsInfoSearch";
import "./AdvanceSearchContainer.scss";

interface Props {
  onSelect: any;
}
interface State {}

class AdvanceSearchContainer extends Component<Props, State> {
  state = {
    tabs: getAdvanceSearchTabNames(),
    activeTabIndex: 0,
    activePaTab: 0,
    activeCommunicationTab: 0
	};
	
	componentDidMount(){
		this.fetchSerchType();
	}

  onClickTab = e => {
    console.log("search tabClicked", e);
    this.setState({ activeTabIndex: e }, () => {
      this.fetchSerchType();
    });
  };

  fetchSerchType = () => {
    switch (this.state.activeTabIndex) {
      case 0:
        this.props.onSelect("member");
        break;
      case 1:
        this.props.onSelect("");
        break;
      case 2:
        this.props.onSelect("");
        break;
      case 3:
        this.props.onSelect("pharmacy");
        break;
      case 4:
        this.props.onSelect("prescriber");
        break;
      case 5:
        this.props.onSelect("testclaims");
        break;
      case 6:
        this.props.onSelect("claims");
        break;
      case 7:
        console.log(
          "cases PA",
          this.state.activePaTab,
          this.state.activeTabIndex
        );
        if (this.state.activePaTab === 0) this.props.onSelect("pacasesintial");
        else if (this.state.activePaTab === 1)
          this.props.onSelect("pacasesappeals");
        break;
      // case 8: this.props.onSelect('pacasesappeals'); break;
      case 8:
        this.props.onSelect("grievances");
        break;
      case 9:
        this.props.onSelect("authoverrides");
        break;
      case 10:
        console.log(
          "cases Communication",
          this.state.activeCommunicationTab,
          this.state.activeTabIndex
        );
        if (this.state.activeCommunicationTab === 0)
          this.props.onSelect("communicationscall");
        else if (this.state.activeCommunicationTab === 1)
          this.props.onSelect("communicationsdocument");
        else if (this.state.activeCommunicationTab === 2)
          this.props.onSelect("communicationsother");
        break;
      // case 12: this.props.onSelect('communicationscall'); break;
      // case 13: this.props.onSelect('communicationsdocument'); break;
    }
  };

  onMiniTabSelectOnPA = (activePaTab: number) => {
    console.log("switch pa tab");
    this.setState({ activePaTab }, () => {
      this.fetchSerchType();
    });
  };

  onMiniTabSelectOnCommunication = (activeCommunicationTab: number) => {
    console.log("switch comm tab");
    this.setState({ activeCommunicationTab }, () => {
      this.fetchSerchType();
    });
  };
  render() {
    return (
      <div className="advance-search-container">
        <FrxTabs
          tabList={this.state.tabs}
          typeCard={"line"}
          activeTabIndex={this.state.activeTabIndex}
          onClickTab={this.onClickTab}
        />
        <div className="advance-search-types-container">
          {this.state.activeTabIndex === 0 ? <MemberInfoSearch /> : null}
          {this.state.activeTabIndex === 1 ? <FormularyInfoSearch /> : null}
          {this.state.activeTabIndex === 3 ? <PharmacyInfoSearch /> : null}
          {this.state.activeTabIndex === 4 ? <PrescriberInfoSearch /> : null}
          {this.state.activeTabIndex === 5 ? <TestClaimsInfoSearch /> : null}
          {this.state.activeTabIndex === 6 ? <ClaimsInfoSearch /> : null}
          {this.state.activeTabIndex === 7 ? (
            <PaInfoSearch
              activeMiniTabIndex={this.state.activePaTab}
              onMiniTabSelect={this.onMiniTabSelectOnPA}
            />
          ) : null}
          {this.state.activeTabIndex === 8 ? <GrievancesInfoSearch /> : null}
          {this.state.activeTabIndex === 9 ? <AuthOverridesSearch /> : null}
          {this.state.activeTabIndex === 10 ? (
            <CommunicationsInfoSearch
              activeMiniTabIndex={this.state.activeCommunicationTab}
              onMiniTabSelect={this.onMiniTabSelectOnCommunication}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default AdvanceSearchContainer;
