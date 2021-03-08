import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { connect } from "react-redux";

import "./FileType.scss";

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a))
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id
  };
};

interface Props {
  fileFiltersChanged: (a) => void;
  advancedSearchBody: any;
  formulary_lob_id: any;
}
interface State { }

const fileTypes = [
  {
    id: 1,
    lable: "Formulary",
    types: [
      { id: 1, lable: "Prior Authorization File", key: 'is_pa' },
      { id: 2, lable: "Step Therapy File", key: 'is_st' },
      { id: 3, lable: "Indication-Based Coverage File", key: 'NA1' },
    ],
  },
  {
    id: 2,
    lable: "Supplemental",
    types: [
      { id: 1, lable: "Free First Fill (FFF)", key: 'is_fff' },
      { id: 2, lable: "Home Infusion", key: 'is_hi' },
      { id: 3, lable: "Partial Gap Coverage", key: 'is_pgc' },
    ],
  },
  {
    id: 3,
    lable: "Other",
    types: [
      { id: 1, lable: "Value-Based Insurance Design (VBID)", key: 'is_vbid' },
      { id: 2, lable: "LIS Caost-Sharing Reduction File", key: 'is_lis' },
    ],
  },
];

const fileTypesNonMcr = [
  {
    id: 1,
    lable: "Formulary",
    types: [
      { id: 1, lable: "Prior Authorization File", key: 'is_pa' },
      { id: 2, lable: "Step Therapy File", key: 'is_st' },
    ],
  },
  {
    id: 2,
    lable: "Supplemental",
    types: [
      { id: 1, lable: "Free First Fill (FFF)", key: 'is_fff' }
    ],
  }
];

interface TypeObject {
  id: number;
  lable: string;
  isChecked: boolean;
}
interface FileObject {
  id: number;
  lable: string;
  isChecked: boolean;
  types: Array<TypeObject>;
}

class FileType extends Component<Props, State> {
  state = {
    fileTypes: [],
    checkedList: [],
  };

  componentDidMount = () => {
    let keystoSet = Array();
    if (this.props.advancedSearchBody && this.props.advancedSearchBody.additional_filter) {
      keystoSet = Object.keys(this.props.advancedSearchBody.additional_filter).filter(key => this.props.advancedSearchBody.additional_filter[key] === true);
    }
    if (this.props.formulary_lob_id == 1) {
      const checkList = fileTypes.map((file) => {
        let parentChecked = true;
        file.types.map((type) => {
          let value = keystoSet.includes(type['key']);
          type["isChecked"] = value;
          parentChecked = parentChecked && value;
          return type;
        });
        file["isChecked"] = parentChecked;
        return file;
      });
      console.log("[checkList]:", checkList);
      this.props.fileFiltersChanged(checkList);
      this.setState({ fileTypes: checkList });
    } else {
      const checkList = fileTypesNonMcr.map((file) => {
        let parentChecked = true;
        file.types.map((type) => {
          let value = keystoSet.includes(type['key']);
          type["isChecked"] = value;
          parentChecked = parentChecked && value;
          return type;
        });
        file["isChecked"] = parentChecked;
        return file;
      });
      console.log("[checkList]:", checkList);
      this.props.fileFiltersChanged(checkList);
      this.setState({ fileTypes: checkList });
    }
  };

  onParentCheck = (e, parentId) => {
    const updateCheckBoxStatus: Array<FileObject> = this.state.fileTypes.map(
      (file: FileObject) => {
        if (file.id == parentId) {
          file["isChecked"] = e.target.checked;
          file.types.map((types) => (types["isChecked"] = e.target.checked));
        }
        return file;
      }
    );
    console.log("[updateCheckBoxStatus]:", updateCheckBoxStatus);
    console.log("[currentCheckBoxStatus]:", e.target.checked);

    this.props.fileFiltersChanged(updateCheckBoxStatus);
    this.setState({ fileTypes: updateCheckBoxStatus });
  };

  onChildChekBoxClicked = (e, parentId, id) => {
    console.log("[childCheckBox]:", e.target.checked);
    console.log("[parentId]:", parentId);
    console.log("[chilId]:", id);
    const updateCheckBoxStatus: Array<FileObject> = this.state.fileTypes.map(
      (file: FileObject) => {
        if (file.id == parentId) {
          // file["isChecked"] = e.target.checked;
          let parentCheckBoxStatus;

          file.types.map((type) => {
            if (type.id === id) {
              type["isChecked"] = e.target.checked;
            }
            if (type.isChecked) {
              parentCheckBoxStatus = true;
            } else {
              parentCheckBoxStatus = false;
            }
            return type;
          });
          // file.isChecked = parentCheckBoxStatus;
          let newParentCheckBoxState = file.types.reduce((acc, type) => {
            acc = acc && type.isChecked;

            return acc;
            // if (type.isChecked) {
            //   acc = acc && type.isChecked;
            // } else {
            //   acc = acc && type.isChecked;
            // }
          }, parentCheckBoxStatus);
          console.log(
            "[newParentCheckBoxState(parentCheckbox)]:",
            newParentCheckBoxState
          );
          file.isChecked = newParentCheckBoxState;
        }

        return file;
      }
    );

    this.props.fileFiltersChanged(updateCheckBoxStatus);
    this.setState({ fileTypes: updateCheckBoxStatus });
  };

  render() {
    const { fileTypes } = this.state;
    return (
      <div className="__root-filetype-contianer">
        <Grid container className="__main-grid-container">
          {fileTypes.length == 0 ? null : (
            <>
              {fileTypes.map((file: any) => (
                //   <Grid container>
                <Grid item sm={4} className="__item-grid-sm-4-container">
                  <div key={file.id} className="__root_file_type_category">
                    <div className="__fileTypeHeader-wrapper">
                      <Checkbox
                        color="primary"
                        size="small"
                        checked={file.isChecked}
                        onClick={(e) => this.onParentCheck(e, file.id)}
                      />
                      <label htmlFor="" className="__file-lable">
                        {file.lable}
                      </label>
                    </div>

                    <div className="__file_types_wraper">
                      {file.types.map((type) => (
                        <div key={type.id} className="__filt_type_list">
                          <Checkbox
                            color="primary"
                            size="small"
                            checked={type.isChecked}
                            onClick={(e) =>
                              this.onChildChekBoxClicked(e, file.id, type.id)
                            }
                          />
                          <label htmlFor="" className="__type-lable">
                            {type.lable}
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* </Grid> */}
                  </div>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileType);
