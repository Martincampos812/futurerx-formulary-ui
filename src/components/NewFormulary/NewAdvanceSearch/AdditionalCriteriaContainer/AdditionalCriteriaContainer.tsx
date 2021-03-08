import React, { Component } from "react";

import "./AdditionalCriteriaContainer.scss";
import { connect } from "react-redux";
import { getDrugDetailsPOSSettings } from "../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import { Button } from "@material-ui/core";
import { setAdditionalCriteria } from "../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import AdditionalCriteria from "../AdditionalCriteriaContainer/AdditionalCriteria/AdditionalCriteria";

function mapDispatchToProps(dispatch) {
  return {
    getPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getPRSettings: (a) => dispatch(getDrugDetailsPRSettings(a)),

    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    // additional criteria state
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    isNewAdditionalCriteria: state?.additionalCriteria?.isNewAdditionalCriteria,
    populateGrid: state?.additionalCriteria?.populateGrid,
    closeDialog: state?.additionalCriteria?.closeDialog,
    listItemStatus: state?.additionalCriteria?.listItemStatus,

    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};
interface AdditionalCriteriaContainerState {
  additionalCriteriaArray: any[];
  sequence: number;
}
/**
 * @class AdditionalCriteriaContainer
 * @author SantoshJS
 */
class AdditionalCriteriaContainer extends Component<
  any,
  AdditionalCriteriaContainerState
> {
  state = {
    additionalCriteriaArray: [],
    sequence: 0,
  };

  componentDidMount() {
    if (this.props.additionalCriteriaBody)
      this.setState({
        additionalCriteriaArray: this.props.additionalCriteriaBody,
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.additionalCriteriaBody)
      this.setState({
        additionalCriteriaArray: this.props.additionalCriteriaBody,
      });
  }

  handleAddNewClick = () => {
    let sequence = this.state.sequence;
    sequence++;
    if (this.state.additionalCriteriaArray.length < 5) {
      this.setState({
        additionalCriteriaArray: [
          ...this.state.additionalCriteriaArray,
          {
            sequence: sequence,
            covered: {},
            not_covered: {},
          },
        ],
        sequence,
      });
    }
  };

  deleteAdditionalCriteria = (additionalCriteriaId: number) => {
    const additionalCriterias = this.state.additionalCriteriaArray.filter(
      (additionalCriteria: any) =>
        additionalCriteria.sequence !== additionalCriteriaId
    );

    this.setState({
      additionalCriteriaArray: additionalCriterias,
    });
  };

  handleChildDataSave = (additionalCriteria) => {
    this.props.handleChildDataSave(additionalCriteria);
  };

  render() {
    const { criteriaList } = this.props;
    return (
      <div
        className={
          this.props.isReadOnly
            ? "__root-additional-criteria-read-only"
            : "__root-additional-criteria"
        }
      >
        {this.state?.additionalCriteriaArray?.length <= 0
          ? !this.props.isReadOnly && (
              <div className="__root-additional-criteria-child-msg">
                <p>Click Add New to create Additional Criteria</p>
              </div>
            )
          : this.state?.additionalCriteriaArray?.map(
              (additionalCriteria: any) => (
                <div
                  className={
                    this.props.isReadOnly
                      ? "__root-additional-criteria-read-only-child"
                      : "__root-additional-criteria-child"
                  }
                  key={additionalCriteria.sequence}
                >
                  <svg
                    className={
                      this.props.isReadOnly
                        ? "__root-additional-criteria-read-only-child-swapper"
                        : "__root-additional-criteria-child-swapper"
                    }
                    width="6"
                    height="16"
                    viewBox="0 0 6 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.97993 9.87637C3.03294 9.8763 3.08544 9.88669 3.13443 9.90695C3.18341 9.9272 3.22792 9.95692 3.2654 9.9944C3.30289 10.0319 3.33261 10.0764 3.35286 10.1254C3.37312 10.1744 3.38351 10.2269 3.38344 10.2799L3.38344 14.4768L4.99511 12.8652C5.07069 12.7896 5.17319 12.7471 5.28008 12.7471C5.38696 12.7471 5.48947 12.7896 5.56504 12.8652C5.64062 12.9407 5.68308 13.0432 5.68308 13.1501C5.68308 13.257 5.64062 13.3595 5.56504 13.4351L3.28531 15.7148C3.20974 15.7904 3.10723 15.8329 3.00035 15.8329C2.89346 15.8329 2.79096 15.7904 2.71538 15.7148L2.70747 15.7069C2.7031 15.7029 2.69881 15.6988 2.6946 15.6946C2.6904 15.6904 2.68629 15.6861 2.68229 15.6817L0.435649 13.4351C0.360071 13.3595 0.317612 13.257 0.317612 13.1501C0.317612 13.0432 0.360071 12.9407 0.435649 12.8652C0.511227 12.7896 0.613732 12.7471 0.720615 12.7471C0.827498 12.7471 0.930004 12.7896 1.00558 12.8652L2.57642 14.436L2.57642 10.2799C2.57635 10.2269 2.58674 10.1744 2.607 10.1254C2.62725 10.0764 2.65697 10.0319 2.69445 9.9944C2.73194 9.95692 2.77645 9.9272 2.82543 9.90695C2.87442 9.88669 2.92692 9.8763 2.97993 9.87637ZM2.57642 1.56447L2.57642 5.72042C2.57642 5.82744 2.61893 5.93007 2.6946 6.00574C2.77028 6.08142 2.87291 6.12393 2.97993 6.12393C3.08695 6.12393 3.18958 6.08142 3.26526 6.00574C3.34093 5.93007 3.38344 5.82744 3.38344 5.72042V1.52347L4.99519 3.13522C5.07077 3.2108 5.17328 3.25326 5.28016 3.25326C5.38704 3.25326 5.48955 3.2108 5.56513 3.13522C5.6407 3.05964 5.68316 2.95714 5.68316 2.85025C5.68316 2.74337 5.6407 2.64087 5.56513 2.56529L3.28539 0.285557C3.20982 0.209979 3.10731 0.167521 3.00043 0.16752C2.89355 0.16752 2.79104 0.20998 2.71546 0.285558L2.712 0.289021C2.70599 0.294347 2.70014 0.299858 2.69445 0.305547C2.68876 0.311237 2.68325 0.317089 2.67793 0.323093L0.435731 2.56529C0.360153 2.64087 0.317694 2.74337 0.317694 2.85025C0.317694 2.95714 0.360153 3.05964 0.435731 3.13522C0.511309 3.2108 0.613814 3.25326 0.720698 3.25326C0.827581 3.25326 0.930086 3.2108 1.00566 3.13522L2.57642 1.56447Z"
                      fill="#707683"
                    />
                  </svg>
                  <div
                    className={
                      this.props.isReadOnly
                        ? "__root-additional-criteria-read-only-child-accordion"
                        : "__root-additional-criteria-child-accordion"
                    }
                  >
                    <AdditionalCriteria
                      criteriaList={criteriaList}
                      additionalCriteria={additionalCriteria}
                      handleChildDataSave={this.handleChildDataSave}
                      isReadOnly={this.props.isReadOnly}
                      editable={this.props.editable}
                    />
                  </div>
                  {!this.props.isReadOnly && (
                    <svg
                      onClick={
                        this.props.editable
                          ? undefined
                          : () => {
                              this.deleteAdditionalCriteria(
                                additionalCriteria.sequence
                              );
                            }
                      }
                      className="__root-additional-criteria-child-delete"
                      width="13"
                      height="15"
                      viewBox="0 0 13 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                        fill="#999999"
                      />
                    </svg>
                  )}
                </div>
              )
            )}
        {!this.props.isReadOnly && (
          <div className="__root-additional-criteria-add-new">
            <Button
              // disabled={this.state.additionalCriteriaArray.length > 5}
              className={"Button advanced-grid-search__btn-clear"}
              onClick={() => this.handleAddNewClick()}
              disabled={this.props.editable}
            >
              <svg
                className="advanced-grid-search__btn-clear--clearicon"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.0312 15.0314C18.3507 11.712 18.3507 6.33007 15.0312 3.01059C11.7117 -0.308894 6.32985 -0.308851 3.01041 3.01059C-0.309032 6.33003 -0.309075 11.7119 3.01041 15.0314C6.32989 18.3509 11.7118 18.3508 15.0312 15.0314ZM14.3241 14.3243C17.2531 11.3954 17.253 6.6466 14.3241 3.7177C11.3952 0.788796 6.64646 0.788752 3.71751 3.7177C0.788571 6.64664 0.788615 11.3954 3.71751 14.3243C6.64641 17.2532 11.3952 17.2532 14.3241 14.3243Z"
                  fill="#707683"
                />
                <path
                  d="M4.52082 9.02099C4.52082 9.29713 4.74468 9.52099 5.02082 9.52099H8.52082V13.021C8.52082 13.2971 8.74468 13.521 9.02082 13.521C9.29696 13.521 9.52082 13.2971 9.52082 13.021V9.52099L13.0208 9.52099C13.297 9.52099 13.5208 9.29713 13.5208 9.02099C13.5208 8.74485 13.297 8.52099 13.0208 8.52099H9.52082L9.52082 5.02099C9.52082 4.74485 9.29696 4.52099 9.02082 4.52099C8.74468 4.52099 8.52082 4.74485 8.52082 5.02099V8.52099H5.02082C4.74468 8.52099 4.52082 8.74485 4.52082 9.02099Z"
                  fill="#707683"
                />
              </svg>
              <span>Add New</span>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalCriteriaContainer);
