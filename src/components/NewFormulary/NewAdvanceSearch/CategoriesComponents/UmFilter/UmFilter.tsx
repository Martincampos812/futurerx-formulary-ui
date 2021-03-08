import React, { Component } from "react";
import { Checkbox, Button } from "@material-ui/core";
import { Left } from "react-bootstrap/lib/Media";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { connect } from "react-redux";

import "./UmFilter.scss";

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a))
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id
  };
};

const umfilter = [
  { id: 1, lable: "N/A" , key: 'NA1', code:1, isDisabled: false},
  { id: 2, lable: "Limited Access" , key: 'NA2', code:1, isDisabled: false},
  { id: 3, lable: "MO/NM Indicator" , key: 'NA3', code:1, isDisabled: false},
  { id: 4, lable: "Additional Demonstration Drugs", key: 'is_add', code:1, isDisabled: false },
  { id: 5, lable: "Indication Based Coverage" , key: 'NA5' , code:1, isDisabled: false},
  { id: 6, lable: "Full Gap Coverage" , key: 'is_pgc', code:1, isDisabled: false},
  { id: 7, lable: "ST Type 1" , key: 'NA7' , code:1, isDisabled: false},
  { id: 8, lable: "ST Type 2" , key: 'NA8' , code:1, isDisabled: false},
  { id: 9, lable: "QL Type 1" , key: 'NA9' , code:1, isDisabled: false},
  { id: 10, lable: "QL Type 2" , key: 'NA10' , code:1, isDisabled: false},
  { id: 11, lable: "Partial Gap Coverage" , key: 'is_pa' , code:1, isDisabled: false },
  { id: 12, lable: "Free First Fill" , key: 'is_fff' , code:1, isDisabled: false},
  { id: 13, lable: "Home Infusion" , key: 'is_hi' , code:1, isDisabled: false},
  { id: 14, lable: "Value-Based Insurance Design" , key: 'is_vbid' , code:1, isDisabled: false},
  { id: 15, lable: "Capped Benefits" , key: 'NA15' , code:1, isDisabled: false},
  { id: 16, lable: "PA Type 1" , key: 'NA16' , code:1, isDisabled: false},
  { id: 17, lable: "PA Type 2" , key: 'NA17' , code:1, isDisabled: false},
  { id: 18, lable: "PA Type 3" , key: 'NA18' , code:1, isDisabled: false},
  { id: 19, lable: "UM Criteria" , key: 'NA19' , code:1, isDisabled: false},
  { id: 20, lable: "LIS Cost-Sharing Reduction" , key: 'is_lis' , code:1, isDisabled: false},
  { id: 21, lable: "Part B Step Therapy" , key: 'NA21' , code:1, isDisabled: false},
  { id: 22, lable: "Senior Savings Model" , key: 'NA22' , code:1, isDisabled: false},
  { id: 23, lable: "Abridged Formulary" , key: 'NA23' , code:1, isDisabled: false},
  { id: 24, lable: "other" , key: 'NA24' , code:1, isDisabled: false},
];

const umfilterNonMcr = [
  { id: 1, lable: "N/A" , key: 'is_na', code:68, isDisabled: false},
  { id: 2, lable: "Prior Authorization" , key: 'is_pa', code:58, isDisabled: false},
  { id: 3, lable: "Age Limits" , key: 'is_al' , code:61, isDisabled: false},
  { id: 4, lable: "Patient Residence", key: 'is_pr' , code:64, isDisabled: false},
  { id: 5, lable: "Place of Service" , key: 'is_ps' , code:67, isDisabled: false},
  { id: 6, lable: "Free First Fill" , key: 'is_fff' , code:439, isDisabled: false},
  { id: 7, lable: "ST Type 1" , key: 'NA7' , code:1, isDisabled: true},
  { id: 8, lable: "ST Type 2" , key: 'NA8' , code:1, isDisabled: true},
  { id: 9, lable: "Gender Limits" , key: 'is_gl' , code:62, isDisabled: false},
  { id: 10, lable: "Pharmacy Networks" , key: 'is_pn' , code:65, isDisabled: false},
  { id: 11, lable: "ICD Limits" , key: 'is_icdl' , code:63, isDisabled: false},
  { id: 12, lable: "Presciber Taxonomy" , key: 'is_pt' , code:66, isDisabled: false},
  { id: 13, lable: "PA Type 1" , key: 'NA9' , code:1, isDisabled: true},
  { id: 14, lable: "PA Type 2" , key: 'NA10' , code:1, isDisabled: true},
  { id: 15, lable: "UM Criteria" , key: 'NA11' , code:1, isDisabled: true},
  { id: 16, lable: "QL Type 1" , key: 'NA17' , code:1, isDisabled: true},
  { id: 17, lable: "QL Type 2" , key: 'NA18' , code:1, isDisabled: true},
  { id: 18, lable: "QL Type 9" , key: 'NA19' , code:1, isDisabled: true},
  { id: 19, lable: "Quantity Limits" , key: 'is_ql' , code:59, isDisabled: false},
  { id: 20, lable: "Step Therapy" , key: 'is_st' , code:60, isDisabled: false},
  { id: 21, lable: "Other 1" , key: 'is_other1' , code:1, isDisabled: true},
  { id: 22, lable: "Other 2" , key: 'is_other2' , code:1, isDisabled: true},
  { id: 23, lable: "Other 3" , key: 'is_other3' , code:1, isDisabled: true},
  { id: 24, lable: "Other 4" , key: 'is_other4' , code:1, isDisabled: true},
  { id: 25, lable: "Other 5" , key: 'is_other5' , code:1, isDisabled: true},
];

