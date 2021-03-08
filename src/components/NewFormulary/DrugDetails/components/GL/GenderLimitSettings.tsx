import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../common/StatusContentFormPanel/StatusContentFormPanel";
import { Checkbox } from "antd";
import Button from "../../../../shared/Frx-components/button/Button";

import "./GL.scss";

const GenderLimitSettings = (props) => {
  const {
    serviceSettingsChecked,
    glSettingsServies: { glSettings, glSettingsStatus },
    handleStatus,
    showGridHandler,
    isDisabled,
  } = props;

  return (
    <div className="gender-limit-settings bordered mb-10 white-bg">
      <PanelHeader
        title="Gender Limit Settings"
        tooltip="Gender Limit Settings"
      />

      <div className="inner-container">
        <StatusContentFormPanel
          title="Gender"
          type={glSettingsStatus.type}
          handleStatus={handleStatus}
          showDelete={false}
        >
          <div className="input-field-group">
            <div className="input-field-group__label">Select Gender:</div>

            <div className="input-field-group__radio-field-group">
              {glSettings.map((gl) => (
                <div className="input-field-group__radio-field" key={gl.index}>
                  <Checkbox
                    id={gl.index}
                    name={gl.index}
                    onChange={serviceSettingsChecked}
                    checked={gl.isChecked}
                    disabled={isDisabled}
                  ></Checkbox>
                  <label htmlFor={gl.gl_type_name} className="checkbox-label">
                    {`${gl.gl_type_name}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </StatusContentFormPanel>
      </div>

      <Button
        label="Apply"
        onClick={showGridHandler}
        disabled={isDisabled}
      />
    </div>
  );
};

export default GenderLimitSettings;
