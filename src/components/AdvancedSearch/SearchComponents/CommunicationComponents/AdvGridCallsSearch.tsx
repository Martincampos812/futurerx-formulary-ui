import React from 'react';
import { Moment } from "moment";
import { Input, Button } from "@material-ui/core";
import TextBox from "../../../shared/Frx-components/text-box/TextBox";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";

interface AdvGridCallsSearchProps {
    
}

interface AdvGridCallsSearchState {
    memberInfo: string;
    claimId: string;
    drugLabel: string;
    rx: string;
    prescriber: string;
    pharmacy: string;
    startDate: Moment | null | undefined;
    endDate: Moment | null | undefined;
}

class AdvGridCallsSearch extends React.Component<AdvGridCallsSearchProps, AdvGridCallsSearchState> {
    state = {
        memberInfo: "",
        claimId: "",
        drugLabel: "",
        rx: "",
        prescriber: "",
        pharmacy: "",
        startDate: undefined,
        endDate: undefined,
    }


    /**
   * @function handleStartDate
   * start date picker change handler
   * @author Deepak_T
   */
  handleStartDate = date => {
    this.setState({ startDate: date });
  };

  /**
   * @function handleEndDate
   * end date picker change handler
   * @author Deepak_T
   */
  handleEndDate = date => {
    console.log(typeof date);
    this.setState({ endDate: date });
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
        this.setState({ ...this.state, [key]: value } as Pick<
            AdvGridCallsSearchState,
          keyof AdvGridCallsSearchState
        >);
      }
    }
    // this.setState({ [e.target.name]: e.target.value });
  };

  // /**
  //  * @function onSearch
  //  * handler for search button
  //  * @author Deepak_T
  //  */
  // onSearch = () => {
  //     console.log("search for ", this.state);
  //     this.props.onSearch({ ...this.state });
  // };

  onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

    render() {
        const callerTypeOptions = ["Member", "Pharmacy", "Prescriber", "Parent/Caretaker", "AOR/Attorney", "Third Party", "Others"];
        const classificationOptions = [
            "Inquiry",
            "Coverage Determination (Medicare) ",
            "Part B Drug Organizational Determination",
            "Prior Authorization (Commercial)",
            "Appeal",
            "First Call Resolution Grievance/Complaint",
            "Grievance/Complaint",
            "Quality of care grievance",
            "Client customized Primary classifications",
            "Others",
        ];
        const serviceYearOptions = [
            "01/01/2020 - 12/31/2020",
            "01/01/2019 - 12/31/2019",
            "01/01/2018 - 12/31/2018",
        ];
        const {
          memberInfo,
          claimId,
          drugLabel,
          rx,
          prescriber,
          pharmacy,
          startDate,
          endDate
        } = this.state;
        return (
            <div>
                <div className="advanced-grid-search">
          <div>
            <div className="advanced-grid-search__first-row">
              <div className="advanced-grid-search__input-field">
                <TextBox
                  className="advanced-grid-search__input"
                  placeholder="Member"
                  type="text"
                  name="memberInfo"
                  value={memberInfo}
                  onChange={e => this.handleInputChange(e)}
                />
                <svg
                  className="advanced-grid-search__icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                    fill="#E5E5E5"
                  />
                </svg>
              </div>
              <DropDown
                placeholder="Caller Type"
                options={callerTypeOptions}
                className="advanced-grid-search__input"
              />
              <DropDown
                placeholder="Classification"
                options={classificationOptions}
                className="advanced-grid-search__input"
              />
               <DropDown
                placeholder="Service Year"
                className="advanced-grid-search__input"
                options={serviceYearOptions}
            />
            </div>
             <div className="advanced-grid-search__first-row">
              <div className="advanced-grid-search__input-field">
                <TextBox
                  className="advanced-grid-search__input"
                  placeholder="Caller Name"
                  type="text"
                  name="drugLabel"
                  value={drugLabel}
                  onChange={e => this.handleInputChange(e)}
                />
                <svg
                  className="advanced-grid-search__icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                    fill="#E5E5E5"
                  />
                </svg>
              </div>
              <CustomDatePicker
                className="advanced-grid-search__input advanced-grid-search__input--date"
                onChange={this.handleStartDate}
                value={this.state.startDate}
                placeholder="Call Start Date"
              />
              <CustomDatePicker
                className="advanced-grid-search__input advanced-grid-search__input--date"
                onChange={this.handleStartDate}
                value={this.state.startDate}
                placeholder="Call End Date"
              />
            </div>
          </div>
          <div className="advanced-grid-search__action">
            <Button className="advanced-grid-search__btn-clear">
              <svg
                className="advanced-grid-search__btn-clear--clearicon"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z"
                  fill="#666666"
                />
                <path
                  d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z"
                  fill="#666666"
                />
              </svg>
              <span>Clear</span>
            </Button>
            <Button
              className="advanced-grid-search__btn-search"
              // onClick={e => this.onSearch()}
            >
              Search
            </Button>
          </div>
        </div>
            </div>
        );
    }
}


export default AdvGridCallsSearch;
