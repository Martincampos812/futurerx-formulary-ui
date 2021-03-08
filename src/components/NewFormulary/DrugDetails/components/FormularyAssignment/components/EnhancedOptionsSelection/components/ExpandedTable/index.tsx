import React, { Component } from 'react'
import { Table } from 'antd';


import './styles.scss';
class ExpandedTable extends Component<any, any> {
  render() { 
    const { columns, data } = this.props; 
    return ( 
      <div className="expanded-table">
        <div className="table-container">
          <Table 
            rowSelection={{
              type: 'checkbox'
            }}
            dataSource={data} 
            columns={columns}
            bordered={true}  
            size="middle"
            pagination={false}
            tableLayout="fixed"
          />
        </div>
      </div>
    );
  }
}

export default ExpandedTable;
