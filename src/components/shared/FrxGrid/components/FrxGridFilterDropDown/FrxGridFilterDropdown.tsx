/**
 * Component for rendering the filter drop down for text and number
 * @author Deepak_T
 * @version 1.0.0
 */

import { CaretDownOutlined } from "@ant-design/icons";
import { Input } from "@material-ui/core";
import { Button, Select } from "antd";
import React from "react";
import "./FrxGridFilterDropdown.scss";
const { Option } = Select;

class FrxGridFilterDropDown extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      inputText: "",
      optionValue: ""
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.selectedKeys && this.props.selectedKeys) {
      if (
        JSON.stringify(previousProps.selectedKeys) !==
        JSON.stringify(this.props.selectedKeys)
      ) {
        if (this.props.selectedKeys && this.props.selectedKeys.length === 0) {
          this.setState({ selected: [], inputText: "", optionValue: "" });
        }
      }
    }
  }

  /**
   * @function onSelect
   * triggered on selecting a condition
   * @param value the selected value
   * @author Deepak_T
   */
  onSelect = (value: string) => {
    let selected = [...this.state.selected];

    if (value) selected = [value];

    this.setState({ optionValue: value, selected });
  };

  /**
   * @function handleInputChange
   * triggered on chnging input where vlue is enetered
   * @param e DOM event
   * @author Deepak_T
   */
  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      (e && e.target && e.target.value) ||
      (e && e.target && e.target.value === "")
    )
      this.setState({ inputText: e.target.value });
  };

  /**
   * @function renderOptions
   * to construct JSX for rendering the filters
   * @author Deepak_T
   */
  renderOptions() {
    return (
      <div>
        <Select
          placeholder="Filter by condition"
          value={this.state.optionValue}
          onChange={this.onSelect}
          className="frx-grid-filter-dropdown__filter-block__select"
          suffixIcon={
            <CaretDownOutlined className="frx-grid-filter-dropdown__filter-block__select__icon" />
          }
        >
          <Option value="">Filter by condition</Option>

          {this.props.filters.map(option => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Select>
        {this.state.optionValue !== "exists" &&
        this.state.optionValue !== "does not exist" ? (
          <div className="frx-grid-filter-dropdown__filter-block__value-block">
            <span className="frx-grid-filter-dropdown__filter-block__value-block__label">
              Filter by value
            </span>
            <div>
              <Input
                className="frx-grid-filter-dropdown__filter-block__value-block__input"
                placeholder="Input value..."
                type={this.props.type === "number" ? "number" : "text"}
                value={this.state.inputText}
                onChange={e => this.handleInputChange(e)}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * @function onConfirm
   * called on applying a filter
   * @author Deepak_T
   */
  onConfirm() {
    const { inputText, optionValue } = this.state;

    if (!optionValue) {
      this.props.clearFilters();
      return;
    } else {
      this.props.setSelectedKeys([
        { value: inputText, condition: optionValue }
      ]);
      this.props.confirm();
    }
  }

  /**
   * @function onReset
   * called on clearing a filter
   * @author Deepak_T
   */
  onReset() {
    this.setState({ selected: [], inputText: "", optionValue: "" });
    this.props.clearFilters();
  }

  /**
   * @function handleCloseFilter
   * called on closing a filter
   * @author Deepak_T
   */
  handleCloseFilter = () => {
    this.setState({ selected: [], inputText: "", optionValue: "" });
    this.props.confirm();
  };

  /**
   * @function renderButtons
   * to render apply and clear buttons
   * @author Deepak_T
   */
  renderButtons() {
    return (
      <div className="filter-btns">
        <Button className="clear-button" onClick={e => this.onReset()}>
          Clear
        </Button>
        <Button className="filter-button" onClick={e => this.onConfirm()}>
          Filter
        </Button>{" "}
      </div>
    );
  }

  render() {
    return (
      <div className="frx-grid-filter-dropdown">
        <div className="frx-grid-filter-dropdown__filters">
          Filters
          <svg
            width="19"
            height="19"
            onClick={this.handleCloseFilter}
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="frx-grid-filter-dropdown__filters__close-icon"
          >
            <path
              d="M9.5 0C4.26175 0 0 4.26175 0 9.5C0 14.7382 4.26175 19 9.5 19C14.7382 19 19 14.7382 19 9.5C19 4.26175 14.7382 0 9.5 0ZM12.9396 11.9065C13.0104 11.9737 13.0669 12.0544 13.106 12.1437C13.145 12.2331 13.1658 12.3294 13.167 12.427C13.1683 12.5245 13.15 12.6213 13.1132 12.7116C13.0765 12.802 13.022 12.8841 12.953 12.953C12.8841 13.022 12.802 13.0765 12.7116 13.1132C12.6213 13.15 12.5245 13.1683 12.427 13.167C12.3294 13.1658 12.2331 13.145 12.1437 13.106C12.0544 13.0669 11.9737 13.0104 11.9065 12.9396L9.5 10.5336L7.09349 12.9396C6.95532 13.0709 6.77135 13.143 6.5808 13.1406C6.39024 13.1381 6.20818 13.0613 6.07342 12.9266C5.93867 12.7918 5.86188 12.6098 5.85944 12.4192C5.857 12.2286 5.9291 12.0447 6.06036 11.9065L8.46642 9.5L6.06036 7.09349C5.9291 6.95532 5.857 6.77135 5.85944 6.5808C5.86188 6.39024 5.93867 6.20818 6.07342 6.07342C6.20818 5.93867 6.39024 5.86188 6.5808 5.85944C6.77135 5.857 6.95532 5.9291 7.09349 6.06036L9.5 8.46642L11.9065 6.06036C12.0447 5.9291 12.2286 5.857 12.4192 5.85944C12.6098 5.86188 12.7918 5.93867 12.9266 6.07342C13.0613 6.20818 13.1381 6.39024 13.1406 6.5808C13.143 6.77135 13.0709 6.95532 12.9396 7.09349L10.5336 9.5L12.9396 11.9065Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="frx-grid-filter-dropdown__filter-block">
          {this.renderOptions()}
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}
export default FrxGridFilterDropDown;
