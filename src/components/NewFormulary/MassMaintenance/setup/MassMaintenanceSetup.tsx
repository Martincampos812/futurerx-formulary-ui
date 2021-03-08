import React, { Component } from "react";
import { connect } from "react-redux";
import "./MassMaintenanceSetup.scss";
import { ToastContainer } from "react-toastify";
import showMessage from "../../Utils/Toast";
// import {
//   _claimsGridColumns,
//   _grievancesGridColumns,
//   _pacases_initial,
//   _testClaimsGridColumns,
// } from "../../../../utils/grid/columns";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../shared/Frx-components/button/Button";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input } from "antd";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
import {
  fetchCompleteTabData,
  setSelectedRow,
} from "../../../../redux/slices/maintenance/maintenanceSlice";
import { getFormularyGridData } from "../../../../mocks/formulary-grid/FormularyGridData";
import FormularyGrid from "./FormularyGrid";
import DrugGrid from "../../DrugDetails/components/DrugGrid";
import { getFormularyGridColumns } from "../../../../mocks/formulary-grid/FormularyGridColumn";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import formularyDetailsContext from "../../FormularyDetailsContext";
import {
  fetchLandingData,
  fetchContractYearData,
  fetchFormularyList,
  fetchSubmissionMonths,
  save,
  saveAndContinue,
} from "../../../../redux/slices/maintenance/maintenanceSlice";
// import { fetchLandingData } from "../../../../redux/slices/maintenance/maintenanceSlice";
import { getCurrentLob } from "../utils/getCurrenLob";

import DropDownMap from "../../../shared/Frx-components/dropdown/DropDownMap";
import { dispatch } from "d3";
import { formularyGridData } from "../../../../mocks/grid/formulary-table";

interface currentLob {
  id: number;
  text: string;
}
interface state {
  isFormularyGridShown: boolean;
  columns: any;
  data: any;
  formularyData: any; //data,
  formularyGridData: any; //gridData,
  pinData: {
    value: boolean;
  };
  scroll: {
    x: number;
    y: number;
  };
  currentLob: currentLob | null;
  contract_year: string;
  month: number;
  formulary_ids: any;
  maintenance_type: string;
  effectiveDate: string;
}
class MassMaintenanceSetup extends Component<any, state> {
  state = {
    isFormularyGridShown: false,
    columns: Array(),
    data: Array(),
    formularyData: Array(),
    formularyGridData: Array(),
    pinData: {
      value: false,
    },
    scroll: {
      x: 960,
      y: 450,
    },
    currentLob: getCurrentLob(this.props.mode_lob),
    contract_year: "",
    month: 0,
    formulary_ids: Array(),
    maintenance_type: "MM",
    effectiveDate: "",
  };

  static contextType = formularyDetailsContext;
  showFormularyGrid = () => {
    debugger;
    this.setState({
      isFormularyGridShown: !this.state.isFormularyGridShown,
    });
    this.props
      .fetchFormularyList({
        lob_id: this.props.mode_lob,
        contract_year: this.state.contract_year,
      })
      .then((data) => {
        this.loadGridData(this.props.formulary_list);
      });
  };
  rowSelectionChange = (rowData) => {
    console.log("{rowSelectionChange}:", rowData);
    const tempIds = this.state.formulary_ids;
    let index = rowData.key - 1;
    let ids = rowData.map((rowData) => {
      return this.props.formulary_list[rowData.key - 1].id_formulary;
    });
    console.log("{ids}:", ids);
    // tempIds.push(this.props.formulary_list[index].id_formulary);
    console.log("{list}:", this.props.formulary_list);
    console.log("index", index);
    console.log("{tempIds}:", tempIds);
    this.setState({
      formulary_ids: ids,
    });
  };
  componentDidMount() {
    this.setState({
      columns: getFormularyGridColumns(),
      // data: getFormularyGridData(),
    });
    // this.props.fetchLandingData({ index: 0, limit: 10 });
    this.props.fetchContractYearData();
    console.log(this.props.contract_year);

    // console.log("{mode_lob}:", this.props.mode_lob);
    // this.setState({ currentLob: getCurrentLob(this.props.mode_lob) });
  }

  onContractYear = (year) => {
    console.log("value:", year);
    this.setState({ contract_year: year });
    if (this.props.mode_lob === 1) {
      this.props
        .fetchSubmissionMonths({
          lob_id: this.props.mode_lob,
          contract_year: year,
        })
        .then(() => {});
    }
  };
  onMonth = (month_id) => {
    console.log(month_id);
    this.setState({ month: month_id });
  };

  onSelectMaintenanceType = (e) => {
    console.log("{onSelectMaintenanceType}", e.target);
    this.setState({ maintenance_type: e.target.value });
  };

  onSelectEffectiveData = (date, dateString) => {
    console.log("{onSelectEffectiveData}", date, dateString);
    this.setState({ effectiveDate: dateString });
  };

