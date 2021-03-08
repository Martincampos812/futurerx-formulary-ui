import React from 'react';
import {fileUploadErrorDetailsColumns} from "../../../../../../../../utils/grid/columns";
import FrxGridContainer from "../../../../../../../shared/FrxGrid/FrxDrugGridContainer";

const errorData = [
    {
        id: 1,
        key: 1,
        value: 234255,
        file_type: "Drug Details",
        error_reason: "M/I PA Type"
    },
    {
        id: 2,
        key: 2,
        value: 234255,
        file_type: "Drug Details",
        error_reason: "M/I Tier"
    },
    {
        id: 3,
        key: 3,
        value: 234255,
        file_type: "Drug Details",
        error_reason: "M/I LA Indicator"
    }
]

class ErrorDetails extends React.Component<any,any>{
    state = {
        errorData: [],
    }
    componentDidMount() {
        this.setState({
            errorData: errorData
        })
    }
    render(){
        return(
            <div className="change-report-table">
                <FrxGridContainer
                        enableSearch={false}
                        enableColumnDrag
                        hidePagination
                        isDataLoaded={true}
                        fixedColumnKeys={[]}
                        pagintionPosition="topRight"
                        gridName="Upload File"
                        columns={fileUploadErrorDetailsColumns()}
                        scroll={{ x: 0, y: 377 }}
                        isFetchingData={false}
                        enableResizingOfColumns
                        data={this.state.errorData}
                    />
            </div>
        )
    }
}

export default ErrorDetails;