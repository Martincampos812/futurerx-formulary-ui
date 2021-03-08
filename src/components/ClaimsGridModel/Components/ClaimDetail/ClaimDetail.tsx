/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./ClaimDetail.scss";

//antd
import { Table, Tooltip } from "antd";

//material ui
import { Grid } from "@material-ui/core";

//components
import {
  pricing,
  patientPayMedicare,
  patientPayCommercial,
  transactionInformation,
  benefitInformation,
  pharmacyInformation,
  prescriberInformation,
  messagingToPharmacy,
  additionalInformationBox1,
  additionalInformationBox2,
  additionalInformationBox3Medicare,
  additionalInformationBox3Commercial,
  multiIngredientCompoundFieldsColumn1,
  multiIngredientCompoundFieldsColumn2,
  coordinationOfBenefitsFieldsTable1,
  coordinationOfBenefitsFieldsTable2,
  coordinationOfBenefitsFieldsTable3,
  coordinationOfBenefitsFieldsTable4,
  multiIngredientCompoundFieldsTable2,
  priorAuthorization,
  reimbursementDetails,
  viewDURMessages,
  benefitInformationn,
  partDModelBenefit,
  moopAccumulator,
  pdeStatus,
  columns,
  data,
  columnsCommercial,
  dataCommercial,
} from "../../../../mocks/ClaimGridModelMock";
import { TabInfo } from "../../../../models/tab.model";
import { getClaimModalMiniTabData } from "../../../../mocks/ClaimGridModelMock";
import FrxMiniTab from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  PDEStatusDialogAccepted,
  PDEStatusDialogRejected,
} from "./Components/PDEStatusDialog/PDEStatusDialog";
import FrxGridDrugLableTooltip from "../../../../components/shared/FrxGrid/components/FrxGridToolTip/FrxGridToolTip";

export interface ClaimDetailProps {
  claimData: any;
  detailsMiniTab?: TabInfo[];
  detailsActiveTabIndex?: number;
  handleDetailsMinitabClick?: any;
  claimComparedDetails?: boolean;
}

