import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import FrxMiniTabs from "./../shared/FrxMiniTabs/FrxMiniTabs";
import { getformulary } from "../.././redux/slices/formulary/setup/setupService";
import {
  getDesignOptions,
  getTierOptions,
  getMedicareOptions,
  getSupplementalOptions,
} from "../.././redux/slices/formulary/setup/setupOptionsService";
import { getformularyVersions } from "../../redux/slices/formulary/application/applicationService"
import getClassificationName from "../NewFormulary/Utils/FormularyClassificationUtils";
import getSubmissionMonth from "../NewFormulary/Utils/SubmissionMonthUtils";
import GeneralInfo from "./GeneralInfo";
import FormularyDesign from "./DesignInfo";
import FormularyTiers from "./Tiers";
import FrxProcessStepper from "./../shared/FrxProcessStepper/FrxProcessStepper";
import { fetchSelectedFormulary } from "../../redux/slices/formulary/setup/setupSlice";
import MedicareInfo from "./MedicareInfo";
import SupplementalBenefits from "./SupplementalBenefits";
import loadIcon from '../../assets/img/loader.gif';
import "./FormularyExpandedDetails.scss";
import MedicaidInfo from "./MedicaidInfo";
import NewVersionPopoup from "../NewFormulary/DrugDetails/components/FormularySetUp/components/newVersion/NewVersionPopoup";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import FrxLoader from "../shared/FrxLoader/FrxLoader";

const miniTabs = [
  { id: 1, text: "General" },
  { id: 2, text: "Formulary Design" },
  { id: 3, text: "Tiers" },
];

const medicareMiniTabs = [
  { id: 1, text: "General" },
  { id: 2, text: "Medicare" },
  { id: 3, text: "Formulary Design" },
  { id: 4, text: "Tiers" },
  { id: 5, text: "Supplemental Benefits/Alternative Model" },
];

const medicaidMiniTabs = [
  { id: 1, text: "General" },
  { id: 2, text: "Medicaid" },
  { id: 3, text: "Formulary Design" },
  { id: 4, text: "Tiers" },
];

