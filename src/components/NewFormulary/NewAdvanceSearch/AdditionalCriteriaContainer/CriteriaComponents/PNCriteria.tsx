import React from "react";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import { Select } from "antd";
import "./PTCriteria.scss";

const { Option } = Select;

const PNCriteria = (props) => {
  const {
    pnSettingsServies: { pnSettingsStatus, pnResults },
    handleStatus,
    isAdditionalCriteria,
    handlePNChange,
    handlePNSearch,
    deleteIconHandler,
    isReadOnly,
    editable,
  } = props;

  const options = pnResults.data.map((obj) => (
    <Option key={obj.key} value={obj.key}>
      {obj.text}
    </Option>
  ));

  return (
    <div className="root-pt-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="Pharmacy Network"
          type={pnSettingsStatus.type}
          handleStatus={handleStatus}
          deleteIconHandler={deleteIconHandler}
          isAdditionalCriteria={isAdditionalCriteria}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="root-pt-limit-settings__form">
            <div className="input-field-group">
              <div className="input-field-group__label">Pharmacy Network:</div>

              <div className="input-field-group__dropdown-field">
                <Select
                  showSearch
                  mode="multiple"
                  value={pnResults.value}
                  // value={icdSettings.icds}
                  placeholder={"dropdown label"}
                  // style={{ width: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handlePNSearch}
                  onChange={handlePNChange}
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

export default PNCriteria;
