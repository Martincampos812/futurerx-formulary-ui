import React from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import { connect } from "react-redux";
import { Checkbox } from 'antd';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    verifyCarveOutsName
  } from "../../../../../../redux/slices/formulary/setup/setupSlice";
import _ from 'lodash';

class MedicaidInformation extends React.Component<any, any> {
    removedID = (getObj) => {
        const staticObj = this.props.medicaidOptions.filter(e => e.is_custom === false).map(e => e.id_carve_out);
        const customObj = this.props.medicaidOptions.filter(e => e.is_custom === true).map(e => e.id_carve_out);
        const actualStaticObj = this.props.carve_outs !== undefined ? this.props.carve_outs.filter(e => staticObj.indexOf(e.id_carve_out) > -1) : [];
        const actualCustomObj = this.props.carve_outs !== undefined ? this.props.carve_outs.filter(e => customObj.indexOf(e.id_carve_out) > -1) : [];
        const removedStaticId = actualStaticObj.filter(e => getObj.carve_outs.indexOf(e.id_carve_out) < 0).map(e => e.id_formulary_carve_out);
        const customIdFromGetObj = getObj.custom_carve_outs.map(e => e.id_carve_out);
        const removedCustomId = actualCustomObj.filter(e => customIdFromGetObj.indexOf(e.id_carve_out)).map(e => e.id_formulary_carve_out);
        const finalRemoved = [...removedStaticId,...removedCustomId];
        const updatedInfo = {...getObj};
        updatedInfo.removed_formulary_carve_outs = finalRemoved;
        this.props.onCarveOutCheck(updatedInfo);
    }
    checkCarveOuts = (id: any) => {
        const medi_opt: any = { ...this.props.medicaidInfo };
        if (medi_opt.carve_outs.indexOf(id) === -1) {
            medi_opt.carve_outs.push(id)
        } else {
            let index = medi_opt.carve_outs.indexOf(id);
            medi_opt.carve_outs.splice(index, 1);
        }
        this.removedID(medi_opt)
    }
    customCheckboxClickHandler = (e) => {
        const medi_opt: any = { ...this.props.medicaidInfo };
        if (medi_opt.custom_carve_outs.length > 0) {
            medi_opt.custom_carve_outs = [];
        } else {
            let newObj = {
                "id_carve_out": null,
                "id_formulary_carve_out": null,
                "carve_out": "",
                "is_custom": true,
                "code_value": null
            }
            medi_opt.custom_carve_outs.push(newObj);
        }
        this.removedID(medi_opt);
        // this.props.onCarveOutCheck(medi_opt);
    }
    customCheckboxAddNewClickHandler = () => {
        const medi_opt: any = { ...this.props.medicaidInfo };
        let newObj = {
            "id_carve_out": null,
            "id_formulary_carve_out": null,
            "carve_out": "",
            "is_custom": true,
            "code_value": null
        }
        medi_opt.custom_carve_outs.push(newObj);
        // this.props.onCarveOutCheck(medi_opt);
        this.removedID(medi_opt)
    }
    onCustomeInputChangeHandler = (e, index) => {
        console.log(this.props)
        let medi_opt: any = { ...this.props.medicaidInfo };
        let new_obj = { ...medi_opt.custom_carve_outs[index] }
        new_obj.carve_out = e.target.value;
        medi_opt.custom_carve_outs.splice(index, 1);
        medi_opt.custom_carve_outs.splice(index, 0, new_obj);
        this.props.onCarveOutCheck(medi_opt);
        // this.props.verifyCarveOutsName({name: e.currentTarget.value, formulary_id: this.props.setup?.formulary?.id_formulary});
    }
    getChecked = (id) => {
        let isChecked = false;
        if (this.props.medicaidInfo) {
            isChecked = this.props.medicaidInfo.carve_outs.indexOf(id) !== -1;
        }
        return isChecked;
    }
    deleteCustomInput = (ind) => {
        const medi_opt = { ...this.props.medicaidInfo };
        const custom_edits = [...medi_opt.custom_carve_outs];
        custom_edits.splice(ind, 1);
        medi_opt.custom_carve_outs = custom_edits;
        // this.props.onCarveOutCheck(medi_opt);
        this.removedID(medi_opt)
    }
    renderCustomCheckbox = () => {
        let inputs: any = [];
        let custom: any = this.props.medicaidInfo?.custom_carve_outs ? this.props.medicaidInfo?.custom_carve_outs : [];
        if (custom.length > 0) {
            inputs = custom?.map((el, index) => {
                return (
                    <div className="custom-input-wrapper">
                        <input
                            type="text"
                            className="add-new-cbx"
                            value={el.carve_out}
                            onChange={(e) => this.onCustomeInputChangeHandler(e, index)} />
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
        let custom = [];
        if (this.props.medicaidOptions) {
            const medi_opt = this.props.medicaidOptions?.filter(e => e.is_custom === false);
            let count = 0;
            checkbox = medi_opt?.map(el => {
                return <Grid item xs={4}>
                    <Checkbox
                        className="custom-checkbox mb-16"
                        onChange={() => this.checkCarveOuts(el.id_carve_out)}
                        checked={this.getChecked(el.id_carve_out)}>
                        {el.carve_out}
                    </Checkbox>
                </Grid>
            })
        }
        return checkbox;
    }
    othersClick = (e) => {
        const othersObj = {...this.props.others}
        const val = e.target.value;
        othersObj.formulary_basis = val;
        this.props.onOthersClick(othersObj)
    }
    onCarveOutRadioClick = (e) => {
        const othersObj = {...this.props.others}
        const val = e.target.value === 'true' ? true : false;
        const carveObj = {...this.props.medicaidInfo}
        othersObj.is_carve_out = val;
        if(!val){
            carveObj.carve_outs = [];
            carveObj.custom_carve_outs = [];
        }
        this.props.onOthersClick(othersObj);
        // this.props.onCarveOutCheck(carveObj);
        this.removedID(carveObj)
    }
    render() {
        return (
            <div className="medicare-information-container">
                <h4>Medicaid Information</h4>
                <div className="medicare-information-container__wrapper setup-label">
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                                <label className="mb-16">Formulary Basics <span className="astrict">*</span></label>
                                <div className="radio-group field-group__radio-group formulary-basis-radio">
                                    <RadioGroup
                                        className="radio-group-custom mr-80"
                                        aria-label={'abridged'}
                                        name={'Formulary Basis'}
                                        value={this.props.others.formulary_basis}
                                        onClick={this.othersClick}>
                                        <FormControlLabel value="PDPD" control={<Radio />} label="Plan Defined Preffered Drug List" />
                                        <FormControlLabel value="SMD" control={<Radio />} label="State Mandated Drug List" />
                                        <FormControlLabel 
                                            disabled={this.props.generalInfo.type_id !== 3}
                                            value="SMDE" control={<Radio />} label="State Mandated Drug List With Exceptions" />
                                    </RadioGroup>
                                </div>
                            </div>
                        </Grid>
                        {this.props.generalInfo.type_id === 3 ? (
                            <Grid item xs={6}>
                                <div className="field-group group setup-panel">
                                    <PanelHeader
                                        title="Does the Formulary have carve out?"
                                        tooltip="Does the Formulary have carve out?"
                                        required={true}
                                    />
                                    <div className="radio-group field-group__radio-group">
                                        <RadioGroup
                                            className="radio-group-custom mr-80"
                                            aria-label={'abridged'}
                                            name={'Formulary Carve Out'}
                                            value={this.props.others.is_carve_out}
                                            onClick={this.onCarveOutRadioClick}>
                                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {this.props.others.is_carve_out ? (
                                    <>
                                    <div className="checkbox-ul medicaid-information-container__checkbox-ul">
                                        {this.renderCheckbox()}
                                    </div>
                                    {this.renderCustomCheckbox()}
                                    </>
                                ): null}
                            </Grid>
                        ) : null}
                    </Grid>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        mode: state?.application?.mode,
        medicaidOptions: state?.setupOptions?.medicaidOptions,
        carve_outs: state?.setup?.formulary?.carve_outs,
        setup: state?.setup
    }
};
function mapDispatchToProps(dispatch) {
    return {
        verifyCarveOutsName: (a) => dispatch(verifyCarveOutsName(a))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(MedicaidInformation)
