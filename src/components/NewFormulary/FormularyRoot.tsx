import React from "react";
import { withRouter } from "react-router";
import { TabInfo } from "../../models/tab.model";
import Formulary from "./NewFormulary";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import { Switch, Route } from "react-router-dom";

const tabs = [
  { id: 1, text: "Formulary" },
  { id: 2, text: "Formulary Components" },
  { id: 3, text: "Formulary Benefits" },
];

class FormularyRoot extends React.Component<any, any> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    this.props.history.push("/");
    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        if (selectedTabIndex === 1) {
          this.props.history.push('/components');
        }else if(selectedTabIndex === 2){
          this.props.history.push('/benefits');
        }
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };
  componentDidMount(){
    console.log(this.props)
  }
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <Formulary {...this.props} />;
      case 1:
        return <div>Formulary Components</div>;
      case 2:
        return <div>Formulary Benefits</div>;
    }
  };

  render() {
    return (
      <>
        <div className="formulary-root">
          {/* <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          /> */}
          <div className="formulary-inner-content-wrapper">
            <Route
              exact
              path={["/", "/formulary", "/formulary/mass-maintenance", "/formulary/alternatives"]}
              render={(props) => <>{this.renderActiveTabContent()}</>}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FormularyRoot);