class ClaimDetail extends React.Component<ClaimDetailProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      miniTab: getClaimModalMiniTabData(),
      activeTabIndex: 0,
      pdeStatusDialog: false,
    };
  }

  componentDidMount(){
    console.log("tooltip data", this.props)
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    const folderTabs = this.state.miniTab.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    this.setState({ folderTabs, activeTabIndex });
  };

  handlePdeStatusDialog = () => {
    this.setState({
      pdeStatusDialog: !this.state.pdeStatusDialog,
    });
  };

  render() {
    const {
      detailsMiniTab,
      detailsActiveTabIndex,
      handleDetailsMinitabClick,
      claimComparedDetails,
    } = this.props;

    const miniTabIndex = claimComparedDetails
      ? detailsActiveTabIndex
      : this.state.activeTabIndex;
    return (
      <div className="claim-detail-root scroll-bar">
        <Grid container item md={12}>
          <div className="claim-detail-root__info-box">
            <FrxMiniTab
              tabList={
                claimComparedDetails ? detailsMiniTab : this.state.miniTab
              }
              activeTabIndex={miniTabIndex}
              onClickTab={
                claimComparedDetails
                  ? handleDetailsMinitabClick
                  : this.onClickTab
              }
            />
            <div className="claim-detail-root__info-box-list">
              {/* pricing and client pricing */}
              {miniTabIndex === 0 ? (
                <>
                  <div className="claim-detail-root__info-box-list__heading">
                    <span>Submitted</span>
                    <span>Plan Allowed</span>
                  </div>
                  {pricing.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      <span>{label.submittedValue}</span>
                      <span>{label.planAllowed}</span>
                    </div>
                  ))}
                </>
              ) : miniTabIndex === 1 ? (
                <>
                  <div className="claim-detail-root__info-box-list__heading">
                    <span>Client 1</span>
                    <span>Client 2</span>
                  </div>
                  {pricing.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      <span>{label.submittedValue}</span>
                      <span>{label.planAllowed}</span>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* pricing and client pricing */}
          {/* Patient Pay */}
          {this.props.claimData.status === "Paid" ||
          this.props.claimData.status === "Reversed" ? (
            <div className="claim-detail-root__info-box">
              <span className="claim-detail-root__info-box__header">
                Patient Pay
              </span>
              <div className="claim-detail-root__info-box-list">
                <>
                  <div className="claim-detail-root__info-box-list__heading">
                    <span>Calculated</span>
                    <span>Override</span>
                  </div>
                  <>
                    {this.props.claimData.type === "Medicare" ? (
                      <>
                        {patientPayMedicare.map((label, i) => (
                          <div key={i + ""} className="fields">
                            <label>{label.label}</label>
                            <span>{label.calculatedValue}</span>
                            <span>{label.override}</span>
                          </div>
                        ))}
                      </>
                    ) : this.props.claimData.type === "Commercial" ? (
                      <>
                        {patientPayCommercial.map((label, i) => (
                          <div key={i + ""} className="fields">
                            <label>{label.label}</label>
                            <span>{label.calculatedValue}</span>
                            <span>{label.override}</span>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {patientPayMedicare.map((label, i) => (
                          <div key={i + ""} className="fields">
                            <label>{label.label}</label>
                            <span>{label.calculatedValue}</span>
                            <span>{label.override}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                </>
              </div>
            </div>
          ) : null}
          {/* Patient Pay */}
          {/* Transaction Information */}
          <div className="claim-detail-root__columns-two">
            <span className="claim-detail-root__info-box__header">
              Transaction Information
            </span>
            <div className="claim-detail-root__info-box-list">
              <>
                {transactionInformation.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                    <span>{label.labelValue}</span>
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* Transaction Information */}
          {this.props.claimData.status === "Rejected" ? (
            <>
              {/* Benefit Information */}
              <div className="claim-detail-root__columns-two">
                <span className="claim-detail-root__info-box__header">
                  Benefit Information
                </span>
                <div className="claim-detail-root__info-box-list">
                  <>
                    {benefitInformation.map((label, i) => (
                      <div key={i + ""} className="fields">
                        <label>{label.label}</label>
                        <span>{label.labelValue}</span>
                      </div>
                    ))}
                  </>
                </div>
              </div>
              {/* Benefit Information */}
            </>
          ) : null}
        </Grid>
        <Grid container item md={12}>
          {/* Benefit Information */}
          {this.props.claimData.status === "Paid" ||
          this.props.claimData.status === "Reversed" ? (
            <div className="claim-detail-root__columns-two">
              <span className="claim-detail-root__info-box__header">
                Benefit Information
              </span>
              <div className="claim-detail-root__info-box-list">
                <>
                  {benefitInformation.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      <span>{label.labelValue}</span>
                    </div>
                  ))}
                </>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* Benefit Information */}
          {/* Pharmacy Information */}
          <div className="claim-detail-root__columns-two">
            <span className="claim-detail-root__info-box__header">
              Pharmacy Information
            </span>
            <div className="claim-detail-root__info-box-list">
              <>
                {pharmacyInformation.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                    <span
                      className={
                        label.label === "Pharmacy NPI" ||
                        label.label === "Pharmacy Name" ||
                        label.label === "Network Name"
                          ? "higlighted-value"
                          : ""
                      }
                    >
                      {label.labelValue}
                    </span>
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* Pharmacy Information */}
          {/* Prescriber Information */}
          <div className="claim-detail-root__columns-two">
            <span className="claim-detail-root__info-box__header">
              Prescriber Information
            </span>
            <div className="claim-detail-root__info-box-list">
              <>
                {prescriberInformation.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                    <span
                      className={
                        label.label === "Prescriber NPI" ||
                        label.label === "Prescriber Name"
                          ? "higlighted-value"
                          : ""
                      }
                    >
                      {label.labelValue}
                    </span>
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* Prescriber Information */}
          {/* Messaging to Pharmacy */}
          {this.props.claimData.status === "Rejected" ? (
            <div className="claim-detail-root__columns-two">
              <span className="claim-detail-root__info-box__header">
                Messaging to Pharmacy
              </span>
              <div className="claim-detail-root__info-box-list">
                <>
                  {messagingToPharmacy.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      <span>{label.labelValue}</span>
                    </div>
                  ))}
                </>
              </div>
            </div>
          ) : null}
          {/* Messaging to Pharmacy */}
        </Grid>
        {/* Additional Information */}
        <Grid
          container
          item
          md={12}
          className="claim-detail-root__additional-info"
        >
          <span className="claim-detail-root__additional-info__header">
            Additional Information
          </span>
          <div className="claim-detail-root__additional-info__box">
            <div>
              {additionalInformationBox1.map((label, i) => (
                <div key={i + ""} className="fields">
                  <label>{label.label}</label>
                  {label.label === "GPI" || label.label === "Drug Label" ? (
                    <Tooltip
                      placement="right"
                      arrowPointAtCenter={true}
                      overlayClassName="claim-detail-root__additional-info__box--tooltip gpi-tooltip"
                      title={
                        <>
                          {label.label === "GPI" ? (
                            <div>
                              <span>
                                41400010100310 -{" "}
                                <b>GPI Name - Atorvastatin Calcium Tab 10mg</b>
                              </span>
                            </div>
                          ) : label.label === "Drug Label" ? (
                            <div>
                            <span>
                            Drug Label - <b>Abilify 10 mg</b>
                            </span>
                            {/* <FrxGridDrugLableTooltip data={this.props.claimData} /> */}
                          </div>
                          ): null}
                        </>
                      }
                    >
                      <span
                        className={
                          label.label === "GPI" || label.label === "Drug Label" ? "higlighted-value" : ""
                        }
                      >
                        {label.labelValue}
                      </span>
                    </Tooltip>
                  ) : (
                    <span
                      className={
                        label.label === "Drug Label" ||
                        label.label === "NDC" ||
                        label.label === "GPI"
                          ? "higlighted-value"
                          : ""
                      }
                    >
                      {label.labelValue}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div>
              {additionalInformationBox2.map((label, i) => (
                <div key={i + ""} className="fields">
                  <label>{label.label}</label>
                  {label.label === "SCC" ? (
                    <Tooltip
                      placement="top"
                      arrowPointAtCenter={true}
                      overlayClassName="claim-detail-root__additional-info__box--tooltip scc-tooltip"
                      title={
                        <>
                          {label.label === "SCC" ? (
                            <>
                              <span>
                                20 - <b>340B</b>
                              </span>
                              <span>
                                99 - <b>Other</b>
                              </span>
                              <span>
                                02 - <b>Other Override</b>
                              </span>
                            </>
                          ) : null}
                        </>
                      }
                    >
                      <span
                        className={
                          label.label === "SCC" ? "higlighted-value" : ""
                        }
                      >
                        {label.labelValue}
                      </span>
                    </Tooltip>
                  ) : (
                    <span
                      className={
                        label.label === "SCC" ? "higlighted-value" : ""
                      }
                    >
                      {label.labelValue}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div>
              {this.props.claimData.type === "Medicare" ? (
                <>
                  {additionalInformationBox3Medicare.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      {label.label === "MME Per Day" ||
                      label.label === "APAP Per Day" ? (
                        <Tooltip
                          placement="left"
                          arrowPointAtCenter={true}
                          overlayClassName="claim-detail-root__additional-info__box--tooltip scc-tooltip"
                          title={
                            <>
                              {label.label === "MME Per Day" ? (
                                <>
                                  <span>
                                    Cumulative - <b>0.034</b>
                                  </span>
                                </>
                              ) : label.label === "APAP Per Day" ? (
                                <>
                                  <span>
                                    Cumulative - <b>0.085</b>
                                  </span>
                                </>
                              ) : null}
                            </>
                          }
                        >
                          <span
                            className={
                              label.label === "MME Per Day" ||
                              label.label === "APAP Per Day"
                                ? "higlighted-value"
                                : ""
                            }
                          >
                            {label.labelValue}
                          </span>
                        </Tooltip>
                      ) : (
                        <span
                          className={
                            label.label === "MME Per Day" ||
                            label.label === "APAP Per Day"
                              ? "higlighted-value"
                              : ""
                          }
                        >
                          {label.labelValue}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              ) : this.props.claimData.type === "Commercial" ? (
                <>
                  {additionalInformationBox3Commercial.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      {label.label === "MME Per Day" ||
                      label.label === "APAP Per Day" ? (
                        <Tooltip
                          placement="left"
                          arrowPointAtCenter={true}
                          overlayClassName="claim-detail-root__additional-info__box--tooltip scc-tooltip"
                          title={
                            <>
                              {label.label === "MME Per Day" ? (
                                <>
                                  <span>
                                    Cumulative - <b>0.034</b>
                                  </span>
                                </>
                              ) : label.label === "APAP Per Day" ? (
                                <>
                                  <span>
                                    Cumulative - <b>0.085</b>
                                  </span>
                                </>
                              ) : null}
                            </>
                          }
                        >
                          <span
                            className={
                              label.label === "MME Per Day" ||
                              label.label === "APAP Per Day"
                                ? "higlighted-value"
                                : ""
                            }
                          >
                            {label.labelValue}
                          </span>
                        </Tooltip>
                      ) : (
                        <span
                          className={
                            label.label === "MME Per Day" ||
                            label.label === "APAP Per Day"
                              ? "higlighted-value"
                              : ""
                          }
                        >
                          {label.labelValue}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {additionalInformationBox3Medicare.map((label, i) => (
                    <div key={i + ""} className="fields">
                      <label>{label.label}</label>
                      {label.label === "MME Per Day" ||
                      label.label === "APAP Per Day" ? (
                        <Tooltip
                          placement="left"
                          arrowPointAtCenter={true}
                          overlayClassName="claim-detail-root__additional-info__box--tooltip scc-tooltip"
                          title={
                            <>
                              {label.label === "MME Per Day" ? (
                                <>
                                  <span>
                                    Cumulative - <b>0.034</b>
                                  </span>
                                </>
                              ) : label.label === "APAP Per Day" ? (
                                <>
                                  <span>
                                    Cumulative - <b>0.085</b>
                                  </span>
                                </>
                              ) : null}
                            </>
                          }
                        >
                          <span
                            className={
                              label.label === "MME Per Day" ||
                              label.label === "APAP Per Day"
                                ? "higlighted-value"
                                : ""
                            }
                          >
                            {label.labelValue}
                          </span>
                        </Tooltip>
                      ) : (
                        <span
                          className={
                            label.label === "MME Per Day" ||
                            label.label === "APAP Per Day"
                              ? "higlighted-value"
                              : ""
                          }
                        >
                          {label.labelValue}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </Grid>
        {/* Additional Information */}
        {/* Coordination of Benefits Fields */}
        <Grid
          container
          item
          md={12}
          className="claim-detail-root__additional-info"
        >
          <span className="claim-detail-root__additional-info__header">
            Coordination of Benefits Fields
          </span>
          <table className="claim-detail-root__additional-info__table">
            {coordinationOfBenefitsFieldsTable1.map((header, i) => (
              <div key={i + ""} className="fields">
                <header>
                  <p
                    style={{
                      lineHeight:
                        header.label === "Other Payer IDr" ||
                        header.label === "Other Payer Date"
                          ? "50px"
                          : "24px",
                    }}
                  >
                    {header.label}
                    {/* <span>*</span> */}
                  </p>
                  {/* {header.label === "Other Payer Date" ? (
                  <span>Limit 9*</span>
                ): null} */}
                </header>
                <span>{header.labelValue}</span>
              </div>
            ))}
          </table>
        </Grid>
        <Grid
          container
          item
          md={12}
          className="claim-detail-root__benefits-fields"
        >
          <table className="claim-detail-root__benefits-fields__table2">
            {coordinationOfBenefitsFieldsTable4.map((header, i) => (
              <div key={i + ""} className="fields">
                <header>
                  <p>
                    {header.label}
                    {/* <span>*</span> */}
                  </p>
                  {/* {header.label === "Benefit Stage Amount" ? (
                  <span>Limit 4*</span>
                ): null} */}
                </header>
                <span>{header.labelValue}</span>
              </div>
            ))}
          </table>
          <table className="claim-detail-root__benefits-fields__table">
            {coordinationOfBenefitsFieldsTable2.map((header, i) => (
              <div key={i + ""} className="fields">
                <header>
                  <p>
                    {header.label}
                    {/* <span>*</span> */}
                  </p>
                  {/* {header.label === "Other Payer Reject Code" ? (
                  <span>Limit 5*</span>
                ): null} */}
                </header>
                <span>{header.labelValue}</span>
              </div>
            ))}
          </table>
        </Grid>
        <Grid
          container
          item
          md={12}
          className="claim-detail-root__benefits-fields"
        >
          <table className="claim-detail-root__benefits-fields__table2">
            {coordinationOfBenefitsFieldsTable3.map((header, i) => (
              <div key={i + ""} className="fields">
                <header>
                  <p>
                    {header.label}
                    {/* <span>*</span> */}
                  </p>
                  {/* {header.label === "Benefit Stage Amount" ? (
                  <span>Limit 4*</span>
                ): null} */}
                </header>
                <span>{header.labelValue}</span>
              </div>
            ))}
          </table>
        </Grid>
        {/* Coordination of Benefits Fields */}
        {/* Multi-Ingredient Compound Fields */}
        <Grid
          container
          item
          md={12}
          className="claim-detail-root__additional-info"
        >
          <span className="claim-detail-root__additional-info__header">
            Multi-Ingredient Compound Fields
          </span>
          <div className="claim-detail-root__additional-info__box ingredient-fields">
            <div>
              {multiIngredientCompoundFieldsColumn1.map((label, i) => (
                <div key={i + ""} className="fields">
                  <label>{label.label}</label>
                  <span>{label.labelValue}</span>
                </div>
              ))}
            </div>
            <div>
              {multiIngredientCompoundFieldsColumn2.map((label, i) => (
                <div key={i + ""} className="fields">
                  <label>{label.label}</label>
                  <span>{label.labelValue}</span>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid
          container
          item
          md={12}
          className="claim-detail-root__additional-info"
        >
          <table className="claim-detail-root__additional-info__table integrted-table">
            {multiIngredientCompoundFieldsTable2.map((header, i) => (
              <div key={i + ""} className="fields">
                <header>
                  <p>
                    {header.label}
                    {/* <span>*</span> */}
                  </p>
                  {/* {header.label === "Basis of Cost Determination" ? (
                  <span>Limit 25*</span>
                ): null} */}
                </header>
                <span>{header.labelValue}</span>
              </div>
            ))}
          </table>
        </Grid>
        {/* Multi-Ingredient Compound Fields */}
        <Grid container item md={12}>
          {/* Prior Authorization */}
          <div className="claim-detail-root__columns-two">
            <span className="claim-detail-root__info-box__header">
              Prior Authorization
            </span>
            <div className="claim-detail-root__info-box-list">
              <>
                {priorAuthorization.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                    <span>{label.labelValue}</span>
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* Prior Authorization */}
          {/* Reimbursement Details */}
          {this.props.claimData.type === "Medicare" ||
          this.props.claimData.claimId === "123344567787" ? (
            <>
              {this.props.claimData.status === "Paid" ||
              this.props.claimData.status === "Reversed" ? (
                <div className="claim-detail-root__columns-two">
                  <span className="claim-detail-root__info-box__header">
                    Reimbursement Details
                  </span>
                  <div className="claim-detail-root__info-box-list">
                    <>
                      {reimbursementDetails.map((label, i) => (
                        <div key={i + ""} className="fields">
                          <label>{label.label}</label>
                          <span>{label.labelValue}</span>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {/* Reimbursement Details */}
          {/* View DUR Messages */}
          <div
            className={
              this.props.claimData.status === "Rejected"
                ? "claim-detail-root__rejected-dur"
                : "claim-detail-root__columns-two" &&
                  this.props.claimData.type === "Commercial"
                ? "claim-detail-root__rejected-dur"
                : "claim-detail-root__columns-two"
            }
          >
            <span className="claim-detail-root__info-box__header">
              View DUR Messages
            </span>
            <div className="claim-detail-root__info-box-list">
              <>
                {viewDURMessages.map((label, i) => (
                  <div key={i + ""} className="fields">
                    <label>{label.label}</label>
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* View DUR Messages */}
        </Grid>
        <>
          {this.props.claimData.type === "Medicare" ||
          this.props.claimData.claimId === "123344567787" ? (
            <>
              {this.props.claimData.status === "Paid" ||
              this.props.claimData.status === "Reversed" ? (
                <Grid container item md={12}>
                  {/* Benefit Information */}
                  <div className="claim-detail-root__columns-two">
                    <span className="claim-detail-root__info-box__header">
                      Benefit Information
                    </span>
                    <div className="claim-detail-root__info-box-list">
                      <>
                        {benefitInformationn.map((label, i) => (
                          <div key={i + ""} className="fields">
                            <label>{label.label}</label>
                            <span>{label.labelValue}</span>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                  {/* Benefit Information */}
                  {/* Part D Model Benefit	 */}
                  <div className="claim-detail-root__columns-two">
                    <span className="claim-detail-root__info-box__header">
                      Part D Model Benefit
                    </span>
                    <div className="claim-detail-root__info-box-list">
                      <>
                        {partDModelBenefit.map((label, i) => (
                          <div key={i + ""} className="fields">
                            <label>{label.label}</label>
                            <span>{label.labelValue}</span>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                  {/* Part D Model Benefit	 */}
                  <div className="claim-detail-root__moop-pde">
                    {/* MOOP Accumulator */}
                    <div className="claim-detail-root__columns-two">
                      <span className="claim-detail-root__info-box__header">
                        MOOP Accumulator
                      </span>
                      <div className="claim-detail-root__info-box-list">
                        <>
                          {moopAccumulator.map((label, i) => (
                            <div key={i + ""} className="fields">
                              <label>{label.label}</label>
                              <span>{label.labelValue}</span>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                    {/* MOOP Accumulator */}
                    {/* PDE Status */}
                    <div className="claim-detail-root__columns-two">
                      <span className="claim-detail-root__info-box__header pde-status__header">
                        <span>PDE Status</span>
                        <span>Submit Date</span>
                        <span>Response Date</span>
                        <span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.625 5.80151C11.6309 9.00401 9.01922 11.6227 5.81672 11.625C4.43355 11.626 3.16305 11.1438 2.16464 10.338C1.90502 10.1285 1.88562 9.73938 2.12154 9.50346L2.38561 9.23939C2.58738 9.03762 2.90951 9.01554 3.13305 9.19289C3.86864 9.7766 4.79955 10.125 5.8125 10.125C8.19621 10.125 10.125 8.19584 10.125 5.8125C10.125 3.42879 8.19584 1.5 5.8125 1.5C4.66842 1.5 3.62932 1.94459 2.85778 2.67028L4.04733 3.85983C4.28358 4.09608 4.11626 4.5 3.78218 4.5H0.375C0.167883 4.5 0 4.33212 0 4.125V0.71782C0 0.383742 0.403922 0.216422 0.640172 0.452648L1.79733 1.6098C2.84084 0.612562 4.25512 0 5.8125 0C9.01898 0 11.6191 2.59641 11.625 5.80151ZM7.38487 7.64801L7.6151 7.35199C7.80584 7.10677 7.76166 6.75335 7.51643 6.56264L6.5625 5.82068V3.375C6.5625 3.06434 6.31066 2.8125 6 2.8125H5.625C5.31434 2.8125 5.0625 3.06434 5.0625 3.375V6.55432L6.59552 7.74668C6.84075 7.93739 7.19414 7.89323 7.38487 7.64801Z"
                              fill="#707683"
                            />
                          </svg>
                        </span>
                      </span>
                      <div className="claim-detail-root__info-box-list pde-status__field">
                        <>
                          {pdeStatus.map((label, i) => (
                            <div key={i + ""} className="fields">
                              {this.props.claimData.claimId ===
                              "MED12334456787" ? (
                                <>
                                  <span
                                    onClick={this.handlePdeStatusDialog}
                                    className="higlighted-value"
                                  >
                                    Accepted
                                  </span>
                                  {this.state.pdeStatusDialog ? (
                                    <>
                                      <PDEStatusDialogAccepted
                                        pdeStatusDialog={
                                          this.state.pdeStatusDialog
                                        }
                                        handlePdeStatusDialog={
                                          this.handlePdeStatusDialog
                                        }
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  <span
                                    onClick={this.handlePdeStatusDialog}
                                    className="rejected-value"
                                  >
                                    Rejected
                                  </span>
                                  {this.state.pdeStatusDialog ? (
                                    <>
                                      <PDEStatusDialogRejected
                                        pdeStatusDialog={
                                          this.state.pdeStatusDialog
                                        }
                                        handlePdeStatusDialog={
                                          this.handlePdeStatusDialog
                                        }
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                              <span>{label.submiteDate}</span>
                              <span>{label.responseDate}</span>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                    {/* PDE Status */}
                  </div>
                </Grid>
              ) : (
                ""
              )}
            </>
          ) : this.props.claimData.type === "Commercial" ||
            this.props.claimData.status === "Reversed" ? (
            <></>
          ) : (
            ""
          )}
          {this.props.claimData.status === "Paid" ||
          this.props.claimData.status === "Reversed" ? (
            <>
              {this.props.claimData.type === "Medicare" ? (
                <Grid
                  container
                  item
                  md={12}
                  className="claim-detail-root__detail-table"
                >
                  <Table
                    className="claim-detail-root__detail-table-root"
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1800 }}
                  />
                </Grid>
              ) : this.props.claimData.type === "Commercial" ? (
                <Grid
                  container
                  item
                  md={12}
                  className="claim-detail-root__detail-table"
                >
                  <Table
                    className="claim-detail-root__detail-table-root-commercial"
                    pagination={false}
                    columns={columnsCommercial}
                    dataSource={dataCommercial}
                  />
                </Grid>
              ) : (
                <Grid
                  container
                  item
                  md={12}
                  className="claim-detail-root__detail-table"
                >
                  <Table
                    className="claim-detail-root__detail-table-root"
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1800 }}
                  />
                </Grid>
              )}
            </>
          ) : (
            ""
          )}
        </>
      </div>
    );
  }
}

export default ClaimDetail;
