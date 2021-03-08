import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import ValidationStartsCard from "../FormularyDashboardStats/FormularyDashboardStatsChart/FormularyDashboardStatsChart";
import Comment from "./Comment/Comment";
import Card from "./Card/Card";
import "./Validation.css";
import { dateFormat } from "../../utils/common";
import {
  getValidationList,
  getValidationListNotes,
  postValidationListNote,
  clearValidationListNotes
} from "../../redux/slices/formulary/validation/validationActionCreation";
import ValidationBody from "./ValidationBody";

export class ValidationTab extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      validationSummary: { total: 0, failed: 0, warning: 0, passed: 0 },
      validations: [],
      note: "",
      activeAccordian: ""
    };
  }

  componentDidMount() {
    this.props.getValidationList(this.props.current_formulary);
  }

  memoizeBgColor() {
    console.log("object");
  }

  initializeValidationData(validation) {
    // console.log(validation);
    let validations: any = [];
    let item = {};
    validation.validations.forEach(element => {
      // console.log("Validations: ", element);
      let prefered_count = 0;
      let failed = 0;
      let warning = 0;
      let passed = 0;
      let status: string = "";
      const display_date =
        element.latest_note_added_time != null
          ? dateFormat.dateFormat(element.latest_note_added_time)
          : "No notes";
      if (element.children && element.children.length > 0) {
        element.children.forEach(childElement => {
          switch (childElement.validation_status) {
            case "F":
              failed = failed + 1;
              break;
            case "W":
              warning = warning + 1;
              break;
            case "P":
              passed = passed + 1;
              break;
          }
        });
        if (failed > 0) {
          prefered_count = failed;
          status = "F";
        } else if (warning > 0) {
          prefered_count = warning;
          status = "W";
        } else if (passed > 0) {
          prefered_count = passed;
          status = "P";
        }
      }
      let users: any[] = [];
      let awsFileURL = "https://frx-document-delivery.s3.amazonaws.com/";
      if (element.users && element.users.length > 0) {
        let usersList: any[] = element.users.filter(x => x.name !== null);
        usersList.forEach(u => {
          users.push({
            name: u.name,
            logo_path:
              u.logo_path === null ? "empty-avatar" : awsFileURL + u.logo_path
          });
        });
      }
      // user.logo_path = environment.awsFileURL + user.logo_path
      item = {
        ...element,
        status: status,
        prefered_count: prefered_count,
        display_date: display_date,
        users: users
      };
      validations = [...validations, item];
    });

    this.setState({
      validationSummary: validation.validation_summary,
      validations: [...validations]
    });
  }

  handleNotesList = (toggle: string | string[], id: number) => {
    console.log(toggle);
    if (toggle) {
      this.setState({ activeAccordian: toggle });
      this.props.getValidationListNotes(id);
    } else {
      this.props.clearValidationListNotes();
    }
  };

  reInitializeValidationData = notesList => {
    let validations: any = [];
    let item = {};
    this.props?.validationData?.validations.forEach(element => {
      // console.log("Validations: ", element);
      let prefered_count = 0;
      let failed = 0;
      let warning = 0;
      let passed = 0;
      let status: string = "";
      const display_date =
        element.latest_note_added_time != null
          ? dateFormat.dateFormat(element.latest_note_added_time)
          : "No notes";
      if (element.children && element.children.length > 0) {
        element.children.forEach(childElement => {
          switch (childElement.validation_status) {
            case "F":
              failed = failed + 1;
              break;
            case "W":
              warning = warning + 1;
              break;
            case "P":
              passed = passed + 1;
              break;
          }
        });
        if (failed > 0) {
          prefered_count = failed;
          status = "F";
        } else if (warning > 0) {
          prefered_count = warning;
          status = "W";
        } else if (passed > 0) {
          prefered_count = passed;
          status = "P";
        }
      }
      let users: any[] = [];
      let awsFileURL = "https://frx-document-delivery.s3.amazonaws.com/";
      if (element.users && element.users.length > 0) {
        let usersList: any[] = element.users.filter(x => x.name !== null);
        usersList.forEach(u => {
          users.push({
            name: u.name,
            logo_path:
              u.logo_path === null ? "empty-avatar" : awsFileURL + u.logo_path
          });
        });
      }
      // user.logo_path = environment.awsFileURL + user.logo_path
      item = {
        ...element,
        status: status,
        prefered_count: prefered_count,
        display_date: display_date,
        users: users
      };
      validations = [...validations, item];
    });

    // const validations = [...this.props?.validationData?.validations];
    validations.forEach(val => {
      if (notesList.validation_id === val.id_formulary_validation) {
        val["notes"] = notesList.notes;
      }
    });

    this.setState({
      validations
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.validationData.validations.length > 0)
      this.initializeValidationData(nextProps.validationData);
    if (Object.keys(nextProps.validationNotes).length) {
      this.reInitializeValidationData(nextProps.validationNotes);
    }
  }

  handleNoteChange = event => {
    this.setState({
      note: event.target.value
    });
  };

  addNote = id => {
    const body: any = {
      id_formulary_validation: id,
      note: { note: this.state.note }
    };
    this.props.postValidationListNote(body).then(res => {
      this.handleNotesList(["1"], id);
      this.reInitializeValidationData(this.props.validationNotes);
    });
    this.setState({
      note: ""
    });
  };
  componentWillUnmount() {
    this.props.clearValidationListNotes();
  }

  render() {
    const { validationSummary, validations, note } = this.state;
    return (
      <div className="formulary-root-validation validation">
        <ValidationSummarySection summary={validationSummary} />

        {validations.length > 0 &&
          validations.map(validation => (
            <div key={validation.id_formulary_validation}>
              <ValidationBody
                validation={validation}
                updateNotesList={this.handleNotesList}
                note={note}
                activeAccordian={this.state.activeAccordian}
                handleNoteChange={this.handleNoteChange}
                addNote={this.addNote}
              />
            </div>
          ))}
      </div>
    );
  }
}

// Summary Section
function ValidationSummarySection({
  summary: { total, failed, warning, passed }
}) {
  return (
    <Paper elevation={0} style={{ marginBottom: "3rem" }}>
      <div className="title">Summary of Checks and Validations</div>
      <div className="container">
        <ValidationStartsCard total={total} isValidation={true}/>
        <Card label="Failed" value={failed} color="rgba(252,120,120,0.75)" />
        <Card label="Warning" value={warning} color="rgba(245,195,140,0.75)" />
        <Card label="Passed" value={passed} color="rgba(176,223,165,0.75)" />
      </div>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary_id,
    validationData: state.validationReducer.validationData,
    validationNotes: state.validationNotesReducer.validationNotesListData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getValidationList: formularyId => dispatch(getValidationList(formularyId)),
    getValidationListNotes: (validationId: number) =>
      dispatch(getValidationListNotes(validationId)),
    postValidationListNote: (body: any) =>
      dispatch(postValidationListNote(body)),
    clearValidationListNotes: () => dispatch(clearValidationListNotes)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidationTab);