const mapStateToProps = (state) => {
  return {
    // dashboard: state?.dashboard?.formulary_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
class FormularyExpandedDetails extends React.Component<any, any> {
  state = {
    parentWidth: "0",
    activeMiniTabIndex: 0,
    formularyType: "",
    formularyName: "",
    formularyAbbrevation: "",
    methodofFormularyBuild: "Y",
    effectiveDate: "",
    serviceYear: "",
    formularyDescription: "",
    formularyClassificationSystem: "",
    formularySubmissionMonth: "",
    formulayId: "",
    designOptions: [],
    tiersOptions: [],
    edit_info: [],
    tiers: [],

    formularyLobId: null,
    medicareContractTypes: [],
    cmsFormularyId: "",
    abridgedCreation: false,
    medicareOptions: [],

    SupplementalBenefits: [],
    supplementalOptions: [],

    formularyVersions: [],
    isNewVersionClicked: false,
    currentFormulary: {},
    isLoading: false
  };

  fetchFormulary = async (formularyId = 0, getVersions = true) => {
    try {
      let formularyData;
      if(getVersions){
        formularyData = await getformulary(parseInt(this.props.rowData.data.id_formulary));
      }else{
        formularyData = await getformulary(formularyId);
      }
      const selectedRow = this.props.formulariesList.filter(
        (e) => e.id_formulary === parseInt(this.props.rowData.data.id_formulary)
      );

      if(getVersions){
        const versions = await getformularyVersions(formularyData.id_base_formulary);
        this.setState({
          formularyVersions: [...versions],
        })
      }
      if (formularyData.formulary_info) {
        this.setState({
          // isLoading: false,
          currentFormulary: { id_base_formulary: formularyData.id_base_formulary },
          cmsFormularyId: formularyData.formulary_info?.cms_formulary_id,
          abridgedCreation:
            formularyData.formulary_info?.abridged_forumulary_creation,
          medicareContractTypes: formularyData.medicare_contract_types,
          SupplementalBenefits: formularyData.supplemental_benefits,
          formulayId: this.props.rowData.data.id,
          formularyType: selectedRow[0].formulary_type,
          formularyName: selectedRow[0].formulary_name,
          formularyAbbrevation:
            formularyData.formulary_info.abbreviation === null
              ? ""
              : formularyData.formulary_info.abbreviation,
          methodofFormularyBuild:
            formularyData.formulary_info.formulary_build_method,
          effectiveDate: selectedRow[0].effective_date,
          serviceYear: selectedRow[0].contract_year,
          formularyDescription:
            formularyData.formulary_info.formulary_description,
          formularyClassificationSystem: getClassificationName(
            formularyData.formulary_info.id_classification_system
          ),
          formularySubmissionMonth:
            formularyData.formulary_info.id_submission_month === null
              ? ""
              : getSubmissionMonth(
                  formularyData.formulary_info.id_submission_month
                ),
          edit_info: [...formularyData.edit_info],
          tiers: [...formularyData.tiers],
        });
      }
      
    } catch (err) {
      console.log(err);
      // this.setState({isLoading: false})
    }
  };
  fetchGenDesignOptions = async () => {
    try {
      const selectedRow = this.props.formulariesList.filter(
        (e) => e.id_formulary === parseInt(this.props.rowData.data.id_formulary)
      );
      let formularyData = await getDesignOptions(
        selectedRow[0].id_formulary_type,
        selectedRow[0].id_formulary
      );
      if (formularyData) {
        this.setState({
          designOptions: [...formularyData],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchGenTiersOptions = async () => {
    try {
      const selectedRow = this.props.formulariesList.filter(
        (e) => e.id_formulary === parseInt(this.props.rowData.data.id_formulary)
      );
      let formularyData = await getTierOptions(
        selectedRow[0].id_formulary_type,
        selectedRow[0].id_formulary,
        0
      );
      if (formularyData) {
        this.setState({
          tiersOptions: [...formularyData],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchMedicareInfo = async (formularyTypeId, formularyId) => {
    try {
      let formularyData = await getMedicareOptions(
        formularyTypeId,
        formularyId
      );
      if (formularyData) {
        this.setState({
          medicareOptions: [...formularyData],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchSupplementalBenefits = async (formularyTypeId, formularyId) => {
    try {
      let formularyData = await getSupplementalOptions(
        formularyTypeId,
        formularyId
      );
      if (formularyData) {
        this.setState({
          supplementalOptions: [...formularyData],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    if (this.props.rowData && this.props.formulariesList) {
      const width =
        (document.querySelector(".ant-table-wrapper") as HTMLElement)
          .offsetWidth -
        6 +
        "px";
      this.fetchFormulary();
      this.fetchGenDesignOptions();
      this.fetchGenTiersOptions();

      // this.props.drugDetailClick(this.props.rowData.data.id)
      // console.log("==========> "+this.props.rowData.data.id)
      const formularyId = parseInt(this.props.rowData.data.id_formulary);
      // if(this.props.formulary === null)
      //   this.props.fetchSelectedFormulary(formularyId)
      let fromulary;
      this.props.formulariesList.some((form) => {
        if (form.id_formulary === formularyId) {
          fromulary = form;
          return true;
        }
        return null;
      });
      const lobId = fromulary?.id_lob;
      const formularyTypeId = fromulary?.id_formulary_type;
      if (lobId === 1) {
        // lobId = 1 => MEDICARE
        this.fetchMedicareInfo(formularyTypeId, formularyId);
        this.fetchSupplementalBenefits(formularyTypeId, formularyId);
      }

      this.setState({
        parentWidth: width,
        formularyLobId: lobId,
      });
    }
  }
  setActiveMiniTabIndex = (tabIndex) => {
    this.setState({
      activeMiniTabIndex: tabIndex,
    });
  };
  renderTabContent = (formularyLobId) => {
    const tabIndex = this.state.activeMiniTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <GeneralInfo
            generalInfo={this.state}
            drugDetailClick={this.props.drugDetailClick}
          />
        );
      case 1:
        return (
          <FormularyDesign
            formularyLobId={formularyLobId}
            designOptions={this.state.designOptions}
            edit_info={this.state.edit_info}
          />
        );
      case 2:
        return (
          <FormularyTiers
            tiers={this.state.tiers}
            tiersOptions={this.state.tiersOptions}
          />
        );
    }
  };

  renderTabContentMedicare = (formularyLobId) => {
    const tabIndex = this.state.activeMiniTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <GeneralInfo
            generalInfo={this.state}
            drugDetailClick={this.props.drugDetailClick}
          />
        );
      case 1:
        return (
          <MedicareInfo
            medicareOption={this.state.medicareOptions}
            medicareContractTypes={this.state.medicareContractTypes}
            cmsFormularyId={this.state.cmsFormularyId}
            abridgedCreation={this.state.abridgedCreation}
          />
        );
      case 2:
        return (
          <FormularyDesign
            formularyLobId={formularyLobId}
            designOptions={this.state.designOptions}
            edit_info={this.state.edit_info}
          />
        );
      case 3:
        return (
          <FormularyTiers
            tiers={this.state.tiers}
            tiersOptions={this.state.tiersOptions}
          />
        );
      case 4:
        return (
          <SupplementalBenefits
            supplementalOptions={this.state.supplementalOptions}
            SupplementalBenefits={this.state.SupplementalBenefits}
          />
        );
    }
  };

  renderTabContentMedicaid = (formularyLobId) => {
    const tabIndex = this.state.activeMiniTabIndex;
    switch (tabIndex) {
      case 0:
        return (
          <GeneralInfo
            generalInfo={this.state}
            drugDetailClick={this.props.drugDetailClick}
          />
        );
      case 1:
        return (
          <MedicaidInfo
          // medicareOption={this.state.medicareOptions}
          // medicareContractTypes={this.state.medicareContractTypes}
          // cmsFormularyId={this.state.cmsFormularyId}
          // abridgedCreation={this.state.abridgedCreation}
          />
        );
      case 2:
        return (
          <FormularyDesign
            formularyLobId={formularyLobId}
            designOptions={this.state.designOptions}
            edit_info={this.state.edit_info}
          />
        );
      case 3:
        return (
          <FormularyTiers
            tiers={this.state.tiers}
            tiersOptions={this.state.tiersOptions}
          />
        );
    }
  };

  closeNewversionPopup = () => {
    this.setState({isNewVersionClicked: false})
  }

  getFormulary = (version) => {
    // this.setState({
    //   isLoading: true
    // })
    this.fetchFormulary(version.id_formulary, false)
  }

  render() {
    const { isLoading, formularyLobId, formularyVersions, isNewVersionClicked, currentFormulary } = this.state;
     return (
      <div
      className="table-expanded-sticky-wrapper"
      style={{ width: this.state.parentWidth }}
      >
        <div>
          {/* {isLoading && <FrxLoader/>} */}
        </div>
        <div className="formulary-expanded-details">
          <Paper elevation={0}>
            <div className="formulary-expanded-details__container">
              {/* Left Container Starting*/}
              <div className="formulary-expanded-details-left">
                <div className="formulary-expanded-details-left__container">
                  <div className="formulary-expanded-details-left__title">
                    Versions
                  </div>
                  <div className="formulary-expanded-details-left__list">
                    {formularyVersions.map(version => (
                      <div className="formulary-expanded-details-left__list-item" onClick={() => this.getFormulary(version)}>
                        <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--active" />
                        {version["value"]}
                      </div>
                    ))}
                    {/* <div className="formulary-expanded-details-left__list-item">
                      <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--active" />
                      Version 3
                    </div>
                    <div className="formulary-expanded-details-left__list-item">
                      <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--inactive" />
                      Version 2
                    </div> */}
                    <div className="formulary-expanded-details-left__list-add-item">
                    {/* onClick={() => this.setState({isNewVersionClicked: true})} */}
                      + add new version
                    </div>
                    {isNewVersionClicked && (
                      <FrxDialogPopup
                        positiveActionText="save"
                        negativeActionText="cancel"
                        title={"New Version"}
                        handleClose={this.closeNewversionPopup}
                        handleAction={this.closeNewversionPopup}
                        open={isNewVersionClicked}
                        showActions={false}
                        showCloseIcon={false}
                        className="formularydetailstop-root__grid-dialog-popup"
                      >
                        <NewVersionPopoup
                          currentFormulary={currentFormulary}
                          onCancel={this.closeNewversionPopup}
                          // newVersion={this.newVersionHandler}
                        />
                      </FrxDialogPopup>
                    )}
                  </div>
                </div>
              </div>
              {/* Left Container Ending*/}
              {/* Right Container Starting*/}
              <div className="formulary-expanded-details-right">
                <div className="formulary-expanded-details-right__header">
                  <FrxProcessStepper />
                </div>
                <div className="formulary-expanded-details-right__tabs">
                  <FrxMiniTabs
                    // medicaidMiniTabs
                    tabList={
                      formularyLobId !== 1 && formularyLobId !== 2
                        ? miniTabs
                        : formularyLobId === 1
                        ? medicareMiniTabs
                        : medicaidMiniTabs
                    }
                    activeTabIndex={this.state.activeMiniTabIndex}
                    onClickTab={(selectedTabIndex) =>
                      this.setActiveMiniTabIndex(selectedTabIndex)
                    }
                  />
                </div>
                <div className="formulary-expanded-details-right__content">
                  {formularyLobId !== 1 && formularyLobId !== 2
                    ? this.renderTabContent(formularyLobId)
                    : formularyLobId === 1
                    ? this.renderTabContentMedicare(formularyLobId)
                    : this.renderTabContentMedicaid(formularyLobId)}
                </div>
              </div>
              {/* Right Container Ending*/}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default FormularyExpandedDetails;
// connect(
//   mapStateToProps,
//   mapDispatchToProps
// )();
