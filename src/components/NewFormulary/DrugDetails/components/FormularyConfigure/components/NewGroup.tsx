import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "../../../../../shared/Frx-components/button/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import GroupHeader from "./GroupHeader";
import { Box, Grid, Input } from "@material-ui/core";
import AlertMessages from "./AlertMessages";
import { ToastContainer } from "react-toastify";
import showMessage from "../../../../Utils/Toast";
import SearchableDropdown from "../../../../../shared/Frx-components/SearchableDropdown";
import { scrollPage } from "../../../../../../utils/formulary";
import { Tag, Space } from "antd";
import Tags from "./Tags";
import { saveGDM, editGDM, getSTGroupDetails } from "../../../../../../redux/slices/formulary/gdm/gdmSlice";
// import {
//   saveGDM,
//   editGDM,
// } from "../../../../../../redux/slices/formulary/gdm/gdmSlice";
import {
  getStGrouptDescription,
  getDrugLists,
  getStGrouptDescriptions,
  getStGrouptDescriptionVersions,
} from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import { getCategoryList, getAdditionalCriteriaSectionList } from "../../../../NewAdvanceSearch/advanceSearchMock";
import AdditionalCriteriaContainer from "../../../../NewAdvanceSearch/AdditionalCriteriaContainer/AdditionalCriteriaContainer";
import TextareaAutosize from "react-textarea-autosize";
import "./GroupDescriptionStyles.scss";
import { debug } from "console";

interface Props {
  tooltip?: string;
  formType?: number;
  editMode?: boolean;
}

interface initialFormData {
  file_type: any;
  is_rx_drug_type: any;
  is_otc_drug_type: any;
  st_criteria: any;
  change_indicator: any;
  excluded_drug_file: any;
  st_group_description_name: any;
  mmp_st_criteria: any;
  st_criteria_change_indicator: any;
  is_additional_criteria_defined: any;
  is_suppress_criteria_dispaly_cms_approval: any;
  is_display_criteria_drugs_not_frf: any;
  is_validation_required: any;
  st_type: any;
  id_st_type: any;
  drug_list_ids: any;
}

const initialFormData: initialFormData = {
  file_type: "FAOTC",
  is_rx_drug_type: false,
  is_otc_drug_type: false,
  st_criteria: "",
  change_indicator: "",
  excluded_drug_file: "",
  st_group_description_name: "",
  mmp_st_criteria: "",
  st_criteria_change_indicator: false,
  is_additional_criteria_defined: false,
  is_suppress_criteria_dispaly_cms_approval: false,
  is_display_criteria_drugs_not_frf: false,
  is_validation_required: false,
  st_type: "Always Applies(1)",
  id_st_type: 7,
  drug_list_ids: [],
};

function mapStateToProps(state) {
  // if(state?.saveGdm?.success!=="" && state?.saveGdm?.success!==null){
  //   showMessage('Saved Successfully', 'success');
  // }
  // if(state?.saveGdm?.error){
  //   if(state.saveGdm.error.length>0){
  //     state.saveGdm.error.map(err => {
  //       showMessage(err.message, 'error');
  //     })}else{
  //     showMessage(state?.saveGdm?.error?.data?.message, 'error');
  //   }
  // }
  return {
    formulary_id: state.application.formulary_id,
    StGDData: state.stepTherapyReducer.description, // earlier it data
    version: state.stVerion.stVersion,
    saveGdm: state.saveGdm,
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id, //comme- 4, medicare-1 , medicate-2, exchnage -3
    formulary_type_id: state?.application?.formulary_type_id,
    additionalCriteriaObject: state?.additionalCriteria?.additionalCriteriaBody,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveGDM: (data) => dispatch(saveGDM(data)),
    editGDM: (data) => dispatch(editGDM(data)),
    getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    getStGrouptDescriptions: (arg) => dispatch(getStGrouptDescriptions(arg)),
    getStGrouptDescriptionVersions: (arg) => dispatch(getStGrouptDescriptionVersions(arg)),
    getSTGroupDetails: (arg) => dispatch(getSTGroupDetails(arg)),
  };
}

