import React from "react";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import "./ComponentActivity.scss";
import { DatePicker } from "antd";
import { getConflictActivityTierMockData } from "../../../../../../../mocks/grid/component-activity-mock";
import FormularyExpandedDetails from "../../../../../../FormularyExpandedDetails/FormularyExpandedDetails";
import SearchBox from "../../../../../../shared/Frx-components/search-box/SearchBox";
import { Box, Input } from "@material-ui/core";
import ConflictActivityExpandedDetail from "./ConflictActivityExpandedDetail";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { forEach } from "lodash";

const WarningIcon = () => (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5241 10.3128C12.93 11.0627 12.4205 12 11.6098 12H1.05675C0.244477 12 -0.262673 11.0612 0.14244 10.3128L5.41903 0.562149C5.82513 -0.188062 6.84227 -0.186703 7.24765 0.562149L12.5241 10.3128ZM6.33334 8.29688C5.77467 8.29688 5.32177 8.77957 5.32177 9.375C5.32177 9.97043 5.77467 10.4531 6.33334 10.4531C6.89202 10.4531 7.34491 9.97043 7.34491 9.375C7.34491 8.77957 6.89202 8.29688 6.33334 8.29688ZM5.37294 4.42158L5.53607 7.60908C5.5437 7.75823 5.65941 7.875 5.79956 7.875H6.86712C7.00727 7.875 7.12298 7.75823 7.13061 7.60908L7.29374 4.42158C7.30199 4.26047 7.18163 4.125 7.03025 4.125H5.63641C5.48503 4.125 5.36469 4.26047 5.37294 4.42158Z" fill="#F89090"/>
    </svg>    
);

const RefreshGridIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.68875 3.12375C7.95605 2.43769 7.00519 2.06161 5.99644 2.0625C4.18102 2.06409 2.61375 3.30886 2.18102 5.03555C2.14952 5.16124 2.03754 5.25 1.90795 5.25H0.564914C0.38918 5.25 0.25568 5.09046 0.288187 4.91775C0.795305 2.22478 3.15968 0.1875 6 0.1875C7.55737 0.1875 8.97166 0.800062 10.0152 1.7973L10.8523 0.960234C11.2066 0.605883 11.8125 0.856852 11.8125 1.35799V4.5C11.8125 4.81066 11.5607 5.0625 11.25 5.0625H8.10799C7.60685 5.0625 7.35588 4.45662 7.71023 4.10224L8.68875 3.12375ZM0.75 6.9375H3.89201C4.39315 6.9375 4.64412 7.54338 4.28977 7.89776L3.31125 8.87627C4.04395 9.56236 4.99488 9.93844 6.00366 9.93752C7.81814 9.93588 9.38604 8.69196 9.81898 6.9645C9.85048 6.8388 9.96246 6.75005 10.092 6.75005H11.4351C11.6108 6.75005 11.7443 6.90959 11.7118 7.0823C11.2047 9.77522 8.84032 11.8125 6 11.8125C4.44263 11.8125 3.02834 11.1999 1.9848 10.2027L1.14773 11.0398C0.793383 11.3941 0.1875 11.1431 0.1875 10.642V7.5C0.1875 7.18934 0.439336 6.9375 0.75 6.9375Z" fill="#707683"/>
</svg>

);



export default class ActivityGridConflictDetail extends React.Component<any, any> {

    state = {
        activityGridData: Array(),
        isExpanded: false
    }

    ExpanAllClickHandler = () => {
        for(let i=0; i<this.state.activityGridData.length; i++) {
            this.state.activityGridData[i].isExpanded = true;
        }
       
        this.setState({activityGridData: this.state.activityGridData});
    }

    expandableDetail = (index, expandInd) => {
      let obj = this.state.activityGridData[index];
      obj.isExpanded = expandInd;
      this.state.activityGridData[index] = obj;
      this.setState({activityGridData: this.state.activityGridData});
    }

    componentDidMount(){
        this.setState({activityGridData: getConflictActivityTierMockData()})
    }
    getAccordionList =()=> {
        let result = this.state.activityGridData.map((res,index) => {
          return(                          
            
            <div className="activity-container">
                <div className="accordion-wrapper">
                <div className="component-table-conflict-data-wrapper">
                    <div className="table-left-controls">
                        <div className="list-name"><span>{res.name}</span></div>
                        <div className="type"><span>{res.type}</span></div>
                        {this.state.activityGridData[index].isExpanded && 
                            <div className="refresh-btn"><RefreshGridIcon /></div>
                        }
                    </div>
                    <div className="table-right-controls">
                        <div className="conflict-label">
                            <span>{res.rxcui_count}</span><span className="set-left-margin">RxCUI</span>
                        </div>
                        <div className="conflict-label set-margin">
                            <span><WarningIcon /></span>
                            <span className="set-left-margin">{res.conflicts_count}</span>
                            <span className="set-left-margin">conflicts</span>
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
                </div>
                {

                    this.state.activityGridData[index].isExpanded &&
                    <div className="conflict-expanded-detail">
                    <br/>
                    <ConflictActivityExpandedDetail />
                    </div>
                }
            </div>
        </div>
          )
        })
      
        return result;
      }

    render() {
        let list = this.getAccordionList();
        return(
            <div className="conflict-activity-wrapper">
                <div className="conflict-heading-wrapper">
                    <span>tier Conflicts</span>
                </div> 
                <div className="conflict-controls-wrapper">
                    <div className="input-control">
                        <DropDown
                            placeholder="Sort By"
                            className="formulary-type-dropdown"
                            options={["Ascending", "Descending"]}
                        />
                    </div>
                    <div className="input-control set-left-margin set-right-margin">
                        <div className="search-input">
                        <Input
                            className="formulary-list-search"
                            placeholder="Search"
                            type="text"
                            disableUnderline={true}
                            startAdornment={
                                <svg
                                className="member-search__icon"
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
                            />
                        </div>
                    </div>
                    <div className="expand-all" onClick = {()=> this.ExpanAllClickHandler()}>Expand All</div>

                </div> 
                {list}


                <Box display="flex" justifyContent="flex-end">
                    <Button
                        className="Button view-fl-btn"
                        label="Approve" 
                    />
                </Box>
            </div>
        );
    }
}