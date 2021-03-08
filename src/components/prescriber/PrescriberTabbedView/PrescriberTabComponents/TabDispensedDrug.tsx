import React from 'react';
// Material
import { Box, Grid } from "@material-ui/core";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";

//components

interface Props {
    filteredData: any;
    columns: any;
    isFetchingData: any;
    handleSearch: any
}

class TabDispensedDrug extends React.Component<Props> {

    render() {
        const {filteredData, columns, isFetchingData, handleSearch} = this.props;

        return(
            <Grid item xs={12} className="prescriber-tabbed-view-root__content--dispensed-drug">
                <FrxGridContainer 
                    enableSearch
                    enableColumnDrag
                    // enableSettings
                    onSearch={handleSearch}
                    fixedColumnKeys={[""]}
                    pagintionPosition="topRight"
                    gridName="TOP 5 DRUG"
                    isFetchingData={isFetchingData}
                    columns={columns}
                    enableResizingOfColumns
                    data={filteredData}
                    hidePagination
                    onSettingsClick="grid-menu"
                />
            </Grid>
        );
    }
}

export default TabDispensedDrug;