  onSave = (type:boolean) => {
    debugger;
    let apiDetails = {};
    apiDetails = {};
    apiDetails["added_formulary_ids"] = this.state.formulary_ids;
    apiDetails["code_value"] = this.state.maintenance_type;
    apiDetails["contract_year"] = this.state.contract_year;
    apiDetails["id_lob"] = this.props.mode_lob_modified;
    apiDetails["id_submission_month"] = this.state.month;
    apiDetails["is_validation_required"] = type;
    apiDetails["removed_formulary_ids"] = [];
    apiDetails["effective_date"] = this.state.effectiveDate;

    console.log("apidetaiel:", apiDetails);

    this.props.save(apiDetails).then((res) => {
      console.log("respons in setup", res);
      if (res.payload) {
        if (res.payload.code == 200) {
          //update the redux for next tabs..
          this.props.fetchCompleteTabData({id_maintenance_formulary: res.payload.id_formulary_maintenance}).then((json) =>{
            if (json.payload){
              let obj = Object.assign({}, json.payload.list)
              obj["id_maintenance_formulary"]=obj.id_formulary_maintenance;
              this.props.setSelectedRow(obj);
              showMessage("Success", "success");
              if (type) {
                  this.props.onClickTab(1);
              }else {
                showMessage("Failure", "error");
              }
            }
          });
          
        }
        // return true;
      } else {
        showMessage("Failure", "error");
        }
    });
  };

  // onSaveAndContinue = () => {
  //   let apiDetails = {};
  //   apiDetails = {};
  //   apiDetails["code_value"] = this.state.maintenance_type;
  //   apiDetails["id_submission_month"] = this.state.month;
  //   apiDetails["contract_year"] = this.state.contract_year;
  //   apiDetails["effective_date"] = this.state.effectiveDate;
  //   apiDetails["id_lob"] = this.props.mode_lob;
  //   apiDetails["added_formulary_ids"] = this.state.formulary_ids;
  //   apiDetails["removed_formulary_ids"] = [];
  //   apiDetails["is_validation_required"] = true;
  //   // apiDetails[
  //   //   "id_formulary_maintenance"
  //   // ] = this.props.id_formulary_maintenance;

  //   console.log("apidetaiel:", apiDetails);

  //   this.props
  //     .saveAndContinue({
  //       apiDetails,
  //       id_formulary_maintenance: this.props.id_formulary_maintenance,
  //     })
  //     .then((res) => {
  //       console.log("respons in setup", res);
  //       if (res.payload) {
  //         if (res.payload.code == 200) {
  //           showMessage("Success", "success");
  //           // if (saveMode) {
  //           this.props.onClickTab(1);
  //           // }
  //         }
  //         // return true;
  //       } else {
  //         showMessage("Failure", "error");
  //         // return false;
  //       }
  //     });
  // };

  loadGridData = (list) => {
    let tmpData = list;
    let count = 1;
    var data: any[] = [];
    var gridData: any = tmpData.map(function (el) {
      var element = Object.assign({}, el);
      data.push(element);
      let gridItem = {};
      gridItem["id"] = count;
      gridItem["key"] = count;
      gridItem["cms_formulary_id"] = element.cms_formulary_id;
      gridItem["last_approved_version"] = element.last_approved_version;
      gridItem["formulary_name"] = element.formulary_name;
      gridItem["contract_year"] = element.contract_year;
      gridItem["formulary_type"] = element.formulary_type;
      count++;
      return gridItem;
    });
    this.setState({ formularyData: data, formularyGridData: gridData });
  };

