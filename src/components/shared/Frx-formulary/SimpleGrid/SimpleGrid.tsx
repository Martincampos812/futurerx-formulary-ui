import React from "react";
import { Table } from "antd";
import "./SimpleGrid.scss";

interface SimpleGridProp {
  columns: any[];
  data: any[];
}

class SimpleGrid extends React.Component<SimpleGridProp, any> {
  render() {
    const { columns, data } = this.props;
    return (
      <div className="grid-root">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="table-root"
        />
      </div>
    );
  }
}

export default SimpleGrid;
