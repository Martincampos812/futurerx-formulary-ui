import React from 'react';
// Material
import { Box, Grid } from "@material-ui/core";

//style imports
import "./ProfileClaimGrid.scss";

//components
import FrxGridContainer from "../../shared/FrxGrid/FrxGridContainer";
import { getPrescriberClaimGridData } from "../../../mocks/grid/profile-claim-grid";


interface Props {
    columns: any;
    isFetchingData: any;
    handleSearch: any
}

class ProfileClaimGrid extends React.Component<Props> {
    state ={
        data: [] as any[],
        filteredData: [] as any[],
    }

    componentDidMount() {
        const data = getPrescriberClaimGridData();
        setTimeout(() => {
          this.setState({ 
            data, 
            filteredData: data
        });
        }, 2000);
      }

    render() {
        const {columns, handleSearch, isFetchingData} = this.props;
        const {filteredData} = this.state
        return(
            <Grid item xs={12} className="profile-claim-grid-root">
                <FrxGridContainer 
                    enableSearch
                    enableColumnDrag
                    enableSettings
                    onSearch={handleSearch}
                    fixedColumnKeys={[""]}
                    pagintionPosition="topRight"
                    gridName="PROFILE CLAIM"
                    isFetchingData={isFetchingData}
                    columns={columns}
                    enableResizingOfColumns
                    data={filteredData}
                    onSettingsClick="grid-menu"
                />
            </Grid>
        );
    }
}

export default ProfileClaimGrid;