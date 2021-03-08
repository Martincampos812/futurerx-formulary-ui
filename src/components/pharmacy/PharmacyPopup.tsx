import React from "react";
import { Spin, message } from 'antd';
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
import PcpSpecialty from "../pcp-info/pcp-specialty";
import PcpStateLicensure from "../pcp-info/pcp-statelicensure";
import Demographics from "../pharmacy-info/demographics";
import PharmacyContactInfo from "../pharmacy-info/contact-info";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import { eligibilityGridColumns } from "../../utils/grid/columns";
import { getDemographicsGridData } from "../../mocks/grid/demographics-mock";
import EligibilityPopup from "../eligibility-info/eligibility-popup";
import EligibilityInsurancePopup from "../eligibility-info/EligibilityInsurancePopup";
import FrxLoader from '../shared/FrxLoader/FrxLoader';
import Messages from '../../constants/Messages';
import { API } from '../../api/httptemp-helper';


import "./PharmacyPopup.scss";

interface PharmacyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  panelName: string
}

class PharmacyPopup extends React.Component<PharmacyPopupProps> {
  state = {
    isMemberNotificationsDialogOpen: this.props.isOpen,
    miniTabsForPharmacy: [],
    miniTabsForPharmacyContact: [],
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
    memberDetailsData: [],
    memberAddressData: [],
    isLoader: false
  };

  componentDidMount() {

    this.setState({ expand: this.props.panelName });

    
    const miniTabsForPharmacy: any[] = [
      {
        id: 1,
        text: "Primary Pharmacy"
      },
      {
        id: 2,
        text: "Secondary Pharmacy"
      }
    ];

    const miniTabsForPharmacyContact: any[] = [
      {
        id: 1,
        text: "Location Address"
      },
      {
        id: 2,
        text: "Mailing Address"
      }
    ];


    this.setState({
      miniTabsForPharmacy,
      miniTabsForPharmacyContact
    });
  }





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

  render() {
    const { isMemberNotificationsDialogOpen, selectedTab } = this.state;

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
            className="pharmacy-details-popup-root"
          >


            <div>
              <div>
                <div className="accordion-container">
                  <Accordion
                    expanded={this.state.expand === "pharmacyTab"}
                    onChange={this.handleChange("pharmacyTab")}
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
                        <h3 className="conatct-info">Contact Information</h3>
                        <div
                          className="contact-minitabs"
                          style={{ position: "unset", marginBottom: "20px" }}
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
                        <PharmacyContactInfo activeTabIndex={this.state.activeTabIndexPharmacyContact} />
                        <div>
                          <h3 className="conatct-info">Specialty</h3>
                          <PcpSpecialty />
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

          </DialogPopup>
        </React.Fragment>

      </div>
    );
  }
}

export default PharmacyPopup;
