import React from "react";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import "./ICDCriteria.scss";
import { Select } from "antd";

const { Option } = Select;

const ICDCriteria = (props) => {
  const {
    handleStatus,
    icdSettingsServies: { icdSettings, icdSettingsStatus, icdResults },
    isAdditionalCriteria,
    handleICDChange,
    handleICDSearch,
    handleICDOnChange,
    deleteIconHandler,
    isReadOnly,
    editable,
  } = props;

  const options = icdResults.data.map((obj) => (
    <Option key={obj.key} value={obj.key}>
      {obj.text}
    </Option>
  ));

  return (
    <div className="root-icd-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="ICD"
          type={icdSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="root-icd-limit-settings__form">
            <div className="input-field-group">
              <div className="input-field-group__label">ICD:</div>

              <div className="input-field-group__dropdown-field">
                <Select
                  showSearch
                  mode="multiple"
                  value={icdResults.value}
                  // defaultValue={icdResults.value}
                  placeholder={"dropdown label"}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleICDSearch}
                  onChange={handleICDChange}
                  notFoundContent={null}
                  className="select-icds"
                  disabled={editable || isReadOnly}
                >
                  {options}
                </Select>
              </div>
            </div>

            <div className="input-field-group">
              <div className="input-field-group__label">Lookback Days:</div>
              <div className="input-field-group__text-field">
                <input
                  disabled={editable || isReadOnly}
                  type="number"
                  className="setup-input-fields"
                  onChange={handleICDOnChange}
                  name="look_back_days"
                  value={icdSettings.look_back_days}
                />
              </div>
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};

export default ICDCriteria;
