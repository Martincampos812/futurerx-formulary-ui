import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import FormularyExpandedGeneralDetails from "./FormularyExpandedGeneralDetails";
// import FormularyExpandedFormularyDesignlDetails from "./FormularyExpandedFormularyDesignlDetails";
import FormularyExpandedFormularyDesignlDetails from "../../../FormularyExpandedDetails/DesignInfo";
import FormularyExpandedTiersDetails from "../../../FormularyExpandedDetails/Tiers";
// import FormularyExpandedTiersDetails from "./FormularyExpandedTiersDetails";
import { getDesignOptions } from "../../../../redux/slices/formulary/setup/setupOptionsService";
import { getTierOptions } from "../../../../redux/slices/formulary/setup/setupOptionsService";
import getClassificationName from "../../Utils/FormularyClassificationUtils";
import getSubmissionMonth from "../../Utils/SubmissionMonthUtils";
import { getformulary } from "../../../../redux/slices/formulary/setup/setupService";

const miniTabs = [
  { id: 1, text: "General" },
  { id: 3, text: "Formulary Design"},
  { id: 4, text: "Tiers"},
];

export default class FormularyExpandedDetails extends React.Component<any,any> {
  state = {
    activeMiniTabIndex: 0,
    formularyType: '',
    formularyName: '',
    formularyAbbrevation: '',
    methodofFormularyBuild:'Y',
    effectiveDate:'',
    serviceYear: '',
    formularyDescription: '',
    formularyClassificationSystem: '',
    formularySubmissionMonth: '',
    designOptions: [],
    tiersOptions: [],
    edit_info: [],
    tiers: []
  };
  fetchFormulary = async () => {
    try {
      let formularyData = await getformulary(this.props.data.formularyId);
      if(formularyData.formulary_info){
        this.setState({
          formularyType: this.props.data.lob,
          formularyName: this.props.data.fromularyName,
          formularyAbbrevation: formularyData.formulary_info.abbreviation ===  null ? '' : formularyData.formulary_info.abbreviation,
          methodofFormularyBuild: formularyData.formulary_info.formulary_build_method,
          effectiveDate: formularyData.formulary_info.effective_date,
          serviceYear: this.props.data.serviceYear,
          formularyDescription: formularyData.formulary_info.formulary_description,
          formularyClassificationSystem: getClassificationName(formularyData.formulary_info.id_classification_system),
          formularySubmissionMonth: formularyData.formulary_info.id_submission_month === null ? '' : getSubmissionMonth(formularyData.formulary_info.id_submission_month),
          edit_info: formularyData.edit_info,
          tiers: formularyData.tiers
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchGenDesignOptions = async () => {
    try {
      const lob_id = this.props.data.lob === 'Commercial' ? 6 : this.props.data.lob === 'Medicare' ? 1 : 1;
      let formularyData = await getDesignOptions(lob_id,this.props.data.formularyId);
      if(formularyData){
        this.setState({
          designOptions: [...formularyData]
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchGenTiersOptions = async () => {
    try{
      const lob_id = this.props.data.lob === 'Commercial' ? 6 : this.props.data.lob === 'Medicare' ? 1 : 1;
      let formularyData = await getTierOptions(lob_id,this.props.data.formularyId,0);
      if(formularyData){
        this.setState({
          tiersOptions: [...formularyData]
        })
      }
    } catch(err) {
      console.log(err)
    }
  }
  componentDidMount(){
    if(this.props.data){
      this.fetchFormulary();
      this.fetchGenDesignOptions();
      this.fetchGenTiersOptions();
    }
  }
  renderActiveTabContent = () => {
    switch (this.state.activeMiniTabIndex) {
      case 0:
        return (
          <FormularyExpandedGeneralDetails
            formularyToggle={this.props.formularyToggle}
            rowData={this.props.data}
          />
        );
      case 1:
        return <FormularyExpandedFormularyDesignlDetails designOptions={this.state.designOptions} edit_info={this.state.edit_info}/>;
      case 2:
        return <FormularyExpandedTiersDetails tiers={this.state.tiers} tiersOptions={this.state.tiersOptions}/>
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="formulary-expanded-details custom-formulary-expanded-details">
        {/* <Paper elevation={0}> */}
          <div className="formulary-expanded-details__container">
            <div className="formulary-expanded-details-right">
              <div className="formulary-expanded-details-right__tabs">
                <FrxMiniTabs
                  tabList={miniTabs}
                  activeTabIndex={this.state.activeMiniTabIndex}
                  onClickTab={(selectedTabIndex) =>
                    this.setState({ activeMiniTabIndex: selectedTabIndex })
                  }
                />
              </div>
              {this.renderActiveTabContent()}
            </div>
          </div>
        {/* </Paper> */}
      </div>
    );
  }
}
