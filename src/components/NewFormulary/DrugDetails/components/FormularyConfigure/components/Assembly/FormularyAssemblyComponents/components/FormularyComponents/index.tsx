import React, { Component } from "react";

import SearchBox from "../../../../../../../../../shared/Frx-components/search-box/SearchBox";
import FrxMiniTabs from "../../../../../../../../../shared/FrxMiniTabs/FrxMiniTabs";

import FormularyAssemblyComponentListItem from './../FormularyAssemblyComponentListItem';


interface FormularyComponentsListItemProps {
  data?: any,
  onComponentAdd?: any
  onComponentView?: any
}

interface FormularyComponentsListItemState {

}

class FormularyComponents extends Component<FormularyComponentsListItemProps,FormularyComponentsListItemState> {
  state = {
    tabs: [
      { id: 1, text: "All" },
      { id: 2, text: "Tier" },
      { id: 3, text: "QL" },
      { id: 4, text: "ST" },
      { id: 5, text: "PA" },
      { id: 6, text: "Drug Details" },
    ],
    activeTabIndex: 0,
    componentList: [...this.props.data]
  }
  
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: {id: number, text: string}, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    
    this.setState({ tabs, activeTabIndex });
  };
  
  renderActiveTab = () => {
    const { activeTabIndex, componentList, tabs } = this.state;
    
    if( activeTabIndex === 0) {
      return (
        <div>
          {
            componentList.map((currentComponent, key) => <FormularyAssemblyComponentListItem key={key} index={key} {...currentComponent} onAdd={this.props.onComponentAdd} onView={this.props.onComponentView}/>)
          }
        </div>  
      );
    } else {
      return (
        <div>
          {
            componentList.filter(item => item.tag === tabs[activeTabIndex].text).map((currentComponent, key) => <FormularyAssemblyComponentListItem key={key} index={key} {...currentComponent} onAdd={this.props.onComponentAdd} onView={this.props.onComponentView}/>)
          }
        </div>  
        );
    }
  }
  
  render() {
    const { tabs, activeTabIndex } = this.state;
    return (
      <div className="formulary-components">
        <div className="formulary-components__container">
          <div className="formulary-components__container-header">
            <div className="formulary-components__container-header-title">Components</div>
          </div>
          
          <div className="formulary-components__container-body">
            <div className="formulary-components__container-body-header">  
              <FrxMiniTabs
                tabList={tabs}
                activeTabIndex={activeTabIndex}
                onClickTab={this.onClickTab}
              />
              
              <div className="search-box-container">
                <SearchBox
                  iconPosition="left"
                  className="search-input"
                  placeholder="Search"
                />
              </div>
            </div>
            {
              this.renderActiveTab()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyComponents;