interface Props {
  umFiltersChanged: (a) => void;
  advancedSearchBody: any;
  formulary_lob_id: any;
  formulary: any;
}
interface State {}

class UmFilter extends Component<Props, State> {
  state = {
    umFilterList: umfilter,
    newUmlable: "",
    selectedUm: [],
    selectedKeys: Array(),
  };

  componentDidMount() {
    if(this.props.formulary_lob_id === 1){
      this.state.umFilterList = umfilter;
    }else{
      if(this.props.formulary && this.props.formulary.edit_info && this.props.formulary.edit_info.length > 0){
        let checkedOptions = this.props.formulary.edit_info.filter(option => option.id_checked);
        let checkedIds = checkedOptions.map(option => option.id_edit);
        if(checkedIds.length > 0){
          let normalIds = checkedIds.filter(id => [58,59,60,61,62,63,64,65,66,67,68,439].includes(id));
          let otherIds = checkedIds.filter(id => ![58,59,60,61,62,63,64,65,66,67,68,439].includes(id));

          if(normalIds.length > 0){
            umfilterNonMcr.map(umFilter => {
              if(normalIds.includes(umFilter.code)){
                umFilter.isDisabled = false;
              }else{
                umFilter.isDisabled = true;
              }
            })
          }

          if(otherIds.length > 0){
            for(let index = 20 ; index < (20+otherIds.length) ; index++){
              if(index < umfilterNonMcr.length){
                let umFilter = umfilterNonMcr[index];
                umFilter.isDisabled = false;
              }
            }
          }
        }
      }
      this.state.umFilterList = umfilterNonMcr;
    }
    if(this.props.advancedSearchBody && this.props.advancedSearchBody.additional_filter){
      let keystoSet = Object.keys(this.props.advancedSearchBody.additional_filter).filter(key => this.props.advancedSearchBody.additional_filter[key] === true);
      if(keystoSet && keystoSet.length > 0){
        let umSelected = Array();
        this.state.umFilterList.map(um => {
          if(keystoSet.includes(um.key)){
            umSelected.push(um);
          }
        });
        this.props.umFiltersChanged(umSelected);
        this.setState({
          selectedUm: umSelected,
          selectedKeys: keystoSet
        });
      }
    }
  }

  handleOnChange = (e) => {
    console.log(e.target.name);
    this.setState({ newUmlable: e.target.value });
  };

  addUmFilter = () => {
    if (this.state.newUmlable == "") return;
    const curretUmFilteList = [...this.state.umFilterList];
    const newUmFilter = {
      id: curretUmFilteList.length,
      lable: this.state.newUmlable,
      key: 'NA'+curretUmFilteList.length,
      code: 1,
      isDisabled: false
    };
    curretUmFilteList.push(newUmFilter);
    this.setState({ umFilterList: curretUmFilteList, newUmlable: "" });
  };

  deleteUmFilter = () => {
    if (this.state.newUmlable == "") return;
    const currentUmFilterList = [...this.state.umFilterList];
    const filterList = currentUmFilterList.filter(
      (umFilter) =>
        umFilter.lable.toLowerCase() !== this.state.newUmlable.toLowerCase()
    );

    this.setState({ umFilterList: filterList, newUmlable: "" });
  };

  onSelect = (e, selectedUm) => {
    const currentSelectedUmList: any = [...this.state.selectedUm];
    const currentSelectedUmKeys: any = [...this.state.selectedKeys];

    if (e.target.checked) {
      currentSelectedUmList.push(selectedUm);
      currentSelectedUmKeys.push(selectedUm.key);
      this.setState({
        selectedUm: currentSelectedUmList,
        selectedKeys: currentSelectedUmKeys
      });
      this.props.umFiltersChanged(currentSelectedUmList);
    } else {
      const filterdSelectedUmList = currentSelectedUmList.filter(
        (umList) => umList.id !== selectedUm.id
      );
      const filterdSelectedKeysList = currentSelectedUmKeys.filter(
        (umList) => umList !== selectedUm.key
      );
      this.setState({
        selectedUm: filterdSelectedUmList,
        selectedKeys: filterdSelectedKeysList
      });
      this.props.umFiltersChanged(filterdSelectedUmList);
    }
  };

