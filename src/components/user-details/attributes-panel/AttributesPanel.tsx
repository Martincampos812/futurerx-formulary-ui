import React, {Component} from "react";

import Attribute from "./attribute/Attribute";
import NotesPopup from "../../member/MemberNotesPopup";

// import ToolTip from "../../shared/Frx-components/tooltips/ToolTip";

// import CustomToolTip from "../../shared/Frx-components/tooltips/ToolTip";
import Tooltip from "@material-ui/core/Tooltip";

// import {createStyles, withStyles, Tooltip, IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import "./AttributesPanel.scss";

const styles = {
  tooltip: {
    minWidth: "300px",
    padding: "25px 25px",
    boxShadow: "30px rgba(0, 0, 0, 0.5)",
    backgroundColor: "#ffff",
    border: " 1px solid rgba(0, 0, 0, 0.12)",
    webKitOutline: "none",
    marginTop: 6,
    marginLeft: 5,
    // border: "1px solid #e5e5e5"
  },

  arrow: {
    "&::before": {
      border: " 1px solid rgba(0, 0, 0, 0.12)",
      backgroundColor: "#fff",
      boxSizing: "border-box",
    },
  },
};

const CustomTooltip = withStyles(styles)(Tooltip);

interface Props {}
interface State {
  isNotesOpen: boolean;
}

class AttributesPanel extends Component<Props, State> {
  state = {
    isNotesOpen: false,
  };

  handleClick = () => {
    this.setState({isNotesOpen: !this.state.isNotesOpen});
  };

  render() {
    const {isNotesOpen} = this.state;

    return (
      <div className="AttributesPanel">
        <div className="title">Attributes</div>
        <div
          className="Panel-Attribute"
          style={{position: "relative", zIndex: 1}}
        >
          <CustomTooltip
            // open={true}
            placement="bottom"
            className="attribute-tooltip"
            arrow
            // leaveDelay={2000}
            title={
              <React.Fragment>
                <div className="tooltip-data">
                  <div className="label">Subsidy Start</div>
                  <div>10/12/2019</div>
                </div>
                <div className="tooltip-data">
                  <div className="label">Subsidy End </div>
                  <div>10/12/2020</div>
                </div>
              </React.Fragment>
            }
          >
            <div style={{margin: 0}}>
              <Attribute name="LIS4" />
            </div>
          </CustomTooltip>
        </div>
        <div className="Panel-Attribute" style={{position: "relative"}}>
          <CustomTooltip
            className="attribute-tooltip"
            arrow
            placement="bottom"
            title={
              <React.Fragment>
                <div className="phamacy-lock-in">
                  <h4>Walgreens Pharmacy</h4>
                  <p>2210 SW Burnside Denver, CO 72900</p>
                  <p>(555) 555-5555</p>
                </div>
                <div className="tooltip-data">
                  <div className="label">NPI</div>
                  <div style={{textDecoration: "underline", color: "#1d54b4"}}>
                    21791777
                  </div>
                </div>
                <div className="tooltip-data">
                  <div className="label"> Start Date</div>
                  <div>01-01-2019</div>
                </div>
                <div className="tooltip-data">
                  <div className="label">End Date</div>
                  <div>12-31-2020</div>
                </div>
              </React.Fragment>
            }
          >
            <div>
              <Attribute name="Pharmacy lock-in" />
            </div>
          </CustomTooltip>
        </div>
        <div className="Panel-Attribute">
          <CustomTooltip
            className="attribute-tooltip"
            arrow
            placement="bottom"
            title={
              <React.Fragment>
                <div className="tooltip-data">
                  <div className="label">Effective Date</div>
                  <div>10/12/2019</div>
                </div>
                <div className="tooltip-data">
                  <div className="label">End Date</div>
                  <div>10/12/2020</div>
                </div>
                <div className="tooltip-data">
                  <div className="label">TRC</div>
                  <div>055-ESRD (Cancellation)</div>
                </div>
              </React.Fragment>
            }
          >
            <div>
              <Attribute name="ESRD" />
            </div>
          </CustomTooltip>
        </div>
        <div className="Panel-Attribute">
          <CustomTooltip
            className="attribute-tooltip"
            arrow
            placement="bottom"
            title={
              <React.Fragment>
                <div className="tooltip-data">
                  <div className="label">Effective Date</div>
                  <div>10/12/2019</div>
                </div>
                <div className="tooltip-data">
                  <div className="label">End Date</div>
                  <div>10/12/2020</div>
                </div>
              </React.Fragment>
            }
          >
            <div>
              <Attribute name="Hospice" />
            </div>
          </CustomTooltip>
        </div>
        <div className="Panel-Attribute">
          <CustomTooltip
            className="attribute-tooltip"
            arrow
            placement="bottom"
            title={
              <React.Fragment>
                <div className="tooltip-data">
                  <div className="label">Transplant Date</div>
                  <div>10/12/2019</div>
                </div>
                <div className="tooltip-data">
                  <div className="label">Medicare Entitlement Date</div>
                  <div>10/12/2020</div>
                </div>
              </React.Fragment>
            }
          >
            <div>
              <Attribute name="Transplant" />
            </div>
          </CustomTooltip>
        </div>
        <div>
          <div className="Panel-Attribute">
            <svg
              onClick={this.handleClick}
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                fill="#2055B5"
              />
            </svg>

            {isNotesOpen ? (
              <NotesPopup
                category="Attributes"
                openPopup={isNotesOpen}
                onClose={this.handleClick}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AttributesPanel;
