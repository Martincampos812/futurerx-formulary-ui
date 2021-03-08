import React from "react";
import { Spin, message } from "antd";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import DialogList from "../shared/FrxDialogList/FrxDialogList";
import Grid from "@material-ui/core/Grid";
import { DialogListItemModel } from "../../models/dialog-list-item.model";
import { TabModel } from "../../models/tab.model";
import { FormModel } from "../../models/form-model";
import MemberDetails from "../user-details/member-details/MemberDetails";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../models/tab.model";
import MemberAddress from "../user-details/member-address/MemberAddress";
import PcpSummary from "../pcp-info/pcp-summary";
import PcpContactInfo from "../pcp-info/pcp-contactinfo";
import PcpSpecialty from "../pcp-info/pcp-specialty";
import PcpStateLicensure from "../pcp-info/pcp-statelicensure";
import Demographics from "../pharmacy-info/demographics";
import PharmacyContactInfo from "../pharmacy-info/contact-info";
import PharmacySpecialty from "../pharmacy-info/specialty";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import {
  eligibilityGridColumns,
  eligibilityGridCOBColumns,
} from "../../utils/grid/columns";
import { getDemographicsGridData } from "../../mocks/grid/demographics-mock";
import { getEligibilityCOBGridData } from "../../mocks/grid/Eligibilitycob-mock";
import EligibilityPopup from "../eligibility-info/eligibility-popup";
import EligibilityInsurancePopup from "../eligibility-info/EligibilityInsurancePopup";
import FrxLoader from "../shared/FrxLoader/FrxLoader";
import Messages from "../../constants/Messages";
import { API } from "../../api/httptemp-helper";

import "./MemberDetailspopup.scss";
import { connect } from "react-redux";

// Get state as props
const mapStateToProps = (state) => {
  return {
    memberSummary: state.member_summary,
  };
};

interface MemberDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  panelName: string;
  memberSummary: any;
}