  render() {
    if(this.props.formulary && this.props.formulary.edit_info && this.props.formulary.edit_info.length > 0){
      let checkedOptions = this.props.formulary.edit_info.filter(option => option.id_checked);
      let checkedIds = checkedOptions.map(option => option.id_edit);
      if(checkedIds.length > 0){
        let normalIds = checkedIds.filter(id => [58,59,60,61,62,63,64,65,66,67,68,439].includes(id));
        let otherIds = checkedIds.filter(id => ![58,59,60,61,62,63,64,65,66,67,68,439].includes(id));

        if(normalIds.length > 0){
          umfilterNonMcr.map(umFilter => {
            if(normalIds.includes(umFilter.code)){
              umFilter.isDisabled = false;
            }else{
              umFilter.isDisabled = true;
            }
          })
        }

        if(otherIds.length > 0){
          for(let index = 20 ; index < (20+otherIds.length) ; index++){
            if(index < umfilterNonMcr.length){
              let umFilter = umfilterNonMcr[index];
              umFilter.isDisabled = false;
            }
          }
        }
      }
    }
    if(this.props.formulary_lob_id === 1){
      this.state.umFilterList = umfilter;
    }else{
      this.state.umFilterList = umfilterNonMcr;
    }
    const { umFilterList } = this.state;
    return (
      <div className="__root-um-filter-container">
        <div className="__filter-list-container">
          <div
            // style={{ border: "1px solid red", width: "77%" }}
            className="__list-wraper"
          >
            {umFilterList.map((filterList) => (
              <span
                key={filterList.id}
                className="__filter-list"
                // style={{
                //   display: "inline-block",
                //   width: "248px",
                //   border: "1px solid gray",
                // }}
              >
                <Checkbox
                  color="primary"
                  size="small"
                  checked={this.state.selectedKeys.includes(filterList.key)}
                  style={{ borderRadius: "15px" }}
                  onClick={(e) => this.onSelect(e, filterList)}
                  disabled={filterList.isDisabled}
                />
                <label htmlFor="" className="__list-lable">
                  {filterList.lable}
                </label>
              </span>
            ))}
            {this.props.formulary_lob_id === 1 && (<div className="button-container">
              <div className="__add-input-delete-container">
                <input
                  type="text"
                  className="__add-input"
                  name={"newUmlable"}
                  value={this.state.newUmlable}
                  onChange={this.handleOnChange}
                />
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="delete-icon"
                  onClick={this.deleteUmFilter}
                >
                  <path
                    d="M1.75065 13.0417C1.75065 13.9125 2.46315 14.625 3.33398 14.625H9.66732C10.5382 14.625 11.2507 13.9125 11.2507 13.0417V3.54167H1.75065V13.0417ZM12.0423 1.16667H9.27148L8.47982 0.375H4.52148L3.72982 1.16667H0.958984V2.75H12.0423V1.16667Z"
                    fill="#999999"
                  />
                </svg>
                <div
                  className="__add-button-container"
                  onClick={this.addUmFilter}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="plus-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.0312 15.0309C18.3507 11.7115 18.3507 6.32958 15.0312 3.0101C11.7117 -0.309383 6.32985 -0.30934 3.01041 3.0101C-0.309032 6.32954 -0.309075 11.7114 3.01041 15.0309C6.32989 18.3504 11.7118 18.3504 15.0312 15.0309ZM14.3241 14.3238C17.2531 11.3949 17.253 6.64611 14.3241 3.71721C11.3952 0.788307 6.64646 0.788264 3.71751 3.71721C0.788571 6.64615 0.788615 11.3949 3.71751 14.3238C6.64641 17.2527 11.3952 17.2528 14.3241 14.3238Z"
                      fill="#707683"
                    />
                    <path
                      d="M4.52082 9.0205C4.52082 9.29664 4.74468 9.5205 5.02082 9.5205H8.52082V13.0205C8.52082 13.2966 8.74468 13.5205 9.02082 13.5205C9.29696 13.5205 9.52082 13.2966 9.52082 13.0205V9.5205L13.0208 9.5205C13.297 9.5205 13.5208 9.29664 13.5208 9.0205C13.5208 8.74436 13.297 8.5205 13.0208 8.5205H9.52082L9.52082 5.0205C9.52082 4.74436 9.29696 4.5205 9.02082 4.5205C8.74468 4.5205 8.52082 4.74436 8.52082 5.0205V8.5205H5.02082C4.74468 8.5205 4.52082 8.74436 4.52082 9.0205Z"
                      fill="#707683"
                    />
                  </svg>
                  <span className="add-button">
                    <p>add new</p>
                  </span>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UmFilter);
