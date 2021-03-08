import React from "react";
import { connect } from "react-redux";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import {
  postMaintenaceDrugPA,
} from "../../../../../redux/slices/formulary/pa/paActionCreation";

const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
  };
}

class MassMaintenanceICD extends React.Component<any, any> {
  state = {
    gridColumns: getColumns(),
    isSearchOpen: false,
    drugGridData: {},
  };

  addNew = () => {};

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  
  render() {
    const { gridColumns, isSearchOpen } = this.state;

    return (
      <div className="mm-tier-root">
        <MMDDSelectedFormulariesGrid
          gridColumns={gridColumns}
          maintenanceFormularies={this.props.maintenanceFormularies}
          addNew={this.addNew}
        />

        <DrugGrid
          getDrugs={this.props.postMaintenaceDrugPA}
          columns={getMMDrugDetailsColumns()}
          updateDrugGridData={this.updateDrugGridData}
        />
        <div className="bordered mm-configure details-top">
          {isSearchOpen ? (
            <AdvancedSearch
              category="Grievances"
              openPopup={isSearchOpen}
              onClose={this.advanceSearchClosekHandler}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceICD);
