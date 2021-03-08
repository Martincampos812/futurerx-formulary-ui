import React from "react";
import Grid from "@material-ui/core/Grid";
import { Table } from "antd";
import { connect } from "react-redux";
import {
  GET_OTHER_CRITERIA_LIST,
  KEY_ENTITY_ID,
} from "../../../../../api/http-drug-details";
import { getOTHERCriteriaList } from "../../../../../redux/slices/formulary/drugDetails/other/otherActionCreation";

function mapDispatchToProps(dispatch) {
  return {
    getOTHERCriteriaList: (a) => dispatch(getOTHERCriteriaList(a)),
  };
}

class MMOtherReplace extends React.Component<any, any> {
  state = {
    selectedCriteria: [],
    otherColumns: [
      {
        title: "User Defined Field",
        dataIndex: "udf",
        key: "udf",
      },
    ],
    otherData: [] as any[],
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    const { activeTabIndex } = this.props;

    this.setState({ selectedCriteria: [] }, () => {
      if (selectedRowKeys && selectedRowKeys.length > 0) {
        if (activeTabIndex === 2) {
          let criteriaIds: any[] = [];
          for (let i = 0; i < this.state.otherData.length; i++) {
            if (this.state.otherData[i].key === selectedRowKeys[i]) {
              criteriaIds.push(this.state.otherData[i].code_value);
            }
          }
        }

        this.setState({
          selectedCriteria: selectedRowKeys.map((otId) => otId),
        });
        selectedRowKeys = [];
      }
    });
  };

  getOTHERCriteriaList = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_OTHER_CRITERIA_LIST;
    apiDetails["pathParams"] = this.props.drug.id_formulary;
    apiDetails["keyVals"] = [
      { key: KEY_ENTITY_ID, value: this.props.drug.id_formulary },
    ];

    this.props.getOTHERCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          key: ele["id_edit"],
          udf: ele["edit_name"],
          code_value: ele["code_value"],
        };
        return curRow;
      });

      this.setState({
        otherData: settingsRows,
      });
    });
  };

  componentDidMount() {
    this.getOTHERCriteriaList();
  }

  render() {
    const { drug } = this.props;

    let rowSelection = {
      selectedRowKeys: this.state.selectedCriteria,
      onChange: this.onSelectedRowKeysChange,
    };

    return (
      <>
        <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
          <div>
            <span className="font-style">{drug.formulary_name}</span>
          </div>
          {checkIfApplicable(drug) ? (
            <Grid item xs={5}>
              <div className="tier-grid-remove-container other-removed-sec">
                <Table
                  columns={this.state.otherColumns}
                  dataSource={this.state.otherData}
                  pagination={false}
                  rowSelection={rowSelection}
                />
              </div>
            </Grid>
          ) : (
            <p>Not applicable for this formulary</p>
          )}
        </div>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(MMOtherReplace);

export const checkIfApplicable = (drug: any) => {
  let breadCrumbInfo: any[] = drug?.bread_crumb_info;
  let ddObj = breadCrumbInfo.find((e) => e.code_value === "DRGDT")?.children;
  let ddObjOther;
  if (ddObj) {
    ddObjOther = ddObj.find((e) => e.hover_display === "Other");
  }
  
  return (ddObj && ddObjOther);
};
