//react imports
import {Input} from "@material-ui/core";
//ant and materil imports
import {Button, DatePicker, Select} from "antd";
//3rd party imports
import {Moment} from "moment";
import * as React from "react";
//style imports
import "./ClaimsSearch.scss";
//components
import CustomDatepicker from "../shared/Frx-components/date-picker/CustomDatePicker";
import CustomDropDown from "../shared/Frx-components/dropdown/DropDown";

interface ClaimsSearchState {
  claimId: string;
  status: string | undefined;
  drugLabel: string;
  claimType: string | undefined;
  rejectionId: string;
  prescriber: string;
  pharmacy: string;
  startDate: Moment | null | undefined;
  endDate: Moment | null | undefined;
}

interface ClaimsSearchProps {
  onSearch: (searchObject: ClaimsSearchState) => void;
}

interface ClaimsSearchProps { }

const {Option} = Select;

class ClaimsSearch extends React.Component<
  ClaimsSearchProps,
  ClaimsSearchState
  > {
  state = {
    claimId: "",
    status: undefined,
    drugLabel: "",
    claimType: undefined,
    rejectionId: "",
    prescriber: "",
    pharmacy: "",
    startDate: undefined,
    endDate: undefined,
  };

  /**
   * @function handleStartDate
   * start date picker change handler
   * @author Deepak_T
   */
  handleStartDate = (date) => {
    this.setState({startDate: date});
  };

  /**
   * @function handleEndDate
   * end date picker change handler
   * @author Deepak_T
   */
  handleEndDate = (date) => {
    console.log(typeof date);
    this.setState({endDate: date});
  };

  /**
   * @function onSelectStatus
   * status drop down change handler
   * @author Deepak_T
   */
  onSelectStatus = (value: string) => {
    this.setState({status: value});
  };

  /**
   * @function handleInputChange
   * claim id input change handler
   * @author Deepak_T
   */
  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      (e && e.target && e.target.value) ||
      (e && e.target && e.target.value === "")
    ) {
      const key = e.currentTarget.name;
      let value = e.target.value;

      if (Object.keys(this.state).includes(key)) {
        this.setState({...this.state, [key]: value} as Pick<
          ClaimsSearchState,
          keyof ClaimsSearchState
        >);
      }
    }
    // this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * @function onSearch
   * handler for search button
   * @author Deepak_T
   */
  onSearch = () => {
    console.log("search for ", this.state);
    this.props.onSearch({...this.state});
  };

  render() {
    const claimTypeOptions = ["Part B", "Part D"]
    return (
      <div className="claims-search">
        <div>
          <div className="claims-search__first-row">
            <Input
              className="claims-search__input"
              placeholder="Claim ID"
              type="text"
              name="claimId"
              value={this.state.claimId}
              onChange={(e) => this.handleInputChange(e)}
            />
            {/* <Select
              placeholder="Status"
              value={this.state.status}
              onChange={this.onSelectStatus}
              className="claims-search__input claims-search__input--dropdown"
              suffixIcon={
                <svg
                  className="ant-select-suffix"
                  width="6"
                  height="3"
                  viewBox="0 0 6 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                    fill="#999999"
                  />
                </svg>
              }
            >
              <Option value="Paid">Paid</Option>
							<Option value="Reversed">Reversed</Option>
              <Option value="Rejected">Rejected</Option>
            </Select> */}
            <CustomDropDown 
            value={this.state.status}
            onChange={this.onSelectStatus}
            className="claims-search__input claims-search__input--dropdown"
            placeholder="Status"
            options={["Paid", "Reversed", "Rejected"]}
            />
            <Input
              className="claims-search__input"
              placeholder="Drug Label"
              name="drugLabel"
              type="text"
              value={this.state.drugLabel}
              onChange={(e) => this.handleInputChange(e)}
            />
            {/* <Input
              className="claims-search__input"
              placeholder="Claim Type"
              type="text"
              name="claimType"
              value={this.state.claimType}
              onChange={(e) => this.handleInputChange(e)}
            /> */}
            <CustomDropDown 
            value={this.state.claimType}
            onChange={(e) => this.handleInputChange(e)}
            className="claims-search__input claims-search__input--dropdown"
            placeholder="Claim Type"
            options={claimTypeOptions}
            />
            {/* Adding clear button */}
          </div>
          <div>
            <Input
              className="claims-search__input"
              placeholder="RX #"
              type="text"
              name="rejectionId"
              value={this.state.rejectionId}
              onChange={(e) => this.handleInputChange(e)}
            />
            <Input
              className="claims-search__input"
              placeholder="Prescriber"
              type="text"
              name="prescriber"
              value={this.state.prescriber}
              onChange={(e) => this.handleInputChange(e)}
            />
            <Input
              className="claims-search__input"
              placeholder="Pharmacy"
              type="text"
              name="pharmacy"
              value={this.state.pharmacy}
              onChange={(e) => this.handleInputChange(e)}
            />
            <CustomDatepicker
              className="claims-search__input claims-search__input--date"
              onChange={this.handleStartDate}
              value={this.state.startDate}
              placeholder="Start date"
            />
            <CustomDatepicker
              className="claims-search__input claims-search__input--date"
              onChange={this.handleEndDate}
              value={this.state.endDate}
              placeholder="End date"
            />

          </div>
        </div>
        <div className="claims-search__btn">
        <Button className="claims-clear__btn">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
              </svg>
              <span>Clear</span>
            </Button>
          <Button
            className="claims-search__btn-field"
            onClick={(e) => this.onSearch()}
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}

export default ClaimsSearch;
