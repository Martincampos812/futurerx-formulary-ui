import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import DurppsField from './durppsField';
import MultiIngredientField from './multiIngredientField';
import PayerAmountField from './payerAmountField';
import PayerRejectField from './payerRejectField';
import "./NewTestClaim3.scss";


interface CoordinationBenefit {
  multiIngredientCount?:any
  payerAmountFieldsCount?: any;
  payerRejectFieldCount?:any
  benefitStageCount?:any
}

export default class CoordinationBenefits extends React.Component<CoordinationBenefit> {

  state = {
    multiIngredientCount:3,
    payerAmountFieldsCount: 3,
    payerRejectFieldCount:3,
    benefitStageCount:3
  };



  addMultiIngredientFieldHandler = () => {
    let totalIngredient = this.state.multiIngredientCount;
    totalIngredient += 1;
    this.setState({multiIngredientCount: totalIngredient});
  }
  deleteMultiIngredientFieldHandler = () => {
    let totalIngredient = this.state.multiIngredientCount;
    totalIngredient -= 1;
    this.setState({multiIngredientCount: totalIngredient});
  }

  addPayerAmountFieldHandler = () => {
    let totalPayerAmt = this.state.payerAmountFieldsCount;
    totalPayerAmt += 1;
    this.setState({payerAmountFieldsCount: totalPayerAmt});
  }
  deletePayerAmountFieldHandler = () => {
    let totalPayerAmt = this.state.payerAmountFieldsCount;
    totalPayerAmt -= 1;
    this.setState({payerAmountFieldsCount: totalPayerAmt});
  }

  addPayerRejectFieldHandler = () => {
    let totalPayerReject = this.state.payerRejectFieldCount;
    totalPayerReject += 1;
    this.setState({payerRejectFieldCount: totalPayerReject});
  }
  deletePayerRejectFieldHandler = () => {
    let totalPayerReject = this.state.payerRejectFieldCount;
    totalPayerReject -= 1;
    this.setState({payerRejectFieldCount: totalPayerReject});
  }

  addBenefitStageFieldHandler = () => {
    let totalBenefitStg = this.state.benefitStageCount;
    totalBenefitStg += 1;
    this.setState({benefitStageCount: totalBenefitStg});
  }
  deleteBenefitStageFieldHandler = () => {
    let totalBenefitStg = this.state.benefitStageCount;
    totalBenefitStg -= 1;
    this.setState({benefitStageCount: totalBenefitStg});
  }

  render() {
    return (
      <React.Fragment>
        <Grid container>
            <Grid item xs={12} className="multi-ingredient-compound">
            <div className="ingredient-compound-container">
                <div className="ingredient-compound-header">
                <span>Coordination of Benefits Field</span>
                </div>
                <div className="ingredient-compound-field custom-grid-wrapper">
                <Grid container>
                    <Grid item xs={12} className="mb-15">
                    <Grid container className="mb-5">
                        <Grid xs={12}>
                        <Grid container className="label-wrapper" spacing={1}>
                            <Grid item className="label">
                            <span>COB/Other Payments Countspan <span className="astrict">&#42;</span></span>
                            </Grid>
                            <Grid item className="label">
                            <span>Other Payer Coverage Typespan <span className="astrict">&#42;</span></span>
                            </Grid>
                            <Grid item className="label">
                            <span>Other Payer ID Qualifierspan <span className="astrict">&#42;</span></span>
                            </Grid>
                            <Grid item className="label">
                            <span>Other Payer IDrspan <span className="astrict">&#42;</span></span>
                            </Grid>
                            <Grid item className="label">
                            <span>Other Payer Datespan <span className="astrict">&#42;</span></span>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    {Array.from(Array(this.state.multiIngredientCount), (e,i) =>  
                        <MultiIngredientField deleteField={this.deleteMultiIngredientFieldHandler}/>
                    )}
                    { this.state.multiIngredientCount < 9 ? (
                        <Grid item xs={12}>
                        <Button className="addForm" onClick={this.addMultiIngredientFieldHandler}>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                                <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                                </svg>
                                <span className="add-diagnosis">Add COB Fields <span className="limit">* limit 9</span></span>
                            </Button>
                        </Grid>) : null }
                </Grid>
                </div>
            </div>
            </Grid>
        </Grid>
        <Grid container className="diagnosis-durpps">
          <Grid item xs={7}>
            <div className="bg-white">
              <div className="member-notification-root">
                <div className="claims-search claims-history-search custom-grid-wrapper">
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Other Payer Amount Paid Count<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                    Other Payer Amount Paid Qualifier<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                    Other Payer Amount Paid<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                </div>
                 {Array.from(Array(this.state.payerAmountFieldsCount), (e,i) => 
                    <PayerAmountField deleteField={this.deletePayerAmountFieldHandler}/>
                  )}
                  { this.state.payerAmountFieldsCount < 9 ? (
                <div className="claims-search claims-history-search">
                      <Grid container>
                        <div className="input">
                         <Button className="addForm" onClick={this.addPayerAmountFieldHandler}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                              <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="add-diagnosis">Add Payer Amount <span className="limit">* limit 9</span></span>
                          </Button>
                        </div>
                      </Grid>
                      </div>) : null }
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container className="diagnosis-durpps">
          <Grid item xs={5}>
            <div className="bg-white">
              <div className="member-notification-root">
                <div className="claims-search claims-history-search custom-grid-wrapper w-50p">
                  <div className="row-wrapper">
                    <Grid container spacing={1}>
                      <Grid item>
                        <div className="input">
                          Other Payer Reject Count<span className="astrict">&#42;</span>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className="input">
                        Other Payer Reject Code<span className="astrict">&#42;</span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                {Array.from(Array(this.state.payerRejectFieldCount), (e,i) => 
                    <PayerRejectField deleteField={this.deletePayerRejectFieldHandler}/>
                  )}
                { this.state.payerRejectFieldCount < 9 ? (
                <div className="claims-search claims-history-search">
                      <Grid container>
                        <div className="input">
                         <Button className="addForm" onClick={this.addPayerRejectFieldHandler}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                              <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="add-diagnosis">Add New <span className="limit">* limit 9</span></span>
                          </Button>
                        </div>
                      </Grid>
                </div>) : null }
              </div>
            </div>
          </Grid>
          <Grid item xs={7} className="saparator">
            <div className="bg-white">
              <div className="member-notification-root">
                <div className="claims-search claims-history-search custom-grid-wrapper w-33p">
                  <div className="row-wrapper">
                    <Grid container spacing={1}>
                      <Grid item>
                        <div className="input">
                          Benefit Stage Count<span className="astrict">&#42;</span>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className="input">
                        Benefit Stage Qualifier<span className="astrict">&#42;</span>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className="input">
                        Benefit Stage Amount<span className="astrict">&#42;</span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                {/* <div className="claims-search claims-history-search">
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
                </div> */}
                {Array.from(Array(this.state.benefitStageCount), (e,i) => 
                    <DurppsField deleteField={this.deleteBenefitStageFieldHandler}/>
                  )}
                   { this.state.benefitStageCount < 9 ? (
                <div className="claims-search claims-history-search">
                      <Grid container>
                        <div className="input">
                         <Button className="addForm" onClick={this.addBenefitStageFieldHandler}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                              <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="add-diagnosis">Add New <span className="limit">* limit 9</span></span>
                          </Button>
                        </div>
                      </Grid>
                  </div>) : null }
              </div>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
