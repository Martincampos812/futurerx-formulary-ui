import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import Card from "./Card/Card";
import "./Validation.css";
import Button from "@material-ui/core/Button";
import { dateFormat } from "../../../utils/common";
import {
  loadInitialState,
  fetchValidations,
  fetchNotes,
  postNote,
} from "../../../redux/slices/formulary/validation/validationSlice";
import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";
import {
  GET_VALIDATIONS,
  GET_VALIDATION_NOTES,
  POST_VALIDATION_NOTE,
} from "../../../api/http-common-fetch";
import ValidationBody from "./ValidationBody";
import FrxLoader from "../../shared/FrxLoader/FrxLoader";
import ValidationStartsCard from "../../FormularyDashboardStats/FormularyDashboardStatsChart/FormularyDashboardStatsChart";
import { COLORS } from "./helperStrings";

interface UserColorModel {}

class ValidationTab extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      colorsIndex: 0,
      validationSummary: { total: 0, failed: 0, warning: 0, passed: 0 },
      validations: [],
      note: "",
      activeAccordian: "",
      reviewValidation: false,
      usersColor: {},
    };

    this.addNote = this.addNote.bind(this);
    this.getUniqueMemoizedColorToUser = this.getUniqueMemoizedColorToUser.bind(
      this
    );
  }

  async componentDidMount() {
    await this.loadValidationsList();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", prevProps.validations);
  //   // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.props.validations);
  //   if (
  //     this.props.validations.list &&
  //     this.props.validations.list.length !== prevProps.validations.list.length
  //   ) {
  //     console.log("this is update ran now");
  //   }
  // }

  async loadValidationsList() {
    let payload = {
      apiPart: GET_VALIDATIONS,
      pathParams: this.props.current_formulary,
    };
    await this.props.fetchValidations(payload);
  }

  getUniqueMemoizedColorToUser() {
    console.log("object");
  }

  initializeValidationData(validation) {
    let validations: any[] = [];
    let item = {};
    let index: number = this.state.colorsIndex;
    let usersColor: any = this.state.usersColor;
    const newValidation =
      validation.list.length !== this.state.validations.length;
    validation.list.forEach((val) => {
      let prefered_count = 0;
      let failed = 0;
      let warning = 0;
      let passed = 0;
      let status: string = "";
      const display_date =
        val.latest_note_added_time != null
          ? dateFormat.dateFormat(val.latest_note_added_time)
          : "No notes";
      if (val.children && val.children.length > 0) {
        val.children.forEach((childElement) => {
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
      if (val.users && val.users.length > 0) {
        let usersList: any[] = val.users.filter((x) => x.name !== null);

        usersList.forEach((u) => {
          users.push({
            name: u.name,
            logo_path:
              u.logo_path === null ? "empty-avatar" : awsFileURL + u.logo_path,
          });

          // usersColor
        });
        if (newValidation)
          usersList.forEach((user) => {
            if (index === 23) {
              index = 0;
            }
            usersColor = {
              ...usersColor,
              [user.name]: {
                name: user.name,
                logo:
                  user.logo_path === null
                    ? "empty-avatar"
                    : awsFileURL + user.logo_path,
                color: COLORS[index],
              },
            };
            index++;
          });
      }
      item = {
        ...val,
        status: status,
        prefered_count: prefered_count,
        display_date: display_date,
        users: users,
      };
      validations = [...validations, item];
    });

    this.setState({
      validationSummary: validation.summary,
      validations: [...validations],
      colorsIndex: index,
      usersColor,
    });
  }

  handleNotesList = (toggle: string | string[], id: number) => {
    if (toggle) {
      let payload = {
        apiPart: GET_VALIDATION_NOTES,
        pathParams: id,
      };
      this.setState({ activeAccordian: toggle });
      this.props.fetchNotes(payload);
    } else {
      this.setState({ activeAccordian: "" });
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.validations).length > 0)
      this.initializeValidationData(nextProps.validations);
  }

  handleNoteChange = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  async addNote(id) {
    const payload = {
      addNote: {
        apiPart: POST_VALIDATION_NOTE,
        pathParams: id,
        messageBody: {
          note: this.state.note,
        },
      },
      getValidations: {
        apiPart: GET_VALIDATIONS,
        pathParams: this.props.current_formulary,
      },
      mapNotes: {
        apiPart: GET_VALIDATION_NOTES,
        pathParams: id,
      },
    };
    await this.props.postNote(payload);
    this.setState({
      note: "",
    });
  }

  componentWillUnmount() {
    const INITIAL_STATE = {
      isLoading: false,
      payload: {
        validations: {},
        notes: null,
        response: null,
      },
      error: null,
    };
    this.props.loadInitialState(INITIAL_STATE);
  }

  render() {
    const { validations } = this.state;
    return (
      <div className="formulary-root-validation validation">
        <ValidationSummarySection summary={this.state.validationSummary} />
        {validations.length > 0 &&
          validations.map((validation) => (
            <div key={validation.id_formulary_validation}>
              <ValidationBody
                validation={validation}
                updateNotesList={this.handleNotesList}
                note={this.state.note}
                activeAccordian={this.state.activeAccordian}
                handleNoteChange={this.handleNoteChange}
                addNote={this.addNote}
                usersColor={this.state.usersColor}
              />
            </div>
          ))}
        <div className="continue-btn-wrapper">
          <Button
            className="continue-btn"
            onClick={() => this.setState({ reviewValidation: true })}
          >
            <span>Continue</span>
          </Button>
        </div>
        {this.state.reviewValidation && (
          <DialogPopup
            className=""
            open={this.state.reviewValidation}
            positiveActionText="Yes, Continue"
            negativeActionText="No"
            title="REVIEW VALIDATIONS"
            showCloseIcon
            showActions={true}
            handleClose={() => this.setState({ reviewValidation: false })}
            handleAction={() => window.location.reload()}
          >
            <p>
              Review all failed and warning validations prior to moving to the
              next page. <br /> <b>Are you sure you want to continue?</b>
            </p>
          </DialogPopup>
        )}
        {this.props.isLoading && <FrxLoader />}
      </div>
    );
  }
}

// Summary Section
function ValidationSummarySection({
  summary: { total, failed, warning, passed },
}) {
  return (
    <Paper elevation={0} style={{ marginBottom: "3rem" }}>
      <div className="title">Summary of Checks and Validations</div>
      <div className="container">
        <ValidationStartsCard total={total} />
        <Card label="Failed" value={failed} color="rgba(252,120,120,0.75)" />
        <Card label="Warning" value={warning} color="rgba(245,195,140,0.75)" />
        <Card label="Passed" value={passed} color="rgba(176,223,165,0.75)" />
      </div>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.validation.isLoading,
    current_formulary: state.application.formulary_id,
    validations: state.validation.payload.validations,
    notes: state.validation.payload.notes,
    response: state.validation.payload.response,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadInitialState: (payload) => dispatch(loadInitialState(payload)),
    fetchValidations: (apiPayload) => dispatch(fetchValidations(apiPayload)),
    fetchNotes: (apiPayload) => dispatch(fetchNotes(apiPayload)),
    postNote: (apiPayload) => dispatch(postNote(apiPayload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidationTab);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Paper } from "@material-ui/core";
// import "./Validation.css";
// import Card from "./Card/Card";
// import ValidationStartsCard from "../../FormularyDashboardStats/FormularyDashboardStatsChart/FormularyDashboardStatsChart";
// // newyear
// import {
//   loadInitialState,
//   fetchValidations,
//   fetchNotes,
//   postNote,
// } from "../../../redux/slices/formulary/validation/validationSlice";
// import {
//   GET_VALIDATIONS,
//   GET_VALIDATION_NOTES,
//   POST_VALIDATION_NOTE,
// } from "../../../api/http-common-fetch";
// import ValidationBody from "./ValidationBody";
// import FrxLoader from "../../shared/FrxLoader/FrxLoader";

// class ValidationTab extends Component<any, any> {
//   constructor(props) {
//     super(props);

//     this.state = {
//       validationSummary: { total: 0, failed: 0, warning: 0, passed: 0 },
//       validations: [],
//       note: "",
//       activeAccordian: "",
//     };
//   }

//   async componentDidMount() {
//     await this.loadValidationsList();
//   }

//   loadValidationsList() {
//     let payload = {
//       apiPart: GET_VALIDATIONS,
//       pathParams: this.props.current_formulary,
//     };
//     this.props.fetchValidations(payload);
//   }

//   handleNotesList = () => {};
//   handleNoteChange = () => {};
//   render() {
//     const { validationSummary, validations, note } = this.state;
//     return (
//       <div className="formulary-root-validation validation">
//         <ValidationSummarySection
//           summary={this.props?.validations?.validation_summary}
//         />
//         {this.props?.validations?.validations?.map((validation) => (
//           <div key={validation.id_formulary_validation}>
//             <ValidationBody
//               validation={validation}
//               updateNotesList={this.handleNotesList}
//               note={note}
//               activeAccordian={this.state.activeAccordian}
//               handleNoteChange={this.handleNoteChange}
//               // addNote={this.addNote}
//               addNote={() => {}}
//             />
//           </div>
//         ))}
//         {this.props.isLoading && <FrxLoader />}
//       </div>
//     );
//   }
// }

// // Summary Section
// function ValidationSummarySection({
//   summary: { total, failed, warning, passed },
//   //   failed,
//   //   passed,
//   //   total,
//   //   warning,
// }) {
//   return (
//     <Paper elevation={0} style={{ marginBottom: "3rem" }}>
//       <div className="title">Summary of Checks and Validations</div>
//       <div className="container">
//         <ValidationStartsCard total={total} />
//         <Card label="Failed" value={failed} color="rgba(252,120,120,0.75)" />
//         <Card label="Warning" value={warning} color="rgba(245,195,140,0.75)" />
//         <Card label="Passed" value={passed} color="rgba(176,223,165,0.75)" />
//       </div>
//     </Paper>
//   );
// }

// function mapStateToProps(state) {
//   return {
//     isLoading: state.validation.isLoading,
//     current_formulary: state.application.formulary_id,
//     validations: state.validation.payload.validations,
//     notes: state.validation.payload.notes,
//     response: state.validation.payload.response,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     loadInitialState: (payload) => dispatch(loadInitialState(payload)),
//     fetchValidations: (apiPayload) => dispatch(fetchValidations(apiPayload)),
//     fetchNotes: (apiPayload) => dispatch(fetchNotes(apiPayload)),
//     postNote: (apiPayload) => dispatch(postNote(apiPayload)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ValidationTab);

// ! re method here
//   reInitializeValidationData = (notesList) => {
//     let validations: any = [];
//     let item = {};
//     this.props?.validations?.result?.validations.forEach((element) => {
//       // console.log("Validations: ", element);
//       let prefered_count = 0;
//       let failed = 0;
//       let warning = 0;
//       let passed = 0;
//       let status: string = "";
//       const display_date =
//         element.latest_note_added_time != null
//           ? dateFormat.dateFormat(element.latest_note_added_time)
//           : "No notes";
//       if (element.children && element.children.length > 0) {
//         element.children.forEach((childElement) => {
//           switch (childElement.validation_status) {
//             case "F":
//               failed = failed + 1;
//               break;
//             case "W":
//               warning = warning + 1;
//               break;
//             case "P":
//               passed = passed + 1;
//               break;
//           }
//         });
//         if (failed > 0) {
//           prefered_count = failed;
//           status = "F";
//         } else if (warning > 0) {
//           prefered_count = warning;
//           status = "W";
//         } else if (passed > 0) {
//           prefered_count = passed;
//           status = "P";
//         }
//       }
//       let users: any[] = [];
//       let awsFileURL = "https://frx-document-delivery.s3.amazonaws.com/";
//       if (element.users && element.users.length > 0) {
//         let usersList: any[] = element.users.filter((x) => x.name !== null);
//         usersList.forEach((u) => {
//           users.push({
//             name: u.name,
//             logo_path:
//               u.logo_path === null ? "empty-avatar" : awsFileURL + u.logo_path,
//           });
//         });
//       }
//       // user.logo_path = environment.awsFileURL + user.logo_path
//       item = {
//         ...element,
//         status: status,
//         prefered_count: prefered_count,
//         display_date: display_date,
//         users: users,
//       };
//       validations = [...validations, item];
//     });

//     // const validations = [...this.props?.validationData?.validations];
//     // validations.forEach((val) => {
//     //   if (notesList.validation_id === val.id_formulary_validation) {
//     //     // val["notes"] = notesList.notes;
//     //     val["notes"] = notesList;
//     //   }
//     // });

//     console.log(validations);
//     this.setState({
//       validations,
//     });
//   };
