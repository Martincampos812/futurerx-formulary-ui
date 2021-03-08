import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";
import { Checkbox } from 'antd';
class FormularyDesignCommercial extends React.Component<any, any> {
    checkFormularyDesign = (id:any) => {
        const des_opt:any = {...this.props.edit_info};
        const naCheckId = this.props.designOptions?.filter(e => e.is_custom !== true && e.edit_name === 'N/A').map(e=>e.id_edit);
        if(des_opt.edits.indexOf(parseInt(naCheckId)) !== -1){
            let ind = des_opt.edits.indexOf(naCheckId);
            des_opt.edits.splice(ind,1);
        }
        if(des_opt.edits.indexOf(id) === -1) {
            des_opt.edits.push(id)
        }else{
            let index = des_opt.edits.indexOf(id);
            des_opt.edits.splice(index,1);
        }
        this.props.formularyDesignCommercialCheck(des_opt)
    }
    customCheckboxClickHandler = (e) => {
        const des_opt:any = {...this.props.edit_info};
        const naCheckId = this.props.designOptions?.filter(e => e.is_custom !== true && e.edit_name === 'N/A').map(e=>e.id_edit);
        if(des_opt.edits.indexOf(parseInt(naCheckId)) !== -1){
            let ind = des_opt.edits.indexOf(naCheckId);
            des_opt.edits.splice(ind,1);
        }
        if(des_opt.custom_edits.length > 0){
            des_opt.custom_edits = [];
        }else{
            let newObj = {
                "id_formulary_edit": null,
                "id_edit": null,
                "edit_name": "",
                "is_custom": true,
                "code_value": null
            }
            des_opt.custom_edits.push(newObj);
        }
        this.props.formularyDesignCommercialCheck(des_opt);
    }
    customCheckboxAddNewClickHandler = () => {
        const des_opt:any = {...this.props.edit_info};
        let newObj = {
            "id_formulary_edit": null,
            "id_edit": null,
            "edit_name": "",
            "is_custom": true,
            "code_value": null
        }
        des_opt.custom_edits.push(newObj);
        this.props.formularyDesignCommercialCheck(des_opt);
    }
    onCustomeInputChangeHandler = (e,index) => {
        console.log(this.props)
        let des_opt:any = {...this.props.edit_info};
        let new_obj = {...des_opt.custom_edits[index]}
        new_obj.edit_name = e.target.value;
        des_opt.custom_edits.splice(index,1);
        des_opt.custom_edits.splice(index,0,new_obj);
        this.props.formularyDesignCommercialCheck(des_opt);
    }
    getChecked = (id) => {
        let isChecked = false;
        if(this.props.edit_info){
            isChecked = this.props.edit_info.edits.indexOf(id) !== -1;
        }
        return isChecked;
    }
    checkNAHandler = (id) => {
        const des_opt = {...this.props.edit_info};
        if(des_opt.edits.indexOf(id) === -1){
            des_opt.edits = [];
            des_opt.custom_edits = [];
            des_opt.edits.push(id);
        }else{
            des_opt.edits = [];
            des_opt.custom_edits = [];
        }
        this.props.formularyDesignCommercialCheck(des_opt);
    }
    checkUncheckHandler = () => {
        const des_opt = {...this.props.edit_info};
        let isNA = false;
        if(des_opt.edits.length === 1){
            const elObj =this.props.designOptions.filter(e => e.id_edit === des_opt.edits[0]);
            isNA = elObj.map(e => e.edit_name)[0] === 'N/A';
        }
        if((des_opt.edits.length > 0 || des_opt.custom_edits.length > 0) && !isNA){
            des_opt.edits = [];
            des_opt.custom_edits = [];
            const NAId = this.props.designOptions?.filter(e => e.is_custom !== true && e.edit_name === 'N/A').map(e=>e.id_edit)[0];
            des_opt.edits.push(NAId);
        }else{
            const newEdits = this.props.designOptions?.filter(e => e.is_custom !== true && e.edit_name !== 'N/A').map(e=>e.id_edit);
            des_opt.edits = newEdits;
        }
        this.props.formularyDesignCommercialCheck(des_opt);
    }
    deleteCustomInput = (ind) => {
        const des_opt = {...this.props.edit_info};
        const custom_edits = [...des_opt.custom_edits];
        custom_edits.splice(ind,1);
        des_opt.custom_edits = custom_edits;
        this.props.formularyDesignCommercialCheck(des_opt);
    }
    renderCustomCheckbox = () => {
        let inputs:any = [];
        let custom:any= this.props.edit_info?.custom_edits ? this.props.edit_info.custom_edits : this.props.designOptions?.filter(e => e.is_custom === true);
        if(custom.length > 0){
            inputs = custom?.map((el,index) => {
                return (
                    <div className="custom-input-wrapper">
                        <input 
                        type="text" 
                        className="add-new-cbx" 
                        value={el.edit_name}
                        onChange={(e) => this.onCustomeInputChangeHandler(e,index)} /> 
                        <svg onClick={() => this.deleteCustomInput(index)} width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75004 13.0417C1.75004 13.9125 2.46254 14.625 3.33337 14.625H9.66671C10.5375 14.625 11.25 13.9125 11.25 13.0417V3.54167H1.75004V13.0417ZM12.0417 1.16667H9.27087L8.47921 0.375H4.52087L3.72921 1.16667H0.958374V2.75H12.0417V1.16667Z" fill="#999999"></path></svg>
                    </div>
                )
            })
        }
        let finalEle = (
            <div>
                <Checkbox 
                    className="custom-checkbox mb-16" 
                    onChange={this.customCheckboxClickHandler} 
                    checked={custom.length > 0}>
                        Other
                </Checkbox>
                {inputs}
                {inputs.length > 0 ? (
                    <div className="add-new-cbx-btn-wrapper" onClick={this.customCheckboxAddNewClickHandler}>
                        <div className="add-new-cbx-btn">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0312 15.0312C18.3507 11.7118 18.3507 6.32989 15.0312 3.01041C11.7117 -0.309078 6.32985 -0.309034 3.01041 3.01041C-0.309032 6.32985 -0.309075 11.7117 3.01041 15.0312C6.32989 18.3507 11.7118 18.3507 15.0312 15.0312ZM14.3241 14.3241C17.2531 11.3952 17.253 6.64641 14.3241 3.71751C11.3952 0.788612 6.64646 0.788569 3.71751 3.71751C0.788571 6.64646 0.788615 11.3952 3.71751 14.3241C6.64641 17.253 11.3952 17.2531 14.3241 14.3241Z" fill="#707683"></path>
                                <path d="M4.52082 9.02081C4.52082 9.29695 4.74468 9.52081 5.02082 9.52081H8.52082V13.0208C8.52082 13.2969 8.74468 13.5208 9.02082 13.5208C9.29696 13.5208 9.52082 13.2969 9.52082 13.0208V9.52081L13.0208 9.52081C13.297 9.52081 13.5208 9.29695 13.5208 9.02081C13.5208 8.74466 13.297 8.52081 13.0208 8.52081H9.52082L9.52082 5.02081C9.52082 4.74466 9.29696 4.52081 9.02082 4.52081C8.74468 4.52081 8.52082 4.74467 8.52082 5.02081V8.52081H5.02082C4.74468 8.52081 4.52082 8.74466 4.52082 9.02081Z" fill="#707683"></path>
                            </svg>
                        </div>
                        <div className="add-new-text"><span>add new</span></div>
                    </div>
                ) : null}
            </div>
        )
        return finalEle;
    }
    renderCheckbox = () => {
        let checkbox = [];
        let custom=[];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name !== 'Prescriber Taxonomy' && e.edit_name !=='N/A'));
            custom = this.props.designOptions?.filter(e => e.is_custom === true);
            let count = 0;
            checkbox = des_opt?.map(el => {
                return <Grid item xs={6}>
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => this.checkFormularyDesign(el.id_edit)} 
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                </Grid>
            })
        }
        return checkbox; 
    }
    renderPrescribeCheckbox = () => {
        let checkbox = [];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name === 'Prescriber Taxonomy'));
            checkbox = des_opt?.map(el => {
                return (
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => this.checkFormularyDesign(el.id_edit)} 
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                )
            })
        }
        return checkbox; 
    }
    renderNACheckbox = () => {
        let checkbox = [];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name === 'N/A'));
            checkbox = des_opt?.map(el => {
                return (
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => this.checkNAHandler(el.id_edit)} 
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                )
            })
        }
        return checkbox; 
    }
    renderCheckUncheckButton = () => {
        const staticOpt = this.props.edit_info.edits;
        const staticOptLen = this.props.edit_info.edits.length;
        const customOptLen = this.props.edit_info.custom_edits.length;
        let isNA = false;
        if(staticOptLen === 1){
            const elObj =this.props.designOptions.filter(e => e.id_edit === staticOpt[0]);
            isNA = elObj.map(e => e.edit_name)[0] === 'N/A';
        }
        return isNA ? <Button label="Check All" className="uncheck-btn" onClick={this.checkUncheckHandler}/> : <Button label="Uncheck All" className="uncheck-btn" onClick={this.checkUncheckHandler}/>;
    }
  render() {
    return (
      <div className="supplemental-models-container">
        <h4>FORMULARY DESIGN</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
            <Grid item xs={11}>
                {this.renderNACheckbox()}
            </Grid>
            <Grid item xs={1}>
                <ul>
                    <li>
                    <Box display="flex" justifyContent="flex-end" className="compare-btn">
                        {this.renderCheckUncheckButton()}
                    </Box>
                    </li>
                </ul>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={8}>
                        <Grid container>
                            {this.renderCheckbox()}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        {this.renderPrescribeCheckbox()}
                        {this.renderCustomCheckbox()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={11}>
                <Grid container>
                    
                </Grid>
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
        storeEditInfo: state?.setup?.formulary?.edit_info
    };
};
export default connect(mapStateToProps)(FormularyDesignCommercial)