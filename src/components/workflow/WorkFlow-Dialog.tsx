import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { DatePicker, Select } from "antd";

import "./WorkFlow-Dialog.scss";
//import DropDown from "../shared/Frx-components/dropdown/DropDownMap";
//import FrxTimeProgressBar from "../shared/FrxTimeProgressBar/FrxTimeProgressBar";
import { getWorkflowNotesData, getActiveUsersData } from "./WorkflowDialogMock";
import elipse73 from "./Ellipse 73.png";
import elipse4 from "./Ellipse 4.png";
import elipse6 from "./Ellipse 6.png";
import james from "./James.png";
import DropDown from "../shared/Frx-components/dropdown/DropDown";
import FrxTimeProgressBar from "../shared/FrxTimeProgressBar/FrxTimeProgressBar";
import Button from "../shared/Frx-components/button/Button";
import { Input } from "@material-ui/core";

import { postMessage } from "../.././redux/slices/formulary/messaging/messagingSlice";
import {
  loadClaim,
  loadClaimStage,
  claimWork,
  loadTaskDetails,
  stageComplete,
  saveSubTask,
  loadNotes,
  saveNote,
} from "../.././redux/slices/workflow/workflowIntegrationSlice";
import {
  ClaimWorkPayload,
  Explanation,
  Reason,
  StageStatus,
  NotePostPayload,
  WorkflowRoutePayload,
  SubTaskPayload,
} from "../../redux/slices/workflow/workflowAncillary";
import { Collapse, Row, Col, Comment, Tooltip, Avatar } from "antd";
import { trim } from "lodash";

const EyeIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
    >
      <path
        d="M15.6548 5.60078C14.172 2.70754 11.2364 0.75 7.87498 0.75C4.51362 0.75 1.57717 2.70891 0.0951413 5.60105C0.0325903 5.72479 0 5.86149 0 6.00014C0 6.13878 0.0325903 6.27549 0.0951413 6.39922C1.57799 9.29246 4.51362 11.25 7.87498 11.25C11.2364 11.25 14.1728 9.29109 15.6548 6.39895C15.7174 6.27521 15.75 6.13851 15.75 5.99986C15.75 5.86122 15.7174 5.72451 15.6548 5.60078ZM7.87498 9.9375C7.09622 9.9375 6.33495 9.70657 5.68743 9.27391C5.03991 8.84125 4.53523 8.2263 4.23721 7.50682C3.93919 6.78733 3.86121 5.99563 4.01314 5.23183C4.16507 4.46803 4.54008 3.76644 5.09075 3.21577C5.64142 2.6651 6.34302 2.29009 7.10682 2.13816C7.87062 1.98623 8.66232 2.0642 9.3818 2.36222C10.1013 2.66024 10.7162 3.16492 11.1489 3.81244C11.5816 4.45996 11.8125 5.22124 11.8125 6C11.8127 6.51715 11.7111 7.02928 11.5133 7.50711C11.3155 7.98495 11.0255 8.41911 10.6598 8.78479C10.2941 9.15047 9.85993 9.4405 9.3821 9.63829C8.90427 9.83608 8.39213 9.93775 7.87498 9.9375ZM7.87498 3.375C7.64068 3.37827 7.4079 3.41313 7.18291 3.47863C7.36836 3.73065 7.45736 4.04079 7.43376 4.3528C7.41015 4.66481 7.27551 4.95802 7.05426 5.17928C6.83301 5.40053 6.53979 5.53517 6.22778 5.55877C5.91577 5.58237 5.60564 5.49338 5.35362 5.30793C5.21011 5.83665 5.23601 6.39705 5.42769 6.91027C5.61936 7.42349 5.96715 7.86369 6.4221 8.16889C6.87706 8.4741 7.41627 8.62895 7.96384 8.61166C8.51141 8.59436 9.03978 8.40578 9.47456 8.07247C9.90934 7.73915 10.2287 7.27789 10.3876 6.75359C10.5465 6.22929 10.5369 5.66837 10.3603 5.14977C10.1837 4.63116 9.84897 4.18099 9.40313 3.86262C8.95728 3.54425 8.42283 3.37371 7.87498 3.375Z"
        fill="#707683"
      />
    </svg>
  </span>
);

