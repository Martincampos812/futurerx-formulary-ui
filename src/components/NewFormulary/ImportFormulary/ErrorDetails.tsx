import React from 'react';
import {fileUploadErrorDetailsColumns} from "../../../utils/grid/columns";
import FrxGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { connect } from "react-redux";
import {
    ChangeErrorRequest,
    loadErrorDetails
} from "../../../redux/slices/formulary/import_export/formularyImportSlice";

let Def_ChangeErrorRequest:ChangeErrorRequest = {
    id_formulary_import: 0,
    index: 0,
    limit: 10,
    payload: { filter: [], search_key: "" },
}

class ErrorDetails extends React.Component<any,any>{
    state = {
        errorData: [],
        errorDetailsCount: 0
    }
    ChangeErrorRequest:ChangeErrorRequest = {
        id_formulary_import: this.props.fileID,
        index: 0,
        limit: 10,
        payload: { filter: [], search_key: "" },
    }    
    componentDidMount(){
        Def_ChangeErrorRequest.id_formulary_import = this.props.fileID;
        this.props.loadErrorDetails(this.ChangeErrorRequest);
    }
    UNSAFE_componentWillReceiveProps(newProps){
        // debugger;
        if(newProps.errorDetails !== undefined && newProps.errorDetails.length > 0){
            debugger;
            const getData = newProps.errorDetails.map((e,index) => {
                return {
                    id: index,
                    key: index,
                    value: e.field_value,
                    file_type: e.file_type,
                    error_reason: e.error_description
                }
            })
            this.setState({
                errorData: getData
            })
        }
        if(newProps.errorDetailsCount !== undefined){
            this.setState({
                errorDetailsCount: newProps.errorDetailsCount
            })
        }
    }
    onGridPageChangeHandler = (pageNumber: any) => {
        this.ChangeErrorRequest.index = (pageNumber - 1) * this.ChangeErrorRequest.limit;
        this.props.loadErrorDetails(this.ChangeErrorRequest);
    };
    onPageSize = (pageSize) => {
        this.ChangeErrorRequest = { ...Def_ChangeErrorRequest };
        this.ChangeErrorRequest.limit = pageSize;
        this.props.loadErrorDetails(this.ChangeErrorRequest);
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
                    totalRowsCount={this.state.errorDetailsCount}
                    columns={fileUploadErrorDetailsColumns()}
                    scroll={{ x: 0, y: 377 }}
                    pageSize={this.ChangeErrorRequest.limit}
                    selectedCurrentPage={
                        this.ChangeErrorRequest.index / this.ChangeErrorRequest.limit + 1
                    }
                    isFetchingData={false}
                    onGridPageChangeHandler={this.onGridPageChangeHandler}
                    getPerPageItemSize={this.onPageSize}
                    enableResizingOfColumns
                    data={this.state.errorData}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        errorDetails: state?.import?.errorDetails,
        errorDetailsCount: state?.import?.errorDetailsCount,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        loadErrorDetails: (arg) => dispatch(loadErrorDetails(arg))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ErrorDetails);