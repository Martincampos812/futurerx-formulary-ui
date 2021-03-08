import React, {Component} from "react";
import {Table, Button} from "antd";

import "./EntityTable.scss";
interface Props {}
interface State {}

const columns = [
  {
    title: "Contract/PBP",
    dataIndex: "name",
    className: "collumn-class",
  },
  {
    title: "File Commonality",
    dataIndex: "age",
    className: "collumn-class",
  },
  {
    title: "Plan Information Commonality",
    dataIndex: "address",
    className: "collumn-class",
    render: (address, data) => {
      console.log(data);

      return (
        <span
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{color: "#1D54B4", borderBottom: "1px dotted #1D54B4"}}
            onClick={(e) => console.log(e)}
          >
            {address}
          </span>
          {data.address !== "" ? (
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.74998 13.0417C1.74998 13.9125 2.46248 14.625 3.33331 14.625H9.66665C10.5375 14.625 11.25 13.9125 11.25 13.0417V3.54167H1.74998V13.0417ZM12.0416 1.16667H9.27081L8.47915 0.375H4.52081L3.72915 1.16667H0.958313V2.75H12.0416V1.16667Z"
                fill="#C4C4C4"
              />
            </svg>
          ) : null}
        </span>
      );
    },
  },
];

const renderData: any = [
  {
    accGroupId: "S1234-111",
    fileCom: "A",
    pic: "North East PBPs",
  },
  {accGroupId: "S1234-123", fileCom: "A", pic: "North East PBPs"},
  {accGroupId: "S1111-122", fileCom: "B", pic: ""},
  {accGroupId: "S1111-111", fileCom: "A", pic: ""},
];

const data: any = [];
renderData.map((item, index) => {
  data.push({
    key: index,
    name: item.accGroupId,
    age: item.fileCom,
    address: item.pic,
  });
});

class EntityTable extends Component<Props, State> {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({loading: true});
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    console.log("selectedRows: ", selectedRows);
    this.setState({selectedRowKeys});
  };

  render() {
    const {loading, selectedRowKeys} = this.state;
    const rowSelection = {
      columnTitle: selectedRowKeys.length >= 0 ? <></> : "",
      selectedRowKeys,
      onChange: this.onSelectChange,
      //   type:"radio"
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="EntityTable">
        {/* <div style={{marginBottom: 16}}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{marginLeft: 8}}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div> */}

        {/* <table>
          <thead>
            <tr>
              <th>Contract/PBP</th>
              <th>File Commonality</th>
              <th>Plan Information Commonality</th>
            </tr>
          </thead>
          <tbody>
          {renderData.map(item,i)=>(
            <tr key={i}>
              <td>{item.accGroupId}</td>
              <td>{item.fileCom}</td>
              <td>{item.pic}</td>
            </tr>
          )
          }
          </tbody>
        </table> */}

        <Table
          className="antd-table"
          rowClassName="rowClass"
          pagination={false}
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default EntityTable;
