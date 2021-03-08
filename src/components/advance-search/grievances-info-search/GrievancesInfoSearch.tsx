import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select} from "antd";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import CustomDatePicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
import "./GrievancesInfoSearch.scss";

const {Option} = Select;

interface Props {}
interface State {}

class GrievancesInfoSearch extends Component<Props, State> {
  state = {
    startDate: "",
    endDate: "",
    categoryOptions: [],
    subCategoryOptions: [],
  };

  handleStartDate = (date) => {
    this.setState({startDate: date});
  };

  handleeEndDate = (date) => {
    this.setState({endDate: date});
  };

  onSelectType = (e) => {
    console.log("onSelectType", e);

    const cateoryOptionForMedical = [
      "Quality of Care",
      "Enrollment/Disenrollment",
      "Benefit Package",
      "Access",
      "Marketing",
      "Customer Service",
      "Organizational Determination/Appeal Process (Medicare Only)",
      "Prior Authorization/Appeal Process (non-Medicare Only)",
      "Grievances Related to CMS Issues (Medicare Only)",
      "Other",
    ];
    const categoryOptionsForPharmacy = [
      "Quality of Care",
      "Enrollment/Disenrollment",
      "Plan Benefits",
      "Pharmacy Access",
      "Customer Service",
      "Coverage Determination/Appeal Process (Medicare only)",
      "Prior Authorization/Appeal Process (non-Medicare only)",
      "CMS Issues (Medicare Only)",
      "Other",
    ];

    const subCategoryOptionsForMedical = [
      "Drug Access",
      "Benefit Design",
      "Drug Coverage",
      "Cost sharing",
      "Pharmacy",
      "Mail Order",
      "Specialty/Limited Access Drugs",
      "Claims submission / processing and payment information",
      "Information on extra help",
      "Maximum Out of Pocket",
      "Service area",
      "Explanation of Benefits (EOB)",
      "Communication Received (Letter, Oral, etc.)",
      "Other",
    ];

    const subCategoryOptionsForPharmacy = [
      "Best Available Evidence (BAE)",
      "Drug Access",
      "Benefit Design",
      "Drug Coverage",
      "Cost sharing",
      "Formulary including transition process",
      "Pharmacy",
      "Mail Order",
      "Specialty/Limited Access Drugs",
      "Claims submission / processing and payment information",
      "Information on extra help",
      "True out-of-pocket status (TrOOP)",
      "Maximum Out of Pocket",
      "Part D Member Benefit Stage",
      "Service area",
      "Explanation of Benefits (EOB)",
      "Medication Therapy Management (MTM)",
      "Communication Received (Letter, Oral, etc.)",
      "Other",
    ];

    switch (e) {
      case 0: //render option for category and subcategory dropdown when type is Medical
        this.setState({
          categoryOptions: cateoryOptionForMedical,
          subCategoryOptions: subCategoryOptionsForMedical,
        });
        break;
      case 1: //render option for category and subcategory dropdown when type is Pharmacy
        this.setState({
          categoryOptions: categoryOptionsForPharmacy,
          subCategoryOptions: subCategoryOptionsForPharmacy,
        });
        break;

      default:
        return;
    }
  };

  render() {
    const {categoryOptions, subCategoryOptions} = this.state;

    return (
      <div className="GrievancesInfoSearch">
        {/* main container start */}
        <Grid container className="grievance-info-search-container">
          {/* member info container start */}
          <Grid item container className="member-info-container">
            <Grid item sm={4} className="member-info-heading">
              Member Information
            </Grid>
            <Grid item sm={4} className="member-info-search-field">
              <Input
                className="member-search__input"
                placeholder="Member"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item sm={4} className="member-info-button">
              <Button className="new-grievance" disabled>
                + New Grievance
              </Button>
            </Grid>
          </Grid>
          {/* member info container end */}

          {/* Grievance Information section start */}

          <Grid item container className="member-info-container">
            <Grid item sm={4} className="member-info-heading">
              Grievance Information
            </Grid>
            <Grid item sm={4} className="member-info-search-field">
              <Input
                className="member-search__input"
                placeholder="Grievance ID"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
            </Grid>
            {/* <Grid item sm={4} className="member-info-button">
              <Button className="new-grievance">+ New Grievance</Button>
            </Grid> */}
          </Grid>

          {/* Grievance Information section end */}

          {/*other select field in griveance section contianer start  */}

          <Grid item container className="grievance-info-container">
            <Grid item sm={4} className="member-info-heading"></Grid>
            <Grid item sm={5} className="member-info-search-field">
              <Grid
                container
                item
                className="grievance-select-field-continer"
                sm={12}
              >
                <Grid item sm={6} className="category-field">
                  <DropDown
                    placeholder="Type"
                    className="category__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["Medical", "Pharmacy"]}
                    onSelect={this.onSelectType}
                  />
                </Grid>

                <Grid item sm={6} className="classification-field">
                  <DropDown
                    placeholder="Status"
                    className="classification__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["Open", "Closed", "Other"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Grid item sm={6} className="category-field">
                  <DropDown
                    placeholder="Category"
                    className="category__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={categoryOptions}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Grid item sm={6} className="classification-field">
                  <DropDown
                    placeholder="Sub Category"
                    className="category__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={subCategoryOptions}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>

                <Grid item sm={6} className="category-field">
                  <DropDown
                    placeholder="Classification"
                    className="classification__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["First Call Resolution", "Oral", "Written"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Grid item sm={6} className="classification-field">
                  <DropDown
                    placeholder="Priority"
                    className="category__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["Standard", "Expedited"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>

                <Grid item sm={6} className="category-field">
                  <DropDown
                    placeholder="Review Stage"
                    className="classification__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={[
                      "Review",
                      "Awaiting AOR",
                      "Withdrawn",
                      "Cancelled",
                      "Open",
                      "Closed",
                    ]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={3} className="member-info-button">
              {/* <Button className="new-grievance">+ New Grievance</Button> */}
            </Grid>
          </Grid>

          {/*  */}

          {/* data container start */}

          <Grid item container className="pa-info-date-container">
            <Grid item sm={4} className="date-heading">
              Dates
            </Grid>
            <Grid item container sm={5} className="date-container">
              <Grid item sm={6} className="date-start-date-contianer">
                <CustomDatePicker
                  className="start-date-picker__input "
                  onChange={this.handleStartDate}
                  value={this.state.startDate}
                  placeholder="Start Date"
                />
              </Grid>
              <Grid item sm={6} className="date-end-date-contianer">
                <CustomDatePicker
                  className="end-date-picker__input"
                  onChange={this.handleeEndDate}
                  value={this.state.endDate}
                  placeholder="End Date"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* date container ends */}
        </Grid>
        {/* main container end*/}
      </div>
    );
  }
}

export default GrievancesInfoSearch;
