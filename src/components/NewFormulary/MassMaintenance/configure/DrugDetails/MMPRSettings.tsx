import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import { Checkbox } from "antd";
import Button from "../../../../shared/Frx-components/button/Button";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";

const MMPRSettings = (props) => {
  const {
    serviceSettingsChecked,
    prSettingsServies: { prSettings, prSettingsStatus },
    formularyId,
    selectAllHandler,
    showGridHandler,
    handleStatus,
    isDisabled,
  } = props;

  return (
    <div className="pr-limit-settings bordered mb-10 white-bg">
      <PanelHeader
        title="patient residence settings"
        tooltip="patient residence settings"
      />

      <div className="inner-container">
        <StatusContentFormPanel
          title="Patient Residence"
          type={prSettingsStatus.type}
          handleStatus={handleStatus}
          showDelete={false}
        >
          <div className="input-field-group">
            <div className="input-field-group__header">
              <div className="input-field-group__label">Select services:</div>
              {!isDisabled ? (
                <div
                  className="input-field-group__select-all-action"
                  onClick={selectAllHandler.handleSelectAll}
                >
                  {selectAllHandler.isSelectAll ? "Unselect all" : "Select all"}
                </div>
              ) : null}
            </div>

            <div className="input-field-group__radio-field-group">
              {prSettings.map((s) => (
                <div
                  className="input-field-group__radio-field"
                  key={s.id_patient_residence_type}
                >
                  <Checkbox
                    id={s.id_patient_residence_type + "" + formularyId}
                    name={s.id_patient_residence_type + "" + formularyId}
                    onChange={serviceSettingsChecked}
                    checked={s.isChecked}
                    disabled={isDisabled}
                  ></Checkbox>
                  <label
                    htmlFor={s.id_patient_residence_type + "" + formularyId}
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
      <Button label="Apply" onClick={showGridHandler} disabled={isDisabled} />
    </div>
  );
};

export default MMPRSettings;
