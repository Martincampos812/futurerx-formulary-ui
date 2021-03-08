import React from "react";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import { Select } from "antd";

import "./PTCriteria.scss";

const { Option } = Select;

const PTCriteria = (props) => {
  const {
    ptSettingsServies: { ptSettingsStatus, ptResults },
    handleStatus,
    isAdditionalCriteria,
    handlePTChange,
    handlePTSearch,
    deleteIconHandler,
    isReadOnly,
    editable,
  } = props;

  const options = ptResults.data.map((obj) => (
    <Option key={obj.key} value={obj.key}>
      {obj.text}
    </Option>
  ));

  return (
    <div className="root-pt-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="Prescriber Taxonomy"
          type={ptSettingsStatus.type}
          handleStatus={handleStatus}
          deleteIconHandler={deleteIconHandler}
          isAdditionalCriteria={isAdditionalCriteria}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="root-pt-limit-settings__form">
            <div className="input-field-group">
              <div className="input-field-group__label">
                Prescriber Taxonomy:
              </div>

              <div className="input-field-group__dropdown-field">
                <Select
                  showSearch
                  mode="multiple"
                  value={ptResults.value}
                  placeholder={"dropdown label"}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handlePTSearch}
                  onChange={handlePTChange}
                  notFoundContent={null}
                  className="select-icds"
                  disabled={editable || isReadOnly}
                >
                  {options}
                </Select>
              </div>
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};

export default PTCriteria;
