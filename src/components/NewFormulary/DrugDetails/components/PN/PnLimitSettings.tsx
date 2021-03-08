import React from 'react'
import PanelHeader from '../../../../shared/Frx-components/panel-header/PanelHeader';
import StatusContentFormPanel from '../common/StatusContentFormPanel/StatusContentFormPanel';
import Button from "../../../../shared/Frx-components/button/Button";

import './PN.scss';
import { Select } from "antd";

const { Option } = Select;

class PnLimitSettings extends React.Component<any, any>{
  handleReplaceSrch = (val) => {
    this.props.handleReplaceSrch(val)
  }
  render() {
    const {showGridHandler, handleStatus,pnSettingsStatus} = this.props

    const options = this.props.options.map((obj) => (
      <Option key={obj.key} value={obj.key}>
        {obj.text}
      </Option>
    ));

    return (
      <div className="pn-limit-settings bordered mb-10 white-bg">
        <PanelHeader title="pharmacy network settings" tooltip="pharmacy network settings" />

        <div className="inner-container">
          <StatusContentFormPanel title="Pharmacy Network" type={pnSettingsStatus.type} handleStatus={handleStatus} showDelete={false}>
            <div className="pn-limit-settings__form">
              <div className="input-field-group">
                <div className="input-field-group__label">Pharmacy Network:</div>

                <div className="input-field-group__dropdown-field">
                  {/* <Tags options={this.props.options} disabled={this.props.isDisabled} handleReplaceSrch={this.handleReplaceSrch} /> */}
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
                    disabled={this.props.isDisabled}
                  >
                    {options}
                  </Select>
                </div>
              </div>
            </div>
          </StatusContentFormPanel>
        </div>
        <Button label="Apply" onClick={showGridHandler} disabled={this.props.isDisabled} />
      </div>
    )
  }
}

export default PnLimitSettings
