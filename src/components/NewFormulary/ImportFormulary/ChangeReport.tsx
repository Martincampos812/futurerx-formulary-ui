import React from 'react';
import {changeReportColumns} from "../../../utils/grid/columns";
import FrxGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { connect } from "react-redux";
import {
    ChangeErrorRequest,
    loadChangeReports
} from "../../../redux/slices/formulary/import_export/formularyImportSlice";

let Def_ChangeErrorRequest:ChangeErrorRequest = {
    id_formulary_import: 0,
    index: 0,
    limit: 10,
    payload: { filter: [], search_key: "" },
}

class ChangeReport extends React.Component<any,any>{
    state = {
        changedData: [],
        changeReportsCount: 0
    }
    ChangeErrorRequest:ChangeErrorRequest = {
        id_formulary_import: this.props.fileID,
        index: 0,
        limit: 10,
        payload: { filter: [], search_key: "" },
    }    
    componentDidMount(){
        Def_ChangeErrorRequest.id_formulary_import = this.props.fileID;
        this.props.loadChangeReports(this.ChangeErrorRequest);
    }
    
    UNSAFE_componentWillReceiveProps(newProps){
        if(newProps.changeReports !== undefined && newProps.changeReports.length > 0){
            const getData = newProps.changeReports.map((e,index) => {
                return {
                    id: index,
                    key: index,
                    value: e.record_value,
                    file_type: e.file_type,
                    change_type: e.change_type,
                    field_update: e.filed_name,
                    prior_value: e.prior_value,
                    new_value: e.new_value
                }
            })
            this.setState({
                changedData: getData
            })
        }
        if(newProps.changeReportsCount !== undefined){
            this.setState({
                changeReportsCount: newProps.changeReportsCount
            })
        }
    }
    
    onGridPageChangeHandler = (pageNumber: any) => {
        this.ChangeErrorRequest.index = (pageNumber - 1) * this.ChangeErrorRequest.limit;
        this.props.loadChangeReports(this.ChangeErrorRequest);
    };
    onPageSize = (pageSize) => {
        this.ChangeErrorRequest = { ...Def_ChangeErrorRequest };
        this.ChangeErrorRequest.limit = pageSize;
        this.props.loadChangeReports(this.ChangeErrorRequest);
    };
    render(){
        return(
            <div className="change-report-table">
                <FrxGridContainer
                    enableSearch={false}
                    enableColumnDrag
                    isDataLoaded={false}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName="Upload File"
                    totalRowsCount={this.state.changeReportsCount}
                    columns={changeReportColumns()}
                    scroll={{ x: 0, y: 377 }}
                    pageSize={this.ChangeErrorRequest.limit}
                    selectedCurrentPage={
                        this.ChangeErrorRequest.index / this.ChangeErrorRequest.limit + 1
                    }
                    isFetchingData={false}
                    onGridPageChangeHandler={this.onGridPageChangeHandler}
                    getPerPageItemSize={this.onPageSize}
                    enableResizingOfColumns
                    data={this.state.changedData}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        changeReports: state?.import?.changeReports,
        changeReportsCount: state?.import?.changeReportsCount,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        loadChangeReports: (arg) => dispatch(loadChangeReports(arg))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangeReport);