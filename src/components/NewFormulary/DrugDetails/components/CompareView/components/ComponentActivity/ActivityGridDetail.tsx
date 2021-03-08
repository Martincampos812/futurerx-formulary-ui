import React from "react";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import "./ComponentActivity.scss";
import { DatePicker } from "antd";
import { getActivityDrugDetailMockData, getActivityPAMockData, getActivityQLMockData, getActivitySTMockData, getActivityTierMockData } from "../../../../../../../mocks/grid/component-activity-mock";
import FormularyExpandedDetails from "../../../../../../FormularyExpandedDetails/FormularyExpandedDetails";

const EyeIcon = () => (
  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.3002 4.18633C11.1351 1.91307 8.82856 0.375 6.18749 0.375C3.54641 0.375 1.23921 1.91414 0.0747539 4.18654C0.0256066 4.28376 0 4.39117 0 4.50011C0 4.60904 0.0256066 4.71645 0.0747539 4.81367C1.23985 7.08693 3.54641 8.625 6.18749 8.625C8.82856 8.625 11.1358 7.08586 12.3002 4.81346C12.3494 4.71624 12.375 4.60883 12.375 4.49989C12.375 4.39096 12.3494 4.28355 12.3002 4.18633ZM6.18749 7.59375C5.5756 7.59375 4.97746 7.4123 4.46869 7.07236C3.95993 6.73241 3.56339 6.24924 3.32924 5.68393C3.09508 5.11862 3.03381 4.49657 3.15318 3.89644C3.27256 3.29631 3.56721 2.74506 3.99988 2.31239C4.43254 1.87972 4.9838 1.58507 5.58393 1.4657C6.18406 1.34632 6.80611 1.40759 7.37141 1.64175C7.93672 1.87591 8.4199 2.27244 8.75985 2.7812C9.09979 3.28997 9.28124 3.88811 9.28124 4.5C9.28144 4.90633 9.20155 5.30872 9.04614 5.68416C8.89074 6.0596 8.66286 6.40073 8.37554 6.68805C8.08822 6.97537 7.74709 7.20325 7.37165 7.35865C6.99621 7.51406 6.59382 7.59395 6.18749 7.59375ZM6.18749 2.4375C6.00339 2.44007 5.82049 2.46746 5.64372 2.51893C5.78943 2.71694 5.85935 2.96062 5.84081 3.20577C5.82226 3.45092 5.71648 3.6813 5.54263 3.85515C5.36879 4.02899 5.13841 4.13477 4.89326 4.15332C4.64811 4.17186 4.40443 4.10194 4.20641 3.95623C4.09366 4.37165 4.11401 4.81197 4.26461 5.21522C4.41521 5.61846 4.68848 5.96433 5.04594 6.20413C5.4034 6.44394 5.82707 6.56561 6.2573 6.55202C6.68754 6.53842 7.10268 6.39026 7.4443 6.12837C7.78591 5.86648 8.0368 5.50405 8.16165 5.09211C8.2865 4.68016 8.27902 4.23943 8.14027 3.83196C8.00151 3.42449 7.73847 3.07078 7.38817 2.82063C7.03787 2.57048 6.61794 2.43649 6.18749 2.4375Z" fill="#707683"/>
  </svg>
);
export default class ActivityGridDetail extends React.Component<any, any> {

    state = {
        activityGridData: Array(),
        isExpanded: false
    }

    expandableDetail = (index, expandInd) => {
      let obj = this.state.activityGridData[index];
      obj.isExpanded = expandInd;
      this.state.activityGridData[index] = obj;
      this.setState({activityGridData: this.state.activityGridData});
    }

    componentDidMount(){
        if(this.props.accordionIdentifier === "tier") {
            this.setState({activityGridData: getActivityTierMockData()})
        }
        else if(this.props.accordionIdentifier === "ql") {
            this.setState({activityGridData: getActivityQLMockData()})
        }
        else if(this.props.accordionIdentifier === "st") {
          this.setState({activityGridData: getActivitySTMockData()})
        }
        else if(this.props.accordionIdentifier === "pa") {
          this.setState({activityGridData: getActivityPAMockData()})
        }
        else if(this.props.accordionIdentifier === "drug_detail") {
          this.setState({activityGridData: getActivityDrugDetailMockData()})
        }
    }
    getAccordionList =()=> {
        let result = this.state.activityGridData.map((res,index) => {
          return(
            <div>
            <div className="component-table-data-wrapper">
                          <div className="list-name"><h5>{res.name}</h5><span>{res.description}</span></div>
                          <div className="type"><span>{res.type}</span></div>
                          <div className="details"><EyeIcon /></div>
                          <div className="version-number"><span>{res.version_number}</span></div>
                          <div className="version-effective-date"><span>{res.version_effective_date}</span></div>
                          <div className="accept-reject">
                            <DropDown
                              placeholder="Accept"
                              className="accept-reject-dropdown"
                              options={["Accept", "Reject"]}
                            />
                          </div>
                          <div className="component-effective-date">
                            <DatePicker
                              className="component-effective-date-picker"
                              placeholder="Effective Date"
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
                          </div>
                          <div className="arrow">
                              {
                                 !this.state.activityGridData[index].isExpanded &&
                                <svg onClick={(e) => this.expandableDetail(index,true)} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.245493 7.97143C-0.0693603 7.66345 -0.0940685 7.23469 0.245493 6.8582L2.89068 4.09773L0.245492 1.33727C-0.0940688 0.96078 -0.0693606 0.531311 0.245492 0.225456C0.559639 -0.0825176 1.09051 -0.0627394 1.3856 0.225456C1.68069 0.512239 4.56378 3.54183 4.56378 3.54183C4.63851 3.61397 4.69794 3.70044 4.73853 3.79607C4.77913 3.8917 4.80005 3.99454 4.80005 4.09844C4.80005 4.20234 4.77913 4.30518 4.73853 4.40081C4.69794 4.49644 4.63851 4.58291 4.56378 4.65505C4.56378 4.65505 1.68069 7.68323 1.3856 7.97143C1.09051 8.26033 0.55964 8.2794 0.245493 7.97143Z" fill="#323C47"/>
                                </svg>
                              }                            
                              {
                                this.state.activityGridData[index].isExpanded &&                                
                                 <svg onClick={(e) => this.expandableDetail(index,false)} width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M0.527597 0.940805C0.835571 0.625952 1.26433 0.601244 1.64082 0.940805L4.40129 3.58599L7.16175 0.940805C7.53824 0.601244 7.96771 0.625952 8.27357 0.940805C8.58154 1.25495 8.56176 1.78583 8.27357 2.08091C7.98678 2.376 4.9572 5.25909 4.9572 5.25909C4.88505 5.33382 4.79858 5.39325 4.70295 5.43385C4.60732 5.47444 4.50448 5.49536 4.40058 5.49536C4.29668 5.49536 4.19385 5.47444 4.09821 5.43385C4.00258 5.39325 3.91611 5.33382 3.84397 5.25909C3.84397 5.25909 0.815793 2.376 0.527597 2.08091C0.238694 1.78583 0.219623 1.25495 0.527597 0.940805Z" fill="#323C47"/>
                                 </svg>                              
                              }
                          </div>
                        </div>
                        {

                          this.state.activityGridData[index].isExpanded &&
                          <div className="expanded-detail">
                          <br/>
                          <FormularyExpandedDetails />
                          </div>
                        }
                  </div>
          )
        })
      
        return result;
      }

    render() {
        let list = this.getAccordionList();
        return(
            <>
                {list}
            </>
        );
    }
}