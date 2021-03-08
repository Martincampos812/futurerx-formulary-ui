import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";
import { DatePicker, Select } from "antd";
import moment from "moment";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import Button from "../../../../../shared/Frx-components/button/Button";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FrxReportingTags from "../../../../../shared/FrxReportingTags/FrxReportingTags";
import "../../../../../shared/FrxReportingTags/FrxReportingTags.scss";
import AddNewTag from "../../../../../shared/FrxReportingTags/AddNewTag";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";
import SelectFormularyPopup from "../../FormularySetUp/components/SelectFormularyPopup";
import UploadFiles from "./UploadFiles";
import SelectFormularyDropDown from "./SelectFormularyDropdown/SelectFormularyDropdown";
import ImportFLDialog from '../../../../ImportFormulary/importFormulary';
import ExportFormulary from '../../../../ExportFormulary/ExportFormulary';

const mapStateToProps = state => {
  //console.log(state);
  return {
    formulary: state?.setup?.formulary,
    formulary_mode: state?.setup?.mode,
    general_options: state?.setupOptions?.generalOptions,
    current_lob: state?.application?.current_lob,
    resembleFormularyData:
      state?.setupOptions?.generalOptions?.resembling_formularies
  };
};
interface TagModule {
  id: number;
  name: string;
  description: string;
  categories: string[];
  categoriesWithColor: any[];
}
interface GeneralInformationState {
  selectedMethod: any;
  forumalry_description: any;
  addTagsOpened: boolean;
  addNewTagOpened: boolean;

  availableTags: TagModule[];
  displayedTags: TagModule[];

  count: number;
  tagName: string;
  tagCategories: string[];
  tagCategoriesWithColor: any[];
  tagDesc: string;

  DialogshowInd: boolean;
  showClonePopup: boolean;
  showSelectFormularyPopup: boolean;
  isImportFLDialog: boolean;
}
class GeneralInformation extends React.Component<any, GeneralInformationState> {
  state = {
    selectedMethod: this.props.formulary?.formulary_info
      ?.formulary_build_method,
    forumalry_description: "",
    addTagsOpened: false,
    addNewTagOpened: false,
    isImportFLDialog: false,
    availableTags: tags,
    displayedTags: [],

    count: 12,
    tagName: "",
    tagCategories: [],
    tagCategoriesWithColor: [],
    tagDesc: "",
    DialogshowInd: false,
    showClonePopup: false,
    showSelectFormularyPopup: false
  };
  UNSAFE_componentWillReceiveProps = newProps => {
    if (newProps.formulary) {
      this.setState({
        selectedMethod:
          newProps.formulary.formulary_info.formulary_build_method,
        forumalry_description:
          newProps.formulary.formulary_info.formulary_description
      });
    }
  };

  getResemblingFlName(id:number):string{
    console.log(" getResemblingFlName ( "+id+" ) ");
    let resemblingFlName="";
    if(this.props.resembleFormularyData) {
      let resemblingFl = this.props.resembleFormularyData.find(
        fl => fl.id_base_formulary===id
      );
      if(resemblingFl){
        resemblingFlName = resemblingFl?.formulary_name;
      }
    }
    return resemblingFlName;
  }

