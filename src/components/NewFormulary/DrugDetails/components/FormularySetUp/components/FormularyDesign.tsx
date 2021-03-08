import React from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {connect} from "react-redux";
import { Checkbox } from 'antd';
import _ from 'lodash';
class FormularyDesign extends React.Component<any, any> {
    state = {
        ql: true,
        egs: false,
        dr: false,
        st: false,
        stp: false
    }
    flDesignCheckboxChangeHandler = (event,id: any,type, key) => {
        let checked = event.target.checked;
        const updatedEditInfo: any = { ...this.props.edit_info };
        if (type === "checkbox") {
          let index = updatedEditInfo.edits.indexOf(id);
          index === -1
            ? updatedEditInfo.edits.push(id)
            : updatedEditInfo.edits.splice(index, 1);
        }
        const getDesignOptions = this.props.designOptions.filter(e => e[key])[0][key];
        const NAID = this.props.designOptions.filter(e => e[key])[0][key].filter(e => e. edit_name === 'N/A').map(e => e.id_edit)[0];
        let removedId = [];
        if(NAID === id){
            const getAllOtherId = getDesignOptions.filter(e => e.id_edit !== NAID).map(e => e.id_edit);
            removedId = this.props.editInto?.filter(e => e.id_checked && getAllOtherId.indexOf(e.id_edit) !== -1).map(e => e.id_formulary_edit);
            updatedEditInfo.edits = updatedEditInfo.edits.filter(e => getAllOtherId.indexOf(e) < 0);
            updatedEditInfo.removed_formulary_edits = _.union(updatedEditInfo.removed_formulary_edits,removedId);
        }else{
            const checkNAIndex = updatedEditInfo.edits.indexOf(NAID);
            const getSelectedObj = this.props.editInto?.filter(e => e.id_checked && e.id_edit === id);
            const getId = (getSelectedObj && getSelectedObj.length > 0) ? getSelectedObj[0].id_formulary_edit : null;
            if(checkNAIndex > -1){
                updatedEditInfo.edits.splice(checkNAIndex,1);
            }
            if(getId !== null){
                const idIndex = updatedEditInfo.removed_formulary_edits.indexOf(getId);
                idIndex > -1 ? 
                    updatedEditInfo.removed_formulary_edits.splice(idIndex,1) :
                    updatedEditInfo.removed_formulary_edits.push(getId)
            }
        }
        this.props.MCRDesignObj(updatedEditInfo);
    }
    designCheckbox = (type) => {
        let paCheckbox: any;
        if(this.props.designOptions){
            const index = type === 'pa' ? 5 : 6;
            paCheckbox = this.props.designOptions[index][type]?.map(e => {
                const id = e.id_edit;
                let checked:any;
                if(this.props.edit_info){
                    checked =  this.props.edit_info.edits.indexOf(id) !== -1 ? true :
                    this.props.edit_info.edits_no.indexOf(id) !== -1 ? false : null;
                }
                return (
                    <div className="label-wrapper checkbox-wrapper">
                        <Checkbox className="custom-checkbox mb-16" onChange={(e) => this.flDesignCheckboxChangeHandler(e,id,'checkbox',type)} checked={checked}>{e.edit_name}</Checkbox>
                    </div>
                )
            })
        }
        return paCheckbox;
    }
    designRadioButton = (type) => {
        let radioBox: any;
        if(this.props.designOptions){
            const id = this.props.designOptions.find(el => el.edit_name === type)?.id_edit;
            const value = this.props.edit_info.edits.indexOf(id) !== -1 ? true :
                          this.props.edit_info.edits_no.indexOf(id) !== -1 ? false : null;
            return (
                <RadioGroup 
                    className="radio-group-custom mr-80" 
                    aria-label={type} 
                    name={type} 
                    value={value} 
                    onClick={(e) => this.props.formularyRadioChange(e,id)}>
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
            )
        }
        return radioBox;
    }
  render() {
    return (
      <div className="formulary-design-container">
        <h4>FORMULARY DESIGN</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
        <Grid item xs={6}>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?"
                    tooltip="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designCheckbox('pa')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    tooltip="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('QL')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    tooltip="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('LA')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    tooltip="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('EGS')}
                </div>
            </div>
        </Grid>
        <Grid item xs={6}>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS?"
                    tooltip="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('PartB-ST')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    tooltip="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designCheckbox('st')}    
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    tooltip="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('OTC')}
                </div>
            </div>
        </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        designOptions: state?.setupOptions?.designOptions,
        editInto: state?.setup?.formulary?.edit_info
    };
};
export default connect(mapStateToProps)(FormularyDesign)