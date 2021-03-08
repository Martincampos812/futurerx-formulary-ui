import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import { Checkbox } from "antd";
import Button from "../../../../shared/Frx-components/button/Button";

import "./GenderCriteria.scss";

const GenderCriteria = (props) => {
  const {
    serviceSettingsChecked,
    glSettingsServies: { glSettings, glSettingsStatus },
    handleStatus,
    additionalCriteriaSequenceId,
    isAdditionalCriteria,
    deleteIconHandler,
    nodeId,
    isReadOnly,
    editable,
  } = props;

  return (
    <div className="root-gender-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="Gender"
          type={glSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="input-field-group">
            <div className="input-field-group__label">Select Gender:</div>

            <div className="input-field-group__radio-field-group">
              {glSettings.map((gl) => (
                <div className="input-field-group__radio-field" key={gl.id}>
                  <Checkbox
                    disabled={editable || isReadOnly}
                    id={gl.id + "" + nodeId + "" + additionalCriteriaSequenceId}
                    name={gl.id}
                    onChange={serviceSettingsChecked}
                    checked={gl.isChecked}
                  ></Checkbox>
                  <label
                    htmlFor={
                      gl.id + "" + nodeId + "" + additionalCriteriaSequenceId
                    }
                    className="checkbox-label"
                  >
                    {`${gl.gl_type_name}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};

export default GenderCriteria;
