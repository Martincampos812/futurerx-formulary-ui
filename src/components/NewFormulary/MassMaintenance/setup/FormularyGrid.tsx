import React from "react";
import FrxFormularyGridContainer from "../../../shared/FrxGrid/FrxFormularyGrid/FrxFormularyGridContainer";
// import "../../../ClaimsGrid/ClaimsGrid.scss";
// import formularyGridStyles from "./FormularyGrid.module.scss";
import "./FormularyGrid.scss";

class FormularyGrid extends React.Component<any, any> {
  state = {
    isFetchingData: false,
    // data: [],
    // filteredData: [] as any[],
  };

  // componentDidMount() {
  //   const { data } = this.props;
  //   this.setState({ data, filteredData: data });
  // }
  handleSearch = (searchObject) => {
    // this.setState({ isFetchingData: true });
    // if (searchObject && searchObject.status) {
    // setTimeout(() => {
    //   const newData = this.state.data.filter(
    //     (d) => d.status === searchObject.status
    //   );
    //   this.setState({ isFetchingData: false, filteredData: newData });
    // }, 2000);
    // } else {
    // this.setState({ isFetchingData: false });
    // }
  };
  render() {
    const {
      columns,
      bordered,
      data,
      rowSelectionChange,
      enableSettings,
      isPinningEnabled,
      scroll,
    } = this.props;

    return (
      <div className="inner-container">
        <div className="pinned-table">
          <FrxFormularyGridContainer
            bordered={bordered}
            enableSearch={false}
            enableColumnDrag={false}
            onSearch={this.handleSearch}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="CLAIMS"
            enableSettings={enableSettings ? enableSettings : false}
            isFetchingData={this.state.isFetchingData}
            columns={columns}
            isRowSelectionEnabled={true}
            // rowSelectionChange={rowSelectionChange}
            isRowSelectorCheckbox={true}
            isPinningEnabled={isPinningEnabled ? isPinningEnabled : false}
            rowSelection={{
              fixed: true,
              type: "checkbox",
            }}
            scroll={Boolean(scroll) ? scroll : { x: 980, y: 450 }}
            enableResizingOfColumns={false}
            data={data}
          />
        </div>
      </div>
    );
  }
}
export default FormularyGrid;
