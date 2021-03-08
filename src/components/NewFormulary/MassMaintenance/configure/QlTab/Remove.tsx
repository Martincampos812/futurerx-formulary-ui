import React, { Component } from "react";
import { QlRemoveColumns } from "../../../../../utils/grid/columns"; //"../../../../../utils/grid/columns";
import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";
import * as constants from "../../../../../api/http-commons"; //"../../../../../api/http-commons";
//"../../../../shared/FrxGrid/FrxDrugGridContainer";
import { postCriteriaListQl } from "../../../../../redux/slices/formulary/ql/qlActionCreation";
import Button from "../../../../shared/Frx-components/button/Button";
import RadioButton from "../../../../shared/Frx-components/radio-button/RadioButton";
import { connect } from "react-redux";

import Label from "../../../../shared/Frx-components/label/Label";
import getLobCode from "../../../Utils/LobUtils";

function mapDispatchToProps(dispatch) {
  return {
    postCriteriaListQl: (a) => dispatch(postCriteriaListQl(a)),
  };
}

function mapStateToProps(state) {
  return {
    qlData: state.qlReducer.data,
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob: state.maintenance?.selectedRow?.id_lob,
    // inState: state,
  };
}

// interface Props {
//   formularyId: any;
//   path: any;
// }
interface State {}

class Remove extends Component<any, State> {
  state = {
    drugGridData: [],
    drugData: [],
    filter: Array(),
    selectedRowKeys: Array(),
    fixedSelectedRows: Array(),
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    // this.props.selectedCriteria = [];

    let currentSelectedCriteriaIds = [];
    let tempDrugData: any = [...this.state.drugData];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      currentSelectedCriteriaIds = selectedRowKeys.map(
        (Id) => tempDrugData[Id - 1]["id_ql_criteria"]
      );
    }

    console.log("[currentSelectedCriteriaIds]:", currentSelectedCriteriaIds);

    // alert("in remvove" + selectedRowKeys);
    this.props.onUpdateSelectedCriteria(currentSelectedCriteriaIds,this.props.formularyId);
  };

  getDrugCriteria = () => {
    // debugger;
    let apiDetails = {};
    let currentLob = getLobCode(this.props.id_lob);
    if (this.props.id_lob == 1) {
      if (this.props.formulary_type_id != 1) {
        currentLob = this.props.selectedQlFileType;
      }
    }
    apiDetails["pathParams"] =
      this.props.formularyId + "/" + currentLob;
    //this.props.current_formulary.formulary_type_info.formulary_type_code;
    apiDetails["keyVals"] = [
      {
        key: constants.KEY_ENTITY_ID,
        value: this.props.formularyId,
      },
    ];
    apiDetails["messageBody"] = {};
    this.props.postCriteriaListQl(apiDetails).then((json) => {
      console.log("[postCriterial]:", json);
      this.loadGridData(json);
    });
  };

  loadGridData(json: any) {
    {
      // this.props.onUpdateSelectedCriteria([]);
      //   const { isLoading } = this.state;
      //   this.setState({ isLoading: !isLoading });
      let tmpData = json.payload.result;
      var data: any[] = [];
      let count = 1;
      var gridData: any = tmpData.map(function (el) {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;
        gridItem["quantity"] = element.quantity;
        gridItem["quantity_limit_days"] = element.quantity_limit_days;
        gridItem["quantity_limit_period_of_time"] =
          element.quantity_limit_period_of_time;
        gridItem["quantity_limit_period_of_time"] =
          element.quantity_limit_period_of_time;
        gridItem["fills_allowed"] = element.fills_allowed;
        gridItem["full_limit_period_of_time"] =
          element.full_limit_period_of_time;

        count++;
        return gridItem;
      });
      this.setState({
        // isLoading: !isLoading,
        drugData: data,
        drugGridData: gridData,
      });
    }
  }

  

  componentDidMount() {
    // /api/1/criteria-list-ql/3302/COMM?entity_id=3302
    // :scheme: https
    this.getDrugCriteria();

    this.props.onUpdateSelectedCriteria([]);
  }

  componentDidUpdate(prevProps) {
    // debugger;
    console.log("update remove compoenent");
    if (prevProps.selectedQlFileType !== this.props.selectedQlFileType) {
      // alert("differ in props " + this.props.selectedQlFileType);
      this.getDrugCriteria();
    }
  }


  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    // debugger;
    console.log("data row ", selectedRow, isSelected, key);
    // this.state.selectedRowKeys = [
    //   ...this.state.selectedRowKeys,
    //   selectedRow.key,
    // ];
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = true;
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) d["isChecked"] = false;
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        const removeSelectedCriteria = this.props.selectedCriteria.filter(
          (drugId) =>
            drugId !== this.props.selectedCriteria[selectedRow.key - 1]
        );
        // this.onSelectedTableRowChanged(selectedRows);
        this.props.onUpdateSelectedCriteria(removeSelectedCriteria);
        this.setState({
          drugGridData: data,
        });
      }
    }
  };

  

  render() {
    return (
      <div>
        <div className="tier-grid-container ql-remove-grid">
          {this.props.formulary_type_id == 2 ? (
            this.props.radioButtons.length > 0 ? (
              <div className="input-group">
                <Label required={true}>
                  What file type would you like to remove criteria from?
                </Label>
                <div className="radio-group">{this.props.radioButtons}</div>
              </div>
            ) : null
          ) : null}
<FrxDrugGridContainer
            isDataLoaded={true}
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="DRUG GRID"
            enableSettings={false}
            columns={QlRemoveColumns()}
            scroll={{ x: 500, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.drugGridData}
            settingsWidth={10}
            hideItemsPerPage
            hidePageJumper
            hideResults
           
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
              onChange: this.onSelectedTableRowChanged,
            }}
          />
          
          
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Remove);
