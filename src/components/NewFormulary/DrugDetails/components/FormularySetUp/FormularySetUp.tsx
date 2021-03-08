import React from "react";
import { connect } from "react-redux";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";
import FormularyDesignCommercial from "./components/FormularyDesignCommercial";
import FormularyTiers from "./components/FormularyTiers";
import MedicareInformation from "./components/MedicareInformation";
import MedicaidInformation from "./components/MedicaidInformation";
import SupplementalModels from "./components/SupplementalModels";
import Box from "@material-ui/core/Box";
import Button from "../../../../shared/Frx-components/button/Button";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import {
  fetchSelectedFormulary,
  verifyFormularyName,
  saveFormulary,
  initCreateUsingClone,
} from "../../../../.././redux/slices/formulary/setup/setupSlice";
import { Formulary } from "../../../../../redux/slices/formulary/setup/formulary";
import {
  fetchGeneralOptions,
  fetchMedicareOptions,
  fetchMedicaidOptions,
  fetchDesignOptions,
  fetchSupplementalOptions,
  fetchTierOptions,
  fetchSubMthsOptions,
  fetchStatesOptions,
  fetchResemblingFlsOptions,
} from "../../../../.././redux/slices/formulary/setup/setupOptionsSlice";
import { setLocation } from "../../../../.././redux/slices/formulary/application/applicationSlice";

import { ToastContainer } from "react-toastify";
import showMessage from "../../../Utils/Toast";
import { trim, throttle } from "lodash";
import { Save } from "@material-ui/icons";
import { postMessage } from "../../../../.././redux/slices/formulary/messaging/messagingSlice";

class FormularySetUp extends React.Component<any, any> {
  state = {
    isUpdate: false,
    generalInformation: {
      type: "",
      type_id: 0,
      name: "",
      abbreviation: "",
      effective_date: "",
      method: "",
      service_year: "",
      description: "",
      classification_system: "",
      is_closed_formulary: null,
      isState: false,
      selectedState: "",
      state_id: (null as unknown) as number,
      medicare_types_ref_other: false,
      selectedResemblanceFormulary: null,
    },
    others: {
      abridged_forumulary_creation: null,
      cms_formulary_id: null,
      is_carve_out: null,
      formulary_basis: null
    },
    carve_out_info: {
      carve_outs: [],
      custom_carve_outs: [],
      removed_formulary_carve_outs: []
    },
    medicare_contract_type_info: {
      medicare_contract_types: [] as any,
      custom_medicare_contract_type: {},
      removed_formulary_medicare_contracts: [] as any,
    },
    supplemental_benefit_info: {
      supplemental_benefits: [] as any,
      custom_supplemental_benefits: [] as any,
      removed_formulary_supplemental_benefits: [] as any,
    },
    designOptions: [],
    tiers: [],
    edit_info: {
      edits: [],
      edits_no: [],
      custom_edits: [],
      removed_formulary_edits: [],
    },
    setupOptions: {},
    errorObj: {
      formularyType: false,
      formularyName: false,
      effectiveDate: false,
      bildMethod: false,
      serviceYear: false,
      classificaton: false,
    },
    saveInProgress: false,
  };

