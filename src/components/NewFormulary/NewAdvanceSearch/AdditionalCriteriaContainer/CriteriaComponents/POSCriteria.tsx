import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import { Checkbox } from "antd";
import "./POSCriteria.scss";
import Button from "../../../../shared/Frx-components/button/Button";

const POSCriteria = (props) => {
  const {
    serviceSettingsChecked,
    posSettingsServies: { posSettings, posSettingsStatus },
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
    <div className="pos-limit-settings mb-10">
      {showGridHandler ? (
        <PanelHeader
          title="place of service settings"
          tooltip="place of service settings"
        />
      ) : null}
      <div className="inner-container">
        <StatusContentFormPanel
          title="Place of Service"
          type={posSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="input-field-group">
            <div className="input-field-group__header">
              <div className="input-field-group__label">Select services:</div>
              <div
                className="input-field-group__select-all-action"
                onClick={
                  editable || isReadOnly
                    ? undefined
                    : selectAllHandler.handleSelectAll
                }
              >
                {/* {selectAllHandler.isSelectAll ? "Unselect all" : "Select all"} */}
                Select all
              </div>
            </div>

            <div className="input-field-group__radio-field-group">
              {posSettings.map((s) => (
                <div
                  className="input-field-group__radio-field"
                  key={s.id_place_of_service_type}
                >
                  <Checkbox
                    id={
                      s.id_place_of_service_type +
                      "" +
                      nodeId +
                      "" +
                      additionalCriteriaSequenceId
                    }
                    name={s.id_place_of_service_type}
                    onChange={serviceSettingsChecked}
                    checked={s.isChecked}
                    disabled={editable || isReadOnly}
                  ></Checkbox>
                  <label
                    htmlFor={
                      s.id_place_of_service_type +
                      "" +
                      nodeId +
                      "" +
                      additionalCriteriaSequenceId
                    }
                    className="checkbox-label"
                  >
                    {`${s.place_of_service_type_code} -
                      ${s.place_of_service_type_name}`}
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

export default POSCriteria;
