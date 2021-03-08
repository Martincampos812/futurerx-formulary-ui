//react imports
import * as React from "react";
//ant and materil imports
import { Select, Tag } from 'antd';
import { Input, Button } from "@material-ui/core";
//3rd party imports
import { Moment } from "moment";
//style imports
import "./GridSearch.scss";
//Components
import TextBox from "../../shared/Frx-components/text-box/TextBox";
import CustomDatePicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import { TabInfo } from "../../../models/tab.model";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";

interface GridAdvancedPaSearchState {
  memberInfo: string;
  claimId: string;
  drugLabel: string;
  rx: string;
  prescriber: string;
  pharmacy: string;
  startDate: Moment | null | undefined;
  endDate: Moment | null | undefined;
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
}

// interface GridAdvancedMemberSearchProps {
//     onSearch: (searchObject: GridAdvancedMemberSearchState) => void;
// }

interface GridAdvancedPaSearchProps {
  searchType: string;
  onPriorAuthTabChange:(selectedTab:number) => void
}

const miniTabs = [
  { id: 1, text: "Initial Cases" },
  { id: 2, text: "Appeals" }
];

// const lobOptions = [{ value: 'Medicare' }, { value: 'Medicaid' }, { value: 'Commercial' }, { value: 'Exchange' }]

class GridAdvancedPaSearch extends React.Component<
  GridAdvancedPaSearchProps,
  GridAdvancedPaSearchState
> {
  state = {
    memberInfo: "",
    claimId: "",
    drugLabel: "",
    rx: "",
    prescriber: "",
    pharmacy: "",
    startDate: undefined,
    endDate: undefined,
    lobOptions : ["Medicare", "Exchange", "Medicaid", "Commercial"] as any,
    miniTabs: miniTabs,
    activeMiniTabIndex:
      this.props.searchType === "pacasesintial"
        ? 0
        : this.props.searchType === "pacasesappeals"
        ? 1
        : 0
  };

  componentDidUpdate(previousProps, previousState) {
    if (this.props.searchType && previousProps.searchType)
      if (previousProps.searchType && this.props.searchType) {
        if (previousProps.searchType !== this.props.searchType) {
          console.log("updating data and columns");
          this.setState({
            activeMiniTabIndex:
              this.props.searchType === "pacasesintial"
                ? 0
                : this.props.searchType === "pacasesappeals"
                ? 1
                : 0
          });
        }
      }
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
          GridAdvancedPaSearchState,
          keyof GridAdvancedPaSearchState
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

  onClickMiniTab = (selectedTabIndex: number) => {
    // let activeMiniTabIndex = 0;

    // const miniTabs = this.state.miniTabs.map(
    //   (miniTab: TabInfo, index: number) => {
    //     if (index === selectedTabIndex) {
    //       activeMiniTabIndex = index;
    //     }
    //     return miniTab;
    //   }
    // );

    // this.setState({ miniTabs, activeMiniTabIndex });
    this.props.onPriorAuthTabChange(selectedTabIndex)
  };

  tagRender(props) {
    const { label, value, closable, onClose } = props;
  
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  render() {
    const {lobOptions} = this.state;
    const classification = [
      "Exception",
      "Prior Auth"
    ];
    const caseTypeOption = [
      "Medicaid PA",
      "Exchange PA",
      "Commercial PA"
    ]
    const caseTypeOptionAppeal = [
      "Medicaid PA",
      "Exchange PA",
      "Commercial PA"
    ]
    const reviewStage = [
      "Review",
      "Awaiting AOR",
      "Outreach",
      "Clinical Review",
      "Approved",
      "Denied",
      "Withdrawn",
      "Cancelled",
      "IRE auto-forward"
    ];
    const priorityOptions = ["Standard", "Expedited"];
    const statusOptions = ["Open", "Approved", "Denied", "Other"];
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
      <>
        <FrxMiniTabs
          tabList={this.state.miniTabs}
          activeTabIndex={this.state.activeMiniTabIndex}
          onClickTab={this.onClickMiniTab}
        />
        <div className="advanced-grid-search">
          <div>
            <div className="advanced-grid-search__first-row">
              <div className="advanced-grid-search__input-field">
                <TextBox
                  className="advanced-grid-search__input"
                  placeholder="Member Info"
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
              <div className="advanced-grid-search__input-field">
                {this.state.activeMiniTabIndex === 0 ? (
                <TextBox
                  className="advanced-grid-search__input"
                  placeholder="Case ID"
                  name="claimId"
                  type="text"
                  value={claimId}
                  onChange={e => this.handleInputChange(e)}
                />
                ) : this.state.activeMiniTabIndex === 1 ?(
                  <TextBox
                  className="advanced-grid-search__input"
                  placeholder="Appeal Case Id"
                  name="claimId"
                  type="text"
                  value={claimId}
                  onChange={e => this.handleInputChange(e)}
                />
                ) : null}
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
                placeholder="Classification"
                options={classification}
                className="advanced-grid-search__input"
              />
              {this.state.activeMiniTabIndex === 0 ? (
              <DropDown
                placeholder="Case Type"
                options={caseTypeOption}
                className="advanced-grid-search__input"
              />
              ) : this.state.activeMiniTabIndex === 1 ? (
                <DropDown
                placeholder="Case Type"
                options={caseTypeOptionAppeal}
                className="advanced-grid-search__input"
              />
              ) : null}
              <DropDown
                placeholder="Review Stage"
                options={reviewStage}
                className="advanced-grid-search__input"
              />
              <DropDown
                placeholder="Priority"
                options={priorityOptions}
                className="advanced-grid-search__input"
              />
            </div>
            <div className="advanced-grid-search__first-row">
              <DropDown 
                  placeholder="LOB" 
                  options={lobOptions} 
                  className="advanced-grid-search__input"
              />
              {/* <Select
                mode="multiple"
                showArrow
                placeholder="LOB" 
                tagRender={this.tagRender}
                options={lobOptions}
                className="advanced-grid-search__input"
                suffixIcon={
                  <svg
                    className="ant-select-suffix"
                    width="6"
                    height="8"
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
              />, */}
              <DropDown
                placeholder="Status"
                options={statusOptions}
                className="advanced-grid-search__input"
              />
              <div className="advanced-grid-search__input-field">
                <TextBox
                  className="advanced-grid-search__input"
                  placeholder="Drug Label"
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
                placeholder="Start Date"
              />
              <CustomDatePicker
                className="advanced-grid-search__input advanced-grid-search__input--date"
                onChange={this.handleStartDate}
                value={this.state.startDate}
                placeholder="End Date"
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
      </>
    );
  }
}

export default GridAdvancedPaSearch;
