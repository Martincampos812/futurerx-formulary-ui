import React from 'react';
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogPopup from '../../shared/FrxDialogPopup/FrxDialogPopup';
import GeneralInformation from '../DrugDetails/components/FormularySetUp/components/GeneralInformation';
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../../models/tab.model";
import { trim } from "lodash";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { loadImportFiles, downloadReport } from '../../../redux/slices/formulary/import_export/formularyImportSlice';
import TemplateList from './templateList';
import FileUploadDetails from './FileUploadDetails';
import './fileUpload.scss';
import ShowChangesOnly from './ShowChangesOnly';
import showMessage from "../Utils/Toast";
import {
    fetchSelectedFormulary,
    verifyFormularyName,
    saveFormulary,
} from "../../.././redux/slices/formulary/setup/setupSlice";
import {
    fetchGeneralOptions,
    fetchSubMthsOptions,
    fetchStatesOptions,
    fetchResemblingFlsOptions
} from "../../.././redux/slices/formulary/setup/setupOptionsSlice";
import { postMessage } from "../../.././redux/slices/formulary/messaging/messagingSlice";

const miniTabs = [
    { id: 1, text: "Formulary Setup" },
    { id: 2, text: "Import", disabled: true}
];

class importFormulary extends React.Component<any, any> {
    state = {
        activeMiniTabIndex: 0,
        miniTabs: miniTabs,
        currentStep: 1,
        loadKeyType: null,
        dialogTitle: 'SELECT FILE FOR IMPORT',
        flID: -1,
        isShowDetails: false,
        fileName: '',
        fileID: '',
        isExisting: false,
        fileImportFor: null,
        showChangesOnly: false,
        changesOnlyList: [],
        showUploadExisting: false,
        errorObj: {
            formularyType: false,
            formularyName: false,
            effectiveDate: false,
            bildMethod: false,
            serviceYear: false,
            classificaton: false,
        },
        setupOptions: {},
        generalInformation: {
            type: "",
            type_id: 0,
            name: "",
            abbreviation: "",
            effective_date: "",
            method: "N",
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
        file: null
    }
    handleContinueAction = (e) => {
        let step = this.state.currentStep;
        let dialogTitle = this.state.dialogTitle;
        let fileImportFor = this.state.fileImportFor;
        
        if (step === 1 && this.state.loadKeyType !== null) {
            step = 2;
            dialogTitle = this.props.isExisting === undefined ? 'GENERAL INFORMATION' : 'SELECT FILE FOR IMPORT';
        } else if (step === 2 && fileImportFor === null && this.props.isExisting === undefined) {
            this.onSave(false)
        } else if (step === 2 && fileImportFor === 'changes_only' && !this.state.showChangesOnly){
            dialogTitle = "WHAT EDITS WILL BE UPDATED";
            this.setState({
                showChangesOnly: true,
            })
        } else if (step === 2 && fileImportFor === 'full_replace' && !this.state.showUploadExisting){
            this.setState({
                showChangesOnly: false,
                showUploadExisting: true
            })
        } else if(step === 2 && this.state.showChangesOnly){
            if(this.state.changesOnlyList.length > 0){
                dialogTitle = "SELECT LISTS FOR IMPORT";
                this.setState({
                    showChangesOnly: false,
                    showUploadExisting: true
                })
            } else {
                showMessage("Please select option", "error");
            }
        }
        this.setState({
            currentStep: step,
            dialogTitle: dialogTitle
        })
    }
    getLoadKeyTypeHandler = (e) => {
        this.setState({
            loadKeyType: e.target.value
        });
    }
    handleCloseModal = () => {
        this.props.closeImportModal()
    }
    renderRadioOptions = () => {
        return (
            <div className="file-type__radio-group radio-group">
                <RadioGroup
                    className="radio-group-custom"
                    name="loadKeyType"
                    value={this.state.loadKeyType}
                    onChange={this.getLoadKeyTypeHandler}
                >
                    <FormControlLabel
                        value="GPI"
                        control={<Radio />}
                        label="GPI"
                    />
                    <FormControlLabel
                        value="DDID"
                        control={<Radio />}
                        label="DDID"
                    />
                    <FormControlLabel
                        value="RXCUI"
                        control={<Radio />}
                        label="RXCUI"
                    />
                    <FormControlLabel
                        value="NDC"
                        control={<Radio />}
                        label="NDC"
                    />
                </RadioGroup>
            </div>
        )
    }
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
    onDatePickerChangeHandler = (e, section, stateProp) => {
        const date = `${e._d.getFullYear()}-${e._d.getMonth() + 1
            }-${e._d.getDate()}`;
        const newObj = { ...this.state[section] };
        newObj[stateProp] = date;
        this.setState({
            [section]: newObj,
        });
    };
    onClickMiniTab = (selectedTabIndex: number) => {
        let activeMiniTabIndex = 0;
        if(selectedTabIndex === 0){
            if(this.state.flID !== -1){
                this.manageFormularyType(6,this.state.flID);
                this.props.fetchSelectedFormulary(this.state.flID);
            }
        }
        const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
            if (index === selectedTabIndex) {
                activeMiniTabIndex = index;
            }
            return tab;
        });
        this.setState({ tabs, activeMiniTabIndex });
    };

    renderForm = () => {
        return (
            <>
                {this.props.isExisting === undefined ? (
                    <GeneralInformation
                        generalInfo={this.state.generalInformation}
                        setupOptions={this.state.setupOptions}
                        updateInputField={this.updateInputField}
                        onRadioChange={this.onRadioChangeHandler}
                        onDropdownChange={this.onDropdownChange}
                        formularyTypeChanged={this.formularyTypeChanged}
                        datePickerChange={this.onDatePickerChangeHandler}
                        errorObj={this.state.errorObj}
                        fromLanding
                        selectedResemblanceFormulary={
                            this.state.generalInformation.selectedResemblanceFormulary
                        } 
                    />
                ) : null}
            </>
        )
    }
    updateChangesOnlyHandler = (getList) => {
        this.setState({
            changesOnlyList: getList
        })
    }
    isChangesOnlyCheckHandler = (row1,row2) => {
        if(row2.length < 1){
            
        }
    }
    showChangesOnlyContent = () => {
        return <ShowChangesOnly updateChangesOnly={this.updateChangesOnlyHandler} isChangesOnlyCheck={this.isChangesOnlyCheckHandler}/>
    }
    fileImportForHandler = (e) => {
        this.setState({
            fileImportFor: e.target.value
        })
    }
    renderExistingFl = () => {
        const edit_info = this.props.formulary.edit_info.map(e => e.id_edit);
        const isNA = this.props.setupOptions.designOptions.filter(e => edit_info.indexOf(e.id_edit) > -1 && e.code_value === 'NA').length > 0;
        const lob_id = this.props.formulary_lob_id;
        const isTiers = this.props.formulary.tiers.length > 0;
        let isChangesOnlyOption = true;
        if((lob_id !== 1 && edit_info.length < 1) || isNA || isTiers){
            isChangesOnlyOption = false;
        }
        if(lob_id === 1){
            isChangesOnlyOption = true;
        }
        if(isTiers){
            isChangesOnlyOption = true;
        }
        return (
            <div className="w-640">
                <div className="label-title">What type of file are you loading?</div>
                <div className="file-type__radio-group radio-group">
                    <RadioGroup
                        className="radio-group-custom"
                        name="fileImportFor"
                        value={this.state.fileImportFor}
                        onChange={this.fileImportForHandler}
                    >
                        <FormControlLabel
                            value="full_replace"
                            control={<Radio />}
                            label="Full Replace"
                        />
                        {isChangesOnlyOption ? (
                            <FormControlLabel
                                value="changes_only"
                                control={<Radio />}
                                label="Changes Only"
                            />
                        ):null}
                        
                    </RadioGroup>
                </div>
            </div>
        )
    }
    renderUpload = () => {
        return <TemplateList 
            formulary_id={this.state.flID} 
            loadKeyType={this.state.loadKeyType}
            isShowDetailsHandler={this.isShowDetailsHandler}
            changesOnlyList={this.state.changesOnlyList}/>
    }
    manageFormularyType = (type, id) => {
        let defaultType = 4;
        if (type === -1) {
            this.props.fetchGeneralOptions({ type: defaultType, id: -1 });
            return;
        }
        this.props.fetchGeneralOptions({ type: type, id: id });
        if (type === 1) {
            // MRC...
            this.props.fetchResemblingFlsOptions({ type: type, id: id });
        } else if (type === 2) {
            // MMP...
            this.props.fetchStatesOptions(type);
            this.props.fetchResemblingFlsOptions({ type: type, id: id });
        } else if (type === 3) {
            // MM...
            this.props.fetchStatesOptions(0);
        } else if (type === 4) {
            // SM...
            this.props.fetchStatesOptions(0);
        }
        this.props.fetchSubMthsOptions(2021);
    }
    setDefaultClassificationSystem = (classification) => {
        const classificationSystem = [...classification];
        const class_length = classificationSystem.length;
        let defaultClassification: any;
        if (class_length === 1) {
            defaultClassification = classificationSystem[0].id_classification_system;
        } else if (class_length > 1) {
            defaultClassification = classificationSystem.filter(e => e.code_value === 'USP')[0].id_classification_system
        }
        const newGeneralOption: any = { ...this.state.generalInformation };
        newGeneralOption.classification_system = defaultClassification;
        this.setState({
            generalInformation: newGeneralOption,
        });
    }
    componentDidMount() {
        if(this.props.formulary === null){
            if(this.state.flID !== -1 && this.props.formulary !== null && this.props.mode === 'NEW'){
                this.manageFormularyType(-1, -1);
                this.props.fetchSelectedFormulary(-1);
            }else{
                this.manageFormularyType(6,this.state.flID);
                this.props.fetchSelectedFormulary(this.state.flID);
            }
        }
        if(this.props.formulary_id !== null && this.props.formulary_id !== undefined && this.props.formulary_id !== 0){
            this.setState({
                flID: this.props.formulary_id
            })
        }
    }
    UNSAFE_componentWillReceiveProps = (newProps) => {
        if (newProps.setupOptions.generalOptions) {
            this.setDefaultClassificationSystem(newProps.setupOptions.generalOptions.classification_systems);
        }
    }

    onSave = (e) => {
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
            if (this.state.generalInformation.type_id === 0) {
                msg.push("Formulary Type is required.");
            }
            if (trim(this.state.generalInformation.name) === "") {
                msg.push("Formulary Name is required.");
            }
            if (this.state.generalInformation.effective_date === "") {
                msg.push("Formulary Effective Date is required.");
            }
            if (this.state.generalInformation.service_year === "") {
                msg.push("Formulary Service year is required.");
            }
            if (msg.length > 0) {
                this.props.postMessage({ message: msg[0], type: "warning" });
                return;
            }
        }
        const input = {
            MODE: 'NEW',
            CONTINUE: false,
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
        if (this.state.flID !== -1) {
            input.formulary_id = this.state.flID;
        } else {
            input.formulary_id = -1;
        }
        
        input.is_setup_complete = false;

        this.props.saveFormulary(input).then((arg) => {
            if (
                arg &&
                arg.payload &&
                arg?.payload?.type > 0 &&
                arg?.payload?.id > 0
            ) {
                let msgStr = "";
                if (arg?.payload?.earlier_mode === "NEW") {
                    // showMessage(`Formulary Created. ID:${arg?.payload?.id}`, "success");=
                    msgStr = `Formulary Created ID: ${arg?.payload?.id}`;
                }
                this.props.postMessage({ message: msgStr, type: "success" });
                
                let activeMiniTabIndex = 0;
                let miniTabs = [...this.state.miniTabs];
                // miniTabs[1].disabled = false;
                const tabs = miniTabs.map((tab: TabInfo, index: number) => {
                    activeMiniTabIndex = 1;
                    return tab;
                });
                // this.props.loadImportFiles(arg.payload.id);
                this.setState({
                    activeMiniTabIndex,
                    miniTabs,
                    flID: arg?.payload?.id
                })
            }
        });
    };
    
    renderActiveMiniTabContent = () => {
        const miniTabIndex = this.state.activeMiniTabIndex;
        switch (miniTabIndex) {
            case 0:
                return this.renderForm();
            case 1:
                return (
                    <div className="file-upload-dialog">
                        <div className="expanded-data">
                            {this.renderUpload()}
                        </div>
                    </div>
                );
        }
    };
    isShowDetailsHandler = (id,fileName) => {
        this.setState({
            isShowDetails: true,
            fileName: fileName,
            fileID: id
        })
    }
    backToUploadList = () => {
        this.setState({
            isShowDetails: false
        })
    }
    onClose = () => {
        this.setState({
            isShowDetails: false
        })
    }

    handleDownloadReport = () => {

    }

    render() {
        const mainPopupClass = this.state.isShowDetails === true ? 'root-add-new-tag-popup import-fl-dialog hidden-popup' : 'root-add-new-tag-popup import-fl-dialog';
        return (
            <>
            {this.state.isShowDetails ? (
                <DialogPopup
                    showCloseIcon={false}
                    positiveActionText=""
                    negativeActionText=""
                    title={this.state.fileName}
                    headJSX={() => (
                        <svg onClick={this.handleDownloadReport} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                        </svg>                     
                    )}
                    handleClose={this.onClose}
                    handleAction={()=>{}}
                    showActions={false}
                    open={true}
                    popupMaxWidth={"lg"}
                    className="file-upload-dialog file-details-dialog"
                >
                    <div className="file-details-wrapper">
                        <FileUploadDetails 
                            back={this.backToUploadList} 
                            fileID={this.state.fileID}
                            formulary_id={this.state.flID}
                        />
                    </div>
                </DialogPopup>
            ) : null}
            <DialogPopup
                showCloseIcon={true}
                positiveActionText="Continue"
                negativeActionText="Cancel"
                title={this.state.dialogTitle}
                handleClose={this.handleCloseModal}
                handleAction={this.handleContinueAction}
                showActions={true}
                open={true}
                popupMaxWidth={"lg"}
                className={mainPopupClass}
            >
                {this.state.currentStep === 1 ? (
                    <div id="upload-choice">
                        <div className="file-type">
                            <div className="label-title">What level will you be loading this file?</div>
                            {this.renderRadioOptions()}
                        </div>
                    </div>
                ) : null}
                {this.state.currentStep === 2 && this.props.isExisting === undefined? (
                    <div className="form">
                        <div className="csr-root">
                            <div className="formulary-root">
                                <FrxMiniTabs
                                    tabList={this.state.miniTabs}
                                    activeTabIndex={this.state.activeMiniTabIndex}
                                    onClickTab={this.onClickMiniTab}
                                />
                            </div>
                        </div>
                        {this.renderActiveMiniTabContent()}
                    </div>
                ) : null}
                {
                    this.state.currentStep === 2 && 
                    this.props.isExisting !== undefined && 
                    !this.state.showChangesOnly &&
                    !this.state.showUploadExisting ? (
                    this.renderExistingFl()
                ) : null}
                {this.state.showChangesOnly ? (
                    this.showChangesOnlyContent()
                ):null}
                {this.state.showUploadExisting ? (
                    <div className="file-upload-dialog">
                        <div className="expanded-data">
                            {this.renderUpload()}
                        </div>
                    </div>
                ) : null}
            </DialogPopup>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        mode: state?.setup?.mode,
        formulary_id: state?.application?.formulary_id,
        formulary_lob_id: state?.application?.formulary_lob_id,
        formulary: state?.setup?.formulary,
        setupOptions: state?.setupOptions,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSelectedFormulary: (a) => dispatch(fetchSelectedFormulary(a)),
        fetchGeneralOptions: (a) => dispatch(fetchGeneralOptions(a)),
        fetchResemblingFlsOptions: (a) => dispatch(fetchResemblingFlsOptions(a)),
        fetchSubMthsOptions: (a) => dispatch(fetchSubMthsOptions(a)),
        fetchStatesOptions: (a) => dispatch(fetchStatesOptions(a)),
        verifyFormularyName: (a) => dispatch(verifyFormularyName(a)),
        saveFormulary: (a) => dispatch(saveFormulary(a)),
        postMessage: (a) => dispatch(postMessage(a)),
        loadImportFiles: (a) => dispatch(loadImportFiles(a)),
        downloadReport: (a) => dispatch(downloadReport(a))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(importFormulary);