const OrangeDot = (props) => (
  <span {...props}>
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="#F89090" />
    </svg>
  </span>
);

const GreenDot = (props) => (
  <span {...props}>
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="#80C483" />
    </svg>
  </span>
);
const Lock = (props) => (
  <span {...props}>
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.89976 4H5.99976V2.8C5.99976 1.3515 5.33226 0.5 3.99976 0.5C2.66676 0.5 1.99976 1.3515 1.99976 2.8V4H0.999756C0.723256 4 0.499756 4.323 0.499756 4.5995V8.5C0.499756 8.7745 0.713756 9.0695 0.975256 9.1535L1.57376 9.347C1.89121 9.43953 2.21922 9.49095 2.54976 9.5H5.44976C5.78017 9.49103 6.10805 9.43944 6.42526 9.3465L7.02326 9.153C7.28526 9.0695 7.49976 8.7745 7.49976 8.5V4.5995C7.49976 4.323 7.17576 4 6.89976 4ZM4.99976 4H2.99976V2.5995C2.99976 1.877 3.39826 1.5 3.99976 1.5C4.60126 1.5 4.99976 1.877 4.99976 2.5995V4Z"
        fill="#707683"
      />
    </svg>
  </span>
);

interface Option {
  label: string | null;
  value: number | null;
  notifications?: any[] | null;
}

export const defaultSubTaskPayload: SubTaskPayload = {
  name: "",
  description: "",
  assign_type: "",
  assigned_to: null,
  due_date: "",
  due_time: "00:00:00",
  priority: "",
  instance_stage_id: 0,
  entity_id: 0,
};

interface ClassState {
  statuses: StageStatus[];
  availableActions: Option[];
  availableReasons: Option[];
  availableExplanations: Option[];
  selectedAction: Option | null;
  selectedReason: Option | null;
  selectedExplanation: Option | null;
  expandCloseIconInd: boolean;
  showNotification: boolean;
  notifications: any[];
  taskInfo: any;
  // lstNotes: any;
  noteText: string;
  enableNoteBtn: boolean;
  showInMiddleSection: string;
  subtaskForm: SubTaskPayload;
  showSubtask: boolean,
  currentSubtask: any
}

class WorkFlowDialog extends React.Component<any, any> {
  state: ClassState = {
    statuses: [],
    availableActions: [],
    availableReasons: [],
    availableExplanations: [],
    selectedAction: null,
    selectedReason: null,
    selectedExplanation: null,
    expandCloseIconInd: false,
    showNotification: false,
    notifications: [],
    taskInfo: getActiveUsersData(),
    // lstNotes: getWorkflowNotesData(),
    noteText: "",
    enableNoteBtn: false,
    showInMiddleSection: "info",
    subtaskForm: defaultSubTaskPayload,
    showSubtask: false,
    currentSubtask: null  
  };

  componentDidMount() {
    console.log("--- WF Mount" + this.props.case);
    if (this.props.case === 4) {
      this.loadStageData();
    }
  }

  loadStageData() {
    this.props
      .loadClaimStage(this.props.claim?.stage_id)
      .then((response: any) => {
        console.log("------------------- CS");
        console.log(response);
        if (
          response &&
          response.payload &&
          response.payload.status &&
          response.payload.status.length > 0
        ) {
          this.composeOptionUI(response.payload.status);
        }
      });
  }

  composeOptionUI(input: StageStatus[]) {
    const statuses: StageStatus[] = input;
    const actions: Option[] = [];
    console.log(statuses);
    statuses.forEach((s: StageStatus) => {
      console.log(s);
      if (s && s.function_stage_status_id && s.function_stage_status_name) {
        actions.push({
          value: s.function_stage_status_id,
          label: s.function_stage_status_name,
        });
      }
    });
    console.log(actions);
    this.setState({ statuses: input });
    this.setState({ availableActions: actions });
  }

