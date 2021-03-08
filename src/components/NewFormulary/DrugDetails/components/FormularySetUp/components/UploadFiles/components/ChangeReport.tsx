import React from 'react';
import {changeReportColumns} from "../../../../../../../../utils/grid/columns";
import FrxGridContainer from "../../../../../../../shared/FrxGrid/FrxDrugGridContainer";

const changedData = [
    {
        id: 1,
        key: 1,
        value: 234255,
        file_type: "Drug Details",
        change_type: "ADD",
        field_update: "",
        prior_value: "",
        new_value: ""
    },
    {
        id: 2,
        key: 2,
        value: 234255,
        file_type: "Drug Details",
        change_type: "DEL",
        field_update: "",
        prior_value: "",
        new_value: ""
    },
    {
        id: 3,
        key: 3,
        value: 234255,
        file_type: "Drug Details",
        change_type: "UPD",
        field_update: "PA Type",
        prior_value: 1,
        new_value: 2
    },
    {
        id: 4,
        key: 4,
        value: 234255,
        file_type: "Drug Details",
        change_type: "UPD",
        field_update: "QL Amount",
        prior_value: 30,
        new_value: 0
    },
    {
        id: 5,
        key: 5,
        value: 234255,
        file_type: "Drug Details",
        change_type: "UPD",
        field_update: "QL Date",
        prior_value: 30,
        new_value: 0
    },
    
]

class ChangeReport extends React.Component<any,any>{
    state = {
        changedData: [],
    }
    componentDidMount() {
        this.setState({
            changedData: changedData
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
                        columns={changeReportColumns()}
                        scroll={{ x: 0, y: 377 }}
                        isFetchingData={false}
                        enableResizingOfColumns
                        data={this.state.changedData}
                    />
            </div>
        )
    }
}

export default ChangeReport;