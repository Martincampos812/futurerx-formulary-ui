import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../../shared/Frx-components/button/Button";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDownMap";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from "../../DrugGrid";
import Tooltip from "@material-ui/core/Tooltip";
import { Box, Grid, Input } from "@material-ui/core";
import PAGroupHeader from "./PAGroupHeader";
import AlertMessages from "./AlertMessages";
import { ToastContainer } from "react-toastify";
import showMessage from "../../../../Utils/Toast";
import Tags from "./Tags";
import { getPAGroupDetails } from "../../../../../../redux/slices/formulary/pagdm/pagdmSlice";
import { getCategoryList, getAdditionalCriteriaSectionList } from "../../../../NewAdvanceSearch/advanceSearchMock";
import AdditionalCriteriaContainer from "../../../../NewAdvanceSearch/AdditionalCriteriaContainer/AdditionalCriteriaContainer";

import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import {
  getPaGrouptDescription,
  getPaTypes,
  getDrugLists,
  postPAGroupDescription,
  putPAGroupDescription,
  getPaGrouptDescriptionVersions,
  getPaGrouptDescriptions,
} from "../../../../../../redux/slices/formulary/pa/paActionCreation";
import SearchableDropdown from "../../../../../shared/Frx-components/SearchableDropdown";
import { Tag, Space } from "antd";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import TextareaAutosize from "react-textarea-autosize";
import "./GroupDescriptionStyles.scss";
import "./PANewGroupForm.scss";
interface Props {
  tooltip?: string;
  formType?: number;
  editMode?: boolean;
  drugList?: any;
}
interface initialFormData {
  is_validation_required: any;
  pa_group_description: any;
  pa_criteria: any;
  file_type: any;
  id_pa_type: any;
  is_rx_drug_type: any;
  is_otc_drug_type: any;
  change_indicator: any;
  excluded_drug_file: any;
  pa_group_description_name: any;
  mmp_pa_criteria: any;
  pa_criteria_change_indicator: any;
  is_additional_criteria_defined: any;
  is_suppress_criteria_dispaly_cms_approval: any;
  is_display_criteria_drugs_not_frf: any;
  id_indication_indicator: any;
  off_label_uses: any;
  exclusion_criteria: any;
  required_medical_info: any;
  age_restrictions: any;
  prescriber_restrictions: any;
  coverage_restrictions: any;
  other_criteria: any;
  drug_list_ids: any;
}

const initialFormData: initialFormData = {
  is_validation_required: true,
  pa_group_description: null,
  pa_criteria: null,
  file_type: "FAOTC",
  id_pa_type: null,
  is_rx_drug_type: false,
  is_otc_drug_type: false,
  change_indicator: null,
  excluded_drug_file: null,
  pa_group_description_name: "",
  mmp_pa_criteria: null,
  pa_criteria_change_indicator: null,
  is_additional_criteria_defined: false,
  is_suppress_criteria_dispaly_cms_approval: false,
  is_display_criteria_drugs_not_frf: false,
  id_indication_indicator: null,
  off_label_uses: null,
  exclusion_criteria: null,
  required_medical_info: null,
  age_restrictions: null,
  prescriber_restrictions: null,
  coverage_restrictions: null,
  other_criteria: null,
  drug_list_ids: [],
};
const formInformationPanelTabs = [
  {
    id: 1,
    text: "PA Criteria Change Indicator",
  },
  {
    id: 2,
    text: "PA Indication Indicator",
  },
];