  handleActionChange = (value: any) => {
    console.log(value);
    if (value && this.state.availableActions) {
      const selectedItem: any = this.state.availableActions.find(
        (item: Option) => item.value === value
      );

      console.log(selectedItem);
      // this.setState({ selectedAction: selectedItem });
      // this.setState({ selectedReason: null });
      // this.setState({ availableExplanations: [] });
      // this.setState({ selectedExplanation: null });

      this.setState({
        selectedAction: selectedItem,
        selectedReason: null,
        availableExplanations: [],
        selectedExplanation: null,
        showNotification: false,
        notifications: [],
      });

      if (selectedItem) {
        const statuses: StageStatus[] = this.state.statuses;
        const stageStatus = statuses.find((s: StageStatus) => {
          console.log(s.function_stage_status_id + " = " + selectedItem.value);
          if (s && s.function_stage_status_id === selectedItem.value) {
            return s;
          }
        });
        console.log(stageStatus);
        const reasons: Option[] = [];
        if (stageStatus && stageStatus.reasons) {
          stageStatus.reasons.forEach((r: Reason) => {
            reasons.push({
              value: r.reason_id,
              label: r.reason,
            });
          });
        }
        console.log(reasons);
        this.setState({ availableReasons: reasons });
      }
    }
  };

  handleReasonChange = (value: any) => {
    console.log(value);
    if (value && this.state.availableReasons) {
      const selectedItem: any = this.state.availableReasons.find(
        (item: Option) => item.value === value
      );
      console.log(selectedItem);
      // this.setState({ selectedReason: selectedItem });
      // this.setState({ selectedExplanation: null });

      this.setState({
        selectedReason: selectedItem,
        selectedExplanation: null,
        showNotification: false,
        notifications: [],
      });

      if (selectedItem) {
        const statuses: StageStatus[] = this.state.statuses;
        const selAction: any = this.state.selectedAction;
        let expList: any[] = [];
        statuses.forEach((s: StageStatus) => {
          if (s && s.function_stage_status_id === selAction?.value) {
            console.log(s);
            if (s.reasons && s.reasons.length > 0) {
              s.reasons.forEach((r) => {
                console.log(r);
                console.log(selectedItem?.value);
                if (r && r.reason_id === selectedItem?.value) {
                  console.log(r.explanations);
                  expList = r.explanations;
                  return;
                }
              });
            }
          }
        });
        console.log(expList);
        if (expList && expList.length > 0) {
          const exp: Option[] = [];
          expList.forEach((e: Explanation) => {
            exp.push({
              value: e.explanation_id,
              label: e.explanation,
              notifications: e.notifications,
            });
          });

          this.setState({ availableExplanations: exp });
        }
      }
    }
  };

  handleExplanationChange = (value: any) => {
    console.log(value);
    if (value && this.state.availableExplanations) {
      const selectedItem: any = this.state.availableExplanations.find(
        (item: Option) => item.value === value
      );
      console.log(selectedItem);
      if (selectedItem) {
        this.setState({
          selectedExplanation: selectedItem,
          expandCloseIconInd: true,
          showNotification: true,
          notifications: selectedItem.notifications,
        });
        if (!this.state.expandCloseIconInd) {
          this.loadTaskAndNotesData();
        }
      }
    }
  };

  confirmation(confirm: boolean): void {
    console.log(" Confirm :" + confirm);
    if (confirm) {
      const payload: WorkflowRoutePayload = {
        explanation_id: this.state.selectedExplanation?.value,
        instance_id: this.props.claim?.instance_id,
        instance_stage_id: this.props.claim?.instance_stage_id,
        function_id: 2,
        entity_id: this.props.application?.formulary_id,
        stage_id: this.props.claim?.stage_id,
        barcodes: this.state.selectedExplanation?.notifications,
      };
      this.props.stageComplete(payload).then((response) => {
        this.props.loadClaim(this.props.application?.formulary_id);
        this.setState({
          expandCloseIconInd: false,
        });
      });
    } else {
      this.setState({
        expandCloseIconInd: false,
      });
    }
  }