class ConnectedMemberDetailsPopup extends React.Component<
  MemberDetailsPopupProps
  > {
  state = {
    isMemberNotificationsDialogOpen: this.props.isOpen,
    items: [],
    tabs: [],
    miniTabs: [],
    miniTabsForEligibility: [],
    miniTabsForPharmacy: [],
    miniTabsForPharmacyContact: [],
    formList: [],
    selectedTab: 0,
    setOpen: false,
    activeTabIndex: 0,
    activeTabIndexPharmacy: 0,
    activeTabIndexPharmacyContact: 0,
    activeTabsForEligibility: 0,
    expand: "",
    isFetchingData: false,
    isEligibilityModelOpen: false,
    isEligibilityInsuranceModelOpen: false,
    isEligibilityModelClose: false,
    isEligibilityGridOpen: true,
    data: [] as any[],
    filteredData: [] as any[],
    filterCobData: [] as any[],
    memberDetailsData: [],
    memberAddressData: [],
    isLoader: false,
  };

  componentDidMount() {
    /**
     * TODO: mock data
     * this would come from server
     *
     */
    const data = getDemographicsGridData();
    const cobData = getEligibilityCOBGridData();
    this.setState({
      data,
      filteredData: data,
      filterCobData: cobData,
      expand: this.props.panelName
    });

    const items: DialogListItemModel[] = [
      {
        id: 1,
        avatar: "",
        content: "Member has not had a flu shot this year",
        heading: "Member is due for a flu shot",
      },
      {
        id: 2,
        avatar: "",
        content: "Member is currently taking abilify",
        heading: "Abilify case is pending",
      },
    ];

    /**
     * The tabs required for the model
     */
    const tabs: TabModel[] = [
      {
        id: 1,
        text: "Update",
        isSelected: true,
      },
      {
        id: 2,
        text: "Add",
        isSelected: false,
      },
    ];

    const miniTabs: any[] = [
      {
        id: 1,
        text: "Primary Address",
      },
      {
        id: 2,
        text: "Secondary Address",
      },
      {
        id: 3,
        text: "Temporary Address",
      },
    ];

    const miniTabsForEligibility: any[] = [
      {
        id: 1,
        text: "View",
      },
      {
        id: 2,
        text: "Edit",
      },
      {
        id: 3,
        text: "Add",
      },
    ];

    const miniTabsForPharmacy: any[] = [
      {
        id: 1,
        text: "Primary Pharmacy",
      },
      {
        id: 2,
        text: "Secondary Pharmacy",
      },
    ];

    const miniTabsForPharmacyContact: any[] = [
      {
        id: 1,
        text: "Location Address",
      },
      {
        id: 2,
        text: "Mailing Address",
      },
    ];

    const formList: FormModel[] = [];

    this.setState({
      items,
      tabs,
      formList,
      miniTabs,
      miniTabsForEligibility,
      miniTabsForPharmacy,
      miniTabsForPharmacyContact,
    });
    // this.getAllMemberDetails()
    // this.getAllAddressDetails()
  }

  getAllMemberDetails = () => {
    this.setState({ isLoader: true });
    try {
      API.get(`member/${341}`)
        .then((response) => {
          if (response.data && response.data.meta.success == true) {
            this.setState({
              isLoader: false,
              memberDetailsData: response.data.data[0],
            });
            message.success("Data loaded Successfully");
          } else {
            message.error("!Data not found");
          }
        })
        .catch((error) => {
          console.log("error_member", error);
          message.error(Messages.SOMETHING_WENT_WRONG);
        })
        .then(() => {
          this.setState({ isLoader: false });
        });
    } catch (e) {
      message.error(Messages.NETWORK_FAILED);
    }
  };

  getAllAddressDetails = () => {
    this.setState({ isLoader: true });

    try {
      API.get(`member/${341}/address`)
        .then((response) => {
          if (response.data && response.data.meta.success == true) {
            console.log("sumit-address", response.data);
            this.setState({
              isLoader: false,
              memberAddressData: response.data.data,
            });
            message.success("Data loaded Successfully");
          } else {
            message.error("!Data not found");
          }
        })
        .catch((error) => {
          message.error(Messages.SOMETHING_WENT_WRONG);
        })
        .then(() => {
          this.setState({ isLoader: false });
        });
    } catch (e) {
      message.error(Messages.NETWORK_FAILED);
    }
  };

  openMemberNotificationsEditDialog = () => {
    this.setState({ isMemberNotificationsDialogOpen: true });
  };

  handleMemberNotificationEditDialogAction = (action: string) => {
    this.setState({ isMemberNotificationsDialogOpen: false });
    this.props.onClose();
  };

  handleMemberNotificationDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isMemberNotificationsDialogOpen: false });
    this.props.onClose();
  };

  handleTabChange = (selectedTab: TabModel) => {
    let index = 0;
    const tabs = this.state.tabs.map((tab: TabModel, idx: number) => {
      if (selectedTab.id === tab.id) {
        index = idx;
        tab.isSelected = true;
      } else tab.isSelected = false;
      return tab;
    });

    this.setState({ tabs, selectedTab: index });
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };

  onClickEligibilityTab = (selectedTabIndex: number) => {
    let activeTabsForEligibility = 0;
    const tabs = this.state.miniTabsForEligibility.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabsForEligibility = index;
        }
        return tab;
      }
    );
    console.log("data", activeTabsForEligibility);
    this.setState({ tabs, activeTabsForEligibility });
  };

  onClickPharmacyTab = (selectedTabIndex: number) => {
    let activeTabIndexPharmacy = 0;
    const tabs = this.state.miniTabsForPharmacy.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabIndexPharmacy = index;
        }
        return tab;
      }
    );
    this.setState({ tabs, activeTabIndexPharmacy });
  };

  onClickPharmacyContactTab = (selectedTabIndex: number) => {
    let activeTabIndexPharmacyContact = 0;
    const tabs = this.state.miniTabsForPharmacyContact.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabIndexPharmacyContact = index;
        }
        return tab;
      }
    );
    this.setState({ tabs, activeTabIndexPharmacyContact });
  };

  handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    //   setExpanded(isExpanded ? panel : false);
    this.setState({ expand: isExpanded ? panel : false });
  };

  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d) => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  settingsTriDotClick = (data: any) => {
    console.log("tri dot clicked ", data);
    this.setState({
      isEligibilityModelOpen: true,
      isEligibilityGridOpen: false,
    });
  };

  settingsInsuranceTriDotClick = (data: any) => {
    this.setState({
      isEligibilityInsuranceModelOpen: true,
      isEligibilityGridOpen: false,
    });
  };

  handleEligibilityDialogClose = () => {
    this.setState({
      activeTabsForEligibility: 0,
      isEligibilityGridOpen: true,
      isEligibilityModelOpen: false,
      isEligibilityInsuranceModelOpen: false,
    });
  };

  render() {
    const { isMemberNotificationsDialogOpen, selectedTab } = this.state;
    const columns = eligibilityGridColumns();
    const cobcolumns = eligibilityGridCOBColumns();
    return (
      <div>
        <React.Fragment>
          <DialogPopup
            positiveActionText="Edit"
            negativeActionText="Cancel"
            title=""
            handleClose={this.handleMemberNotificationDialogClose}
            handleAction={this.handleMemberNotificationEditDialogAction}
            open={isMemberNotificationsDialogOpen}
            showActions={false}
            className="member-details-popup-root"
          >
            <div>
              <Spin spinning={this.state.isLoader} indicator={<FrxLoader />}>
                <div>
                  <MemberDetails
                    memberData={this.props.memberSummary.memberDetails}
                  />
                </div>

                <div>
                  <div>
                    <div className="accordion-container">
                      <Accordion
                        expanded={this.state.expand === '*' || this.state.expand === "demographics-tab"}
                        onChange={this.handleChange("demographics-tab")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Contact Information</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          <div className="contact-minitabs">
                            <FrxMiniTabs
                              tabList={this.state.miniTabs}
                              activeTabIndex={this.state.activeTabIndex}
                              onClickTab={this.onClickTab}
                            />
                          </div>
                          <div className="address-info">
                            <MemberAddress
                              memberAddress={[
                                this.props.memberSummary.memberAddress,
                              ]}
                              activeTabIndex={this.state.activeTabIndex}
                            //  memberAddress={this.state.memberAddressData} activeTabIndex={this.state.activeTabIndex}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={this.state.expand === '*' || this.state.expand === "eligibility-tab"}
                        onChange={this.handleChange("eligibility-tab")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>Eligibility</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {this.state.isEligibilityModelOpen === true ? (
                            <span>
                              <div className="contact-minitabs">
                                <FrxMiniTabs
                                  tabList={this.state.miniTabsForEligibility}
                                  activeTabIndex={
                                    this.state.activeTabsForEligibility
                                  }
                                  onClickTab={this.onClickEligibilityTab}
                                />
                              </div>
                              <div className="eligibility-popup">
                                <EligibilityPopup
                                  activeTabIndex={
                                    this.state.activeTabsForEligibility
                                  }
                                  isClose={this.handleEligibilityDialogClose}
                                />
                              </div>
                            </span>
                          ) : (
                              ""
                            )}
                          {this.state.isEligibilityInsuranceModelOpen ===
                            true ? (
                              <span>
                                <div className="contact-minitabs">
                                  <FrxMiniTabs
                                    tabList={this.state.miniTabsForEligibility}
                                    activeTabIndex={
                                      this.state.activeTabsForEligibility
                                    }
                                    onClickTab={this.onClickEligibilityTab}
                                  />
                                </div>
                                <div className="eligibility-popup">
                                  <EligibilityInsurancePopup
                                    activeTabIndex={
                                      this.state.activeTabsForEligibility
                                    }
                                    isClose={this.handleEligibilityDialogClose}
                                  />
                                </div>
                              </span>
                            ) : (
                              ""
                            )}

                          {this.state.isEligibilityGridOpen === true ? (
                            <span>
                              <div className="demographics-card">
                                <Grid container xs={12}>
                                  <Grid xs={12} sm={3}>
                                    <div className="keyValue">
                                      <div>Group ID</div>
                                      <div className="value">12135652411</div>
                                    </div>
                                  </Grid>
                                  <Grid xs={12} sm={3}>
                                    <div className="keyValue">
                                      <div>Member ID</div>
                                      <div className="value">124563457432</div>
                                    </div>
                                  </Grid>
                                  <Grid xs={12} sm={3}>
                                    <div className="keyValue">
                                      <div>RX BIN#</div>
                                      <div className="value">1578</div>
                                    </div>
                                  </Grid>
                                  <Grid xs={12} sm={3}>
                                    <div className="keyValue_last">
                                      <div>PCN</div>
                                      <div className="value">12135652411</div>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                              <div className="claims-grid-root">
                                <FrxGridContainer
                                  enableSearch
                                  enableColumnDrag
                                  enableSettings
                                  onSearch={this.handleSearch}
                                  fixedColumnKeys={["claimId"]}
                                  pagintionPosition="topRight"
                                  hidePagination
                                  gridName="MEMBER DETAILS 1"
                                  isFetchingData={this.state.isFetchingData}
                                  columns={columns}
                                  data={this.state.filteredData}
                                  onSettingsClick="grid-menu"
                                  settingsTriDotClick={this.settingsTriDotClick}
                                  scroll={{ x: 6800, y: 400 }}
                                  hideClearFilter={false}
                                  hideItemsPerPage={true}
                                  hideMultiSort={false}
                                  settingsWidth={10}
                                />
                              </div>
                              <h3 className="egbTitle">
                                Other Health Insurance or COB
                              </h3>

                              <div className="claims-grid-root">
                                <FrxGridContainer
                                  enableSearch
                                  enableColumnDrag
                                  enableSettings
                                  hidePagination
                                  onSearch={this.handleSearch}
                                  fixedColumnKeys={["claimId"]}
                                  pagintionPosition="topRight"
                                  gridName="MEMBER DETAILS 2"
                                  isFetchingData={this.state.isFetchingData}
                                  columns={cobcolumns}
                                  data={this.state.filterCobData}
                                  onSettingsClick="grid-menu"
                                  scroll={{ x: 1000, y: 400 }}
                                  settingsTriDotClick={
                                    this.settingsInsuranceTriDotClick
                                  }
                                />
                              </div>
                            </span>
                          ) : (
                              ""
                            )}
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={this.state.expand === '*' || this.state.expand === "providers-tab"}
                        onChange={this.handleChange("providers-tab")}
                      >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>PCP</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h3 className="pcp-title">Summary</h3>
                        <PcpSummary />
                        <div>
                          <h3 className="conatct-info">
                            Contact Information
                            </h3>

                          <div
                            className="contact-minitabs"
                            style={{
                              position: "unset",
                              marginBottom: "20px",
                            }}
                          >
                            <FrxMiniTabs
                              tabList={this.state.miniTabs}
                              activeTabIndex={this.state.activeTabIndex}
                              onClickTab={this.onClickTab}
                            />
                          </div>
                          <PcpContactInfo />
                        </div>

                        <div>
                          <h3 className="conatct-info">Specialty</h3>
                          <PcpSpecialty />
                        </div>
                        <div>
                          <h3 className="conatct-info">State Licensure</h3>
                          <PcpStateLicensure />
                        </div>
                      </AccordionDetails>
                      </Accordion>
                    <Accordion
                      expanded={this.state.expand === '*' || this.state.expand === "preferences-tab"}
                        onChange={this.handleChange("preferences-tab")}
                      >
                        <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Pharmacy</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="contact-minitabs">
                        <FrxMiniTabs
                          tabList={this.state.miniTabsForPharmacy}
                          activeTabIndex={this.state.activeTabIndexPharmacy}
                          onClickTab={this.onClickPharmacyTab}
                        />
                      </div>
                      <h3 className="conatct-info">Demographics</h3>
                      <Demographics />
                      <div>
                        <h3 className="conatct-info">
                          Contact Information
                            </h3>
                        <div
                          className="contact-minitabs"
                          style={{
                            position: "unset",
                            marginBottom: "20px",
                          }}
                        >
                          <FrxMiniTabs
                            tabList={this.state.miniTabsForPharmacyContact}
                            activeTabIndex={
                              this.state.activeTabIndexPharmacyContact
                            }
                            onClickTab={this.onClickPharmacyContactTab}
                          />
                        </div>
                        {/* <PcpContactInfo /> */}
                        <PharmacyContactInfo
                          activeTabIndex={
                            this.state.activeTabIndexPharmacyContact
                          }
                        />
                        <div>
                          <h3 className="conatct-info">Specialty</h3>
                          <PharmacySpecialty
                            activeTabIndex={
                              this.state.activeTabIndexPharmacy
                            }
                          />
                        </div>
                        <div>
                          <h3 className="conatct-info">State Licensure</h3>
                          <PcpStateLicensure />
                        </div>
                      </div>
                    </AccordionDetails>
                      </Accordion>
                </div>
                  </div>
            </div>
              </Spin>
            </div>
          </DialogPopup>
        </React.Fragment >
      </div >
    );
  }
}

// Connect component with store.
const MemberDetailsPopup = connect(mapStateToProps)(
  ConnectedMemberDetailsPopup
);
export default MemberDetailsPopup;
