import React from "react";
import { connect } from "react-redux";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../../../../../models/tab.model";
import LAComponent from "./DrugDetailLA";
import AFComponent from "./DrugDetailAF";
import PBSTComponent from "./DrugDetailPBST";
import PGCComponent from "./DrugDetailPGC";
import MOMNComponent from "./DrugDetailMOMN";
import LISComponent from "./DrugDetailLIS";
import IBFComponent from "./DrugDetailIBF";
import FGCComponent from "./FGC";
import FFFComponent from "./FFF";
import HIComponent from "./HI";
import VBIDComponent from "./VBID";
import CBComponent from "./CB";
import SSMComponent from "./SSM";
import SOComponent from "./SO";
import DrugDetailAL from "../../AL/AL";
import DrugDetailGL from "../../GL/GL";
import DrugDetailICD from "../../ICD/ICD";
import DrugDetailPN from "../../PN/PN";
import DrugDetailPT from "../../PT/PT";
import DrugDetailPOS from "../../POS/POS";
import DrugDetailPR from "../../PR/PR";
import DrugDetailFFF from "../../FFF/FFF";
import DrugDetailOther from "../../Other/Other";

interface drugDetailsState {
  activeTabIndex: number;
  tabs: Array<TabInfo>;
}

const mapStateToProps = (state) => {
  return {
    formulary_lob_id: state?.application?.formulary_lob_id,
    edit_info: state?.application?.formulary?.edit_info,
    designOptions: state?.setupOptions?.designOptions,
    supplemental_benefits: state?.setup?.formulary?.supplemental_benefits,
    supplementalOptions: state?.setupOptions?.supplementalOptions,
    abridged_forumulary_creation: state?.setup?.formulary?.formulary_info?.abridged_forumulary_creation,
  };
};

interface ddTopState {
  activeTabIndex: number,
  tabs: any[],
}

