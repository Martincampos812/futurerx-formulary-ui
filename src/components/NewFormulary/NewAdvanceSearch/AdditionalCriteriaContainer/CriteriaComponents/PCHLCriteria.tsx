import React from "react";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import "./PCHLCriteria.scss";
import { Select } from "antd";

const { Option } = Select;

const PCHLCriteria = (props) => {
  const name = "";
  const {
    pchlSettingsServies: { pchlSettings, pchlSettingsStatus, pchlResults },
    handleStatus,
    handlePCHLChange,
    handlePCHLSearch,
    handlePCHLCriteriaChange,
    isAdditionalCriteria,
    deleteIconHandler,
    isReadOnly,
    editable,
  } = props;

  const options = pchlResults.data.map((obj) => (
    <Option key={obj.id} value={obj.id}>
      {obj.text}
    </Option>
  ));

  return (
    <div className="root-pchl-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="Prerequisite Claims History & Lookback"
          type={pchlSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
          isReadOnly={isReadOnly}
          editable={editable}
        >
          <div className="input-field-group">
            <div className="input-field-group__flex-container">
              <label
                htmlFor="name"
                className="input-field-group__flex-container__label"
              >
                Name:
              </label>
              <input
                id="name"
                type="text"
                className="input-field-group__flex-container__text-field"
                name="lookback_name"
                onChange={handlePCHLCriteriaChange}
                value={pchlSettings.lookback_name}
                disabled={editable || isReadOnly}
              />
            </div>
            <div className="input-field-group__flex-container">
              <label
                htmlFor="select"
                className="input-field-group__flex-container__label"
              >
                Select:
              </label>
              <div className="input-field-group__flex-container__dropdown-field p-l-10">
                <DropDown
                  name="id_lookback_level"
                  value={pchlSettings.id_lookback_level}
                  options={[
                    { label: "List", value: "List" },
                    { label: "GPI", value: "GPI" },
                    { label: "DDID", value: "DDID" },
                    { label: "Drug Names", value: "DRUG" },
                  ]}
                  onChange={handlePCHLCriteriaChange}
                  isOptionsObj={true}
                  disabled={editable || isReadOnly}
                />
              </div>
            </div>
            <div className="input-field-group__flex-container">
              <label
                htmlFor=""
                className="input-field-group__flex-container__label"
              >
                List OR Value:
              </label>
              <Select
                showSearch
                mode="multiple"
                value={pchlResults.value}
                placeholder={"dropdown label"}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handlePCHLSearch}
                onChange={handlePCHLChange}
                notFoundContent={null}
                disabled={editable || isReadOnly}
                className="input-field-group__flex-container__autocomplete-select"
              >
                {options}
              </Select>
            </div>
          </div>
          <div className="input-field-group">
            <div className="input-field-group__flex-container">
              <label
                htmlFor="lbperiod"
                className="input-field-group__flex-container__label"
              >
                Lookback Period:
              </label>
              <input
                id="lbperiod"
                type="number"
                className="input-field-group__flex-container__text-field"
                name="lookback_period"
                onChange={handlePCHLCriteriaChange}
                value={pchlSettings.lookback_period}
                disabled={editable || isReadOnly}
              />
            </div>
            <div className="input-field-group__flex-container">
              <label
                htmlFor="select"
                className="input-field-group__flex-container__label"
              >
                Number of Fills:
              </label>
              <input
                type="number"
                className="input-field-group__flex-container__text-field"
                name="number_of_fills"
                onChange={handlePCHLCriteriaChange}
                value={pchlSettings.number_of_fills}
                disabled={editable || isReadOnly}
              />
            </div>
            <div className="input-field-group__flex-container">
              <label
                htmlFor="select"
                className="input-field-group__flex-container__label"
              >
                Days supply per fill:
              </label>
              <input
                type="number"
                className="input-field-group__flex-container__text-field"
                name="number_of_days_supply_per_fill"
                onChange={handlePCHLCriteriaChange}
                value={pchlSettings.number_of_days_supply_per_fill}
                disabled={editable || isReadOnly}
              />
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};

export default PCHLCriteria;
