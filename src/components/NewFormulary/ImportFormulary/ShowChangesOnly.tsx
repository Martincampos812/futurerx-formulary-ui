import React from 'react';
import { Checkbox } from 'antd';
import { AnyAaaaRecord } from 'dns';
import { connect } from "react-redux";
import './showChangesOnly.scss';

const firstSet = ['Tier','QL','PA','ST'];
const secondSet = ['LA','MO/NM','IBF','PGC','FFF','HI','VBID','CB','LIS','PBST','SSM','AF','Other'];

class ShowChangesOnly extends React.Component<any,any>{
    state = {
        selectedChangesOnly: [] as any[],
        firstSet: [],
        otherUMEdits: []
    }
    onChangeOnly = (val:any) => {
        let selectedVal:any = [...this.state.selectedChangesOnly];
        const ind = selectedVal.indexOf(val);
        if(ind === -1){
            selectedVal.push(val)
        }else{
            selectedVal.splice(ind,1);
        }
        this.setState({
            selectedChangesOnly: selectedVal
        });
        this.props.updateChangesOnly(selectedVal);
    }
    getChecked = (val) => {
        const ind = this.state.selectedChangesOnly.indexOf(val)
        return ind > -1;
    }
    componentDidMount(){
        const edit_info = this.props.edit_info.map(e => e.id_edit);
        const fetchedInfo = this.props.setupOptions.designOptions.filter(e => edit_info.indexOf(e.id_edit) > -1 && e.is_custom === false && e.code_value !== 'NA').map(e=>e.code_value);
        const isOthers = this.props.setupOptions.designOptions.filter(e => e.is_custom === true).length;
        let first_row = firstSet.filter(e => fetchedInfo.indexOf(e) > -1);
        let second_row = fetchedInfo.filter(e => first_row.indexOf(e) < 0);
        if(isOthers){
            second_row.push('Other');
        }
        if(second_row.indexOf('ICDL') > -1){
            let ind = second_row.indexOf('ICDL');
            second_row.splice(ind,1);
            second_row.splice(ind,0,'ICD');
        }
        if(second_row.indexOf('PRTX') > -1){
            let ind = second_row.indexOf('PRTX');
            second_row.splice(ind,1);
            second_row.splice(ind,0,'PT');
        }
        if(second_row.indexOf('PHNW') > -1){
            let ind = second_row.indexOf('PHNW');
            second_row.splice(ind,1);
            second_row.splice(ind,0,'PN');
        }
        if(second_row.indexOf('PATRS') > -1){
            let ind = second_row.indexOf('PATRS');
            second_row.splice(ind,1);
            second_row.splice(ind,0,'PR');
        }
        if(this.props.tiers.length > 0){
            first_row.unshift('Tier')
        }
        this.setState({
            firstSet: first_row,
            otherUMEdits: second_row 
        });
        if( this.props.supplemental_benefit !== undefined && 
            this.props.formulary.formulary_info !== undefined && 
            this.props.formulary.formulary_type_info.id_lob === 1
        ){
            this.rearrangeOptions();
        }
        this.props.isChangesOnlyCheck(first_row,second_row);
    }
    rearrangeOptions = () => {
        let second_row:any = ['MO/NM'];
        let first_row:any  = [];
        const suppOptions = this.props.supplemental_benefit.map(e => e.id_supplemental_benefit);
        const edit_info = this.props.edit_info.filter(e => e.id_checked === true).map(e => e.id_edit);
        const designOptions = [...this.props.setupOptions.designOptions];
        const supplementalOptions = [...this.props.setupOptions.supplementalOptions];
        const staticSupp = supplementalOptions.filter(e => e.is_custom === false);
        const otherOpt = supplementalOptions.filter(e => e.is_custom === true);
        const otherStatic = staticSupp.filter(e => suppOptions.indexOf(e.id_supplemental_benefit) > -1).map(e => e.code_value);
        const static1 = designOptions.filter(e => edit_info.indexOf(e.id_edit) > -1 && e.code_value !== 'OTC' && e.code_value !== 'EGS').map(e => e.code_value);
        const isPA = designOptions.filter(e => e.pa)[0].pa.filter(e => edit_info.indexOf(e.id_edit) > -1 && e.code_value !== 'PANA').length > 0;
        const isST = designOptions.filter(e => e.st)[0].st.filter(e => edit_info.indexOf(e.id_edit) > -1 && e.code_value !== 'STNA').length > 0;
        const QLInd = static1.indexOf('QL');
        const isTiers = this.props.tiers.length > 0;
        if(this.props.formulary.formulary_info.abridged_forumulary_creation){
            second_row.push('AF')
        }
        if(QLInd > -1){
            static1.splice(QLInd,1);
        }
        second_row.push.apply(second_row,[...static1,...otherStatic]);
        const addIndex = second_row.indexOf('ADD');
        const OTCIndex = second_row.indexOf('OTC');
        if(addIndex > -1){
            second_row.splice(addIndex,1);
            second_row.splice(addIndex,0,'CB')
        }
        if(OTCIndex > -1){
            second_row.splice(OTCIndex,1);
        }
        if(otherOpt.length > 0){
            second_row.push('Other');
        }
        if(isTiers) {first_row.push('Tier')};
        if(isPA) {first_row.push('PA')};
        if(isST) {first_row.push('ST')};
        if(QLInd > -1) {first_row.push('QL')};
        this.props.isChangesOnlyCheck(first_row,second_row);
        this.setState({
            firstSet: first_row,
            otherUMEdits: second_row
        })
    }
    render() {
        return(
            <div className="w-640">
                <div className="radioWrapper">
                    {this.state.firstSet.map((e,index) => (
                        <div className="labelWrapper">
                            <Checkbox 
                                key={index}
                                className="custom-checkbox mb-16" 
                                onChange={() => this.onChangeOnly(e)}
                                checked={this.getChecked(e)}>
                                    {e}
                            </Checkbox>
                        </div>
                    ))}
                </div>
                {this.state.otherUMEdits.length > 0 ? 
                    <p className="umedit-label">Other UM Edits:</p>
                : null}
                <div className="radioWrapper">
                    {this.state.otherUMEdits.map((e,index) => (
                        <div className="labelWrapper">
                            <Checkbox 
                                key={index}
                                className="custom-checkbox mb-16" 
                                onChange={() => this.onChangeOnly(e)}
                                checked={this.getChecked(e)}>
                                    {e}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state?.setup?.mode,
        edit_info: state?.setup?.formulary?.edit_info,
        setupOptions: state?.setupOptions,
        formulary_type: state?.setup?.formulary?.formulary_type_info?.id_formulary_type,
        formulary: state?.setup?.formulary,
        tiers: state?.setup?.formulary?.tiers,
        supplemental_benefit: state?.setup?.formulary?.supplemental_benefits
    };
};

export default connect(mapStateToProps)(ShowChangesOnly);