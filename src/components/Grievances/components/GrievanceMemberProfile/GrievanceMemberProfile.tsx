import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MemberInfoContainer from "../../../member-info-container/MemberInfoContainer";
import SummaryInfo from "../../../SummaryInfo/SummaryInfo";
import Constants from "../../../../constants/Constants";
import memberinfoService from "../../../../services/memberinfo.service";
import AttributesPanel from "../../../user-details/attributes-panel/AttributesPanel";
import ClinicalDiagnosisHistory from "../../../clinical-diagnosis/ClinicalDiagnosisHistory";
import MemberNotification from "../../../member/MemberNotification";
import Accumulators from "../../../accumulators/Accumulators";
import Barriers from "../../../barriers/Barriers";
import Claim from "../../../claim/Claim";
import MemberCostshare from "../../../MemberCostshare/MemberCostshare";
import "../../../MemberProfile/MemberProfile.scss";
import './GrievanceMemberProfile.scss';

export default class GMemberProfile extends React.Component<any,any>{
    state = {
        activeTabIndex: 0,
        memberInfo: null,
        isMemberDropDownOpen: false,
        demographicsData: [],
        elegibilityData: [],
        providersData: [],
        prefrencesData: [],
        user: undefined,
        loading: false,
        memberInformation: [],
        contactInformation: [],
        newGrievances: false,
        openPopup: false,
        claimIndex: 0,
        showFullMemberInfo: false
      };
    hideMembers = () => {
        console.log("hide");
        this.setState({ isMemberDropDownOpen: false });
      };
      showMembers = () => {
        console.log("open");
        this.setState({ isMemberDropDownOpen: true });
      };
      onMemberSelect = async id => {
        this.getInfoCardData(id);
      };
      componentDidMount = () => {
        console.log("MemberProfile::componentDidMount", this.props);
        this.getInfoCardData(Constants.MEMBER_ID);
      };
      getInfoCardData = async id => {
        const res = await memberinfoService.getInfoCardsData(id);
        // Demographics //
    
        if (res && res.data.data) {
          const preferences = res.data.data.preferences;
          const summary = res.data.data.member_summary;
          const providers = res.data.data.providers;
          const pcpData = providers.pcp;
          const pcpLocation1 = providers.pcp.data.locations[0];
          const pcpLocation2 = providers.pcp.data.locations[1];
          const eligibility = res.data.data.eligibility;
          const demographics = res.data.data.demographics;
    
          let demographicsData = [
            {
              member_id: demographics.member_id,
              dob: demographics.dob,
              language: demographics.language
            }
          ];
    
          let elegibilityData = [
            {
              start_date: eligibility.start_date,
              term_date: eligibility.term_date,
              transition_date: eligibility.transition_date
            }
          ];
    
          let prefrencesData = [
            {
              pcm: preferences.pcm,
              aor_poa: preferences.aor_poa
            }
          ];
          let user = {
            family_id: summary.family_id,
            family_members: summary.family_members,
            first_name: summary.first_name,
            middle_name: summary.middle_name,
            last_name: summary.last_name,
            id_member_info: summary.id_member_info,
            status: summary.status,
            img_url: summary.img_url,
            gender: summary.gender,
            lob: summary.lob
          };
    
          let providersData = [
            {
              pcp: pcpData.pcp,
              primary_pharmacy: providers.primary_pharmacy.primary_pharmacy,
              secondary_pharmacy: providers.secondary_pharmacy.secondary_pharmacy,
              physician_since: pcpData.data.physician_since,
              in_network: pcpData.data.in_network,
              npi: pcpData.data.npi,
              address1: pcpLocation1.address,
              phone1: pcpLocation1.phone,
              fax1: pcpLocation1.fax,
              address2: pcpLocation2.address,
              phone2: pcpLocation2.phone,
              fax2: pcpLocation2.fax,
              primary_pharmacy_npi: providers.primary_pharmacy.data.npi,
              primary_pharmacy_address: providers.primary_pharmacy.data.address,
              primary_pharmacy_phone: providers.primary_pharmacy.data.phone,
              primary_pharmacy_fax: providers.primary_pharmacy.data.fax,
              secondary_pharmacy_npi: providers.secondary_pharmacy.data.npi,
              secondary_pharmacy_address: providers.secondary_pharmacy.data.address,
              secondary_pharmacy_phone: providers.secondary_pharmacy.data.phone,
              secondary_pharmacy_fax: providers.secondary_pharmacy.data.fax
            }
          ];
    
          this.setState({
            user,
            prefrencesData,
            providersData,
            elegibilityData,
            demographicsData,
            loading: false
          });
        }
        // Prefrences //
      };
      toggleMemebrPorfileHandler = () => {
          this.setState({showFullMemberInfo: !this.state.showFullMemberInfo});
      }
    render(){
        const hiddenContentClass = this.state.showFullMemberInfo ? 'hidden-content open' : 'hidden-content';
        return(
            <div className="grievance-member-wrapper">
                <MemberInfoContainer
                    hideMembers={this.hideMembers}
                    showMembers={this.showMembers}
                    isOpen={this.state.isMemberDropDownOpen}
                    onMemberSelect={this.onMemberSelect}
                    user={this.state.user}
                    // memberInformation={this.state.memberInformation}
                    memberInformation={this.props.memberInformation}
                    contactInformation={this.props.contactInformation}
                  />
                  <Container className="tab-content">
                    {/* <MemberInfo /> */}
                    <SummaryInfo
                      memberInfo={this.state.memberInfo} // This is null.
                      demographicsData={this.state.demographicsData}
                      elegibilityData={this.state.elegibilityData}
                      providersData={this.state.providersData}
                      prefrencesData={this.state.prefrencesData}
                    />
                    <div>
                      <Container className="member-components-container">
                        <Grid item xs={12}>
                          <div className="bg-white attributes-container">
                            {/* <Attributes /> */}
                            <AttributesPanel />
                          </div>
                        </Grid>
                      </Container>
                    </div>
                    {this.state.showFullMemberInfo ? (
                    <div className={hiddenContentClass}>
                        <div>
                        <Container className="member-components-container">
                            <Grid container>
                            <Grid item xs={7}>
                                <div className="bg-white cdh1-mn-container">
                                <ClinicalDiagnosisHistory />
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div className="bg-white cdh-mn-container">
                                <MemberNotification />
                                </div>
                            </Grid>
                            </Grid>
                        </Container>
                        </div>
                        <div>
                        <Container className="member-components-container">
                            <Grid container>
                            <Grid item xs={8}>
                                <div className="bg-white acc-barr-container">
                                <Accumulators />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="bg-white acc-barr-container">
                                <Barriers />
                                </div>
                            </Grid>
                            </Grid>
                        </Container>
                        </div>
                        <div>
                        <Container className="member-components-container">
                            <Grid item xs={12}>
                            <div className="bg-white claim-container">
                                <Claim 
                                activeIndex={this.state.claimIndex} 
                                 memberInformation={this.props.memberInformation}
                                 contactInformation={this.props.contactInformation}
                                />
                            </div>
                            </Grid>
                        </Container>
                        </div>
                        <div>
                        <Container className="member-components-container">
                            <Grid item xs={12}>
                            <div className="bg-white membercostshare-container">
                                <MemberCostshare />
                            </div>
                            </Grid>
                        </Container>
                        </div>
                    </div>):null}
                    <div className="toggle-member-wrapper">
                        <div className="member-toggle" onClick={this.toggleMemebrPorfileHandler}>
                            {this.state.showFullMemberInfo ? (
                                <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5L6.4453 1.3698C6.7812 1.14587 7.2188 1.14587 7.5547 1.3698L13 5" stroke="#1D54B4" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            ) : (
                                <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L6.4453 4.6302C6.7812 4.85413 7.2188 4.85413 7.5547 4.6302L13 1" stroke="#1D54B4" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            )}
                            
                        </div>
                    </div>
                    {/* </Container> */}
                  </Container>
            </div>
        )
    }
}