  componentDidMount() {
    if (this.props.mode === "EXISTING") {
      this.manageFormularyType(
        this.props.formulary_type_id,
        this.props.formulary_id
      );
      this.props.fetchSelectedFormulary(this.props.formulary_id);
    } else {
      this.manageFormularyType(-1, -1);
      this.props.fetchSelectedFormulary(-1);
    }
  }
  manageFormularyType(type: number, id: number) {
    console.log(" Manage - TYPE : " + type + " ID : " + id);
    let defaultType = 4;
    if (type === -1) {
      this.props.fetchGeneralOptions({ type: defaultType, id: -1 });
      return;
    }
    this.props.fetchGeneralOptions({ type: type, id: id });
    this.props.fetchDesignOptions({ type: type, id: id });
    this.props.fetchTierOptions({ type: type, id: id });

    if (type === 1) {
      // MRC...
      this.props.fetchResemblingFlsOptions({ type: type, id: id });
      this.props.fetchMedicareOptions({ type: type, id: id });
      this.props.fetchSupplementalOptions({ type: type, id: id });
    } else if (type === 2) {
      // MMP...
      this.props.fetchStatesOptions(type);
      this.props.fetchResemblingFlsOptions({ type: type, id: id });
      this.props.fetchMedicareOptions({ type: type, id: id });
      this.props.fetchSupplementalOptions({ type: type, id: id });
    } else if (type === 3) {
      // MM...
      this.props.fetchStatesOptions(0);
      this.props.fetchMedicaidOptions({ type: type, id: id });
    } else if (type === 4) {
      // SM...
      this.props.fetchStatesOptions(0);
    } else if (type === 5) {
      // EXCH...
    } else if (type === 6) {
      // COMM...
    }
    this.props.fetchSubMthsOptions(2021);
  }
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (
      newProps.formulary &&
      newProps.setupOptions.generalOptions &&
      newProps.setupOptions.designOptions &&
      newProps.setupOptions.tierOptions
    ) {
      const medeicareContract = { ...this.state.medicare_contract_type_info };
      medeicareContract.medicare_contract_types = newProps.formulary?.medicare_contract_types?.map(
        (e) => e.id_medicare_contract_type
      );

      const classificationSystem =
        newProps.formulary.formulary_info.id_classification_system;
      // console.log(classificationSystem);
      this.setState({
        isUpdate: true,
        generalInformation: {
          type: newProps.formulary.formulary_type_info.formulary_type,
          type_id: newProps.formulary.formulary_type_info.id_formulary_type,
          name: newProps.formulary.formulary_info.formulary_name,
          abbreviation: newProps.formulary.formulary_info.abbreviation,
          effective_date: newProps.formulary.formulary_info.effective_date,
          method: newProps.formulary.formulary_info.formulary_build_method,
          service_year: newProps.formulary.formulary_info.contract_year,
          description: newProps.formulary.formulary_info.formulary_description,
          selectedState: newProps.setupOptions.generalOptions.states !== null ? this.getStateName(newProps.formulary.formulary_info.id_state) : "",
          state_id: newProps.formulary.formulary_info.id_state,
          classification_system: classificationSystem,
          is_closed_formulary:
            newProps.formulary.formulary_info.is_closed_formulary,
          medicare_types_ref_other: false,
          selectedResemblanceFormulary:
            newProps.formulary.formulary_info.resemble_formulary_id,
        },
        others: {
          abridged_forumulary_creation:
            newProps.formulary.formulary_info.abridged_forumulary_creation,
          cms_formulary_id: newProps.formulary.formulary_info.cms_formulary_id,
          is_carve_out: newProps.formulary.formulary_info.is_carve_out,
          formulary_basis: newProps.formulary.formulary_info.formulary_basis
        },
        carve_out_info: newProps.setupOptions.medicaidOptions !== null ? this.arrageCareveOutInfo(
          newProps.formulary.carve_outs,
          newProps.setupOptions.medicaidOptions
        ) : this.state.carve_out_info,
        medicare_contract_type_info: this.getMCRContractInfo(
          newProps.formulary.medicare_contract_types,
          newProps.setupOptions.medicareOptions
        ),
        supplemental_benefit_info: this.getSupplementalInfo(
          newProps.formulary.supplemental_benefits,
          newProps.setupOptions.supplementalOptions
        ),
        tiers: this.arrangeTiers(newProps.formulary.tiers),
        fetchedEditInfo: newProps.formulary.edit_info,
        edit_info: this.getEditInfo(
          newProps.formulary.edit_info,
          newProps.setupOptions?.designOptions
        ),
        designOptions: [...newProps.setupOptions?.designOptions],
        setupOptions: newProps.setupOptions,
      });
    }
    
