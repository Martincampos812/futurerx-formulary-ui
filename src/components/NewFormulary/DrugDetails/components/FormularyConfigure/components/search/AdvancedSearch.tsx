import React from "react";
import FrxDialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import Grid from "@material-ui/core/Grid";
import { Button, Input, Box } from "@material-ui/core";
import { Select } from "antd";
import "./AdvancedSearch.scss";
import { getSearchMock } from "../../../../../../../mocks/formulary/searchMock";
import CategoryForm from "./CategoryForm";
import SearchCategory from "./SearchCategory";
import { setAdvancedSearch } from "../../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

const { Option } = Select;

interface AdvancedSearchPopupProps {
  openPopup: boolean;
  onClose: () => void;
  category: string;
  setAdvancedSearch: (a) => void;
}

interface CategoryData {
  id: number;
  category: string;
}

interface AdvancedSearchPopupState {
  categoriesData: Array<CategoryData>;
  activeCategoryIndex: number;
  activeCategoryTitle: string;
  formArray: any;
  formCount: number;
  checkBoxOpt: any;
  additionalFilter: any;
}

class AdvancedSearchPopup extends React.Component<
  AdvancedSearchPopupProps,
  AdvancedSearchPopupState
> {
  state: AdvancedSearchPopupState = {
    categoriesData: getSearchMock(),
    activeCategoryIndex: 0,
    activeCategoryTitle: "",
    formCount: 0,
    formArray: [],
    checkBoxOpt: {
      1: [
        { id: 1, text: "Formulary File" },
        { id: 2, text: "Prior Authorization File" },
        { id: 3, text: "Step Therapy File" },
        { id: 4, text: "Indication-Based Coverage File" },
      ],
      2: [
        { id: 1, text: "Tire1" },
        { id: 2, text: "Tire2" },
        { id: 3, text: "Tire3" },
        { id: 4, text: "Tire4" },
        { id: 5, text: "Tire5" },
        { id: 6, text: "Tire6" },
      ],
    },
    additionalFilter: {
      is_pa: false,
      is_st: false,
    },
  };

  constructor(props) {
    super(props);
  }

  /**
   *@function onClose
   *
   * Close the member notes popup
   *
   * @memberof AdvancedSearchPopup
   */

  onClose = () => {
    this.props.onClose();
  };

  /**
   * Action method if any action is required for dialog popup
   *
   * @memberof AdvancedSearchPopup
   */
  action = () => {
    console.log("no action to perform");
  };

  /**
   *Fetch notes details for all categories and filter specific category notes
   *
   * @param {string} type
   * @param {number} index
   * @param {*} [item]
   * @memberof AdvancedSearchPopup
   */
  handleListItemClick = (e, index: any) => {
    const title = index.category;
    const catid = index.id;
    const checkIndex = this.state.formArray.findIndex((v) => v.type === title);
    if (checkIndex === -1) {
      this.setState({
        formArray: [...this.state.formArray, { type: title, id: catid }],
        activeCategoryIndex: index.id,
      });
    }
  };

  deleteFormHandler = (getIndex: number) => {
    let updatedForms = [...this.state.formArray];
    updatedForms.splice(getIndex, 1);
    this.setState({
      formArray: updatedForms,
    });
  };

  clearSelected = () => {
    this.state.additionalFilter.is_pa = false;
    this.state.additionalFilter.is_st = false;
    this.setState({
      formArray: [],
    });
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
    };
    payload.advancedSearchBody["additional_filter"] = {
      is_pa: this.state.additionalFilter.is_pa,
      is_st: this.state.additionalFilter.is_st,
      is_add: false,
      is_all_tiers: false,
      is_exd: false,
      is_fff: false,
      is_frf: false,
      is_hi: false,
      is_ibf: false,
      is_lis: false,
      is_non_frf: false,
      is_otc: false,
      is_pgc: false,
      is_user_defined1: false,
      is_user_defined2: false,
      is_user_defined3: false,
      is_user_defined4: false,
      is_user_defined5: false,
    };
    payload.advancedSearchBody["covered"] = {};
    payload.advancedSearchBody["not_covered"] = {};
    payload.advancedSearchBody["is_advance_search"] = false;
    payload.populateGrid = true;
    this.props.setAdvancedSearch(payload);
  };

  handleFormularyFileSelection = (event, value) => {
    switch (value) {
      case "Prior Authorization File":
        this.state.additionalFilter.is_pa = event.target.checked;
        break;
      case "Step Therapy File":
        this.state.additionalFilter.is_st = event.target.checked;
        break;
      default:
        break;
    }
  };

  valueSelectionHandler = (event, value, type) => {
    console.log(
      "ADVANCED SEARCH: Event:" +
        JSON.stringify(event.target.checked) +
        " Value:" +
        value +
        " Type:" +
        type
    );
    switch (type) {
      case "Formulary File":
        this.handleFormularyFileSelection(event, value);
        break;
      default:
        break;
    }
  };

  applySearch = () => {
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: true,
    };
    payload.advancedSearchBody["additional_filter"] = {
      is_pa: this.state.additionalFilter.is_pa,
      is_st: this.state.additionalFilter.is_st,
      is_add: false,
      is_all_tiers: false,
      is_exd: false,
      is_fff: false,
      is_frf: false,
      is_hi: false,
      is_ibf: false,
      is_lis: false,
      is_non_frf: false,
      is_otc: false,
      is_pgc: false,
      is_user_defined1: false,
      is_user_defined2: false,
      is_user_defined3: false,
      is_user_defined4: false,
      is_user_defined5: false,
    };
    payload.advancedSearchBody["covered"] = {};
    payload.advancedSearchBody["not_covered"] = {};
    payload.advancedSearchBody["is_advance_search"] = true;
    payload.populateGrid = true;

    this.props.setAdvancedSearch(payload);
  };

  render() {
    let formContent = (
      <div className="noForms">
        Drag the file type(s) from the list on the left to create a filter.
      </div>
    );
    if (this.state.formArray.length > 0) {
      formContent = this.state.formArray.map((a, index: number) => (
        <CategoryForm
          title={a.type}
          index={index}
          deleteField={this.deleteFormHandler}
          checkBoxOpt={this.state.checkBoxOpt[a.id]}
          catid={a.id}
          selectionHandler={this.valueSelectionHandler}
        />
      ));
    }

    return (
      <div>
        <React.Fragment>
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title="Advance Search"
            handleClose={this.onClose}
            handleAction={this.action}
            open={this.props.openPopup}
            showActions={false}
            className="drug-grid-advance-search member-notes-popup-root"
            height="80%"
            width="90%"
          >
            <Grid
              container
              spacing={0}
              className="drug-grid-popup-root__dialog"
            >
              <Grid
                xs={3}
                className="member-notes-popup-root__dialog__categories"
                alignContent="flex-start"
                key={0}
                item
              >
                <SearchCategory
                  handleListItemClick={this.handleListItemClick}
                  categoriesData={this.state.categoriesData}
                  activeCategoryIndex={this.state.activeCategoryIndex}
                />
              </Grid>
              <Grid
                className="form-wrapper-root member-notes-popup-root__dialog__category-notes"
                item
                xs={9}
              >
                <Box className="right-content">
                  <div className="formWrappers">{formContent}</div>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    className="button-wrapper"
                  >
                    <Button
                      className="Button advanced-grid-search__btn-clear"
                      onClick={this.clearSelected}
                    >
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
                    <button
                      className="Button member-notes-popup-root__dialog__category-notes_form__submit-btn"
                      onClick={this.applySearch}
                    >
                      Apply Search
                    </button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FrxDialogPopup>
        </React.Fragment>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchPopup);
