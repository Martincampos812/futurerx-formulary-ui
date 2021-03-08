import React from 'react';
import FrxTabs from "../../../../../../../shared/FrxTabs/FrxTabs";
import { TabInfo } from "../../../../../../../../models/tab.model";
import ChangeReport from './ChangeReport';
import ErrorDetails from './ErrorDetails';

class FileUploadDetails extends React.Component<any,any>{
    state = {
        tabs: [
            {id: 1, text: "CHANGE REPORT"}, 
            {id: 2, text: "ERROR DETAILS"}
        ],
        activeTabIndex: 0
    }
    renderActiveTabContent = () => {
        const tabIndex = this.state.activeTabIndex;
        switch (tabIndex) {
            case 0:
                return <ChangeReport />
            case 1:
                return <ErrorDetails />
        }
    }
    onClickTab = (selectedTabIndex: number) => {
        this.setState({
            activeTabIndex: selectedTabIndex
        });
    }
    render() {
        return (
            <>
                <div className="back" onClick={this.props.back}>&lt; Commercial Uploads</div>
                <div className="up-file-top">
                    <div>
                        <label>FORMULARY TYPE</label>
                        <p>Commercial</p>
                    </div>
                    <div>
                        <label>FORMULARY NAME</label>
                        <p>Commercial2020</p>
                    </div>
                    <div>
                        <label>FORMULARY ID</label>
                        <p>20998877</p>
                    </div>
                    <div>
                        <label>VERSION</label>
                        <p>1</p>
                    </div>
                    <div>
                        <label>SERVICE YEAR</label>
                        <p>2020</p>
                    </div>
                    <div>
                        <label>ADDITIONS</label>
                        <p>100</p>
                    </div>
                    <div>
                        <label>DELETIONS</label>
                        <p>20</p>
                    </div>
                    <div>
                        <label>UPDATES</label>
                        <p>5</p>
                    </div>
                    <div>
                        <label>TOTAL DRUGS PROCESSED</label>
                        <p>125</p>
                    </div>
                    <div>
                        <label>TOTAL ERRORS</label>
                        <p>7</p>
                    </div>
                </div>
                <div className="up-file-bottom">
                    <FrxTabs
                        tabList={this.state.tabs}
                        activeTabIndex={this.state.activeTabIndex}
                        onClickTab={this.onClickTab}
                    />
                    <div className="tab-content">
                        {this.renderActiveTabContent()}
                    </div>
                </div>
            </>
        )
    }
}

export default FileUploadDetails;