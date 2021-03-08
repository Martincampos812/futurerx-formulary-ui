import React from 'react';
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import { TabInfo } from "../../../models/tab.model";
import ChangeReport from './ChangeReport';
import ErrorDetails from './ErrorDetails';
import { connect } from "react-redux";
import {
    ChangeErrorRequest,
    loadChangeReports,
    loadErrorDetails
} from "../../../redux/slices/formulary/import_export/formularyImportSlice";

class FileUploadDetails extends React.Component<any,any>{
    state = {
        tabs: [
            {id: 1, text: "CHANGE REPORT"}, 
            {id: 2, text: "ERROR DETAILS"}
        ],
        activeTabIndex: 0,
        fl_id: this.props.formulary_id,
        fl_name: '',
        fl_version: '',
        fl_service_year: '',
        fl_addition:'',
        fl_deletion:'',
        fl_updates:'',
        fl_processed:'',
        fl_errors:'',
        changeReports: [],
        errorDetails: []
    }

    defaultChangeErrorRequest:ChangeErrorRequest = {
        id_formulary_import: this.props.fileID,
        index: 0,
        limit: 10,
        payload: { filter: [], search_key: "" },
    }

    renderActiveTabContent = () => {
        const tabIndex = this.state.activeTabIndex;
        switch (tabIndex) {
            case 0:
                return <ChangeReport data={this.state.changeReports} fileID={this.props.fileID}/>
            case 1:
                return <ErrorDetails data={this.state.errorDetails} fileID={this.props.fileID}/>
        }
    }
    onClickTab = (selectedTabIndex: number) => {
        this.setState({
            activeTabIndex: selectedTabIndex
        });
    }
    componentDidMount() {
        if(this.props.importFileDetails.length > 0){
            const imFLDt = this.props.importFileDetails[0];
            this.setState({
                fl_name: imFLDt.formulary_name,
                fl_version: imFLDt.version_number,
                fl_service_year: imFLDt.contract_year,
                fl_addition:imFLDt.added_drug_count,
                fl_deletion:imFLDt.removed_drug_count,
                fl_updates:imFLDt.updated_drug_count,
                fl_processed:imFLDt.total_drugs_processed,
                fl_errors:imFLDt.total_error_count
            })
        }
    }
    UNSAFE_componentWillReceiveProps(newProps){
        if(newProps.changeReports !== undefined && newProps.changeReports.length > 0){
            this.setState({
                changeReports: newProps.changeReports
            })
        }
        if(newProps.errorDetails !== undefined && newProps.errorDetails.length > 0){
            this.setState({
                errorDetails: newProps.errorDetails
            })
        }
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
                        <p>{this.state.fl_name}</p>
                    </div>
                    <div>
                        <label>FORMULARY ID</label>
                        <p>{this.state.fl_id}</p>
                    </div>
                    <div>
                        <label>VERSION</label>
                        <p>{this.state.fl_version}</p>
                    </div>
                    <div>
                        <label>SERVICE YEAR</label>
                        <p>{this.state.fl_service_year}</p>
                    </div>
                    <div>
                        <label>ADDITIONS</label>
                        <p>{this.state.fl_addition}</p>
                    </div>
                    <div>
                        <label>DELETIONS</label>
                        <p>{this.state.fl_deletion}</p>
                    </div>
                    <div>
                        <label>UPDATES</label>
                        <p>{this.state.fl_updates}</p>
                    </div>
                    <div>
                        <label>TOTAL DRUGS PROCESSED</label>
                        <p>{this.state.fl_processed}</p>
                    </div>
                    <div>
                        <label>TOTAL ERRORS</label>
                        <p>{this.state.fl_errors}</p>
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

const mapStateToProps = (state) => {
    return {
        mode: state?.setup?.mode,
        importFiles: state?.import?.importFiles,
        importFileDetails: state?.import?.importFileDetails,
        changeReports: state?.import?.changeReports,
        errorDetails: state?.import?.errorDetails
    };
};
function mapDispatchToProps(dispatch) {
    return {
        loadChangeReports: (arg) => dispatch(loadChangeReports(arg)),
        loadErrorDetails: (arg) => dispatch(loadErrorDetails(arg))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(FileUploadDetails);