class DrugDetails extends React.Component<any, drugDetailsState> {
  state: ddTopState = {
    activeTabIndex: 0,
    tabs: [],
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

  componentDidMount() {
    let tabs: any[] = [];
    
    if (this.props.formulary_lob_id === 2 || this.props.formulary_lob_id === 3 || this.props.formulary_lob_id === 4) {
      tabs = this.getCommTabData1();
    } else {
      tabs = this.getMedicareTabList();
    }

    this.setState({ tabs });
  }

  getMedicareTabList = () => {
    let tabsData: any[] = [
      {
        id: 1,
        text: "MO/NM"
      },
    ];

    let cTabs = ["IBF", "FGC", "PGC", "FFF", "HI", "VBID", "LIS", "SSM", "SBOTH1", "ExD"];

    // AF TAB
    if(this.props.abridged_forumulary_creation){
      let tempTabOBj = {};
      tempTabOBj['id'] = tabsData.length + 1;
      tempTabOBj['text'] = "AF";
      tabsData.push(tempTabOBj);
    }

    // LA and PBST TAB
    if(this.props.designOptions) {
      let laPbst = this.props.designOptions?.filter(e => (e?.code_value === "LA" || e?.code_value === "PBST"))

      if(laPbst && this.props.edit_info) {
        for(let i=0; i<laPbst.length; i++) {
          let idEdit = laPbst[i]?.id_edit;
          let codeValue = laPbst[i]?.code_value;
          let editInfoList = this.props.edit_info.filter(e => (e?.id_edit === idEdit && e?.id_checked === true));

          if(editInfoList?.length > 0) {
            let tempTabOBj = {};
            tempTabOBj['id'] = tabsData.length + 1;
            tempTabOBj['text'] = codeValue;
            tabsData.push(tempTabOBj);
          }
        }
      }
    }

    if(this.props.supplemental_benefits?.length > 0) {
      for(let i=0; i < this.props.supplemental_benefits.length; i++ ){
        let tempsbId = this.props.supplemental_benefits[i]?.id_supplemental_benefit;

        for(let j=0; j<this.props.supplementalOptions.length; j++) {
          let tempSoId = this.props.supplementalOptions[j]?.id_supplemental_benefit;

          if(tempsbId === tempSoId) {
            let codeValue = this.props.supplementalOptions[j]?.code_value;
            let addTabObj = cTabs.find(e => e === codeValue);
            
            if(addTabObj) {
              let tempTabOBj = {};
              tempTabOBj['id'] = tabsData.length + 1;
              if(codeValue === "ExD") {
                tempTabOBj['text'] = "CB";

              } else if(codeValue === "SBOTH1") {
                tempTabOBj['text'] = "Other";

              } else {
                tempTabOBj['text'] = codeValue;
              }

              tabsData.push(tempTabOBj);
            }
            break;
          }
        }
      }
    }

    return tabsData;
  }

  getCommTabData1 = () => {
    let tabsData: any[] = [];
    let customData: any[] = [];

    let cTabs = ["AL", "GL", "ICDL", "PATRS", "PHNW", "PRTX", "POS", "FFF"];

    if(this.props.edit_info) {
      for(let i=0; i<this.props.edit_info.length; i++) {
        let idEdit = this.props.edit_info[i]?.id_edit;
        let idChecked = this.props.edit_info[i]?.id_checked;

        if(idEdit && idChecked) {
          for(let j=0; j<this.props.designOptions.length; j++) {
            let designIdEdit = this.props.designOptions[j]?.id_edit;
            let designCodeValue = this.props.designOptions[j]?.code_value;
            let isCustom = this.props.designOptions[j]?.is_custom;

            if(cTabs.find(ele => ele === designCodeValue) || isCustom) {
              if(idEdit === designIdEdit) {
                let ddObj = {};
                ddObj['id'] = tabsData.length + 1;

                if(isCustom) {
                  ddObj['text'] = 'Other';

                } else if(designCodeValue === "ICDL") {
                  ddObj['text'] = 'ICD';

                } else if(designCodeValue === "PATRS") {
                  ddObj['text'] = 'PR';

                } else if(designCodeValue === "PHNW") {
                  ddObj['text'] = 'PN';

                } else if(designCodeValue === "PRTX") {
                  ddObj['text'] = 'PT';

                } else {
                  ddObj['text'] = designCodeValue;
                }

                if(isCustom && !customData.find(e => e.text === "Other")){
                  customData.push(ddObj);
                } else if(!isCustom) {
                  tabsData.push(ddObj);
                }
                
                break;
              }
            }
          }
        }
      }
    }
    
    return [...tabsData, ...customData];
  }

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    let tabToRender = this.state.tabs[tabIndex]?.text;

    if (this.props.formulary_lob_id === 2 || this.props.formulary_lob_id === 3 || this.props.formulary_lob_id === 4) {
      switch (tabToRender) {
        case "AL":
          return <DrugDetailAL />;
        case "GL":
          return <DrugDetailGL />;
        case "ICD":
          return <DrugDetailICD />;
        case "PR":
          return <DrugDetailPR />;
        case "PN":
          return <DrugDetailPN />;
        case "PT":
          return <DrugDetailPT />;
        case "POS":
          return <DrugDetailPOS />;
        case "FFF":
          return <DrugDetailFFF />;
        case "Other":
          return <DrugDetailOther />;
      }
    } else {
      switch (tabToRender) {
        case "LA":
          return <LAComponent />;// -- Limited Access Radio Button
        case "MO/NM":
          return <MOMNComponent />;// -- Constant Static
        case "IBF":
          return <IBFComponent />;// -- Checkbox
        case "FGC":
          return <FGCComponent />;// -- Checkbox
        case "PGC":
          return <PGCComponent />;// -- Checkbox
        case "FFF":
          return <FFFComponent />;// -- Checkbox
        case "HI":
          return <HIComponent />;// -- Checkbox
        case "VBID":
          return <VBIDComponent />;// -- Checkbox
        case "CB":
          return <CBComponent />;// -- When Excluded is Selected
        case "LIS":
          return <LISComponent />;// -- Checkbox
        case "PBST":
          return <PBSTComponent />;// -- Radio Button
        case "SSM":
          return <SSMComponent />;// -- Checkbox
        case "AF":
          return <AFComponent />;// -- Radio Button
        case "Other":
          return <SOComponent />;// -- Checkbox
      }
    }
  };

  render() {
    return (
      <>
        <div className="bordered details-top white-bg details-tab-top">
          <div className="header">Drug Details</div>
          <div className="inner-container">
            <div className="configure-mini-tabs">
              <FrxMiniTabs
                tabList={this.state.tabs}
                activeTabIndex={this.state.activeTabIndex}
                onClickTab={this.onClickTab}
              />
            </div>
          </div>
        </div>
        <div className="tabs-info details-tab-bottom-info">{this.renderActiveTabContent()}</div>
      </>
    );
  }
}

export default connect(mapStateToProps)(DrugDetails);
