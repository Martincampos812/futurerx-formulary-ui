import React from "react";
import { Spin, message } from 'antd';
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import DialogList from "../shared/FrxDialogList/FrxDialogList";
import Divider from '@material-ui/core/Divider';
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomSelect from "../shared/Frx-components/dropdown/DropDown";
import CustomDatepicker from "../shared/Frx-components/date-picker/CustomDatePicker";
import { DialogListItemModel } from "../../models/dialog-list-item.model";
import { TabModel } from "../../models/tab.model";
import { FormModel } from "../../models/form-model";
import MemberNotification from "../member/MemberNotification";
import ClinicalDiagnosisHistory from "../clinical-diagnosis/ClinicalDiagnosisHistory";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import Button from '@material-ui/core/Button';
import MemberDetails from "../user-details/member-details/MemberDetails";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../models/tab.model";
import MemberAddress from "../user-details/member-address/MemberAddress";
import PcpSummary from "../pcp-info/pcp-summary";
import PcpContactInfo from "../pcp-info/pcp-contactinfo";
import PcpSpecialty from "../pcp-info/pcp-specialty";
import PcpStateLicensure from "../pcp-info/pcp-statelicensure";
import Demographics from "../pharmacy-info/demographics";
import PharmacyContactInfo from "../pharmacy-info/contact-info";
import PharmacySpecialty from "../pharmacy-info/specialty";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import { eligibilityGridColumns, eligibilityGridCOBColumns } from "../../utils/grid/columns";
import { getEligibilityCOBGridData } from '../../mocks/grid/Eligibilitycob-mock';
import EligibilityPopup from "../eligibility-info/eligibility-popup";
import EligibilityInsurancePopup from "../eligibility-info/EligibilityInsurancePopup";

import Messages from '../../constants/Messages';
import { API } from '../../api/httptemp-helper';
import { Input, InputAdornment} from "@material-ui/core";
import { Box, Tooltip,Checkbox } from "@material-ui/core";
import FrxGrid from '../shared/FrxGrid/FrxGrid';
import FrxLoader from '../shared/FrxLoader/FrxLoader';


import TextField from '@material-ui/core/TextField';

import "./NewTestClaim.scss";
import { connect } from "react-redux";

import Container from '@material-ui/core/Container';

interface NewTestClaimProps {
  isOpen: boolean;
  onClose: () => void;
  panelName: string;
  title?: string;
  classes: any;
}

const styles = ({ palette, spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: spacing(2),
    textAlign: 'center',
    color: palette.text.secondary,
  }
});



class NewTestClaim extends React.Component<NewTestClaimProps> {
  state = {
    isTestClaimDialogOpen: this.props.isOpen,
    checked:true,
    startDate: undefined,
    endDate: undefined,
    submission: {
      BIN: '',
      serviceProviderIdQualifier: '',
      levelOfService: '',
      PCN: '',
      placeOfService: '',
      pharmacyServiceType: '',
      cust: '',
      patientResidence: '',
      patientFirstName: '',
      patientLastName: '',
      dob: '',
      gender: '',
      rx: '',
      serviceProviderId: '',
      otherCoverageCode: '',
      client: '',
      daysSupply: '',
      specialPackagingIndicator: '',
      account: '',
      qtyDispensed: '',
      unitOfMeasure: '',
      MemberId: '',
      productServiceId: '',
      delayReasonCode: '',
      personCode: '',
      productserviceIdQualifier: '',
      relationshipCode: '',
      compoundCode: '',
      patientZipCode: '',
      daw: '',
      qtyIntendedToDispensed: '',
      daySupplyIntendedToDispensed: '',
      submissionClarificationCodeCount: '',
      SSC1: '',
      SSC2: '',
      SSC3: '',
      dateOfService: '',
      dateRxWritten: '',
      fillNumber: '',
      qtyPrescribed: '',
      refillAuthorized: '',
      rxOriginCode: '',
    },
    cost: {
      ingredientCost: '',
      dispenseFee: '',
      incentiveAmt: '',
      flatSalesTax: '',
      percentageSalesTaxAmt: '',
      percentageSalesTaxRate: '',
      percentageSalesTaxBasis: '',
      UCAmt: '',
      grossDueAmt: '',
      basisOfCostDetermination: ''
    },
    authrization: {
      priorAuthrizationTypeCode: '',
      priorAuthrizationNumber: '',
      prescriberId: '',
      prescriberIdQualifier: ''
    },
    serviceforms: [{
      index: '',
      searchTxt: '',
      qty: '',
      days: '',
      generic: false
    }],
    Diagnosisforms: [{
      index: '',
      searchTxt: '',
      qty: '',
      days: '',
      generic: false
    }],
  };