const FormInformationPanel = (props: any) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = formInformationPanelTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    setActiveTabIndex(activeTabIndex);
  };

  const renderActiveTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return (
          <div className="pa-form-information-panel__criteria">
            Value is assigned based on a comparison of the current criteria and criteria applied to the previous year's
            formulary that the current year most closely resembles, defined in the Formulary General Information Page.
            Any difference will result in the value to be 1.
          </div>
        );
      case 1:
        return (
          <div className="pa-form-information-panel__indication">
            <div>
              <div className="pa-form-information-panel__indication-text">
                <span className="prefix-text">1</span>
                <div>
                  All FDA-approved Indications. This value cannot be used if the drug that requires PA is subject to
                  Indication-Based Coverage (IBC).
                </div>
              </div>
              <div className="pa-form-information-panel__indication-text">
                <span className="prefix-text">2</span>
                <div>
                  Some FDA-approved Indications Only. This value is to be submitted for drugs that are subject to IBC.
                </div>
              </div>
              <div className="pa-form-information-panel__indication-text">
                <span className="prefix-text">3</span>
                <div>
                  All Medically-accepted Indications. Drugs for which the PA will be approved for all Part D
                  medically-accepted indications (FDA-approved and compendia-supported) should be submitted with a 3.
                </div>
              </div>
              <div className="pa-form-information-panel__indication-text">
                <span className="prefix-text">4</span>
                <div>
                  All FDA-approved Indications, Some Medically-accepted Indications. If the PA will only be approved for
                  specific off-label uses, a 4 should be submitted. The additional off-label uses should be submitted in
                  the subsequent Off-Label Uses field.
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pa-form-information-panel">
      <div className="inner-container">
        <div className="configure-mini-tabs">
          <FrxMiniTabs tabList={formInformationPanelTabs} activeTabIndex={activeTabIndex} onClickTab={onClickTab} />
        </div>
      </div>
      <div>{renderActiveTabContent()}</div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getPaGrouptDescription: (a) => dispatch(getPaGrouptDescription(a)),
    postPAGroupDescription: (a) => dispatch(postPAGroupDescription(a)),
    putPAGroupDescription: (a) => dispatch(putPAGroupDescription(a)),
    getPaGrouptDescriptions: (a) => dispatch(getPaGrouptDescriptions(a)),
    getPaGrouptDescriptionVersions: (a) => dispatch(getPaGrouptDescriptionVersions(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    getPAGroupDetails: (a) => dispatch(getPAGroupDetails(a)),
  };
}

function mapStateToProps(state) {
  return {
    formulary_id: state.application.formulary_id,
    formulary: state.application.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    client_id: state.application.clientId,
    PaGDData: state.paReducer.description,
    version: state.paVersion.paVersion,
    additionalCriteriaObject: state?.additionalCriteria?.additionalCriteriaBody,
    savePaGdm: state.savePaGdm,
  };
}

function NewGroup(props: any) {
  // class NewGroup extends React.Component <any ,any> {
  const [formData, updateFormData] = React.useState(initialFormData);
  // const [placeHolder, setPlaceHolder] = React.useState(props.versionTitle);
  // const [latestId, setLatestId] = React.useState(props.latestVerion);
  // const [panelColor, setPanelColor] = React.useState('');
  const [editable, setEditable] = React.useState(false);
  const [changeEvent, setChangeEvent] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(props.formType);
  const [errorClass, setErrorClass] = React.useState("");
  const [drug_list_ids, setDrug_list_ids] = React.useState([]);
  const [drug_list, setDrug_list] = React.useState([]);
  const [formType, setFormType] = React.useState(props.formType);

  const [isSetupComplete, isSetUpComplete] = React.useState(false);

  const [isAdditionalCriteriaOpen, toggleAdditionalCriteriaOpen] = useState(false);

  const [additionalCriteria, setAdditionalCriteria] = useState(null);

  const [disableExcludedFile, setDisableExcludedFile] = useState(true);
  const [disableAddFile, setDisableAddFile] = useState(true);

  const handleChange = (e) => {
    let tmp_value = e.target.value;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
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

  const handleChange_1 = (e) => {
    updateFormData({
      ...formData,
      change_indicator: e,
    });
  };

  const handleChange_2 = (e) => {
    updateFormData({
      ...formData,
      id_indication_indicator: e,
    });
  };

  const saveGroupDescription = (e, is_validation: boolean) => {
    let requestData = {};
    e.preventDefault();
    if (props.formulary_lob_id == 1 ) {
      let msg: string[] = [];
      if (formData.pa_group_description_name === "") {
        showMessage("Formulary Description Name is required.", "error");
        return;
      }

      if (formData.change_indicator === "" && formData.file_type === "FAOTC") {
        showMessage("Change Indicator is required.", "error");
        return;
      }

      if (formData.id_indication_indicator === "" && formData.file_type === "FAOTC") {
        showMessage("Indication Indicator is required.", "error");
        return;
      }
      if (msg.length > 0) {
        setErrorClass("invalid");
        return;
      }
    }

    if (props.formulary_lob_id != 1) {
      let msg: string[] = [];
      if (formData.pa_group_description_name === "") {
        showMessage("Formulary Description Name is required.", "error");
        return;
      }

      if (formData.id_pa_type === null) {
        showMessage("PA Type is required.", "error");
        return;
      }

      if (formData.pa_criteria === "") {
        showMessage("PA Criteria is required.", "error");
        return;
      }
    }

    //requestData['keyVals'] = [{ key: 'index', value: 0 }, { key: 'limit', value: 10 }, { key: 'entity_id', value: 1262 }];
    formData["is_validation_required"] = is_validation;
    requestData["lob_type"] = props.formulary_lob_id;
    requestData["messageBody"] = {};

    if (additionalCriteria != null) {
      requestData["messageBody"]["um_criteria"] = additionalCriteria;
    }

    if (props.formulary_lob_id == 1) {
      requestData["messageBody"]["is_validation_required"] = formData["is_validation_required"];
      requestData["messageBody"]["file_type"] = formData["file_type"];
      requestData["messageBody"]["is_rx_drug_type"] = formData["is_rx_drug_type"];
      requestData["messageBody"]["is_otc_drug_type"] = formData["is_otc_drug_type"];
      requestData["messageBody"]["change_indicator"] = formData["change_indicator"];
      requestData["messageBody"]["excluded_drug_file"] = formData["excluded_drug_file"];
      requestData["messageBody"]["pa_group_description_name"] = formData["pa_group_description_name"];
      requestData["messageBody"]["mmp_pa_criteria"] = formData["mmp_pa_criteria"];
      requestData["messageBody"]["pa_criteria_change_indicator"] = formData["pa_criteria_change_indicator"];
      requestData["messageBody"]["is_additional_criteria_defined"] = formData["is_additional_criteria_defined"];
      requestData["messageBody"]["is_suppress_criteria_dispaly_cms_approval"] =
        formData["is_suppress_criteria_dispaly_cms_approval"];
      requestData["messageBody"]["is_display_criteria_drugs_not_frf"] = formData["is_display_criteria_drugs_not_frf"];
      requestData["messageBody"]["id_indication_indicator"] = formData["id_indication_indicator"];
      requestData["messageBody"]["off_label_uses"] = formData["off_label_uses"];
      requestData["messageBody"]["exclusion_criteria"] = formData["exclusion_criteria"];
      requestData["messageBody"]["required_medical_info"] = formData["required_medical_info"];
      requestData["messageBody"]["age_restrictions"] = formData["age_restrictions"];
      requestData["messageBody"]["prescriber_restrictions"] = formData["prescriber_restrictions"];
      requestData["messageBody"]["coverage_restrictions"] = formData["coverage_restrictions"];
      requestData["messageBody"]["other_criteria"] = formData["other_criteria"];

      if (formType == 1) {
        requestData["apiPart"] = "api/1/mcr-pa-group-description";
        requestData["pathParams"] =
          "/" + formData["id_pa_group_description"] + "/" + props?.formulary_id + "?entity_id=0";
        let id_pa_group_description = formData["id_pa_group_description"] ? formData["id_pa_group_description"] : 0;
        props.putPAGroupDescription(requestData).then((json) => {
          if (json.payload && json.payload.code === "200") {
            showMessage("Success", "success");
            let apiDetails = {};
            apiDetails["lob_type"] = props.formulary_lob_id;
            apiDetails["pathParams"] = "/" + props?.client_id + "?entity_id=" + props?.formulary_id;

            props.getPaGrouptDescriptions(apiDetails);
          } else {
            if (json.payload && json.payload.message !== undefined) {
              showMessage(json.payload.message, "error");
            } else {
              showMessage("Failure", "error");
            }
          }
        });
      } else {
        requestData["apiPart"] = "api/1/mcr-pa-group-description/" + props.client_id;
        requestData["pathParams"] = "/" + props?.formulary_id + "?entity_id=0";
        props.postPAGroupDescription(requestData).then((json) => {
          if (json.payload && json.payload.code === "200") {
            showMessage("Success", "success");
            let apiDetails = {};
            apiDetails["lob_type"] = props.formulary_lob_id;
            apiDetails["pathParams"] = "/" + props?.client_id + "?entity_id=" + props?.formulary_id;
            setFormType(1);
            props.getPaGrouptDescriptions(apiDetails);
          } else {
            if (json.payload && json.payload.message !== undefined) {
              showMessage(json.payload.message, "error");
            } else {
              showMessage("Failure", "error");
            }
          }
        });
      }
    } else {
      requestData["messageBody"]["is_validation_required"] = formData["is_validation_required"];
      requestData["messageBody"]["pa_group_description_name"] = formData["pa_group_description_name"];
      requestData["messageBody"]["pa_criteria"] = formData["pa_criteria"];
      requestData["messageBody"]["id_pa_type"] = Number(formData["id_pa_type"]);
      requestData["messageBody"]["is_additional_criteria_defined"] = formData["is_additional_criteria_defined"];
      requestData["messageBody"]["drug_list_ids"] = drug_list_ids;
      if (formType == 1) {
        requestData["pathParams"] =
          "/" + formData["id_pa_group_description"] + "/" + props?.formulary_id + "?entity_id=0";
        let id_pa_group_description = props.savePaGdm.current_group_des_id;

        props.putPAGroupDescription(requestData).then((json) => {
          if (json.payload && json.payload.code === "200") {
            showMessage("Success", "success");
            let apiDetails = {};
            apiDetails["lob_type"] = props.formulary_lob_id;
            apiDetails["pathParams"] = "/" + props?.client_id + "?entity_id=" + props?.formulary_id;

            props.getPaGrouptDescriptions(apiDetails);

            let id_base_pa_group_description = json.payload.id_base_pa_group_description
              ? json.payload.id_base_pa_group_description
              : props.savePaGdm.current_group_id;
            apiDetails["pathParams"] = "/" + id_base_pa_group_description;

            props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
              if (json.payload && json.payload.code === "200") {
                const isEditable =
                  json.payload.data.length > 0 &&
                  json.payload.data.find((val) => val.id_pa_group_description === id_pa_group_description);
                // props.selectGroup(
                //   id_base_pa_group_description,
                //   isEditable.is_setup_complete
                // );
                isSetUpComplete(isEditable.is_setup_complete);
              }
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
        requestData["pathParams"] = "/" + props?.formulary_id + "?entity_id=0";
        props.postPAGroupDescription(requestData).then((json) => {
          if (json.payload && json.payload.code === "200") {
            showMessage("Success", "success");
            let apiDetails = {};
            apiDetails["lob_type"] = props.formulary_lob_id;
            apiDetails["pathParams"] = "/" + props?.client_id + "?entity_id=" + props?.formulary_id;
            props.getPaGrouptDescriptions(apiDetails);
            //props.formType=1;
            setFormType(1);

            props.getPAGroupDetails({
              formulary_id: props.formulary_id,
              current_group_id: json.payload.id_base_pa_group_description,
              current_group_des_id: json.payload.id_pa_group_description,
            });

            formData["id_pa_group_description"] = json.payload.id_pa_group_description;

            apiDetails["pathParams"] = "/" + json.payload.id_base_pa_group_description;

            let id_base_pa_group_description = json.payload.id_base_pa_group_description;
            props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
              if (json.payload && json.payload.code === "200") {
                const isEditable =
                  json.payload.data.length > 0 &&
                  json.payload.data.find((val) => val.id_pa_group_description === formData["id_pa_group_description"]);
                props.selectGroup(id_base_pa_group_description, isEditable.is_setup_complete);
                isSetUpComplete(isEditable.is_setup_complete);
              }
            });
          } else if (json.payload && json.payload.code != 200) {
            isSetUpComplete(false);
            setShowHeader(0);
            showMessage(json.payload.message, "error");
          } else {
            showMessage("Failure", "error");
          }
        });
      }
    }
    setShowHeader(1);
  };

  const onChange = (e) => {
    // const latestVerion = Object.keys(props.version).length > 0 ? props.version[Number(e)]?.id_pa_group_description : 0;
    //setLatestId(latestVerion)
    if (Object.keys(props.PaGDData).length > 0 && e && e != "no") {
      const isEditable = props.version[Number(e.split(" ")[1]) - 1]
        ? props.version[Number(e.split(" ")[1]) - 1].is_setup_complete
        : false;
      setEditable(isEditable);
      setChangeEvent(true);
      updateFormData({
        ...formData,
        ...props.PaGDData,
      });
    } else {
      setChangeEvent(false);
    }
  };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  const [isAdditionalCriteriaPopupOpen, setAdditionalCriteriaPopup] = useState(false);
  const additionalCriteriaHandler = () => {
    setAdditionalCriteriaPopup(!isAdditionalCriteriaPopupOpen);
  };

  const openAdditionalCriteria = () => {
    toggleAdditionalCriteriaOpen(true);
  };
  const closeAddiionalCriteria = () => toggleAdditionalCriteriaOpen(false);

  useEffect(() => {
    setFormType(props.formType);
  }, []);

  useEffect(() => {
    setFormType(props.formType);
  }, [props.formType]);

  useEffect(() => {
    setAdditionalCriteria(props.additionalCriteriaObject);
  }, [props.additionalCriteriaObject]);

  useEffect(() => {
    //setPanelColor(editable ? '-green' : '')
    //setLatestId(props.latestVerion)
    if (props.formulary?.supplemental_benefits) {
      let benefits = props.formulary?.supplemental_benefits;
      //let fileTypeOTC = benefits.filter((obj) => obj.id_supplemental_benefit==17).length>0 ?true:false;
      let fileTypeADD = benefits.filter((obj) => obj.id_supplemental_benefit == 18).length > 0 ? false : true;
      let fileTypeExcluded = benefits.filter((obj) => obj.id_supplemental_benefit == 19).length > 0 ? false : true;
      setDisableExcludedFile(fileTypeExcluded);
      setDisableAddFile(fileTypeADD);
      debugger;
    }

    isSetUpComplete(props.isSetUpComplete);
    updateFormData(initialFormData);
    setDrug_list_ids([]);
    //setPlaceHolder(props.versionTitle)
    if (Object.keys(props.PaGDData).length > 0) {
      let tmpVersion = props.version.length > 0 &&
        props.version.find((val) =>
          val.id_pa_group_description === props.savePaGdm.current_group_des_id);
      if (tmpVersion == null) {
        tmpVersion = props.version[props.version.length - 1];
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
        ...props.PaGDData,
      });
      setDrug_list_ids(props.PaGDData.drug_list_ids);
    }
    if (!props.editMode) {
      setEditable(false);
    }

    setShowHeader(0);
    setErrorClass("");
  }, [
    props.PaGDData,
    props.version, props.isSetUpComplete,
    props.activeTabIndex,
    props.editMode
  ]);

  const getAutoCompleteChangeHandler = (val) => {
    setDrug_list_ids(val);
  };
  return (
    <div className="new-group-des __root-pa-gd-popup pa--form">
      {/* <div className="panel header">
        <span>{props.title ? props.title : formData.pa_group_description_name}</span>
      </div>
      <PAGroupHeader popuptitle={props.title ? props.title : formData.pa_group_description_name} 
      onChange={onChange} />  */}
      <div className="panel header">
        <span>
          {(formType > 0 || showHeader > 0) && formData.pa_group_description_name
            ? formData.pa_group_description_name
            : props.title}
        </span>

        {props.isPopUpView && (
          <div className="button-wrapper button-flex-container">
            <Button
              label="Select This Group"
              className="Button auto-width"
              onClick={(event) => props.selectGroupDescriptionClick(props.savePaGdm.current_group_id)}
            />
          </div>
        )}
      </div>
      {(formType > 0 || showHeader > 0) && (
        <PAGroupHeader
          popuptitle={formData.pa_group_description_name ? formData.pa_group_description_name : props.title}
          isPopUpView={props.isPopUpView}
          isSetupComplete={isSetupComplete}
          onChange={onChange}
        />
      )}

      {props.formulary_lob_id == 1 ? (
        <div className="inner-container pa-new-group-form">
          <div className="setting-1 ">
            <span className="question">What file type is this group description for? *</span>
            <AlertMessages delay="10000" />
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
            <Grid container item xs={12}>
              <Grid container item xs={6}>
                <Grid item xs={12}>
                  {/* <div className="group group-padding"> */}
                  <div className="pa--form__input">
                    <label>
                      PA GROUP DESCRIPTION <span className="astrict">*</span>
                    </label>
                    <input
                      type="text"
                      name="pa_group_description_name"
                      onChange={handleChange}
                      value={formData.pa_group_description_name}
                      disabled={editable}
                      className={`${errorClass} `}
                    />
                  </div>
                </Grid>
                {(formData.file_type === "ADD") &&
                  <>
                     <Grid item xs={12}>
                      <div className="">
                        <label>
                        MMP/Model/Demo PA Criteria:
                        </label>
                        <input
                          type="text"
                          name="mmp_pa_criteria"
                          onChange={handleChange}
                          value={formData.mmp_pa_criteria}
                          disabled={editable}
                          className={`${errorClass} `}
                        />
                      </div>

                    </Grid>
                  </>
                }

                {(formData.file_type === "ExD") &&
                  <>
                    <Grid item xs={12}>
                      <div className="">
                        <label>
                          Excluded Drug File:
                        </label>
                        <input
                          type="text"
                          name="excluded_drug_file"
                          onChange={handleChange}
                          value={formData.excluded_drug_file}
                          disabled={editable}
                          className={`${errorClass} `}
                        />
                      </div>

                    </Grid>
                  </>
                }
                {(formData.file_type === "FAOTC") &&
                  <>
                    <Grid item xs={12}>
                      {/* <div className="group group-padding"> */}
                      <div className="">
                        <label>
                          PA Criteria Change Indicator <span className="astrict">*</span>
                        </label>
                        <DropDown
                          name="change_indicator"
                          className="formulary-type-dropdown"
                          placeHolder={props.change_indicator}
                          value={props.change_indicator}
                          options={[
                            { key: 0, value: 0 },
                            { key: 1, value: 1 },
                          ]}
                          //options={[0,1]}
                          valueProp="key"
                          dispProp="value"
                          onChange={handleChange_1}
                          disabled={editable}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <div className="group group-padding"> */}
                      <div className="">
                        <label>
                          PA INDICATION Indicator<span className="astrict">*</span>
                        </label>
                        <DropDown
                          name="id_indication_indicator"
                          className="formulary-type-dropdown"
                          placeholder={props.id_indication_indicator}
                          value={props.id_indication_indicator}
                          options={[
                            { key: 1, value: 1 },
                            { key: 2, value: 2 },
                            { key: 3, value: 3 },
                            { key: 4, value: 4 },
                          ]}
                          valueProp="key"
                          dispProp="value"
                          onChange={handleChange_2}
                          disabled={editable}
                        />
                      </div>
                    </Grid>
                  </>}

              </Grid>

              {(formData.file_type === "FAOTC") &&
                <>
                  <Grid item xs={6}>
                    <FormInformationPanel />
                  </Grid>

                  <Grid item xs={12}>
                    <div className="group">

                      <label>Off-LABEL USES</label>

                      <input
                        type="text"
                        className="setup-input-fields"
                        name="off_label_uses"
                        value={formData.off_label_uses}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="group">
                      <label>EXCLUSION CRITERIA</label>
                      <input
                        type="text"
                        className="setup-input-fields"
                        name="exclusion_criteria"
                        value={formData.exclusion_criteria}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="group">
                      <label>REQUIRED MEDICAL INFORMATION</label>
                      <input
                        type="text"
                        className="setup-input-fields"
                        name="required_medical_info"
                        value={formData.required_medical_info}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="group">
                      <label>AGE RESTRICTIONS</label>
                      <input
                        type="text"
                        className="setup-input-fields"
                        name="age_restrictions"
                        value={formData.age_restrictions}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="group">
                      <label>PRESCRIBER RESTRICTIONS</label>
                      <input
                        name="prescriber_restrictions"
                        type="text"
                        className="setup-input-fields"
                        value={formData.prescriber_restrictions}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="group">
                      <label>
                        COVERAGE DURATION<span className="astrict">*</span>
                      </label>
                      <input
                        name="coverage_restrictions"
                        type="text"
                        className="setup-input-fields"
                        value={formData.coverage_restrictions}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="group">
                      <label>OTHER CRITERIA</label>
                      <input
                        name="other_criteria"
                        type="text"
                        className="setup-input-fields"
                        value={formData.other_criteria}
                        onChange={handleChange}
                        disabled={editable}
                      />
                    </div>
                  </Grid>
                </>}
            </Grid>
          </div>
          <div className="setting-1 mb-20">
            <span>MARKETING MATERIAL CONSIDERATIONS</span>
            <div className="marketing-material-chk">
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
              {/* <FormControlLabel control={<Checkbox value="true" name="is_suppress_criteria_dispaly_cms_approval" color="primary" checked={formData.is_suppress_criteria_dispaly_cms_approval } disabled={editable} />} label='Supress Criteria and Display: Pending CMS Approval' />
                        <FormControlLabel control={<Checkbox value="true" name="is_display_criteria_drugs_not_frf" color="primary" checked={formData.is_display_criteria_drugs_not_frf } disabled={editable}/>} label='Display Criteria for Drugs not on FRF' /> */}
            </div>
            <span>
              do you want to add additional criteria?
              <span className="astrict">*</span>
            </span>
            <div className="marketing-material radio-group">
              <RadioGroup
                aria-label="marketing-material-radio1"
                className="gdp-radio"
                name="is_additional_criteria_defined"
                onChange={handleChange}
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
            </div>
            {isAdditionalCriteriaOpen && props.formulary_lob_id == 1 ? (
              <AdvanceSearchContainer
                openPopup={isAdditionalCriteriaOpen}
                onClose={closeAddiionalCriteria}
                isAdvanceSearch={false}
              />
            ) : null}
          </div>

          <div className="button-wrapper">
            <Button
              label="Save Version Progress"
              className="Button"
              onClick={(event) => saveGroupDescription(event, false)}
              disabled={editable}
            />
            <Button
              label="Version to Initiate Change Request"
              className="Button"
              onClick={(event) => saveGroupDescription(event, false)}
              disabled={editable}
            />
            <Button
              label="Version Submitted to CMS"
              className="Button"
              onClick={(event) => saveGroupDescription(event, true)}
              disabled={editable}
            />
          </div>
        </div>
      ) : null}
      {(props.formulary_lob_id != 1 ) ? (
        <div className="inner-container pa-new-group-form input-border-none">
          <div className="setting-1">
            <Grid container>
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
                          id_pa_type: 8,
                        })
                      }
                      disabled={editable}
                      checked={formData.id_pa_type === 8 ? true : false}
                    />
                    <RadioButton
                      label="New Starts Only"
                      name="add-filter-1"
                      // checked={!isAdditionalCriteriaOpen}
                      onClick={() =>
                        updateFormData({
                          ...formData,
                          id_pa_type: 9,
                        })
                      }
                      disabled={editable}
                      checked={formData.id_pa_type === 9 ? true : false}
                    />
                  </div>
                </Space>
              </Grid>
              {/* <span className="required-field">What is the default pa type for this description?</span>
            <div className="marketing-material radio-group">
              <RadioGroup
                aria-label="marketing-material-radio1"
                className="gdp-radio"
                name="id_pa_type"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="8"
                  control={<Radio checked={formData.id_pa_type == "8" ? true : false} />}
                  label="Always Applies"
                  disabled={editable}
                />
                <FormControlLabel
                  value="9"
                  control={<Radio checked={formData.id_pa_type == "9" ? true : false} />}
                  label="New Starts Only"
                  disabled={editable}
                />
              </RadioGroup>
            </div> */}

              <Grid item xs={12}>
                <div className="group">
                  <label className="required-field">
                    PA GROUP DESCRIPTION <span className="astrict">*</span>
                  </label>
                  {/* <input
                    className="custom-textfield"
                    type="text"
                    name="pa_group_description_name"
                    onChange={handleChange}
                    value={formData.pa_group_description_name}
                    disabled={editable}
                  /> */}
                  <TextareaAutosize
                    minRows={1}
                    maxRows={6}
                    style={{ width: "100%" }}
                    className="custom-textfield-2"
                    name="pa_group_description_name"
                    onChange={handleChange}
                    value={formData.pa_group_description_name}
                  />
                </div>
                <br />
              </Grid>
              <Grid item xs={12}>
                <div className="group">
                  <label className="required-field">
                    PA Criteria <span className="astrict">*</span>
                  </label>
                  {/* <input
                    className="custom-textfield"
                    type="text"
                    name="pa_criteria"
                    onChange={handleChange}
                    value={formData.pa_criteria}
                    disabled={editable}
                  /> */}
                  <TextareaAutosize
                    minRows={1}
                    maxRows={6}
                    style={{ width: "100%" }}
                    className="custom-textfield-2"
                    name="pa_criteria"
                    onChange={handleChange}
                    value={formData.pa_criteria}
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
                        options={props.drugList}
                        getAutoCompleteChange={getAutoCompleteChangeHandler}
                        autoSelected={drug_list_ids}
                        editable={editable}
                      />
                      {/* <Tags options={drug_list} getAutoCompleteChange={getAutoCompleteChangeHandler}
                       autoSelected={formData.drug_list_ids}/> */}
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

                {/* <span className="required-field">
                  do you want to add additional criteria?
                </span>
                <div className="marketing-material radio-group">
                  <RadioGroup
                    aria-label="marketing-material-radio1"
                    className="gdp-radio"
                    name="is_additional_criteria_defined"
                    onChange={handleChange}
                    value={formData.is_additional_criteria_defined}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio disabled={editable}/>}
                      label="Yes"
                      disabled={editable}
                      onClick={openAdditionalCriteria}
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio disabled={editable}/>}
                      label="No"
                      disabled={editable}
                    />
                  </RadioGroup>
                </div> */}
                {isAdditionalCriteriaOpen && props.formulary_lob_id != 1 ? (
                  <AdvanceSearchContainer
                    openPopup={isAdditionalCriteriaOpen}
                    onClose={closeAddiionalCriteria}
                    isAdvanceSearch={false}
                    editable={editable}
                  />
                ) : null}
                <br />
              </Grid>
            </Grid>
          </div>

          {props.isPopUpView && (
            <AdditionalCriteriaContainer
              criteriaList={getAdditionalCriteriaSectionList()}
              handleChildDataSave={() => { }}
              isReadOnly={props.isPopUpView}
            />
          )}
          {!props.isPopUpView && (
            <div className="button-wrapper">
              {!props.isReadOnly ? (
                <>
                  <Button
                    label="Save Version Progress"
                    className="Button"
                    onClick={(event) => saveGroupDescription(event, false)}
                    disabled={editable}
                  />
                  <Button
                    label="Save Final Version and Continue"
                    className="Button"
                    onClick={(event) => saveGroupDescription(event, true)}
                    disabled={editable}
                  />
                </>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
