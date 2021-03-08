import React from "react";
import { connect } from "react-redux";

import PanelHeader from "./PanelHeader";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from "../../../../../shared/Frx-components/button/Button";
import { Box, Grid, Input } from "@material-ui/core";
import Groups from "./Groups";
import PaNewGroupForm from "./PaNewGroupForm";
import { getPAGroupDetails } from "../../../../../../redux/slices/formulary/pagdm/pagdmSlice";
import {
  getPaSummary,
  getPaGrouptDescriptions,
  getPaGrouptDescriptionDetail,
  getPaTypes,
  getDrugLists,
  getPaGrouptDescriptionVersions,
  getPaGrouptDescription,
} from "../../../../../../redux/slices/formulary/pa/paActionCreation";
import { setAdditionalCriteria } from "../../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";

function mapStateToProps(state) {
  return {
    descriptions: state.paReducer.descriptions,
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id, //comme- 4, medicare-1 , medicate-2, exchnage -3
    formulary_type_id: state?.application?.formulary_type_id, //6

    // additional criteria
    additionalCriteria: state.additionalCriteria,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPaSummary: (a) => dispatch(getPaSummary(a)),
    getPaGrouptDescriptions: (a) => dispatch(getPaGrouptDescriptions(a)),
    getPaTypes: (a) => dispatch(getPaTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    getPaGrouptDescriptionDetail: (a) =>
      dispatch(getPaGrouptDescriptionDetail(a)),
    getPaGrouptDescriptionVersions: (a) =>
      dispatch(getPaGrouptDescriptionVersions(a)),
    getPaGrouptDescription: (a) => dispatch(getPaGrouptDescription(a)),
    getPAGroupDetails: (arg) => dispatch(getPAGroupDetails(arg)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

class PaGroupDescriptionManagement extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tooltip: "PA CRITERIA",
    newGroup: false,
    stGroupDescriptions: [],
    paTypes: [],
    paGroupDescriptionVersion: null,
    selectedGrp: false,
    versionList: [{ value: "Version 1" }],
    versionTitle: "Group Description Version 1",
    latestVerion: 0,
    tabs: [
      {
        id: 1,
        text: "Active",
      },
      {
        id: 2,
        text: "Archived",
      },
    ],
    groupsData: [],
    searchInput: "",
    selectedGroup: -1,
    drugList: [],
    isSetUpComplete: false,
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };

  selectGroup = (param: any, groupType: string) => {
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + param;
    let isPopUpView = this.props.isPopUpView;
    this.props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
      if (json.payload && json.payload.code === "200") {
      let tmpData = json.payload.data;
      if (isPopUpView) {
        tmpData = tmpData.filter((obj) => {
          if (obj.is_setup_complete) {
            return obj;
          }
        });
      }

      let dataLength = tmpData.length;
      // var result = tmpData.map(function (el) {
      //     var element = {};
      //     element["value"] = el.value;
      //     return element;
      // })
      let latestVerion =
        tmpData.length > 0
          ? tmpData[dataLength - 1].id_pa_group_description
          : 0;
      let is_setup_complete =
        dataLength > 0 ? tmpData[dataLength - 1].is_setup_complete : 0;
      this.setState({
        isSetUpComplete: is_setup_complete,
      });
      let apiDetails = {};
      apiDetails["lob_type"] = this.props.formulary_lob_id;
      apiDetails["pathParams"] = "/" + latestVerion;

      this.props.getPaGrouptDescription(apiDetails).then((json) => {
        if (json.payload && json.payload.code === "200") {
          let payload: any = {
            additionalCriteriaObject: this.props.additionalCriteria
              .additionalCriteriaObject,
            additionalCriteriaBody: this.props.additionalCriteria
              .additionalCriteriaBody,
            populateGrid: this.props.additionalCriteria.populateGrid,
            closeDialog: this.props.additionalCriteria.closeDialog,
            listItemStatus: { ...this.props.additionalCriteria.listItemStatus },
          };
          payload.additionalCriteriaBody = json.payload.data["um_criteria"];
          this.props.setAdditionalCriteria(payload);
        }
      });

      this.props.getPAGroupDetails({
        formulary_id: this.props.formulary_id,
        current_group_id: param,
        current_group_des_id: latestVerion,
      });
    }
    });
    this.setState({
      newGroup: true,
      selectedGrp: groupType === "warning" ? false : true,
      selectedGroup: param,
    });
  };
  addNewGroup = () => {
    this.props.setAdditionalCriteria([]);
    this.setState({
      newGroup: false,
      selectedGrp: false,
    });

    this.props.getPAGroupDetails({
      formulary_id: this.props.formulary_id,
      current_group_id: 0,
      current_group_des_id: 0,
    });

    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] = 0;

    //this.props.cleanMessages({error:'',success:''})
    this.props.getPaGrouptDescriptions(apiDetails);
    this.props.getPaGrouptDescriptionVersions(apiDetails);
    this.props.getPaGrouptDescription(apiDetails);
    this.props.getPaTypes(this.props.formulary_id);
  };

  componentDidMount() {
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] =
      "/" + this.props?.client_id + "?entity_id=" + this.props?.formulary_id;
    let isPopUpView = this.props.isPopUpView;
    this.props.getPaGrouptDescriptions(apiDetails).then((json) => {
      if (json.payload && json.payload.code === "200") {
      let tmpData = json.payload.data;
      let groupProp = "";
      if (this.props.formulary_lob_id == 1) {
        groupProp = "id_mcr_base_pa_group_description";
      } else if (this.props.formulary_lob_id != 1) {
        groupProp = "id_base_pa_group_description";
      }
      if (isPopUpView) {
        tmpData = tmpData.filter((obj) => {
          if (obj.is_setup_complete) {
            return obj;
          }
        });
      }
      var result = tmpData.map(function (el) {
        var element = {};
        element["id"] = el[groupProp];
        element["label"] = el.pa_group_description_name;
        element["status"] = el.is_setup_complete ? "completed" : "warning";
        element["is_archived"] =
          el.is_archived == null ? false : el.is_archived;

        return element;
      });

      this.setState({
        groupsData: result,
      });
      let completed_groups = result.filter((obj) => {
        if (!obj.is_archived) {
          return obj;
        }
      });
      if (completed_groups.length > 0) {
        this.selectGroup(
          completed_groups[0].id,
          completed_groups[0].statusType
        );
      }
    }
    });

    this.props.getPaTypes(this.props.formulary_id).then((json) => {
      this.setState({
        paTypes: json.payload.data,
      });
    });

    this.props.getDrugLists(this.props.client_id).then((json) => {
      let tmp_list: any = [];
      json.payload.data.map((obj) => {
        let tmp_obj = {
          key: obj.key,
          value: obj.value,
          text: obj.text,
          name: obj.text,
          show: true,
          is_list: false,
          type: "",
        };
        tmp_list.push(tmp_obj);
      });

      this.setState({
        drugList: tmp_list,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    let tmpData = nextProps.descriptions;
    if (tmpData && Array.isArray(tmpData) && tmpData.length > 0) {
      let groupProp = "";
      if (this.props.formulary_lob_id == 1) {
        groupProp = "id_mcr_base_pa_group_description";
      } else if (this.props.formulary_lob_id != 1) {
        groupProp = "id_base_pa_group_description";
      }
      let isPopUpView = this.props.isPopUpView;
      if (isPopUpView) {
        tmpData = tmpData.filter((obj) => {
          if (obj.is_setup_complete) {
            return obj;
          }
        });
      }
      var result = tmpData.map(function (el) {
        var element = {};
        element["id"] = el[groupProp];
        element["label"] = el.pa_group_description_name;
        element["status"] = el.is_setup_complete ? "completed" : "warning";
        element["is_archived"] =
          el.is_archived == null ? false : el.is_archived;

        return element;
      });
      this.setState({
        groupsData: result,
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      searchInput: event.currentTarget.value,
    });
  };

  render() {
    return (
      <>
        <div className="bordered">
          <PanelHeader title="Prior Authorization - Group Description Management" />
          <div className="inner-container bg-light-grey pa-group-description-wrapper">
            <div className="group-des">
              <div className="panel header">
                <span>GROUP DESCRIPTION</span>
                {!this.props.isPopUpView && (
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      label="+ Add New"
                      className="Button"
                      onClick={this.addNewGroup}
                    />
                  </Box>
                )}
              </div>
              <div className="inner-container">
                <div className="search-input">
                  <Input
                    disableUnderline
                    placeholder="Search..."
                    inputProps={{
                      startAdornment: (
                        <span>
                          {
                            <svg
                              className="test-claim-search__icon"
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
                          }
                        </span>
                      ),
                    }}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                    position={this.props.isPopUpView}
                  />
                </div>

                <div
                  className={
                    this.props.isPopUpView
                      ? "group-wrapper scrollbar scrollbar-primary mx-auto view-com-sec"
                      : "group-wrapper new-scroll-bar mx-auto view-com-sec"
                  }
                >
                  {this.state.groupsData.length > 0 &&
                    this.state.groupsData.map((group: any, key: any) =>
                      this.state.searchInput == "" ||
                      (this.state.searchInput != "" &&
                        group.label.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) > -1) ? (
                        this.state.activeTabIndex == 0 &&
                        group.is_archived == false ? (
                          <Groups
                            key={key}
                            id={group.id}
                            title={group.label}
                            statusType={group.status}
                            selectGroup={this.selectGroup}
                            isSelected={this.state.selectedGroup == group.id}
                          />
                        ) : this.state.activeTabIndex == 1 &&
                          group.is_archived == true ? (
                          <Groups
                            key={key}
                            id={group.id}
                            title={group.label}
                            statusType={group.status}
                            selectGroup={this.selectGroup}
                            isSelected={this.state.selectedGroup == group.id}
                          />
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    )}
                  {/* <Groups title={'Group1'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group2'} statusType={2} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group3'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group4'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group5'} statusType={1} selectGroup={this.selectGroup}/>
                                        <Groups title={'Group6'} statusType={1} selectGroup={this.selectGroup}/> */}
                </div>
              </div>
            </div>
            {this.state.newGroup ? (
              <PaNewGroupForm
                tooltip={this.state.tooltip}
                formType={1}
                editMode={true}
                versionList={this.state.versionList}
                drugList={this.state.drugList}
                versionTitle={this.state.versionTitle}
                activeTabIndex={this.state.activeTabIndex}
                latestVerion={this.state.latestVerion}
                selectGroupDescriptionClick={
                  this.props.selectGroupDescriptionClick
                }
                selectGroup={this.selectGroup}
                isSetUpComplete={this.state.isSetUpComplete}
                isPopUpView={this.props.isPopUpView}
              />
            ) : (
              <PaNewGroupForm
                tooltip={this.state.tooltip}
                formType={0}
                editMode={false}
                drugList={this.state.drugList}
                versionList={this.state.versionList}
                title={"NEW GROUP DESCRIPTION"}
                versionTitle={this.state.versionTitle}
                activeTabIndex={this.state.activeTabIndex}
                latestVerion={this.state.latestVerion}
                selectGroupDescriptionClick={
                  this.props.selectGroupDescriptionClick
                }
                selectGroup={this.selectGroup}
                isSetUpComplete={this.state.isSetUpComplete}
                isPopUpView={this.props.isPopUpView}
              />
            )}
            {/* <PaNewGroupForm selectedGroupId={this.state.selectedGroup}/> */}
            {/* {this.state.newGroup ? <NewGroup tooltip={this.state.tooltip} formType={1}/>: (
                            <NewGroup tooltip={this.state.tooltip} formType={0}/>
                        ) } */}
            {/* <div className="new-group-des">
                            <div className="panel header">
                                <span>NEW GROUP DESCRIPTION</span>
                            </div>
                            <div className="inner-container">
                                <div className="setting-1">
                                    <span>What file type is this group description for? *</span>
                                    <div className="marketing-material radio-group">
                                        <RadioButton label="Formulary/OTC" name="marketing-material-radio1" checked />
                                        <RadioButton label="Excluded" name="marketing-material-radio1" />
                                        <RadioButton label="ADD" name="marketing-material-radio1" />
                                    </div>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <div className="group">
                                                <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                                                <input type="text" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="setting-1 mb-20">
                                    <span>What type of drugs will this group contain? Select all that apply.</span>
                                    <div className="marketing-material-chk radio-group">
                                        <FormControlLabel control={<Checkbox/>} label='RX' />
                                        <FormControlLabel control={<Checkbox/>} label='OTC' />
                                    </div>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <div className="group">
                                                <label>ST CRITERIA<span className="astrict">*</span>
                                                <div className="panel-tooltip">
                                                    <Tooltip 
                                                        classes={{
                                                            tooltip: 'custom-tooltip panel-tooltip'
                                                        }}
                                                        title={this.state.tooltip} 
                                                        placement="top-start" 
                                                        arrow>
                                                        <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z" fill="#1D54B4"/>
                                                        </svg>
                                                    </Tooltip>
                                                </div>
                                                </label>
                                                <input type="text" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="mb-20">
                                        <Grid item xs={6}>
                                            <div className="group">
                                                <label>ST CRITERIA CHANGE INDICATOR<span className="astrict">*</span></label>
                                                <input type="text" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="setting-1 mb-20">
                                    <span>MARKETING MATERIAL CONSIDERATIONS</span>
                                    <div className="marketing-material-chk">
                                        <FormControlLabel control={<Checkbox/>} label='Supress Criteria and Display: Pending CMS Approval' />
                                        <FormControlLabel control={<Checkbox/>} label='Display Criteria for Drugs not on FRF' />
                                    </div>
                                    <span>do you want to add additional criteria?*</span>
                                    <div className="marketing-material radio-group">
                                        <RadioButton label="Yes" name="marketing-material-radio" checked />
                                        <RadioButton label="No" name="marketing-material-radio" />
                                    </div>
                                </div>
                                <div className="button-wrapper">
                                    <Button label="Save Version Progress" className="Button"/>
                                    <Button label="Version to Initiate Change Request" className="Button"/>
                                    <Button label="Version Submitted to CMS" className="Button"/>
                                </div>
                            </div>
                            
                        </div> */}
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaGroupDescriptionManagement);
