import React, { Component } from "react";
import { connect } from "react-redux";
import FormularyDetailsTop from "../NewFormulary/DrugDetails/components/FormularyDetailsTop/FormularyDetailsTop";
import { getFormularyDetails } from "../../mocks/formulary/formularyDetails";
import { TabInfo } from "../../models/tab.model";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import DrugDetails from "../NewFormulary/DrugDetails/components/FormularyConfigure/components/DrugDetails";

import "./MarketingMaterial.scss";
import HmpsSubmissionTable from "./hmpsSubmissionTable/hmpsSubmissionTable";
import StandardReporting from "./StandardReporting/StandardReporting";
import MarketingMaterialSearch from "./MarketingMaterial/MarketingMaterialSearch";

interface formularyTopData {
  effectiveDate: string;
  formularyID: number;
  formularyName: string;
  terminationDate: string;
}

const medTabs = [
  { id: 1, text: "HPMS SUBMISSION FILES (EXPORT)", name: "hpms" },
  {
    id: 2,
    text: "MARKETING MATERIALS & FORMULARY SEARCH TOOL",
    name: "search",
  },
  { id: 3, text: "STANDARD REPORTING", name: "report" },
];

const tabs = [
  {
    id: 1,
    text: "MARKETING MATERIALS & FORMULARY SEARCH TOOL",
    name: "search",
  },
  { id: 2, text: "STANDARD REPORTING", name: "report" },
];

class MarketingMaterial extends Component<any, any> {
  state = {
    formularyLobId: 0,
    activeTabIndex: 0,
    showTabs: true,
    showDrugDetails: false,
  };

  componentDidMount() {
    let formularyLobId: number = 0;
    let currentTabs = tabs;
    if (this.props?.formularyMeta?.formulary !== null) {
      formularyLobId = this.props?.formularyMeta?.formulary_lob_id;
    }
    const uriName: string = this.props.match.params.name;
    if (formularyLobId && formularyLobId === 1) currentTabs = medTabs;
    const includes = currentTabs.filter((tab) => tab.name === uriName);
    let activeTabIndex = 0;
    if (includes.length === 1) {
      activeTabIndex = includes[0].id - 1;
    }
    this.setState({
      formularyLobId,
      activeTabIndex,
    });
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    let currentTabs = tabs;
    // TODO - To be fixed.
    // if (this.state.formularyLobId === 1) currentTabs = medTabs;
    currentTabs.forEach((tab, index: number) => {
      if (index === selectedTabIndex) {
        this.props.history.push(`/formulary/marketing/${tab.name}`);
        activeTabIndex = index;
      }
    });
    this.setState({ activeTabIndex });
  };

  drugDetailsClickHandler = () => {
    this.setState({
      showTabs: !this.state.showTabs,
      showDrugDetails: !this.state.showDrugDetails,
    });
  };

  renderActiveTabContentMedicare = () => {
    switch (this.state.activeTabIndex) {
      case 0:
        return <HmpsSubmissionTable />;
      case 1:
        return <MarketingMaterialSearch />;
      case 2:
        return <StandardReporting />;
      default:
        break;
    }
  };

  renderActiveTabContent = () => {
    if (this.state.activeTabIndex === 0) return <MarketingMaterialSearch />;
    else if (this.state.activeTabIndex === 1) return <StandardReporting />;
  };

  render() {
    const { formularyLobId } = this.state;
    return (
      <div>
        <div
          style={{ marginLeft: "60px", marginRight: "60px", marginTop: "30px" }}
          className="FormularyHeading"
        >
          <FormularyDetailsTop
            formularyTopData={getFormularyDetails()}
            {...this.props}
          />
        </div>
        <div className="formularyBody">
          <div className="formulary-root">
            {this.state.showTabs ? (
              <>
                <FrxTabs
                  tabList={
                    formularyLobId && formularyLobId !== 1 ? tabs : medTabs
                  }
                  activeTabIndex={this.state.activeTabIndex}
                  onClickTab={this.onClickTab}
                />
                <div className="formulary-tabs-info">
                  {formularyLobId && formularyLobId !== 1
                    ? this.renderActiveTabContent()
                    : this.renderActiveTabContentMedicare()}
                </div>
              </>
            ) : (
              this.state.showDrugDetails && <DrugDetails />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    formularyMeta: state.application,
  };
};

const mapActions = (dispatch) => {
  return {
    // getValidationList: (formularyId) =>
    //   dispatch(getValidationList(formularyId)),
  };
};

export default connect(mapState, mapActions)(MarketingMaterial);
