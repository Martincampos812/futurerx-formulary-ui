import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import "./CompareView.scss";
import vector from "../../../../../../assets/img/Vector.png";
import "../../../../../shared/FrxGrid/FrxGridContainer.scss";
import "./CompareView.scss";
import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";
import { connect } from "react-redux";

enum PopUpTypes {
  TYPE1 = "SELECTFORMULARY",
  TYPE2 = "VIEWFULLFORMULARY",
}
interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
  baseFormulary: any;
  refFormulary: any;
}

interface State {
  selectFormulary: boolean;
  show: boolean;
}

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};

class CompareFormularies extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    show: false,
    PopUpType: PopUpTypes.TYPE2,
    hidden: false,
    currentPopupType: 0,
    baseFormulary: {},
    referenceFormulary: {},
  };
  POPUP_TYPE_BASE = 0;
  POPUP_TYPE_REFERENCE = 1;
  onClose = () => {
    console.log("close");
    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = (popupType) => {
    if (this.props.handleCompareClear) {
      this.props.handleCompareClear();
    }
    this.setState({ selectFormulary: true, currentPopupType: popupType });
  };

  selectFormularyClick = (dataRow) => {
    console.log(dataRow);
    if (dataRow) {
      if (this.state.currentPopupType === this.POPUP_TYPE_BASE) {
        this.state.baseFormulary = dataRow;
      } else if (this.state.currentPopupType === this.POPUP_TYPE_REFERENCE) {
        this.state.referenceFormulary = dataRow;
      }
    }
    this.setState({ selectFormulary: false });
  };

  componentDidMount() {
    if (this.props.baseFormulary && Object.keys(this.props.baseFormulary) &&
      this.props.refFormulary && Object.keys(this.props.refFormulary)) {
      this.setState({
        baseFormulary: this.props.baseFormulary,
        referenceFormulary: this.props.refFormulary
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.baseFormulary && Object.keys(nextProps.baseFormulary) &&
      nextProps.refFormulary && Object.keys(nextProps.refFormulary)) {
      this.setState({
        baseFormulary: nextProps.baseFormulary,
        referenceFormulary: nextProps.refFormulary
      });
    }
  }

  formularyToggle = () => {
    const type =
      this.state.PopUpType === PopUpTypes.TYPE1
        ? PopUpTypes.TYPE2
        : PopUpTypes.TYPE1;
    this.setState({
      PopUpType: type,
    });
  };
  render() {
    if (
      !this.state.baseFormulary ||
      Object.keys(this.state.baseFormulary).length === 0
    ) {
      if (this.props.formulary) {
        this.state.baseFormulary = {};
        this.state.baseFormulary["id_formulary"] = this.props.formulary[
          "id_formulary"
        ];
        this.state.baseFormulary["id_base_formulary"] = this.props.formulary[
          "id_base_formulary"
        ];
        this.state.baseFormulary["formulary_name"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["formulary_name"]
          : "";
        this.state.baseFormulary["id_formulary_type"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["id_formulary_type"]
          : "";
        this.state.baseFormulary["version_number"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["version_number"]
          : "";
        this.state.baseFormulary["formulary_type"] = this.props.formulary[
          "formulary_type_info"
        ]
          ? this.props.formulary["formulary_type_info"]["formulary_type"]
          : "";
        this.state.baseFormulary["id_lob"] = this.props.formulary[
          "formulary_type_info"
        ]
          ? this.props.formulary["formulary_type_info"]["id_lob"]
          : "";
        this.state.baseFormulary["number_of_tiers"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["number_of_tiers"]
          : "";
      }
    }
    return (
      <div className="compare-formularies-container">
        <h6>Select formularies for comparison</h6>
        <div className="formulary-form formulay-label">
          <Grid container>
            <Grid item xs={4}>
              <div className="group select-formulary-name">
                <label>
                  Base <span className="astrict">*</span>
                </label>
                <div className="input-element">
                  <div className="bordered pointer bg-green">
                    <span
                      onClick={(e) =>
                        this.handleIconClick(this.POPUP_TYPE_BASE)
                      }
                      className="inner-font"
                    >
                      {this.state.baseFormulary["formulary_name"]
                        ? this.state.baseFormulary["formulary_name"]
                        : "Select Formulary"}
                    </span>
                    <svg 
                      onClick={(e) =>
                        this.handleIconClick(this.POPUP_TYPE_BASE)
                      }
                      className={this.state.hidden ? "hide-edit-icon" : ""}
                      xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                    <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#1D54B4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="compare-vector-wrapper">
                <div className="group">
                  <img src={vector} className="vector-icon" alt="vector" />
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group select-formulary-name">
                <div className="formulary-relative">
                  <label>
                    Reference <span className="astrict">*</span>
                  </label>
                </div>

                <div className="input-element">
                  <div className="bordered pointer bg-green">
                    <span
                      onClick={(e) =>
                        this.handleIconClick(this.POPUP_TYPE_REFERENCE)
                      }
                      className="inner-font"
                    >
                      {this.state.referenceFormulary["formulary_name"]
                        ? this.state.referenceFormulary["formulary_name"]
                        : "Select Formulary"}
                    </span>
                    <svg 
                      onClick={(e) =>
                        this.handleIconClick(this.POPUP_TYPE_REFERENCE)
                      }
                      className={this.state.hidden ? "hide-edit-icon" : ""}
                      xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                    <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#1D54B4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="compare-btn"
              >
                <Button
                  label="Compare"
                  onClick={(event) =>
                    this.props.handleCompareBtn(
                      this.state.baseFormulary,
                      this.state.referenceFormulary
                    )
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.selectFormulary ? (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Formulary"}
            handleClose={() => {
              this.setState({
                selectFormulary: !this.state.selectFormulary,
              });
            }}
            handleAction={() => { }}
            open={this.state.selectFormulary}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <CloneFormularyPopup
              type="commercial" // type will be dynamic based on the LOB
              selectFormularyClick={this.selectFormularyClick}
            />
          </DialogPopup>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareFormularies);
