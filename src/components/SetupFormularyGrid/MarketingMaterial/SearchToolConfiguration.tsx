import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import React, { Component } from "react";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion";
import "./SearchToolConfiguration.scss";
import "../../NewFormulary/MassMaintenance/setup/MassMaintenanceSetup.scss";
import { Input } from "antd";
import RadioButton from "../../shared/Frx-components/radio-button/RadioButton";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorButton from "react-froala-wysiwyg/FroalaEditorButton";
import Button from "../../shared/Frx-components/button/Button";
import {fetchstc} from "../../../redux/slices/formulary/SearchToolConfiguration/stcSlice";
import {fetchheader} from '../../../redux/slices/formulary/SearchToolConfiguration/headerslice';
const mapStateToProps = (state) => {
  //console.log("***** DB");
  //console.log(state);
  return {
    drug_display_count: state?.SearchToolConfiguration?.stc_list,
  
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchstc: (a) => dispatch(fetchstc(a)),
    fetchheader:(a)=>dispatch(fetchheader(a)),
  };
}

class SearchToolConfiguration extends React.Component<any, any> {
  
  state = {
    headerModel: "",
    MedicationLogic:'',
    saveMedicationLogic:"",
    FormularyAlt:"",
    saveFormularyAlt:"",
    saveHeaderModel: "",
    footerModel: "",
    saveFooterModel: "",
  };
 
  handleHeaderModelChange = (model) => {
    this.setState({
      headerModel: model,
    });
  };

  
    

  saveOnClickMedicationLogicBtn=(e)=>{
    e.preventDefault();
  this.setState({

    MedicationLogic:this.state.MedicationLogic,
    
  });
  
  this.props.fetchstc({
    drug_display_count:JSON.parse(this.state.MedicationLogic),
    alternative_medication_id:24,
    base_formulary_id: 2755,
    drug_display: "L",
    drug_display_type: "FOR",}
  );
 
 
};


  saveOnClickFormularlyAltBtn=(e)=>{
    e.preventDefault();
    console.log("form 1nd")
    this.setState({
      FormularyAlt:this.state.FormularyAlt,
     });
     console.log("form 2nd")
     if(this.state.FormularyAlt==="Yes"){
     this.props.fetchstc({
      drug_display_count:JSON.parse(this.state.MedicationLogic),
      alternative_medication_id:24,
      base_formulary_id: 2755,
      drug_display: "L",
      drug_display_type: "ALL"}
     );

     }
     if(this.state.FormularyAlt==="No"){
      this.props.fetchstc({
        drug_display_count:JSON.parse(this.state.MedicationLogic),
        alternative_medication_id:24,
        base_formulary_id: 2755,
        drug_display: "L",
        drug_display_type: "FOR"}
       );

     }
    
  }


  handleFooterModelChange = (model) => {
    this.setState({
      footerModel: model,
    });
   
  };
  
  
  
  
  saveOnClickHeaderBtn = (e) => {
    e.preventDefault();
    this.setState({
      headerModel: this.state.headerModel,
      
    });
    this.props.fetchheader(
      {base_formulary_id: 2755,
      header:this.state.headerModel}
    );
    
    
  };



  saveOnClickFooterBtn = (e) => {
    e.preventDefault();
    this.setState({
      footerModel: this.state.footerModel,
    });
    this.props.fetchheader(
      {base_formulary_id: 2755,
      footer:this.state.footerModel});
    
  };

  
  render() {
    const { headerModel, footerModel,FormularyAlt, MedicationLogic} = this.state;

    const config = {
      placeholderText: "",
    };
    return (
      <div className="__search-tool-configuration">
        <div className="m-t-20 m-b-20">
          <CustomAccordion name="Alternative Medication Logic">
            <Container>
              <label className="all-label">
                how many alternative drugs should display?
              </label>
              <div className="root-container">
                <Input placeholder=""  onChange={(e)=>this.setState({MedicationLogic:e.target.value})} className="alternate-drugs" />
              </div>
              <div className="move-right">
                <Button label={"Save"} onClick={this.saveOnClickMedicationLogicBtn} />
              </div>
            </Container>
          </CustomAccordion>
          <CustomAccordion name="Formulary/Non-Formulary Alternatives">
            <Container>
              <label className="all-label">
                do you want to include non-formulary products on the search
                tool?
              </label>
              <div className="root-container">
                <RadioButton label="Yes" name="search-tool" value="Yes"  onChange={(e)=>this.setState({FormularyAlt:e.target.value})} />
                <RadioButton label="No" name="search-tool" value="No" onChange={(e)=>this.setState({FormularyAlt:e.target.value})} />
              </div>
               <div className="move-right">
                <Button label={"Save"} onClick={(e)=>this.saveOnClickFormularlyAltBtn(e)} />
              </div>
            </Container>
          </CustomAccordion>
          <CustomAccordion name="Search Tool Header">
            <Container>
              <FroalaEditor
                tag="textarea"
                config={config}
                model={headerModel}
                onModelChange={this.handleHeaderModelChange}
              />
              <div className="move-right">
                <Button label={"Save"} onClick={this.saveOnClickHeaderBtn} />
              </div>
            </Container>
          </CustomAccordion>
          <CustomAccordion name="Search Tool Footer">
            <Container>
              <FroalaEditor
                tag="textarea"
                config={config}
                model={footerModel}
                onModelChange={this.handleFooterModelChange}
              />
              <div className="move-right">
                <Button label={"Save"}  onClick={this.saveOnClickFooterBtn} />
              </div>
            </Container>
          </CustomAccordion>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchToolConfiguration);