  claimTask = () => {
    const payload: ClaimWorkPayload = {
      type: "claim",
      work: [
        {
          stage_id: this.props.claim?.stage_id,
          instance_id: this.props.claim?.instance_id,
          task_type: 0,
          entity_id: this.props.application?.formulary_id,
        },
      ],
    };

    this.props.claimWork(payload).then((respanse: any) => {
      // TODO
      // 1. Close
      // 2. Refresh Claim
      this.props.loadClaim(this.props.application?.formulary_id);
    });
  };

  goToMyTasks = () => {
    const urlMyWork = "https://dev-config.futurerx.com/mywork";
    window.open(urlMyWork, "_blank");
    // const navigateToExternalUrl = (
    //   url: string,
    //   shouldOpenNewTab: boolean = true
    // ) =>
    //   shouldOpenNewTab
    //     ? window.open(urlMyWork, "_blank")
    //     : (window.location.href = url);
  };

  handleExpandedDetailClick = () => {
    const expand = !this.state.expandCloseIconInd;
    if (expand) {
      this.loadTaskAndNotesData();
    }
    this.setState({ expandCloseIconInd: expand });
  };

  loadTaskAndNotesData() {
    this.props.loadNotes(this.props.claim?.instance_id);
    this.props.loadTaskDetails(this.props.claim?.instance_id);
  }

  // saveSubTask

  handleNoteChange = (event) => {
    const note = event.target.value;
    if (note && trim(note) !== "") {
      this.setState({
        noteText: note,
      });
      this.setState({ enableNoteBtn: true });
    } else {
      this.setState({ enableNoteBtn: false });
    }
  };

  saveNote() {
    const payload: NotePostPayload = {
      document_id: "" + this.props.claim?.instance_id,
      note: this.state.noteText,
      id_note: null,
      screen: "TSK",
    };
    this.props.saveNote(payload).then((response: any) => {
      console.log("-----");
      this.props.loadNotes(this.props.claim?.instance_id);
      this.setState({ noteText: "" });
      this.setState({ enableNoteBtn: false });
    });
  }

  subTaskDPChange = (e) => {
    const date = `${e._d.getFullYear()}-${
      e._d.getMonth() + 1
    }-${e._d.getDate()}`;
    this.setState({
      subtaskForm: { ...this.state.subtaskForm, due_date: date },
    });
  };

  showSubTask = (arg:any) => {
    console.log(arg);
    this.setState({ 
      showSubtask: true,
      currentSubtask: arg 
    });
  }


  getTaskDetails = () => {
    let result = {};
    result = this.props?.taskDetails?.subtasks.map((subTask, index: any) => {
      return (
        <div>
          <div className="row">
            <p style={{ color: "#333333" }}>{subTask.name}</p>

            {/* {obj.isParenttask ? (
              <div>
                <span className="statusIcon"></span>
                <label>{obj.userName}</label>
              </div>
            ) : (
              <div>
                {obj.isOnline ? (
                  <span className="statusIcon">
                    <GreenDot />
                  </span>
                ) : (
                  <span className="statusIcon">
                    <OrangeDot />
                  </span>
                )}
                <p style={{ color: "#333333" }}>{obj.userName}</p>
              </div>
            )} */}
            <div className="taskPicWrapper">
              {/* <span>
                <img
                  src={obj.userProfile === "Ellipse 4.png" ? elipse4 : elipse73}
                  alt="User"
                />
              </span> */}
              {/* {!obj.isActive && (
                <div className="lockIcon">
                  <Lock />
                </div>
              )} */}
            </div>
            {/* {obj.isActive && ( */}
              <span className="eyeIcon" onClick={(e)=>this.showSubTask(subTask)}>
                <EyeIcon />
              </span>
            {/* )} */}
          </div>
          {/* {obj.isParenttask && (
            <div className="row">
              <span className="statusIcon"></span>
              <p style={{ color: "#707683" }}>SUBTASKS</p>
            </div>
          )} */}
        </div>
      );
    });
    return result;
  };