    if (newProps.mode === "NEW" && newProps.setupOptions.generalOptions) {
      const defaultDesignId = newProps.setupOptions?.designOptions
        ?.filter((e) => e.edit_name === "N/A")
        ?.map((e) => e.id_edit);
      const newEditInfo: any = { ...this.state.edit_info };
      this.setDefaultClassificationSystem(newProps.setupOptions.generalOptions.classification_systems);
      newEditInfo.edits =
        defaultDesignId !== undefined ? [...defaultDesignId] : [];
      const newSupplementalOptions: any = {...this.state.supplemental_benefit_info};
      const defaultSupplementalId = newProps.setupOptions?.supplementalOptions?.filter(e => e.supplemental_benefit === "Additional Demonstration Drugs (MMP only)")
        .map(e => e.id_supplemental_benefit);
      newSupplementalOptions.supplemental_benefits = 
        defaultSupplementalId !== undefined && this.state.generalInformation.type_id === 2 ?
        [...defaultSupplementalId] : [];
      const newContractInfo: any = {...this.state.medicare_contract_type_info};
      const defaultContractId = newProps.setupOptions?.medicareOptions?.filter(e => e.code_value === 'H').map(e => e.id_medicare_contract_type);
      newContractInfo.medicare_contract_types = defaultContractId !== undefined && this.state.generalInformation.type_id === 2 ? 
        [...defaultContractId] : [];
      this.setState({
        isUpdate: true,
        edit_info: newEditInfo,
        tiers: [],
        supplemental_benefit_info: newSupplementalOptions,
        medicare_contract_type_info: newContractInfo
      });
    }
  };
  setDefaultClassificationSystem = (classification) => {
    const classificationSystem = [...classification];
    const class_length = classificationSystem.length;
    let defaultClassification:any;
    if(class_length === 1){
      defaultClassification = classificationSystem[0].id_classification_system;
    }else if(class_length > 1){
      defaultClassification = classificationSystem.filter(e => e.code_value === 'USP')[0].id_classification_system
    }
    const newGeneralOption: any = { ...this.state.generalInformation };
    newGeneralOption.classification_system = defaultClassification;
    this.setState({
      generalInformation: newGeneralOption,
    });
  }
  arrageCareveOutInfo = (curr_data, options_data) => {
    console.log("******** ======== ******* ",options_data)
    if(curr_data !== undefined){
      const curData = [...curr_data];
      const optData = [...options_data];
      const optData_static_id = optData.filter(e => e.is_custom === false).map(e => e.id_carve_out);
      const custom_carve_outs = optData.filter(e => e.is_custom === true).map(e => {
        return {
          ...e,
          id_formulary_carve_out: null,
        }
      });
      const carve_outs = curData.filter(e => optData_static_id.indexOf(e.id_carve_out) > -1).map(e => e.id_carve_out);
      return {
        carve_outs: carve_outs,
        custom_carve_outs: custom_carve_outs,
        removed_formulary_carve_outs: []
      }
    }else{
      return {
        carve_outs: [],
        custom_carve_outs: [],
        removed_formulary_carve_outs: []
      }
    }
  }
  arrangeTiers = (tierObj:any) => {
    const tiers = [...tierObj];
    const otc_ind = tiers.findIndex(e => e.tier_name === 'Tier 0');
    if(otc_ind > 0){
      const otc_obj = tiers[otc_ind];
      tiers.splice(otc_ind,1);
      tiers.unshift(otc_obj)
    }
    return tiers;
  }
  getMCRContractInfo = (contInfo: any[], options: any[]) => {
    if (contInfo !== undefined && options !== null) {
      console.log(" ********* ", contInfo, options, " ********* ");
      const getAllId = contInfo.map((e) => e.id_medicare_contract_type);
      const getStatic = options
        .filter(
          (e) =>
            e.is_custom === false &&
            getAllId.indexOf(e.id_medicare_contract_type) > -1
        )
        .map((e) => e.id_medicare_contract_type);
      const getCustom = options.filter(
        (e) =>
          e.is_custom === true &&
          getAllId.indexOf(e.id_medicare_contract_type) > -1
      );
      return {
        medicare_contract_types: [...getStatic],
        custom_medicare_contract_type: getCustom.length > 0 ? getCustom[0] : {},
        removed_formulary_medicare_contracts: [] as any,
      };
    } else {
      return this.state.medicare_contract_type_info;
    }
  };
  getSupplementalInfo = (suppInfo: any[], options: any[]) => {
    if (suppInfo !== undefined && options !== null) {
      let suppId = suppInfo.map((e) => e.id_supplemental_benefit);
      let suppStatic = options
        .filter(
          (e) =>
            e.is_custom === false &&
            suppId.indexOf(e.id_supplemental_benefit) !== -1
        )
        ?.map((e) => e.id_supplemental_benefit);
      let suppCustom = options
        .filter(
          (e) =>
            e.is_custom === true &&
            suppId.indexOf(e.id_supplemental_benefit) !== -1
        )
        ?.map((e) => {
          const supplemental_benefit_id = suppInfo
            .filter(
              (el) => el.id_supplemental_benefit === e.id_supplemental_benefit
            )
            .map((id) => id.id_formulary_supplemental_benefit)[0];
          return {
            ...e,
            id_formulary_supplemental_benefit: supplemental_benefit_id,
          };
        });
      const newObj = {
        supplemental_benefits: suppStatic,
        custom_supplemental_benefits: suppCustom,
        removed_formulary_supplemental_benefits: [] as any,
      };
      return newObj;
    } else {
      return {
        supplemental_benefits: [] as any,
        custom_supplemental_benefits: [] as any,
        removed_formulary_supplemental_benefits: [] as any,
      };
    }
  };
  getEditInfo = (editInfo: any[], options: any[]) => {
    let editTrue = editInfo
      .filter((obj) => obj.id_checked === true)
      .map((e) => e.id_edit);
    const editFalse = editInfo
      .filter((obj) => obj.id_checked === false)
      .map((e) => e.id_edit);
    // let customEdit: any = "";
    let customEdit: any[] = [];
    const type_id = this.state.generalInformation.type_id;
    if ( type_id !== 1 && type_id !== 2) {
      customEdit = options.filter((e) => e.is_custom === true);
      const customEditId = customEdit.map((e) => e.id_edit);
      editTrue = editTrue.filter((e) => customEditId.indexOf(e) === -1);
    }
    const newObj = {
      edits: editTrue,
      edits_no: editFalse,
      custom_edits: customEdit,
      removed_formulary_edits: [],
    };
    return newObj;
  };
  formularyDesignCommercialCheckHandler = (getObj: any) => {
    // console.log("------------------- FD");
    // console.log(getObj);
    const receivedObj = { ...getObj };
    // console.log(receivedObj);
    const customId = this.props.setupOptions.designOptions
      .filter((e) => e.is_custom)
      .map((e) => e.id_edit);
    // console.log(customId);
    const received_customId = receivedObj.custom_edits.map((e) => e.id_edit);
    const staticFId = this.props.setupOptions.designOptions
      .filter((e) => !e.is_custom)
      .map((e) => e.id_edit);
    let staticRemovedID = this.props.formulary?.edit_info
      ?.filter((e) => customId.indexOf(e.id_edit) === -1)
      .filter((e) => receivedObj.edits.indexOf(e.id_edit) === -1)
      .map((e) => e.id_formulary_edit);
    let customRemovedId = this.props.formulary?.edit_info
      ?.filter((e) => staticFId.indexOf(e.id_edit) === -1)
      .filter((e) => received_customId.indexOf(e.id_edit) === -1)
      .map((e) => e.id_formulary_edit);
    staticRemovedID = staticRemovedID === undefined ? [] : staticRemovedID;
    customRemovedId = customRemovedId === undefined ? [] : customRemovedId;
    const finalRemovedID = [...staticRemovedID, ...customRemovedId];
    receivedObj.removed_formulary_edits = [...finalRemovedID];
    this.setState({
      edit_info: receivedObj,
    });
  };
  checkOTC = (edit_info) => {
    const supp = {...edit_info};
    const setupOptions = this.props.setupOptions;
    const otc_id = setupOptions.designOptions !== undefined ? setupOptions.designOptions.filter(e => e.edit_name === 'OTC').map(e => e.id_edit) : [];
    const is_otc = supp.edits.indexOf(otc_id[0]) > -1;
    const supp_otc_id = setupOptions.supplementalOptions !== undefined ? setupOptions.supplementalOptions.filter(e => e.code_value === 'OTC')[0].id_supplemental_benefit : [];
    const supp_info = {...this.state.supplemental_benefit_info}
    const supp_otc_ind = supp_info.supplemental_benefits.indexOf(supp_otc_id);
    let tiers:any = [...this.state.tiers];
    const oct_tiers = tiers.length > 0 ? tiers.filter(e => e.tier_name === 'Tier 0') : [];
    const remove_otc_id = this.props.supplemental_benefits !== undefined ? this.props.supplemental_benefits.filter(e => e.id_supplemental_benefit === supp_otc_id).map(e => e.id_formulary_supplemental_benefit) : [];
    const remove_otc_ind = supp_info.removed_formulary_supplemental_benefits.indexOf(remove_otc_id[0]);
    if(is_otc && supp_otc_ind !== -1){
      return;
    }
    if(is_otc && supp_otc_ind < 0){
        supp_info.supplemental_benefits.push(supp_otc_id);
        if(remove_otc_ind > -1){
          supp_info.removed_formulary_supplemental_benefits.splice(remove_otc_ind,1)
        }
        const otc_tier_id = this.props.setupOptions.tierOptions !== null ? 
        this.props.setupOptions.tierOptions.filter(e => e.code_value === 'OTC')[0].id_tier_label : '';
        const otcTier = {
          id_formulary_tier:null,
          id_tier:0,
          id_tier_label:otc_tier_id,
          is_custom:null,
          tier_label_name:"",
          tier_name:"Tier 0"
        }
        if(oct_tiers.length < 1){
          tiers.unshift(otcTier)
        }
    }else{
      supp_info.supplemental_benefits.splice(supp_otc_ind,1);
      if(remove_otc_id.length > 0 && remove_otc_ind < 0){
        supp_info.removed_formulary_supplemental_benefits.push(remove_otc_id[0])
      }
      tiers = tiers.filter(e => e.tier_name !== 'Tier 0')
    }
    this.setState({
      supplemental_benefit_info: supp_info,
      tiers: tiers
    });
  }
  supplementalCheck = (getObject: any) => {
    const sup_ids = [...getObject.supplemental_benefits];
    const sup_otc_id = this.props.setupOptions.supplementalOptions.filter(e => e.code_value === 'OTC').map(e => e.id_supplemental_benefit);
    const is_otc = sup_ids.filter(e => sup_otc_id.indexOf(e) > -1).length > 0;
    const tiers:any = [...this.state.tiers];
    const is_tier_otc = tiers.filter(e => e.tier_name === 'Tier 0').length > 0;
    const otc_tier_id = this.props.setupOptions.tierOptions !== null ? 
        this.props.setupOptions.tierOptions.filter(e => e.code_value === 'OTC')[0].id_tier_label : '';
    const octTier = {
      id_formulary_tier:null,
      id_tier:0,
      id_tier_label:otc_tier_id,
      is_custom:null,
      tier_label_name:"",
      tier_name:"Tier 0"
    }
    if(is_otc && !is_tier_otc){
      tiers.unshift(octTier);
      this.setState({
        tiers: tiers
      })
    }
    if(!is_otc && is_tier_otc){
      tiers.shift();
      this.setState({
        tiers: tiers
      });
    }
    this.setState({
      supplemental_benefit_info: getObject,
    });
  };
  formularyRadioChangeHandler = (event: React.ChangeEvent<HTMLInputElement>,id: any,type) => {
    let checked = event.target.value;
    const updatedEditInfo: any = { ...this.state.edit_info };
    if (checked === "true") {
      if (updatedEditInfo.edits_no.indexOf(id) !== -1) {
        let index = updatedEditInfo.edits_no.indexOf(id);
        updatedEditInfo.edits_no.splice(index, 1);
      }
      const yes_ind = updatedEditInfo.edits.indexOf(id);
      if(yes_ind < 0){
        updatedEditInfo.edits.push(id);
      }
    } else {
      if (updatedEditInfo.edits.indexOf(id) !== -1) {
        let index = updatedEditInfo.edits.indexOf(id);
        updatedEditInfo.edits.splice(index, 1);
      }
      const no_ind = updatedEditInfo.edits_no.indexOf(id);
      if(no_ind < 0){
        updatedEditInfo.edits_no.push(id);
      }
    }
    this.checkOTC(updatedEditInfo);
    this.setState({
      edit_info: updatedEditInfo,
    });
  };
  updateInputField = (e) => {
    const newObj = { ...this.state.generalInformation };
    newObj[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      generalInformation: newObj,
    });
    if (e.currentTarget.name === "name" && this.props.mode === "NEW") {
      this.props.verifyFormularyName(e.currentTarget.value);
    }
  };
  formularyTypeChanged = (type) => {
    const generalInfo = { ...this.state.generalInformation };
    const typeID = this.props.setupOptions.generalOptions.formularyType.find(
      (e) => e.formulary_type === type
    ).id_formulary_type;
    generalInfo.type = type;
    generalInfo.type_id = parseInt(typeID);
    this.setState(
      {
        generalInformation: generalInfo,
      },
      () => this.manageFormularyType(typeID, -1)
    );
  };
  getStateName = (id) => {
    if(
      id !== null &&
      this.props.setupOptions.generalOptions !== null &&
      this.props.setupOptions.generalOptions.states.length > 0     
    ){
      const stateName = this.props.setupOptions.generalOptions.states.find(
        (e) => e.id === id
        ).state_name;
        console.log(stateName)
      return stateName;
    }
    return "";
  }
  onDropdownChange = (value, section, stateProp) => {
    const selectedSection = { ...this.state[section] };
    selectedSection[stateProp] = value;
    if (stateProp === "service_year") {
      selectedSection.isState = true;
    }
    if (stateProp === "selectedState") {
      const stateId = this.props.setupOptions.generalOptions.states.find(
        (e) => e.state_name === value
      ).id;
      selectedSection.state_id = stateId;
    }
    this.setState({
      [section]: selectedSection,
    });
  };
  onRadioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    _section
  ) => {
    const newObj = { ...this.state.generalInformation };
    const val =
      event.target.value === "true"
        ? true
        : event.target.value === "false"
        ? false
        : event.target.value;
    newObj[event.target.name] = val;
    this.setState({
      generalInformation: newObj,
    });
  };
  onDatePickerChangeHandler = (e, section, stateProp) => {
    const date = `${e._d.getFullYear()}-${
      e._d.getMonth() + 1
    }-${e._d.getDate()}`;
    const newObj = { ...this.state[section] };
    newObj[stateProp] = date;
    this.setState({
      [section]: newObj,
    });
  };
  medicareCheck = (getObject: any) => {
    this.setState({
      medicare_contract_type_info: getObject,
    });
  };
  onOtherCheck = (getObject: any) => {
    this.setState({
      others: getObject,
    });
  };
  onOtherMedicareHandler = (e) => {
    const custom = { ...this.state.medicare_contract_type_info };
    this.setState({
      medicare_contract_type_info: custom,
    });
  }; 
  tierCheck = () => {
    // console.log(this.state);
    return true;
  };
  selectTierHandler = (tierObj) => {
    this.setState({
      tiers: tierObj
    });
  };
  checkExcludedDrug = (tiersObj) => {
    console.log(this.props)
    const tiers = [...tiersObj];
    const excludeDrugID = this.props.setupOptions.tierOptions.filter(e => e.code_value === 'ExD').map(e => e.id_tier_label);
    const is_excluded = tiers.filter(e => excludeDrugID.indexOf(e.id_tier_label) > -1).length > 0;
    const supp_excluded_id = this.props.setupOptions.supplementalOptions !== null ? 
      this.props.setupOptions.supplementalOptions.filter(e => e.code_value === 'ExD').map(e => e.id_supplemental_benefit) : [];
    let current_supp = {...this.state.supplemental_benefit_info}
    const is_supp_exd = current_supp.supplemental_benefits.filter(e => supp_excluded_id.indexOf(e) > -1).length > 0;
    const remove_exd_id = this.props.supplemental_benefits !== undefined ? this.props.supplemental_benefits.filter(e => e.id_supplemental_benefit === supp_excluded_id[0]).map(e => e.id_formulary_supplemental_benefit) : [];
    if(is_excluded && is_supp_exd){
      return;
    }
    if(is_excluded && !is_supp_exd){
      current_supp.supplemental_benefits.push(supp_excluded_id[0]);
      let ind = current_supp.removed_formulary_supplemental_benefits.indexOf(remove_exd_id[0]);
      if(ind > -1){
        current_supp.removed_formulary_supplemental_benefits.splice(ind,1);
      }
      this.setState({
        supplemental_benefit_info: current_supp
      })
    }
    if(!is_excluded && is_supp_exd){
      let ind = current_supp.supplemental_benefits.indexOf(supp_excluded_id[0]);
      current_supp.supplemental_benefits.splice(ind,1);
      current_supp.removed_formulary_supplemental_benefits.push(remove_exd_id[0]);
      this.setState({
        supplemental_benefit_info: current_supp
      })
    }
  }
  changeTierValueHandler = (e, val) => {
    const updatedTiers: any = [...this.state.tiers];
    const ind = updatedTiers.findIndex((el) => el.tier_name === val);
    const getObj = { ...updatedTiers[ind] };
    const OBJ = this.props.setupOptions.tierOptions.find(
      (el) => el.tier_label === e
    );
    if (e === "Add New") {
      getObj.id_tier_label = null;
      getObj.is_custom = true;
    } else {
      getObj.id_tier_label = OBJ.id_tier_label;
    }

    updatedTiers[ind] = getObj;
    if(this.props.setupOptions.supplementalOptions !== null){
      this.checkExcludedDrug(updatedTiers);
    }
    this.setState({
      tiers: updatedTiers,
    });
  };
  handleCustomTierChange = (e, tierID) => {
    // console.log(" handleCustomTierChange : |" + e.currentTarget.value +"| , "+tierID);
    const updatedTiers: any = [...this.state.tiers];
    // console.log(updatedTiers);
    const ind = updatedTiers.findIndex((el) => el.tier_name === tierID);
    const getObj = { ...updatedTiers[ind] };
    // console.log(ind, getObj);
    getObj.tier_label_name = trim(e.currentTarget.value);
    updatedTiers[ind] = getObj;
    this.setState({
      tiers: updatedTiers,
    });
  };
  deleteCustomTier = (tierID) => {
    // console.log(" DELETE : " + tierID);
    const updatedTiers: any = [...this.state.tiers];
    // console.log(updatedTiers);
    const ind = updatedTiers.findIndex((el) => el.tier_name === tierID);
    const getObj = { ...updatedTiers[ind] };
    // console.log(ind, getObj);
    //getObj.tier_label_name = e.currentTarget.value;
    getObj.id_tier_label = null;
    getObj.tier_label_name = null;
    getObj.is_custom = false;

    updatedTiers[ind] = getObj;
    this.setState({
      tiers: updatedTiers,
    });
  };
  setDefaultClassificationHandler = (id) => {
    let newObj: any = { ...this.state.generalInformation };
    newObj.classification_system = parseInt(id);
    this.setState({
      generalInformation: newObj,
    });
  };
  scrollToError = () => {
    const errorElement = document.querySelector(".error-true");
    errorElement?.scrollIntoView();
  };
  onSave = (e) => {
    console.log(
      "++++++++++++++++++++++++++++++++ SAVE - (" +
        e +
        ") Mode: " +
        this.props.mode +
        ", Method : " +
        this.state.generalInformation.method
    );
    let msg: string[] = [];
    const errorObj = {
      formularyType: false,
      formularyName: false,
      effectiveDate: false,
      bildMethod: false,
      serviceYear: false,
      classificaton: false,
    };
    if (this.props.mode === "NEW") {
      // if (this.state.generalInformation.method === "C") {
      //   msg.push(
      //     "Formulary Build Method is Clone. Selected Formulary Type, Enter Name, Effective Date and click Clone Formulary link to select clone source. "
      //   );
      //   errorObj.bildMethod = true;
      //   this.setState(
      //     {
      //       errorObj: errorObj,
      //     },
      //     () => {
      //       this.scrollToError();
      //     }
      //   );
      // }
      if (this.state.generalInformation.type_id === 0) {
        msg.push("Formulary Type is required.");
        // errorObj.formularyType = true;
        // this.setState({
        //   errorObj: errorObj
        // },() => {
        //   this.scrollToError()
        // })
      }
      if (trim(this.state.generalInformation.name) === "") {
        msg.push("Formulary Name is required.");
        // errorObj.formularyName = true;
        // this.setState({
        //   errorObj: errorObj
        // },() => {
        //   this.scrollToError()
        // })
      }
      // if (this.state.generalInformation.method === "") {
      //   msg.push("Formulary Build Method is required.");
      // }
      if (this.state.generalInformation.effective_date === "") {
        msg.push("Formulary Effective Date is required.");
      }
      if (this.state.generalInformation.service_year === "") {
        msg.push("Formulary Service year is required.");
      }
      // if(this.tierCheck()){
      //   msg.push("Formulary Service year is required.");
      // }

      if (msg.length > 0) {
        msg.forEach((m) => {
          // showMessage(m, "info");
        });
        this.props.postMessage({ message: msg[0], type: "warning" });
        return;
      }
    }
    const input = {
      MODE: this.props.mode,
      CONTINUE: e,
      formulary_id: -1,
      is_setup_complete: false,
      GENERAL_INFO: this.state.generalInformation,
      others: this.state.others,
      edit_info: this.state.edit_info,
      supplemental_benefit_info: this.state.supplemental_benefit_info,
      medicare_contract_type_info: this.state.medicare_contract_type_info,
      tiers: this.state.tiers,
      carve_out_info: this.state.carve_out_info
    };

    if (this.props.mode === "EXISTING") {
      input.formulary_id = this.props.formulary_id;
      input.is_setup_complete = this.props?.formulary?.formulary_info?.is_setup_complete;
    } else {
      this.state.generalInformation.method = 'N';
      input.GENERAL_INFO.method="N";
      input.formulary_id = -1;
      input.is_setup_complete = false;
    }
    console.log(" +++ saveInProgress :: " + this.state.saveInProgress);
    if (this.state.saveInProgress) {
      return;
    }
    this.setState({
      saveInProgress: true,
    });
    this.props.saveFormulary(input).then((arg) => {
      this.setState({
        saveInProgress: false,
      });
      console.log(
        "++++++++++++++++++++++++++++++++ SAVE Callback ",
        arg?.payload
      );
      if (
        arg &&
        arg.payload &&
        arg?.payload?.type > 0 &&
        arg?.payload?.id > 0
      ) {
        console.log(
          "REFRESH.... TYPE : " +
            arg?.payload?.type +
            " ID : " +
            arg?.payload?.id +
            " CONTINUE : " +
            arg?.payload?.continue +
            " EARLIER MODE : " +
            arg?.payload?.earlier_mode
        );
        this.manageFormularyType(arg?.payload?.type, arg?.payload?.id);
        this.props.fetchSelectedFormulary(arg?.payload?.id);
        let msgStr = "";
        if (arg?.payload?.earlier_mode === "NEW") {
          // showMessage(`Formulary Created. ID:${arg?.payload?.id}`, "success");=
          msgStr = `Formulary Created ID: ${arg?.payload?.id}`;
        } else if (arg?.payload?.earlier_mode === "EXISTING") {
          // showMessage(`Formulary Updated. ID: ${arg?.payload?.id}`, "success");
          msgStr = `Formulary Updated ID: ${arg?.payload?.id}`;
        }
        this.props.postMessage({ message: msgStr, type: "success" });

        if (arg?.payload?.continue) {
          //this.props.saveAndContinue(1);
          this.props.setLocation(1);
        }
      }
    });
  };
  handleCloneSource = (row: any) => {
    // console.log("handleCloneSource ", row);
    if (row && row.id_base_formulary) {
      // console.log(" CLONE SRC : " + row.id_base_formulary);

      this.handleCreateUsingClone(row.id_base_formulary);
    }
  };
  handleSelectFormulary = (row: any) => {
    // console.log("selected formulary ", row);
    if (row) {
      this.setState({
        generalInformation: {
          ...this.state.generalInformation,
          selectedResemblanceFormulary: row.id_base_formulary,
        },
      });
    }
  };
  handleCreateUsingClone = (baseID: number) => {
    //  console.log(
    //   "create FL using clone......" + this.state.generalInformation.method
    // );
    if (this.props.mode === "NEW") {
      let msg: string[] = [];
      if (this.state.generalInformation.method !== "C") {
        // msg.push("Formulary Build Method is Clone. Selected Formulary Type, Enter Name, Effective Date and click Clone Formulary link to select clone source. ");
        msg.push("Formulary Build Method should be Clone.");
      }
      if (this.state.generalInformation.type_id === 0) {
        msg.push("Formulary Type is required.");
      }
      if (trim(this.state.generalInformation.name) === "") {
        msg.push("Formulary Name is required.");
      }
      if (this.state.generalInformation.effective_date === "") {
        msg.push("Formulary Effective Date is required.");
      }
      if (msg.length > 0) {
        // msg.forEach((m) => {
        //   showMessage(m, "info");
        // });
        // console.log("MSG LIST ", msg);
        this.props.postMessage({ message: msg[0], type: "warning" });
        return;
      }
      const input = {
        GENERAL_INFO: this.state.generalInformation,
        SRC_BASE_ID: baseID,
      };
      this.props.initCreateUsingClone(input).then((arg) => {
        // console.log("CLONE Callback ", arg?.payload);
        if (
          arg &&
          arg.payload &&
          arg?.payload?.type > 0 &&
          arg?.payload?.id > 0
        ) {
          console.log(
            "REFRESH.... TYPE : " +
              arg?.payload?.type +
              " ID : " +
              arg?.payload?.id
          );
          this.manageFormularyType(arg?.payload?.type, arg?.payload?.id);
          this.props.fetchSelectedFormulary(arg?.payload?.id);
          // showMessage(`Formulary Created. ID:${arg?.payload?.id}`, "success");
          let msgStr = `Formulary Created ID: ${arg?.payload?.id}`;
          this.props.postMessage({ message: msgStr, type: "success" });
        }
      });
    }
  };
  overrideNave() {
    this.props.setLocation(1);
  }
  onOthersChangeHandler = (getObj) => {
    this.setState({
      others: getObj,
    });
  };
  MCRDesignObj = (getObj) => {
    this.setState({
      edit_info: getObj,
    });
  };
  carveOutObjHandler = (getObj) => {
    this.setState({
      carve_out_info: getObj
    })
  }
  render() {
    return (
      <div>
        {this.state.isUpdate ? (
          <>
            <GeneralInformation
              generalInfo={this.state.generalInformation}
              setupOptions={this.state.setupOptions}
              updateInputField={this.updateInputField}
              onRadioChange={this.onRadioChangeHandler}
              onDropdownChange={this.onDropdownChange}
              formularyTypeChanged={this.formularyTypeChanged}
              datePickerChange={this.onDatePickerChangeHandler}
              cloneFormularyClick={this.handleCloneSource}
              selectFormularyClick={this.handleSelectFormulary}
              errorObj={this.state.errorObj}
              selectedResemblanceFormulary={
                this.state.generalInformation.selectedResemblanceFormulary
              }
            />
            {this.state.generalInformation.type !== "" ? (
              <>
                {this.state.generalInformation.type_id === 1 ||
                this.state.generalInformation.type_id === 2 ? (
                  <MedicareInformation
                    medicareInfo={this.state.medicare_contract_type_info}
                    medicareCheck={this.medicareCheck}
                    others={this.state.others}
                    onOthersChange={this.onOthersChangeHandler}
                    generalInfo={this.state.generalInformation}
                  />
                ) : null}
                {this.state.generalInformation.type_id === 3 ||
                this.state.generalInformation.type_id === 4 ? (
                  <MedicaidInformation
                    medicaidInfo={this.state.carve_out_info}
                    others={this.state.others}
                    generalInfo={this.state.generalInformation}
                    onOthersClick = {this.onOtherCheck}
                    onCarveOutCheck={this.carveOutObjHandler}
                  />
                ) : null}
                {this.state.generalInformation.type_id === 1 ||
                this.state.generalInformation.type_id === 2 ? (
                  <FormularyDesign
                    edit_info={this.state.edit_info}
                    formularyRadioChange={this.formularyRadioChangeHandler}
                    MCRDesignObj={this.MCRDesignObj}
                  />
                ) : (
                  <FormularyDesignCommercial
                    edit_info={this.state.edit_info}
                    formularyDesignCommercialCheck={
                      this.formularyDesignCommercialCheckHandler
                    }
                    formularyRadioChange={this.formularyRadioChangeHandler}
                  />
                )}
                <FormularyTiers
                  tiers={this.state.tiers}
                  generalInfo={this.state.generalInformation}
                  selectTier={this.selectTierHandler}
                  changeTierValue={this.changeTierValueHandler}
                  customTierChange={this.handleCustomTierChange}
                  deleteCustomTier={this.deleteCustomTier}
                />
                {this.state.generalInformation.type_id === 1 ||
                this.state.generalInformation.type_id === 2 ? (
                  <SupplementalModels
                    supplemental={this.state.supplemental_benefit_info}
                    supplemental_benefits={this.state.supplemental_benefit_info.supplemental_benefits}
                    supplementalCheck={this.supplementalCheck}
                    generalInfo={this.state.generalInformation}
                    edit_info={this.state.edit_info}
                  />
                ) : null}
              </>
            ) : null}
            <div className="btn-action">
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-btn"
              >
                <Button label="Save" onClick={() => this.onSave(false)} />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-and-continue-btn"
              >
                <Button
                  label="Save & Continue"
                  onClick={() => this.onSave(true)}
                />
              </Box>

              {/* <Box
                display="flex"
                justifyContent="flex-end"
                className="save-and-continue-btn"
              >
                <Button
                  className="tempBtn"
                  label=">"
                  onClick={() => this.overrideNave()}
                />
              </Box> */}
            </div>
          </>
        ) : (
          <FrxLoader />
        )}

        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state?.application?.mode,
    formulary_id: state?.application?.formulary_id,
    formulary_type_id: state?.application?.formulary_type_id,
    formulary: state?.setup?.formulary,
    setupOptions: state?.setupOptions,
    supplemental_benefits: state?.setup?.formulary?.supplemental_benefits
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSelectedFormulary: (a) => dispatch(fetchSelectedFormulary(a)),
    fetchGeneralOptions: (a) => dispatch(fetchGeneralOptions(a)),
    fetchResemblingFlsOptions: (a) => dispatch(fetchResemblingFlsOptions(a)),
    fetchMedicareOptions: (a) => dispatch(fetchMedicareOptions(a)),
    fetchMedicaidOptions: (a) => dispatch(fetchMedicaidOptions(a)),
    fetchDesignOptions: (a) => dispatch(fetchDesignOptions(a)),
    fetchTierOptions: (a) => dispatch(fetchTierOptions(a)),
    fetchSupplementalOptions: (a) => dispatch(fetchSupplementalOptions(a)),
    fetchSubMthsOptions: (a) => dispatch(fetchSubMthsOptions(a)),
    fetchStatesOptions: (a) => dispatch(fetchStatesOptions(a)),
    verifyFormularyName: (a) => dispatch(verifyFormularyName(a)),
    saveFormulary: (a) => dispatch(saveFormulary(a)),
    initCreateUsingClone: (a) => dispatch(initCreateUsingClone(a)),
    setLocation: (a) => dispatch(setLocation(a)),
    postMessage: (a) => dispatch(postMessage(a)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularySetUp);
