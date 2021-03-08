import React from 'react';
import GrievanceIntake from '../GrievancesIntake/GrievancesIntake';
import GrievancesDetails from '../GrievancesDetails/GrievancesDetails';
import GrievancesIssueResolution from '../GrievancesIssueResolution/GrievancesIssueResolution';
import GrievancesNotification from '../GrievancesNotification/GrievancesNotification';

export default class RowInfo extends React.Component<any,any>{
    render(){
        const parent = document.querySelector('.all-grievance-table .ant-table-body') as HTMLDivElement;
        const parentWidth = parent.offsetWidth - 7 + 'px';
        console.log(parentWidth);
        return(
            <div className="all-row-info grievance-accordian" style={{width: parentWidth}}>
                <GrievanceIntake intakeData={this.props.intakeData}/>
                <GrievancesDetails details={this.props.details} />
                <GrievancesIssueResolution issueResolutionData={this.props.issueResolutionData}/>
                <GrievancesNotification notificationData={this.props.notificationData}/>
            </div>
        )
    }
}