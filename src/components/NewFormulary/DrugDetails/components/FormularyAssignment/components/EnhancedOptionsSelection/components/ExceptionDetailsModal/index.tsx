import React, { Component } from 'react'
import FrxGridContainer from '../../../../../../../../shared/FrxGrid/FrxGridContainer';
import { getTierExceptionDetailsColumns } from '../../mock-data/columns';
import { getTierExceptionDetailsData } from '../../mock-data/data';

class ExceptionDetailsModal extends React.Component<any, any> {
  render() { 
    return ( 
      <FrxGridContainer
      enableSearch={false}
      enableColumnDrag
      onSearch={() => {}}
      fixedColumnKeys={[]}
      pagintionPosition="topRight"
      gridName=""
      isFetchingData={false}
      columns={getTierExceptionDetailsColumns()}
      enableResizingOfColumns={false}
      data={getTierExceptionDetailsData()}
      // pinning columns
      isPinningEnabled={false}
      enableSettings={true}
      isCustomCheckboxEnabled={false}
      handleCustomRowSelectionChange={(r) => {
        console.log(r);
      }}
    />
    );
  }
}

export default ExceptionDetailsModal;