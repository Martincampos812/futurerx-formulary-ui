import React, { Component } from "react";
import CheckboxWithLabel from "../../../../../../shared/Frx-components/checkbox-with-label/CheckboxWithLabel";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import ExpandableListitem from "./components/ExpandableListitem";
import ExpandedTable from "./components/ExpandedTable";
import ExceptionDetailsModal from "./components/ExceptionDetailsModal";

import {
  getTierData,
  getPAData,
  getSTData,
  getQLData,
  getOtherUMData,
  getFormularyBenefitData,
} from "./mock-data/data";
import {
  getTierColumns,
  getPAColumns,
  getSTColumns,
  getQLColumns,
  getOtherUMColumns,
  getFormularyBenefitColumns,
} from "./mock-data/columns";

import "./styles.scss";

const CHOICE_OPTIONS = [
  {
    id: 1,
    label: "Free First Fill",
    value: "Free First Fill",
  },
  {
    id: 2,
    label: "Full Gap Coverage",
    value: "Full Gap Coverage",
  },
  {
    id: 3,
    label: "Partial Gap Coverage",
    value: "Partial Gap Coverage",
  },
  {
    id: 4,
    label: "Other 2",
    value: "Other 2",
  },
  {
    id: 5,
    label: "Home Infusion",
    value: "Home Infusion",
  },
  {
    id: 6,
    label: "OTC Benefits",
    value: "OTC Benefits",
  },
  {
    id: 7,
    label: "Excluded Drugs",
    value: "Excluded Drugs",
  },
  {
    id: 8,
    label: "Other 3",
    value: "Other 3",
  },
  {
    id: 9,
    label: "Additional Demonstratal",
    value: "Additional Demonstratal Drugs (MMP Only)",
  },
  {
    id: 10,
    label: "Indicated-Base Coverage",
    value: "Indicated-Base Coverage",
  },
  {
    id: 11,
    label: "LIS Cost Sharing Reduction",
    value: "LIS Cost Sharing Reduction",
  },
  {
    id: 12,
    label: "Other 4",
    value: "Other 4",
  },
  {
    id: 13,
    label: "Value-Based Insurance",
    value: "Value-Based Insurance",
  },
  {
    id: 14,
    label: "Senior Savings Model",
    value: "Senior Savings Model",
  },
  {
    id: 15,
    label: "Other 1",
    value: "Other 1",
  },
  {
    id: 16,
    label: "Other 5",
    value: "Other 5",
  },
  {
    id: 17,
    label: "Exceptions",
    value: "Exceptions",
  },
];

class EnhancedOptionsSelection extends React.Component<any, any> {
  state = {
    exceptionsSectionStatus: false,
    expandAllStatus: false,
    tierExceptionDetailsModalStatus: false,
  };

  handleCheckboxChange = ({ target: { name, checked } }) => {
    if (name === "Exceptions") {
      this.setState({
        exceptionsSectionStatus: checked,
      });
    }
  };

  toggleExpandAllItems = () => {
    this.setState({
      expandAllStatus: !this.state.expandAllStatus,
    });
  };

  openTierExceptionDetailsModal = () => {
    this.setState({
      tierExceptionDetailsModalStatus: true,
    });
  };

  closeTierExceptionDetailsModal = () => {
    this.setState({
      tierExceptionDetailsModalStatus: false,
    });
  };

  render() {
    const {
      exceptionsSectionStatus,
      expandAllStatus,
      tierExceptionDetailsModalStatus,
    } = this.state;
    return (
      <div className="enhanced-options-selection">
        <div className="checkboxes-container">
          {CHOICE_OPTIONS.map((option, key) => (
            <CheckboxWithLabel
              key={key}
              onChange={this.handleCheckboxChange}
              name={option.label}
            >
              <span className="choice-label">{option.label}</span>
            </CheckboxWithLabel>
          ))}
        </div>

        {exceptionsSectionStatus && (
          <div className="exception-content">
            <div className="exception-content__header">
              <div className="header-title">EXCEPTION</div>
              <div className="header-action">Add Exception</div>
            </div>

            <div className="exception-content__body">
              <div className="expand-all-container">
                <div className="expand-all" onClick={this.toggleExpandAllItems}>
                  {expandAllStatus ? "Collapse" : "Expand"} All
                </div>
              </div>

              <div className="expandable-list">
                <ExpandableListitem title="Tier" expanded={expandAllStatus}>
                  <ExpandedTable
                    columns={getTierColumns({
                      onViewClick: this.openTierExceptionDetailsModal,
                    })}
                    data={getTierData()}
                  />
                </ExpandableListitem>

                <ExpandableListitem title="PA" expanded={expandAllStatus}>
                  <ExpandedTable
                    columns={getPAColumns({
                      onViewClick: this.openTierExceptionDetailsModal,
                    })}
                    data={getPAData()}
                  />
                </ExpandableListitem>

                <ExpandableListitem title="ST" expanded={expandAllStatus}>
                  <ExpandedTable
                    columns={getSTColumns({
                      onViewClick: this.openTierExceptionDetailsModal,
                    })}
                    data={getSTData()}
                  />
                </ExpandableListitem>

                <ExpandableListitem title="QL" expanded={expandAllStatus}>
                  <ExpandedTable columns={getQLColumns()} data={getQLData()} />
                </ExpandableListitem>

                <ExpandableListitem
                  title="OTHER UM EDITS"
                  expanded={expandAllStatus}
                >
                  <ExpandedTable
                    columns={getOtherUMColumns()}
                    data={getOtherUMData()}
                  />
                </ExpandableListitem>

                <ExpandableListitem
                  title="FORMULARY BENEFITS"
                  expanded={expandAllStatus}
                >
                  <ExpandedTable
                    columns={getFormularyBenefitColumns()}
                    data={getFormularyBenefitData()}
                  />
                </ExpandableListitem>
              </div>
            </div>

            {tierExceptionDetailsModalStatus ? (
              <DialogPopup
                className=""
                showCloseIcon={false}
                positiveActionText="Apply"
                negativeActionText="Cancel"
                title="TIER EXCEPTION Details"
                handleClose={this.closeTierExceptionDetailsModal}
                handleAction={() => {}}
                showActions={true}
                open={tierExceptionDetailsModalStatus}
                popupMaxWidth={"lg"}
              >
                <ExceptionDetailsModal />
              </DialogPopup>
            ) : null}
            {/* <PanelHeader title="EXCEPTION"/> */}
          </div>
        )}
      </div>
    );
  }
}

export default EnhancedOptionsSelection;
