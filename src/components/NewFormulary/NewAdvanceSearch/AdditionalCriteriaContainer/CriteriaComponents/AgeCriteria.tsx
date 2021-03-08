import React from "react";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";

import "./AgeCriteria.scss";

const AgeCriteria = (props) => {
  const {
    alSettingsServies: { alSettings, alSettingsStatus },
    handleStatus,
    handleAgeCriteriaChange,
    handleAgeCriteriaMinConChange,
    handleAgeCriteriaMaxConChange,
    isAdditionalCriteria,
    deleteIconHandler,
    isReadOnly,
    editable,
  } = props;

  return (
    <div className="root-age-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="Age"
          type={alSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="input-field-group">
            <div className="input-field-group__label">Minimum</div>

            <div className="input-field-group__dropdown-field">
              <DropDown
                disabled={editable || isReadOnly}
                value={alSettings.min_age_condition}
                options={[
                  { label: "Greater Then", value: "GT" },
                  { label: "Less Then", value: "LT" },
                  { label: "Inclusive of", value: "IO" },
                ]}
                onChange={(e) => handleAgeCriteriaMinConChange(e)}
                isOptionsObj={true}
              />
            </div>

            <div className="input-field-group__text-field">
              <input
                disabled={editable || isReadOnly}
                type="number"
                className="setup-input-fields"
                name="min_age_limit"
                onChange={(e) => handleAgeCriteriaChange(e)}
                value={alSettings.min_age_limit}
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="input-field-group__label">Maximum</div>

            <div className="input-field-group__dropdown-field">
              <DropDown
                disabled={editable || isReadOnly}
                value={alSettings.max_age_condition}
                options={[
                  { label: "Greater Then", value: "GT" },
                  { label: "Less Then", value: "LT" },
                  { label: "Inclusive of", value: "IO" },
                ]}
                onChange={(e) => handleAgeCriteriaMaxConChange(e)}
                isOptionsObj={true}
              />
            </div>

            <div className="input-field-group__text-field">
              <input
                disabled={editable || isReadOnly}
                type="number"
                className="setup-input-fields"
                name="max_age_limit"
                onChange={(e) => handleAgeCriteriaChange(e)}
                value={alSettings.max_age_limit}
              />
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};
export default AgeCriteria;