  getNotesDetails = () => {
    let result = {};
    result = this.props.notes.map((obj) => {
      return (
        <div className="workFlowNoteDetail">
          <div className="workFlowNoteDetailPic">
            <Avatar
              style={{
                background: "#f3f3f3",
              }}
            ></Avatar>

            {/* <span>
              <img
                src={obj.screen_section_name === "James.png" ? james : elipse6}
                alt="User"
              ></img>
            </span> */}
          </div>
          <div className="workFlowNoteDetailText">
            <label> {obj.insert_user}</label>
            <span>{obj.difference}</span>
            <p>{obj.note}</p>
            {/* <div>{obj.version}</div> */}
          </div>
        </div>
      );
    });

    return result;
  };
  renderMiddleSection = () => {
    if (this.state.showInMiddleSection == "info") {
      return (
        <div>
          {this.state.showNotification ? (
            <div style={{ overflow: "auto" }}>
              <div style={{ margin: 10 }}>
                <div style={{ marginBottom: 5, fontWeight: "bold" }}>
                  Notification Confirmation
                </div>

                {this.state.notifications?.length === 0 ? (
                  <div> No Notifications for this explanation </div>
                ) : null}
              </div>
              <div style={{ margin: "10px 0px" }}>
                <button
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid grey",
                  }}
                  onClick={() => this.confirmation(false)}
                >
                  Cancel
                </button>
                <button onClick={() => this.confirmation(true)}>Confirm</button>
              </div>
            </div>
          ) : null}

          <div className="taskAssigned">ASSIGNED TO</div>
          <div className="searchWrapper">
            <div className="nameIcon">
              <span>J</span>
            </div>
            <div className="dropDown">
              {this.props.taskDetails?.task?.stage_owned_by}
              {/* <DropDown
                options={["Select Explanation"]}
                defaultValue="Jonath Richard"
                Disabled={true}
                className="dropdown-input" */}
            </div>
          </div>
          <div className="wrapper">
            <div className="columnWrapper">
              <div className="rowOne">
                <div>WORKFLOW</div>
                {/* <div className="spacer"></div>
                <div className="spantwo">PERIORITY</div> */}
              </div>
              <div className="rowTwo">
                <div className="spanOne">
                  {" "}
                  {this.props.taskDetails?.task?.workflow}
                </div>
                {/* <div className="spacer"></div>
                <div className="spanTwo">MEDIUM</div> */}
              </div>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="descriptionWrapper">
            <div className="description">
              <label>DESCRIPTION</label>
              <p>{this.props.taskDetails?.task?.task_description}</p>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="createdWrapper">
            <div className="columnWrapper">
              <div className="rowOne">
                <div className="spanOne">CREATED</div>
                <div className="spacer"></div>
                <div className="spantwo">CREATED BY</div>
              </div>
              <div className="rowTwo">
                <div>{this.props.taskDetails?.task?.created_datetime}</div>
                <div className="spacer"></div>
                <div className="spanTwo">
                  {" "}
                  {this.props.taskDetails?.task?.created_by}{" "}
                </div>
              </div>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="wrapper">
            <div className="remaining">
              <label>REMAINING</label>
              <span>
                <FrxTimeProgressBar
                  text={this.props.taskDetails?.task?.due_datetime}
                  progress={25}
                />
              </span>

              {/* <label className="statusLabel">STATUS</label> */}
            </div>
            <div className="spacer"></div>
          </div>
          {/* <div className="statusControlWrapper">
            <div className="workFlowControl workFlowControl-dot">
              <DropDown
                options={["Complete", "Work InProgress"]}
                defaultValue="Complete"
                className="dropdown-input"
              />
              <span className="drop-down-icon">
                <OrangeDot />
              </span>
            </div>
          </div> */}
          {/* <div className="lastWrapper">
            <div className="dropDown">
              <DropDown
                options={["Complete", "Work InProgress"]}
                defaultValue="Reason"
                className="dropdown-input"
              />
            </div>
            <div>
              <DropDown
                options={["Complete", "Work InProgress"]}
                defaultValue="Complete"
                className="dropdown-input"
              />
            </div>
          </div> */}
        </div>
      );
    } else if (this.state.showInMiddleSection == "add_subtask_form") {
      return (
        <div style={{ padding: "10px 30px 0px 0px" }}>
          <div className="general-information-fields-wrapper setup-label">
            <Grid container>
              <Grid item xs={12}>
                <div className={`group `}>
                  <label>
                    TASK NAME <span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="setup-input-fields"
                    name="name"
                    value={this.state.subtaskForm.name}
                    onChange={(e) =>
                      this.setState({
                        subtaskForm: {
                          ...this.state.subtaskForm,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <label>
                  DUE DATE <span className="astrict">*</span>
                </label>
                <DatePicker
                  className="field-height-30"
                  format={"MM/DD/YYYY"}
                  onChange={(e) => this.subTaskDPChange(e)}
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ant-picker-suffix"
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
              </Grid>
              <Grid item xs={6}>
                <div className={`group `}>
                  <label>
                    TIME <span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    id="due_time"
                    className="setup-input-fields"
                    name="due_time"
                    value={this.state.subtaskForm.due_time}
                    onChange={(e) =>
                      this.setState({
                        subtaskForm: {
                          ...this.state.subtaskForm,
                          due_time: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="group">
                  <label>
                    ASSIGN TYPE <span className="astrict">*</span>
                  </label>
                  <DropDown
                    className="formulary-type-dropdown field-height-30"
                    options={[]}
                    value={this.state.subtaskForm.assign_type}
                    // disabled={disabled}e.target.value
                    onChange={(e) =>
                      this.setState({
                        subtaskForm: {
                          ...this.state.subtaskForm,
                          assign_type: e,
                        },
                      })
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="group">
                  <label>
                    ASSIGN TO <span className="astrict">*</span>
                  </label>
                  <DropDown
                    className="formulary-type-dropdown field-height-30"
                    options={[]}
                    value={this.state.subtaskForm.assigned_to}
                    // disabled={disabled}
                    onChange={(e) =>
                      this.setState({
                        subtaskForm: {
                          ...this.state.subtaskForm,
                          assign_to: e,
                        },
                      })
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="group">
                  <label>
                    PRIORITY <span className="astrict">*</span>
                  </label>
                  <DropDown
                    className="formulary-type-dropdown field-height-30"
                    options={[]}
                    value={this.state.subtaskForm.priority}
                    // disabled={disabled}
                    onChange={(e) =>
                      this.setState({
                        subtaskForm: { ...this.state.subtaskForm, priority: e },
                      })
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={`group `}>
                  <label>
                    Description <span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="setup-input-fields"
                    name="name"
                    value={this.state.subtaskForm.description}
                    onChange={(e) =>
                      this.setState({
                        subtaskForm: {
                          ...this.state.subtaskForm,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </Grid>
              <button onClick={() => {}}>SUBMIT</button>
            </Grid>
          </div>
        </div>
      );
    }
    return null;
  };
  render() {
    const lstNotes = this.getNotesDetails();
    const taskInfo = this.getTaskDetails();

    return (
      <div className="worflowDialogContainer">
        <div>
          {this.props.case === 0 ? (
            <div className="worflowDialogContainer">
              <div className="workFlowlabel"> (0) Loading...</div>
            </div>
          ) : this.props.case === 1 ? (
            <div className="worflowDialogContainer">
              <div className="workFlowlabel">
                This task is in end ({this.props.claim?.stage_name}) step.
              </div>
            </div>
          ) : this.props.case === 2 ? (
            <div className="worflowDialogContainer">
              <div className="workFlowlabel">
                This task is claimed by {this.props.claim?.first_name}{" "}
                {this.props.claim?.last_name}
              </div>
            </div>
          ) : this.props.case === 3 ? (
            <div className="worflowDialogContainer">
              <div className="workFlowlabel">This task is not claimed.</div>
              <Button label="Claim Tasks" onClick={() => this.claimTask()} />
              <Button
                label="Go to my Tasks"
                onClick={() => this.goToMyTasks()}
              />
            </div>
          ) : this.props.case === 4 ? (
            <div className="worflowDialogContainer">
              <div className="workFlowlabel">
                {this.props.claim?.stage_name}
              </div>
              <div className="workFlowControl">
                <DropDown
                  options={this.state.availableActions}
                  onChange={this.handleActionChange}
                  isOptionsObj={true}
                  placeholder="Select Action"
                  className="dropdown-input"
                />
              </div>
              <div className="workFlowControl">
                <DropDown
                  options={this.state.availableReasons}
                  onChange={this.handleReasonChange}
                  isOptionsObj={true}
                  value={this.state.selectedReason?.value}
                  placeholder="Select Reason"
                  className="dropdown-input"
                />
              </div>
              <div className="workFlowControl">
                <DropDown
                  options={this.state.availableExplanations}
                  onChange={this.handleExplanationChange}
                  isOptionsObj={true}
                  value={this.state.selectedExplanation?.value}
                  placeholder="Select Reason"
                  className="dropdown-input"
                />
              </div>
              {this.props.claim?.due_date ? (
                <FrxTimeProgressBar
                  text="09/04/2020  @ 9:00 AM"
                  progress={25}
                />
              ) : (
                <div className="workFlowlabel"> No Due Date Available </div>
              )}

              <div className="workFlowIcon">
                {!this.state.expandCloseIconInd ? (
                  <div onClick={this.handleExpandedDetailClick}>
                    <svg
                      width="5"
                      height="9"
                      viewBox="0 0 5 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                        fill="#323C47"
                      />
                    </svg>
                  </div>
                ) : (
                  <div onClick={this.handleExpandedDetailClick}>
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {this.state.expandCloseIconInd && (
          <div className="expandedDetailWrapper">
            <div className="expandedLeftSection">
              <p>
                {
                  this.props.application?.formulary?.formulary_info
                    ?.formulary_name
                }
              </p>

              <p style={{ color: "#707683" }}>SUBTASKS</p>

              {taskInfo}
              <div className="subtask-row">
                <span
                  className="button"
                  onClick={() =>
                    this.setState({
                      showInMiddleSection:
                        this.state.showInMiddleSection == "add_subtask_form"
                          ? "info"
                          : "add_subtask_form",
                    })
                  }
                >
                  + add new subtask
                </span>
              </div>
            </div>
            <div className="expandedMiddleSection">
              {this.renderMiddleSection()}
            </div>

            <div className="expandedRightSection">
              <div className="expandedRightSectionWrapper">
                <div className="workFlowNotes">NOTES</div>
                <br />
                <div className="workFlowNotesWrapper">{lstNotes}</div>

                <div className="searchBar">
                  <input
                    type="text"
                    placeholder="Add a note"
                    onChange={this.handleNoteChange}
                  ></input>
                  <button
                    onClick={() => this.saveNote()}
                    disabled={!this.state.enableNoteBtn}
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="searchBar">
              <input
                type="text"
                placeholder="Add a note"
                onChange={this.handleNoteChange}
              ></input>
              <button
                onClick={() => this.saveNote()}
                disabled={!this.state.enableNoteBtn}
              >
                Save Note
              </button>
            </div> */}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    application: state.application,
    case: state.workflow?.case,
    claim: state.workflow?.claim,
    taskDetails: state.workflow?.taskDetails,
    notes: state.workflow?.notes,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadClaim: (stage_id) => dispatch(loadClaim(stage_id)),
    loadClaimStage: (stage_id) => dispatch(loadClaimStage(stage_id)),
    claimWork: (arg) => dispatch(claimWork(arg)),
    loadTaskDetails: (instance_id) => dispatch(loadTaskDetails(instance_id)),
    stageComplete: (arg) => dispatch(stageComplete(arg)),
    saveSubTask: (arg) => dispatch(saveSubTask(arg)),
    loadNotes: (instance_id) => dispatch(loadNotes(instance_id)),
    saveNote: (arg) => dispatch(saveNote(arg)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkFlowDialog);
