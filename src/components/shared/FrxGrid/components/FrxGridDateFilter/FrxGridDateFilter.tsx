import React from "react";
import { DatePicker, Space, Button, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

import "./FrxGridDateFilter.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;

class FrxGridDateFilter extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      startDate: "",
      endDate: "",
      optionValue: "",
      flag: false
    };
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.selectedKeys && this.props.selectedKeys) {
      if (
        JSON.stringify(previousProps.selectedKeys) !==
        JSON.stringify(this.props.selectedKeys)
      ) {
        if (this.props.selectedKeys && this.props.selectedKeys.length === 0) {
          this.setState({
            selected: [],
            flag: false,
            startDate: "",
            optionValue: "",
            endDate: ""
          });
        }
      }
    }
  }

  /**
   * @function onSelect
   * handler for selecting condition
   * @param value is the seleced value
   * @author Deepak_T
   */
  onSelect = (value: string) => {
    let selected = [...this.state.selected];
    if (value) selected = [value];
    if (value !== "between") {
      this.setState({ selected: selected, optionValue: value, flag: false });
    } else if (value === "between") {
      this.setState({ selected: selected, optionValue: value, flag: true });
    }
  };

  /**
   * @function handleStartDate
   * handler for selecting start date
   * @param date is the seleced start date
   * @author Deepak_T
   */
  handleStartDate = date => {
    this.setState({ startDate: date });
  };

  /**
   * @function handleEndDate
   * handler for selecting end date
   * @param date is the seleced end date
   * @author Deepak_T
   */
  handleEndDate = date => {
    this.setState({ endDate: date, flag: true });
  };

  /**
   * @function onConfirm
   * on applying filter
   * @author Deepak_T
   */
  onConfirm() {
    const { selected, optionValue, startDate, endDate, flag } = this.state;

    if (
      selected.length === 0 ||
      !optionValue ||
      (!flag && !startDate) ||
      (flag && !endDate)
    ) {
      this.props.clearFilters();
      return;
    } else {
      this.props.setSelectedKeys([
        {
          startDate,
          endDate,
          selected,
          flag,
          optionValue
        }
      ]);
      this.props.confirm();
    }
  }

  /**
   * @function onReset
   * on clearing filter
   * @author Deepak_T
   */
  onReset() {
    this.setState({
      selected: [],
      startDate: "",
      endDate: "",
      optionValue: "",
      flag: false
    });
    this.props.clearFilters();
  }

  /**
   * @function handleCloseFilter
   * on closing filter
   * @author Deepak_T
   */
  handleCloseFilter = () => {
    this.props.confirm();
  };

  /**
   * @function renderOptions
   * to render the filter options
   * @author Deepak_T
   */
  renderOptions() {
    return (
      <div className="frx-grid-date-filter__content__filters">
        <div>
          <Select
            placeholder="Filter by condition"
            // value={this.state.optionValue}
            value={this.state.optionValue ? this.state.optionValue : undefined}
            onChange={this.onSelect}
            className="frx-grid-date-filter__content__filters__select"
            suffixIcon={<CaretDownOutlined className="ant-select-suffix" />}
          >
            {/* <Option value="">Filter by condition</Option> */}
            {this.props.filters.map(option => (
              <Option key={option.value} value={option.value}>
                {option.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className="frx-grid-date-filter__content__filters__inputs">
          <span className="frx-grid-date-filter__content__filters__inputs__title">
            Filter By Date
          </span>
          <div>
            <Space direction="vertical">
              {this.state.flag ? (
                <RangePicker
                  className="frx-grid-date-filter__content__filters__inputs__range-picker"
                  onChange={this.handleEndDate}
                  value={this.state.endDate}
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  }
                />
              ) : (
                <DatePicker
                  className="frx-grid-date-filter__content__filters__inputs__date-picker"
                  onChange={this.handleStartDate}
                  value={this.state.startDate}
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  }
                />
              )}
            </Space>
          </div>
        </div>
      </div>
    );
  }

  /**
   * @function renderButtons
   * to render the action buttons
   * @author Deepak_T
   */
  renderButtons() {
    return (
      <div className="frx-grid-date-filter__content__action">
        <Button
          className="frx-grid-date-filter__content__action__btn frx-grid-date-filter__content__action__btn--clear "
          onClick={e => this.onReset()}
        >
          Clear
        </Button>
        <Button
          className="frx-grid-date-filter__content__action__btn frx-grid-date-filter__content__action__btn--apply"
          onClick={e => this.onConfirm()}
        >
          Filter
        </Button>{" "}
      </div>
    );
  }

  render() {
    return (
      <div className="frx-grid-date-filter">
        <div className="frx-grid-date-filter__header">
          Filters
          <svg
            onClick={this.handleCloseFilter}
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rx-grid-date-filter__header__close-icon"
          >
            <path
              d="M9.5 0C4.26175 0 0 4.26175 0 9.5C0 14.7382 4.26175 19 9.5 19C14.7382 19 19 14.7382 19 9.5C19 4.26175 14.7382 0 9.5 0ZM12.9396 11.9065C13.0104 11.9737 13.0669 12.0544 13.106 12.1437C13.145 12.2331 13.1658 12.3294 13.167 12.427C13.1683 12.5245 13.15 12.6213 13.1132 12.7116C13.0765 12.802 13.022 12.8841 12.953 12.953C12.8841 13.022 12.802 13.0765 12.7116 13.1132C12.6213 13.15 12.5245 13.1683 12.427 13.167C12.3294 13.1658 12.2331 13.145 12.1437 13.106C12.0544 13.0669 11.9737 13.0104 11.9065 12.9396L9.5 10.5336L7.09349 12.9396C6.95532 13.0709 6.77135 13.143 6.5808 13.1406C6.39024 13.1381 6.20818 13.0613 6.07342 12.9266C5.93867 12.7918 5.86188 12.6098 5.85944 12.4192C5.857 12.2286 5.9291 12.0447 6.06036 11.9065L8.46642 9.5L6.06036 7.09349C5.9291 6.95532 5.857 6.77135 5.85944 6.5808C5.86188 6.39024 5.93867 6.20818 6.07342 6.07342C6.20818 5.93867 6.39024 5.86188 6.5808 5.85944C6.77135 5.857 6.95532 5.9291 7.09349 6.06036L9.5 8.46642L11.9065 6.06036C12.0447 5.9291 12.2286 5.857 12.4192 5.85944C12.6098 5.86188 12.7918 5.93867 12.9266 6.07342C13.0613 6.20818 13.1381 6.39024 13.1406 6.5808C13.143 6.77135 13.0709 6.95532 12.9396 7.09349L10.5336 9.5L12.9396 11.9065Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="frx-grid-date-filter__content">
          {this.renderOptions()}
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

export default FrxGridDateFilter;
