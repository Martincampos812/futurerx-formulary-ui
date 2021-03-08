import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";
import { Checkbox } from 'antd';
class SupplementalModels extends React.Component<any, any> {
    state = {
        type_id: this.props.generalInfo?.type_id,
        is_disabled: ['Additional Demonstration Drugs (MMP only)','Excluded Drugs'],
        is_mmp_only: ['ADD'],
        non_selectable: ['ExD'],
        is_otc: [] as any,
        specific_id: []
    }
    getChecked = (id) => {
        let isChecked = false;
        if(this.props.supplemental){
            isChecked = this.props.supplemental.supplemental_benefits.indexOf(id) !== -1;
        }
        return isChecked;
    }
    checkOTC = (code?:any) => {
        const FD_Edits = this.props.edit_info.edits;
        const ots_id = this.props.designOptions !== null ? this.props.designOptions.filter(e => e.edit_name === 'OTC').map(e => e.id_edit) : [];
        const is_otc = FD_Edits.indexOf(ots_id[0]) > -1 && code === 'OTC';
        return is_otc;
    }
    customCheckboxClickHandler = (e) => {
        const supp_opt:any = {...this.props.supplemental};
        const naCheckId = this.props.supplementalOptions?.filter(e => e.is_custom !== true && e.supplemental_benefit === 'N/A').map(e=>e.id_supplemental_benefit);
        if(supp_opt.supplemental_benefits.indexOf(parseInt(naCheckId)) !== -1){
            let ind = supp_opt.supplemental_benefits.indexOf(naCheckId);
            supp_opt.supplemental_benefits.splice(ind,1);
        }
        if(supp_opt.custom_supplemental_benefits.length > 0){
            const getID = supp_opt.custom_supplemental_benefits.filter(e => e.id_formulary_supplemental_benefit !== null).map(e => e.id_formulary_supplemental_benefit);
            const allRemovedID = [...supp_opt.removed_formulary_supplemental_benefits];
            supp_opt.custom_supplemental_benefits = [];
            supp_opt.removed_formulary_supplemental_benefits = [...allRemovedID,...getID];
        }else{
            let newObj = {
                code_value: null,
                id_formulary_supplemental_benefit: null,
                id_supplemental_benefit: null,
                is_custom: true,
                supplemental_benefit: ""
            }
            supp_opt.custom_supplemental_benefits.push(newObj);
        }
        this.props.supplementalCheck(supp_opt);
    }
    customCheckboxAddNewClickHandler = () => {
        const supp_opt:any = {...this.props.supplemental};
        let newObj = {
            code_value: null,
            id_formulary_supplemental_benefit: null,
            id_supplemental_benefit: null,
            is_custom: true,
            supplemental_benefit: ""
        }
        supp_opt.custom_supplemental_benefits.push(newObj);
        this.props.supplementalCheck(supp_opt);
    }
    onCustomeInputChangeHandler = (e,index) => {
        console.log(this.props)
        let sup_opt:any = {...this.props.supplemental};
        let new_obj = {...sup_opt.custom_supplemental_benefits[index]}
        new_obj.supplemental_benefit = e.target.value;
        sup_opt.custom_supplemental_benefits.splice(index,1);
        sup_opt.custom_supplemental_benefits.splice(index,0,new_obj);
        this.props.supplementalCheck(sup_opt);
    }
    deleteCustomInput = (ind) => {
        const sup_opt = {...this.props.supplemental};
        const custom_edits = [...sup_opt.custom_supplemental_benefits];
        const removed = [...sup_opt.removed_formulary_supplemental_benefits];
        const customEditRemovedID = custom_edits[ind].id_formulary_supplemental_benefit;
        if(customEditRemovedID !== null){
            removed.push(customEditRemovedID);
        }
        custom_edits.splice(ind,1);
        sup_opt.custom_supplemental_benefits = custom_edits;
        sup_opt.removed_formulary_supplemental_benefits = removed;
        this.props.supplementalCheck(sup_opt);
    }
    renderCustomCheckbox = () => {
        let inputs:any = [];
        let custom:any = this.props.supplemental?.custom_supplemental_benefits;
        let allCustom:any = this.props.supplemental?.custom_supplemental_benefits.length > 0 ? this.props.supplemental?.custom_supplemental_benefits : this.props.supplementalOptions?.filter(e => custom.indexOf(e.id_supplemental_benefit) !== -1);
        
        if(custom.length > 0){
            inputs = allCustom?.map((el,index) => {
                return (
                    <div className="custom-input-wrapper">
                        <input 
                        type="text" 
                        className="add-new-cbx" 
                        value={el.supplemental_benefit}
                        onChange={(e) => this.onCustomeInputChangeHandler(e,index)} /> 
                        <svg onClick={() => this.deleteCustomInput(index)} width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75004 13.0417C1.75004 13.9125 2.46254 14.625 3.33337 14.625H9.66671C10.5375 14.625 11.25 13.9125 11.25 13.0417V3.54167H1.75004V13.0417ZM12.0417 1.16667H9.27087L8.47921 0.375H4.52087L3.72921 1.16667H0.958374V2.75H12.0417V1.16667Z" fill="#999999"></path></svg>
                    </div>
                )
            })
        }
        let finalEle = (
            <Grid item xs={4}>
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
            </Grid>
        )
        return finalEle;
    }
    setRemovedItem = (updatedObj) => {
        const supp_obj = {...updatedObj}
        const supp_ben = [...supp_obj.supplemental_benefits];
        const loaded_supp = this.props.supplemental_benefits !== undefined ? [...this.props.supplemental_benefits] : [];
        const custom_edits = supp_obj.custom_supplemental_benefits.map(e => e.id_supplemental_benefit);
        let removed_obj = loaded_supp.filter(e => supp_ben.indexOf(e.id_supplemental_benefit) < 0);
        removed_obj = removed_obj.filter(e => custom_edits.indexOf(e.id_supplemental_benefit) < 0);
        supp_obj.removed_formulary_supplemental_benefits = removed_obj.map(e => e.id_formulary_supplemental_benefit);
        this.props.supplementalCheck(supp_obj);
    }
    renderCheckbox = () => {
        let checkbox = [];
        if(this.props.supplementalOptions){
            const sup_opt = this.props.supplementalOptions.filter(e => (e.is_custom === false && e.supplemental_benefit !== 'N/A'));
            checkbox = sup_opt.map(el => {
                const isMMPOnly = this.state.is_disabled.indexOf(el.supplemental_benefit) > -1;
                return <Grid item xs={4}>
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => this.supplementalCheck(el.id_supplemental_benefit)} 
                        disabled={isMMPOnly || this.checkOTC(el.code_value)}
                        checked={this.getChecked(el.id_supplemental_benefit)}>
                            {el.supplemental_benefit}
                    </Checkbox>
                </Grid>
            })
        }
        return checkbox; 
    }
    supplementalCheck = (id:any) => {
        const updatedSupplementalCheck:any = {...this.props.supplemental};
        const index = updatedSupplementalCheck.supplemental_benefits.indexOf(id);
        const fetchedElement = this.props.supplemental_benefits?.filter(e => e.id_supplemental_benefit === id);
        const getID = fetchedElement !== undefined && fetchedElement.length > 0 ? fetchedElement[0].id_formulary_supplemental_benefit : null;
        const removed = [...updatedSupplementalCheck.removed_formulary_supplemental_benefits];
        const NAID = this.props.supplementalOptions?.filter(e => e.is_custom !== true && e.supplemental_benefit === 'N/A').map(e=>e.id_supplemental_benefit);
        const getNAID = this.props.supplemental_benefits?.filter(e => NAID.indexOf(e.id_supplemental_benefit) > -1).map(e => e.id_formulary_supplemental_benefit);

        if(getNAID !== undefined && getNAID.length > 0 && removed.indexOf(getNAID[0]) < 0){
            removed.push(getNAID[0]);
        }
        if(updatedSupplementalCheck.supplemental_benefits.indexOf(parseInt(NAID)) !== -1){
            let ind = updatedSupplementalCheck.supplemental_benefits.indexOf(NAID);
            updatedSupplementalCheck.supplemental_benefits.splice(ind,1);
        }
        if(index > -1){
            if(getID !== null){
                removed.push(getID)
            }
            updatedSupplementalCheck.supplemental_benefits.splice(index,1);
            updatedSupplementalCheck.removed_formulary_supplemental_benefits = removed;
        }else{
            const ind = removed.indexOf(getID);
            if(ind > -1){
                removed.splice(ind,1);
            }
            updatedSupplementalCheck.removed_formulary_supplemental_benefits = removed;
            updatedSupplementalCheck.supplemental_benefits.push(id)
        }
        this.props.supplementalCheck(updatedSupplementalCheck);
    }
    checkNAHandler = (id) => {
        const sup_opt = {...this.props.supplemental};
        const getIDStatic = this.props.supplemental_benefits === undefined ? [] : this.props.supplemental_benefits.filter(e => sup_opt.supplemental_benefits.indexOf(e.id_supplemental_benefit) !== -1).map(e => e.id_formulary_supplemental_benefit);
        const getIDCustom = sup_opt.custom_supplemental_benefits.map(e => e.id_formulary_supplemental_benefit);
        let removed = [...getIDStatic,...getIDCustom];
        let allRemovedID = [...sup_opt.removed_formulary_supplemental_benefits];
        const defaultID = this.getDefaultId();
        const getDefaultID = this.props.supplemental_benefits === undefined ? [] : this.props.supplemental_benefits.filter(e => defaultID.indexOf(e.id_supplemental_benefit) !== -1).map(e => e.id_formulary_supplemental_benefit);
        const NAID =  sup_opt
        if(defaultID.length > 0){
            removed = removed.filter(e => getDefaultID.indexOf(e) === -1);
            allRemovedID = allRemovedID.filter(e => getDefaultID.indexOf(e) === -1);
        }
        if(sup_opt.supplemental_benefits.indexOf(id) === -1){
            const removed_NAID = this.props.supplemental_benefits !== undefined ? 
                this.props.supplemental_benefits.filter(e => e.id_supplemental_benefit === id).map(e => e.id_formulary_supplemental_benefit)[0] : [];
            const removed_NAID_index = allRemovedID.indexOf(removed_NAID);
            sup_opt.custom_supplemental_benefits = [];
            sup_opt.supplemental_benefits = [...defaultID, id];
            if(removed_NAID_index > -1){
                allRemovedID.splice(removed_NAID_index,1)
            }
            sup_opt.removed_formulary_supplemental_benefits = [...allRemovedID, ...removed]
        }else{
            sup_opt.supplemental_benefits = [...defaultID];
            sup_opt.custom_supplemental_benefits = [];
            sup_opt.removed_formulary_supplemental_benefits = [...allRemovedID, ...removed]
        }
        this.props.supplementalCheck(sup_opt);
    }
    renderNACheckbox = () => {
        let checkbox = [];
        if(this.props.supplementalOptions){
            const sup_opt = this.props.supplementalOptions?.filter(e => (e.is_custom === false && e.supplemental_benefit === 'N/A'));
            checkbox = sup_opt?.map(el => {
                return (
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => this.checkNAHandler(el.id_supplemental_benefit)} 
                        checked={this.getChecked(el.id_supplemental_benefit)}>
                            {el.supplemental_benefit}
                    </Checkbox>
                )
            });
        }
        return checkbox; 
    }
    getDefaultId = () => {
        let defaultIDs:any = [];
        if(this.props.generalInfo !== undefined ){
            defaultIDs = this.props.generalInfo.type_id === 2 && this.props.supplementalOptions !== null ? 
                this.props.supplementalOptions
                .filter(e => e.supplemental_benefit === 'Additional Demonstration Drugs (MMP only)')
                .map(e => e.id_supplemental_benefit) : []
        }
        const edit = this.props.edit_info.edits;
        const designOptions = this.props.designOptions;
        const is_otc = designOptions !== null ? designOptions.filter(e => edit.indexOf(e.id_edit) > -1 && e.code_value === 'OTC').length > 0 : false;
        const supplemental_otc_id = this.props.supplementalOptions !== null ?
        this.props.supplementalOptions.filter(e => e.code_value === 'OTC').map(e => e.id_supplemental_benefit) : [];
        const exd_id = this.props.supplementalOptions !== null ?
        this.props.supplementalOptions.filter(e => e.code_value === 'ExD').map(e => e.id_supplemental_benefit) : [];
        const is_exd = this.props.supplemental.supplemental_benefits.filter(e => exd_id.indexOf(e) > -1).length > 0
        if(is_otc){
            defaultIDs.push(supplemental_otc_id[0])
        }
        if(is_exd){
            defaultIDs.push(exd_id[0])
        }
        return defaultIDs;
    }
    renderCheckUncheckButton = () => {
        let showCheckAll = true;
        const staticOpt = this.props.supplemental.supplemental_benefits;
        const customOptLen = this.props.supplemental.custom_supplemental_benefits.length;
        const all_id_check:any = [...this.state.specific_id];
        showCheckAll = staticOpt.filter(e => all_id_check.indexOf(e) < 0).length === 0;
        if(staticOpt.length === 0){ showCheckAll = true;}
        if(customOptLen > 0){ showCheckAll = false; }
        return showCheckAll ? <Button label="Check All" className="uncheck-btn" onClick={this.checkUncheckHandler}/> : <Button label="Uncheck All" className="uncheck-btn" onClick={this.checkUncheckHandler}/>;
    }
    checkUncheckHandler = () => {
        const sup_opt = {...this.props.supplemental};
        let all_static_id:any = this.props.supplementalOptions.filter(e => e.is_custom === false && e.code_value !== 'NA').map(e=>e.id_supplemental_benefit);
        const mmp_id = this.props.supplementalOptions.filter(e => this.state.is_mmp_only.indexOf(e.code_value) > -1).map(e=>e.id_supplemental_benefit);
        const isMMP = this.props.generalInfo?.type_id === 2;
        const non_selectable_id = this.props.supplementalOptions.filter(e => this.state.non_selectable.indexOf(e.code_value) > -1).map(e=>e.id_supplemental_benefit);
        const is_non_selectable = sup_opt.supplemental_benefits.indexOf(non_selectable_id[0]) > -1;
        const otc_id = this.checkOTC('OTC') ? this.props.supplementalOptions.filter(e => e.code_value === 'OTC').map(e => e.id_supplemental_benefit) : [];
        const NAID = this.props.supplementalOptions.filter(e => e.code_value === 'NA').map(e=>e.id_supplemental_benefit);
        const custom_selection = [...sup_opt.custom_supplemental_benefits];
        const all_id_check:any = [...this.state.specific_id];
        let is_select_all = sup_opt.supplemental_benefits.filter(e => all_id_check.indexOf(e) < 0).length === 0;
        if(custom_selection.length > 0){
            is_select_all = false;
        }
        if(is_select_all){
            if(!isMMP){
                all_static_id = all_static_id.filter(e => mmp_id.indexOf(e) < 0);
            }
            if(!is_non_selectable){
                all_static_id = all_static_id.filter( e => non_selectable_id.indexOf(e) < 0);
            }
            sup_opt.supplemental_benefits = all_static_id;
        } else{
            all_static_id = [];
            if(is_non_selectable){
                all_static_id = [...all_static_id,...non_selectable_id]
            }
            if(otc_id.length > 0){
                all_static_id = [...all_static_id,...otc_id]
            }
            if(isMMP){
                all_static_id = [...all_static_id,...mmp_id]
            }
            all_static_id.push(NAID[0]);
            sup_opt.custom_supplemental_benefits = [];
        }
        sup_opt.supplemental_benefits = all_static_id;
        this.setRemovedItem(sup_opt);
    }
    UNSAFE_componentWillReceiveProps(newProps){
        if(newProps.supplementalOptions !== null){
            const specID = ['NA','OTC','ADD','ExD'];
            const spe_id = newProps.supplementalOptions.filter(e => specID.indexOf(e.code_value) > -1).map(e => e.id_supplemental_benefit);
            this.setState({
                specific_id: [...spe_id]
            })
        }
    }
    render() {
        return (
            <div className="supplemental-models-container">
                <h4>SUPPLEMENTAL BENEFITS OR ALTERNATIVE MODELS</h4>
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
                            {this.renderCheckbox()}
                            {this.renderCustomCheckbox()}
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
        supplementalOptions: state?.setupOptions?.supplementalOptions,
        supplemental_benefits: state?.setup?.formulary?.supplemental_benefits,
        designOptions: state?.setupOptions?.designOptions
    };
};
export default connect(mapStateToProps)(SupplementalModels)