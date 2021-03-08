import React from "react";
import { getConflictExpandedMockData } from "../../../../../../../mocks/grid/component-activity-mock";
import { getConflictExpandedMockColumns } from "../../../../../../../utils/grid/columns";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxGridContainer";

export default class ConflictActivityExpandedDetail extends React.Component<any, any> {
    state = {
        rowsData: [],
        columns: [],
      }
      
      handleOnDragRows = (fromIndex, toIndex) => {
        let swappedArray = JSON.parse(JSON.stringify(this.swapArrayLocs(fromIndex, toIndex)));
        this.setState({
          rowsData: swappedArray
        })
      }
    componentDidMount(){
        this.setState({columns: getConflictExpandedMockColumns(), rowsData: JSON.parse(JSON.stringify(getConflictExpandedMockData())) } );
      }
   
     swapArrayLocs = (fromIndex, toIndex) => {
       const { rowsData } = this.state;
       let toValue = rowsData[toIndex];
       
       rowsData[toIndex] = rowsData[fromIndex];
       rowsData[fromIndex] = toValue;
       
       return [...rowsData];
     }

    render(){
        const { rowsData, columns } = this.state;
        return(
            <div className="conflict-expanded-continer">
                
                <div className="conlict-expanded-table">
                <h1>Group 1</h1>
                
                <FrxGridContainer
                isPinningEnabled={false}
                bordered = {true}
                enableSettings={true}
                isCustomCheckboxEnabled={false}
                enableSearch={false}
                enableColumnDrag={false}
                enableRowDrag={true}
                onRowDrag={this.handleOnDragRows}
                customSettingIcon={"NONE"}
                onSearch={() => {}}
                fixedColumnKeys={[]}
                pagintionPosition="topRight"
                hidePagination = {true}
                gridName="tierSequence"
                columns={columns}
                scroll={{ x: 810, y: 377 }}
                isFetchingData={false}
                enableResizingOfColumns
                data={JSON.parse(JSON.stringify(rowsData))  }
                rowSelection={{
                  columnWidth: 50,
                  fixed: true,
                  type: "checkbox",
                }}
              />
                </div>
            </div>
        )
    }
}