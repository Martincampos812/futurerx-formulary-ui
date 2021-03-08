import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import { Checkbox } from "antd";
import Button from "../../../../shared/Frx-components/button/Button";

import "./PRCriteria.scss";

const PRCriteria = (props) => {
  const {
    serviceSettingsChecked,
    prSettingsServies: { prSettings, prSettingsStatus },
    additionalCriteriaSequenceId,
    selectAllHandler,
    showGridHandler,
    handleStatus,
    isAdditionalCriteria,
    deleteIconHandler,
    nodeId,
    isReadOnly,
    editable,
  } = props;

  return (
    <div className="root-pr-limit-settings mb-10">
      {showGridHandler ? (
        <PanelHeader
          title="patient residence settings"
          tooltip="patient residence settings"
        />
      ) : null}

      <div className="inner-container">
        <StatusContentFormPanel
          title="Patient Residence"
          type={prSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
          isReadOnly={isReadOnly}
          editable={editable}
          //   showDelete={false}
        >
          <div className="input-field-group">
            <div className="input-field-group__header">
              <div className="input-field-group__label">Select services:</div>
              <div
                className="input-field-group__select-all-action"
                onClick={
                  isReadOnly || editable
                    ? undefined
                    : selectAllHandler.handleSelectAll
                }
              >
                {/* {selectAllHandler.isSelectAll ? "Unselect all" : "Select all"} */}
                Select all
              </div>
            </div>

            <div className="input-field-group__radio-field-group">
              {prSettings.map((s) => (
                <div
                  className="input-field-group__radio-field"
                  key={s.id_patient_residence_type}
                >
                  <Checkbox
                    id={
                      s.id_patient_residence_type +
                      "" +
                      nodeId +
                      "" +
                      additionalCriteriaSequenceId
                    }
                    name={s.id_patient_residence_type}
                    onChange={serviceSettingsChecked}
                    checked={s.isChecked}
                    disabled={editable || isReadOnly}
                  ></Checkbox>
                  <label
                    htmlFor={
                      s.id_patient_residence_type +
                      "" +
                      nodeId +
                      "" +
                      additionalCriteriaSequenceId
                    }
                    className="checkbox-label"
                  >
                    {`${s.patient_residence_type_code} -
                      ${s.patient_residence_type_name}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
      {showGridHandler ? (
        <Button label="Apply" onClick={showGridHandler} />
      ) : null}
    </div>
  );
};

export default PRCriteria;