function NewGroup(props: any) {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [editable, setEditable] = React.useState(false);
  const [changeEvent, setChangeEvent] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(props.formType);
  const [errorClass, setErrorClass] = React.useState("");
  const [drug_list_ids, setDrug_list_ids] = React.useState([]);
  const [drug_list, setDrug_list] = React.useState([]);
  const [isAdditionalCriteriaOpen, toggleAdditionalCriteriaOpen] = useState(false);
  const [isSetupComplete, isSetUpComplete] = React.useState(false);
  const [disableExcludedFile, setDisableExcludedFile] = useState(true);
  const [disableAddFile, setDisableAddFile] = useState(true);

  const [additionalCriteria, setAdditionalCriteria] = useState(null);
  const handleChange = (e) => {
    const formVal =
      e.target.value === "yes" || e.target.value === "true"
        ? true
        : e.target.value === "no" || e.target.value === "false"
        ? false
        : e.target.value;
    updateFormData({
      ...formData,
      [e.target.name]: formVal,
    });
  };
  const [formType, setFormType] = React.useState(props.formType);
  const openAdditionalCriteria = () => toggleAdditionalCriteriaOpen(true);
  const closeAddiionalCriteria = () => toggleAdditionalCriteriaOpen(false);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  const onChange = (e) => {
    if (Object.keys(props.StGDData).length > 0 && e && e != "no") {
      //const verLength = Object.keys(props.version).length;
      const isEditable = props.version[Number(e.split(" ")[1]) - 1]
        ? props.version[Number(e.split(" ")[1]) - 1].is_setup_complete
        : false;
      setEditable(isEditable);
      setChangeEvent(true);
      updateFormData({
        ...formData,
        ...props.StGDData,
      });
    } else {
      setChangeEvent(false);
    }
  };

  useEffect(() => {
    setFormType(props.formType);
  }, []);

  useEffect(() => {
    setFormType(props.formType);
  }, [props.formType]);

  useEffect(() => {
    // debugger;
    console.log(props.additionalCriteriaObject);
    setAdditionalCriteria(props.additionalCriteriaObject);
  }, [props.additionalCriteriaObject]);

  useEffect(() => {
    debugger;
    if (props.formulary?.supplemental_benefits) {
      let benefits = props.formulary?.supplemental_benefits;
      //let fileTypeOTC = benefits.filter((obj) => obj.id_supplemental_benefit==17).length>0 ?true:false;
      let fileTypeADD = benefits.filter((obj) => obj.id_supplemental_benefit == 18).length > 0 ? false : true;
      let fileTypeExcluded = benefits.filter((obj) => obj.id_supplemental_benefit == 19).length > 0 ? false : true;
      setDisableExcludedFile(fileTypeExcluded);
      setDisableAddFile(fileTypeADD);
      debugger;
    }
    updateFormData(initialFormData);
    isSetUpComplete(props.isSetUpComplete);
    setDrug_list_ids([]);
    if (Object.keys(props.StGDData).length > 0) {
      let tmpVersion = props.version.length > 0 &&
      props.version.find((val) =>
                      val.id_st_group_description === props.saveGdm.current_group_des_id);
      if (tmpVersion==null){
        tmpVersion =  props.version[props.version.length - 1];
      }
      isSetUpComplete(tmpVersion.is_setup_complete);
      setEditable(tmpVersion.is_setup_complete);

      // if (!changeEvent) {
      //   const verLength = Object.keys(props.version).length;
      //   const isEditable = props.version[verLength - 1]
      //     ? props.version[verLength - 1].is_setup_complete
      //     : false;
      //   setEditable(isEditable);
      // }
      updateFormData({
        ...formData,
        ...props.StGDData,
      });
      setDrug_list_ids(props.StGDData.drug_list_ids);
    }
    if (!props.editMode) {
      setEditable(false);
    }
    setShowHeader(0);
    setErrorClass("");
    props.getDrugLists(props.client_id).then((json) => {
      let tmp_list: any = [];
      json?.payload?.data.map((obj) => {
        let tmp_obj = {
          key: obj.key,
          value: obj.value,
          text: obj.text,
          name: obj.text,
          show: true,
          is_list: false,
          type: "",
        };
        tmp_list.push(tmp_obj);
      });
      setDrug_list(tmp_list);
    });
  }, [props.StGDData , props.version, props.saveGdm , props.editMode,props.isSetUpComplete ]);

  const handleSubmit = (e, is_validation: boolean) => {
    e.preventDefault();
    if ( props.formulary_lob_id === 1) {
      let msg: string[] = [];
      if (formData.st_group_description_name === "") {
        //msg.push("Formulary Description Name is required.");
        showMessage("Formulary Description Name is required.", "error");
      }
      if (formData.st_criteria === "" &&  formData.file_type === "FAOTC") {
        //msg.push("ST Criteria is required.");
        showMessage("ST Criteria is required.", "error");
      }
      if (formData.change_indicator === "" && formData.file_type === "FAOTC") {
        //msg.push("Change Indicator is required.");
        showMessage("Change Indicator is required.", "error");
      }
      if (msg.length > 0) {
        console.log(msg);
        setErrorClass("invalid");
        return;
      }
    }
    

    if (props.formulary_lob_id === 4) {
      let msg: string[] = [];
      if (formData.st_group_description_name === "") {
        //msg.push("Formulary Description Name is required.");
        showMessage("Formulary Description Name is required.", "error");
      }
      if (msg.length > 0) {
        console.log(msg);
        setErrorClass("invalid");
        return;
      }
    }
   
    setErrorClass("");
    //formData["id_st_type"] = formData["st_type"] === "New Starts Only(2)" ? 8 : 7;
    formData["is_validation_required"] = is_validation;
    formData["drug_list_ids"] = drug_list_ids;
    formData["removed_drug_list_ids"] = [2];
    let requestData = {};
    debugger;
    if (formType == 1) {
      requestData["messageBody"] = { ...formData };
      if (additionalCriteria != null) {
        requestData["messageBody"]["um_criteria"] = additionalCriteria;
      }
      requestData["lob_type"] = props.formulary_lob_id;
      requestData["apiPart"] = "api/1/mcr-st-group-description";
      let id_st_group_description = props.saveGdm.current_group_des_id;
      requestData["pathParams"] = "/" + id_st_group_description + "/" + props?.formulary_id + "?entity_id=0";
      props.editGDM(requestData).then((json) => {
        if (json?.payload && json?.payload?.success?.data?.code === "200") {
          showMessage("Saved Successfully", "success");
          let apiDetails = {};
          apiDetails["lob_type"] = props.formulary_lob_id;
          apiDetails["pathParams"] = "/" + props?.client_id + "?entity_id=" + props?.formulary_id;
          props.getStGrouptDescriptions(apiDetails);
          debugger;
          let id_base_st_group_description = json.payload.id_base_st_group_description
            ? json.payload.id_base_st_group_description
            : props.saveGdm.current_group_id;
          apiDetails["pathParams"] = "/" + id_base_st_group_description;
          props.getStGrouptDescriptionVersions(apiDetails).then((json) => {
            const isEditable =
              json?.payload?.data?.length > 0 &&
              json?.payload?.data?.find((val) => val.id_st_group_description === id_st_group_description);
            // props.selectGroup(
            //   id_base_st_group_description,
            //   isEditable.is_setup_complete
            // );
            isSetUpComplete(isEditable.is_setup_complete);
          });
        } else if (json?.payload?.status && json?.payload?.status != 200) {
          isSetUpComplete(false);
          setShowHeader(0);
          showMessage(json.payload.data.message, "error");
        } else {
          showMessage("Failure", "error");
        }
      });
    } else {
      formData.change_indicator = parseInt(formData.change_indicator);
      requestData["messageBody"] = { ...formData };
      if (additionalCriteria != null) {
        requestData["messageBody"]["um_criteria"] = additionalCriteria;
      }
      requestData["lob_type"] = props.formulary_lob_id;
      requestData["apiPart"] = "api/1/mcr-st-group-description/" + props.client_id;
      requestData["pathParams"] = "/" + props?.formulary_id + "?entity_id=0";
      props.saveGDM(requestData).then((json) => {
        if (json?.payload && json?.payload?.success?.data?.code === "200") {
          showMessage("Saved Successfully", "success");
          let apiDetails = {};
          setFormType(1);

          props.getSTGroupDetails({
            formulary_id: props.formulary_id,
            current_group_id: json.payload.success.data.id_base_st_group_description,
            current_group_des_id: json.payload.success.data.id_st_group_description,
          });

          formData["id_st_group_description"] = json.payload.success.data.id_st_group_description;

          apiDetails["lob_type"] = props.formulary_lob_id;
          apiDetails["pathParams"] = "/" + props?.client_id + "?entity_id=" + props?.formulary_id;

          props.getStGrouptDescriptions(apiDetails);
          apiDetails["pathParams"] = "/" + json.payload.success.data.id_base_st_group_description;

          let id_base_st_group_description = json.payload.success.data.id_base_st_group_description;
          props.getStGrouptDescriptionVersions(apiDetails).then((json) => {
            const isEditable =
              json?.payload?.data?.length > 0 &&
              json?.payload?.data.find((val) => val.id_st_group_description === formData["id_st_group_description"]);
            props.selectGroup(id_base_st_group_description, isEditable.is_setup_complete);
            isSetUpComplete(isEditable.is_setup_complete);
          });
        } else if (json?.payload?.status && json?.payload?.status != 200) {
          isSetUpComplete(false);
          setShowHeader(0);
          showMessage(json.payload.data.message, "error");
        } else {
          showMessage("Failure", "error");
        }
      });
    }
    setShowHeader(1);
    scrollPage(0, 500);
  };
  const getAutoCompleteChangeHandler = (val) => {
    setDrug_list_ids(val);
  };
  return (
    <div className="new-group-des __root-pa-gd-popup">
      <div className="panel header">
        <span>
          {(props.formType > 0 || showHeader > 0) && formData.st_group_description_name
            ? formData.st_group_description_name
            : props.title}
        </span>
        {props.isPopUpView}
        {props.isPopUpView && (
          <div className="button-wrapper button-flex-container">
            <Button
              label="Select This Group"
              className="Button auto-width"
              onClick={(event) => props.selectGroupDescriptionClick(props.saveGdm.current_group_id)}
            />
          </div>
        )}
      </div>

      {(formType > 0 || showHeader > 0) && (
        <GroupHeader
          popuptitle={formData.st_group_description_name ? formData.st_group_description_name : props.title}
          onChange={onChange}
          isPopUpView={props.isPopUpView}
          isSetupComplete={isSetupComplete}
        />
      )}
      {props.formulary_lob_id === 1 && (
        <div className="inner-container">
          <div className="setting-1">
            <span>What file type is this group description for? *</span>
            {/* <AlertMessages delay="10000" error={props.saveGdm.error} success={props.saveGdm.success} /> */}
            <div className="marketing-material radio-group">
              <RadioGroup
                aria-label="marketing-material-radio1"
                className="gdp-radio"
                name="file_type"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="FAOTC"
                  control={<Radio checked={formData.file_type === "FAOTC" ? true : false} />}
                  label="Formulary/OTC"
                  disabled={editable}
                />
                <FormControlLabel
                  value="ExD"
                  control={<Radio checked={formData.file_type === "ExD" ? true : false} />}
                  label="Excluded"
                  disabled={editable || disableExcludedFile}
                />
                <FormControlLabel
                  value="ADD"
                  control={<Radio checked={formData.file_type === "ADD" ? true : false} />}
                  label="ADD"
                  disabled={editable || disableAddFile}
                />
              </RadioGroup>
            </div>
            <Grid container>
              <Grid item xs={6}>
                <div className="group">
                  <label>
                    ST GROUP DESCRIPTION<span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    name="st_group_description_name"
                    onChange={handleChange}
                    value={formData.st_group_description_name}
                    disabled={editable}
                    className={errorClass}
                  />
                </div>
              </Grid>
            </Grid>
            {(formData.file_type === "ExD") && (
              <Grid container className="mb-20">
                <Grid item xs={6}>
                  <div className="group">
                    <label>EXCLUDED DRUG FILE</label>
                    <input
                      type="text"
                      name="excluded_drug_file"
                      onChange={handleChange}
                      value={formData.excluded_drug_file}
                      disabled={editable}
                    />
                  </div>
                </Grid>
              </Grid>
            )}

            {(formData.file_type === "ADD") && (
              <Grid container className="mb-20">
                <Grid item xs={6}>
                  <div className="group">
                    <label>MMP/Model/Demo ST Criteria:</label>
                    <input
                      type="text"
                      name="mmp_st_criteria"
                      onChange={handleChange}
                      value={formData.mmp_st_criteria}
                      disabled={editable}
                    />
                  </div>
                </Grid>
              </Grid>
            )}


          </div>
          {(formData.file_type === "FAOTC") && (
            <div className="setting-1 mb-20">
              <span>What type of drugs will this group contain? Select all that apply.</span>
              <div className="marketing-material-chks checkbox-group">
                <div className="checkbox">
                  <Checkbox
                    checked={formData.is_rx_drug_type}
                    onChange={handleCheckBox}
                    disabled={editable}
                    name="is_rx_drug_type"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  RX
                </div>
                <div className="checkbox">
                  <Checkbox
                    checked={formData.is_otc_drug_type}
                    onChange={handleCheckBox}
                    disabled={editable}
                    name="is_otc_drug_type"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  OTC
                </div>
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div className="group">
                    <label>
                      ST CRITERIA<span className="astrict">*</span>
                      <div className="panel-tooltip">
                        <Tooltip
                          classes={{
                            tooltip: "custom-tooltip panel-tooltip",
                          }}
                          title={props.tooltip}
                          placement="top-start"
                          arrow
                        >
                          <svg
                            className="info-icon"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z"
                              fill="#1D54B4"
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </label>
                    <input
                      type="text"
                      name="st_criteria"
                      onChange={handleChange}
                      value={formData.st_criteria}
                      disabled={editable}
                      className={errorClass}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container className="mb-20">
                <Grid item xs={6}>
                  <div className="group">
                    <label>
                      ST CRITERIA CHANGE INDICATOR
                      <span className="astrict">*</span>
                    </label>
                    <input
                      type="text"
                      name="change_indicator"
                      onChange={handleChange}
                      value={formData.change_indicator}
                      disabled={editable}
                      className={errorClass}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
          <div className="setting-1 mb-20">
            <span>MARKETING MATERIAL CONSIDERATIONS</span>
            <div className="marketing-material-chks">
              <div className="checkbox">
                <Checkbox
                  checked={formData.is_suppress_criteria_dispaly_cms_approval}
                  onChange={handleCheckBox}
                  disabled={editable}
                  name="is_suppress_criteria_dispaly_cms_approval"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <span>Supress Criteria and Display: Pending CMS Approval</span>
              </div>
              <div className="checkbox">
                <Checkbox
                  checked={formData.is_display_criteria_drugs_not_frf}
                  onChange={handleCheckBox}
                  disabled={editable}
                  name="is_display_criteria_drugs_not_frf"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <span>Display Criteria for Drugs not on FRF</span>
              </div>
            </div>

            <span>
              do you want to add additional criteria?
              <span className="astrict">*</span>
            </span>
            <div className="marketing-material radio-group">
              <RadioGroup
                aria-label="marketing-material-radio1"
                name="is_additional_criteria_defined"
                onChange={handleChange}
                className="gdp-radio"
                value={formData.is_additional_criteria_defined}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                  disabled={editable}
                  onClick={openAdditionalCriteria}
                />
                <FormControlLabel value={false} control={<Radio />} label="No" disabled={editable} />
              </RadioGroup>
              {isAdditionalCriteriaOpen && props.formulary_lob_id == 1 ? (
                <AdvanceSearchContainer
                  openPopup={isAdditionalCriteriaOpen}
                  onClose={closeAddiionalCriteria}
                  isAdvanceSearch={false}
                />
              ) : null}
            </div>
          </div>

          {props.isPopUpView && (
            <div>
              <AdditionalCriteriaContainer
                criteriaList={getAdditionalCriteriaSectionList()}
                handleChildDataSave={() => {}}
                isReadOnly={true}
              />
            </div>
          )}
          {!props.isPopUpView && (
            <div className="button-wrapper">
              <Button
                label="Save Version Progress"
                className="Button"
                onClick={(event) => handleSubmit(event, false)}
                disabled={editable}
              />
              <Button
                label="Version to Initiate Change Request"
                className="Button"
                onClick={(event) => handleSubmit(event, false)}
                disabled={editable}
              />
              <Button
                label="Version Submitted to CMS"
                className="Button"
                onClick={(event) => handleSubmit(event, true)}
                disabled={editable}
              />
            </div>
          )}
        </div>
      )}
      {props.formulary_lob_id != 1 && (
        <div className="inner-container input-border-none">
          <div className="setting-1">
            <Grid container className="mb-20">
              <Grid className="additional-criteria" item xs={12}>
                <br />
                <label>
                  What is the default pa type for this description? <span className="astrict">*</span>
                </label>{" "}
                <Space size="large">
                  <div className="marketing-material radio-group">
                    <RadioButton
                      label="Always Applies"
                      name="add-filter-1"
                      // checked={isAdditionalCriteriaOpen}
                      onClick={() =>
                        updateFormData({
                          ...formData,
                          id_st_type: 7,
                        })
                      }
                      disabled={props.editable}
                      checked={formData.id_st_type === 7}
                    />
                    <RadioButton
                      label="New Starts Only"
                      name="add-filter-1"
                      // checked={!isAdditionalCriteriaOpen}
                      onClick={() =>
                        updateFormData({
                          ...formData,
                          id_st_type: 8,
                        })
                      }
                      disabled={props.editable}
                      checked={formData.id_st_type === 8}
                    />
                  </div>
                </Space>
              </Grid>

              <Grid item xs={12}>
                <div className="group">
                  <label>
                    ST GROUP DESCRIPTION <span className="astrict">*</span>
                  </label>
                  {/* <input
                    className="custom-textfield"
                    type="text"
                    name="st_group_description_name"
                    onChange={handleChange}
                    value={formData.st_group_description_name}
                    disabled={editable}
                  /> */}
                  <TextareaAutosize
                    minRows={1}
                    maxRows={6}
                    style={{ width: "100%" }}
                    className="custom-textfield-2"
                    name="st_group_description_name"
                    onChange={handleChange}
                    value={formData.st_group_description_name}
                  />
                </div>
                <br />
              </Grid>

              <Grid item xs={12}>
                <div className="group">
                  <label>ST Criteria</label>
                  {/* <input
                    className="custom-textfield"
                    type="text"
                    name="st_criteria"
                    onChange={handleChange}
                    value={formData.st_criteria}
                    disabled={editable}
                  /> */}
                  <TextareaAutosize
                    minRows={1}
                    maxRows={6}
                    style={{ width: "100%" }}
                    className="custom-textfield-2"
                    name="st_criteria"
                    onChange={handleChange}
                    value={formData.st_criteria}
                  />
                </div>
                <br />
              </Grid>

              <Grid item xs={12}>
                <div className="group tags-input-border-none">
                  <Fragment>
                    <Grid item xs={6}>
                      <label className="st-label">
                        List <span className="astrict">*</span>
                      </label>
                      <Tags
                        options={drug_list}
                        getAutoCompleteChange={getAutoCompleteChangeHandler}
                        autoSelected={drug_list_ids}
                        editable={editable}
                      />
                    </Grid>
                  </Fragment>
                </div>
                <br />
              </Grid>

              <Grid className="additional-criteria" item xs={12}>
                <label>
                  do you want to add additional criteria? <span className="astrict">*</span>
                </label>
                <Space size="large">
                  <div className="marketing-material radio-group">
                    <RadioButton
                      label="Yes"
                      name="add-filter-2"
                      // checked={isAdditionalCriteriaOpen}
                      onClick={() => {
                        if (!props.isPopUpView) {
                          openAdditionalCriteria();
                        }
                        updateFormData({
                          ...formData,
                          is_additional_criteria_defined: true,
                        });
                      }}
                      disabled={formData.is_additional_criteria_defined ? false : editable}
                      checked={formData.is_additional_criteria_defined}
                    />
                    <RadioButton
                      label="No"
                      name="add-filter-2"
                      // checked={!isAdditionalCriteriaOpen}
                      onClick={() =>
                        updateFormData({
                          ...formData,
                          is_additional_criteria_defined: false,
                        })
                      }
                      disabled={editable}
                      checked={!formData.is_additional_criteria_defined}
                    />
                  </div>
                </Space>
                {isAdditionalCriteriaOpen && props.formulary_lob_id != 1 ? (
                  <AdvanceSearchContainer
                    openPopup={isAdditionalCriteriaOpen}
                    onClose={closeAddiionalCriteria}
                    isAdvanceSearch={false}
                    editable={editable}
                  />
                ) : null}
              </Grid>
            </Grid>
            <br />
          </div>
          {/* {props.formType===0 && (<div className="setting-1 mb-20">
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                           
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>
                </div>)} */}
          {props.isPopUpView && (
            <AdditionalCriteriaContainer
              criteriaList={getAdditionalCriteriaSectionList()}
              handleChildDataSave={() => {}}
              isReadOnly={props.isPopUpView}
            />
          )}
          {!props.isPopUpView && (
            <div className="button-wrapper st-button-wrapper">
              <Button
                label="Save Version Progress"
                className="Button"
                onClick={(event) => handleSubmit(event, false)}
                disabled={editable}
              />
              <Button
                label="Save Final Version And Continue"
                className="Button"
                onClick={(event) => handleSubmit(event, true)}
                disabled={editable}
              />
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