  getMethods = () => {
    let radioGroup: any = null;
    if (this.props.selectedMethod !== undefined) {
      radioGroup = <div className="radio-group"></div>;
    }
    return radioGroup;
  };
  changeMethodHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log((event.target.value))
    this.setState({
      selectedMethod: event.target.value
    });
  };
  getClassificationRadio = () => {
    let classificationRadio: any = null;
    let value = parseInt(this.props.generalInfo.classification_system);
    const radi = (
      <RadioGroup
        className="radio-group-custom"
        aria-label={"classification_system"}
        name="classification_system"
        value={value}
        onChange={e => this.props.onRadioChange(e, "generalInformation")}
      >
        {this.props.general_options.classification_systems.map(el => {
          return (
            <FormControlLabel
              value={el.id_classification_system}
              control={<Radio />}
              label={el.classification_system}
            />
          );
        })}
      </RadioGroup>
    );
    return radi;
  };
  getDisplayedTags = (): string[] => {
    const displayedTags: TagModule[] = this.state.displayedTags;
    // const filteredDisplayedTags = displayedTags.filter((t) => t.id !== tag.id);
    // const { displayedTags } = this.state;

    let tagsArr: string[] = [];
    for (let index = 0; index < displayedTags.length; index++) {
      const element = displayedTags[index];
      tagsArr.push(element.name);
    }
    return tagsArr;
  };
  addNewTagToForm = () => {
    const { addTagsOpened } = this.state;
    this.setState({
      addTagsOpened: !addTagsOpened
    });
  };
  cancelAddTags = () => {
    this.setState({
      displayedTags: [],
      addTagsOpened: !this.state.addTagsOpened
    });
  };
  toggleAddTags = () => {
    const { addTagsOpened } = this.state;
    this.setState({
      addTagsOpened: !addTagsOpened
    });
  };
  addTag = (tag: TagModule) => {
    const displayedTags = [{ ...tag }, ...this.state.displayedTags];
    this.setState({ displayedTags });
  };

  removeTag = (tag: TagModule) => {
    const displayedTags: TagModule[] = this.state.displayedTags;
    const filteredDisplayedTags = displayedTags.filter(t => t.id !== tag.id);
    this.setState({ displayedTags: filteredDisplayedTags });
  };

  getRandomTagColor = () => {
    return ["blue", "green", "orange"][Math.floor(Math.random() * 3 + 1)];
  };
  addNewTagToList = () => {
    const { count, tagName, tagDesc, tagCategories } = this.state;
    const catObj = tagCategories.map(cat => {
      return {
        name: cat,
        color: this.getRandomTagColor()
      };
    });
    const newTag: TagModule = {
      id: count,
      name: tagName,
      categories: tagCategories,
      categoriesWithColor: catObj,
      description: tagDesc
    };

    this.setState({
      availableTags: [...this.state.availableTags, { ...newTag }],
      displayedTags: [{ ...newTag }, ...this.state.displayedTags],
      count: count + 1,
      tagName: "",
      tagDesc: "",
      tagCategories: [],
      tagCategoriesWithColor: []
    });

    this.handleAddNewTagPopup();
  };
  handleAddNewTagPopup = () => {
    this.setState({
      addTagsOpened: !this.state.addTagsOpened,
      addNewTagOpened: !this.state.addNewTagOpened
    });
  };
  handleChange = event => {
    if (event.target.name === "name") {
      this.setState({
        tagName: event.target.value
      });
    }
    if (event.target.name === "desc") {
      this.setState({
        tagDesc: event.target.value
      });
    }
  };
  handleCategoryChange = value => {
    this.setState({
      tagCategories: [...value]
    });
  };
  isOpenFormularyOptions = () => {
    const val =
      this.props.generalInfo?.is_closed_formulary === "true" ||
      this.props.generalInfo?.is_closed_formulary === true
        ? true
        : this.props.generalInfo?.is_closed_formulary === "false" ||
          this.props.generalInfo?.is_closed_formulary === false
        ? false
        : null;
    return (
      <RadioGroup
        className="radio-group-custom"
        aria-label={"is_closed_formulary"}
        name="is_closed_formulary"
        value={val}
        onChange={e => this.props.onRadioChange(e, "generalInformation")}
      >
        <FormControlLabel value={true} control={<Radio />} label="Closed" />
        <FormControlLabel value={false} control={<Radio />} label="Open" />
      </RadioGroup>
    );
  };
  disabledDate = current => {
    return current.isBefore(moment(), "day");
  };
  getFormularyTypeOptions = opt => {
    let options: any[] = opt.formularyType.map(e => e.formulary_type);

    if (this.props.current_lob === 1) {
      options = opt.formularyType
        .filter(
          e =>
            e.formulary_type === "Medicare" ||
            e.formulary_type === "Medicare-Medicaid Plan (MMP)"
        )
        .map(e => e.formulary_type);
    } else if (this.props.current_lob === 2) {
      options = opt.formularyType
        .filter(
          e =>
            e.formulary_type === "Managed Medicaid" ||
            e.formulary_type === "State Medicaid"
        )
        .map(e => e.formulary_type);
    } else if (this.props.current_lob === 3) {
      options = opt.formularyType
        .filter(e => e.formulary_type === "Exchange")
        .map(e => e.formulary_type);
    } else if (this.props.current_lob === 4) {
      options = opt.formularyType
        .filter(e => e.formulary_type === "Commercial")
        .map(e => e.formulary_type);
    }

    return options;
  };

  getFormularyLob = () => {
    const options = this.props.general_options;
    let lob = "commercial";
    if (options && options.formularyType && options.formularyType.length > 0) {
      const formulary = options.formularyType.filter(
        t => t.id_lob === this.props.current_lob
      );
      if (formulary && formulary.length > 0) {
        lob = formulary[0].formulary_type;
      }
    }
    return lob.toLowerCase();
  };
  closeImportModal = () => {
    this.setState({
      isImportFLDialog: false,
    });
  };
  handleUpdateFormularyUploadIcon = () => {
    this.setState({
      isImportFLDialog: true,
    });
  };
  render() {
    const { Option } = Select;
    const {
      addTagsOpened,
      addNewTagOpened,

      tagName,
      tagCategories,
      tagDesc
    } = this.state;
    const FORMULARY = this.props.formulary;
    const disabled = this.props.formulary_mode === "EXISTING" ? true : false;
    let general_options: any;
    if (this.props.general_options) {
      general_options = this.props.general_options.formularyType.map(
        e => e.formulary_type
      );
    }
    let FORMULARY_Values: any;
    if (FORMULARY) {
      FORMULARY_Values = {
        selected_formulary_type:
          this.props.formulary_mode === "EXISTING"
            ? FORMULARY.formulary_type_info.formulary_type
            : "",
        formulary_name: FORMULARY.formulary_info?.formulary_name,
        effective_date: FORMULARY.formulary_info?.effective_date,
        formulary_description: FORMULARY.formulary_info?.formulary_description,
        formulary_build_method:
          FORMULARY.formulary_info?.formulary_build_method,
        abbreviation: FORMULARY.formulary_info?.abbreviation,
        contract_year:
          this.props.formulary_mode === "EXISTING"
            ? [FORMULARY.formulary_info?.contract_year]
            : ["2021", "2022"]
      };
    }
    return (
      <div className="general-information-container">
        {this.state.isImportFLDialog ? (
          <ImportFLDialog
            closeImportModal={this.closeImportModal}
            isImport={this.state.isImportFLDialog}
            isExisting
          />
        ) : null}
        {this.props.fromLanding === undefined && this.props.formulary_mode !== 'NEW' ? (
          <div className="block-header">
            <h4>General information</h4>
            <div className="right-side">
              <svg onClick={this.handleUpdateFormularyUploadIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25 12.0001H6.75C6.33437 12.0001 6 11.6657 6 11.2501V6.0001H3.25938C2.70312 6.0001 2.425 5.32822 2.81875 4.93447L7.57188 0.178223C7.80625 -0.0561523 8.19063 -0.0561523 8.425 0.178223L13.1812 4.93447C13.575 5.32822 13.2969 6.0001 12.7406 6.0001H10V11.2501C10 11.6657 9.66562 12.0001 9.25 12.0001ZM16 11.7501V15.2501C16 15.6657 15.6656 16.0001 15.25 16.0001H0.75C0.334375 16.0001 0 15.6657 0 15.2501V11.7501C0 11.3345 0.334375 11.0001 0.75 11.0001H5V11.2501C5 12.2157 5.78438 13.0001 6.75 13.0001H9.25C10.2156 13.0001 11 12.2157 11 11.2501V11.0001H15.25C15.6656 11.0001 16 11.3345 16 11.7501ZM12.125 14.5001C12.125 14.1563 11.8438 13.8751 11.5 13.8751C11.1562 13.8751 10.875 14.1563 10.875 14.5001C10.875 14.8438 11.1562 15.1251 11.5 15.1251C11.8438 15.1251 12.125 14.8438 12.125 14.5001ZM14.125 14.5001C14.125 14.1563 13.8438 13.8751 13.5 13.8751C13.1562 13.8751 12.875 14.1563 12.875 14.5001C12.875 14.8438 13.1562 15.1251 13.5 15.1251C13.8438 15.1251 14.125 14.8438 14.125 14.5001Z" fill="#1D54B4"/>
              </svg>
              <ExportFormulary hasIcons/>
            </div>
          </div>
        ):<h4>General information</h4>}
        <div className="general-information-fields-wrapper setup-label">
          <Grid container>
            <Grid item xs={4}>
              <div
                className={`group error-${this.props.errorObj.formularyType}`}
              >
                <label>
                  FORMULARY TYPE <span className="astrict">*</span>
                </label>
                <DropDown
                  className="formulary-type-dropdown"
                  placeholder="Select"
                  options={this.getFormularyTypeOptions(
                    this.props.general_options
                  )}
                  value={this.props.generalInfo.type}
                  disabled={disabled}
                  onChange={this.props.formularyTypeChanged}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                className={`group error-${this.props.errorObj.formularyName}`}
              >
                <label>
                  FORMULARY NAME <span className="astrict">*</span>
                </label>
                <input
                  disabled={disabled}
                  type="text"
                  id="name"
                  className="setup-input-fields"
                  name="name"
                  value={this.props.generalInfo.name}
                  onChange={this.props.updateInputField}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group">
                <label>ABBREVIATION</label>
                <input
                  type="text"
                  className="setup-input-fields"
                  name="abbreviation"
                  value={this.props.generalInfo.abbreviation}
                  onChange={this.props.updateInputField}
                  maxLength={10}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <label>
                EFFECTIVE DATE <span className="astrict">*</span>
              </label>
              <DatePicker
                className="effective-date"
                placeholder={FORMULARY ? FORMULARY_Values.effective_date : ""}
                disabled={disabled}
                disabledDate={this.disabledDate}
                format={"MM/DD/YYYY"}
                onChange={e =>
                  this.props.datePickerChange(
                    e,
                    "generalInformation",
                    "effective_date"
                  )
                }
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
              />
            </Grid>
            {/* <Grid item xs={this.props.generalInfo.method === "C" ? 4 : 8}>
              <div className="group">
                <label>
                  Method of Formulary Build <span className="astrict">*</span>
                </label>
                <div className="marketing-material radio-group no-transform">
                  <RadioGroup
                    className="radio-group-custom"
                    aria-label={this.props.generalInfo.method}
                    name="method"
                    value={this.props.generalInfo.method?.toString()}
                    onChange={e =>
                      this.props.onRadioChange(e, "generalInformation")
                    }
                  >
                    <FormControlLabel
                      disabled={disabled}
                      value="C"
                      control={<Radio />}
                      label="Clone"
                    />
                    <FormControlLabel
                      disabled={disabled}
                      value="upload"
                      control={<Radio />}
                      label="Upload"
                    />
                    <FormControlLabel
                      disabled={disabled}
                      value="N"
                      control={<Radio />}
                      label="Create New"
                    />
                  </RadioGroup>
                </div>

                {this.props.generalInfo.method === "upload" && (
                  <div>
                    <UploadFiles />
                  </div>
                )}
              </div>
            </Grid> */}

            {/* {this.props.generalInfo.method === "C" && (
              <Grid item xs={4}>
                {this.props.formulary_mode === "NEW" && (
                  <div
                    className={`group clone-div error-${this.props.errorObj.bildMethod}`}
                  >
                    <div className="inner-div">
                      <label>
                        CLONE FORMULARY <span className="astrict">*</span>
                      </label>
                      <span
                        onClick={e => this.setState({ showClonePopup: true })}
                        className="input-link"
                      >
                        Clone Formulary
                      </span>
                    </div>
                  </div>
                )}
              </Grid>
            )} */}
            <Grid item xs={4}>
              <div className="group">
                <label>
                  SERVICE YEAR <span className="astrict">*</span>
                </label>
                <DropDown
                  className="formulary-type-dropdown"
                  options={this.props.general_options.contractYear?.map(
                    e => e.contract_year
                  )}
                  value={this.props.generalInfo.service_year}
                  disabled={disabled}
                  onChange={e =>
                    this.props.onDropdownChange(
                      e,
                      "generalInformation",
                      "service_year"
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group">
                <label>FORMULARY DESCRIPTION</label>
                <input
                  type="text"
                  className="setup-input-fields"
                  name="description"
                  value={this.props.generalInfo.description}
                  onChange={this.props.updateInputField}
                />
              </div>
            </Grid>
            
            {/* Commercial shouldn't have this but condition changed to help dev */}
            {(this.props.generalInfo.type_id === 1 || this.props.generalInfo.type_id === 2) ? (
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    Which prior year's formulary does this most closely
                    resemble?
                  </label>
                    <SelectFormularyDropDown
                      formularyName={this.props.selectedResemblanceFormulary ? this.getResemblingFlName(this.props.selectedResemblanceFormulary): "" }
                      openSelectFormulary={() =>
                        this.setState({ showSelectFormularyPopup: true })
                      }
                    />
                </div>
              </Grid>
            ) : null}
            <Grid item xs={4}>
              <div className="group setup-panel">
                <PanelHeader
                  title="FORMULARY CLASSIFICATION SYSTEM"
                  tooltip="FORMULARY CLASSIFICATION SYSTEM"
                  required
                />
                <div className="marketing-material radio-group">
                  {this.getClassificationRadio()}
                </div>
              </div>
            </Grid>
            {(this.props.generalInfo.type_id === 5 || this.props.generalInfo.type_id === 6) ? (
              <Grid item xs={4}>
                <div className="group setup-panel">
                  <PanelHeader
                    title="IS THIS A CLOSED OR OPEN FORMULARY"
                    tooltip="FORMULARY CLASSIFICATION SYSTEM"
                    required
                  />
                  <div className="marketing-material radio-group">
                    {this.isOpenFormularyOptions()}
                  </div>
                </div>
              </Grid>
            ) : null}
            { this.props.generalInfo.type_id === 2 || 
              this.props.generalInfo.type_id === 3 ||
              this.props.generalInfo.type_id === 4 ? (
              <Grid item xs={4}>
                <div className="group state-group">
                  <label>
                    What State is this formulary for?{" "}
                    <span className="astrict">*</span>
                  </label>
                  <DropDown
                    className="formulary-type-dropdown"
                    options={this.props.general_options.states.map(
                      e => e.state_name
                    )}
                    value={this.props.generalInfo.selectedState}
                    disabled={disabled && this.props.formulary.formulary_info.id_state !== null}
                    onChange={e =>
                      this.props.onDropdownChange(
                        e,
                        "generalInformation",
                        "selectedState"
                      )
                    }
                  />
                </div>
              </Grid>
            ) : null}
            <Grid item xs={4}>
              <div className="group reporting-tag-group">
                <label>reporting tags</label>
                <Select
                  mode="multiple"
                  showSearch={false}
                  // value={value}
                  defaultActiveFirstOption={false}
                  disabled={this.getDisplayedTags().length === 0 ? false : true}
                  notFoundContent={null}
                  placeholder={"Add a tag"}
                  onClick={this.toggleAddTags}
                  className="root--ant-select-tag"
                  value={
                    this.getDisplayedTags().length === 0
                      ? []
                      : this.getDisplayedTags()
                  }
                />
                <svg 
                  className="ability-to-add-tags-edit-icon"
                  onClick={this.toggleAddTags}
                  width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#1D54B4"/>
                </svg>
              </div>
              {addTagsOpened ? (
                <DialogPopup
                  className=""
                  showCloseIcon={false}
                  positiveActionText="Apply"
                  negativeActionText="Cancel"
                  title="tags"
                  handleClose={this.cancelAddTags}
                  handleAction={this.addNewTagToForm}
                  showActions={true}
                  open={addTagsOpened}
                  popupMaxWidth={"lg"}
                  headJSX={() => (
                    <button
                      className="add-new-tag-btn"
                      onClick={this.handleAddNewTagPopup}
                    >
                      + Add New Tag
                    </button>
                  )}
                >
                  <FrxReportingTags
                    availableTags={this.state.availableTags}
                    displayedTags={this.state.displayedTags}
                    removeTag={this.removeTag}
                    addTag={this.addTag}
                  />
                </DialogPopup>
              ) : null}

              {addNewTagOpened ? (
                <div className="root-component-add-new-tag">
                  <DialogPopup
                    showCloseIcon={true}
                    positiveActionText="Add Tag"
                    negativeActionText="Cancel"
                    title="ADD NEW TAG"
                    handleClose={this.handleAddNewTagPopup}
                    handleAction={this.addNewTagToList}
                    showActions={true}
                    open={addNewTagOpened}
                    popupMaxWidth={"md"}
                    className="root-add-new-tag-popup"
                  >
                    <AddNewTag
                      categories={categories}
                      tagName={tagName}
                      tagCategories={tagCategories}
                      tagDesc={tagDesc}
                      handleChange={this.handleChange}
                      handleCategoryChange={this.handleCategoryChange}
                    />
                  </DialogPopup>
                </div>
              ) : null}

              {this.state.showClonePopup ? (
                <DialogPopup
                  positiveActionText=""
                  negativeActionText="Close"
                  title={"Select Formulary"}
                  handleAction={() => {}}
                  open={this.state.showClonePopup}
                  handleClose={() => {
                    this.setState({
                      showClonePopup: false
                    });
                  }}
                  showActions={false}
                  className="dialog-popup clone-popup"
                  height="80%"
                  width="90%"
                >
                  <CloneFormularyPopup
                    type="commercial" // type will be dynamic based on the LOB
                    lobID="4"
                    selectFormularyClick={r => {
                      this.props.cloneFormularyClick(r);
                      this.setState({
                        showClonePopup: false
                      });
                    }}
                  />
                </DialogPopup>
              ) : null}

              {this.state.showSelectFormularyPopup ? (
                <DialogPopup
                  positiveActionText=""
                  negativeActionText="Close"
                  title={"Select Formulary"}
                  handleAction={() => {}}
                  open={this.state.showSelectFormularyPopup}
                  handleClose={() => {
                    this.setState({
                      showSelectFormularyPopup: false
                    });
                  }}
                  showActions={false}
                  className="dialog-popup clone-popup"
                  height="80%"
                  width="90%"
                >
                  <SelectFormularyPopup
                    type={this.getFormularyLob()} // type will be dynamic based on the LOB
                    lobID={this.props.current_lob} // id should be populated
                    resembleFormularyData={
                      this.props.resembleFormularyData &&
                      this.props.resembleFormularyData.length > 0
                        ? this.props.resembleFormularyData
                        : []
                    }
                    selectFormularyClick={r => {
                      this.props.selectFormularyClick(r);
                      this.setState({
                        showSelectFormularyPopup: false
                      });
                    }}
                  />
                </DialogPopup>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GeneralInformation);

const categories = [
  { id: 1, name: "Category 1", color: "green" },
  { id: 2, name: "Category 2", color: "blue" },
  { id: 3, name: "Category 3", color: "orange" },
  { id: 4, name: "Category 4", color: "green" },
  { id: 5, name: "Category 5", color: "blue" },
  { id: 6, name: "Category 6", color: "orange" },
  { id: 7, name: "Category 7", color: "green" },
  { id: 8, name: "Category 8", color: "blue" }
];

// fake data
const tags = [
  {
    id: 1,
    name: "Tag 1",
    description: "This will display all assets with Tag 1",
    categories: ["Category 1", "Category 2", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 2", color: "blue" },
      { name: "Category 6", color: "orange" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 2,
    name: "Tag 2",
    description: "This will display all assets with Tag 2",
    categories: ["Category 1", "Category 2", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "blue" },
      { name: "Category 2", color: "orange" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 3,
    name: "Tag 3",
    description: "This will display all assets with Tag 3",
    categories: ["Category 1", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 8", color: "orange" }
    ]
  },
  {
    id: 4,
    name: "Tag 4",
    description: "This will display all assets with Tag 4",
    categories: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
      "Category 7",
      "Category 8"
    ],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 2", color: "orange" },
      { name: "Category 3", color: "blue" },
      { name: "Category 4", color: "orange" },
      { name: "Category 7", color: "blue" },
      { name: "Category 5", color: "green" },
      { name: "Category 8", color: "orange" }
    ]
  },
  {
    id: 5,
    name: "Tag 5",
    description: "This will display all assets with Tag 5",

    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 2", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 6,
    name: "Tag 6",
    description: "This will display all assets with Tag 6",
    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 2", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 7,
    name: "Tag 7",
    description: "This will display all assets with Tag 7",
    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 8,
    name: "Tag 8",
    description: "This will display all assets with Tag 8",
    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 9,
    name: "Tag 9",
    description: "This will display all assets with Tag 9",
    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 10,
    name: "Tag 10",
    description: "This will display all assets with Tag 10",
    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  },
  {
    id: 11,
    name: "Tag 11",
    description: "This will display all assets with Tag 11",
    categories: ["Category 2", "Category 4", "Category 6", "Category 8"],
    categoriesWithColor: [
      { name: "Category 1", color: "green" },
      { name: "Category 4", color: "orange" },
      { name: "Category 6", color: "blue" },
      { name: "Category 8", color: "green" }
    ]
  }
];