  handleNewTestClaimEditDialogAction = (action: string) => {
    this.setState({ isTestClaimDialogOpen: false });
    this.props.onClose();
  };

  handleNewTestClaimEditDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isTestClaimDialogOpen: false });
    this.props.onClose();
  };


  handleAddForm = () => {
    if (this.state.serviceforms.length <= 9) {
      var temp: any = this.state.serviceforms
      temp.push({
        index: '',
        searchTxt: '',
        qty: '',
        days: '',
        generic: false
      })
      this.setState({ forms: temp })
    }
  }

  handleDiagnosisForm = () => {
    if (this.state.Diagnosisforms.length <= 9) {
      var temp: any = this.state.Diagnosisforms
      temp.push({
        index: '',
        searchTxt: '',
        qty: '',
        days: '',
        generic: false
      })
      this.setState({ forms: temp })
    }
  }

  handleChange = (event) => {
    this.setState(event.target.checked);
  };

  handleStartDate = date => {
    this.setState({ startDate: date });
  };

  addMoreServiceField = (index: any) => {
    console.log(index)
    return (
      <div className="claims-search claims-history-search">
        <Grid container>
          <div className="input">
            <Input
              className="claims-search__input"
              placeholder="Search"
              type="text"
              name="claimId"
              value=''
              startAdornment={
                <svg
                  className="test-claim-search__icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                    fill="#999999"
                  />
                </svg>
              }
            />
          </div>
        </Grid>
        <Grid container>
          <div className="input">
            <Input
              className="claims-search__input"
              placeholder="Search"
              type="text"
              name="claimId"
              value=''
              startAdornment={
                <svg
                  className="test-claim-search__icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                    fill="#999999"
                  />
                </svg>
              }
            />
          </div>
        </Grid>
        <Grid container>
          <div className="input">
            <Input
              className="claims-search__input"
              placeholder="Search"
              type="text"
              name="claimId"
              value=''
              startAdornment={
                <svg
                  className="test-claim-search__icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                    fill="#999999"
                  />
                </svg>
              }
            />
          </div>
        </Grid>
        <Grid container>
          <Grid item className="delete">
            <Box component="span" display="block">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
              </svg>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }

  addMoreDiagnosisField = (index: any) => {
    console.log(index)
    return (
      <div className="claims-search claims-history-search">
        <Grid container>
          <div className="input">
            <Input
              className="claims-search__input"
              placeholder="02"
              type="text"
              name="claimId"
              value=''
            />
          </div>
        </Grid>
        <Grid container>
          <div className="input">
            <Input
              className="claims-search__input"
              placeholder="Search"
              type="text"
              name="claimId"
              value=''
              startAdornment={
                <svg
                  className="test-claim-search__icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                    fill="#999999"
                  />
                </svg>
              }
            />
          </div>
        </Grid>
        <Grid container>
          <Grid item className="delete">
            <Box component="span" display="block">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
              </svg>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    const { isTestClaimDialogOpen, Diagnosisforms, serviceforms } = this.state;
    return (
      <React.Fragment>
        <DialogPopup
          positiveActionText="Edit"
          negativeActionText="Cancel"
          title="Test Claim Id:124362725373 "
          handleClose={this.handleNewTestClaimEditDialogClose}
          handleAction={this.handleNewTestClaimEditDialogAction}
          open={isTestClaimDialogOpen}
          showActions={false}
          className="new-test-claim-popup-root"
          componentTitle = {true}
        >

          <Container className="new-test-claim-components-container scroll-bar">
            <Grid container className="topsection">
              <Grid item xs={12}>
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="claims-search claims-history-search topsection">
                      <Grid container>
                        <Box display="flex" alignItems="center">
                          <span className="frx-info-card-list-item-root__column mr-20">Test Claim Submission Type</span>
                          <div className="input">
                            <CustomSelect
                              placeholder="Select Sequence"
                              options={["01 - B1", "02 - B3", "03 - N1"]}
                            />
                          </div>
                        </Box>
                        <span><button className="btn btnSave">Run Test Claim</button></span>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search topsection">
                      <Grid container>
                        <Box display="flex" alignItems="center"></Box>
                        <span className="frx-info-card-list-item-root__column mr-8">Save Test claim to test DUR History
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            className="frx-info-card-list-item-root__column--checkbox"
                          />
                        </span>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container className="submission">
              <Grid item xs={12}>
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="member-notification-header">
                      <label className="new-test-claim-root__header-text">Submission Fields</label>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">BIN#</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Service Provider ID</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Level Of Service</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">PCN</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Place Of Service</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Pharmacy Service Type</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Cust</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Patient Residence</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Other Coverage Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Client</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Days Supply</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Special Packaging Indicator</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Amount</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Quantity Dispensed</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Unit Of Measure</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Member ID</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input higlighted-value"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value='8133381165'
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Product Service ID</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Delay Reason Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Person Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Product Service ID Qualifier</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Other Coverage Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Relationship Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Compound Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Special Packaging Indicator</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Patient Zip Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value='33601-1234'
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">DAW</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Quantity Intended To Be Dispensed</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Patient First Name</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value='Machenzie'
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Date Of Service</span>
                        </div>
                        <div className="input">
                        <CustomDatepicker
                          className="claims-search__input claims-search__input--date"
                          onChange={this.handleStartDate}
                          value={this.state.startDate}
                          placeholder="Start date"
                        />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Days Supply Intended To Be Dispensed</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Patient Last Name</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input higlighted-value"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value='Johnson-Robertson lll'
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Date Rx Written</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Submission Clarification Code Count</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Date Of Birth</span>
                        </div>
                        <div className="input">
                        <CustomDatepicker
                          className="claims-search__input claims-search__input--date"
                          onChange={this.handleStartDate}
                          value={this.state.startDate}
                          placeholder="Start date"
                        />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Fill Number</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">SCC1</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Patient Gender</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value='Female'
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Quantity Prescribed</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">SCC2</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Rx</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Refills Authorized</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">SCC3</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Service Provider ID</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Rx Origin Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Rx Origin Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container className="cost">
              <Grid item xs={12}>
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="member-notification-header">
                      <label className="new-test-claim-root__header-text">Cost Fields</label>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Ingredient Cost</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Percentage Sales Tax Amount</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Gross Amount Due</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Dispense Fee</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Percentage Sales Tax Rate</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Basic Of Cost Determination</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Incentive Amount</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Percentage Sales Tax Basis</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Flat Sales Tax</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container className="authrization">
              <Grid item xs={6}>
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="member-notification-header">
                      <label className="new-test-claim-root__header-text">Authorization Fields</label>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Prior Authorization Type Code</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Prior Authorization Number</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} className="saparator">
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="member-notification-header">
                      <label className="new-test-claim-root__header-text">Prescriber Fields</label>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Prescriber ID</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="label">
                          <span className="frx-info-card-list-item-root__column">Prescriber ID Qualifier</span>
                        </div>
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder=""
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container className="diagnosis">
              <Grid item xs={6}>
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="member-notification-header">
                      <label className="new-test-claim-root__header-text">Diagnosis Fields</label>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          Diagnosis code count 3
                          </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          Qualifier
                          </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          Diagnosis Code
                          </div>
                      </Grid>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="02"
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item className="delete">
                          <Box component="span" display="block">
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                            </svg>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="02"
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item className="delete">
                          <Box component="span" display="block">
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                            </svg>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="02"
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item className="delete">
                          <Box component="span" display="block">
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                            </svg>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    {Diagnosisforms.map((item: any, index: number) => this.addMoreDiagnosisField(index))}
                    <div className="claims-search claims-history-search">
                      <Grid container>
                        <div className="input">
                          {Diagnosisforms.length < 3 && <><Button className="addForm" onClick={this.handleDiagnosisForm}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                              <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="add-diagnosis">Add Diagnosis <span className="limit">* limit 9</span></span>
                          </Button></>}
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} className="saparator">
                <div className="bg-white">
                  <div className="member-notification-root">
                    <div className="member-notification-header">
                      <label className="new-test-claim-root__header-text">DUR/PPS Fields</label>
                    </div>

                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          DUR/PPS code counter 5
                          </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          Reason of service code
                          </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          Professional service code
                          </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          Result of service code
                          </div>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item className="delete">
                          <Box component="span" display="block">
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                            </svg>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item className="delete">
                          <Box component="span" display="block">
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                            </svg>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          <Input
                            className="claims-search__input"
                            placeholder="Search"
                            type="text"
                            name="claimId"
                            value=''
                            startAdornment={
                              <svg
                                className="test-claim-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                  fill="#999999"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item className="delete">
                          <Box component="span" display="block">
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                            </svg>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    {serviceforms.map((item: any, index: number) => this.addMoreServiceField(index))}
                    <div className="claims-search claims-history-search">
                      <Grid container justify="space-between" alignItems="center">
                        <div className="input">
                          {serviceforms.length < 3 && <><Button className="addForm" onClick={this.handleAddForm}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                              <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="add-service">Add Service Code <span className="limit">* limit 9</span></span>
                          </Button></>}
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </DialogPopup>
      </React.Fragment>
    );
  }
}

// Connect component with store.

//export default NewTestClaim;
export default withStyles(styles, { withTheme: true })(NewTestClaim);