  render() {
    console.log("contactt");

    const {
      isFormularyGridShown,
      columns,
      data,
      formularyGridData,
      scroll,
      pinData,
      currentLob,
    } = this.state;
    const months = this.props.submission_months.map((month) => {
      return {
        key: month.id_submission_month,
        value: month.submission_month_name,
      };
    });
    let dataGrid = <FrxLoader />;
    if (data) {
      dataGrid = (
        <>
          <FrxGridContainer
            applyFilter
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName=""
            isFetchingData={false}
            columns={columns}
            scroll={scroll}
            enableResizingOfColumns={false}
            data={formularyGridData}
            // pinning columns
            isPinningEnabled={false}
            // setting gear 1st column
            enableSettings={true}
            // checkbox 2nd column
            isCustomCheckboxEnabled={true}
            // event reference for checkbox (mandotory if checkbox is true)
            handleCustomRowSelectionChange={(r) => {
              console.log(r);
              this.rowSelectionChange(r);
            }}
          />
          <div className="move-right">
            <Button
              label="save"
              style={{
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => this.onSave(false)}
            />
            <Button
              label="save&continue"
              style={{
                cursor: "pointer",
              }}
              onClick={() => this.onSave(true)}
            />
          </div>
        </>
      );
    }
    return (
      <div className="_mass-maintainance-setup-root">
        <div className="bordered details-top">
          <div className="header">Formulary Maintenance</div>
          <div className="inner-container p-20">
            <div className="flex-container">
              <label className="uppercase">
                lob &nbsp;<span className="asterisk">*</span>
              </label>
              <div>
                <DropDown
                  className="w-80 dropdown-fields"
                  placeholder="Select LOB"
                  defaultValue={
                    currentLob.text
                    // this.context.selectedLOBType === "medicare"
                    //   ? "Medicare"
                    //   : "Commercial"
                  }
                  options={[]}
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex-container m-t-30">
              <label className="uppercase">
                what type of maintenance do you want to perform &nbsp;
                <span className="asterisk">*</span>
              </label>
              <div className="root-container">
                <RadioButton
                  label="Manual Maintenance"
                  name="mass-maintenance-setup"
                  value="MM"
                  checked={this.state.maintenance_type == "MM" ? true : false}
                  onClick={this.onSelectMaintenanceType}
                />
                {this.props.mode_lob == 1 ? (
                  <RadioButton
                    label="FRF Change Report Maintenance"
                    name="mass-maintenance-setup"
                    value="FRFCRM"
                    onClick={this.onSelectMaintenanceType}
                  />
                ) : null}
              </div>
            </div>
            <div className="flex-container-row m-t-30">
              <div>
                <label className="uppercase">
                  service year&nbsp;
                  <span className="asterisk">*</span>
                </label>
                <div>
                  <DropDown
                    // isOptionsObj
                    className="w-80 dropdown-fields"
                    placeholder=""
                    // defaultValue="2021
                    value={this.state.contract_year}
                    onChange={this.onContractYear}
                    options={this.props.contract_year.map((year) => {
                      return year.contract_year;
                    })}
                  />
                  {/* <DropDownMap
                    className="formulary-type-dropdown"
                    // placeholder="All"
                    options={months}
                    onChange={this.onMonth}
                    valueProp={"key"}
                    dispProp={"value"}
                    value={this.state.month}
                  /> */}
                </div>
              </div>

              {this.props.mode_lob == 1 && (
                <div>
                  <label className="uppercase">submission month</label>

                  <div>
                    {/* <Input placeholder="" className="submission-month-input" /> */}
                    <DropDownMap
                      className="formulary-type-dropdown"
                      // placeholder="All"
                      options={months}
                      onChange={this.onMonth}
                      valueProp={"key"}
                      dispProp={"value"}
                      value={this.state.month}
                    />
                  </div>
                </div>
              )}
              <div className="margin-right-10">
                <label className="uppercase">
                  EFFECTIVE DATE of change&nbsp;
                  <span className="asterisk">*</span>
                </label>
                <div>
                  <CustomDatePicker
                    format={"YYYY-MM-DD"}
                    className="__effective-date"
                    placeholder=""
                    suffixIcon={
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ant-picker-suffix"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                          fill="#C4C4C4"
                        />
                      </svg>
                    }
                    onchange={this.onSelectEffectiveData}
                    value={this.state.effectiveDate}
                  />
                </div>
              </div>
            </div>
            <div className="move-right">
              <Button
                label={
                  isFormularyGridShown ? "Hide Formularies" : "Show Formularies"
                }
                style={{
                  cursor: "pointer",
                }}
                onClick={this.showFormularyGrid}
              />
            </div>
          </div>
        </div>
        {isFormularyGridShown ? (
          <div className="bordered details-top">
            <div className="header">Select Formularies to apply updates to</div>
            <div className="inner-container">{dataGrid}</div>
          </div>
        ) : null}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mode_lob: state?.application?.current_lob ,
    mode_lob_modified: state?.application?.current_lob == 3 ? 4 : state?.application?.current_lob ,
    id_lob: state?.maintenance?.selectedRow?.id_lob,
    contract_year: state?.maintenance?.setupOptions?.contract_year,
    formulary_list: state?.maintenance?.setupOptions?.list,
    formulary_list_count: state?.maintenance?.setupOptions?.count,
    submission_months: state?.maintenance?.setupOptions?.submission_months,
    id_formulary_maintenance:
      state?.maintenance?.setupOptions?.id_formulary_maintenance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContractYearData: () => dispatch(fetchContractYearData()),
    fetchLandingData: (a) => dispatch(fetchLandingData(a)),
    fetchFormularyList: (a) => dispatch(fetchFormularyList(a)),
    fetchSubmissionMonths: (a) => dispatch(fetchSubmissionMonths(a)),
    save: (a) => dispatch(save(a)),
    saveAndContinue: (a) => dispatch(saveAndContinue(a)),
    fetchCompleteTabData: (a) => dispatch(fetchCompleteTabData(a)),
    setSelectedRow: (a) => dispatch(setSelectedRow(a)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassMaintenanceSetup);
//