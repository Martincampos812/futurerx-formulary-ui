import React from "react";
import Button from "../../../../shared/Frx-components/button/Button";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../common/StatusContentFormPanel/StatusContentFormPanel";
import Tags from "../Tags";

import "./PT.scss";
import { Select } from "antd";

const { Option } = Select;

// const AddIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     viewBox="0 0 18 18"
//     fill="none"
//   >
//     <path
//       fill-rule="evenodd"
//       clip-rule="evenodd"
//       d="M15.0312 15.0309C18.3507 11.7115 18.3507 6.32958 15.0312 3.0101C11.7117 -0.309383 6.32985 -0.30934 3.01041 3.0101C-0.309032 6.32954 -0.309075 11.7114 3.01041 15.0309C6.32989 18.3504 11.7118 18.3504 15.0312 15.0309ZM14.3241 14.3238C17.2531 11.3949 17.253 6.64611 14.3241 3.71721C11.3952 0.788307 6.64646 0.788264 3.71751 3.71721C0.788571 6.64615 0.788615 11.3949 3.71751 14.3238C6.64641 17.2527 11.3952 17.2528 14.3241 14.3238Z"
//       fill="#707683"
//     />
//     <path
//       d="M4.52082 9.0205C4.52082 9.29664 4.74468 9.5205 5.02082 9.5205H8.52082V13.0205C8.52082 13.2966 8.74468 13.5205 9.02082 13.5205C9.29696 13.5205 9.52082 13.2966 9.52082 13.0205V9.5205L13.0208 9.5205C13.297 9.5205 13.5208 9.29664 13.5208 9.0205C13.5208 8.74436 13.297 8.5205 13.0208 8.5205H9.52082L9.52082 5.0205C9.52082 4.74436 9.29696 4.5205 9.02082 4.5205C8.74468 4.5205 8.52082 4.74436 8.52082 5.0205V8.5205H5.02082C4.74468 8.5205 4.52082 8.74436 4.52082 9.0205Z"
//       fill="#707683"
//     />
//   </svg>
// );

class PrLimitSettings extends React.Component<any, any> {
  handleReplaceSrch = (val) => {
    this.props.handleReplaceSrch(val);
  };
  
  render() {
    const {
      showGridHandler,
      handleStatus,
      ptSettingsStatus,
      isDisabled,
    } = this.props;

    const options = this.props.options.map((obj) => (
      <Option key={obj.key} value={obj.key}>
        {obj.text}
      </Option>
    ));

    return (
      <div className="pt-limit-settings bordered mb-10 white-bg">
        <PanelHeader
          title="prescriber taxonomy settings"
          tooltip="prescriber taxonomy settings"
        />

        <div className="inner-container">
          <StatusContentFormPanel
            title="Prescriber Taxonomy"
            type={ptSettingsStatus.type}
            handleStatus={handleStatus}
            showDelete={false}
          >
            <div className="pn-limit-settings__form">
              <div className="input-field-group">
                <div className="input-field-group__label">
                  Prescriber Taxonomy:
                </div>

                <div className="input-field-group__dropdown-field">
                  {/* <DropDown
                        className=""
                        placeholder="Select"
                        options={["inclusive of", "exclusive of"]}
                      /> */}
                  {/* <Tags
                    disabled={this.props.isDisabled}
                    options={this.props.options}
                    handleReplaceSrch={this.handleReplaceSrch}
                  /> */}
                  <Select
                    showSearch
                    mode="multiple"
                    value={this.props.options.value}
                    placeholder={"dropdown label"}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleReplaceSrch}
                    onChange={this.props.handlePNChange}
                    notFoundContent={null}
                    className="select-icds"
                    disabled={isDisabled}
                  >
                    {options}
                  </Select>
                </div>
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
  }
}

export default PrLimitSettings;
